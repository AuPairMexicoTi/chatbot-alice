import { parseMetaAdLeadFormCandidates } from './meta-ad-lead-form.parser';

describe('parseMetaAdLeadFormCandidates', () => {
  it('returns null for an organic message with no ad-form markers', () => {
    expect(
      parseMetaAdLeadFormCandidates('Hola, quiero más información'),
    ).toBeNull();
  });

  it('extracts and sanitizes name, email and the first age found', () => {
    const text = [
      '¡Hola! Completé el formulario y me gustaría obtener más información sobre el negocio.',
      '',
      'Full name: @maricruz mendragen ^',
      'WhatsApp number: +527121476178',
      'Email: maricruzmondragon333@gmail.com',
      '¿A qué país te gustaría ir?: Estados Unidos',
      '¿Qué edad tienes actualmente?: De 21 a 23 años',
      '¿Cuál es tu status actual?: Soltera y sin hijos',
    ].join('\n');

    expect(parseMetaAdLeadFormCandidates(text)).toEqual({
      name: 'maricruz mendragen',
      age: '21',
      email: 'maricruzmondragon333@gmail.com',
    });
  });

  it('omits candidates it cannot find without failing the whole parse', () => {
    const text = 'Full name: Ana López\nWhatsApp number: +525500000000\n';

    expect(parseMetaAdLeadFormCandidates(text)).toEqual({ name: 'Ana López' });
  });
});
