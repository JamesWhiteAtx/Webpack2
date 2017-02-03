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
         use: ['style-loader', 'css-loader'],
        // use: ExtractTextPlugin.extract({
        //   fallbackLoader: "style-loader",
        //   loader: "css-loader"
        // }),
      }
    ]
  },

  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(PATHS.app, 'index.html'),
      chunks: [
                "common",
                "vendor",
                "app"
            ]
    }),

    // These have to be in the order of dependency https://github.com/webpack/webpack/issues/959
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor',
      chunks: ['app'],
      minChunks: function (module) {
        // this assumes your vendor imports exist in the node_modules directory
        return module.context && module.context.indexOf('node_modules') !== -1;
      }
    }),
    new webpack.optimize.CommonsChunkPlugin({
      name: 'common',
      chunks: ['vendor', 'app'],
    }),

    // new ExtractTextPlugin({
    //   filename: '[name].css',
    //   // allChunks: true // NOTE this caused js chunks to be injected out of order ????
    // }),
  ],

};