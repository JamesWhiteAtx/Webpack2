const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');

const PATHS = {
  app: path.resolve(__dirname, 'app'),
  dist: path.resolve(__dirname, 'dist'),
}

module.exports = {

  entry: {
    app: PATHS.app,
    // vendor: [
    //   path.resolve(PATHS.app, 'vendors.js'),
    //   'lodash',
    // ],
  },
  
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].js',
  },

  module: {
    rules: [
      {
        test: /\.css$/,
         //use: ['style-loader', 'css-loader'],
        use: ExtractTextPlugin.extract({
          fallbackLoader: "style-loader",
          loader: "css-loader"
        }),
      }
    ]
  },

  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(PATHS.app, 'index.html')
    }),

    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor',
      minChunks: function (module) {
        // this assumes your vendor imports exist in the node_modules directory
        return module.context && module.context.indexOf('node_modules') !== -1;
      }
    }),
    new webpack.optimize.CommonsChunkPlugin({
      name: 'common',
      minChunks: 2,
    }),

    new ExtractTextPlugin({
      filename: '[name].css',
      allChunks: true,
    }),
  ],

};