const Ajv = require('ajv');
const ajv = new Ajv();
require("ajv-keywords")(ajv);

// todo: the schema should also include a prior step for more detailed data cleaning and transformation
const schema = {
	type: "object",
	properties: {
		address: {type: "string"},
		city: {type: "string"},
		province: {
			type: "string",
			transform: ["toUpperCase"],
			enum: ["ON","QC","MB","SK","YT","NT","NU","BC","AB","NL","NB","PE","NS"]
		},
		type: {
			type: "string",
			transform: ["toLowerCase"],
			enum: ["detached", "semi-detached", "lot"] // other standard ones
		},
		zone: {type: "string"}
	},
	allRequired: true,
	additionalProperties: false
};

module.exports = ajv.compile(schema);
