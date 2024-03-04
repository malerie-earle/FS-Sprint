# S3-MidtermSprint-FS
User Management CLI & Web Server

Description
This project is a Full Stack JavaScript application consisting of a Command Line Interface (CLI) and a web server. The CLI is used for system administration tasks such as initializing the application, managing configuration settings, generating user tokens, updating user records, and searching for user records. The web server hosts a simple web form that allows new users to generate a token for account confirmation.

Business Scenario
Newfie Nook, an ecommerce platform, prides itself on championing the rich culture and craftsmanship of Newfoundland and Labrador. By offering a carefully curated selection of products, ranging from iconic local treats to unique artisanal creations, Newfie Nook celebrates the essence of the region. Vendors, representing Newfoundlanders and Labradorians, have control over the products they list and receive timely notifications for sales. The platform fosters a seamless shopping experience for customers, who are required to create accounts to make purchases. Each product is tied to a specific vendor, ensuring a direct connection between creators and consumers. Customers can effortlessly add products to their carts and proceed to checkout, while vendors have the capability to manage their listings, update inventory, and monitor sales performance through dedicated accounts. With a commitment to secure payment processing and prompt order fulfillment, Newfie Nook promotes local craftsmanship, supports NL artisans, and provides exceptional customer support services to enrich the overall shopping journey for users.

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
