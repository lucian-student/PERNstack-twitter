const router = require('express').Router();
const pool = require('../configuration/db');
const authorization = require('../midelware/authorization');

//get
router.get('/',authorization, (req, res) => {
    try {
        res.json(req.user);
    } catch (err) {
        console.log(err.message);
        res.status(500).send('Server Error');
    }
});

//post

//put

//delete

module.exports = router;