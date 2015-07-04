var noflo = require("noflo");

exports.getComponent = function() {
	var component = new noflo.Component();
	component.description = "Filter text content from tweet data";

	component.inPorts.add('in', { datatype: 'object' }, function(event, payload) {
		if (event!=='data') return;
		component.outPorts.out.send(payload.text);
	});
	component.outPorts.add('out', { datatype: 'string' });

	return component;
};