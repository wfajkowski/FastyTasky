const Joi = require("joi");
const mongoose = require("mongoose");

const MessageBox = mongoose.model(
    "MessageBoxes",
    new mongoose.Schema({   
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
        unique: true
    },
    name: {
        type: mongoose.Schema.Types.String,
        ref: "User",
        required: true,
    },
    conversations: {
        type: Array
    }
    })
);

function validateMessageBox(messageBox) {
    const schema = {
      userId: Joi.objectId().required(),
      conversations: Joi.array()
    };

  
    return Joi.validate(messageBox, schema);
}
  
exports.MessageBox = MessageBox;
exports.validateMessageBox = validateMessageBox;