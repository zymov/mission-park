require('./models').connect();

var path = require('path');
var express = require('express');
var app = express();

app.use('/', express.static(path.join(__dirname, '../')));
app.get('/', (req, res)=>{
	res.sendFile(path.join(__dirname, '../index.html'));
});

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