var express = require("express");
var router = express.Router();

router.post('/', function(req, res, next) {
    console.log("ERROR:", req.body.error);
    if (req.body.errorMsg){
        console.log("ERROR:",req.body.errorMsg)
    }
    res.send("");
})

module.exports = router;