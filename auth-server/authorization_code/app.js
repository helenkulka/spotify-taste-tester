const path = require('path');
var express = require('express'); // Express web server framework
var cookieParser = require('cookie-parser');
var testAPIRouter = require("./routes/testAPI");
var loginRouter = require("./routes/login");
var callbackRouter = require("./routes/callback");
var cors = require("cors");

var app = express();

app.use(cors())
app.use(express.static(__dirname + '/public'));
app.use(cookieParser());
app.use("/testAPI", testAPIRouter);
app.use("/login", loginRouter);
app.use("/callback", callbackRouter);


console.log('Listening on 8888');
app.listen(8888);
