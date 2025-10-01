# =================
# 1. 빌드 단계 (Builder Stage)
# =================
# Node.js 18 경량화 버전을 빌드 환경으로 사용합니다. -> 경고로 인해 20으로 수정
FROM node:20-alpine AS build

# 작업 디렉토리를 생성합니다.
WORKDIR /app

# package.json 파일들을 먼저 복사하여 종속성을 캐싱합니다.
COPY package.json package-lock.json ./

# npm 종속성을 설치합니다.
RUN npm install

# 나머지 소스 코드를 복사합니다.
COPY . .

# React 앱을 빌드하여 정적 파일을 생성합니다. (/app/build 폴더에 결과물이 저장됩니다.)
RUN npm run build

# =================
# 2. 실행 단계 (Final Stage)
# =================
# Nginx 경량화 버전을 실행 환경으로 사용합니다.
FROM nginx:stable-alpine

# 빌드 단계에서 생성된 정적 파일들을 Nginx의 기본 폴더로 복사합니다.
COPY --from=build /app/build /usr/share/nginx/html

# [중요] 아래에서 만들 Nginx 설정을 복사합니다.
COPY ./nginx/nginx.conf /etc/nginx/conf.d/default.conf

# 80번 포트를 외부에 노출합니다.
EXPOSE 80

# Nginx를 실행합니다.
CMD ["nginx", "-g", "daemon off;"]