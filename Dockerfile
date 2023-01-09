# Start from a base image with Node.js and Yarn installed
FROM node:16.14.0 as build

COPY . /app
WORKDIR /app

RUN yarn install --production
RUN yarn build

FROM nginx:alpine
COPY --from=build /app/build /usr/share/nginx/html
COPY --from=build /app/nginx/nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 8080

CMD ["nginx", "-g", "daemon off;"]
