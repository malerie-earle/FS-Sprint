const express = require("express");
const path = require('path');
const bodyParser = require('body-parser'); // Added body-parser
const { myEmitter, logger } = require('./logEvents');
const router = require('./routes'); 
const jwt = require('jsonwebtoken'); // Added jsonwebtoken
const fs = require('fs'); // Added fs module for file operations

const app = express();
const PORT = process.env.PORT || 8081;

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views')); 

app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.json()); // Parse JSON bodies
app.use(bodyParser.urlencoded({ extended: true })); // Parse URL-encoded bodies

// Use the router middleware for all routes defined in routes.js
app.use('/', router);

// Function to add new user record to token.json file
function addNewUser(username, email, phone) {
    const currentDate = new Date();
    const expiryDate = new Date(currentDate);
    expiryDate.setDate(expiryDate.getDate() + 3); // Expiry date set to 3 days after creation
    
    // Read existing data from token.json file
    fs.readFile('token.json', 'utf8', (err, data) => {
        if (err) {
            console.error('Error reading token data:', err);
            return;
        }
        try {
            let users = JSON.parse(data);

            // Add new user record
            users.push({
                created: currentDate,
                username: username,
                email: email,
                phone: phone,
                expires: expiryDate,
                confirmed: 'tbd' // Not sure what confirmed status should be
            });

            // Write updated data back to token.json file
            fs.writeFile('token.json', JSON.stringify(users, null, 2), (err) => {
                if (err) {
                    console.error('Error writing token data:', err);
                } else {
                    console.log('User added to token.json successfully!');
                }
            });
        } catch (error) {
            console.error('Error parsing token data:', error);
        }
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

    // Redirect to success page
    res.redirect('/pages/success'); // Adjust the URL as per your folder structure
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
