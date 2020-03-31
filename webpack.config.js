const path = require('path');
const autoprefixer = require('autoprefixer');

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
      {
        test: /\.scss$/,
        use: [
          'style-loader',
          'css-loader',
          {
            loader: 'postcss-loader',
            options: {
              plugins: [autoprefixer()],
            },
          },
          'sass-loader',
        ],
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
