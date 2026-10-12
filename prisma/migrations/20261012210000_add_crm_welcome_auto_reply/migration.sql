-- Provisiona la configuración requerida por el webhook CRM → ALICE.
-- No modifica una regla existente para conservar cualquier edición hecha desde APM.
INSERT INTO "alc_auto_replies" (
    "id",
    "key",
    "title",
    "match_type",
    "patterns",
    "response_text",
    "response_image_url",
    "priority",
    "is_active",
    "locale",
    "created_at",
    "updated_at"
)
VALUES (
    'system-welcome-zapier-lead',
    'welcome_zapier_lead',
    'Bienvenida de leads desde CRM',
    'EXACT',
    '["__crm_welcome__"]'::jsonb,
    'Hola {{name}}, ¡te damos la bienvenida a Au Pair México!',
    NULL,
    100,
    TRUE,
    'es-MX',
    CURRENT_TIMESTAMP,
    CURRENT_TIMESTAMP
)
ON CONFLICT ("key") DO NOTHING;
