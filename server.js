// Imports express module
const express = require("express");

// Imports fs module
const fs = require("fs");

// Imports winston module
const winston = require('winston');

// Imports logEvents.js module
const { myEmitter, logger } = require('./logEvents');

// Creates a new express application
const app = express();

// Sets the port to 8081
const PORT =  process.env.PORT || 8081;

// Listens for requests on the specified port
const server = app.listen(PORT, () => {
  logger.info({ message: `Server is listening on port ${PORT}` });
});

server.on('error', (error) => {
  if (error.code === 'EADDRINUSE') {
    logger.error({ message: `Port ${PORT} is already in use.` });
  } else {
    logger.error({ message: `An error occurred: ${error.code}` });
  }
});

app.use((request, response, next) => {
  logger.info(`Page Requested: ${request.method} ${request.url}`);
  next();
});

// const { getActors, getActorById } = require('./services/actors.dal')
// const { getFilmById, getAllFilmsForAllActors } = require('./services/films.dal')

// Set log level to capture only warnings and errors
logger.level = 'warn';

// debug on/off toggle
global.DEBUG = false;

// Create Read Update Delete (CRUD)
// app.post   //CREATE html
// app.get    //READ html 
// app.put    //UPDATE
// app.patch  //UPDATE 
// app.delete //DELETE

// set the view engine to ejs
app.set('view engine', 'ejs');

// set the views directory as the root directory
app.get("/views/index", (request, response) => {
  myEmitter.emit('route', request.url);
  response.send("the / route.")
  logger.log(`Page Requested: ${request.method} ${request.url}`);
})

// shows the about page
app.get("/about", (request, response) => {
  myEmitter.emit('route', request.url);
  response.send("the /about route.")
  logger.log(`Page Requested: ${request.method} ${request.url}`);
})

// this is used to view the dal files from db
// app.get("/actors", async (request, response) => {
//   if(DEBUG) console.log("/actors route was accessed.")
//   try {
//     let theActors = await getActors(); // fetch actors from postgresql
//     myEmitter.emit('event', request.url, 'SUCCESS', 'Results fetched from database.');
//     response.write(JSON.stringify(theActors));
//     response.end();
//   } catch {
//     if(DEBUG) console.log("Error fetching actors data.")
//     myEmitter.emit('event', request.url, 'ERROR', '500 - Server error with data fetching.');
//     response.status(500).send('500 - Server error with data fetching.');
//   }
// })

// app.get("/actors/:id", async (request, response) => {
//   if(DEBUG) console.log(`/actors/:id route was accessed using id: ${request.params.id}.`)
//   try {
//     let anActor = await getActorById(request.params.id); // fetch actor from postgresql
//     myEmitter.emit('event', request.url, 'SUCCESS', 'Result fetched from db for actor_id: ' + request.params.id + '.'); 
//     response.write(JSON.stringify(anActor));
//     response.end()
//   } catch {
//     if(DEBUG) console.log("Error fetching actor data.")
//     myEmitter.emit('event', request.url, 'ERROR', '500 - Server error with data fetching.');
//     response.status(500).send('500 - Server error with data fetching.');
//   }
// })

// app.get("/films", async (request, response) => {
//   if(DEBUG) console.log("/films route was accessed.")
//   try {
//     let theFilms = await getAllFilmsForAllActors();
//     myEmitter.emit('event', request.url, 'SUCCESS', 'Results fetched from database.');
//     response.write(JSON.stringify(theFilms));
//     response.end();
//   } catch {
//     if(DEBUG) console.log("Error fetching films data.")
//     myEmitter.emit('event', request.url, 'ERROR', '500 - Server error with data fetching.');
//     response.status(500).send('500 - Server error with data fetching.');
//   }
// })

// app.get("/films/:id", async (request, response) => {
//   if(DEBUG) console.log(`/films/:id route was accessed using id: ${request.params.id}.`)
//   try {
//     let aFilm = await getFilmById(request.params.id); // fetch film from postgresql
//     myEmitter.emit('event', request.url, 'SUCCESS', 'Result fetched from db for film_id: ' + request.params.id + '.');
//     response.write(JSON.stringify(aFilm));
//     response.end()
//   } catch { 
//     if(DEBUG) console.log("Error fetching film data.")
//     myEmitter.emit('event', request.url, 'ERROR', '500 - Server error with data fetching.');
//     response.status(500).send('500 - Server error with data fetching.');
//   }
// })

app.use((request, response) => {
  const errorMessage = '404 - route not found.';
  logger.error(errorMessage);
  response.status(404).write(errorMessage);
  response.end();
}) 
