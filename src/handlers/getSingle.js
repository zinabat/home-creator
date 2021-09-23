
const AWS = require('../aws.js');
const config = require('../config.js');
const dynamoDb = new AWS.DynamoDB.DocumentClient();
// const Siren = require('siren-builder');

module.exports.handler = function (req, res) {
	const homeId = req.params.homeId

	const params = {
		TableName: config.HOMES_TABLE,
		Key: {
			homeId
		}
	};

	dynamoDb.get(params, (error, result) => {
		if (error) {
			console.log(error);
			return res.status(400).json({ error: 'Could not get home' });
		}
		if (!result.Item) {
			return res.status(404).json({ error: "Home not found" });
		}
		// const entity = Siren.entity()
		// 	.addClass('home')
		// 	.addLink('self', `${config.API_ENDPOINT}/home/${params.Item.homeId}`)
		// 	.addProperties(result.Item);
		return res.json(result.Item);
	});
};
