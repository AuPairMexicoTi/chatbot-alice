-- El texto se conserva como registro administrativo; Meta entrega la plantilla
-- aprobada. Debe reflejar el nuevo menú de 5 opciones para que el historial
-- de ALICE sea consistente con la experiencia recibida por la candidata.
UPDATE "alc_auto_replies"
SET
    "response_text" = E'¡Hola! 👋✨ Te damos la bienvenida a Au Pair Mexico 🇲🇽✈️\n\nSer Au Pair es una experiencia increíble que te permitirá vivir en el extranjero con todo pagado a cambio de cuidar a los niños de una familia anfitriona 👧🧸\n\nPodrás conocer lugares nuevos, perfeccionar otro idioma y recibir apoyo económico durante toda tu estancia 🌎💫\n\nSomos una empresa con 24 años de experiencia, ¡súmate a las más de 8,000 Au Pairs que han vivido esta aventura con nosotros! Siempre te acompañaremos en todo el proceso garantizando tu tranquilidad y seguridad. Además, estamos avalados por IAPA, WYSE Travel Confederation y somos miembros fundadores de la AMAAP. 🌍\n\n🎒💖 ¿Cómo te gustaría comenzar tu aventura? Selecciona una opción:\n\n1️⃣ 👧 ¿Qué hace una Au Pair?\n2️⃣ 🌟 Requisitos para ser Au Pair\n3️⃣ 📋 Proceso general de aplicación\n4️⃣ 👀 ¿Es seguro y confiable?\n5️⃣ 💌 ¡Contactar a mi asesor!',
    "updated_at" = CURRENT_TIMESTAMP
WHERE "key" = 'welcome_zapier_lead';