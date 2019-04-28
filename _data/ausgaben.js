const fs = require('fs');
const folder = "static/downloads/ausgaben";

module.exports = function() {
	var collector = [];
	var filenames = fs.readdirSync(folder);
	
	filenames.forEach(filename => {
    	if(filename.endsWith(".pdf")) {
			collector.push(filename);
    	}
	});
	return collector;
};