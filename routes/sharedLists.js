const auth = require("../middleware/auth");
const { ToDoList, validate } = require("../models/toDoList");
const { ShareList, validateShareList } = require("../models/shareList");
const { toDoTask } = require("../models/toDoTask");
const { User } = require("../models/user");
const express = require("express");
const router = express.Router();

router.get("/", auth, async (req, res) => {
    const sharedLists = await ShareList.find({
      userId: { $eq: req.user._id }
    }).sort("index");
    res.send(sharedLists);
  });
  
  router.get("/:id", async (req, res) => {
    const searchedSharedList = await ShareList.findById(req.params.id);
  
    if (!searchedSharedList)
      return res.status(404).send("There is no shared ToDo list with this id in DB.");
  
    res.send(searchedSharedList);
  });
  
  router.post("/", async (req, res) => {
    const { error } = validateShareList(req.body);
    if (error) return res.status(400).send(error.details[0].message);
  
    const user = await User.find({"name" : req.body.name});
    const sentList = await ToDoList.findById(req.body.listId);
    const sharedList = new ShareList({
      title: sentList.title,
      userId: user[0]._id,
      name: user[0].name,
      tasks: sentList.tasks,
      listId: sentList._id,
    });
  
    await sharedList.save();
    res.send(sharedList);
  });

  router.put("/:id", async (req, res) => {
    
    const searchList = await ShareList.findById(req.params.id)
    const searchedList = await ShareList.findByIdAndUpdate(
      req.params.id,
      {
        title: searchList.title,
        userId: searchList.userId,
        name: searchList.name,
        tasks: req.body.tasks.map(task => {
          return {
            name: task.name,
            done: task.done
          };
        })
      },

    );
    if (!searchedList)
      return res
        .status(404)
        .send("ToDo list you are looking for does not exist.");
    res.send(searchedList);
  });

  router.put("/:id", async (req, res) => {
  
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
    const searchedSharedList = await ShareList.findByIdAndRemove(req.params.id);
  
    if (!searchedSharedList)
      return res.status(404).send("There is no shared ToDo list with this id in DB.");
  
    res.send(searchedSharedList);
  });
  
  module.exports = router;
  