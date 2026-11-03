import * as fs from 'node:fs';
import * as os from 'node:os';
import * as path from 'node:path';
import { ConfigService } from '@nestjs/config';
import { LogsService } from './logs.service';

describe('LogsService', () => {
  // Directorio propio por cada corrida, aislado del logs/alice.log real --
  // si leyera el directorio compartido, lo que ya haya logueado la app en
  // desarrollo contaminaria los asserts de "cuantas filas hay".
  let logsDir: string;
  let testFile: string;
  let service: LogsService;

  const writeLines = (lines: Array<Record<string, unknown>>) => {
    fs.writeFileSync(
      testFile,
      lines.map((line) => JSON.stringify(line)).join('\n') + '\n',
    );
  };

  beforeEach(() => {
    logsDir = fs.mkdtempSync(path.join(os.tmpdir(), 'alice-logs-spec-'));
    testFile = path.join(logsDir, 'logs.service.spec.log');
    service = new LogsService(
      { get: () => 'test' } as unknown as ConfigService,
      logsDir,
    );
  });

  afterEach(() => {
    fs.rmSync(logsDir, { recursive: true, force: true });
  });

  it('parses a plain info line', () => {
    writeLines([
      {
        level: 30,
        time: Date.parse('2026-11-03T10:00:00Z'),
        context: 'TestContext',
        msg: 'hola',
      },
    ]);

    const result = service.list({ page: 1, limit: 50 });

    expect(result.items).toHaveLength(1);
    expect(result.items[0]).toMatchObject({
      level: 'info',
      module: 'TestContext',
      message: 'hola',
    });
  });

  it('structures an err field into context.exception', () => {
    writeLines([
      {
        level: 50,
        time: Date.now(),
        context: 'ProcessInboundWhatsAppMessageUseCase',
        err: {
          type: 'Error',
          message: 'lead not found',
          stack: 'Error: lead not found\n    at x',
        },
        conversationId: 'conv-1',
        msg: 'Fallo el handoff a APM',
      },
    ]);

    const result = service.list({ page: 1, limit: 50 });

    expect(result.items[0].context.exception).toEqual({
      class: 'Error',
      message: 'lead not found',
      trace: ['Error: lead not found', '    at x'],
    });
    expect(result.items[0].context.lead_id).toBe('conv-1');
  });

  it('groups repeated errors with the same signature and actor into one row', () => {
    const base = Date.parse('2026-11-03T10:00:00Z');
    writeLines([
      {
        level: 50,
        time: base,
        context: 'X',
        err: { type: 'Error', message: 'boom' },
        conversationId: 'conv-1',
        msg: 'Fallo',
      },
      {
        level: 50,
        time: base + 1000,
        context: 'X',
        err: { type: 'Error', message: 'boom' },
        conversationId: 'conv-1',
        msg: 'Fallo',
      },
      {
        level: 50,
        time: base + 2000,
        context: 'X',
        err: { type: 'Error', message: 'boom' },
        conversationId: 'conv-2',
        msg: 'Fallo',
      },
    ]);

    const result = service.list({ page: 1, limit: 50, group: true });

    // conv-1's two occurrences collapse into one row (count 2); conv-2 is a
    // distinct actor and stays separate.
    expect(result.total).toBe(2);
    expect(result.totalEvents).toBe(3);
    const conv1Row = result.items.find(
      (item) => item.context.lead_id === 'conv-1',
    );
    expect(conv1Row?.count).toBe(2);
  });

  it('does not group info-level entries even when repeated', () => {
    writeLines([
      { level: 30, time: Date.now(), context: 'X', msg: 'evento' },
      { level: 30, time: Date.now(), context: 'X', msg: 'evento' },
    ]);

    const result = service.list({ page: 1, limit: 50, group: true });

    expect(result.total).toBe(2);
  });

  it('filters by only_errors', () => {
    writeLines([
      { level: 30, time: Date.now(), msg: 'info' },
      { level: 50, time: Date.now(), msg: 'error' },
    ]);

    const result = service.list({
      page: 1,
      limit: 50,
      only_errors: true,
      group: false,
    });

    expect(result.items).toHaveLength(1);
    expect(result.items[0].level).toBe('error');
  });

  it('filters by lead (conversationId)', () => {
    writeLines([
      { level: 30, time: Date.now(), conversationId: 'conv-a', msg: 'a' },
      { level: 30, time: Date.now(), conversationId: 'conv-b', msg: 'b' },
    ]);

    const result = service.list({
      page: 1,
      limit: 50,
      lead: 'conv-a',
      group: false,
    });

    expect(result.items).toHaveLength(1);
    expect(result.items[0].context.lead_id).toBe('conv-a');
  });

  it('filters by date range', () => {
    writeLines([
      { level: 30, time: Date.parse('2026-10-01T00:00:00Z'), msg: 'viejo' },
      { level: 30, time: Date.parse('2026-11-03T00:00:00Z'), msg: 'nuevo' },
    ]);

    const result = service.list({
      page: 1,
      limit: 50,
      date_from: '2026-11-01',
      group: false,
    });

    expect(result.items).toHaveLength(1);
    expect(result.items[0].message).toBe('nuevo');
  });

  it('filters by request_id', () => {
    writeLines([
      { level: 30, time: Date.now(), req: { id: 1 }, msg: 'uno' },
      { level: 30, time: Date.now(), req: { id: 2 }, msg: 'dos' },
    ]);

    const result = service.list({
      page: 1,
      limit: 50,
      request_id: '1',
      group: false,
    });

    expect(result.items).toHaveLength(1);
    expect(result.items[0].message).toBe('uno');
  });

  it('skips malformed lines without failing the whole file', () => {
    fs.writeFileSync(
      testFile,
      'not json\n' +
        JSON.stringify({ level: 30, time: Date.now(), msg: 'ok' }) +
        '\n',
    );

    const result = service.list({ page: 1, limit: 50 });

    expect(result.items).toHaveLength(1);
    expect(result.items[0].message).toBe('ok');
  });
});
