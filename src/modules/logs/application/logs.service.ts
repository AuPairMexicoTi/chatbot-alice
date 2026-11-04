import { Injectable, Optional } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as fs from 'node:fs';
import * as path from 'node:path';
import { createHash } from 'node:crypto';
import { ListLogsQueryDto } from '../presentation/dto/list-logs-query.dto';
import { LOG_LEVELS, PINO_LEVEL_TO_NAME } from '../domain/log-levels';

// Mismo shape que `context` del lado de APM (ItLogService.php) para que
// ItLogsPage.jsx muestre ambas fuentes sin lógica especial -- los campos
// que Alice no tiene (user_name, route de Laravel, inscription_id) quedan
// undefined y la UI ya los omite con gracia.
export interface LogContext {
  request_id?: string;
  ip?: string;
  method?: string;
  route?: string;
  url?: string;
  user_agent?: string;
  lead_id?: string;
  exception?: {
    class: string;
    message?: string;
    trace?: string[];
  };
  [extra: string]: unknown;
}

export interface LogEntry {
  id: string;
  timestamp: string;
  level: string;
  channel: string;
  module: string | null;
  message: string;
  context: LogContext;
  actor: string;
  signature: string;
  details: string;
  source_file: string;
  count: number;
  first_seen: string;
  last_seen: string;
}

export interface LogsPage {
  items: LogEntry[];
  page: number;
  limit: number;
  total: number;
  totalEvents: number;
  lastPage: number;
  files: string[];
}

export interface ListLogsFilters {
  search: string;
  level?: string;
  user: string;
  lead: string;
  route: string;
  requestId: string;
  dateFrom: string;
  dateTo: string;
  onlyErrors: boolean;
  group: boolean;
}

const ERROR_LEVELS = new Set(['error', 'fatal']);
// Solo warn/error/fatal se agrupan -- info/debug son eventos de negocio
// (una conversacion, un webhook) que vale la pena ver uno por uno.
const GROUPABLE_LEVELS = new Set(['warn', 'error', 'fatal']);

// Campos propios de pino/pino-http que no son "contexto de negocio" --
// cualquier otra llave de la linea (conversationId, externalId,
// webhookEventId, requestId, etc.) se trata como contexto.
const STANDARD_PINO_FIELDS = new Set([
  'level',
  'time',
  'pid',
  'hostname',
  'context',
  'msg',
  'req',
  'res',
  'responseTime',
  'err',
]);

