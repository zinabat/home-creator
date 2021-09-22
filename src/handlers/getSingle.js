
const AWS = require('../aws.js');
const config = require('../config.js');
const dynamoDb = new AWS.DynamoDB.DocumentClient();

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
			res.status(400).json({ error: 'Could not get home' });
		}
		if (!result.Item) {
			res.status(404).json({ error: "Home not found" });
		} else {
			res.json(result.Item);
		}
	});
};
