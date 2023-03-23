FROM node:16

WORKDIR /opt/app/index

COPY ./package.json .
RUN npm install && npm cache clean --force && npm build
COPY . .

EXPOSE 3001

# CMD npm start
CMD [ "node", "server.js" ]