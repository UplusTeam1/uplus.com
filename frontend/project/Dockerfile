FROM node:latest
RUN yarn install
# 빌드된 산출물 도커 이미지로 복사
RUN mkdir ./build
COPY ./build ./build
