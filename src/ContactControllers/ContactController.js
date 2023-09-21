const { upsertContactDataExtension } = require('../ContactRepositories/ContactRepository');
const getToken = require('../Helpers/getToken');
const config = require('../config');

class ContactController {
	async sentContactIntoSalesforce(request, response) {
		const { email, name } = request.body;

		const {access_token} = await getToken(config.setup);

		const isUpsertedIntoDataExtension = await upsertContactDataExtension(config.setup, { email, name }, access_token);

		if(!isUpsertedIntoDataExtension) {
			response.status(400).json({'error': 'Unable to insert contact into Data Extension'});
		}


		response.status(200).json(isUpsertedIntoDataExtension);
	}
}

module.exports = new ContactController();
