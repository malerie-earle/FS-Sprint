const express = require("express");
const path = require('path');
const { myEmitter, logger } = require('./logEvents');
const { router } = require('./routes');

// Importing functions from separate DAL files
const { getCustomers } = require('./DAL/customer.dal');
const { getVendors } = require('./DAL/vendor.dal');
const { getProducts } = require('./DAL/product.dal');

const app = express();
const PORT = process.env.PORT || 8081;

app.set('view engine', 'ejs');

app.use(express.static(path.join(__dirname, 'public')));

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
