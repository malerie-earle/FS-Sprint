// Import fs module
const fs = require('fs');

// Import user management functions
const { addUserRecord, updateUserRecords, addNewUserAttribute, addNewConfigAttribute } = require('./userManagement');

// Test adding a new user record
try {
    addUserRecord('janeil_carroll', 'janeilchantelle@gmail.com', '709-219-2491');
    console.log('Test: addUserRecord - Success');
} catch (error) {
    console.error('Test: addUserRecord - Failed', error);
}

// Test updating an existing user record
try {
    updateUserRecords('janeil_chantelle', 'jchantelle0920@gmail.com', '709-910-7752');
    console.log('Test: updateUserRecords - Success');
} catch (error) {
    console.error('Test: updateUserRecords - Failed', error);
}

// Test adding new attribute to user.json
try {
    addNewUserAttribute('newAttribute', 'newAttributeValue');
    console.log('Test: addNewUserAttribute - Success');
} catch (error) {
    console.error('Test: addNewUserAttribute - Failed', error);
}

// Test adding new attribute to config.json
try {
    addNewConfigAttribute('newConfigAtt', 'newConfigValue');
    console.log('Test: addNewConfigAttribute - Success');
} catch (error) {
    console.error('Test: addNewConfigAttribute - Failed', error);
}
