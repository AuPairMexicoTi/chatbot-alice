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

  it('shows the profiling link and waits for explicit confirmation before handoff', () => {
    const initialState = {
      ...engine.start(aupairFlowDefinition).state,
      variables: { profilingLink: 'https://aupair.example/perfilacion' },
    };
    const contact = engine.advance(
      aupairFlowDefinition,
      initialState,
      text('4'),
    );

    expect(contact.state.nodeId).toBe('contact-advisor');
    expect(contact.state.status).toBe('ACTIVE');
    expect(contact.requestHandoff).toBe(false);
    expect(contact.messages[0]).toContain('https://aupair.example/perfilacion');

    const confirmation = engine.advance(
      aupairFlowDefinition,
      contact.state,
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
      nodeId: 'contact-advisor',
    };
    const result = engine.advance(aupairFlowDefinition, state, text('2'));

    expect(result.state.nodeId).toBe('main-menu');
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
