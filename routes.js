// Imports
const express = require('express');
const path = require('path');
const { myEmitter, logger } = require('./logEvents.js');
const queries = require('./queries.js');
const fs = require('fs');


// Importing functions from separate DAL files
const { getProducts } = require('./public/DAL - Data Access Layer/product.dal.js');

// Create a new instance of express router
const router = express.Router();

// Redirect to index page
router.get('/', (request, response) => {
  response.redirect("/index");
});

// Routes
router.get('/index', async (request, response) => {
  try {
    const products = await getProducts();
    response.render('index', { products });
  } catch (error) {
    logger.error({ level: 'error', message: `Error fetching products: ${error.message}` });
    response.sendFile(path.join(__dirname, 'public', 'pages', 'index.html'));
  }
});

// Route to fetch about page
router.get('/pages/about', (request, response) => {
  myEmitter.emit('route', request.url);
  response.sendFile(path.join(__dirname, 'public', 'pages', 'about.html'));
  logger.info({ level: 'info', message: `Page Requested: ${request.method} ${request.url}` });
});

// Route to fetch contact page
router.get('/pages/contact', (request, response) => {
  myEmitter.emit('route', request.url);
  response.sendFile(path.join(__dirname, 'public', 'pages', 'contact.html'));
  logger.info({ level: 'info', message: `Page Requested: ${request.method} ${request.url}` });
});

// Route to fetch account page
router.get('/pages/account', (request, response) => {
  myEmitter.emit('route', request.url);
  response.sendFile(path.join(__dirname, 'public', 'pages', 'account.html'));
  logger.info({ level: 'info', message: `Page Requested: ${request.method} ${request.url}` });
});

// Route to fetch users page
router.get('/pages/users', (request, response) => {
  myEmitter.emit('route', request.url);
  response.sendFile(path.join(__dirname, 'public', 'pages', 'users.html'));
  logger.info({ level: 'info', message: `Page Requested: ${request.method} ${request.url}` });
});

// Route to fetch products page
router.get('/pages/success', (request, response) => {
  myEmitter.emit('route', request.url);
  response.sendFile(path.join(__dirname, 'public', 'pages', 'success.html'));
  logger.info({ level: 'info', message: `Page Requested: ${request.method} ${request.url}` });
});

// Route to fetch verify page
router.get('/verify.html', (request, response) => {
  myEmitter.emit('route', request.url);
  response.sendFile(path.join(__dirname, 'public', 'pages', 'verify.html'));
  logger.info({ level: 'info', message: `Page Requested: ${request.method} ${request.url}` });
});

// Exports
module.exports = router;
