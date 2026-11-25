import {
  ConversationFlowStateRecord,
  ConversationFlowStateRepository,
} from './ports/conversation-flow-state.repository';
import { ConversationFlowStateService } from './conversation-flow-state.service';

describe('ConversationFlowStateService', () => {
  const now = new Date('2026-09-01T15:00:00.000Z');
  const textInput = { text: 'hola', messageType: 'TEXT' as const };

  const repositoryWith = (
    record: ConversationFlowStateRecord | null,
  ): ConversationFlowStateRepository & { save: jest.Mock } => ({
    findByConversationId: jest.fn().mockResolvedValue(record),
    save: jest.fn().mockResolvedValue(undefined),
  });

  it('restarts a flow after 30 minutes of inactivity', async () => {
    const repository = repositoryWith({
      state: {
        nodeId: 'requirements',
        status: 'ACTIVE',
        attempts: 0,
        variables: {},
      },
      updatedAt: new Date('2026-09-01T14:29:59.999Z'),
    });
    const service = new ConversationFlowStateService(
      repository,
      30 * 60 * 1000,
      () => now,
    );

    const result = await service.advance('conversation-1', textInput);

    expect(result.state.nodeId).toBe('main-menu');
    expect(result.messages[0]).toContain('bienvenida');
  });

  it('continues an active flow before the inactivity timeout', async () => {
    const repository = repositoryWith({
      state: {
        nodeId: 'requirements',
        status: 'ACTIVE',
        attempts: 0,
        variables: {},
      },
      updatedAt: new Date('2026-09-01T14:30:00.001Z'),
    });
    const service = new ConversationFlowStateService(
      repository,
      30 * 60 * 1000,
      () => now,
    );

    const result = await service.advance('conversation-1', textInput);

    expect(result.state.nodeId).toBe('requirements');
    expect(result.messages[0]).toContain('No entendí');
  });

  it('evaluates the first non-greeting reply instead of repeating the welcome', async () => {
    const repository = repositoryWith(null);
    const service = new ConversationFlowStateService(
      repository,
      30 * 60 * 1000,
      () => now,
    );

    const result = await service.advance('conversation-1', {
      text: 'Y',
      messageType: 'TEXT',
    });

    expect(result.messages).toHaveLength(1);
    expect(result.messages[0]).toContain('No entendí');
    expect(result.messages[0]).not.toContain('bienvenida');
  });

  it('does not restart to the main menu while awaiting a human advisor', async () => {
    // Bug real en produccion: una candidata ya transferida a un asesor
    // (AWAITING_HUMAN = "Esperando asesor") escribia cualquier cosa y Alice
    // reiniciaba al menu principal como si no tuviera asesor asignado. Ver
    // ConversationFlowEngine.advanceWhileAwaitingAdvisor.
    const repository = repositoryWith({
      state: {
        nodeId: 'human-handoff',
        status: 'AWAITING_HUMAN',
        attempts: 0,
        variables: {},
      },
      updatedAt: now,
    });
    const service = new ConversationFlowStateService(
      repository,
      30 * 60 * 1000,
      () => now,
    );

    const result = await service.advance('conversation-1', textInput);

    expect(result.state.nodeId).toBe('human-handoff');
    expect(result.state.status).toBe('AWAITING_HUMAN');
    expect(result.messages[0]).not.toContain('bienvenida');
    expect(result.messages[0]).not.toContain('No entendí');
  });

  it('restarts an AWAITING_HUMAN conversation abandoned for 7+ days', async () => {
    // Bug real en produccion: AWAITING_HUMAN nunca se reiniciaba, asi que
    // una candidata que regresaba semanas o meses despues se quedaba
    // atrapada en los recordatorios de advanceWhileAwaitingAdvisor (que
    // ademas enmudecen por completo tras el segundo recordatorio). Ver
    // ConversationFlowStateService.shouldRestart.
    const sevenDaysMs = 7 * 24 * 60 * 60 * 1000;
    const repository = repositoryWith({
      state: {
        nodeId: 'human-handoff',
        status: 'AWAITING_HUMAN',
        attempts: 0,
        variables: { fallbackStreak: '3', needsReview: 'true' },
      },
      updatedAt: new Date(now.getTime() - sevenDaysMs),
    });
    const service = new ConversationFlowStateService(
      repository,
      30 * 60 * 1000,
      () => now,
      sevenDaysMs,
    );

    const result = await service.advance('conversation-1', textInput);

    expect(result.state.nodeId).toBe('main-menu');
    expect(result.state.status).toBe('ACTIVE');
    expect(result.messages[0]).toContain('bienvenida');
  });

  it('keeps waiting for a human advisor before the reset threshold', async () => {
    const sevenDaysMs = 7 * 24 * 60 * 60 * 1000;
    const repository = repositoryWith({
      state: {
        nodeId: 'human-handoff',
        status: 'AWAITING_HUMAN',
        attempts: 0,
        variables: {},
      },
      updatedAt: new Date(now.getTime() - sevenDaysMs + 1),
    });
    const service = new ConversationFlowStateService(
      repository,
      30 * 60 * 1000,
      () => now,
      sevenDaysMs,
    );

    const result = await service.advance('conversation-1', textInput);

    expect(result.state.nodeId).toBe('human-handoff');
    expect(result.state.status).toBe('AWAITING_HUMAN');
  });

  it('restarts when the stored node id no longer exists in the definition', async () => {
    // Escenario real encontrado en produccion: una conversacion ACTIVE que
    // quedo parada en un nodo que un cambio de guion despues elimino (ver
    // aupair-flow.definition.ts) -- antes de este chequeo, advance() hacia
    // crashear al buscar un nodo inexistente.
    const repository = repositoryWith({
      state: {
        nodeId: 'capture-age',
        status: 'ACTIVE',
        attempts: 0,
        variables: { name: 'Ana López' },
      },
      updatedAt: now,
    });
    const service = new ConversationFlowStateService(
      repository,
      30 * 60 * 1000,
      () => now,
    );

    const result = await service.advance('conversation-1', textInput);

    expect(result.state.nodeId).toBe('main-menu');
    expect(result.state.status).toBe('ACTIVE');
    expect(result.messages[0]).toContain('bienvenida');
  });

  it('precarga datos del formulario de un anuncio de Meta y manda directo a un asesor', async () => {
    const repository = repositoryWith(null);
    const service = new ConversationFlowStateService(
      repository,
      30 * 60 * 1000,
      () => now,
    );

    const adFormText = [
      '¡Hola! Completé el formulario y me gustaría obtener más información sobre el negocio.',
      '',
      'Full name: @maricruz mendragen ^',
      'WhatsApp number: +527121476178',
      'Email: maricruzmondragon333@gmail.com',
      '¿A qué país te gustaría ir?: Estados Unidos',
      '¿Qué edad tienes actualmente?: De 21 a 23 años',
      '¿Cuál es tu status actual?: Soltera y sin hijos',
    ].join('\n');

    const result = await service.advance('conversation-1', {
      text: adFormText,
      messageType: 'TEXT',
    });

    expect(result.messages[0]).not.toContain('No entendí');
    expect(result.state.nodeId).toBe('human-handoff');
    expect(result.state.status).toBe('AWAITING_HUMAN');
    expect(result.state.variables).toEqual({
      name: 'maricruz mendragen',
      age: '21',
      email: 'maricruzmondragon333@gmail.com',
    });
  });
});
