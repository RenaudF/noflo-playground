var util = require('util'),
	OAuth = require('oauth');
	ReadableStream = require('stream').Readable;

module.exports = TwitterFilterStreamFactory;

TwitterFilterStreamFactory.prototype.create = function(userToken, userSecret, options){
	return new TwitterFilterStream(this.oauth, userToken, userSecret, options);
};

function TwitterFilterStreamFactory(appToken, appSecret){
	this.oauth = new OAuth.OAuth(
		'https://api.twitter.com/oauth/request_token',
		'https://api.twitter.com/oauth/access_token',
		appToken,
		appSecret,
		'1.0A',
		null,
		'HMAC-SHA1'
	);
}

util.inherits(TwitterFilterStream, ReadableStream);
TwitterFilterStream.prototype._read = function (){};

function TwitterFilterStream(oauth, userToken, userSecret, options) {
	ReadableStream.call(this, {
		objectMode: true
	});

	options = (options)?'?'+options: '';
	var request = oauth.post(
		'https://stream.twitter.com/1.1/statuses/filter.json'+options,
		userToken,
		userSecret
	);

	request.on('response', function(res){
		var tail = '';
		res.on('data', function(data){
			var lines = (tail+data.toString('utf8')).split('\n');
			tail = lines.pop();
			lines.forEach(function(line){
				this.push(JSON.parse(line));
			}.bind(this));
		}.bind(this));
	}.bind(this));
	request.end();
}