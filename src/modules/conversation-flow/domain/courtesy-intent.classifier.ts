// Clasificador de mensajes de cortesia/confirmacion para cuando la
// conversacion ya esta en AWAITING_HUMAN (ver conversation-flow.engine.ts).
// Deliberadamente separado del normalize() del engine: ese se usa para el
// matching exacto de opciones del menu (incluye emojis tipo 1️⃣ como parte
// de las claves) y ya tiene su propio spec -- tocarlo aqui arriesgaria una
// regresion ahi. Este normalizador es mas agresivo (quita emojis tambien)
// porque aqui no se compara contra claves de menu, solo se detecta intencion.

// ️ (variation selector) va siempre aparte, nunca dentro de una clase
// de caracteres junto a otro emoji: ❤️ visualmente es un solo glifo pero son
// dos code points (❤ + ️), y ESLint (no-misleading-character-class)
// marca como engañoso meterlos juntos en un [...]. Se quita por su cuenta
// antes de evaluar cualquiera de los dos patrones de abajo.
const VARIATION_SELECTOR_PATTERN = /️/gu;

const EMOJI_PATTERN =
  /[\u{1F300}-\u{1FAFF}\u{2600}-\u{27BF}\u{2190}-\u{21FF}\u{2B00}-\u{2BFF}]/gu;

const APPROVAL_EMOJI_ONLY_PATTERN =
  /^[\u{1F44D}\u{1F64F}\u{2764}\u{2705}\s]+$/u;

const normalizeForIntent = (value: string): string =>
  value
    .normalize('NFD')
    .replace(/\p{Diacritic}/gu, '')
    .toLowerCase()
    .replace(VARIATION_SELECTOR_PATTERN, '')
    .replace(EMOJI_PATTERN, ' ')
    .replace(/[¿?¡!.,;:()"'*~_-]+/gu, ' ')
    .replace(/\s+/g, ' ')
    .trim();

// Se revisa sobre el texto crudo, antes de quitar emojis: un mensaje que es
// solo un emoji de aprobacion (👍/🙏/❤️/✅) cuenta como agradecimiento aunque
// no tenga texto.
const isApprovalEmojiOnly = (raw: string): boolean => {
  const trimmed = raw.replace(VARIATION_SELECTOR_PATTERN, '').trim();
  return trimmed.length > 0 && APPROVAL_EMOJI_ONLY_PATTERN.test(trimmed);
};

const escapeRegExp = (value: string): string =>
  value.replace(/[.*+?^${}()|[\]\\]/gu, '\\$&');

const matchesAnyPhrase = (normalized: string, phrases: string[]): boolean =>
  phrases.some((phrase) =>
    new RegExp(`\\b${escapeRegExp(phrase)}\\b`, 'u').test(normalized),
  );

// Mas especificas primero: una confirmacion de contacto siempre debe ganar
// sobre un agradecimiento generico si el mensaje incluye ambos (ej. "ya le
// escribi, gracias").
const CONFIRMATION_PHRASES = [
  'ya le escribi',
  'ya le mande mensaje',
  'ya le mande un mensaje',
  'ya le hable',
  'ya hable con el',
  'ya hable con ella',
  'ya me contacto',
  'ya me hablo',
  'ya me escribio',
  'ya tengo contacto',
  'ya me marco',
  'ya me llamo',
];

const THANKS_PHRASES = [
  'gracias',
  'muchas gracias',
  'mil gracias',
  'perfecto',
  'excelente',
  'genial',
  'de acuerdo',
  'esta bien',
  'ok',
  'okay',
  'listo',
  'entendido',
  'vale',
  'super',
  'buenisimo',
  'buenisima',
];

export type CourtesyIntent = 'THANKS' | 'CONFIRMATION' | null;

export function classifyCourtesyIntent(text: string): CourtesyIntent {
  if (isApprovalEmojiOnly(text)) return 'THANKS';

  const normalized = normalizeForIntent(text);
  if (!normalized) return null;

  if (matchesAnyPhrase(normalized, CONFIRMATION_PHRASES)) return 'CONFIRMATION';
  if (matchesAnyPhrase(normalized, THANKS_PHRASES)) return 'THANKS';
  return null;
}
