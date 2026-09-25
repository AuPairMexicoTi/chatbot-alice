import { aupairFlowDefinition } from './aupair-flow.definition';
import { ConversationFlowEngine } from './conversation-flow.engine';

describe('ConversationFlowEngine', () => {
  const engine = new ConversationFlowEngine();
  const text = (value: string) => ({
    text: value,
    messageType: 'TEXT' as const,
  });

  it('routes a country selection to its information card', () => {
    const menu = engine.start(aupairFlowDefinition);
    const countries = engine.advance(
      aupairFlowDefinition,
      menu.state,
      text('1️⃣'),
    );
    const result = engine.advance(
      aupairFlowDefinition,
      countries.state,
      text('1️⃣'),
    );
    expect(result.state.nodeId).toBe('germany');
    expect(result.messages[0]).toContain('Alemania');
    expect(result.state.variables.countryInterest).toBe('Alemania');
  });

  it('shows the welcome menu again when greeting from the main menu', () => {
    const result = engine.advance(
      aupairFlowDefinition,
      engine.start(aupairFlowDefinition).state,
      text('Hola'),
    );

    expect(result.state.nodeId).toBe('menu');
    expect(result.messages).toHaveLength(1);
    expect(result.messages[0]).toContain('Te damos la bienvenida');
    expect(result.messages[0]).not.toContain('No entendí');
  });

  it('routes Denmark and Sweden selections to their country cards', () => {
    const menu = engine.start(aupairFlowDefinition);
    const countries = engine.advance(
      aupairFlowDefinition,
      menu.state,
      text('1'),
    );

    const denmark = engine.advance(
      aupairFlowDefinition,
      countries.state,
      text('3'),
    );
    expect(denmark.state.nodeId).toBe('denmark');
    expect(denmark.messages[0]).toContain('Dinamarca');

    const sweden = engine.advance(
      aupairFlowDefinition,
      countries.state,
      text('8'),
    );
    expect(sweden.state.nodeId).toBe('sweden');
    expect(sweden.messages[0]).toContain('Suecia');
  });

  it('hands off when a candidate wants to apply from a country information card', () => {
    const state = {
      ...engine.start(aupairFlowDefinition).state,
      nodeId: 'germany',
    };

    const result = engine.advance(aupairFlowDefinition, state, text('1'));

    expect(result.state.nodeId).toBe('handoff');
    expect(result.state.status).toBe('AWAITING_HUMAN');
  });

  it('hands off when a candidate chooses to apply from the main menu', () => {
    const result = engine.advance(
      aupairFlowDefinition,
      engine.start(aupairFlowDefinition).state,
      text('4'),
    );
    expect(result.state.nodeId).toBe('handoff');
    expect(result.requestHandoff).toBe(true);
  });

  it('returns to the country list when a candidate chooses to see other countries', () => {
    const state = {
      ...engine.start(aupairFlowDefinition).state,
      nodeId: 'usa',
    };

    const result = engine.advance(aupairFlowDefinition, state, text('3'));

    expect(result.state.nodeId).toBe('countries');
    expect(result.messages[0]).toContain('Países Bajos');
  });

  it('hands off after three invalid answers', () => {
    let result = engine.start(aupairFlowDefinition);
    for (const value of ['x', 'y', 'z'])
      result = engine.advance(aupairFlowDefinition, result.state, text(value));
    expect(result.state.status).toBe('AWAITING_HUMAN');
    expect(result.requestHandoff).toBe(true);
  });
});
