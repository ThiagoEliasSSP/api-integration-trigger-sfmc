var axios = require('axios');

class ContactRepository {
	upsertContactDataExtension(setup, data, token){

		var options = {
			method: 'PUT',
			url: `https://mc62l6vyyk-8r4gwyvbjxdlwzdgq.rest.marketingcloudapis.com/hub/v1/dataevents/key:${setup.externalKey}/rows/email:${data.email}`,
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${token}`
			},
			data: {
				values: {
					email: data.email,
					nome: data.name
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
