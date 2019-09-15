const Joi = require("joi");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");

//MODEL
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    minlength: 3,
    maxlength: 30,
    unique: true
  },
  email: {
    type: String,
    minlength: 5,
    maxlength: 250,
    unique: true
  },
  password: {
    type: String,
    minlength: 5,
    maxlength: 250,
    unique: true
  },
  registrationDate: {
    type: Date,
    default: Date.now
  }
});

userSchema.methods.generateAuthToken = function() {
  const token = jwt.sign({ _id: this._id }, process.env.JWT_PRIVATEKEY);
  return token;
};

const User = mongoose.model("User", userSchema);

//HELPERS
function validateUser(user) {
  const schema = {
    name: Joi.string()
      .alphanum()
      .min(3)
      .max(30)
      .required(),
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

  return Joi.validate(user, schema);
}

exports.User = User;
exports.validate = validateUser;
