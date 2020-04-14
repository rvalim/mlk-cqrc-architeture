FROM openresty/openresty:latest

# RUN apt-get install nano
RUN mkdir /var/log/nginx/
RUN mkdir /etc/openresty/lua
RUN mkdir /etc/openresty/conf.d
RUN touch /var/log/nginx/access.log
COPY nginx.conf /etc/openresty/nginx.conf
COPY /conf.d /etc/openresty/conf.d
COPY /lua /etc/openresty/lua