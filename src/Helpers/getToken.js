var axios = require('axios');

function getToken(setup) {

	const options = {
		method: 'POST',
		url: `${setup.authBaseURI}v2/token`,
		headers: {'Content-Type': 'application/json'},
		data: {
			grant_type: 'client_credentials',
			client_id: setup.clientId,
			client_secret: setup.clientSecret
		}
	};

	const response = axios.request(options)
		.then((response) => response.data)
		.catch((error) => error.data);

	return response;
}

module.exports = getToken;
