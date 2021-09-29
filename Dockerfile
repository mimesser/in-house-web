FROM node:alpine as base_prod
ENV NEXT_TELEMETRY_DISABLED 1
ADD https://github.com/just-containers/s6-overlay/releases/download/v2.2.0.3/s6-overlay-amd64-installer /tmp/
RUN apk --purge del apk-tools \
    && addgroup -g 1001 -S nodejs \
    && adduser -S -G nodejs nextjs -u 1001 \
    && chmod +x /tmp/s6-overlay-amd64-installer \
    && /tmp/s6-overlay-amd64-installer /
ENTRYPOINT [ "/init" ]
WORKDIR /app

FROM node:alpine AS deps
# Check https://github.com/nodejs/docker-node/tree/b4117f9333da4138b03a546ec926ef50a31506c3#nodealpine to understand why libc6-compat might be needed.
ARG NODEENV
ENV NODE_ENV=$NODEENV
RUN apk add --no-cache libc6-compat
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci

FROM node:alpine AS builder
ARG APIURL
ENV API_URL=$APIURL
ARG GOPTIMIZEKEY
ENV G_OPTIMIZE_KEY=$GOPTIMIZEKEY
ARG GAKEY
ENV GA_KEY=$GAKEY
ARG HOTJARSITEID
ENV HOTJAR_SITE_ID=$HOTJARSITEID
ARG SENTRYENV
ENV SENTRY_ENVIRONMENT=$SENTRYENV
ARG SENTRYDSN
ENV SENTRY_DSN=$SENTRYDSN
ARG SENTRYCLIRCTOKEN
ENV SENTRYCLIRC_TOKEN=$SENTRYCLIRCTOKEN
ARG NODEENV
ENV NODE_ENV=$NODEENV
ARG TCREATEENVFILE
ENV T_CREATE_ENV_FILE=$TCREATEENVFILE
WORKDIR /app
COPY . .
COPY --from=deps /app/node_modules ./node_modules
RUN apk add jq
RUN ./create_envfile $T_CREATE_ENV_FILE \
    && npm install -g copyfiles \
    && npm run build:ci

FROM base_prod as final
ARG NODEENV
ENV NODE_ENV=$NODEENV
EXPOSE 3000
COPY --from=builder --chown=nextjs:nodejs /app/.env ./
COPY --from=builder --chown=nextjs:nodejs /app/build/ ./
COPY --from=deps --chown=nextjs:nodejs /app/node_modules ./node_modules
USER nextjs
CMD ["node", "server/index.js"]
