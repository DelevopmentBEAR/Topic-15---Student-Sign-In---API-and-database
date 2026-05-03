const { all } = require("../routes/api");

// Defines the Student model for the database using Sequelize
module.exports = (sequelize, DataTypes) => {
    // Defines the Students model with its attributes and data types
    const Students = sequelize.define('Students', {
        // Defines the columns in the database - give them a name and a data type
        name: {
            type: DataTypes.STRING,
            allowNull: false, // name is required, cannot be null
            validate: {
                notEmpty: true, // name cannot be an empty string
            }
        },
        StarID: {
            type: DataTypes.STRING,
            allowNull: false, // StarID is required, cannot be null
            validate: {
                notEmpty: true, // StarID cannot be an empty string
            },
            unique: true, // StarID must be unique, no two students can have the same StarID
        },
        isPresent: {
            type: DataTypes.BOOLEAN,
            allowNull: false, // isPresent is required, cannot be null
            validate: {
                notEmpty: true, // isPresent cannot be an empty string
            },
            field: 'present', // defaults to present in the database
        },
    });

    // create or update table in the database
    // Syncs the model with the database, creating the table if it doesn't exist
    Students.sync( {force: false}).then(() => {
        console.log('Synced students table');
    });

    return Students; // Return the defined Students model so it can be used in other parts of the application
}