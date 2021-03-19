var express = require("express");
var router = express.Router();

router.get('/', function(req, res, next) {
    console.log("ERROR:",req.body.error);
    res.send("");
})

module.exports = router;