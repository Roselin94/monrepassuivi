FROM node:22-alpine

ENV NODE_ENV=production
ENV HOST=0.0.0.0
ENV DATA_FILE=/data/app-data.json

WORKDIR /app
COPY server.js app.js index.html styles.css Menu.jpeg ./
RUN mkdir -p /data && chown -R node:node /app /data
USER node

EXPOSE 3000
CMD ["node", "server.js"]