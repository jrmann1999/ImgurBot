//Standard NPM modules
const express = require('express');
const bodyparser = require('body-parser');
//const rp = require('request-promise-native');
const dq = require('double-ended-queue');

//Helper modules (local)
const spark = require('./spark.js')
const imgur = require('./imgur.js')


var app = express();
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({ extended: true }));
var messageHistory = new dq(10);

app.all('/spark', (req, res) => {
  res.send();
  console.log("**", req.body);
  spark.postMessage();
  var message = spark.getMessage(body.id);

  // Check for delete, if it exists at the start of the message we will remove previous posts
  if (message.toLowerCase().match("^delete")) {
    var command = message.toLowerCase().split(" ");
    if (command[1].match("last")) {
      if (!messageHistory.isEmpty()) {
        oldMessage = messageHistory.shift();
        spark.deleteMessage(oldMessage);
      }
    }
  }

  // Everything else is considered search fodder, search ImgUr for it
  var imageURL = imgur.search(message);

  // Publish the message/image, and push onto queue for historical purposes.
  var publishedMessage = spark.postMessage(imageURL);
  messageHistory.push(publishedMessage);
});

app.listen(90);
