/*************************
 * File Name: index.js
 * 
 * Purpose: The main entry point for the application
 * 
 * Commands:
 * 
 * app init                                initialize the application.
 * app config                              create or change the app configuration.
 * app config --show                       show the contents of the config file
 * app config --reset                      reset back to default the config file
 * app config --set                        set a specific config setting.
 * app token --help                        displays help for the token command.
 * app token --count                       displays a count of the tokens created.
 * app token --new <username>              generates a token for a given username.
 *                                         saves tokens to the json file.
 * app token --upd p <username> <phone>    updates the json entry with a new phone number.
 * app token -- upd e <username> <email>   updates the json entry with a new email.
 * app token --search u <username>         fetches a token for a given username.
 * app token --search e <email>            fetches a token for a given email.
 * app token --search p <phone>            fetches a token for a given phone number.
 * 
 * Created Date: 18 Feb 2024
 * Authors: Malerie Earle, Kateryna Danevych, Janeil Carroll
 *************************/
 
// Imports
const fs = require("fs");

// Import user management functions from userManagement.js
const {
    addUserRecord,
    updateUserRecords,
    searchUserRecord
} = require('./userManagement.js');

// Import the logEvents.js module and create a logger
const { myEmitter, logger } = require('./logEvents.js');

// Import the config.js module and configure the app
const { configApp } = require('./config.js'); 

// Get the command line arguments
const myArgs = process.argv.slice(2); 
myEmitter.emit('event', 'app', 'INFO', 'The app has started.');
if (myArgs.length >= 1) {
    myEmitter.emit('event', 'app', 'INFO', `The app.args: ${myArgs}`);
}

// Switch statement to handle the command line arguments
switch (myArgs[0]) {
    // Initialize app
    case 'init':
    case 'i': // should we use i as it can also mean install (maybe s for start? -janeil)
        myEmitter.emit(myArgs[0], ' - initialize the app.');
        initializeApp();
        logger.info(`Command '${myArgs[0]}' received - initializing the app.`);
        break;

    // Display the configuration file
    case 'config':
    case 'c':
        switch (myArgs[1]) {
            case '--show':
                myEmitter.emit(myArgs[1], ' - show the contents of the config file');
                // Call function to show the contents of the config file
                logger.info(`Command '${myArgs[1]}' received - showing the contents of the config file.`);
                break;
            case '--reset':
                myEmitter.emit(myArgs[1], ' - reset back to default the config file');
                // Call function to reset the config file
                logger.info(`Command '${myArgs[1]}' received - resetting back to default the config file.`);
                break;
            case '--set':
                myEmitter.emit(myArgs[1], ' - set a specific config setting');
                // Call function to set a specific config setting
                logger.info(`Command '${myArgs[1]}' received - setting a specific config setting.`);
                break;
            default:
                myEmitter.emit(myArgs[0], ' - display the configuration file');
                configApp(); 
                logger.info(`Command '${myArgs[0]}' received - displaying the configuration file.`);
        }
        break;

    // Generate a user token
    case 'token':
    case 't':
        myEmitter.emit(myArgs[0], ' - generate a user token');
        // generateToken();
        logger.info(`Command '${myArgs[0]}' received - generating a user token.`);
        break;  

    // Add a new user record
    case '--addUser':
    case '--add':
        if (myArgs.length < 4) {
            console.error('Insufficient arguments. Usage: app --addUser <username> <email> <phone>');
        } else {
            const [_, username, email, phone] = myArgs;
            addUserRecord(username, email, phone);
        }
        break;

    // Update an existing user record
    case '--updateUser':
    case '--update':
        if (myArgs.length < 4) {
            console.error('Insufficient arguments. Usage: app --updateUser <username> <email> <phone>');
        } else {
            const [_, username, email, phone] = myArgs;
            updateUserRecords(username, email, phone);
        }
        break;

    // Search for a user record
    case '--searchUser':
    case '--search':
        if (myArgs.length < 2) {
            console.error('Insufficient arguments. Usage: app --searchUser <username/email/phone>');
        } else {
            const [_, searchQuery] = myArgs;
            searchUserRecord(searchQuery);
        }
        break;

    // Display the usage.txt file when help is requested
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
