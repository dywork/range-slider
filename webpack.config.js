const path = require('path');

module.exports = {
  watch: true,
  entry: './src/index.ts',
  devtool: 'inline-source-map',
  mode: 'development',
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: 'ts-loader',
      },
      {
        test: /\.hbs/,
        loader: 'handlebars-loader',
        exclude: /node_modules/,
      },
    ],
  },
  resolve: {
    extensions: ['.ts', '.js'],
  },
  output: {
    filename: 'range-slider.js',
    path: path.resolve(__dirname, './build', '../demo-page'),
  },
  devServer: {
    contentBase: path.join(__dirname, './demo-page'),
    compress: true,
    hot: true,
  },
};
