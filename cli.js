#!/usr/bin/env node

const { program } = require('commander');
const fs = require('fs');
const userManagement = require('./userManagement.js');
const { configjson, tokenjson } = require('./templates.js'); // Import config.json and token.json


// app init command function
function initCommand(options) {
    if (options.mk) {
        fs.mkdirSync('folder1');
        fs.mkdirSync('folder2');
        console.log("Created all application folders.");
    } else if (options.cat) {
        fs.writeFileSync('file1.txt', 'Content for file1');
        fs.writeFileSync('file2.txt', 'Content for file2');
        console.log("Created all application files.");
    } else if (options.all) {
        fs.mkdirSync('folder3');
        fs.writeFileSync('file3.txt', 'Content for file3');
        console.log("Created all folders and files.");
    } else {
        console.log("Initializing the application...");
        
    }
}

// app config command function
function configCommand(options) {
    if (options.show) {
        console.log(configjson); // Use config.json directly
    } else if (options.reset) {
        const defaultConfig = {
            "name": "CLI",
            "version": "1.0.0",
            "description": "The Command Line Interface (CLI) for the Application in Sprint 1",
            "main": "cli.js",
            "superuser": "admin",
            "database": "Newfie Nook"
        };
        fs.writeFileSync('config.json', JSON.stringify(defaultConfig, null, 2));
        console.log('Config file reset to default.');
    } else if (options.set) {
        const setting = options.set.split(':')[0];
        const value = options.set.split(':')[1];
        if (setting && value) {
            const configData = JSON.parse(fs.readFileSync('config.json', 'utf8'));
            configData[setting.trim()] = value.trim();
            fs.writeFileSync('config.json', JSON.stringify(configData, null, 2));
            console.log(`Configuration updated: ${setting} set to ${value}`);
        } else {
            console.log('Invalid format for --set option. Use --set key:value');
        }
    } else {
        console.log("No valid option specified for config command.");
    }
}


// Function to generate token based on username 
function tokenCommand(username) {
    try {
        console.log(`Generating token for ${username}...`);
        const token = generateToken(); // Generate a new token
        let tokens = [];
        if (fs.existsSync('token.json')) {
            const data = fs.readFileSync('token.json');
            tokens = JSON.parse(data);
        }
        tokens.push({ username: username, token: token });
        fs.writeFileSync('token.json', JSON.stringify(tokens, null, 2));
        console.log(`Token generated and saved for ${username}`);
    } catch (error) {
        console.error('Error generating token:', error);
    }
}

function generateToken() {
    // Logic to generate a random token 
    const tokenLength = 10;
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let token = '';
    for (let i = 0; i < tokenLength; i++) {
        token += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return token;
}

// Function to update user information
function updateUserCommand(options) {
    if (options.username) {
        console.log(`Updating user record for ${options.username}...`);
        const userData = JSON.parse(fs.readFileSync('user.json', 'utf8'));
        const usersToUpdate = userData.filter(user => user.username === options.username);
        if (usersToUpdate.length > 0) {
            usersToUpdate.forEach(user => {
                user.email = options.email || user.email;
                user.phone = options.phone || user.phone;
            });
            fs.writeFileSync('user.json', JSON.stringify(userData, null, 2));
            console.log(`User record updated for ${options.username}`);
        } else {
            console.log(`User ${options.username} not found.`);
        }
    } else {
        console.log("Username not provided.");
    }
}


// Function to search for a user record
function searchUserCommand(options) {
    console.log(`Searching user record for ${options.queryType} ${options.queryValue}...`);
    const userData = JSON.parse(fs.readFileSync('user.json', 'utf8'));
    let foundUser = null;
    switch (options.queryType) {
        case 'username':
            foundUser = Object.values(userData).find(user => user.username === options.queryValue);
            break;
        case 'email':
            foundUser = Object.values(userData).find(user => user.email === options.queryValue);
            break;
        case 'phone':
            foundUser = Object.values(userData).find(user => user.phone === options.queryValue);
            break;
        default:
            console.log("Invalid query type.");
            break;
    }
    if (foundUser) {
        console.log("User found:", foundUser);
    } else {
        console.log("User not found.");
    }
}


program
    .version('1.0.0')
    .description('CLI');

program
    .command('init')
    .option('--mk', 'Create all application folders')
    .option('--cat', 'Create all application files')
    .option('--all', 'Create all folders and files')
    .description('Initialize the application')
    .action(initCommand);

program
    .command('config')
    .option('--show', 'Show the contents of the config file')
    .option('--reset', 'Reset back to default the config file')
    .option('--set <setting> <value>', 'Set a specific config setting')
    .description('Create or change the app configuration')
    .action(configCommand);

program
    .command('token <username>')
    .description('Generate a user token based on an end user\'s username')
    .action(tokenCommand);

program
    .command('updateUser')
    .option('--username <username>', 'Username of the user record to update')
    .option('--email <email>', 'New email for the user record')
    .option('--phone <phone>', 'New phone number for the user record')
    .description('Add/update the user record email and/or phone number')
    .action(updateUserCommand);

program
    .command('searchUser')
    .option('--queryType <type>', 'Type of query: username, email, or phone')
    .option('--queryValue <value>', 'Value to search for')
    .description('Search for a user record queried by username, email, or phone number')
    .action(searchUserCommand);

module.exports = {
    tokenCommand,
    updateUserCommand,
    searchUserCommand
};

program.parse(process.argv);
