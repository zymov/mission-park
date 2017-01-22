var mongoose = require('mongoose');
require('./models').connect(require('../config/dbUrl').url);	//connect db

var path = require('path');
var express = require('express');
var app = express();

var passport = require('passport');

var flash = require('connect-flash');


var morgan = require('morgan');

var cookieParser = require('cookie-parser');
var session = require('express-session');

var bodyParser = require('body-parser');


app.use(morgan('dev'));

app.use(cookieParser());
app.use(bodyParser());


app.use(passport.initialize());
//use express session before passport session to ensure that the login session is restored in the correct order.
app.use(session({ 
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true,
  cookie: { secure: true }
}));
app.use(passport.session());
require('../config/passport')(passport);
// app.use(express.cookieParser('keyboard cat'));
app.use(flash());


app.use('/', express.static(path.join(__dirname, '../')));

const authRouter = require('./routes/auth');
app.use('/auth', authRouter);


app.get('*', function (req, res){
  res.sendFile(path.resolve(__dirname,'../index.html'))
})



app.listen(3000, ()=>{console.log('listening at port 3000')});












// var webpack = require('webpack');
// var WebpackDevServer = require('webpack-dev-server');
// var config = require('../webpack.config');

// new WebpackDevServer(webpack(config), {
//   publicPath: config.output.publicPath,
//   hot: true,
//   historyApiFallback: true
// }).listen(3000, 'localhost', function (err, result) {
//   if (err) {
//     return console.log(err);
//   }

//   console.log('Listening at http://localhost:3000/');
// });