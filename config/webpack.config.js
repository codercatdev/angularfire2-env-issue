var path = require('path');
var useDefaultConfig = require('@ionic/app-scripts/config/webpack.config.js');

module.exports = function () {
	var envFile = './src/environments/environment.ts';
	var alias = { '@app/env': path.resolve(envFile) };

	useDefaultConfig.dev.resolve.alias = alias;
	useDefaultConfig.prod.resolve.alias = alias;

	return useDefaultConfig;
};