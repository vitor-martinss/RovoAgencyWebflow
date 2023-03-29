const path = require('path')
const {
  CleanWebpackPlugin
} = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  mode: 'production',
  devtool: 'source-map',
  entry: {
    custom02: './src/index.js',
    mainBarbaJsPageTransitions02: './src/methods/barbaJsPageTransitions.js',
    mainSubmitNewsletterForm02: './src/methods/jQuerySubmitNewsletterForm.js',
    mainSubmitContactForm02: './src/methods/jQuerySubmitContactForm.js',
  },
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, 'build')
  },
  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      filename: 'index.html',
      inject: true,
      template: path.resolve(__dirname, 'src', 'index.html'),
    }),
    new MiniCssExtractPlugin({
      filename: '[name].css',
    }),

  ],
  module: {
    rules: [{
        test: /\.css$/,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
        ],
      },{
        test: /\.(js|jsx)$/,
        exclude: /[\\/]node_modules[\\/]/,
        use: {
          loader: 'babel-loader',
        },
      },
    ],
  }
}