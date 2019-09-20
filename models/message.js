const Joi = require("joi");
const mongoose = require("mongoose");

const messageSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },  
    content: {
        type: String,
        required: true,
        trim: true,
        minlength: 3,
        maxlength: 1024
    },
    read: {
        type: Boolean,
        default: false
    },
    sendDate: {
        type: Date,
        default: Date.now
    }
});

const Message = mongoose.model("Messages", messageSchema);

function validateMessage(message) {
  const schema = {
    userId: Joi.objectId().required(),
    content: Joi.string()
      .min(3)
      .max(1024)
      .required()
  };

  return Joi.validate(message, schema);
}

exports.messageSchema = messageSchema;
exports.Message = Message;
exports.validateMessage = validateMessage;
