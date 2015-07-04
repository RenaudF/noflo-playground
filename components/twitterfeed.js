// File: components/twitterfeed.js
var noflo = require("noflo");
var TwitterFilterStreamFactory = require("../lib/TwitterFilterStreamFactory");

exports.getComponent = function() {
	var component = new noflo.Component();
	component.description = "Twitter filtered stream";

	var options, tokens;

	// Register ports and event handlers
	component.outPorts.add('out', { datatype: 'all' });
	component.inPorts.add('tokens', {datatype: 'object'}, function(event, payload){
		if (event!=='data') return;
		tokens = JSON.parse(payload);
		if (options) instanciate();
	});
	component.inPorts.add('options', { datatype: 'string' }, function(event, payload) {
		if (event!=='data') return;
		options = payload;
		if (tokens) instanciate();
	});
	component.inPorts.add('stop', component.outPorts.out.disconnect);
	return component; // Return new instance

	function instanciate(){
		var factory = new TwitterFilterStreamFactory(tokens.appToken, tokens.appSecret);
		var stream = factory.create(tokens.userToken, tokens.userSecret, options);
		stream.on('data', function(tweet){ component.outPorts.out.send(tweet); });
	}
};