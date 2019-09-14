const {
    User,
    validate
} = require('../models/user')
const express = require('express');
const router = express.Router();


//ROUTERS
router.get('/', async (req, res) => {
    const users = await User.find().sort('name');
    res.send(users);
});

router.get('/:id', async (req, res) => {
    console.log(req.params.id)
    try {
        const user = await User.findById(req.params.id);
        res.send(user);
    } catch (error) {
        return res.status(404).send(`The user with the given ID was not found. ${error.message}`);
    }
})

router.post('/', async (req, res) => {
    const {
        error
    } = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    let user = new User({
        name: req.body.name,
        email: req.body.email,
    });

    user = await user.save();
    res.send(user);
})

module.exports = router;