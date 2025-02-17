FROM nginx

COPY frontend-nginx.conf /etc/nginx/sites-available/mosoveru.students.nomoreparties.co
COPY backend-nginx.conf /etc/nginx/sites-available/api.mosoveru.students.nomoreparties.co

RUN ls -s /etc/nginx/sites-available/mosoveru.students.nomoreparties.co /etc/nginx/sites-enabled/
RUN ls -s /etc/nginx/sites-available/api.mosoveru.students.nomoreparties.co /etc/nginx/sites-enabled/