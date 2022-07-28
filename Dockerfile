## PART I
# build environment | temporary container
FROM node:lts-alpine3.14 as BUILD
WORKDIR /app
ENV PATH /app/node_modules/.bin:$PATH

#configurando proxy
##ENV http_proxy http://mackcloud:cloud2019@172.16.50.1:8080
##ENV https_proxy http://mackcloud:cloud2019@172.16.50.1:8080
##RUN yarn config set proxy http://mackcloud:cloud2019@172.16.50.1:8080
##RUN yarn config set https-proxy http://mackcloud:cloud2019@172.16.50.1:8080

#copiando projeto, instalando dependências e build
COPY package.json /app/package.json
RUN yarn install
COPY . /app/
RUN yarn run build

## PART II
# production environment
FROM nginx:1.21.3-alpine
WORKDIR /etc/nginx
ENV http_proxy http://mackcloud:cloud2019@172.16.50.1:8080
ENV https_proxy http://mackcloud:cloud2019@172.16.50.1:8080

#copiando certificados
RUN mkdir /etc/nginx/ssl
COPY ./nginx/certificate/ssl-cert-snakeoil.key /etc/nginx/ssl
COPY ./nginx/certificate/ssl-cert-snakeoil.pem /etc/nginx/ssl

#copiando projeto para diretório do nginx
COPY --from=BUILD /app/build /usr/share/nginx/html
RUN rm /etc/nginx/conf.d/default.conf
COPY ./nginx/nginx.conf /etc/nginx/conf.d

#timezone
##RUN apk add --no-cache tzdata
##ENV TZ="America/Sao_Paulo"
##RUN ln -snf /usr/share/zoneinfo/America/Sao_Paulo /etc/localtime && echo "America/Sao_Paulo" > /etc/timezone

EXPOSE 80
EXPOSE 443
CMD ["nginx", "-g", "daemon off;"]
