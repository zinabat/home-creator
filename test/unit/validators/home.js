const validate = require('../../../src/validators/home.js');
const expect = require('chai').expect;

describe('Validators - home', () => {
	const badData = [
		{ name: 'empty object', data: {} },
		{ name: 'not JSON', data: 'notJson' },
		{ name: 'properties missing', data: { "home": "stuff missing" } },
		{ name: 'bad province', data: {
			"address": "1 Chestnut Place",
			"city": "Guelph",
			"province": "USA",
			"type": "detached",
			"zone": "residential"
		} }
	];
	badData.forEach(test => {
		it(`fails validation for bad data: ${test.name}`, () => {
			expect(validate(test.data)).to.be.false;
		});
	});

	const goodData = [
		{ name: 'totally perfect', data: {
			"address": "1 Chestnut Place",
			"city": "Guelph",
			"province": "ON",
			"type": "detached",
			"zone": "residential"
		} },
		{ name: 'lowercase province', data: {
			"address": "1 Chestnut Place",
			"city": "Guelph",
			"province": "on",
			"type": "detached",
			"zone": "residential"
		} }
	];

	goodData.forEach(test => {
		it(`passes validation for good data: ${test.name}`, () => {
			expect(validate(test.data)).to.be.true;
		});
	});
});
