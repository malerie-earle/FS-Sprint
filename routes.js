const express = require('express');
const path = require('path');
const { myEmitter, logger } = require('./logEvents.js');
const queries = require('./queries.js');
const fs = require('fs');


// Importing functions from separate DAL files
const { getProducts } = require('./public/DAL/product.dal.js');

const router = express.Router();

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

router.get('/pages/about', (request, response) => {
  myEmitter.emit('route', request.url);
  response.sendFile(path.join(__dirname, 'public', 'pages', 'about.html'));
  logger.info({ level: 'info', message: `Page Requested: ${request.method} ${request.url}` });
});

router.get('/pages/contact', (request, response) => {
  myEmitter.emit('route', request.url);
  response.sendFile(path.join(__dirname, 'public', 'pages', 'contact.html'));
  logger.info({ level: 'info', message: `Page Requested: ${request.method} ${request.url}` });
});

router.get('/pages/account', (request, response) => {
  myEmitter.emit('route', request.url);
  response.sendFile(path.join(__dirname, 'public', 'pages', 'account.html'));
  logger.info({ level: 'info', message: `Page Requested: ${request.method} ${request.url}` });
});

router.get('/pages/users', (request, response) => {
  myEmitter.emit('route', request.url);
  response.sendFile(path.join(__dirname, 'public', 'pages', 'users.html'));
  logger.info({ level: 'info', message: `Page Requested: ${request.method} ${request.url}` });
});

router.get('/pages/checkout', (request, response) => {
  myEmitter.emit('route', request.url);
  response.sendFile(path.join(__dirname, 'public', 'pages', 'checkout.html'));
  logger.info({ level: 'info', message: `Page Requested: ${request.method} ${request.url}` });
});

router.get('/pages/success', (request, response) => {
  myEmitter.emit('route', request.url);
  response.sendFile(path.join(__dirname, 'public', 'pages', 'success.html'));
  logger.info({ level: 'info', message: `Page Requested: ${request.method} ${request.url}` });
});

// Create a new folder
function createFolder(request, response) {
  const folderName = 'newFolder';
  fs.mkdir(folderName, (error) => {
    if(error) {
      console.error(error);
      myEmitter.emit('event', request.url, 'ERROR', 'A new folder was NOT created');
      response.writeHead(500, { 'Content-Type': 'text/plain' });
      response.end('500 Internal Server Error');
    } else {
      myEmitter.emit('event', request.url, 'SUCCESS', 'A new folder was created');
      response.writeHead(200, { 'Content-Type': 'text/plain' });
      response.end('New folder created');
    }
  });
}

function fetchFile(fileName, response) {
  fs.readFile(fileName, (error, content) => {
    if(error) {
      response.writeHead(500, { 'Content-Type': 'text/plain' });
      response.end('500 Internal Server Error');
    } else {
      response.writeHead(200, { 'Content-Type': 'text/html' });
      response.end(content, 'utf-8');
    }
  });
}

module.exports = router;
