FROM node

WORKDIR /var/app/node

COPY package.json /var/app/node
COPY tsconfig.json /var/app/node
COPY src /var/app/node/src
COPY public /var/app/node/public

RUN npm install

EXPOSE 3000

CMD ["npm", "start"]
