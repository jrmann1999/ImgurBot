FROM node:boron

WORKDIR /usr/src/app

RUN git clone https://github.com/jrmann1999/ImgurBot.git

WORKDIR /usr/src/app/ImgurBot

RUN npm install

EXPOSE 90

CMD [ "npm", "start" ]
