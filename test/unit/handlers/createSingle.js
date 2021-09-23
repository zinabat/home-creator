const expect = require('chai').expect;
const handler = require('../../../src/handlers/createSingle.js').handler;
const { mockRequest, mockResponse } = require('../../helpers.js');
// const { mockClient } =  require('aws-sdk-client-mock');
// const AWS = require('aws-sdk');

describe('Create Single', () => {
	// let dynamoDBMock;
	// before(() => {
	// 	const dynamoDB = new AWS.DynamoDB.DocumentClient({});
	// 	dynamoDBMock = mockClient(dynamoDB);
	// });
	it('shows an error if validation fails', () => {
		const input = {
			"bad" : "badbadbad"
		};
		expect(() => handler(mockRequest(input), mockResponse())).to.not.throw();
		// todo: check error message is correct
	});

	it.skip('calls dynamo with expected parameters', () => {});
});
