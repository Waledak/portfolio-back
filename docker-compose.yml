services:
  strapi:
    image: ghcr.io/waledak/portfolio-back:${APP_VERSION}
    restart: unless-stopped
    env_file: .env
    environment:
      NODE_ENV: production
      HOST: 0.0.0.0
      PORT: 1337

      DATABASE_CLIENT: postgres
      DATABASE_HOST: postgres
      DATABASE_PORT: 5432
      DATABASE_NAME: portfolio
      DATABASE_USERNAME: portfolio_user
      DATABASE_PASSWORD: ${DATABASE_PASSWORD}
      DATABASE_SSL: "false"

      SERVER_URL: https://api.tanguycirillo.fr

    networks:
      - internal
      - edge

    labels:
      - "traefik.enable=true"
      - "traefik.http.routers.portfolio-strapi.rule=Host(`api.tanguycirillo.fr`)"
      - "traefik.http.routers.portfolio-strapi.entrypoints=websecure"
      - "traefik.http.routers.portfolio-strapi.tls=true"
      - "traefik.http.routers.portfolio-strapi.tls.certresolver=le"
      - "traefik.http.services.portfolio-strapi.loadbalancer.server.port=1337"
      - "traefik.docker.network=monredon_edge"

      - "traefik.http.routers.portfolio-strapi-http.rule=Host(`api.tanguycirillo.fr`)"
      - "traefik.http.routers.portfolio-strapi-http.entrypoints=web"
      - "traefik.http.routers.portfolio-strapi-http.middlewares=redirect-to-https@docker"

networks:
  edge:
    external: true
    name: monredon_edge
  internal:
    external: true
    name: monredon_internal