const src = __dirname + "/src"
const dist = __dirname + "/dist"
const webpack = require('webpack')

module.exports = {
  mode: 'development',
  devtool: 'inline-source-map',
  target: 'node',
  devServer: {
    contentBase: dist
  },
  context: src,
  entry: {
    main: './PathUtil.js',
  },
  output: {
    filename: 'PathUtil.bundle.js',
    sourceMapFilename: '[name].map',
    path: dist,
    publicPath:"",
    libraryExport: 'default',
    libraryTarget: 'umd'
  },
  module: {
  },
  resolve: {
    modules: ['node_modules']
  },
}