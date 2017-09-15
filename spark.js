const request = require('request');
const debug = require('debug')('spark');

const SPARKAPIKEY = process.env.SPARKAPIKEY;

var getMessage = (msgId, callback) => {
  var sparkAPI = 'https://api.ciscospark.com/v1/messages/';

  var options = {
    url: sparkAPI + msgId,
    headers: {
      'Authorization': 'Bearer ' + SPARKAPIKEY
    },
    json: true
  };

  request.get(options, (error, response, data) => {
    if (!error && response.statusCode == 200) {
      callback(data);
    } else {
      debug('Module: getMessage');
      debug('Error: %j', error);
      debug('Status: %O', response.statusCode);
      debug('Data: %j', data);
      debug('Options: %j', options);
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
      'Authorization': 'Bearer ' + SPARKAPIKEY
    },
    body: postData,
    json: true
  };

  request.post(options, (err, res, body) => {
    if (!err) {
      callback(body);
    } else {
      debug('Module: postMessage');
      debug('Error: %j', error);
      debug('Status: %O', response.statusCode);
      debug('Data: %j', data);
      debug('Options: %j', options);
    }
  });
};

var deleteMessage = (msgId, callback) => {
 var sparkAPI = 'https://api.ciscospark.com/v1/messages/';

 var options = {
   url: sparkAPI + msgId,
   headers: {
     'Authorization': 'Bearer ' + SPARKAPIKEY
   }
 }

 request.del(options, (err, res, body) => {
   if(!err) {
     callback(res.statusCode);
   } else {
     debug('Module: deleteMessage');
     debug('Error: %j', error);
     debug('Status: %O', response.statusCode);
     debug('Data: %j', data);
     debug('Options: %j', options);
   }
 });
};

module.exports = {
  getMessage,
  postMessage,
  deleteMessage
};
