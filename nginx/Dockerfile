FROM nginx

COPY backend.nginx.conf /etc/nginx/conf.d
COPY frontend.nginx.conf /etc/nginx/conf.d
COPY backend.redirect.nginx.conf /etc/nginx/conf.d
COPY frontend.redirect.nginx.conf /etc/nginx/conf.d

RUN rm /etc/nginx/conf.d/default.conf