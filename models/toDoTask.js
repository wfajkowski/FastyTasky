const Joi = require('@hapi/joi');
const mongoose = require('mongoose');

const toDoTaskSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
        minlength: 3,
        maxlength: 50
    },
    done: {
        type: Boolean,
        default: false
    }
});

const ToDoTask = mongoose.model('ToDoTasks', toDoTaskSchema);

function validateToDoTask(toDoTask) {
    const schema = Joi.object({
        title: Joi.string().min(3).max(50).required()
    });

    return schema.validate(toDoTask);
}

exports.toDoTaskSchema = toDoTaskSchema;
exports.ToDoTask = ToDoTask;
exports.validate = validateToDoTask;