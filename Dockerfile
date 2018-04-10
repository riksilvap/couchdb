FROM node:9.2.0-slim
ENV INSTALL_PATH /couchdb_app
RUN npm install -g cordova ionic
RUN mkdir -p $INSTALL_PATH
WORKDIR $INSTALL_PATH
COPY . .
RUN npm install
CMD ["npm", "start"]
