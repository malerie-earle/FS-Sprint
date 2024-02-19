/*************************
 * File Name: app.js
 * Purpose: The main entry point for the application
 
 * Commands:
app  --init         initializes the app
app  --config       displays the configuration file
app  --token        generates a user token
app  --help         displays the usage.txt file

 * Created Date: 18 Feb 2024

 * Authors: Malerie Earle, Kateryna Danevych, Janeil Carroll
 
 *************************/
global.DEBUG = true;

const fs = require("fs");

const { initializeApp } = require('./init.js'); // import the init.js module and initialize the app

const { configApp } = require('./config.js'); // import the config.js module and configure the app

const myArgs = process.argv.slice(2); // get the command line arguments


if(DEBUG) if(myArgs.length >= 1) console.log('the app.args: ', myArgs);

switch (myArgs[0]) {

  case 'init':
  case 'i':
      if(DEBUG) console.log(myArgs[0], ' - initialize the app.');
      initializeApp();
      break;

  case 'config':
  case 'c':
      if(DEBUG) console.log(myArgs[0], ' - display the configuration file');
      configApp(); 
      break;

  case 'token':
  case 't':
      if(DEBUG) console.log(myArgs[0], ' - generate a user token');
      break;  

  case '--help':
  case '--h':
  default:
      fs.readFile(__dirname + "/usage.txt", (error, data) => {
          if(error) throw error;
          console.log(data.toString());
      });
}