FROM node:latest
RUN rm /usr/local/bin/yarn
RUN npm audit fix
RUN npm install -g yarn
RUN yarn install
RUN yarn build
