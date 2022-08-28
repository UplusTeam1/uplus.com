# react build용
# node:14 이미지 사용, builder로 별칭
FROM node:14 AS builder

WORKDIR /usr/src/app
COPY frontend/project ./

RUN yarn install
# 빌드 -> 빌드 폴더 생성
RUN yarn build


# nginx 설정용
FROM nginx:1.21.0-alpine
# nginx의 기본 설정을 삭제하고 앱에서 설정한 파일을 복사
RUN rm -rf /etc/nginx/conf.d
COPY nginx /etc/nginx


# RUN npm run start

# WORKDIR /usr/src/app/frontend/project
# RUN rm -rf package-lock.json
# RUN yarn install

# WORKDIR /usr/src/app

# COPY frontend/project/package.json ./
# RUN yarn


# # RUN yarn cache clean && yarn --update-checksums
# COPY frontend/project/ ./

# # RUN npm install
# # RUN yarn install
# RUN yarn build

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
