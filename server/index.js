require("dotenv").config();
const Joi = require("joi");
Joi.objectId = require("joi-objectid")(Joi);
const express = require("express");
const app = express();
const cors = require('cors');
const mongoose = require("mongoose");
const users = require("../routes/users");
const homePage = require("../routes/home");
const toDoList = require("../routes/toDoLists");
const sharedLists = require("../routes/sharedLists");
const messageBox = require("../routes/messageBox");
const generateMessageBox = require("../routes/generateMessageBox");
const logger = require("../middleware/logger");
const auth = require("../routes/auth");
const mongoDbPass = process.env.DB_PASS;

mongoose
  .connect(
    `mongodb+srv://superadmin:${mongoDbPass}@fastytaskydb-ydnvh.mongodb.net/fastytasky?retryWrites=true&w=majority`
  )
  .then(() => {
    console.log(" Connected to MongoDB...");
    console.log("To exit press Ctrl+C");
  })
  .catch(err => console.error("Not connected!", err));

app.use(cors());
app.use(express.json());
app.use("/", homePage);
app.use("/api/auth", auth);
app.use("/api/users", users);
app.use("/api/my_lists", toDoList);
app.use("/api/shared_lists", sharedLists);
//app.use("/api/message_boxes", messageBox);
app.use("/api/message_boxes", generateMessageBox);

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));
