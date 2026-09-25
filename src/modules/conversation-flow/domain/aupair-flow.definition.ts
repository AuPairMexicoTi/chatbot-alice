import { FlowDefinition } from './conversation-flow.types';

const country = (name: string, detail: string): string =>
  `🌍 *${name}*\n\n${detail}\n\n📌 Nota: Aplican requisitos adicionales de perfil que evaluaremos contigo durante tu proceso inicial. 🌟\n\n¿Estás lista para el siguiente paso? 🤔✈️ Selecciona una opción:\n\n1️⃣ 🚀 ¡Ya quiero aplicar! 📝💖\n2️⃣ 🔙 Regresar al menú principal 🏠\n3️⃣ 🌍 Ver otros países 🗺️`;

export const aupairFlowDefinition: FlowDefinition = {
  entryNodeId: 'menu',
  maxAttempts: 3,
  nodes: {
    menu: {
      id: 'menu',
      content:
        '¡Hola! 👋✨ Te damos la bienvenida a Au Pair México 🇲🇽✈️💖.\n\nSer Au Pair es un reto personal increíble 🌟: es vivir en el extranjero 🌍, perfeccionar un idioma 🗣️, cuidar a los niños de una familia 👨‍👩‍👧‍👦 y reinventarte como persona 🌱.\n\nEstamos avalados por IAPA (International Au Pair Association) 🤝 y WYSE Travel Confederation 🛡️.\n\n¿Cómo te gustaría comenzar tu aventura hoy? 🎒 Selecciona una opción del menú 👇:\n\n1️⃣ 🌍 Países Disponibles 🗺️\n2️⃣ 👧 ¿Qué hace una Au Pair? 🧸\n3️⃣ 📋 Proceso General de Aplicación 🚀\n4️⃣ ✨ ¡Ya quiero aplicar! 📝💖',
      options: {
        '1|1️⃣|países|paises': 'countries',
        '2|2️⃣|que hace una au pair': 'what-is-aupair',
        '3|3️⃣|proceso': 'process',
        '4|4️⃣|aplicar': 'handoff',
      },
    },
    countries: {
      id: 'countries',
      content:
        '¡Excelente elección! 🎉 Contamos con 9 destinos increíbles en Europa 🇪🇺 y Norteamérica 🇺🇸 para nuestros programas. 🗺️✨\n\nElige el país que más te llame la atención para ver todos sus detalles 🔎, requisitos 📝 y beneficios 🎁:\n\n1️⃣ 🇩🇪 Alemania 🥨\n2️⃣ 🇧🇪 Bélgica 🍫\n3️⃣ 🇩🇰 Dinamarca 🚲\n4️⃣ 🇺🇸 Estados Unidos 🗽\n5️⃣ 🇫🇷 Francia 🥐\n6️⃣ 🇮🇹 Italia 🍕\n7️⃣ 🇳🇱 Países Bajos 🌷\n8️⃣ 🇸🇪 Suecia ❄️\n9️⃣ 🇨🇭 Suiza 🏔️',
      options: {
        '1|1️⃣|alemania': 'germany',
        '2|2️⃣|bélgica|belgica': 'belgium',
        '3|3️⃣|dinamarca': 'denmark',
        '4|4️⃣|estados unidos|usa|eeuu': 'usa',
        '5|5️⃣|francia': 'france',
        '6|6️⃣|italia': 'italy',
        '7|7️⃣|países bajos|paises bajos|holanda': 'netherlands',
        '8|8️⃣|suecia': 'sweden',
        '9|9️⃣|suiza': 'switzerland',
      },
    },
    germany: {
      id: 'germany',
      content: country(
        'Alemania',
        '¡Elige la increíble experiencia en Alemania! 🏰🥨\n\n⏱️ Duración: 12 meses | 35 horas semanales ⏰.\n🎁 Beneficios: Alimentación 🍲 y alojamiento 🏡, apoyo económico de *€370 EUR al mes* 💶 (*€280 de apoyo + €90 para curso*) 📚, seguro médico 🏥, *vuelos incluidos* ✈️ (al completar estadía mínima), 1.5 días de descanso semanales 🛋️, 4 semanas de vacaciones 🏖️, certificado Au Pair 📜 y supervisión 🤝.\n📋 Requisitos: Mujer soltera sin hijos 👧 (18-26 años) 🎂, preparatoria terminada 🎓.',
      ),
      options: {
        '1|1️⃣|aplicar': 'handoff',
        '2|2️⃣|menú|menu|regresar': 'menu',
        '3|3️⃣|otros países|otros paises|países|paises': 'countries',
      },
    },
    belgium: {
      id: 'belgium',
      content: country(
        'Bélgica',
        '¡Descubre el corazón de Europa en Bélgica! 🇧🇪🍫🇪🇺\n\n⏱️ Duración: 12 meses | 20 horas semanales ⏰.\n🎁 Beneficios: Alimentación 🍲 y alojamiento 🏡, apoyo económico de €450 EUR al mes 💶, apoyo para curso de idioma (neerlandés, alemán o francés) 🗣️, seguro médico 🏥, hasta 2 semanas de vacaciones 🏖️, certificado Au Pair 📜 y supervisión continua 🤝.\n📋 Requisitos: Mujer soltera sin hijos 👧 (18-25 años) 🎂, preparatoria terminada 🎓.',
      ),
      options: {
        '1|1️⃣|aplicar': 'handoff',
        '2|2️⃣|menú|menu|regresar': 'menu',
        '3|3️⃣|otros países|otros paises|países|paises': 'countries',
      },
    },
    usa: {
      id: 'usa',
      content: country(
        'Estados Unidos',
        '¡Vive esta gran experiencia en Estados Unidos! 🇺🇸🗽🍔\n\n⏱️ Duración: 12 meses | 45 horas semanales ⏰.\n🎁 Beneficios: Alimentación 🍲 y alojamiento 🏡, apoyo económico de *$783 USD mensuales* 💵, seguro de gastos médicos 🏥, *vuelos incluidos* ✈️, 1.5 días de descanso semanales 🛋️, 2 semanas de vacaciones al año 🏖️, certificado Au Pair 📜 y supervisión continua 🤝.\n📋 Requisitos: Mujer soltera sin hijos 👧 (18-26 años) 🎂, preparatoria terminada 🎓.',
      ),
      options: {
        '1|1️⃣|aplicar': 'handoff',
        '2|2️⃣|menú|menu|regresar': 'menu',
        '3|3️⃣|otros países|otros paises|países|paises': 'countries',
      },
    },
    france: {
      id: 'france',
      content: country(
        'Francia',
        '¡Aprende francés y vive el arte en Francia! 🇫🇷🥐🗼\n\n⏱️ Duración: 12 meses | 35 horas semanales ⏰ + 2 Babysitting al mes 🧸.\n🎁 Beneficios: Alimentación 🍲 y alojamiento 🏡, apoyo económico de €320 EUR al mes 💶, seguro de gastos médicos 🏥, 1.5 días de descanso semanales 🛋️, 2 semanas de vacaciones al año 🏖️, certificado Au Pair 📜 y supervisión 🤝.\n📋 Requisitos: Mujer soltera sin hijos 👧 (18-26 años) 🎂, preparatoria terminada 🎓.',
      ),
      options: {
        '1|1️⃣|aplicar': 'handoff',
        '2|2️⃣|menú|menu|regresar': 'menu',
        '3|3️⃣|otros países|otros paises|países|paises': 'countries',
      },
    },
    italy: {
      id: 'italy',
      content: country(
        'Italia',
        '¡Pasa una temporada inolvidable en Italia! 🇮🇹🍕🏛️🍝\n\n⏱️ Duración: 3 meses | 30 horas semanales ⏰.\n🎁 Beneficios: Alimentación 🍲 y alojamiento 🏡, apoyo económico de €280 a €320 EUR al mes 💶, 1.5 días de descanso a la semana 🛋️, certificado Au Pair 📜 y supervisión 🤝.\n📋 Requisitos: Mujer soltera sin hijos 👧 (18-28 años) 🎂, nivel de inglés certificado B2/C1 o italiano A2 🗣️, saber manejar estándar 🚗, saber nadar 🏊 (opcional), experiencia con niños menores de 2 años 🍼. ¡Programa para no fumadoras! 🚫🚬.',
      ),
      options: {
        '1|1️⃣|aplicar': 'handoff',
        '2|2️⃣|menú|menu|regresar': 'menu',
        '3|3️⃣|otros países|otros paises|países|paises': 'countries',
      },
    },
    netherlands: {
      id: 'netherlands',
      content: country(
        'Países Bajos',
        '¡Recorre hermosos paisajes en bicicleta en Países Bajos! 🇳🇱🌷🚲🧀\n\n⏱️ Duración: 12 meses | 30 horas semanales ⏰.\n🎁 Beneficios: Alimentación 🍲 y alojamiento 🏡, apoyo económico de €320 a €340 EUR mensuales 💶, seguro de gastos médicos 🏥, 1.5 días de descanso a la semana 🛋️, 2 semanas de vacaciones 🏖️, certificado Au Pair 📜 y supervisión 🤝.\n📋 Requisitos: Mujer soltera sin hijos 👧 (18-25 años) 🎂.',
      ),
      options: {
        '1|1️⃣|aplicar': 'handoff',
        '2|2️⃣|menú|menu|regresar': 'menu',
        '3|3️⃣|otros países|otros paises|países|paises': 'countries',
      },
    },
    denmark: {
      id: 'denmark',
      content: country(
        'Dinamarca',
        '¡Vive una experiencia inolvidable en Dinamarca! 🇩🇰🏰🚲\n\n⏱️ Duración: 24 meses | 30 horas semanales ⏰.\n🎁 Beneficios: Alimentación y alojamiento 🏡, apoyo económico de 5,277 DKK al mes 💰, descanso de 1.5 días semanales 🛋️, vacaciones de 4 semanas al año (periodo de 2 semanas) 🏖️, certificado de Au Pair 📜, supervisión durante tu estancia en el extranjero 🤝, documentación y asesoría para el trámite de la visa 📋, apoyo para curso de idioma danés 📚 e incluye vuelo de regreso* ✈️ (aplican restricciones).\n📋 Requisitos: Soltera(o) y sin hijos 👧🧑, entre 18 y 29 años, certificado de preparatoria 🎓, saber manejar estándar 🚗, inglés conversacional B1 🗣️, no fumar 🚭 y no tener brackets.',
      ),
      options: {
        '1|1️⃣|aplicar': 'handoff',
        '2|2️⃣|menú|menu|regresar': 'menu',
        '3|3️⃣|otros países|otros paises|países|paises': 'countries',
      },
    },
    sweden: {
      id: 'sweden',
      content: country(
        'Suecia',
        '¡Disfruta de una gran aventura en Suecia! 🇸🇪❄️✨\n\n⏱️ Duración: 12 meses | 25 horas semanales ⏰.\n🎁 Beneficios: Alimentación y alojamiento 🏡, apoyo económico de 7,868 SEK al mes 💰, descanso de 1 día semanal 🛋️, vacaciones de 2 semanas al año 🏖️, certificado de Au Pair 📜, supervisión durante tu estancia en el extranjero 🤝, documentación y asesoría para el trámite de la visa 📋, apoyo para curso de idioma sueco 📚 e incluye vuelo de regreso* ✈️ (aplican restricciones).\n📋 Requisitos: Soltera(o) y sin hijos 👧🧑, entre 18 y 30 años, certificado de preparatoria 🎓, saber manejar estándar 🚗, inglés conversacional B1 🗣️, no fumar 🚭 y no tener brackets.',
      ),
      options: {
        '1|1️⃣|aplicar': 'handoff',
        '2|2️⃣|menú|menu|regresar': 'menu',
        '3|3️⃣|otros países|otros paises|países|paises': 'countries',
      },
    },
    switzerland: {
      id: 'switzerland',
      content: country(
        'Suiza',
        '¡Vive entre los espectaculares Alpes en Suiza! 🇨🇭🏔️🍫\n\n⏱️ Duración: 12 meses | 30 horas semanales ⏰ + 2 Babysitting al mes 🧸.\n🎁 Beneficios: Alimentación 🍲 y alojamiento 🏡, apoyo económico de 600 a 700 CHF mensuales 💶, 50% de apoyo en seguro médico 🏥, apoyo para estudiar el idioma en escuela oficial 📚, 1.5 días de descanso 🛋️, 4 semanas de vacaciones 🏖️, certificado 📜 y supervisión 🤝.\n📋 Requisitos: Mujer soltera sin hijos 👧 (18-25 años) 🎂. ¡CON NACIONALIDAD EUROPEA OBLIGATORIA! 🇪🇺',
      ),
      options: {
        '1|1️⃣|aplicar': 'handoff',
        '2|2️⃣|menú|menu|regresar': 'menu',
        '3|3️⃣|otros países|otros paises|países|paises': 'countries',
      },
    },
    'what-is-aupair': {
      id: 'what-is-aupair',
      content:
        '👧 ¿Qué hace una Au Pair? 💖🧸\n\n¡Serás la hermana mayor del hogar! 🏡 Apoyarás a la familia anfitriona en el cuidado de los pequeños 👶 y ¡compartirás tu cultura todos los días! 🌎✨\n\n¿Estás lista para el siguiente paso? 🤔✈️ Selecciona una opción:\n\n1️⃣ 🚀 ¡Ya quiero aplicar! 📝💖\n2️⃣ 🔙 Regresar al menú principal 🏠',
      options: {
        '1|1️⃣|aplicar': 'handoff',
        '2|2️⃣|menú|menu|regresar': 'menu',
      },
    },
    process: {
      id: 'process',
      content:
        '🚀 ¿Qué sigue? ¡Tu proceso! 🗺️✈️\n\n1️⃣ Realiza tu inscripción.\n2️⃣ Completa tu expediente: 📂 Entrega toda tu documentación y cumple con los requisitos.\n3️⃣ Elige una familia: 👨‍👩‍👧‍👦 Haz match con tu familia ideal.\n4️⃣ Tramita tu visa: 🛂 Es momento de tramitarla e irte despidiendo de tus amigos.\n5️⃣ ¡Disfruta la experiencia! 🎉 Vive el mejor año de tu vida.\n\n¿Estás lista para el siguiente paso? 🤔✈️ Selecciona una opción:\n\n1️⃣ 🚀 ¡Ya quiero aplicar! 📝💖\n2️⃣ 🔙 Regresar al menú principal 🏠',
      options: {
        '1|1️⃣|aplicar': 'handoff',
        '2|2️⃣|menú|menu|regresar': 'menu',
      },
    },
    handoff: {
      id: 'handoff',
      content:
        '¡Excelente! 🙌✨ Tu asesor asignado se pondrá en contacto contigo por este medio o por llamada telefónica. 📞\n\n¡Activa tus notificaciones! 🔔💖',
      terminal: 'HANDOFF',
    },
    closed: {
      id: 'closed',
      content:
        '¡Gracias por tu tiempo! Cuando quieras retomar tu aventura como Au Pair, aquí estaré.',
      terminal: 'CLOSED',
    },
  },
};
