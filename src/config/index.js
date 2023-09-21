require('dotenv').config();

const config = {
	setup: {
		authBaseURI: process.env.AUTHBASEURI,
		restBaseURI: process.env.RESTBASEURI,
		clientId: process.env.CLIENTID,
		clientSecret: process.env.CLIENTSECRET,
		eventDefinitionKey: process.env.EVENTDEFINITIONKEY,
		externalKey: process.env.EXTERNALKEY
	}
};

module.exports = config;
