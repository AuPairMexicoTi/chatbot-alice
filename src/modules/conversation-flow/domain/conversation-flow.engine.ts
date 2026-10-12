import {
  FlowDefinition,
  FlowInput,
  FlowResult,
  FlowState,
} from './conversation-flow.types';

const normalize = (value: string): string =>
  value
    .normalize('NFD')
    .replace(/\p{Diacritic}/gu, '')
    .toLowerCase()
    .replace(/\s+/g, ' ')
    .trim();

export class ConversationFlowEngine {
  start(definition: FlowDefinition): FlowResult {
    return this.enter(definition, {
      nodeId: definition.entryNodeId,
      status: 'ACTIVE',
      attempts: 0,
      variables: {},
    });
  }

  advance(
    definition: FlowDefinition,
    state: FlowState,
    input: FlowInput,
  ): FlowResult {
    if (state.status !== 'ACTIVE')
      return { state, messages: [], requestHandoff: false };
    if (input.messageType !== 'TEXT' || !input.text) {
      return this.reply(definition, state, [
        'Por ahora solo puedo leer mensajes de texto. Escríbeme tu respuesta y te reenvío las opciones.',
        definition.nodes[state.nodeId].content,
      ]);
    }
    const normalized = normalize(input.text);
    if (
      state.nodeId === definition.entryNodeId &&
      [
        'hola',
        'holaa',
        'buenas',
        'buenos dias',
        'buenas tardes',
        'buenas noches',
      ].includes(normalized)
    ) {
      return this.enter(definition, {
        ...state,
        nodeId: definition.entryNodeId,
        attempts: 0,
      });
    }
    if (['asesor', 'humano', 'ayuda'].includes(normalized))
      return this.enter(definition, {
        ...state,
        nodeId: 'handoff',
        attempts: 0,
      });
    if (['menu', 'inicio'].includes(normalized))
      return this.enter(definition, {
        ...state,
        nodeId: definition.entryNodeId,
        attempts: 0,
      });
    if (['salir', 'cancelar'].includes(normalized))
      return this.enter(definition, {
        ...state,
        nodeId: 'closed',
        attempts: 0,
      });

    const node = definition.nodes[state.nodeId];
    if (node.capture)
      return this.capture(definition, state, node.capture, input.text);
    const target = Object.entries(node.options ?? {}).find(([option]) =>
      option.split('|').map(normalize).includes(normalized),
    )?.[1];
    if (target) {
      const countryInterestByNode: Record<string, string> = {
        germany: 'Alemania',
        belgium: 'Bélgica',
        denmark: 'Dinamarca',
        usa: 'Estados Unidos',
        france: 'Francia',
        italy: 'Italia',
        netherlands: 'Países Bajos',
        sweden: 'Suecia',
        switzerland: 'Suiza',
      };
      return this.enter(definition, {
        ...state,
        nodeId: target,
        attempts: 0,
        variables: countryInterestByNode[target]
          ? {
              ...state.variables,
              countryInterest: countryInterestByNode[target],
            }
          : state.variables,
      });
    }
    const attempts = state.attempts + 1;
    if (attempts >= definition.maxAttempts)
      return this.enter(definition, {
        ...state,
        nodeId: 'handoff',
        attempts: 0,
      });
    return this.reply(definition, { ...state, attempts }, [
      'No entendí tu respuesta. Elige una de las opciones indicadas.',
      node.content,
    ]);
  }

  private capture(
    definition: FlowDefinition,
    state: FlowState,
    capture: NonNullable<FlowDefinition['nodes'][string]['capture']>,
    value: string,
  ): FlowResult {
    const normalized = value.trim();
    const age = this.extractAge(normalized);
    const valid =
      capture === 'age'
        ? age !== null && age >= 18 && age <= 28
        : capture === 'email'
          ? /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(normalized)
          : normalized.length > 1;
    if (!valid)
      return this.reply(
        definition,
        { ...state, attempts: state.attempts + 1 },
        [`Necesito un dato válido. ${definition.nodes[state.nodeId].content}`],
      );
    const order: Record<typeof capture, string> = {
      name: 'capture-age',
      age: 'capture-email',
      email: 'capture-city',
      city: 'capture-english',
      englishLevel: 'profiling-link',
    };
    return this.enter(definition, {
      ...state,
      nodeId: order[capture],
      attempts: 0,
      variables: {
        ...state.variables,
        [capture]: capture === 'age' ? String(age) : normalized,
      },
    });
  }

  private extractAge(value: string): number | null {
    const match = value.match(/\b(\d{1,2})\b/u);
    return match ? Number(match[1]) : null;
  }

  private enter(definition: FlowDefinition, state: FlowState): FlowResult {
    const node = definition.nodes[state.nodeId];
    const nextState: FlowState =
      node.terminal === 'HANDOFF'
        ? { ...state, status: 'AWAITING_HUMAN' }
        : node.terminal === 'CLOSED'
          ? { ...state, status: 'CLOSED' }
          : state;
    return {
      state: nextState,
      messages: [node.content],
      requestHandoff: node.terminal === 'HANDOFF',
      imageUrl: node.imageUrl,
    };
  }

  private reply(
    definition: FlowDefinition,
    state: FlowState,
    messages: string[],
  ): FlowResult {
    return {
      state,
      messages,
      requestHandoff: false,
      imageUrl: definition.nodes[state.nodeId]?.imageUrl,
    };
  }
}
