# Use the Alpine variant of Node for a smaller base image
FROM node:22.14-alpine

# Install dependencies required to build native Node modules (like Sharp)
RUN apk update && apk add --no-cache \
    build-base \
    autoconf \
    automake \
    zlib-dev \
    libpng-dev \
    nasm \
    bash \
    vips-dev \
    git \
    python3 \
    make \
    g++

# Install pnpm globally
RUN npm install -g pnpm

# Set environment to production and increase Node's memory limit
ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}
ENV NODE_OPTIONS="--max-old-space-size=4096"

# Create and use a working directory
WORKDIR /opt/app

# Copy dependency files and install dependencies
COPY package.json pnpm-lock.yaml ./
RUN pnpm install --frozen-lockfile

# Copy the rest of your Strapi project
COPY . .

# Rebuild sharp to ensure the native bindings compile correctly
RUN pnpm rebuild sharp

# Change ownership to a non-root user
RUN chown -R node:node /opt/app
USER node

# Build your Strapi app (ensure "build" script exists in package.json)
RUN pnpm run build

# Expose Strapi's default port
EXPOSE 1337

# Start your app in production mode (ensure "start" script exists in package.json)
CMD ["pnpm", "start"]
