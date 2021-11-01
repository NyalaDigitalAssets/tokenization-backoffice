# base node image for running app, no SDK, just runtime
FROM node:16 AS base
WORKDIR /app

# Install all software, kernel updates
RUN apt update && apt upgrade -y

# SDK image for compiling
FROM node:16 AS build
WORKDIR /build
COPY . .

WORKDIR "/build/app"

RUN npm ci
RUN npm run build-prod

WORKDIR "/build/proxy"

RUN npm ci

# copy output from published ap and SPA
FROM base AS final

COPY --from=build build/app/dist app/dist
COPY --from=build build/proxy proxy

WORKDIR proxy
ENTRYPOINT ["node", "./index.js"]
EXPOSE 4000