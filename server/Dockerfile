FROM node:18

WORKDIR /app

ADD package.json /app/package.json

RUN npm install --force

ADD . /app

ENV NODE_ENV=dev

EXPOSE 3001
EXPOSE 3002

CMD ["npm", "run", "start"]