const path = require('path');
const fs = require('fs');

var nodeModules = {};
fs.readdirSync('node_modules')
  .filter(function(x) {
    return ['.bin'].indexOf(x) === -1;
  })
  .forEach(function(mod) {
    nodeModules[mod] = 'commonjs ' + mod;
  });
const OUTPUT_DIR = path.resolve(__dirname, './dist');

module.exports = {
  entry: {
    server: './src/server.ts',
    app: './src/app.ts',
  },
  output: {
    path: OUTPUT_DIR,
    filename: '[name].bundle.js',
  },
  resolve: {
    extensions: ['.webpack.js', '.web.js', '.ts', '.tsx', '.js'],
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: '/node_modules/',
      }
    ]
  },
  target: 'node',
  externals: nodeModules,
  plugins: [
  ]
};