FROM node:20
WORKDIR "/var/www/nodeserver"
COPY ./package.json ./package.json
RUN yarn
COPY . .
RUN npm run-script build
ENTRYPOINT ["./start_server.sh"]
