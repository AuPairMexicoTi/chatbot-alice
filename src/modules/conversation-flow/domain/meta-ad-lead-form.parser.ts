export interface MetaAdLeadFormCandidates {
  name?: string;
  age?: string;
  email?: string;
}

// Los anuncios "Click to WhatsApp" de Meta precargan el compositor con un
// mensaje de formulario cuando el lead toca el boton del anuncio sin
// editarlo -- "Full name:"/"WhatsApp number:" son las etiquetas fijas de
// los campos estandar de Meta (no cambian segun las preguntas
// personalizadas que arme cada campana de APM), asi que sirven de firma
// confiable para detectar el formato sin falsos positivos contra mensajes
// organicos de un lead real escribiendole a Alice.
export const parseMetaAdLeadFormCandidates = (
  text: string,
): MetaAdLeadFormCandidates | null => {
  if (!/Full name:/i.test(text) || !/WhatsApp number:/i.test(text)) {
    return null;
  }

  const candidates: MetaAdLeadFormCandidates = {};

  const nameMatch = text.match(/Full name:\s*(.+)/i);
  if (nameMatch) {
    // Meta a veces manda el nombre con basura de mention/placeholder (ej.
    // "@maricruz mendragen ^") -- se limpia a solo letras/espacios antes de
    // validarlo como nombre.
    const sanitized = nameMatch[1]
      .replace(/[^\p{L}\p{M}\s]/gu, ' ')
      .replace(/\s+/g, ' ')
      .trim();
    if (sanitized) candidates.name = sanitized;
  }

  const emailMatch = text.match(/Email:\s*(\S+@\S+)/i);
  if (emailMatch) candidates.email = emailMatch[1].trim();

  // La pregunta de edad es una de las personalizadas por campana (ej. "De
  // 21 a 23 años", no un numero exacto) -- se busca cualquier linea que
  // mencione "edad" y se toma el primer numero como candidato, que luego
  // valida el motor contra el rango permitido del programa.
  const ageMatch = text.match(/edad[^:\n]*:[^\d\n]*(\d{1,2})/iu);
  if (ageMatch) candidates.age = ageMatch[1];

  return candidates;
};
