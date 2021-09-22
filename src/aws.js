const AWS = require('aws-sdk');
const config = require('./config.js');

AWS.config.update({
	region: config.REGION
});
module.exports = AWS;
