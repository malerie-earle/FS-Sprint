// Import fs module
const fs = require('fs');

// Functions for Adding/Updating User Records

function addUserRecord(username, email, phone) {
    // Read existing user data from JSON file
    fs.readFile('user.json', 'utf8', (err, data) => {
        if (err) {
            console.error('Error reading user data:', err);
            return;
        }
        try {
            // Parse JSON data into object
            let users = JSON.parse(data);

            // Add new user record
            users.push({ username, email, phone });

            // Write updated user data back to JSON file with indentation
            fs.writeFile('user.json', JSON.stringify(users, null, 2), (err) => {
                if (err) {
                    console.error('Error writing user data:', err);
                } else {
                    console.log('User record added successfully!');
                }
            });
        } catch (error) {
            console.error('Error parsing user data:', error);
        }
    });
}

// Function to update an existing user record
function updateUserRecords(username, email, phone) {
    // Read existing user data from JSON file
    fs.readFile('user.json', 'utf8', (err, data) => {
        if (err) {
            console.error('Error reading user data:', err);
            return;
        }
        try {
            // Parse JSON data into object
            let users = JSON.parse(data);

            // Find the user record to update
            let userToUpdate = users.find(user => user.username === username);
            if (userToUpdate) {
                // Update user record with new email and/or phone
                if (email) userToUpdate.email = email;
                if (phone) userToUpdate.phone = phone;

                // Write updated user data back to JSON file 
                fs.writeFile('user.json', JSON.stringify(users, null, 2), (err) => {
                    if (err) {
                        console.error('Error writing user data:', err);
                    } else {
                        console.log('User record updated successfully!');
                    }
                });
            } else {
                console.error('User not found:', username);
            }
        } catch (error) {
            console.error('Error parsing user data:', error);
        }
    });
}

// Function to add new attribute to user.json
function addNewUserAttribute(attributeName, attributeValue) {
    fs.readFile('user.json', 'utf8', (err, data) => {
        if (err) {
            console.error('Error reading user data:', err);
            return;
        }
        try {
            let userData = JSON.parse(data);
            // Add new attribute to each user object
            userData.forEach(user => {
                user[attributeName] = attributeValue;
            });
            // Write updated user data back to JSON file 
            fs.writeFile('user.json', JSON.stringify(userData, null, 2), (err) => {
                if (err) {
                    console.error('Error writing user data:', err);
                } else {
                    console.log(`Attribute '${attributeName}' added successfully to user.json!`);
                }
            });
        } catch (error) {
            console.error('Error parsing user data:', error);
        }
    });
}

// Function to add new attribute to config.json
function addNewConfigAttribute(attributeName, attributeValue) {
    fs.readFile('config.json', 'utf8', (err, data) => {
        if (err) {
            console.error('Error reading config data:', err);
            return;
        }
        try {
            let configData = JSON.parse(data);
            // Add new attribute to config object
            configData[attributeName] = attributeValue;
            // Write updated config data back to JSON file with indentation
            fs.writeFile('config.json', JSON.stringify(configData, null, 2), (err) => {
                if (err) {
                    console.error('Error writing config data:', err);
                } else {
                    console.log(`Attribute '${attributeName}' added successfully to config.json!`);
                }
            });
        } catch (error) {
            console.error('Error parsing config data:', error);
        }
    });
}


