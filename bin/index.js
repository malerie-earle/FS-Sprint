/*************************
 * File Name: index.js
 * Purpose: The main entry point for the application
 
 * Commands:
app  --init         initializes the app
app  --config       displays the configuration file
app  --token        generates a user token
app  --help         displays the usage.txt file

 * Created Date: 18 Feb 2024

 * Authors: Malerie Earle, Kateryna Danevych, Janeil Carroll
 
 *************************/
global.DEBUG = false;

// import the fs module
const fs = require("fs");

// import the logEvents.js module and create a logger
const { logger } = require('./logEvents.js');

// import the myEmitter and logger from the logEvents.js module
const { myEmitter, logger } = require('./logEvents.js');

// import the config.js module and configure the app
const { configApp } = require('./config.js'); 

// get the command line arguments
const myArgs = process.argv.slice(2); 
myEmitter.emit('event', 'app', 'INFO', 'The app has started.');
if(myArgs.length >= 1) {
    myEmitter.emit('event', 'app', 'INFO', `The app.args: ${myArgs}`);
}

// switch statement to handle the command line arguments
switch (myArgs[0]) {
// initialize app
  case 'init':
  case 'i': // should we use i as it can also mean install
    myEmitter.emit(myArgs[0], ' - initialize the app.');
    initializeApp();
    logger.info(`Command '${myArgs[0]}' received - initializing the app.`);
    break;

// display the configuration file
  case 'config':
  case 'c':
    myEmitter.emit(myArgs[0], ' - display the configuration file');
    configApp(); 
    logger.info(`Command '${myArgs[0]}' received - displaying the configuration file.`);
      break;


  case 'token':
  case 't':
    myEmitter.emit(myArgs[0], ' - generate a user token');
    // generateToken();
    logger.info(`Command '${myArgs[0]}' received - generating a user token.`);
      break;  

// display the usage.txt file when help is requested
  case '--help':
  case '--h':
  default:
      fs.readFile(__dirname + "/usage.txt", (error, data) => {
        if (error) {
            logger.error(`An error occurred: ${error}`);
        } else {
            logger.info(data.toString());
        }
      });
}