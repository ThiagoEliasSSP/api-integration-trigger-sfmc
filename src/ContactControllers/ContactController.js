const ContactRepositories = require('../ContactRepositories/ContactRepository');
const getToken = require('../Helpers/getToken');
const addHours = require('../Helpers/getCurrentDate');
const config = require('../config');

class ContactController {
	async sentContactIntoSalesforce(request, response) {
		const { email, name } = request.body;

		const {access_token} = await getToken(config.setup);

		const currentDate = await addHours(new Date(), 3);

		const isInsertedIntoJourney = await ContactRepositories.insertContactJourney(config.setup, { email, name, currentDate }, access_token);

		if(!isInsertedIntoJourney) {
			const isUpsertedIntoDataExtension = await ContactRepositories.upsertContactDataExtension(config.setup, { email, name, currentDate }, access_token);


			if(!isUpsertedIntoDataExtension) {
				return response.status(400).json({'error': 'It was not possible to insert the contact in the journey or data extension'});
			}
			return response.status(200).json({'sucess': 'contact successfully inserted into the Data Extension'});
		}

		return response.status(200).json({'sucess': 'contact successfully inserted into the Journey'});
	}
}

module.exports = new ContactController();
