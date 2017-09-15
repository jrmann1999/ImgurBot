const request = require('request')

var getMessage = (msgId, callback) => {
  var sparkAPI = 'https://api.ciscospark.com/v1/messages/';

  var options = {
    url: sparkAPI + msgId,
    headers: {
      'Authorization': 'Bearer '
    },
    json: true
  };

  request.get(options, (error, response, data) => {
    if (!error && response.statusCode == 200) {
      callback(data);
    }
  });
};

var postMessage = (link, messageDetail, callback) => {
  var sparkAPI = 'https://api.ciscospark.com/v1/messages/';

  var postData = {
    files: [link]
  };

  if (messageDetail.roomType === 'group') {
    postData.roomId = messageDetail.roomId;
  } else {
    postData.toPersonId = messageDetail.personId;
  }

  var options = {
    url: sparkAPI,
    headers: {
      'Authorization': 'Bearer '
    },
    body: postData,
    json: true
  };

  request.post(options, (err, res, body) => {
    if (!err) {
      callback(body);
    }
  });
};

var deleteMessage = (msgId, callback) => {
 var sparkAPI = 'https://api.ciscospark.com/v1/messages/';

 var options = {
   url: sparkAPI + msgId,
   headers: {
     'Authorization': 'Bearer '
   }
 }

 request.del(options, (err, res, body) => {
   if(!err) {
     callback(res.statusCode);
   }
 });
};

module.exports = {
  getMessage,
  postMessage,
  deleteMessage
};
