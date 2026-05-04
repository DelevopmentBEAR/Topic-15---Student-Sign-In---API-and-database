//Calls express module and creates an express application
const express = require('express');
const app = express(); // Creates an express/web app server application

const path = require('path'); // Import the path module for handling file paths

const staticFilesPath = path.join(__dirname, 'client', 'dist'); // Define the path to the public directory for static files

const staticFiles = express.static(staticFilesPath); // Create middleware to serve static files from the defined path
app.use('/',staticFiles); // Use the static file middleware to serve static files from the specified directory
// request to home page, serve static file - the vue app index.app from the dist folder

// Import the API routes from routes/api.js
const apiRoutes = require('./routes/api.js');
// Use the API routes for any requests to paths that start with /api
app.use(express.json()); // Middleware to parse JSON request bodies
app.use('/api', apiRoutes); // Use the API routes for paths that start with /api

// Middleware to handle 404 Not Found errors for any requests that don't match the defined routes
app.use(function(req, res, next) {
  // TODO - can't find the requested resource, so send a 404 Not Found response
  res.status(404).json('Sorry,not Found'); // Send a 404 Not Found response with a JSON message
});

// Error handling middleware to catch any errors that occur in the API routes
app.use(function(err, req, res, next) {
  console.error(err.stack); // Log the error for debugging 
  res.status(500).json('Internal Server Error'); // Send a 500 Internal Server Error response with a JSON message
});

//Server starts, listens on port 3000, and logs a message to the console when it starts
const server = app.listen(process.env.PORT || 3000, function() {
  console.log('Express server is running on port', server.address().port);
});
