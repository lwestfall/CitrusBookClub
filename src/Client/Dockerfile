FROM node:bookworm-slim as node
WORKDIR /app
COPY package*.json ./
RUN npm install

COPY . .

ARG PROFILE
ENV PROFILE $PROFILE

RUN npm run build-${PROFILE}

FROM nginx:alpine
COPY --from=node /app/dist/cbc/browser /usr/share/nginx/html
COPY /nginx.conf  /etc/nginx/conf.d/default.conf
