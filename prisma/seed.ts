import 'dotenv/config';
import { PrismaPg } from '@prisma/adapter-pg';
import { PrismaClient } from '../src/generated/prisma/client';
import { aupairFlowDefinition } from '../src/modules/conversation-flow/domain/aupair-flow.definition';

const connectionString = process.env.DATABASE_URL;

if (!connectionString) {
  throw new Error('DATABASE_URL is not configured');
}

const prisma = new PrismaClient({
  adapter: new PrismaPg({ connectionString }),
});

type SeedAutoReply = {
  key: string;
  title: string;
  matchType: 'EXACT' | 'CONTAINS' | 'REGEX';
  patterns: string[];
  responseText: string;
  responseImageUrl?: string | null;
  priority?: number;
  isActive?: boolean;
  locale?: string;
};

// Ejemplos de arranque — edítalos o bórralos desde "Mensajes de Alice" en APM
// una vez que el equipo defina el copy real.
const autoReplies: SeedAutoReply[] = [
  {
    key: 'welcome_aupair_mexico',
    title: 'Bienvenida Au Pair Mexico',
    matchType: 'CONTAINS',
    patterns: ['hola', 'buenas', 'informes', 'información', 'au pair'],
    responseText:
      'Hola, bienvenida a Au Pair Mexico. Soy Alice, tu asistente virtual. Cuéntame, ¿qué te gustaría saber sobre el programa?',
    priority: 100,
    isActive: true,
    locale: 'es-MX',
  },
  {
    key: 'business_hours',
    title: 'Horario de atención',
    matchType: 'CONTAINS',
    patterns: ['horario', 'a que hora abren', 'a qué hora atienden'],
    responseText:
      'Nuestro horario de atención es de lunes a viernes de 9:00 a 18:00 (hora de la Ciudad de México).',
    priority: 50,
    isActive: true,
    locale: 'es-MX',
  },
  {
    key: 'human_handoff_request',
    title: 'Solicitud de asesor humano',
    matchType: 'CONTAINS',
    patterns: ['quiero hablar con alguien', 'asesor', 'persona real', 'humano'],
    responseText:
      'Claro, en un momento te conecto con uno de nuestros asesores. Mientras tanto, ¿me compartes tu nombre completo?',
    priority: 75,
    isActive: true,
    locale: 'es-MX',
  },
];

// Las imágenes de estos nodos vivían hardcodeadas en
// process-inbound-whatsapp-message.use-case.ts (getFlowImageUrl) antes de
// mover el flujo a la base de datos — se siembran aquí con el mismo nombre
// de archivo para que el cutover no cambie lo que el bot envía.
const flowNodeImageFilenames: Record<string, string> = {
  menu: 'principal.jpeg',
  germany: 'alemania.jpeg',
  belgium: 'belgica.jpeg',
  usa: 'estados-unidos.jpeg',
  france: 'francia.jpeg',
  italy: 'italia.jpeg',
};

const publicBaseUrl = (process.env.CHATBOT_PUBLIC_BASE_URL ?? '').replace(
  /\/$/u,
  '',
);

const flowNodeImageUrl = (nodeId: string): string | undefined => {
  const filename = flowNodeImageFilenames[nodeId];
  return filename && publicBaseUrl
    ? `${publicBaseUrl}/api/v1/assets/${filename}`
    : undefined;
};

async function main() {
  // Volcado inicial del menú hardcodeado (aupair-flow.definition.ts) a la tabla
  // alc_flow_nodes — mismo contenido exacto que ya está en producción, así el
  // cutover a lectura-desde-DB no cambia nada de lo que dice el bot.
  for (const node of Object.values(aupairFlowDefinition.nodes)) {
    const data = {
      content: node.content,
      imageUrl: flowNodeImageUrl(node.id) ?? null,
      options: node.options ?? undefined,
      capture: node.capture ?? null,
      terminal: node.terminal ?? null,
    };
    await prisma.flowNode.upsert({
      where: { id: node.id },
      update: data,
      create: { id: node.id, ...data },
    });
    console.log(`✔ flow node ${node.id}`);
  }

  for (const autoReply of autoReplies) {
    const result = await prisma.autoReply.upsert({
      where: { key: autoReply.key },
      update: {
        title: autoReply.title,
        matchType: autoReply.matchType,
        patterns: autoReply.patterns,
        responseText: autoReply.responseText,
        responseImageUrl: autoReply.responseImageUrl ?? null,
        priority: autoReply.priority ?? 0,
        isActive: autoReply.isActive ?? true,
        locale: autoReply.locale ?? null,
      },
      create: {
        key: autoReply.key,
        title: autoReply.title,
        matchType: autoReply.matchType,
        patterns: autoReply.patterns,
        responseText: autoReply.responseText,
        responseImageUrl: autoReply.responseImageUrl ?? null,
        priority: autoReply.priority ?? 0,
        isActive: autoReply.isActive ?? true,
        locale: autoReply.locale ?? null,
      },
    });
    console.log(`✔ ${result.key}`);
  }
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (error) => {
    console.error(error);
    await prisma.$disconnect();
    process.exit(1);
  });
