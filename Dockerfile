FROM node:14.5.0-alpine3.10

WORKDIR /app
COPY package*.json /app/
RUN npm ci --no-progress
COPY . .

RUN npm test
RUN PARCEL_WORKERS=1 npm run build:app
RUN npm run build:server

RUN npm prune --production
ENV DIST_PATH /app
EXPOSE 6060
CMD [ "npm", "start" ]