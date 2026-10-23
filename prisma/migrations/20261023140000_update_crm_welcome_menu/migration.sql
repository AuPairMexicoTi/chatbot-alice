-- El texto se conserva como registro administrativo; Meta entrega la plantilla
-- aprobada. Debe reflejar el menú inicial para que el historial de ALICE sea
-- consistente con la experiencia recibida por la candidata.
UPDATE "alc_auto_replies"
SET
    "response_text" = E'¡Hola! 👋✨ Espero que estés teniendo un gran día. 💖 Te damos la bienvenida a Au Pair Mexico 🇲🇽✈️\n\nSer Au Pair es una experiencia increíble que te permitirá crecer personal y profesionalmente. 🌎💫 Vivirás en el extranjero, perfeccionarás un idioma 🗣️, cuidarás a los niños de una familia anfitriona 👧🧸 y descubrirás nuevas culturas mientras te reinventas como persona. 🌱💕\n\nEstamos avalados por IAPA (International Au Pair Association) 🌍🤝 y WYSE Travel Confederation.\n\n🎒💖 ¿Cómo te gustaría comenzar tu aventura? Selecciona una opción del menú 👇\n\n1️⃣ 👧 ¿Qué hace una Au Pair? 🧸\n2️⃣ 🌟 Requisitos para ser Au Pair\n3️⃣ 📋 Proceso general de aplicación 🚀\n4️⃣ 💌 ¡Contactar a mi asesor! 👩‍💻',
    "updated_at" = CURRENT_TIMESTAMP
WHERE "key" = 'welcome_zapier_lead';
