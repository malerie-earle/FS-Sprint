const express = require("express");
const path = require('path');
const { myEmitter, logger } = require('./logEvents');
const { router } = require('./routes');
const { auth } = require('express-openid-connect'); // Importing Okta authentication middleware

const app = express();
const PORT = process.env.PORT || 8081;

app.set('view engine', 'ejs');

app.use(express.static(path.join(__dirname, 'public')));

// Okta configuration
const oktaConfig = {
  authRequired: false,
  auth0Logout: true,
  secret: '68ca19da0ea9af83eb1e3089cfd03450d261b9b68ed19965bce7fc2a113f2d0b',
  baseURL: 'http://localhost:8081', 
  clientID: 'HE3gFpaQfU2Kz2RCfiEt5KsJGSyW4U2L', 
  issuerBaseURL: 'https://dev-xmibtuy8xatn474g.us.auth0.com'
};

app.use(auth(oktaConfig)); // Using Okta authentication middleware

app.get("/", (request, response) => {
  response.redirect("/pages/index");
});

app.get("/pages/index", (request, response) => {
  myEmitter.emit('route', request.url);
  response.sendFile(path.join(__dirname, 'public', 'pages', 'index.html'));
  logger.log({ level: 'info', message: `Page Requested: ${request.method} ${request.url}` });
});

app.get("/pages/about", (request, response) => {
  myEmitter.emit('route', request.url);
  response.send("the /about route.");
  logger.log({ level: 'info', message: `Page Requested: ${request.method} ${request.url}` });
});

app.use('/', router);

// Route handler for fetching customers
app.get("/customers", async (request, response) => {
  try {
    const customers = await getCustomers();
    response.json(customers);
  } catch (error) {
    logger.error({ level: 'error', message: `Error fetching customers: ${error.message}` });
    response.status(500).send("Internal Server Error");
  }
});

// Route handler for fetching vendors
app.get("/vendors", async (request, response) => {
  try {
    const vendors = await getVendors();
    response.json(vendors);
  } catch (error) {
    logger.error({ level: 'error', message: `Error fetching vendors: ${error.message}` });
    response.status(500).send("Internal Server Error");
  }
});

// Route handler for fetching products
app.get("/products", async (request, response) => {
  try {
    const products = await getProducts();
    response.json(products);
  } catch (error) {
    logger.error({ level: 'error', message: `Error fetching products: ${error.message}` });
    response.status(500).send("Internal Server Error");
  }
});

app.use((request, response) => {
  const errorMessage = '404 - route not found.';
  logger.error({ level: 'error', message: errorMessage });
  response.status(404).send(errorMessage);
});

const server = app.listen(PORT, () => {
  logger.info({ level: 'info', message: `Server is listening on port ${PORT}` });
});

server.on('error', (error) => {
  if (error.code === 'EADDRINUSE') {
    logger.error({ level: 'error', message: `Port ${PORT} is already in use.` });
  } else {
    logger.error({ level: 'error', message: `An error occurred: ${error.code}` });
  }
});
