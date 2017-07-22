var webpack = require("webpack");
var path = require("path");
var UglifyJsPlugin = require("uglifyjs-webpack-plugin");

module.exports = {
	entry: [
	  // "webpack-dev-server/client?http://0.0.0.0:3000", // WebpackDevServer host and port
	  // "webpack/hot/only-dev-server", // "only" prevents reload on syntax errors
	  "./app/rootRouter.js" // Your appʼs entry point
	],
	output: {
		path: path.join(__dirname, "dist"),
		filename: "app.bundle.js",
		publicPath: __dirname
	},
	module: {
	  rules: [
	    { 
	    	test: /\.(js|jsx)?$/, 
	    	exclude: /node_modules/, 
	    	loader: "babel-loader",
	    	options: {
	    		"presets": [ "es2015", "react" ]
	    	}
	    },
	    {
	    	test: /\.css$/,
	    	use: [
	    		{
	    			loader: "style-loader",
	    		},
	    		{
	    			loader: "css-loader",
	    			options: {
	    				modules: true
	    			}
	    		}
	    	]

	    }
	  ]
	},
	// plugins: [
	//   new UglifyJsPlugin({
	//   	sourceMap: true,
	//   	compress: {
	//   		warnings: true
	//   	}
	//   })
	// ]
}