const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');

const absolutePath = path.join(__dirname, 'public');
const absolutePathToSrc = path.join(__dirname, 'src');

module.exports = {
  entry: {
    app: './src/app.js',
  },
  output: {
    filename: 'bundle.js',
    path: absolutePath,
  },
  resolve: {
    modules: ['node_modules', absolutePathToSrc],
    extensions: ['*', '.js', '.jsx'],
  },
  mode: 'development',
  devtool: 'inline-source-map',
  devServer: {
    contentBase: absolutePath,
  },
  module: {
    rules: [{
      test: /(\.js|\.jsx)$/,
      exclude: /node_modules/,
      use: ['babel-loader'],
    },
    {
      test: /(\.css|\.scss|\.sass)$/,
      use: ['style-loader', 'css-loader', 'sass-loader'],
    },
    {
      test: /\.(png|jpg|gif|svg)$/,
      use: [
        {
          loader: 'file-loader',
        },
      ],
    },
    ],
  },
  plugins: [
    new CleanWebpackPlugin(['public']),
    new HtmlWebpackPlugin(
      {
        template: 'index.html',
      },
    ),
  ],
  node: {
    fs: 'empty',
  },
};
