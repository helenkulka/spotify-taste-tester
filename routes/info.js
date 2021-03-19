var express = require("express");
var router = express.Router();

router.post('/', function(req, res, next) {
    console.log("INFO",req.body.log);
    res.send("");
})

module.exports = router;