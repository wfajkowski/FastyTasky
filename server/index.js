require('dotenv').config();
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const getUser = require('../routes/getUser');
const homePage = require('../routes/home');
const logger = require('../middleware/logger');
const mongoDbPass = process.env.DB_PASS;

mongoose.connect(`mongodb+srv://superadmin:${mongoDbPass}@fastytaskydb-ydnvh.mongodb.net/test?retryWrites=true&w=majority`)
    .then(() => {
        console.log("Connected to MongoDB...");
        console.log("To exit press Ctrl+C");
    })
    .catch(err => console.error('Not connected!', err));

app.use(express.json());
app.use(logger);
app.use("/", homePage);
app.use("/api/get_user", getUser);

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));