var path = require('path');
var useDefaultConfig = require('@ionic/app-scripts/config/webpack.config.js');

module.exports = function () {
	var env = process.env.DP_ENV || 'dev';
	console.log(`using DP_ENV:${env}`)
	var envFile = `./src/environments/environment${(env === 'prod' ? '' : '.' + env)}.ts`;
	var alias = { "@app/env": path.resolve(envFile) };
	console.log(alias);

	useDefaultConfig.dev.resolve.alias = alias;
	useDefaultConfig.prod.resolve.alias = alias;

	return useDefaultConfig;
};