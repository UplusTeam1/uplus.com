FROM node:latest
RUN yarn install
COPY package.json ./
COPY package-lock.json ./

CMD ["yarn", "start"]
