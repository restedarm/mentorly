FROM node:20
WORKDIR "/var/www/nodeserver"
COPY ./package.json ./package.json
COPY ./yarn.lock ./yarn.lock

RUN yarn --frozen-lockfile

COPY . .
RUN yarn build
ENTRYPOINT ["./start_server.sh"]
