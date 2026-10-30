import { ApiProperty } from '@nestjs/swagger';

export class MessagesPageMetaDto {
  @ApiProperty({ description: 'true si hay mensajes mas viejos que los de este bloque.' })
  hasMore!: boolean;
}

// Respuesta del hilo de mensajes con paginacion por cursor (antes que
// page/total): ver ListMessagesQueryDto y ConversationQueryPort.listMessages.
export class MessagesPageResponseDto<T> {
  data!: T[];
  @ApiProperty({ type: MessagesPageMetaDto }) meta!: MessagesPageMetaDto;

  static of<T>(data: T[], hasMore: boolean): MessagesPageResponseDto<T> {
    return { data, meta: { hasMore } };
  }
}
