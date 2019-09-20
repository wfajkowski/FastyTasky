const { User } = require("../models/user");
const { MessageBox, validateMessageBox } = require("../models/messageBox");
const { Conversation, validateConversation } = require("../models/conversation");
const { messageSchema } = require("../models/message");
const express = require("express");
const router = express.Router();

router.get("/", async (req, res) => {
    
    const messageBoxes = await MessageBox.find();
    res.send(messageBoxes);
});

router.get("/:id", async (req, res) => {
    const searchedMessageBox = await MessageBox.findById(req.params.id);
  
    if (!searchedMessageBox)
      return res.status(404).send("There is no message box with this id in DB.");

    res.send(searchedMessageBox);
});
  
router.post("/", async (req, res) => {
    const { error } = validateMessageBox(req.body);
    if (error) return res.status(400).send(error.details[0].message);
  
    const user = await User.findById(req.body.userId);
    const messageBox = new MessageBox({
      userId: user._id,
      name: user.name,
      conversations: []
    });
  
    await messageBox.save();
    res.send(messageBox);
});

router.patch("/:id", async (req, res) => {
    function validation1 () {
        const { error } = validateMessageBox(req.body);
        if (error) return res.status(400).send(error.details[0].message);
    }
    function validation2 () {
        const { error } = validateConversation(req.body.conversations);
        if (error) return res.status(400).send(error.details[0].message);
    }
    validation1();
    //validation2();
    /*const { error } = validateMessageBox(req.body);
    const { error } = validateConversation(req.body.conversations);
    if (error) return res.status(400).send(error.details[0].message);
    if (error) return res.status(400).send(error.details[0].message);*/
  
  
    const user = await User.findById(req.body.userId);
    const targetUser = await User.findById(req.body.conversations[0].targetUserId);
    const newConversationx = await MessageBox.findById(req.params.id);
    const maintainedConversation = await newConversationx.conversations;
    //res.send(newConversationx);
    
    const newConversation = await MessageBox.findByIdAndUpdate(
      req.params.id,
      {
        conversations: maintainedConversation.map(conversation => {
          return {
            targetUserId: targetUser._id,
            targetName: targetUser.name,
            messages: conversation.messages
          }}).concat(req.body.conversations.map(conversation => {
          return {
            targetUserId: targetUser._id,
            targetName: targetUser.name,
            messages: conversation.messages
          }})),
      },
    );
    if (!newConversation)
      return res
        .status(404)
        .send("Conversation you are looking for does not exist.");
    //res.send(newConversation);

    const targetObject = await MessageBox.find({userId : targetUser._id});
    const newConversationx2 = await MessageBox.findById(targetObject[0]._id);
    const maintainedConversation2 = await newConversationx2.conversations;
    const newConversation2 = await MessageBox.findByIdAndUpdate(
        targetObject[0]._id,
        {
          conversations: maintainedConversation2.map(conversation => {
            return {
              targetUserId: user._id,
              targetName: user.name,
              messages: conversation.messages
            }}).concat(req.body.conversations.map(conversation => {
              return {
                targetUserId: user._id,
                targetName: user.name,
                messages: conversation.messages
            }})),
          },
        );
      if (!newConversation2)
        return res
          .status(404)
          .send("Conversation you are looking for does not exist.");
      res.send({newConversation, newConversation2});
  });
  
router.delete("/:id", async (req, res) => {
    const searchedMessageBox = await MessageBox.findByIdAndRemove(req.params.id);
  
    if (!searchedMessageBox)
      return res.status(404).send("There is no message box with this id in DB.");
  
    res.send(searchedMessageBox);
});
  
module.exports = router;