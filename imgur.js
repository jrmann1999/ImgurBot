const rp = require('request');

var IMGURAPIKEY = "";

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
	}
  });
};

module.exports = {
	search
};
