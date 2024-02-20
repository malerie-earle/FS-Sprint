const folders = ['models', 'views', 'routes', 'logs', 'json'];

const configjson = { // default configuration settings
    name: 'Application CLI',
    version: '1.0.0',
    description: 'The Command Line Interface (CLI) for the Application in Sprint 1.',
    main: 'app.js',
    superuser: 'admin',
    database: 'sample'

   
};

const tokenjson = [{
    created: '2024-02-18 10:00:00',
    username: 'username',
    email: 'keyin@keyin.com',
    phone: '1234567890',
    token: 'token',
    expires: '2024-12-31 10:00:00',
    confirmed: 'tbd'

  }];

  module.exports = {
    folders,
    configjson,
    tokenjson
  }
  