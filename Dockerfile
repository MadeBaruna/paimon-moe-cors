FROM node:14.16.0-alpine3.13

WORKDIR /cors

RUN npm install -g pnpm

COPY package.json .
COPY pnpm-lock.yaml .
RUN pnpm i --prod

COPY . .

EXPOSE 8000
CMD [ "node", "index.js" ]
