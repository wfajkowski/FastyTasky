const Joi = require("joi");
const mongoose = require("mongoose");
const { conversationSchema } = require("./conversation")

const ConversationBox = mongoose.model(
    "ConversationBoxes",
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
    conversations: [conversationSchema],
    })
);

function validateConversationBox(conversationBox) {
    const schema = {
      userId: Joi.objectId().required(),
      conversations: Joi.array()
        .items(
          Joi.object()
            .required()
        )
        .length(1)
        .required()
    };

  
    return Joi.validate(conversationBox, schema);
}
  
exports.ConversationBox = ConversationBox;
exports.validateConversationBox = validateConversationBox;