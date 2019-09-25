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
  
  router.delete("/:id", async (req, res) => {
    const searchedSharedList = await ShareList.findByIdAndRemove(req.params.id);
  
    if (!searchedSharedList)
      return res.status(404).send("There is no shared ToDo list with this id in DB.");
  
    res.send(searchedSharedList);
  });
  
  module.exports = router;
  