# S3-MidtermSprint-FS
Setup GitHub Organization and Repository:
Create a GitHub organization:
Go to GitHub and create a new organization for your team.
Invite all team members to join the organization.
Create a repository:
Within the organization, create a new repository for your project.
Set up the repository with a README file.
Create GitHub Projects Board:
Set up GitHub Projects:
Inside your repository, navigate to the "Projects" tab.
Create a new project board.
Configure columns such as To Do, In Progress, and Done.
Organize User Stories:
Create cards for each user story based on the provided list.
Assign these cards to the appropriate columns on the board.
Directory Structure and Configuration Setup (System Administrator Tasks):
Initialize Application:
Implement a CLI command to initialize the application.
This command should create the necessary directory structure.
Add Default Configuration:
Develop functionality to add default configuration and help files.
These files should be created in the appropriate directories.
View and Update Configuration:
Create CLI commands to view and update the configuration file.
Ensure users can easily modify configuration settings as needed.
Reset Configuration:
Implement a CLI command to reset the configuration file back to its original state.
This command should revert any changes made by the user.
Token Generation and User Records Management (Helpdesk Employee Tasks):
Generate User Token:
Develop a CLI command to generate a user token based on the username.
Ensure the generated token follows the required format.
Manage User Records:
Implement functionality to add/update user records' email and phone numbers.
Create CLI commands to search for user records by different criteria.
Web Form for New End Users:
Create Web Form:
Develop a simple HTML form for new end users.
Include input fields for username and a submit button.
Generate Token:
Implement functionality to generate a token for the submitted username.
Display the generated token to the user on the web page.
Logging and Event Tracking:
Implement Logging:
Develop functionality to log all application actions to an events log file.
Ensure that logs include timestamps and relevant details about each action.
Integration and Testing:
Integrate Token Generation Module:
Ensure the token generation module is accessible from both the CLI and the web form.
Test Functionality:
Test each CLI command and web form feature thoroughly.
Verify that all functionalities work as expected.
Bug Fixing:
Address any bugs or issues found during testing promptly.
Test again after fixing to ensure stability.
Documentation:
Document Project:
Write comprehensive documentation covering all aspects of the project.
Include explanations of the directory structure, CLI commands, web form functionality, and logging.
Setup Guide:
Provide clear instructions on how to set up and run the project locally.
Include any dependencies or system requirements.
Recording Demo Video:
Schedule Team Call:
Arrange a Teams call with all team members.
Decide on the agenda and structure of the demo.
Recording:
Record a demo video demonstrating the working solution.
Ensure all team members participate and explain their contributions.
Editing (if necessary):
Edit the video to ensure it is concise and focused.
Add any necessary annotations or explanations.
Submission:
Final Checks:
Ensure that the GitHub repository contains all required deliverables.
Submission:
Submit the recorded demo video along with the project documentation for evaluation.
Double-check that all necessary components are included and properly organized.
Breaking it down like this should help you tackle each aspect of the project systematically. If you have any specific questions about any of these tasks, feel free to ask!

//Updated ReadMe

User Management CLI & Web Server

Description

This project is a Full Stack JavaScript application consisting of a Command Line Interface (CLI) and a web server. The CLI is used for system administration tasks such as initializing the application, managing configuration settings, generating user tokens, updating user records, and searching for user records. The web server hosts a simple web form that allows new users to generate a token for account confirmation.

Getting Started

Prerequisites
Ensure you have Node.js and npm installed on your system.

Installation
Clone the repository:

git clone [<repository-url>](https://github.com/malerie-earle/FS-Sprint.git)

Install dependencies:
npm install

Usage
CLI

To use the CLI, navigate to the project directory and run the following commands:


# Initialize the application
app init

# Create all the application folders
app init --mk

# Create all the application files
app init --cat

# Create all the folders and files
app init --all

# Create or change the app configuration
app config

# Show the contents of the config file
app config --show

# Reset back to default the config file
app config --reset

# Set a specific config setting
app config --set <key> <value>

# Generate a token for a given username
app token <username>

# Set or update the email for the user record with the given username
app updateUser --username <username> --email <new_email>

# Set or update the phone number for the user record with the given username
app updateUser --username <username> --phone <new_phone>

# Search for a user record queried by username, email, or phone number
app searchUser --queryType <type> --queryValue <value>
Web Server

To start the web server, run:


npm start
Then, visit http://localhost:8081 in your web browser to access the website.

Contributors

Malerie Earle
Janeil Carroll
Kateryna Danevych

License

Creative Commons.
