const path = require('path');
var express = require('express'); // Express web server framework
var cookieParser = require('cookie-parser');
var testAPIRouter = require("./routes/testAPI");
var loginRouter = require("./routes/login");
var callbackRouter = require("./routes/callback");
var indexRouter = require('./routes/index');
var cors = require("cors");

var app = express();

app.use(cors())
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'client/build')));
app.use('/', indexRouter);
app.use("/testAPI", testAPIRouter);
app.use("/login", loginRouter);
app.use("/callback", callbackRouter);

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname+'/client/build/index.html'));
  });

console.log('Listening on 8888');

var port_number = server.listen(process.env.PORT || 8888);
app.listen(port_number);