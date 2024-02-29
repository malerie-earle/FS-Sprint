// server.js
const express = require("express");
const path = require('path');
const bodyParser = require('body-parser'); // Added body-parser
const jwt = require('jsonwebtoken'); // Added jsonwebtoken
const { myEmitter, logger } = require('./logEvents');
const router = require('./routes'); 

const app = express();
const PORT = process.env.PORT || 8081;

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views')); 

app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.json()); // Parse JSON bodies
app.use(bodyParser.urlencoded({ extended: true })); // Parse URL-encoded bodies

// Use the router middleware for all routes defined in routes.js
app.use('/', router);

// Endpoint to handle login form submission
app.post('/login', (req, res) => {
    const { username } = req.body;

    // Check if username is provided
    if (!username) {
        return res.status(400).json({ error: 'Username is required' });
    }

    // Generate token
    const token = jwt.sign({ username }, 'secret_key', { expiresIn: '1h' });

    // Send token back to the user
    res.json({ token });
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
