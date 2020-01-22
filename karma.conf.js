const webpackConfig = require('./webpack.config');

module.exports = function (config) {
  config.set({
    basePath: '',
    frameworks: ['jasmine'],
    files: ['src/**/*.test.ts', 'src/**/*.test.js'],
    exclude: [],
    preprocessors: {
      'src/**/*.test.ts': ['webpack'],
      'src/**/*.test.js': ['webpack'],
    },
    webpack: {
      module: webpackConfig.module,
      resolve: webpackConfig.resolve,
      mode: webpackConfig.mode,
      devtool: 'inline-source-map',
    },
    reporters: ['spec'],
    port: 9876,
    colors: true,
    logLevel: config.LOG_INFO,
    autoWatch: true,
    browsers: ['Chrome'],
    singleRun: false,
    concurrency: Infinity,
  });
};