// Mascara los mismos patrones que ItLogService.php del lado de APM, para que
// un secreto escrito por accidente en un mensaje o en un campo libre de
// metadata no termine visible en esta vista -- el `redact` de pino-http
// (logger.module.ts) solo cubre nombres de campo conocidos en el momento de
// loguear, esto es una segunda capa sobre el texto ya escrito.
const SENSITIVE_PATTERNS: Array<[RegExp, string]> = [
  [/("password"\s*:\s*")[^"]+(")/gi, '$1***$2'],
  [/("token"\s*:\s*")[^"]+(")/gi, '$1***$2'],
  [/("authorization"\s*:\s*")[^"]+(")/gi, '$1***$2'],
  [/("cookie"\s*:\s*")[^"]+(")/gi, '$1***$2'],
  [/(password=)[^\s&]+/gi, '$1***'],
  [/(token=)[^\s&]+/gi, '$1***'],
  [/(authorization=)[^\s&]+/gi, '$1***'],
  [/(Bearer\s+)[A-Za-z0-9\-._~+/]+=*/gi, '$1***'],
];

const sanitize = (value: string): string =>
  SENSITIVE_PATTERNS.reduce(
    (acc, [pattern, replacement]) => acc.replace(pattern, replacement),
    value,
  );

const formatTimestamp = (epochMs: number): string => {
  const date = new Date(epochMs);
  const pad = (n: number) => String(n).padStart(2, '0');
  return (
    `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())} ` +
    `${pad(date.getHours())}:${pad(date.getMinutes())}:${pad(date.getSeconds())}`
  );
};

const isRecord = (value: unknown): value is Record<string, unknown> =>
  typeof value === 'object' && value !== null && !Array.isArray(value);

@Injectable()
export class LogsService {
  private readonly logsDir: string;
  private readonly channel: string;

  constructor(
    private readonly configService: ConfigService,
    // Overridable solo para pruebas, que no deben leer/pisar el
    // logs/alice.log real -- en produccion siempre usa process.cwd()/logs.
    // @Optional() le dice a Nest que no intente inyectar este string por DI
    // (no hay provider para ese token); sin esto el modulo real truena al
    // arrancar.
    @Optional() logsDir?: string,
  ) {
    this.logsDir = logsDir ?? path.resolve(process.cwd(), 'logs');
    this.channel = this.configService.get<string>('app.nodeEnv', 'development');
  }

  list(query: ListLogsQueryDto): LogsPage {
    const page = Math.max(1, query.page ?? 1);
    const limit = Math.min(100, Math.max(1, query.limit ?? 50));
    const filters: ListLogsFilters = {
      search: (query.search ?? '').trim().toLowerCase(),
      level: query.level,
      user: (query.user ?? '').trim().toLowerCase(),
      lead: (query.lead ?? '').trim(),
      route: (query.route ?? '').trim().toLowerCase(),
      requestId: (query.request_id ?? '').trim(),
      dateFrom: this.readDate(query.date_from),
      dateTo: this.readDate(query.date_to),
      onlyErrors: Boolean(query.only_errors),
      group: query.group ?? true,
    };

    const files = this.getLogFiles();

    const entries = files
      .flatMap((file) => this.parseLogFile(file))
      .filter((entry) => this.matchesFilters(entry, filters))
      .sort((a, b) =>
        a.timestamp < b.timestamp ? 1 : a.timestamp > b.timestamp ? -1 : 0,
      );

    const totalEvents = entries.length;
    const rows = filters.group ? this.groupEntries(entries) : entries;

    const total = rows.length;
    const lastPage = Math.max(1, Math.ceil(total / limit));
    const safePage = Math.min(page, lastPage);
    const offset = (safePage - 1) * limit;

    return {
      items: rows.slice(offset, offset + limit),
      page: safePage,
      limit,
      total,
      totalEvents,
      lastPage,
      files: files.map((f) => path.basename(f)),
    };
  }

  getLevels(): readonly string[] {
    return LOG_LEVELS;
  }

  private readDate(value?: string): string {
    const trimmed = (value ?? '').trim();
    return /^\d{4}-\d{2}-\d{2}$/.test(trimmed) ? trimmed : '';
  }

  private getLogFiles(): string[] {
    let names: string[];
    try {
      names = fs.readdirSync(this.logsDir);
    } catch {
      return [];
    }

    return names
      .filter((name) => name.endsWith('.log'))
      .map((name) => path.join(this.logsDir, name))
      .filter((filePath) => {
        try {
          return fs.statSync(filePath).isFile();
        } catch {
          return false;
        }
      });
  }

  // A diferencia del log de Laravel (lineas de encabezado + continuaciones
  // que hay que agrupar), cada linea de Pino ya es un objeto JSON completo
  // e independiente -- una linea invalida simplemente se descarta, sin
  // arriesgar las demas.
  private parseLogFile(filePath: string): LogEntry[] {
    const fileName = path.basename(filePath);
    let content: string;
    try {
      content = fs.readFileSync(filePath, 'utf8');
    } catch {
      return [];
    }

    const entries: LogEntry[] = [];
    for (const line of content.split('\n')) {
      const trimmed = line.trim();
      if (!trimmed) continue;

      let parsed: Record<string, unknown>;
      try {
        const value: unknown = JSON.parse(trimmed);
        if (!isRecord(value)) continue;
        parsed = value;
      } catch {
        continue;
      }

      const levelNumber = typeof parsed.level === 'number' ? parsed.level : 30;
      const levelName = PINO_LEVEL_TO_NAME[levelNumber] ?? 'info';
      const time = typeof parsed.time === 'number' ? parsed.time : Date.now();
      const moduleName =
        typeof parsed.context === 'string' ? parsed.context : null;
      const message = sanitize(
        typeof parsed.msg === 'string' ? parsed.msg : '',
      );
      const details = sanitize(JSON.stringify(parsed, null, 2));
      const timestamp = formatTimestamp(time);
      const context = this.buildContext(parsed);

      entries.push({
        id: createHash('sha1')
          .update(
            `${timestamp}|${levelName}|${message}|${details.slice(0, 120)}`,
          )
          .digest('hex'),
        timestamp,
        level: levelName,
        channel: this.channel,
        module: moduleName,
        message,
        context,
        actor: this.resolveActor(context),
        signature: this.buildSignature(levelName, moduleName, message, context),
        details,
        source_file: fileName,
        count: 1,
        first_seen: timestamp,
        last_seen: timestamp,
      });
    }

    return entries;
  }

  // Junta lo que pino-http ya trae para peticiones HTTP (req.*) con
  // cualquier campo propio que el codigo haya agregado al loguear (ej.
  // `conversationId`, `webhookEventId`) y lo acomoda bajo las mismas
  // llaves que usa ItLogService.php del lado de APM.
  private buildContext(parsed: Record<string, unknown>): LogContext {
    const context: LogContext = {};

    const req = isRecord(parsed.req) ? parsed.req : null;
    if (req) {
      if (typeof req.id === 'string' || typeof req.id === 'number')
        context.request_id = String(req.id);
      if (typeof req.method === 'string') context.method = req.method;
      if (typeof req.url === 'string') context.route = req.url;
      if (typeof req.remoteAddress === 'string') context.ip = req.remoteAddress;
      const headers = isRecord(req.headers) ? req.headers : null;
      if (headers && typeof headers['user-agent'] === 'string') {
        context.user_agent = headers['user-agent'];
      }
    }

    const err = isRecord(parsed.err) ? parsed.err : null;
    if (err) {
      context.exception = {
        class: typeof err.type === 'string' ? err.type : 'Error',
        message: typeof err.message === 'string' ? err.message : undefined,
        trace:
          typeof err.stack === 'string' ? err.stack.split('\n') : undefined,
      };
    }

    for (const [key, value] of Object.entries(parsed)) {
      if (STANDARD_PINO_FIELDS.has(key)) continue;
      context[key] = value;
    }

    // El equivalente mas cercano a "lead_id" en Alice es la conversacion
    // (o el contacto) a la que pertenece el evento -- se expone con el
    // mismo nombre que usa APM para que el filtro/columna "Lead" de
    // ItLogsPage.jsx funcione igual para ambas fuentes sin cambios.
    if (!context.lead_id) {
      const candidate = parsed.conversationId ?? parsed.contactId;
      if (typeof candidate === 'string') context.lead_id = candidate;
    }
    if (!context.request_id && typeof parsed.requestId === 'string') {
      context.request_id = parsed.requestId;
    }

    return context;
  }

  private resolveActor(context: LogContext): string {
    if (context.lead_id) return `lead:${context.lead_id}`;
    if (context.ip) return `ip:${context.ip}`;
    return 'unknown';
  }

  // Identifica "el mismo error" para que ocurrencias repetidas se colapsen
  // en una sola fila -- mismo criterio que buildSignature() en
  // ItLogService.php (clase+ubicacion de la excepcion, o el mensaje con
  // los numeros reemplazados cuando no hay excepcion).
  private buildSignature(
    level: string,
    moduleName: string | null,
    message: string,
    context: LogContext,
  ): string {
    const what = context.exception
      ? `${context.exception.class}:${context.exception.message ?? ''}`
      : message.replace(/\d+/g, '#');

    return createHash('sha1')
      .update(`${level}|${moduleName ?? ''}|${what}|${context.route ?? ''}`)
      .digest('hex');
  }

  private groupEntries(entries: LogEntry[]): LogEntry[] {
    const rows: LogEntry[] = [];
    const groupIndex = new Map<string, number>();

    // Las entradas llegan de la mas nueva a la mas vieja, asi que la
    // primera que se ve para una firma es la representante del grupo.
    for (const entry of entries) {
      if (!GROUPABLE_LEVELS.has(entry.level)) {
        rows.push(entry);
        continue;
      }

      const key = `${entry.signature}|${entry.actor}`;
      const existingIndex = groupIndex.get(key);
      if (existingIndex !== undefined) {
        rows[existingIndex].count += 1;
        rows[existingIndex].first_seen = entry.timestamp;
        continue;
      }

      groupIndex.set(key, rows.length);
      rows.push(entry);
    }

    return rows;
  }

  private matchesFilters(entry: LogEntry, filters: ListLogsFilters): boolean {
    if (filters.level && entry.level !== filters.level) return false;
    if (filters.onlyErrors && !ERROR_LEVELS.has(entry.level)) return false;

    if (filters.dateFrom && entry.timestamp < `${filters.dateFrom} 00:00:00`)
      return false;
    if (filters.dateTo && entry.timestamp > `${filters.dateTo} 23:59:59`)
      return false;

    if (filters.requestId && entry.context.request_id !== filters.requestId)
      return false;

    if (filters.user) {
      const haystack = [entry.context.ip ?? ''].join(' ').toLowerCase();
      if (!haystack.includes(filters.user)) return false;
    }

    if (filters.lead && filters.lead !== entry.context.lead_id) return false;

    if (filters.route) {
      const haystack = [entry.context.route ?? '', entry.context.method ?? '']
        .join(' ')
        .toLowerCase();
      if (!haystack.includes(filters.route)) return false;
    }

    if (filters.search) {
      const haystack = [
        entry.message,
        entry.details,
        entry.module ?? '',
        entry.channel,
        entry.source_file,
      ]
        .join(' ')
        .toLowerCase();
      if (!haystack.includes(filters.search)) return false;
    }

    return true;
  }
}
