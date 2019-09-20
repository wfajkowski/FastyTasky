const { User } = require("../models/user");
const { ConversationBox, validateConversationBox } = require("../models/conversationBox");
const { Conversation, validateConversation } = require("../models/conversation");
const express = require("express");
const router = express.Router();

router.get("/", async (req, res) => {
    const conversationBoxes = await ConversationBox.find();
    res.send(conversationBoxes);
});
  
router.get("/:id", async (req, res) => {
    const searchedConversationBox = await ConversationBox.findById(req.params.id);
  
    if (!searchedConversationBox)
      return res.status(404).send("There is no conversation box with this id in DB.");
  
    res.send(searchedConversationBox);
});
  
router.post("/", async (req, res) => {
    const { error } = validateConversationBox(req.body);
    if (error) return res.status(400).send(error.details[0].message);
  
    const user = await User.findById(req.body.userId);
    const targetUser = await User.findById(req.body.conversations[0].targetUserId);
    const messageBox = new ConversationBox({
      userId: user._id,
      name: user.name,
      conversations: req.body.conversations.map(conversation => {
        return {
          targetUserId: targetUser._id,
          targetName: targetUser.name,
          messages: conversation.messages
        };
      })
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

  const user = await User.findById(req.body.userId);
  const targetUser = await User.findById(req.body.conversations[0].targetUserId);
  const newConversationx = await MessageBox.findById(req.params.id);
  const maintainedConversation = await newConversationx.conversations;
  
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

router.post("/:id", async (req, res) => {
    const { error } = validateConversation(req.body);
    if (error) return res.status(400).send(error.details[0].message);
  
    const targetUser = await User.findById(req.body.targetUserId);
    const user = await User.findById(req.body.messages[0].userId);
    const conversation = new Conversation({
      targetUserId: targetUser._id,
      targetName: targetUser.name,
      messages: req.body.messages.map(message => {
        return {
          userId: user._id,
          content: message.content,
          read: message.read,
          sendDate: message.sendDate
        };
      })
    });
  
    await conversation.save();
    res.send(conversation);
});
  
router.delete("/:id", async (req, res) => {
    const searchedConversationBox = await ConversationBox.findByIdAndRemove(req.params.id);
  
    if (!searchedConversationBox)
      return res.status(404).send("There is no shared ToDo list with this id in DB.");
  
    res.send(searchedConversationBox);
});
  
module.exports = router;