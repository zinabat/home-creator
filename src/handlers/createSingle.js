
let AWS = require('../aws.js'); // let for use with rewire
const { v4: uuidv4 } = require('uuid');
const config = require('../config.js');
const dynamoDb = new AWS.DynamoDB.DocumentClient();
const validator = require('../validators/home.js');

module.exports.handler = function (req, res) {
	const input = req.body;
	try {
		if (!validator(input)) {
			throw new Error(`Failed validation: ${JSON.stringify(validator.errors)}`);
		}
	} catch (err) {
		return res.status(400).json({ error: JSON.stringify(err) });
	}

	const params = {
		TableName: config.HOMES_TABLE,
		Item: {
			homeId: uuidv4(),
			...input
		},
	};

	dynamoDb.put(params, (error) => {
		if (error) {
			console.log(error);
			return res.status(400).json({ error: 'Could not create home' });
		}
		res.json(params);
	});
};