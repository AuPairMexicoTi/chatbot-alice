FROM node:22-alpine AS base
RUN corepack enable

FROM base AS deps
WORKDIR /app
COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./
COPY prisma ./prisma
COPY prisma.config.ts ./
RUN pnpm install --frozen-lockfile

FROM deps AS build
WORKDIR /app
# Prisma 7 loads prisma.config.ts during client generation; this build-only URL
# is never copied into the production image or used by the running service.
ENV DATABASE_URL=postgresql://build:build-only@127.0.0.1:5432/chatbot_alice
COPY . .
RUN pnpm prisma:generate
RUN pnpm build

FROM base AS production
WORKDIR /app
ENV NODE_ENV=production
COPY --from=deps /app/node_modules ./node_modules
COPY --from=build /app/dist ./dist
# El inicializador seguro de nodos de flujo se ejecuta al arrancar producción
# y lee la definición canónica en TypeScript. También conserva el cliente
# Prisma generado bajo src/generated.
COPY --from=build /app/src ./src
COPY --from=build /app/prisma ./prisma
COPY --from=build /app/prisma.config.ts ./prisma.config.ts
COPY --from=build /app/public ./public
COPY package.json pnpm-workspace.yaml pnpm-lock.yaml ./
RUN addgroup -S nodejs && adduser -S nestjs -G nodejs
USER nestjs
EXPOSE 3000
CMD ["node", "dist/src/main.js"]
