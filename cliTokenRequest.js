const inquirer = require('inquirer');
const axios = require('axios');

// Function to prompt user for username
function promptUsername() {
    return inquirer.prompt([
        {
            type: 'input',
            name: 'username',
            message: 'Enter your username:'
        }
    ]);
}

// Function to request token from server
async function requestToken(username) {
    try {
        const response = await axios.post('http://your-server-url/login', { username });
        console.log('Token:', response.data.token);
    } catch (error) {
        console.error('Error requesting token:', error.message);
    }
}

// Main function to handle CLI token request
async function main() {
    try {
        // Prompt user for username
        const { username } = await promptUsername();

        // Request token from server
        await requestToken(username);
    } catch (error) {
        console.error('An unexpected error occurred:', error);
    }
}

// Invoke main function
main();
