const path = require('path');

module.exports = {
  watch: true,
  entry: './src/index',
  devtool: 'inline-source-map',
  mode: 'development',
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: 'ts-loader',
      },
    ],
  },
  resolve: {
    extensions: ['.ts', '.js'],
  },
  output: {
    filename: 'range-slider.js',
    path: path.resolve(__dirname, './build'),
  },
  devServer: {
    contentBase: path.join(__dirname, './build'),
    compress: true,
    hot: true,
  },
};
