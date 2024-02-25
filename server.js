const express = require("express");
const path = require('path');
const { myEmitter, logger } = require('./logEvents');
const { router } = require('./routes');

const app = express();
const PORT = process.env.PORT || 8081;

app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', router);

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
