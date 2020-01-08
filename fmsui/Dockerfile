# FROM node:10.16-alpine as angular
# RUN apk add --no-cache bash git openssh
# RUN apk add python krb5 krb5-libs gcc make g++ krb5-dev
# ADD ./fmsui/ ./root/app/
# WORKDIR /root/app
# RUN npm install && node patch.js
# RUN npm install -g @angular/cli@8.3.13
# RUN ng build --output-path=dist
# FROM nginx:1.17-alpine
# COPY --from=angular /root/app/dist /usr/share/nginx/html
# COPY ./fmsui/nginx.conf /etc/nginx/conf.d/default.conf
# CMD ["nginx", "-g", "daemon off;"]

FROM node:10.16-alpine
RUN apk add --no-cache bash git openssh
RUN apk add python krb5 krb5-libs gcc make g++ krb5-dev
WORKDIR /project/fms/fmsui
RUN npm install -g @angular/cli@8.3.13 
CMD npm install && npm start