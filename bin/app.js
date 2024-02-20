#!/usr/bin/env node
// import express module
const express = require('express');

// import express-openid-connect module
const { auth } = require('express-openid-connect');

// import path module
const path = require('path');

// import dotenv module
require('dotenv').config();

// create a new express application
const app = express();

// configure the express-openid-connect middleware
const config = {
  authRequired: false,
  auth0Logout: true,
  secret: process.env.SECRET,
  baseURL: process.env.BASE_URL,
  clientID: process.env.CLIENT_ID,
  issuerBaseURL: process.env.ISSUER_BASE_URL
};

// Set EJS as the view engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Middleware for authentication
app.use(auth(config));

// Route for the home page
app.get('/', (req, res) => {
  res.render('index', { isAuthenticated: req.oidc.isAuthenticated() });
});