
// User Story: Helpdesk Employee - Add/Update User Records

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
        // Parse JSON data into object
        let users = JSON.parse(data);

        // Add new user record
        users.push({ username, email, phone });

        // Write updated user data back to JSON file
        fs.writeFile('user.json', JSON.stringify(users), (err) => {
            if (err) {
                console.error('Error writing user data:', err);
            } else {
                console.log('User record added successfully!');
                
            }
        });
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
        // Parse JSON data into object
        let users = JSON.parse(data); 

        // Find the user record to update
        let userToUpdate = users.find(user => user.username === username);
        if (userToUpdate) {
            //Update user record with new email and/or phone
            if (email) userToUpdate.email = email;
            if (phone) userToUpdate.phone = phone;

            // Write updated user data back to JSON file
            fs.writeFile('user.json', JSON.stringify(users), (err) => {
                if (err) {
                    console.error('Error writing user data:', err);
                } else {
                    console.log('User record updated successfully!');
                }
                
            });
        } else {
            console.error('User not found:', username);
        }
    });
}