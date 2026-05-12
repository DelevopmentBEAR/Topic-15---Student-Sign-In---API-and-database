// This file is responsible for setting up the connection to the database and defining the models for the application
const {Sequelize, DataTypes} = require('sequelize');
// Import the database configuration from config.json
const configJson = require('../config.json');
// Import the function to create the Students model
const createStudentsModel = require('./student.js');

// look for an environment variable will be called NODE_ENV and read it's value
// environment variables are set for your whole computer (or for a server)
// any application running on this computer (or server) can read these environment variables
// At azure, we'll create an environment variable for your server called NODE_ENV and set it to "production"
// if there is not NODE_ENV environment variable, then default to "development"
const env = process.env.NODE_ENV || 'development';

const dvPassword = process.env.DV_PASSWORD; // read the value of the DV_PASSWORD environment variable (which should be set to your database password)

// Get the database configuration for the current environment (development, production, etc.)
const config = configJson[env]; // read the configuration object for 'development' or 'production' from config.json
config.password = dvPassword; // set the password in the configuration object to the value of the DV_PASSWORD environment variable

// Create a new Sequelize instance using the database configuration
const sequelize = new Sequelize(config);

// Create the database connection with the Sequelize instance
const database = {
    sequelize: sequelize,
    Sequelize: Sequelize,
};

// Create the Students model and add it to the database object
const studentModel = createStudentsModel(sequelize, DataTypes);
const studentModelName = studentModel.name; // Get the name of the model (e.g., "Students")
database[studentModelName] = studentModel; // Add the model to the database object using its name as the key

module.exports = database; // Export the database object so it can be used in other parts of the application
