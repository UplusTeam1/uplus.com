# builder stage
FROM node:alpine as builder

WORKDIR /usr/src/app
COPY package.json ./
RUN yarn cache clean && yarn --update-checksums
COPY frontend/project/ ./

# RUN npm install
# RUN yarn install
RUN yarn build

# RUN npm install -g yarn

# WORKDIR '/usr/src/app'



# RUN yarn

# # 로컬에 node_module 있으면 지워줄 것
# COPY ./ ./

# RUN yarn build

# # run stage
# FROM nginx
# EXPOSE 80
# COPY --from=builder /usr/src/app/build /usr/share/nginx/html
