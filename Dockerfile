FROM node:18-alpine
WORKDIR /trinio-rule-app

COPY public/ /trinio-rule-app/public
COPY src/ /trinio-rule-app/src
COPY package.json /trinio-rule-app/

RUN npm install
CMD ["npm", "start"]
