# Clone
git clone <this repo>

# Firebase testing

Make sure you have firebase CLI installed
npm install -g firebase-tools

-npm install

## Dev
npm run build ionic:build:dev:prod

firebase serve
Go to localhost:5000
-> should log you into environment-sample-dev.firebaseapp.com

## Prod
npm run build ionic:build:prod:prod

firebase serve
Go to localhost:5000
-> should log you into environment-sample-prod.firebaseapp.com

## Ionic Serve
standard ionic serve will run on 8100(or next available) and pickup your env/environment.dev.json file

# Key files
## package.json
```
  "scripts": {
    "clean": "ionic-app-scripts clean",
    "build": "ionic-app-scripts build",
    "lint": "ionic-app-scripts lint",
    "ionic:build": "ionic-app-scripts build",
    "ionic:serve": "ionic-app-scripts serve",
    "ionic:build:dev": "cross-env MY_ENV=dev ionic-app-scripts build",
    "ionic:build:dev:prod": "cross-env MY_ENV=dev ionic-app-scripts build --prod",
    "ionic:build:prod:prod": "cross-env MY_ENV=dev ionic-app-scripts build --prod"
  },
  "config": {
    "ionic_copy": "./config/copy.config.js",
    "ionic_webpack": "./config/webpack.config.js"
  },
```
## config/copy.config.js
```
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
```
## config/webpack.config.js
```
var path = require('path');
var useDefaultConfig = require('@ionic/app-scripts/config/webpack.config.js');

module.exports = function () {
	var envFile = './src/environments/environment.ts';
	var alias = { '@app/env': path.resolve(envFile) };

	useDefaultConfig.dev.resolve.alias = alias;
	useDefaultConfig.prod.resolve.alias = alias;

	return useDefaultConfig;
};
```
## environments
### env/environment.dev.json
This is your dev config
```
{
    "environmentName": "Development Environment",
    "ionicEnvName": "dev",
    "firebase": {
        "apiKey": "AIzaSyABYjyKLf1Q4YWpr-IeVlqY8SvT9GBfR_k",
        "authDomain": "environment-sample-dev.firebaseapp.com",
        "projectId": "environment-sample-dev"
    }
}
```
### env/environment.prod.json
This is your prod config
```
{
    "environmentName": "Production Environment",
    "ionicEnvName": "prod",
    "firebase": {
        "apiKey": "AIzaSyBX7fxtorP7FpATNUy3oyIBtQ5NdhYhfnc",
        "authDomain": "environment-sample-prod.firebaseapp.com",
        "projectId": "environment-sample-prod"
    }
}
```
## src/app/app.d.ts
This allows the use of json files
```
declare module '*.json' {
    const value: any;
    export default value;
}
```

## src/environments/envirnoment
Allow typescript to the configs
```
import { Environment } from './environment.model';
import * as data from './environment.json';

export const ENV: Environment = <any>data;
```