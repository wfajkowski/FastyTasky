require('dotenv').config();
const Joi = require('joi');
Joi.objectId = require('joi-objectid')(Joi);
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const users = require('../routes/users');
const homePage = require('../routes/home');
const toDoList = require('../routes/toDoLists');
const logger = require('../middleware/logger');
const mongoDbPass = process.env.DB_PASS;

mongoose.connect(`mongodb+srv://superadmin:${mongoDbPass}@fastytaskydb-ydnvh.mongodb.net/fastytasky?retryWrites=true&w=majority`)
    .then(() => {
        console.log("Connected to MongoDB...");
        console.log("To exit press Ctrl+C");
    })
    .catch(err => console.error('Not connected!', err));

app.use(express.json());
app.use(logger);
app.use("/", homePage);
app.use("/api/users", users);
app.use("/api/my_lists", toDoList);

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));