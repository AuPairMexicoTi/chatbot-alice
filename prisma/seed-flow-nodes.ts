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

const getImageUrl = (nodeId: string): string | null => {
  const filename = flowNodeImageFilenames[nodeId];
  return filename && publicBaseUrl
    ? `${publicBaseUrl}/api/v1/assets/${filename}`
    : null;
};

async function main() {
  for (const node of Object.values(aupairFlowDefinition.nodes)) {
    const imageUrl = getImageUrl(node.id);
    const existing = await prisma.flowNode.findUnique({
      where: { id: node.id },
      select: { imageUrl: true },
    });

    if (!existing) {
      await prisma.flowNode.create({
        data: {
          id: node.id,
          content: node.content,
          imageUrl,
          options: node.options ?? undefined,
          capture: node.capture ?? null,
          terminal: node.terminal ?? null,
        },
      });
      console.log(`✔ created flow node ${node.id}`);
      continue;
    }

    if (existing.imageUrl === null && imageUrl) {
      await prisma.flowNode.update({
        where: { id: node.id },
        data: { imageUrl },
      });
      console.log(`✔ added image to flow node ${node.id}`);
    }
  }
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (error: unknown) => {
    console.error(error);
    await prisma.$disconnect();
    process.exit(1);
  });
