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

  present(definition: FlowDefinition, state: FlowState): FlowResult {
    return this.enter(definition, state);
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
        'Por ahora solo puedo leer mensajes de texto. Escribe una de las opciones indicadas o escribe “menú”.',
      ]);
    }
    const normalized = normalize(input.text);
    if (
      state.nodeId === definition.entryNodeId &&
      this.isGreeting(normalized)
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
        nodeId: this.terminalNodeId(definition, 'HANDOFF'),
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
        nodeId: this.terminalNodeId(definition, 'CLOSED'),
        attempts: 0,
      });

    const node = definition.nodes[state.nodeId];
    if (node.capture)
      return this.capture(definition, state, node.capture, input.text);
    const target = Object.entries(node.options ?? {}).find(([option]) =>
      option.split('|').map(normalize).includes(normalized),
    )?.[1];
    if (target) {
      return this.enter(definition, {
        ...state,
        nodeId: target,
        attempts: 0,
      });
    }
    const attempts = state.attempts + 1;
    if (attempts >= definition.maxAttempts)
      return this.enter(definition, {
        ...state,
        nodeId: this.terminalNodeId(definition, 'HANDOFF'),
        attempts: 0,
      });
    return this.reply(definition, { ...state, attempts }, [
      this.invalidReply(node.id),
    ]);
  }

  private capture(
    definition: FlowDefinition,
    state: FlowState,
    capture: NonNullable<FlowDefinition['nodes'][string]['capture']>,
    value: string,
  ): FlowResult {
    const trimmedValue = value.trim();
    const validationError = this.captureValidationError(capture, trimmedValue);
    if (validationError)
      return this.reply(
        definition,
        { ...state, attempts: state.attempts + 1 },
        [validationError],
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
        [capture]:
          capture === 'age'
            ? String(this.extractAge(trimmedValue))
            : trimmedValue,
      },
    });
  }

  private captureValidationError(
    capture: NonNullable<FlowDefinition['nodes'][string]['capture']>,
    value: string,
  ): string | null {
    switch (capture) {
      case 'name':
        return this.isValidFullName(value)
          ? null
          : 'Por favor escribe tu nombre completo, solo con letras y espacios. Ejemplo: Ana López García. ✍️';
      case 'age':
        return this.isValidAge(value)
          ? null
          : 'Por favor escribe solo tu edad en número, por ejemplo: 24 o 24 años. Recuerda que el programa es para personas de 18 a 29 años. 🎂';
      case 'email':
        return this.isValidEmail(value)
          ? null
          : 'Por favor escribe un correo electrónico válido, sin espacios ni emojis. Ejemplo: nombre@correo.com 📧';
      case 'city':
        return this.isValidCity(value)
          ? null
          : 'Por favor escribe el nombre de tu ciudad, solo con letras y espacios. Ejemplo: Cuernavaca Morelos. 📍';
      case 'englishLevel':
        return this.isValidEnglishLevel(value)
          ? null
          : 'Por favor indica tu nivel de inglés o certificación. Ejemplos: básico, intermedio, avanzado, B1, IELTS o TOEFL 80. 🗣️';
    }
  }

  private isValidFullName(value: string): boolean {
    if (!this.hasOnlyNameCharacters(value) || this.isGenericAnswer(value))
      return false;
    return (
      value.split(/\s+/u).filter((part) => /\p{L}/u.test(part)).length >= 2
    );
  }

  private isValidAge(value: string): boolean {
    return /^(?:1[89]|2[0-9])(?:\s+anos?)?$/u.test(normalize(value));
  }

  private isValidEmail(value: string): boolean {
    return /^(?!.*\.\.)[A-Za-z0-9.!#$%&'*+/=?^_`{|}~-]+@[A-Za-z0-9-]+(?:\.[A-Za-z0-9-]+)+$/u.test(
      value,
    );
  }

  private isValidCity(value: string): boolean {
    return (
      this.hasOnlyNameCharacters(value) &&
      value.replace(/[^\p{L}\p{M}]/gu, '').length >= 2 &&
      !this.isGenericAnswer(value)
    );
  }

  private isValidEnglishLevel(value: string): boolean {
    if (!/^[\p{L}\p{M}\d .,'’:/-]{2,100}$/u.test(value)) return false;
    return /\b(?:a[1-2]|b[1-2]|c[1-2]|basico|intermedio|avanzado|principiante|elemental|pre-intermedio|upper intermediate|intermediate|advanced|toefl|ielts|cambridge|toeic|duolingo|certificacion|certificado)\b/u.test(
      normalize(value),
    );
  }

  private hasOnlyNameCharacters(value: string): boolean {
    return /^[\p{L}\p{M}][\p{L}\p{M} '’.-]*$/u.test(value);
  }

  private isGenericAnswer(value: string): boolean {
    return [
      'hola',
      'si',
      'no',
      'no se',
      'nose',
      'ninguna',
      'n a',
      'na',
      'asdf',
      'test',
    ].includes(normalize(value));
  }

  private extractAge(value: string): number | null {
    const match = normalize(value).match(/^(\d{1,2})(?:\s+anos?)?$/u);
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
      messages: [this.interpolate(node.content, state.variables)],
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
    };
  }

  private invalidReply(nodeId: string): string {
    if (nodeId === 'main-menu') {
      return 'No entendí tu respuesta. Responde con:\n\n1️⃣ ¿Qué hace una Au Pair?\n2️⃣ Requisitos para ser Au Pair\n3️⃣ Proceso general de aplicación\n4️⃣ Contactar a mi asesor\n\nTambién puedes escribir “asesor”.';
    }

    return 'No entendí tu respuesta. Elige una de las opciones indicadas o escribe “menú” para volver al inicio.';
  }

  private isGreeting(normalized: string): boolean {
    return [
      'hola',
      'holaa',
      'buenas',
      'buenos dias',
      'buenas tardes',
      'buenas noches',
    ].some(
      (greeting) =>
        normalized === greeting || normalized.startsWith(`${greeting} `),
    );
  }

  private terminalNodeId(
    definition: FlowDefinition,
    terminal: NonNullable<FlowDefinition['nodes'][string]['terminal']>,
  ): string {
    const preferredNodeId =
      terminal === 'HANDOFF' ? 'human-handoff' : 'closed-pdf';
    if (definition.nodes[preferredNodeId]?.terminal === terminal)
      return preferredNodeId;
    const node = Object.values(definition.nodes).find(
      (candidate) => candidate.terminal === terminal,
    );
    if (!node) throw new Error(`Flow definition does not include ${terminal}`);
    return node.id;
  }

  private interpolate(
    content: string,
    variables: Record<string, string>,
  ): string {
    return content.replace(/\{\{(\w+)\}\}/gu, (_match, name: string) => {
      const value = variables[name];
      return value ?? '';
    });
  }
}
