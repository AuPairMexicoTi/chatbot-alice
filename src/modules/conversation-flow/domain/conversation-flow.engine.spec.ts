import { aupairFlowDefinition } from './aupair-flow.definition';
import { ConversationFlowEngine } from './conversation-flow.engine';

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
  ])('routes menu option %s to %s', (option, nodeId, expectedContent) => {
    const result = engine.advance(
      aupairFlowDefinition,
      engine.start(aupairFlowDefinition).state,
      text(option),
    );

    expect(result.state.nodeId).toBe(nodeId);
    expect(result.messages[0]).toContain(expectedContent);
  });

  it('captures the candidate data before showing the profiling link', () => {
    let contact = engine.advance(
      aupairFlowDefinition,
      engine.start(aupairFlowDefinition).state,
      text('4'),
    );

    expect(contact.state.nodeId).toBe('contact-advisor');
    expect(contact.state.status).toBe('ACTIVE');
    expect(contact.requestHandoff).toBe(false);

    for (const answer of [
      'Ana López',
      '29',
      'ana@example.com',
      'Guadalajara',
      'Intermedio',
    ])
      contact = engine.advance(
        aupairFlowDefinition,
        contact.state,
        text(answer),
      );

    expect(contact.state.nodeId).toBe('profiling-link');
    expect(contact.state.variables).toMatchObject({
      name: 'Ana López',
      age: '29',
      email: 'ana@example.com',
      city: 'Guadalajara',
      englishLevel: 'Intermedio',
    });

    const profile = engine.present(aupairFlowDefinition, {
      ...contact.state,
      variables: {
        ...contact.state.variables,
        profilingLink: 'https://aupair.example/perfilacion',
      },
    });
    expect(profile.messages[0]).toContain('https://aupair.example/perfilacion');

    const confirmation = engine.advance(
      aupairFlowDefinition,
      profile.state,
      text('1'),
    );
    expect(confirmation.state.nodeId).toBe('advisor-confirmation');
    expect(confirmation.state.status).toBe('AWAITING_HUMAN');
    expect(confirmation.requestHandoff).toBe(true);
    expect(confirmation.messages[0]).toContain(
      'Gracias por completar tu perfil',
    );
  });

  it('returns to the menu from the profile step', () => {
    const state = {
      ...engine.start(aupairFlowDefinition).state,
      nodeId: 'profiling-link',
    };
    const result = engine.advance(aupairFlowDefinition, state, text('2'));

    expect(result.state.nodeId).toBe('main-menu');
  });

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
        name: 'contact-advisor',
        age: 'capture-age',
        email: 'capture-email',
        city: 'capture-city',
        englishLevel: 'capture-english',
      } as const;
      const state = {
        ...engine.start(aupairFlowDefinition).state,
        nodeId: nodeIdByCapture[capture as keyof typeof nodeIdByCapture],
      };

      const result = engine.advance(aupairFlowDefinition, state, text(answer));

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
      ...engine.start(aupairFlowDefinition).state,
      nodeId: 'capture-english',
    };

    const result = engine.advance(
      aupairFlowDefinition,
      state,
      text(englishLevel),
    );

    expect(result.state.nodeId).toBe('profiling-link');
    expect(result.state.variables.englishLevel).toBe(englishLevel);
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
});
