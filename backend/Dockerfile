FROM node

WORKDIR /var/app/node

COPY package.json /var/app/node
COPY tsconfig.json /var/app/node
COPY .env /var/app/node
COPY src /var/app/node/src
COPY prisma /var/app/node/prisma
COPY entrypoint.sh /var/app/node

RUN npm install

EXPOSE 3000

ENTRYPOINT ["./entrypoint.sh"]

CMD ["npm", "run", "dev"]
