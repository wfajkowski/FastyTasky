const Joi = require("joi");
const mongoose = require("mongoose");
const { messageSchema } = require("./message");

const conversationSchema = new mongoose.Schema({   
    targetUserId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
        unique: true
    },
    targetName: {
        type: mongoose.Schema.Types.String,
        ref: "User",
        required: true,
        unique: true
    },
    messages: [messageSchema],
});

const Conversation = mongoose.model("Conversations", conversationSchema);
  
function validateConversation(conversation) {
    const schema = {
      targetUserId: Joi.objectId().required(),
      messages: Joi.array()
        .items(
          Joi.object()
        )
        .required()
    };
  
    return Joi.validate(conversation, schema);
}
  
exports.Conversation = Conversation;
exports.conversationSchema = conversationSchema;
exports.validateConversation = validateConversation;