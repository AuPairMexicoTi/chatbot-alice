// Niveles nativos de Pino (no los PSR-3 de Laravel: ese vocabulario es
// distinto -- APM usa debug/info/notice/warning/error/critical/alert/
// emergency, Alice usa trace/debug/info/warn/error/fatal). El frontend ya
// arma el selector de nivel a partir de `meta.levels` de la respuesta, asi
// que no hace falta que coincidan entre las dos fuentes.
export const LOG_LEVELS = ['trace', 'debug', 'info', 'warn', 'error', 'fatal'] as const;
export type LogLevelValue = (typeof LOG_LEVELS)[number];

// Pino serializa el nivel como numero (10=trace..60=fatal) en cada linea.
export const PINO_LEVEL_TO_NAME: Record<number, LogLevelValue> = {
  10: 'trace',
  20: 'debug',
  30: 'info',
  40: 'warn',
  50: 'error',
  60: 'fatal',
};
