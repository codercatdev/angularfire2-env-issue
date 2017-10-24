var fs = require('fs');
var path = require('path');
var useDefaultConfig = require('@ionic/app-scripts/config/copy.config.js');

module.exports = function () {
	var fs = require('fs');
	var path = require('path');

	var ROOT_DIR = process.cwd();
	var DEST_FILE = 'src/environments/environment.json';

	var env = process.env.MY_ENV || 'dev';
	var envFile = 'env/environment.' + env + '.json';
	
	var configFileFull = path.join(ROOT_DIR, envFile);
	var destFileFull = path.join(ROOT_DIR, DEST_FILE);
	
	var data = fs.readFileSync(configFileFull, 'utf8');

	fs.writeFileSync(destFileFull, data);

	return useDefaultConfig;
};