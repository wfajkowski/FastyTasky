const Joi = require('joi');
const mongoose = require('mongoose');

//MODEL
const User = mongoose.model('User', new mongoose.Schema({
    name: String,
    email: String,
    registrationDate: {
        type: Date,
        default: Date.now
    }
}));


//HELPERS
function validateUser(user) {
    const schema = {
        name: Joi.string()
            .alphanum()
            .min(3)
            .max(30)
            .required(),
        email: Joi.string()
            .regex(/^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/)
            .required()
    };

    return Joi.validate(user, schema);
}

exports.User = User;
exports.validate = validateUser;