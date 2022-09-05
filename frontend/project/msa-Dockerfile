# ECR
# react build용
# node:14 이미지 사용, builder로 별칭
FROM node:14 AS builder

WORKDIR /usr/src/app
COPY . ./

RUN yarn install
# 빌드 -> 빌드 폴더 생성
RUN yarn build

# nginx 설정용
FROM nginx:1.21.0-alpine
# nginx의 기본 설정을 삭제하고 앱에서 설정한 파일을 복사
RUN rm -rf /etc/nginx/conf.d
# # nginx 폴더 도커 속 /etc/nginx로 복사
COPY /nginx/MSA /etc/nginx
# # 위 리액트 빌드해서 빌드 폴더 conf.d에서 정의한 경로로 붙여넣기
COPY --from=builder /usr/src/app/build /usr/src/app/build
# # 80포트 오픈하고 nginx 실행
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
