const path = require('path');
const nodeExternals = require('webpack-node-externals');
const MonacoWebpackPlugin = require('monaco-editor-webpack-plugin');

module.exports = {
  entry: './index.js',
  output: {
    filename: 'index.js',
    path: path.resolve(__dirname, 'dist'),
    library: 'monaco',
    libraryTarget: 'umd',
  },
  target: 'web',
  devtool: 'source-map',
  externals: [nodeExternals()],
  plugins: [new MonacoWebpackPlugin()],
  module: {
    rules: [
      {
        test: /\.(js|mjs|jsx|ts|tsx)$/,
        exclude: /(node_modules|bower_components)/,
        resolve: {
          extensions: ['.js', '.jsx'],
        },
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-react', '@babel/preset-env'],
            plugins: [
              '@babel/plugin-syntax-dynamic-import',
              '@babel/plugin-syntax-import-meta',
              '@babel/plugin-proposal-class-properties',
              '@babel/plugin-proposal-json-strings',
              '@babel/plugin-transform-runtime',
            ],
            targets: ["defaults", "not ie 11", "not ie_mob 11"]
          },
        },
      },
      {
        test: /\.scss$/,
        use: ['style-loader', 'css-loader', 'sass-loader'],
        include: path.resolve(__dirname, './src'),
      },
      {
        test: /\.css$/,
        resolve: {
          extensions: ['.css'],
        },
        use: ['style-loader', 'css-loader'],
        include: [
          path.resolve(__dirname, './node_modules/monaco-editor'),
          path.resolve(__dirname, './src'),
        ],
      },
      {
        test: /\.ttf$/,
        use: ['file-loader'],
      },
    ],
  },
  optimization: {
    concatenateModules: false,
    providedExports: false,
    usedExports: false,
  },
  resolve: {
    alias: {
      vscode: require.resolve(
        '@codingame/monaco-languageclient/lib/vscode-compatibility'
      ),
    },
    extensions: ['.js', '.json', '.ttf'],
  },
};

