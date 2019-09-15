// const auth = require("../middleware/auth");
const {ToDoList, validate} = require('../models/toDoList');
const {toDoTask} = require('../models/toDoTask');
const {User} = require('../models/user');
const express = require('express');
const router = express.Router();


router.get('/', async (req, res) => {
    const toDoLists = await ToDoList.find();
    res.send(toDoLists);
    // res.send('Hejo!');
});

router.post('/', async (req, res) => {
    const {error} = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    const listOfTasks = new ToDoList({
        title: req.body.title
    });

    await listOfTasks.save();
    res.send(listOfTasks);
});

module.exports = router;