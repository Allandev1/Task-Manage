// mongoose.database.js

const mongoose = require('mongoose');

async function connectToDatabase() {
    try {
        await mongoose.connect(`mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@taskmanage.2okltyu.mongodb.net/?retryWrites=true&w=majority&appName=taskmanage`,);
        console.log('Successfully connected to the database');
    } catch (error) {
        console.error('Error connecting to the database', error);
        process.exit(1); // Encerra o processo com erro
    }
}

module.exports = connectToDatabase;

            // `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@taskmanage.2okltyu.mongodb.net/?retryWrites=true&w=majority&appName=taskmanage`,
   
