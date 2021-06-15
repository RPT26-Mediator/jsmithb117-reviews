// module.exports = {
//   mode: 'production',
//   entry: __dirname + '/client/src/index.jsx',
//   module: {
//     rules: [
//       {
//         test: [/\.jsx$/],
//         exclude: /node_modules/,
//         use: {
//           loader: 'babel-loader',
//           options: {
//             presets: ['@babel/preset-react', '@babel/preset-env']
//           }
//         }
//       }
//     ]
//   },
//    output: {
//     filename: 'bundle.js',
//     path: __dirname + '/client/dist'
//   }
// };

const webpack = require('webpack');
const path = require('path');

// See: https://stackoverflow.com/questions/37788142/webpack-for-back-end

const common = {
  context: __dirname + '/client',
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        query: {
          presets: ['@babel/preset-react', '@babel/preset-env']
        },
      },
    ],
  }
};

const client = {
  entry: './src/client.js',
  output: {
    path: __dirname + '/client/dist',
    filename: 'app.js'
  }
};

const server = {
  entry: './src/server.js',
  target: 'node',
  output: {
    path: __dirname + '/client/dist',
    filename: 'app-server.js',
    libraryTarget: 'commonjs-module'
  }
};

module.exports = [
  Object.assign({}, common, client),
  Object.assign({}, common, server)
];