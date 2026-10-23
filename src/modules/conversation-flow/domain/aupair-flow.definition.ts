import { FlowDefinition } from './conversation-flow.types';

const nextStepOptions = {
  '1|1️⃣|aplicar|ya quiero aplicar|contactar asesor|contactar a mi asesor':
    'contact-advisor',
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
        '¡Hola! 👋✨ Espero que estés teniendo un gran día. 💖 Te damos la bienvenida a Au Pair Mexico 🇲🇽✈️\n\nSer Au Pair es una experiencia increíble que te permitirá crecer personal y profesionalmente. 🌎💫 Vivirás en el extranjero, perfeccionarás un idioma 🗣️, cuidarás a los niños de una familia anfitriona 👧🧸 y descubrirás nuevas culturas mientras te reinventas como persona. 🌱💕\n\nEstamos avalados por IAPA (International Au Pair Association) 🌍🤝 y WYSE Travel Confederation.\n\n🎒💖 ¿Cómo te gustaría comenzar tu aventura? Selecciona una opción del menú 👇\n\n1️⃣ 👧 ¿Qué hace una Au Pair? 🧸\n2️⃣ 🌟 Requisitos para ser Au Pair\n3️⃣ 📋 Proceso general de aplicación 🚀\n4️⃣ 💌 ¡Contactar a mi asesor! 👩‍💻',
      options: {
        '1|1️⃣|qué hace una au pair|que hace una au pair': 'what-is-aupair-pdf',
        '2|2️⃣|requisitos|requisitos para ser au pair': 'requirements',
        '3|3️⃣|proceso|proceso general de aplicación|proceso general de aplicacion':
          'application-process',
        '4|4️⃣|contactar a mi asesor|contactar asesor|asesor': 'contact-advisor',
      },
    },
    'what-is-aupair-pdf': {
      id: 'what-is-aupair-pdf',
      content:
        '👧 ¿Qué hace una Au Pair? 🧸💖\n\n¡Serás como la hermana mayor del hogar! 🏡💕\n\nComo Au Pair, apoyarás a tu familia anfitriona en el cuidado de los pequeños 👶🧸, compartirás tu cultura 🌎, aprenderás nuevas costumbres ✨🛫 y vivirás una experiencia que te ayudará a crecer y ser más independiente.\n\n¡Prepárate para crear recuerdos inolvidables! 📸💗\n\n¿Qué te gustaría hacer ahora? 👇\n\n1️⃣ 💌 ¡Contactar a mi asesor!\n2️⃣ 🏠 Regresar al menú principal',
      options: nextStepOptions,
    },
    requirements: {
      id: 'requirements',
      content:
        '🌟 Requisitos para ser Au Pair\n\n¡Conoce los requisitos generales para comenzar tu aventura como Au Pair! ✈️💖\n\n✅ Edad: De 18 a 29 años, según el destino y las condiciones del programa.\n💗 Estado civil: Ser soltera y no tener hijos.\n🎓 Escolaridad: Contar con certificado de preparatoria.\n🩺 Salud: Contar con las condiciones físicas y mentales necesarias para participar en el programa y cumplir con sus responsabilidades.\n\n📌 Importante: Los requisitos pueden variar según el país de destino. Tu asesor te ayudará a confirmar si cumples con las condiciones del programa que te interesa. 🌎✨\n\n¿Qué te gustaría hacer ahora? 👇\n\n1️⃣ 💌 ¡Contactar a mi asesor!\n2️⃣ 🏠 Regresar al menú principal',
      options: nextStepOptions,
    },
    'application-process': {
      id: 'application-process',
      content:
        '📋 Proceso general de aplicación 🚀✈️\n\n¡Tu aventura comienza aquí! 💖🌎 Te acompañamos paso a paso para que puedas cumplir tu sueño de ser Au Pair. 🧳✨\n\n🗺️ ¿Cómo funciona el proceso?\n\n1️⃣ Inscríbete al programa 📝\nInicia tu proceso con Au Pair Mexico y recibe orientación sobre el destino que te interesa.\n\n2️⃣ Completa tu expediente 📂\nEntrega la documentación necesaria y asegúrate de cumplir con los requisitos correspondientes.\n\n3️⃣ Elige a tu familia anfitriona 👨‍👩‍👧‍👦\n💕 Este proceso se conoce como match. Conoce a las familias disponibles y encuentra aquella con la que tengas mayor afinidad.\n\n4️⃣ Tramita tu visa 🛂\nRecibe orientación sobre los trámites migratorios correspondientes a tu destino y prepárate para tu viaje. ✈️🌍\n\n5️⃣ ¡Comienza tu experiencia Au Pair! 🎉🧳\nPrepara tus maletas, despídete de tus seres queridos y disfruta esta nueva etapa llena de aprendizajes, amistades y aventuras. 💖📸\n\n¿Cómo te gustaría continuar? 👇\n\n1️⃣ 💌 ¡Contactar a mi asesor!\n2️⃣ 🏠 Regresar al menú principal',
      options: nextStepOptions,
    },
    'contact-advisor': {
      id: 'contact-advisor',
      content:
        '💌 ¡Contactar a mi asesor! 👩‍💻💖\n\n¡Tu aventura Au Pair está cada vez más cerca! ✈️🌎💕\nPara poder orientarte mejor, necesitamos conocer un poquito más sobre ti. 🌟\n\n¿Cuál es tu nombre completo? ✍️',
      capture: 'name',
    },
    'capture-age': {
      id: 'capture-age',
      content: '¡Mucho gusto, {{name}}! 💖 ¿Cuántos años tienes? 🎂',
      capture: 'age',
    },
    'capture-email': {
      id: 'capture-email',
      content: '¡Perfecto! ¿Cuál es tu correo electrónico? 📧',
      capture: 'email',
    },
    'capture-city': {
      id: 'capture-city',
      content: '¿En qué ciudad vives? 📍',
      capture: 'city',
    },
    'capture-english': {
      id: 'capture-english',
      content:
        'Por último, ¿cuál es tu nivel de inglés o certificación? 🗣️\n\nPuedes responder, por ejemplo: básico, intermedio, avanzado, B1, IELTS o TOEFL 80.',
      capture: 'englishLevel',
    },
    'profiling-link': {
      id: 'profiling-link',
      content:
        '📝 Completa tu perfil en el siguiente enlace:\n👉 {{profilingLink}} 🔗💻\n\n🧳💖 ¡Es el primer paso para conocer tus intereses y ayudarte a encontrar el programa ideal para ti!\n\nCuando termines, selecciona una opción 👇\n\n1️⃣ ✅ Ya llené mi perfil / Quiero hablar con un asesor 💬\n2️⃣ 🏠 Regresar al menú principal',
      options: {
        '1|1️⃣|ya llené mi perfil|ya llene mi perfil|quiero hablar con un asesor|hablar con asesor':
          'advisor-confirmation',
        '2|2️⃣|menú|menu|regresar|regresar al menú principal|regresar al menu principal':
          'main-menu',
      },
    },
    'advisor-confirmation': {
      id: 'advisor-confirmation',
      content:
        '¡Excelente! 🎉💖 ¡Gracias por completar tu perfil!\n\nAhora nuestro equipo podrá orientarte para resolver tus dudas y explicarte los siguientes pasos de tu proceso. 🌎✈️\n\n👩‍💻 En breve podrás continuar tu atención con tu asesor de Au Pair Mexico. 🧳💕🌟\n\n¡Estamos emocionados de acompañarte en el camino hacia esta gran experiencia!',
      terminal: 'HANDOFF',
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
