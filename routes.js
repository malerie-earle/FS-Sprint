// Imports
const fs = require('fs');
const express = require('express');
const path = require('path');
const { myEmitter, logger } = require('./logEvents.js');

// Importing functions from separate DAL files
const { getCustomers } = require('./public/DAL/customer.dal.js');
const { getVendors } = require('./public/DAL/vendor.dal.js');
const { getProducts } = require('./public/DAL/product.dal.js');


const router = express.Router();

router.get('/', (request, response) => {
  response.redirect("/pages/index");
});

router.get('/pages/index', (request, response) => {
  myEmitter.emit('route', request.url);
  response.sendFile(path.join(__dirname, 'public', 'pages', 'index.html'));
  logger.info({ level: 'info', message: `Page Requested: ${request.method} ${request.url}` });
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

// Route handler for fetching customers
router.get('/'), async (request, response) => {
  try {
    const products = await getProducts();
    response.render('index', { products });
  } catch (error) {
    logger.error({ level: 'error', message: `Error fetching products: ${error.message}` });
    response.status(500).send("Internal Server Error");
  }


  const dalFilePath = path.join(__dirname, 'public', 'DAL', 'customer.dal.js');
  fs.readFile(dalFilePath, 'utf-8', (error, data) => {
    if (error) {
      logger.error({ level: 'error', message: `Error reading file: ${error.message}` });
      response.status(500).send("Internal Server Error");
    } else {
      response.type('text/plain');
      response.send(data);
    }
  });
};

// Route handler for fetching vendors
router.get('show-dal'), (request, response) => {
  const dalFilePath = path.join(__dirname, 'public', 'DAL', 'vendor.dal.js');
  fs.readFile(dalFilePath, 'utf-8', (error, data) => {
    if (error) {
      logger.error({ level: 'error', message: `Error reading file: ${error.message}` });
      response.status(500).send("Internal Server Error");
    } else {
      response.type('text/plain');
      response.send(data);
    }
  });
};

// Route handler for fetching products
router.get('show-dal'), (request, response) => {
  const dalFilePath = path.join(__dirname, 'public', 'DAL', 'product.dal.js');
  fs.readFile(dalFilePath, 'utf-8', (error, data) => {
    if (error) {
      logger.error({ level: 'error', message: `Error reading file: ${error.message}` });
      response.status(500).send("Internal Server Error");
    } else {
      response.type('text/plain');
      response.send(data);
    }
  });
};

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

module.exports = {
  router,
  createFolder
  }
