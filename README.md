# API Integration Trigger for Salesforce Marketing Cloud

## Overview
This service exposes a small Express API that triggers a Salesforce Marketing Cloud (SFMC) Journey event or, as a fallback, upserts a contact into a Data Extension. It is useful when you need to connect another platform (for example, VTEX) to Marketing Cloud without writing the integration from scratch.

When a POST request is sent to the `/` endpoint with a contact's information, the application:

1. Authenticates against SFMC using the Client Credentials flow to obtain an access token.
2. Attempts to trigger a Journey event using the configured Event Definition Key.
3. Falls back to upserting the contact into a Data Extension if the Journey trigger fails.
4. Returns a success or error message indicating where the contact was stored.

## Prerequisites
- Node.js 18 or newer
- Yarn or npm
- An SFMC account with:
  - A REST API integration (Client ID and Client Secret)
  - A Journey Builder Event Definition Key (for triggering the journey)
  - A Data Extension External Key (for the fallback upsert)

## Installation
```bash
# install dependencies
yarn install
# or
npm install
```

## Configuration
Create a `.env` file in the project root with the following variables:

```ini
AUTHBASEURI="https://YOUR_SUBDOMAIN.auth.marketingcloudapis.com/"
RESTBASEURI="https://YOUR_SUBDOMAIN.rest.marketingcloudapis.com/"
CLIENTID="your-client-id"
CLIENTSECRET="your-client-secret"
EVENTDEFINITIONKEY="your-journey-event-definition-key"
EXTERNALKEY="your-data-extension-external-key"
PORT=5001 # optional, defaults to 5001
```

> **Tip:** Keep the trailing slash (`/`) on the `AUTHBASEURI` and `RESTBASEURI` values so that the generated URLs are valid.

## Running the Server
Start the API in development mode with hot reloading:

```bash
yarn dev
# or
npm run dev
```

Start the API in production mode:

```bash
yarn start
# or
npm start
```

The server listens on `http://localhost:PORT` (defaults to `5001`).

## Triggering a Contact
Send a POST request to the root endpoint with the contact details:

```http
POST / HTTP/1.1
Host: localhost:5001
Content-Type: application/json

{
  "email": "customer@example.com",
  "name": "Customer Name"
}
```

### Expected Responses
- `200 OK` – The contact was inserted into the Journey or Data Extension.
- `400 Bad Request` – The integration could not insert the contact into either location.

## Request Flow
The request pipeline is coordinated by `ContactController.sentContactIntoSalesforce` and follows this sequence:

1. Obtain an access token via `getToken`, using the credentials provided in your `.env` file.
2. Call `ContactRepository.insertContactJourney` to POST to `/interaction/v1/events` on the SFMC REST API.
3. If the Journey insertion fails, adjust the timestamp and call `ContactRepository.upsertContactDataExtension` to PUT to `/hub/v1/dataevents`.
4. Return an HTTP response indicating whether the Journey or Data Extension insertion succeeded.

The helper functions in `src/Helpers/getCurrentDate.js` adjust the timestamp stored in SFMC to account for your preferred timezone offset.

## Project Structure
```
index.js                    # Express bootstrap file
src/
  ContactControllers/
    ContactController.js    # Handles HTTP requests and orchestration
  ContactRepositories/
    ContactRepository.js    # Wraps SFMC REST API calls (Journey + Data Extension)
  Helpers/
    getToken.js             # Exchanges client credentials for an access token
    getCurrentDate.js       # Utility for adjusting timestamps
  config/
    index.js                # Loads environment variables into a config object
client.http                  # Optional HTTP client examples
```

## Testing the Integration Locally
You can use any HTTP client (Insomnia, Postman, VS Code REST Client) to send requests once the server is running. The repository includes a `client.http` file compatible with the VS Code REST Client extension.

## Extending the Service
- Add validation to ensure the incoming payload contains the expected fields before contacting SFMC.
- Customize the data mapped into the Journey/Data Extension payload.
- Handle additional error cases returned by the SFMC REST API for better observability.

## Troubleshooting
- **401 Unauthorized**: Check that your Client ID/Secret pair is valid and that the SFMC REST integration has the necessary permissions.
- **404 Not Found**: Ensure the Event Definition Key or Data Extension External Key exists in your SFMC instance.
- **Network Errors**: Verify that your `AUTHBASEURI` and `RESTBASEURI` values include the correct subdomain and protocol (`https`).

## License
This project is distributed under the MIT License.
