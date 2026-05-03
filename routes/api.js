//Calls express module and creates an express application
const express = require('express');
 // Import the database object from models/index.js
const database = require('../models/'); // will automatically look for index.js in the models folder
const Student = database.Students; // Get the Students model from the database object

const router = express.Router(); // Create a new router object to define API routes

// Define a GET route for the root path of the API
router.get('/students', (req, res, next) => {
    // query the database, get all the rows from DB,
    // convert them to JSON,
    // available in the then function
    Student.findAll( {order: [['name', 'ASC']]} ).then(students => {
        return res.json(students); // Send the list of students as a JSON response
    })
});

// Define a POST route for creating a new student
router.post('/students', function(req, res, next) {
    const newStudent = req.body; // Get the student data from the request body
    console.log('Received new student:', newStudent); // Log the received student data for debugging
    Student.create(newStudent).then(result => {
        // Send the created student as a JSON response with a 201 status code
        return res.status(201).send('New student created!'); 
    }).catch(error => {
        // If there is a validation error from Sequelize, send a 400 Bad Request response with the error message
        if (error instanceof database.Sequelize.ValidationError) {
            const messages = error.errors.map(e => e.message); // Extract validation error messages
            // 400 = Bad Request - something was wrong with the data sent by the client
            return res.status(400).json(messages); // Send the error messages as a JSON response
        } else {
            // For any other errors, pass the error to the next middleware (which could be an error handler)
            return next(error); // Next is used to pass control to the next middleware function, 
            // which could be an error handler that sends a 500 Internal Server Error response for unexpected errors
        }
    });
});

router.patch('/students/:id', function(req, res, next) {
    // matches requests to /students/ followed by an id parameter (e.g., /students/123)
    const studentId = req.params.id; // Get the student ID from the URL parameters
    const updatedStudent = req.body; // Get the updated student data from the request body

    console.log(updatedStudent); // Log the received updated student data for debugging

    // Update the student in the database with the given ID using the data from the request body
    Student.update(updatedStudent, { where: { id: studentId } }).then(result => {

        // student id that doesn't exist
        const rowsModified = result[0]; // result is an array where the first element is the number of rows modified
        // if 1 row was changed, we found student and they were updated. If 0 rows were changed, we didn't find a student with that ID
        if (rowsModified === 1) {
            // One row was modified, which means the student with the given ID was found and updated
            return res.status(200).json('Student updated successfully'); // Send a 200 OK response with a message
        } else {
            // No rows were modified, which means the student with the given ID was not found
            return res.status(404).json('Student not found'); // Send a 404 Not Found response with a message
        }

        res.send('ok!'); // Send a simple response indicating the update was successful, status code defaults to 200 OK
    }).catch(err => {
        // invalid data in the updatedStudent - eg. no name
        if (err instanceof database.Sequelize.ValidationError) {
            const messages = err.errors.map(e => e.message); // Extract validation error messages
            // 400 = Bad Request - something was wrong with the data sent by the client
            return res.status(400).json(messages); // Send the error messages as a JSON response
        } else {
            // For any other errors, pass the error to the next middleware (which could be an error handler)
            return next(err); // Next is used to pass control to the next middleware function, 
            // which could be an error handler that sends a 500 Internal Server Error response for unexpected errors
            next(err); // Next is used to pass control to the next middleware function,
        }
    });

    // what kinds of errors could we see?
    
    
    // database problems - app can't connect to the database, or the database is down/error
    
});

router.delete('/students/:id', function(req, res, next) {
    // delete request to /students/4 will delete student with id of 4
    const studentID = req.params.id; // Get the student ID from the URL parameters
    // Delete the student with the given ID from the database
    Student.destroy({ where: { id: studentID } }).then(rowsDeleted => {
        if (rowsDeleted === 1) {
            // One row was deleted, which means the student with the given ID was found and deleted
            return res.status(200).json('Student deleted successfully'); // Send a 200 OK response with a message
        } else {
            // No rows were deleted, which means the student with the given ID was not found
            return res.status(404).json('Student not found'); // Send a 404 Not Found response with a message
        }
    }).catch(err => {
        // For any errors, pass the error to the next middleware (which could be an error handler)
        return next(err);
    });
});

// REQUIRED! Also, don't forget the 's'!
module.exports = router; // Export the router object so it can be used in other parts of the application