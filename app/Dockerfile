FROM node:20-alpine
ENV NODE_ENV=production
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm ci --only=production && \
    chown -R node:node /usr/src/app
COPY --chown=node:node . .
USER node
EXPOSE 3000
CMD ["node", "server.js"]