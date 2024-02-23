const { v4: uuidv4 } = require('uuid');

uuidv4(); // ⇨ '1b9d6bcd-bbfd-4b2d-9b5d-ab8dfbbd4bed'




// var router = require('express').Router();
// const { requiresAuth } = require('express-openid-connect');

// router.get('/', function (req, res, next) {
//   res.render('index', {
//     title: 'Auth0 Webapp sample Nodejs',
//     isAuthenticated: req.oidc.isAuthenticated()
//   });
// });

// router.get('/profile', requiresAuth(), function (req, res, next) {
//   res.render('profile', {
//     userProfile: JSON.stringify(req.oidc.user, null, 2),
//     title: 'Profile page'
//   });
// });

// module.exports = router;
