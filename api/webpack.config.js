const slsw = require('serverless-webpack');
const path = require('path');

module.exports = {
  mode: slsw.lib.webpack.isLocal ? 'development' : 'production',
  target: 'node',
  entry: slsw.lib.entries,
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
    },
  },
  output: {
    libraryTarget: 'commonjs',
    path: path.join(__dirname, '.webpack'),
    filename: '[name].js',
  },
  optimization: {
    minimize: false,
  },
  externals: ['aws-sdk', 'bcrypt'],
  module: {
    rules: [
      {
        test: /\.js$/,
        include: [__dirname],
        exclude: /node_modules/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              cacheDirectory: true,
            },
          },
        ],
      },
    ],
  },
};
