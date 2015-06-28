// File: components/forwarder.js
var noflo = require("noflo");

exports.getComponent = function() {
	var component = new noflo.Component;
	component.description = "Just logging stuff for the craic";

	// Register ports and event handlers
	component.inPorts.add('in', { datatype: 'all' }, function(event, payload) {
		console.log('[YyY]', arguments);
		switch (event) {
			case 'data':
				console.log(payload);
		}
	});

	return component; // Return new instance
};