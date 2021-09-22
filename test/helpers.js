const sinon = require('sinon');

const mockRequest = (body) => {
	const res = {};
	res.body = body;
	return res;
};

const mockResponse = () => {
	const res = {};
	res.status = sinon.stub().returns(res);
	res.json = sinon.stub().returns(res);
	return res;
};

module.exports = {
	mockRequest,
	mockResponse
};
