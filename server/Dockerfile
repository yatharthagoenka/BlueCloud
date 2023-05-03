FROM node:18

COPY requirements.txt .

USER root
RUN apt-get update && \
    apt-get install -y python3-dev python3-pip && \
    pip3 install --user --no-cache-dir -r requirements.txt

WORKDIR /app

ADD package.json /app/package.json

RUN npm install --force

ADD . /app

ENV NODE_ENV=dev

EXPOSE 3001
EXPOSE 3002

CMD ["npm", "run", "start"]
