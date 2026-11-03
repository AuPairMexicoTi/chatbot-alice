import { normalizeWhatsAppContactId } from './whatsapp-phone';

describe('normalizeWhatsAppContactId', () => {
  it('keeps an already-canonical wa_id untouched', () => {
    expect(normalizeWhatsAppContactId('5215512345678')).toBe('5215512345678');
  });

  it('adds the legacy mobile "1" to the Meta send format', () => {
    expect(normalizeWhatsAppContactId('525512345678')).toBe('5215512345678');
  });

  it('adds the full country+mobile prefix to a bare 10-digit national number', () => {
    expect(normalizeWhatsAppContactId('5512345678')).toBe('5215512345678');
  });

  it('strips formatting characters before normalizing', () => {
    expect(normalizeWhatsAppContactId('+52 1 55 1234 5678')).toBe(
      '5215512345678',
    );
    expect(normalizeWhatsAppContactId('(55) 1234-5678')).toBe('5215512345678');
  });

  it('returns the digits as-is for formats it does not recognize', () => {
    expect(normalizeWhatsAppContactId('12345')).toBe('12345');
  });
});
