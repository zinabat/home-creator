
const AWS = require('aws-sdk');
const { v4: uuidv4 } = require('uuid');
const config = require('../config.js');
const dynamoDb = new AWS.DynamoDB.DocumentClient();
const validator = require('../validators/home.js');
// const Siren = require('siren-builder');

module.exports.handler = function (req, res) {
	const input = req.body;
	try {
		if (!validator(input)) {
			throw new Error(`Failed validation: ${JSON.stringify(validator.errors)}`);
		}
	} catch (err) {
		return res.status(400).json({ error: `Something went wrong? ${JSON.stringify(err)}` });
	}

	try {
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
			// const entity = Siren.entity()
			// 	.addClass('home')
			// 	.addLink('self', `${config.API_ENDPOINT}/home/${params.Item.homeId}`)
			// 	.addProperties(input);
			res.json(params);
		});
	} catch (err) {
		res.status(400).json(err);
	}
};
