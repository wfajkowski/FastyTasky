const express = require('express');
const router = express.Router();


const content = {
    name: "John",
    surname: "Doe"
}

router.get('/', (req, res) => {
    res.send(content);
})

module.exports = router;