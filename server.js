const express = require("express");
const path = require('path');
const { myEmitter, logger } = require('./logEvents');

const app = express();
const PORT = process.env.PORT || 8081;

app.set('view engine', 'ejs');

// Serve static files from the 'public' directory
app.use(express.static(path.join(__dirname, 'public')));

// Define your route handlers
app.get("/", (request, response) => {
  response.redirect("/pages/index");
});

app.get("/pages/index", (request, response) => {
  myEmitter.emit('route', request.url);
  response.sendFile(path.join(__dirname, 'public', 'pages', 'index.html'));
  logger.log(clc.magenta ({ level: 'info', message: `Page Requested: ${request.method} ${request.url}` }));
});

app.get("/pages/about", (request, response) => {
  myEmitter.emit('route', request.url);
  response.send("the /about route.");
  logger.log({ level: 'info', message: `Page Requested: ${request.method} ${request.url}` });
});

// Handle 404 errors
app.use((request, response) => {
  const errorMessage = '404 - route not found.';
  logger.error({ level: 'error', message: errorMessage });
  response.status(404).send(errorMessage);
});

// Start the server
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
