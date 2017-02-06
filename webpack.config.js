const path = require('path');
const webpack = require('webpack');
const merge = require('webpack-merge');
const HtmlWebpackPlugin = require('html-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');

const PATHS = {
  app: path.resolve(__dirname, 'app'),
  dist: path.resolve(__dirname, 'dist'),
};

const baseCfg = {
  entry: {
    app: PATHS.app,
  },
  
  output: {
    path: PATHS.dist,
    filename: '[name].js',
  },

  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        options: { 
          presets: [ 
            'es2015' 
          ] 
        }
      },
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
      minChunks: Infinity,
    }),
  ],
};

const devCfg = {
  devtool: 'eval',

  module: {
    rules: [
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      }
    ],
  },
  plugins: [
    new webpack.NamedModulesPlugin(),
  ],  
};

const prodCfg = {
  output: {
    filename: '[name].[chunkhash].js',
  },

  //devtool: 'source-map',

  module: {
    rules: [
      {
        test: /\.css$/,
        use: ExtractTextPlugin.extract({
          fallbackLoader: "style-loader",
          loader: "css-loader"
        }),
      }
    ],
  },
  plugins: [
    new ExtractTextPlugin({
      filename: '[name].[contenthash].css',
      allChunks: true,
    }),
    new webpack.HashedModuleIdsPlugin(),
    new webpack.LoaderOptionsPlugin({
      minimize: true,
      debug: false
    }),

    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false,
      },
      output: {
        comments: false,
      },
      sourceMap: true,
    }),

    new webpack.SourceMapDevToolPlugin({
        filename: '[file].map',
        include: 'app',
    }),

  ],
};

module.exports = function(env) {
  let envCfg = {};
  if (env === 'dev') {
    envCfg = devCfg;
  } else if (env === 'prod') {
    envCfg = prodCfg;
  }
  return merge(baseCfg, envCfg);
};