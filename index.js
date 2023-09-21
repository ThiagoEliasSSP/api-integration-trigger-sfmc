const Express = require('express');
const ContactController = require('./src/ContactControllers/ContactController');
const app = Express();
const port = process.env.PORT || 5001;

app.use(Express.json());
app.post('/', ContactController.sentContactIntoSalesforce);

app.listen(port, console.log(`Server running at http://localhost:${port}`));
