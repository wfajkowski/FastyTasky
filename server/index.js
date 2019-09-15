require("dotenv").config();
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const users = require("../routes/users");
const homePage = require("../routes/home");
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

app.use(express.json());
app.use("/", homePage);
app.use("/api/users", users);
app.use("/api/auth", auth);

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));
