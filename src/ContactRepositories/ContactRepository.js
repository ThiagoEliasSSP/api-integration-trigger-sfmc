var axios = require('axios');

class ContactRepository {
	insertContactJourney(setup, data, token){
		const options = {
			method: 'POST',
			url: `${setup.restBaseURI}interaction/v1/events`,
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${token}`
			},
			data: {
				ContactKey: data.email,
				EventDefinitionKey: setup.eventDefinitionKey,
				Data: {
					email: data.email,
					nome: data.name,
					insert_date: data.currentDate
				}
			}
		};

		const response = axios.request(options)
			.then((response) => response.data)
			.catch((error) => error.data);

		return response;
	}

	upsertContactDataExtension(setup, data, token){
		const options = {
			method: 'PUT',
			url: `https://mc62l6vyyk-8r4gwyvbjxdlwzdgq.rest.marketingcloudapis.com/hub/v1/dataevents/key:${setup.externalKey}/rows/email:${data.email}`,
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${token}`
			},
			data: {
				values: {
					email: data.email,
					nome: data.name,
					insert_date: data.currentDate
				}
			}
		};

		const response = axios.request(options)
			.then((response) => response.data)
			.catch((error) => error.data);

		return response;
	}
}

module.exports = new ContactRepository();
