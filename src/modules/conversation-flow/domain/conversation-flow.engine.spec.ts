import { aupairFlowDefinition } from './aupair-flow.definition';
import { ConversationFlowEngine } from './conversation-flow.engine';
import { FlowDefinition } from './conversation-flow.types';

describe('ConversationFlowEngine', () => {
  const engine = new ConversationFlowEngine();
  const text = (value: string) => ({
    text: value,
    messageType: 'TEXT' as const,
  });

  it('shows the welcome menu again when greeted from the main menu', () => {
    const result = engine.advance(
      aupairFlowDefinition,
      engine.start(aupairFlowDefinition).state,
      text('Hola'),
    );

    expect(result.state.nodeId).toBe('main-menu');
    expect(result.messages[0]).toContain('Te damos la bienvenida');
    expect(result.messages[0]).toContain('🌟 Requisitos para ser Au Pair');
  });

  it.each([
    ['1', 'what-is-aupair-pdf', 'hermana mayor'],
    ['2', 'requirements', 'De 18 a 29 años'],
    ['3', 'application-process', 'Inscríbete al programa'],
    ['4', 'is-it-safe', 'Entendemos tus dudas'],
    ['5', 'human-handoff', 'comunicar con un asesor humano'],
    ['Que hace una Au pair??', 'what-is-aupair-pdf', 'hermana mayor'],
    ['¿Qué hace una Au Pair?', 'what-is-aupair-pdf', 'hermana mayor'],
    [
      'contactar a mi asesor',
      'human-handoff',
      'comunicar con un asesor humano',
    ],
  ])('routes menu option %s to %s', (option, nodeId, expectedContent) => {
    const result = engine.advance(
      aupairFlowDefinition,
      engine.start(aupairFlowDefinition).state,
      text(option),
    );

    expect(result.state.nodeId).toBe(nodeId);
    expect(result.messages[0]).toContain(expectedContent);
  });

  it('hands off immediately when asking to contact an advisor, no questions asked', () => {
    const result = engine.advance(
      aupairFlowDefinition,
      engine.start(aupairFlowDefinition).state,
      text('5'),
    );

    expect(result.state.nodeId).toBe('human-handoff');
    expect(result.state.status).toBe('AWAITING_HUMAN');
    expect(result.requestHandoff).toBe(true);
  });

  it.each([
    'IMAGE',
    'AUDIO',
    'VIDEO',
    'DOCUMENT',
    'LOCATION',
    'STICKER',
    'UNKNOWN',
  ] as const)(
    'keeps the current question when receiving a %s message',
    (messageType) => {
      const state = {
        ...engine.start(aupairFlowDefinition).state,
        nodeId: 'requirements',
      };

      const result = engine.advance(aupairFlowDefinition, state, {
        text: null,
        messageType,
      });

      expect(result.state).toEqual(state);
      expect(result.messages[0]).toContain('solo puedo leer mensajes de texto');
    },
  );

  // Ningun nodo de aupairFlowDefinition usa `capture` desde que "Contactar a
  // mi asesor" se volvio un handoff inmediato (ver aupair-flow.definition.ts)
  // -- el mecanismo de captura del engine sigue siendo infraestructura
  // generica reutilizable, asi que se cubre aqui con una definicion propia en
  // vez de acoplarse al guion de produccion.
  describe('generic capture validation (no production node uses this anymore)', () => {
    const captureTestDefinition: FlowDefinition = {
      entryNodeId: 'capture-name',
      maxAttempts: 3,
      nodes: {
        'capture-name': {
          id: 'capture-name',
          content: 'name?',
          capture: 'name',
        },
        'capture-age': { id: 'capture-age', content: 'age?', capture: 'age' },
        'capture-email': {
          id: 'capture-email',
          content: 'email?',
          capture: 'email',
        },
        'capture-city': {
          id: 'capture-city',
          content: 'city?',
          capture: 'city',
        },
        'capture-english': {
          id: 'capture-english',
          content: 'english?',
          capture: 'englishLevel',
        },
        'profiling-link': {
          id: 'profiling-link',
          content: 'link',
          terminal: 'HANDOFF',
        },
        'human-handoff': {
          id: 'human-handoff',
          content: 'handoff',
          terminal: 'HANDOFF',
        },
      },
    };

    it.each([
      ['name', 'Ruben 😎', 'Por favor escribe tu nombre completo'],
      ['name', '123', 'Por favor escribe tu nombre completo'],
      ['age', 'tengo 24 perritos', 'Por favor escribe solo tu edad'],
      ['age', '24 🎂', 'Por favor escribe solo tu edad'],
      [
        'email',
        'ana😎@correo.com',
        'Por favor escribe un correo electrónico válido',
      ],
      ['city', 'Cuernavaca 🔥', 'Por favor escribe el nombre de tu ciudad'],
      ['city', '123', 'Por favor escribe el nombre de tu ciudad'],
      ['englishLevel', 'muy bien 😍', 'Por favor indica tu nivel de inglés'],
      ['englishLevel', '123', 'Por favor indica tu nivel de inglés'],
    ])(
      'rejects invalid %s captures without leaving the current question',
      (capture, answer, expectedMessage) => {
        const nodeIdByCapture = {
          name: 'capture-name',
          age: 'capture-age',
          email: 'capture-email',
          city: 'capture-city',
          englishLevel: 'capture-english',
        } as const;
        const state = {
          ...engine.start(captureTestDefinition).state,
          nodeId: nodeIdByCapture[capture as keyof typeof nodeIdByCapture],
        };

        const result = engine.advance(
          captureTestDefinition,
          state,
          text(answer),
        );

        expect(result.state.nodeId).toBe(state.nodeId);
        expect(result.messages[0]).toContain(expectedMessage);
      },
    );

    it.each([
      'Intermedio',
      'B1',
      'certificación TOEFL 80',
      'avanzado con certificación',
    ])('accepts a meaningful free-form English level: %s', (englishLevel) => {
      const state = {
        ...engine.start(captureTestDefinition).state,
        nodeId: 'capture-english',
      };

      const result = engine.advance(
        captureTestDefinition,
        state,
        text(englishLevel),
      );

      expect(result.state.variables.englishLevel).toBe(englishLevel);
    });
  });

  it('uses the human-handoff message for a global advisor request', () => {
    const result = engine.advance(
      aupairFlowDefinition,
      engine.start(aupairFlowDefinition).state,
      text('asesor'),
    );

    expect(result.state.nodeId).toBe('human-handoff');
    expect(result.messages[0]).toContain('comunicar con un asesor humano');
    expect(result.requestHandoff).toBe(true);
  });

  it('closes the conversation when the candidate writes cancelar', () => {
    const result = engine.advance(
      aupairFlowDefinition,
      engine.start(aupairFlowDefinition).state,
      text('cancelar'),
    );

    expect(result.state.status).toBe('CLOSED');
    expect(result.messages[0]).toContain('Gracias por tu tiempo');
  });

  it('hands off after three invalid answers', () => {
    let result = engine.start(aupairFlowDefinition);
    for (const value of ['x', 'y', 'z'])
      result = engine.advance(aupairFlowDefinition, result.state, text(value));

    expect(result.state.nodeId).toBe('human-handoff');
    expect(result.state.status).toBe('AWAITING_HUMAN');
    expect(result.requestHandoff).toBe(true);
  });

  describe('enterFromAdLeadPrefill', () => {
    it('routes straight to a human handoff when name, age and email are all valid', () => {
      const result = engine.enterFromAdLeadPrefill(aupairFlowDefinition, {
        name: 'maricruz mendragen',
        age: '21',
        email: 'maricruz@example.com',
      });

      expect(result?.state.nodeId).toBe('human-handoff');
      expect(result?.state.status).toBe('AWAITING_HUMAN');
      expect(result?.requestHandoff).toBe(true);
      expect(result?.state.variables).toEqual({
        name: 'maricruz mendragen',
        age: '21',
        email: 'maricruz@example.com',
      });
    });

    it('still hands off when a secondary field is invalid, keeping only the valid ones', () => {
      const result = engine.enterFromAdLeadPrefill(aupairFlowDefinition, {
        name: 'maricruz mendragen',
        age: 'De 21 a 23 años',
        email: 'maricruz@example.com',
      });

      expect(result?.state.nodeId).toBe('human-handoff');
      expect(result?.state.variables).toEqual({
        name: 'maricruz mendragen',
        email: 'maricruz@example.com',
      });
    });

    it('returns null when not even the name is rescuable', () => {
      const result = engine.enterFromAdLeadPrefill(aupairFlowDefinition, {
        age: '21',
        email: 'maricruz@example.com',
      });

      expect(result).toBeNull();
    });
  });
});
