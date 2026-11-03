import { Inject, Injectable, Logger, Optional } from '@nestjs/common';
import {
  CONTACT_REPOSITORY,
  ContactRepository,
} from '@modules/contacts/application/ports/contact.repository';
import {
  CONVERSATION_REPOSITORY,
  ConversationRepository,
} from '@modules/conversations/application/ports/conversation.repository';
import {
  MESSAGE_REPOSITORY,
  MessageRepository,
} from '@modules/messaging/application/ports/message.repository';
import { ResolveAutoReplyUseCase } from '@modules/auto-replies/application/use-cases/resolve-auto-reply.use-case';
import { QueueOutboundMessageUseCase } from './queue-outbound-message.use-case';
import { GenerateConversationReplyUseCase } from './generate-conversation-reply.use-case';
import { ParsedWhatsAppWebhook } from '../../infrastructure/parsers/whatsapp-webhook.parser';
import { ConversationFlowStateService } from '@modules/conversation-flow/application/conversation-flow-state.service';
import {
  APM_HANDOFF_PORT,
  ApmHandoffResult,
  ApmHandoffPort,
} from '@modules/conversation-flow/application/ports/apm-handoff.port';
import { RequestHumanHandoffUseCase } from './request-human-handoff.use-case';
import { ConversationInactivityService } from '../services/conversation-inactivity.service';

@Injectable()
export class ProcessInboundWhatsAppMessageUseCase {
  private readonly logger = new Logger(ProcessInboundWhatsAppMessageUseCase.name);

  constructor(
    @Inject(CONTACT_REPOSITORY)
    private readonly contactRepository: ContactRepository,
    @Inject(CONVERSATION_REPOSITORY)
    private readonly conversationRepository: ConversationRepository,
    @Inject(MESSAGE_REPOSITORY)
    private readonly messageRepository: MessageRepository,
    private readonly resolveAutoReplyUseCase: ResolveAutoReplyUseCase,
    private readonly generateConversationReplyUseCase: GenerateConversationReplyUseCase,
    private readonly queueOutboundMessageUseCase: QueueOutboundMessageUseCase,
    @Inject(ConversationFlowStateService)
    private readonly conversationFlowStateService = new ConversationFlowStateService(),
    private readonly requestHumanHandoffUseCase?: RequestHumanHandoffUseCase,
    @Inject(APM_HANDOFF_PORT) private readonly apmHandoffPort?: ApmHandoffPort,
    @Optional()
    private readonly conversationInactivityService?: ConversationInactivityService,
  ) {}

