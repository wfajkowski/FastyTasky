const { User } = require("../models/user");
const express = require("express");
const router = express.Router();
const _ = require("lodash");
const bcrypt = require("bcrypt");
const Joi = require("joi");

//ROUTERS
router.post("/", async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  let user = await User.findOne({ email: req.body.email });
  if (!user) return res.status(400).send("Invalid email or password");

  const validPassword = await bcrypt.compare(req.body.password, user.password);
  if (!validPassword) return res.status(400).send("Invalid email or password");

  if (!process.env.JWT_PRIVATEKEY) {
    console.error("JWT Private Key is not defined");
    process.exit(1);
  }

  const token = user.generateAuthToken();
  res.send(token);
});

function validate(req) {
  const schema = {
    email: Joi.string()
      .min(5)
      .max(250)
      .email()
      .required(),
    password: Joi.string()
      .min(5)
      .max(250)
      .required()
  };

  return Joi.validate(req, schema);
}

module.exports = router;
