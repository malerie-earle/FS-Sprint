// Imports
const fs = require('fs');
const request = require('request'); // Include request module for API request
const { myEmitter, logger } = require('./logEvents.js');


// Home page route
function indexPage(path, response) {
  myEmitter.emit('route', path);
}

// About page route
function aboutPage(path, response) {
  myEmitter.emit('route', path);
  fetchFile(path, response)
}

// Contact page route
function contactPage(path, response) {
  myEmitter.emit('route', path);
  fetchFile(path, response)
}

// Products page route
function productsPage(path, response) {
  myEmitter.emit('route', path);
  fetchFile(path, response)
}

// Subscribe page route
function subscribePage(path, response) {
  myEmitter.emit('route', path);
  fetchFile(path, response)
}

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
  aboutPage,
  contactPage,
  productsPage,
  subscribePage,
  indexPage,
  createFolder
}
