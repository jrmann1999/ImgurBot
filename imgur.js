const rp = require('request');
const debug = require('debug')('imgur');

const IMGURAPIKEY = process.env.IMGURAPIKEY;

var search = (searchString, callback) => {
  var imgurl = 'https://api.imgur.com/3';

  var options = {
	  url: imgurl + '/gallery/search/viral?q_type=anigif&q_any=' + encodeURIComponent(searchString),
	  headers: {
		  'Authorization': 'Client-ID ' + IMGURAPIKEY
	  },
	  json: true
  };

  rp.get(options, (error, response, data) => {
	if(!error && response.statusCode == 200) {
	  for(var q in data.data) {
		  if(!data.data[q].nsfw) {
			  callback(data.data[q].link);
			  break;
		  }
	  }
	} else {
      debug('Error: %j', error);
      debug('Response: %j', response.statusCode);
      debug('Data: %j', data);
      debug('Options: %j', options);
    }
  });
};

module.exports = {
	search
};
