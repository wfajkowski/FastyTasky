const Joi = require("joi");
const mongoose = require("mongoose");

const ShareList = mongoose.model(
    "ShareLists",
    new mongoose.Schema({
      title: {
        type: mongoose.Schema.Types.String,
        ref: "ToDoList",
        required: true
      },
      name: {
        type: mongoose.Schema.Types.String,
        ref: "User",
        required: true
      },
      userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
      },
      tasks: {
        type: mongoose.Schema.Types,
        ref: "ToDoList",
        required: true
      },
    })
  );

  function validateShareList(shareList) {
    const schema = {
      title: Joi.string(),
      userId: Joi.objectId(),
      name: Joi.string().required(),
      tasks: Joi.array(),
      listId: Joi.objectId().required(),
    };
  
    return Joi.validate(shareList, schema);
  }

exports.ShareList = ShareList;
exports.validateShareList = validateShareList;