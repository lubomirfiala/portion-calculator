FROM node:20-bookworm AS base

RUN mkdir -p /app
WORKDIR /app

FROM base AS dev
ARG USER_UID=1000
ARG USER_GID=1000

RUN sed -i -e "s/^node:x:[^:]*:/node:x:${USER_UID}:/g" /etc/passwd && \
    sed -i -e "s/^node:x:[^:]*:/node:x:${USER_GID}:/g" /etc/group && \
    chown -R node:node /home/node /app

RUN apt-get update && \
    apt-get install -y --no-install-recommends bash make && \
    rm -rf /var/lib/apt/lists/*

FROM base AS ci
COPY . .
RUN npm clean-install
