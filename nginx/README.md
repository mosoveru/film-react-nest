# Nginx Конфигурация

В этом каталоге содержится Nginx конфигурации под различные цели.

## `Dockerfile`

Данный образ использует:

- `backend.nginx.conf`
- `frontend.nginx.conf`
- `backend.redirect.nginx.conf`
- `frontend.redirect.nginx.conf`

Предназначен для продакшена, использует SSL сертификаты и переадресацию на HTTPS.

## `Dockerfile.dev`

Данный образ использует:

- `no-ssl.dev.nest.nginx.conf`

Предназначен для локальной разработки, не использует SSL сертификаты и переадресацию.

## `Dockerfile.dev-ssl`

Данный образ использует:

- `dev.nest.nginx.conf`
- `dev.redirect.nginx.conf`

Предназначен для локальной разработки, использует самоподписанные SSL сертификаты и переадресацию.

## `Dockerfile.no-ssl`

Данный образ использует:

- `no-ssl.frontend.nginx.conf`
- `no-ssl.backend.nginx.conf`

Предназначен для продакшена, не использует SSL сертификаты, чтобы при помощи поднятого nginx сервера можно было выпустить сертификаты через `certbot`.

---