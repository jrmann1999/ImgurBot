//Standard NPM modules
const express = require('express');
const bodyparser = require('body-parser');
const dequeue = require('double-ended-queue');

const spark = require('./spark.js');
const imgur = require('./imgur.js');

var botName = 'ImgurBot';
var msgQueue = new dequeue();

var app = express();
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({ extended: true }));

app.all('/spark', (req, res) => {
  res.send();
  spark.getMessage(req.body.data.id, (messageDetail) => {
    if (messageDetail.personEmail !== botName + '@sparkbot.io') {
      if (messageDetail.roomType === 'group') {
        // Check if the bot is mentioned, if not ignore this
        if (messageDetail.text.split(' ')[0] === botName) {
          // Strip off the @ reference to the Bot
          msgText = messageDetail.text.split(' ').slice(1).join(' ');
          if(msgText.match(/^delete/i)) {
            if(!msgQueue.isEmpty()) {
              var deleteMsgId = msgQueue.pop();
              spark.deleteMessage(deleteMsgId.id, (statusCode) => {
              });
            }
          } else {
            imgur.search(msgText, (link) => {
              spark.postMessage(link, messageDetail, (msgId) => {
                if(msgQueue.length >= 10) {
                  msgQueue.shift();
                }

                msgQueue.push(msgId);
              });
            });
          }
        }
      } else {
        imgur.search(messageDetail.text, (link) => {
          spark.postMessage(link, messageDetail, (msgId) => {
          });
        });
      }
    }
  });
});

app.listen(90);
