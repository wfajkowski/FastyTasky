const Joi = require('@hapi/joi');
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
    toDos: [toDoTaskSchema]
}));

function validateToDoList(toDoList){
    const schema = Joi.object({
        title: Joi.string().min(3).max(50).required()
    });

    return schema.validate(toDoList);
}

exports.ToDoList = ToDoList;
exports.validate = validateToDoList;