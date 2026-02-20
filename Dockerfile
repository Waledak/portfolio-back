# syntax=docker/dockerfile:1

########################
# 1) deps
########################
FROM node:22.14-alpine AS deps
WORKDIR /opt/app

# libs natives (sharp/vips)
RUN apk add --no-cache \
  build-base autoconf automake zlib-dev libpng-dev nasm bash vips-dev git python3 make g++

RUN npm i -g pnpm

COPY package.json pnpm-lock.yaml ./
RUN pnpm install --frozen-lockfile

########################
# 2) build
########################
FROM deps AS build
WORKDIR /opt/app
COPY . .
ENV NODE_ENV=production
RUN pnpm run build

########################
# 3) runtime
########################
FROM node:22.14-alpine AS runtime
WORKDIR /opt/app

# vips runtime
RUN apk add --no-cache vips-dev
RUN npm i -g pnpm

ENV NODE_ENV=production
ENV NODE_OPTIONS="--max-old-space-size=4096"

# copie uniquement ce qu'il faut
COPY --from=build /opt/app ./

# user non-root
RUN addgroup -S nodejs && adduser -S node -G nodejs \
  && chown -R node:node /opt/app
USER node

EXPOSE 1337
CMD ["pnpm", "start"]