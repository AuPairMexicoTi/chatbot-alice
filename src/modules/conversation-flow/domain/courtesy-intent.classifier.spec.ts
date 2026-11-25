import { classifyCourtesyIntent } from './courtesy-intent.classifier';

describe('classifyCourtesyIntent', () => {
  it.each([
    // Casos reales reportados (Aneth Cárdenas, "Esperando asesor").
    'Perfecto muchas gracias',
    'Ya le mandé mensaje a mi asesor',
    // Variaciones de mayúsculas, acentos y signos.
    'GRACIAS!!!',
    'muchas gracias ✨',
    'perfecto, gracias',
    'Excelente, gracias!',
    'Ok gracias',
    'listo, gracias 🙏',
    'de acuerdo, muchas gracias',
    'Vale, gracias',
    'super, gracias',
    '👍',
    '🙏',
  ])('classifies "%s" as a courtesy intent', (text) => {
    expect(classifyCourtesyIntent(text)).not.toBeNull();
  });

  it.each([
    ['Ya le escribí a mi asesor', 'CONFIRMATION'],
    ['ya le mandé mensaje a mi asesor', 'CONFIRMATION'],
    ['Ya me contactó, gracias', 'CONFIRMATION'],
    ['Ya me habló por teléfono', 'CONFIRMATION'],
    ['gracias', 'THANKS'],
    ['Perfecto', 'THANKS'],
    ['Ok', 'THANKS'],
  ] as const)('classifies "%s" as %s', (text, expected) => {
    expect(classifyCourtesyIntent(text)).toBe(expected);
  });

  it.each([
    'no puedo ir hoy',
    'cuánto cuesta el programa',
    'quiero hablar con un asesor',
    'mi nombre es Ana López',
    '',
    '   ',
    // Casos reales reportados tras el despliegue anterior: una frase de
    // cortesia (esta bien/ok/gracias) aparecia dentro de una queja o una
    // pregunta y Alice contestaba "¡Con gusto!" en vez de tratarlas como lo
    // que son.
    'no está bien',
    'perfecto pero tengo una duda del pago',
    'ok y cuánto cuesta',
    'gracias, ¿cuándo es la entrevista?',
    'no ok',
    'no, gracias',
  ])('does not classify "%s" as a courtesy intent', (text) => {
    expect(classifyCourtesyIntent(text)).toBeNull();
  });
});
