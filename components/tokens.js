// File: components/tokens.js
var noflo = require("noflo");

exports.getComponent = function() {
	var component = new noflo.Component;
	component.description = "Twitter APIs tokens distributor";
	
	var tokens = 'tokens';

	// Register ports and event handlers
	component.inPorts.add('in', { datatype: 'all' }, function(event, payload) {
		switch (event) {
			case 'data':
				tokens = payload;
				component.outPorts.ready.send();
		}
	});
	component.inPorts.add('require', { datatype: 'bang' }, function(event) {
		switch (event) {
			case 'data':
				component.outPorts.out.send(tokens);
		}
	});
	component.outPorts.add('out', { datatype: 'all' });
	component.outPorts.add('ready', { datatype: 'all' });

	return component; // Return new instance
};