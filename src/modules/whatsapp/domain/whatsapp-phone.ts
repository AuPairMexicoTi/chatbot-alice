// Normaliza un numero de telefono mexicano al formato canonico de wa_id
// (521 + 10 digitos) que Meta reporta como identificador de contacto en los
// webhooks de mensajes entrantes -- se usa como Contact.externalId en vez
// del numero crudo, para que el mismo lead resuelva siempre al mismo
// Contact sin importar si el numero llego desde el CRM de APM (10 digitos
// nacionales), desde el propio wa_id de un webhook, o desde el formato de
// envio de la API de Meta (52 + 10 digitos, sin el "1").
//
// Es el sentido inverso de MetaWhatsAppGateway.normalizeRecipientPhoneNumber
// (que convierte AL formato de envio de Meta, sin el "1") -- ese sigue
// existiendo tal cual, solo para armar el payload que se manda a la API de
// WhatsApp, no para resolver identidad de contacto.
export const normalizeWhatsAppContactId = (phoneNumber: string): string => {
  const digits = phoneNumber.replace(/\D/g, '');

  if (/^521\d{10}$/u.test(digits)) return digits;
  if (/^52\d{10}$/u.test(digits)) return `521${digits.slice(2)}`;
  if (/^\d{10}$/u.test(digits)) return `521${digits}`;

  return digits;
};
