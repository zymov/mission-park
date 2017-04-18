var mongoose = require('mongoose');
require('../models').connect(require('../config/dbUrl').url);	//connect db
var port = process.env.PORT || 3000;
var path = require('path');
var express = require('express');
var app = express();
var passport = require('passport');
var flash = require('connect-flash');
var morgan = require('morgan');

var cookieParser = require('cookie-parser');
var session = require('express-session');
var bodyParser = require('body-parser');
var utils = require('../utils');


app.use('/', express.static(path.join(__dirname, '../')));

app.use(morgan('dev'));
app.use(cookieParser());
app.use(bodyParser());

//use express session before passport session to ensure that the login session is restored in the correct order.
app.use(session({ 
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true,
  cookie: { maxAge: 60000 }
}));
app.use(passport.initialize());
app.use(passport.session());
require('../config/passport')(passport);

app.use(flash());

const authRouter = require('./routes/auth');
const taskRouter = require('./routes/task');
const projectRouter = require('./routes/project');
const chatRouter = require('./routes/chat');
app.use('/auth', authRouter);
app.use('/tasks', taskRouter);
app.use('/projects', projectRouter);
app.use('/chat', chatRouter);

app.get('*', function (req, res){
  res.sendFile(path.resolve(__dirname,'../index.html'));
});

const server = app.listen(port, ()=>{console.log('listening at port ' + port)});

const io = require('socket.io').listen(server);
require('./socket')(io);




