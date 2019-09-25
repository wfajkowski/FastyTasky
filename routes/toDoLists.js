const auth = require("../middleware/auth");
const { ToDoList, validate } = require("../models/toDoList");
const { toDoTask } = require("../models/toDoTask");
const { User } = require("../models/user");
const express = require("express");
const router = express.Router();

router.get(
  "/",
  auth, async (req, res) => {
    const toDoLists = await ToDoList.find({
      userId: { $eq: req.user._id }
    }).sort("index");
    res.send(toDoLists);
  }
);

router.post("/", auth, async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const user = await User.findById(req.body.userId);
  // console.log('-------');

  // console.log('-------');
  const listOfTasks = new ToDoList({
    title: req.body.title,
    userId: req.user._id,
    tasks: req.body.tasks.map(task => {
      return [
        {
          name: task,
          done: task.done
        }
      ];
    }),
    index: 1000
  });

  await listOfTasks.save();
  res.send(listOfTasks);
});

router.put("/:id", async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const searchedList = await ToDoList.findByIdAndUpdate(
    req.params.id,
    {
      title: req.body.title,
      // userId: user._id,
      tasks: req.body.tasks.map(task => {
        return {
          name: task.name,
          done: task.done
        };
      })
    },
    { new: true }
  );
  if (!searchedList)
    return res
      .status(404)
      .send("ToDo list you are looking for does not exist.");
  res.send(searchedList);
});

router.delete("/:id", async (req, res) => {
  const searchedList = await ToDoList.findByIdAndRemove(req.params.id);

  if (!searchedList)
    return res.status(404).send("There is no ToDo list with this id in DB.");

  res.send(searchedList);
});

router.get("/:id", auth, async (req, res) => {
  const searchedList = await ToDoList.findById(req.params.id);

  if (!searchedList)
    return res.status(404).send("There is no ToDo list with this id in DB.");

  res.send(searchedList);
});

module.exports = router;
