// Imports
const express = require("express");
const path = require('path');
const bodyParser = require('body-parser'); 
const { myEmitter, logger } = require('./logEvents');
const router = require('./routes'); 
const jwt = require('jsonwebtoken'); 
const fs = require('fs'); 

// Create an instance of the express app
const app = express();
const PORT = process.env.PORT || 8081;

// Set the view engine to ejs
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views')); 

// Serve static files from the public directory
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.json()); 
app.use(bodyParser.urlencoded({ extended: true })); 

// Use the router middleware for all routes defined in routes.js
app.use('/', router);

// Function to add new user record to token.json file
function addNewUser(username, email, phone) {
    const currentDate = new Date();
    const expiryDate = new Date(currentDate);
    expiryDate.setDate(expiryDate.getDate() + 3); // Expiry date set to 3 days after creation

    // Format current time as "HH:MM:SS"
    const formattedTime = `${currentDate.getHours()}:${currentDate.getMinutes()}:${currentDate.getSeconds()}`;
    
    // Read existing data from token.json file
    fs.readFile(path.join(__dirname, 'token.json'), 'utf8', (err, data) => {
        if (err && err.code !== 'ENOENT') {
            console.error('Error reading token data:', err);
            return;
        }
        // Parse the existing data from token.json
        let users = [];
        if (!err) {
            try {
                users = JSON.parse(data);
            } catch (error) {
                console.error('Error parsing token data:', error);
            }
        }

        // Generate token
        const token = jwt.sign({ username }, 'secret_key', { expiresIn: '1h' });

        // Add new user record
        users.push({
            created: formattedTime,
            username: username,
            email: email,
            phone: phone,
            token: token,
            expires: expiryDate,
            confirmed: 'true',
        });

        // Write updated data back to token.json file
        fs.writeFile(path.join(__dirname, 'token.json'), JSON.stringify(users, null, 2), (err) => {
            if (err) {
                console.error('Error writing token data:', err);
            } else {
                console.log('User added to token.json successfully!');
            }
        });
    });
}

// Function to add new user record to newuser.json file
function addNewUserToNewUserFile(username, email, password) {
    const currentDate = new Date();

    // Format current time as "HH:MM:SS"
    const formattedTime = `${currentDate.getHours()}:${currentDate.getMinutes()}:${currentDate.getSeconds()}`;
    
    // Read existing data from newuser.json file
    fs.readFile(path.join(__dirname, 'newuser.json'), 'utf8', (err, data) => {
        if (err && err.code !== 'ENOENT') {
            console.error('Error reading newuser data:', err);
            return;
        }
        // Parse the existing data from newuser.json
        let users = [];
        if (!err) {
            try {
                users = JSON.parse(data);
            } catch (error) {
                console.error('Error parsing newuser data:', error);
            }
        }

        // Add new user record
        users.push({
            created: formattedTime,
            username: username,
            email: email,
            password: password,
        });

        // Write updated data back to newuser.json file
        fs.writeFile(path.join(__dirname, 'newuser.json'), JSON.stringify(users, null, 2), (err) => {
            if (err) {
                console.error('Error writing newuser data:', err);
            } else {
                console.log('New user created and added to newuser.json successfully!');
            }
        });
    });
}

// Endpoint to handle login form submission
app.post('/login', (req, res) => {
    const { username } = req.body;

    // Check if username is provided
    if (!username) {
        return res.status(400).json({ error: 'Username is required' });
    }

    // Assuming successful authentication, add user to token.json
    addNewUser(username, req.body.email, req.body.phone);

    // Generate token
    const token = jwt.sign({ username }, 'secret_key', { expiresIn: '1h' });

    // Log the generated token to the console
    console.log('Generated token:', token);

    // Write token to token.json
    writeTokenToJSON(username, token);

    // Redirect to verify page with token data
    res.redirect(`/verify.html?token=${token}`);
});

// Endpoint to handle token verification
app.post('/verify-token', (req, res) => {
    const { tokenInput, token } = req.body;

    console.log('Token:', token);

    // Check if token and tokenInput are defined
    if (token && tokenInput) {
        // Check if tokenInput matches the last 4 characters of the token
        const lastFourToken = token.slice(-4);
        if (tokenInput === lastFourToken) {
            // Token verification successful
            res.redirect('/pages/success.html'); 
            return;
        }
    }
    
    // Token verification failed
    res.redirect(`/verify.html?error=1&token=${token}`); 
});

// Function to write token to token.json
const writeTokenToJSON = (username, token) => {
    const tokenData = { username, token };
    const tokens = JSON.parse(fs.readFileSync('token.json', 'utf8'));
    tokens.push(tokenData);
    fs.writeFileSync('token.json', JSON.stringify(tokens, null, 2));
}
// Endpoint to handle registration form submission
app.post('/register', (req, res) => {
    const { newUsername, email, password } = req.body;

    // Check if all required fields are provided
    if (!newUsername || !email || !password) {
        return res.status(400).json({ error: 'All fields are required' });
    }

    // Add user to newuser.json
    addNewUserToNewUserFile(newUsername, email, password);

    // Redirect to new user success page
    res.redirect('/pages/newusersuccess.html'); 
});
// Endpoint to handle user registration
app.use((request, response) => {
    const errorMessage = '404 - route not found.';
    logger.error({ level: 'error', message: errorMessage });
    response.status(404).send(errorMessage);
});
// Start the server
const server = app.listen(PORT, () => {
    logger.info({ level: 'info', message: `Server is listening on port ${PORT}` });
});

// Handle server errors
server.on('error', (error) => {
    if (error.code === 'EADDRINUSE') {
        logger.error({ level: 'error', message: `Port ${PORT} is already in use.` });
    } else {
        logger.error({ level: 'error', message: `An error occurred: ${error.code}` });
    }
});
