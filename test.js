// Import fs module
const fs = require('fs');

// Import user management functions
const { addUserRecord, updateUserRecords} = require('./userManagement');

// Test adding a new user record
addUserRecord('janeil_carroll', 'janeilchantelle@gmail.com', '709-219-2491');

// Test updating an existing user record
updateUserRecords('janeil_chantelle', 'jchantelle0920@gmail.com', '709-910-7752');

// Testing updating a configuration setting
updateConfig('database', 'production');

// Test adding new attribute to user.json
addNewUserAtt('newAttribute', 'newAttributeValue');

// Test adding new attribbute to conifg.json
addNewConfigAtt('newConfigAtt', 'newConfigValue');