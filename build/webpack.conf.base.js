const path = require('path')
const HtmlPlugin = require('html-webpack-plugin')
const HtmlWebpackHarddiskPlugin = require('html-webpack-harddisk-plugin')
const ExtractTextPlugin = require('extract-text-webpack-plugin')

function resolve (dir) {
  return path.join(__dirname, '..', dir)
}

module.exports = {
  entry: {
    main: './src/main.js'
  },
  resolve: {
    extensions: ['.js', '.vue', '.json'],
    alias: {
      'vue$': 'vue/dist/vue.esm.js',
      '@': resolve('src')
    }
  },
  module: {
    rules: [{
      test: /\.css$/,
      loader: ExtractTextPlugin.extract({
        use: ['css-loader']
      })
    }, {
      test: /\.scss$/,
      loader: ExtractTextPlugin.extract({
        use: ['css-loader', 'sass-loader']
      })
    }, {
      test: /\.(js|vue)$/,
      loader: 'eslint-loader',
      enforce: 'pre',
      include: [resolve('src'), resolve('test')]
    }, {
      test: /\.vue$/,
      loader: 'vue-loader'
    }, {
      test: /\.js$/,
      loader: 'babel-loader',
      include: [resolve('src'), resolve('test')]
    }]
  },
  plugins: [
    new HtmlPlugin({
      title: '首页',
      template: path.resolve(__dirname, '../src/template/default.html'),
      alwaysWriteToDisk: true
    }),
    new HtmlWebpackHarddiskPlugin()
  ]
}
