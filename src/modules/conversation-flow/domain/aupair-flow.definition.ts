import { FlowDefinition } from './conversation-flow.types';

const nextStepOptions = {
  '1|1️⃣|aplicar|ya quiero aplicar|contactar asesor|contactar a mi asesor':
    'human-handoff',
  '2|2️⃣|menú|menu|regresar|regresar al menú principal|regresar al menu principal':
    'main-menu',
};

export const aupairFlowDefinition: FlowDefinition = {
  // IDs nuevos para que una instalación que aún conserva los nodos del flujo
  // anterior en alc_flow_nodes no altere este guion.
  entryNodeId: 'main-menu',
  maxAttempts: 3,
  nodes: {
    'main-menu': {
      id: 'main-menu',
      content:
        '¡Hola! 👋✨ Te damos la bienvenida a Au Pair Mexico 🇲🇽✈️\n\nSer Au Pair es una experiencia increíble que te permitirá vivir en el extranjero con todo pagado a cambio de cuidar a los niños de una familia anfitriona 👧🧸\n\nPodrás conocer lugares nuevos, perfeccionar otro idioma y recibir apoyo económico durante toda tu estancia 🌎💫\n\nSomos una empresa con 24 años de experiencia, ¡súmate a las más de 8,000 Au Pairs que han vivido esta aventura con nosotros! Siempre te acompañaremos en todo el proceso garantizando tu tranquilidad y seguridad. Además, estamos avalados por IAPA, WYSE Travel Confederation y somos miembros fundadores de la AMAAP. 🌍\n\n🎒💖 ¿Cómo te gustaría comenzar tu aventura? Selecciona una opción:\n\n1️⃣ 👧 ¿Qué hace una Au Pair?\n2️⃣ 🌟 Requisitos para ser Au Pair\n3️⃣ 📋 Proceso general de aplicación\n4️⃣ 👀 ¿Es seguro y confiable?\n5️⃣ 💌 ¡Contactar a mi asesor!',
      options: {
        '1|1️⃣|qué hace una au pair|que hace una au pair': 'what-is-aupair-pdf',
        '2|2️⃣|requisitos|requisitos para ser au pair': 'requirements',
        '3|3️⃣|proceso|proceso general de aplicación|proceso general de aplicacion':
          'application-process',
        '4|4️⃣|es seguro y confiable|es seguro|seguro y confiable|confiable':
          'is-it-safe',
        '5|5️⃣|contactar a mi asesor|contactar asesor|asesor': 'human-handoff',
      },
    },
    'what-is-aupair-pdf': {
      id: 'what-is-aupair-pdf',
      content:
        '👧 ¿Qué hace una Au Pair? 🧸💖\n\n¡Serás como la hermana mayor del hogar! 🏡💕\n\nComo Au Pair, apoyarás a tu familia anfitriona en el cuidado de los pequeños 👶🧸, compartirás tu cultura 🌎, aprenderás nuevas costumbres y vivirás una experiencia que te ayudará a crecer y ser más independiente ✨🛫\n\n¡Prepárate para crear recuerdos inolvidables! 📸💗\n\n¿Qué te gustaría hacer ahora? 👇\n\n1️⃣ 💌 ¡Contactar a mi asesor!\n2️⃣ 🏠 Regresar al menú principal',
      options: nextStepOptions,
    },
    requirements: {
      id: 'requirements',
      content:
        '🌟 Requisitos para ser Au Pair\n\n¡Conoce los requisitos generales para comenzar tu aventura! ✈️💖\n\n✅ Edad: De 18 a 29 años (según el destino).\n💗 Estado civil: Soltera y sin hijos.\n🎓 Escolaridad: Certificado de preparatoria o equivalente.\n🩺 Salud: Salud física y mental adecuada para las actividades del programa.\n\n📌 Importante: Los requisitos pueden variar según el país de destino. Tu asesor te ayudará a confirmar si cumples con las condiciones del programa que te interesa. 🌎✨\n\n¿Qué te gustaría hacer ahora? 👇\n\n1️⃣ 💌 ¡Contactar a mi asesor!\n2️⃣ 🏠 Regresar al menú principal',
      options: nextStepOptions,
    },
    'application-process': {
      id: 'application-process',
      content:
        '📋 Proceso general de aplicación 🚀✈️\n\n¡Tu aventura comienza aquí! 💖🌎 Te acompañamos paso a paso para cumplir tu sueño. 🧳✨\n\n🗺️ ¿Cómo funciona el proceso?\n\n1️⃣ Inscríbete al programa 📝\nRecibe orientación sobre el destino de tu interés.\n\n2️⃣ Completa tu expediente 📂\nJunta tu documentación y cumple con los requisitos del país.\n\n3️⃣ Elige a tu familia anfitriona (Match) 👨‍👩‍👧‍👦\nConoce a las familias disponibles y elige la ideal para ti.\n\n4️⃣ Tramita tu visa 🛂\nTe guiamos en los trámites migratorios correspondientes.\n\n5️⃣ ¡Comienza tu experiencia! 🎉🧳\nPrepara tus maletas y disfruta esta etapa llena de aprendizajes y aventuras. 💖📸\n\n¿Cómo te gustaría continuar? 👇\n\n1️⃣ 💌 ¡Contactar a mi asesor!\n2️⃣ 🏠 Regresar al menú principal',
      options: nextStepOptions,
    },
    'is-it-safe': {
      id: 'is-it-safe',
      content:
        '👀 ¿Es seguro y confiable? 🛡️✨\n\nEntendemos tus dudas, ¡tu seguridad es lo más importante para nosotros!\n\nRazones sólidas para confiar en Au Pair Mexico:\n✅ 24 años de experiencia.\n✅ Más de 8,000 Au Pairs colocadas con éxito.\n✅ Avalados por IAPA y WYSE Travel Confederation.\n✅ Miembros fundadores de la AMAAP.\n✅ Convenios con universidades como EBC, Ibero, La Salle y UNAM.\n\nTe respaldamos en todo momento:\n1️⃣ Match Seguro: Familias previamente evaluadas y reguladas.\n2️⃣ Asesoría Profesional: Apoyo en expediente, trámites y visa.\n3️⃣ Acompañamiento: Monitoreo constante durante toda tu estancia.\n\n¿Qué te gustaría hacer ahora? 👇\n\n1️⃣ 💌 ¡Contactar a mi asesor!\n2️⃣ 🏠 Regresar al menú principal',
      options: nextStepOptions,
    },
    'human-handoff': {
      id: 'human-handoff',
      content:
        'Listo, te voy a comunicar con un asesor humano. En breve te contactará por este medio o por llamada. ¡Activa tus notificaciones! 🔔💖',
      terminal: 'HANDOFF',
    },
    'closed-pdf': {
      id: 'closed-pdf',
      content:
        '¡Gracias por tu tiempo! Si en otro momento quieres retomar tu aventura como Au Pair, aquí estaré. ¡Que tengas un excelente día! 💖',
      terminal: 'CLOSED',
    },
  },
};
