const upload = require('./upload.js').handler;
const createSingle = require('./createSingle.js').handler;
const getSingle = require('./getSingle.js').handler;
const getAll = require('./getAll.js').handler;

const Siren = require('siren-builder');
const config = require('../config.js');



const root = function (req, res) {
	const entity = Siren.entity()
		.addClass('root')
		.addLink('self', Siren.link().setHref(config.API_ENDPOINT))
		.addAction('create-home', Siren.action()
			.setMethod('POST')
			.setType('application/json')
			.addField('address', Siren.field().setType('text'))
			.addField('city', Siren.field().setType('text'))
			.addField('province', Siren.field().setType('text'))
			.addField('type', Siren.field().setType('text'))
			.addField('zone', Siren.field().setType('text')))
		.addAction('get-home', Siren.action()
			.setMethod('GET')
			.setType('application/json')
			.addField('homeId', Siren.field().setType('text')))
	res.status(200).json(entity);
};

module.exports = {
	upload,
	createSingle,
	getAll,
	getSingle,
	root
};