  async execute(payload: ParsedWhatsAppWebhook): Promise<void> {
    if (!payload.contactExternalId || !payload.from) {
      return;
    }

    const contact = await this.contactRepository.upsert({
      externalId: payload.contactExternalId,
      name: payload.contactName,
      phoneNumber: payload.from,
    });

    const conversation =
      await this.conversationRepository.getOrCreateByContactId(
        contact.id,
        payload.locale,
      );

    await this.messageRepository.create({
      conversationId: conversation.id,
      direction: 'INBOUND',
      type: payload.messageType === 'TEXT' ? 'TEXT' : 'UNKNOWN',
      providerMessageId: payload.messageId,
      text: payload.text,
      status: 'RECEIVED',
      metadata: { whatsAppMessageType: payload.messageType },
    });

    let flowResult = await this.conversationFlowStateService.advance(
      conversation.id,
      {
        text: payload.text,
        messageType: payload.messageType,
      },
      contact.phoneNumber,
    );
    let handoffResult: ApmHandoffResult | undefined;
    if (flowResult.requestHandoff) {
      const values = flowResult.state.variables;
      let handoffSucceeded = !this.apmHandoffPort;
      if (this.apmHandoffPort) {
        try {
          handoffResult = await this.apmHandoffPort.request({
            phone: contact.phoneNumber,
            email: values.email,
            reason: 'La candidata solicitó hablar con un asesor desde WhatsApp.',
          });
          flowResult.messages = [this.advisorMessage(handoffResult)];
          handoffSucceeded = true;
        } catch (error) {
          // El handoff a APM falla, por ejemplo, cuando el lead escribe
          // "asesor" antes de que exista su registro en APM (eso recien se
          // crea al llegar al link de perfilacion) -- sin esta red de
          // seguridad, la candidata se queda sin ninguna respuesta. Se
          // reinicia el flujo en vez de marcar la conversacion como
          // "esperando asesor": ningun humano fue notificado en realidad.
          this.logger.error(
            `Fallo el handoff a APM para la conversación ${conversation.id}: ${
              error instanceof Error ? error.message : 'Error desconocido'
            }`,
          );
          flowResult = await this.conversationFlowStateService.restart(
            conversation.id,
          );
        }
      }
      if (handoffSucceeded) {
        await this.requestHumanHandoffUseCase?.execute(
          conversation.id,
          'La candidata solicitó hablar con un asesor desde WhatsApp.',
        );
      }
    }
    if (flowResult.state.status === 'ACTIVE')
      await this.conversationInactivityService?.schedule(conversation.id);
    else await this.conversationInactivityService?.cancel(conversation.id);
    for (const text of flowResult.messages) {
      const imageUrl =
        handoffResult?.routing === 'NEW_ASSIGNMENT'
          ? (handoffResult.advisor.imageUrl ?? flowResult.imageUrl ?? null)
          : (flowResult.imageUrl ?? null);
      const hasImage = Boolean(imageUrl);
      const outboundMessage = await this.messageRepository.create({
        conversationId: conversation.id,
        direction: 'OUTBOUND',
        type: hasImage ? 'IMAGE' : 'TEXT',
        providerMessageId: null,
        text,
        status: 'QUEUED',
        metadata: {
          responseSource: 'CONVERSATION_FLOW',
          ...(hasImage ? { imageUrl } : {}),
        },
      });
      await this.queueOutboundMessageUseCase.execute(outboundMessage.id);
    }
    if (flowResult.messages.length > 0) return;

    const autoReply = await this.resolveAutoReplyUseCase.execute(
      payload.text,
      conversation.locale,
    );

    if (autoReply) {
      const hasImage = Boolean(autoReply.imageUrl);
      const outboundMessage = await this.messageRepository.create({
        conversationId: conversation.id,
        direction: 'OUTBOUND',
        type: hasImage ? 'IMAGE' : 'TEXT',
        providerMessageId: null,
        text: autoReply.text,
        status: 'QUEUED',
        metadata: {
          responseSource: 'AUTO_REPLY',
          autoReplyId: autoReply.id,
          autoReplyKey: autoReply.key,
          ...(hasImage ? { imageUrl: autoReply.imageUrl } : {}),
        },
      });

      await this.queueOutboundMessageUseCase.execute(outboundMessage.id);
      return;
    }

    const aiResult = await this.generateConversationReplyUseCase.execute(
      conversation.id,
    );

    const outboundMessage = await this.messageRepository.create({
      conversationId: conversation.id,
      direction: 'OUTBOUND',
      type: 'TEXT',
      providerMessageId: null,
      text: aiResult.text,
      status: 'QUEUED',
      metadata: {},
    });

    await this.queueOutboundMessageUseCase.execute(outboundMessage.id);
  }

  private advisorMessage(handoff: ApmHandoffResult): string {
    if (handoff.routing === 'ALREADY_ASSIGNED') {
      const mailboxLink = handoff.mailboxWhatsAppLink
        ? `\n\n📲 Solicita la reasignación aquí:\n👉 ${handoff.mailboxWhatsAppLink}`
        : '';
      return `💖 Ya cuentas con un asesor asignado. Para respetar tu seguimiento, no haremos cambios automáticos.${mailboxLink}\n\nEl Buzón de Leads revisará tu solicitud de reasignación. 🔔`;
    }
    const advisor = handoff.advisor;
    if (advisor.isMailbox)
      return '¡Excelente! 🙌✨ Un asesor se pondrá en contacto contigo por este medio o por llamada telefónica. 📞\n\n¡Activa tus notificaciones! 🔔💖';
    const link = advisor.whatsappLink
      ? `\n\n📲 Contáctalo aquí, por favor:\n👉 ${advisor.whatsappLink}`
      : '';
    return `¡Excelente! 🙌✨ Tu asesor asignado es *${advisor.name ?? 'tu asesor'}*.\n\nSe pondrá en contacto contigo por este medio o por llamada telefónica. 📞${link}\n\n¡Activa tus notificaciones! 🔔💖`;
  }
}
