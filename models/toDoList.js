const Joi = require('joi');
const mongoose = require('mongoose');
const {toDoTaskSchema} = require('./toDoTask');

const ToDoList = mongoose.model('ToDoLists', new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true,
        minlength: 3,
        maxlength: 50
    },
    tasks: [toDoTaskSchema],
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    }
}));

function validateToDoList(toDoList){
    const schema = {
        title: Joi.string().min(3).max(50).required(),
        userId: Joi.objectId().required(),
        tasks: Joi.array().items(Joi.string().min(3).max(50)).required()
    };

    return Joi.validate(toDoList, schema);
}

exports.ToDoList = ToDoList;
exports.validate = validateToDoList;