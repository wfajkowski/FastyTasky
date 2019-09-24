const auth = require("../middleware/auth");
const { ToDoList, validate } = require("../models/toDoList");
const express = require("express");
const router = express.Router();

router.put("/:id", auth, async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const searchedList = await ToDoList.findByIdAndUpdate(req.params.id, {
    title: req.body.title,
    index: req.body.index
  });
  if (!searchedList)
    return res
      .status(404)
      .send("ToDo list you are looking for does not exist.");
  res.send(searchedList);
});

module.exports = router;
