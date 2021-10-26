// const path = require("path");

// module.exports = {
//   stories: ["../src/stories/**/*.stories.[tj]s"],
//   // addons: ["@storybook/addon-knobs/register"],
//   // webpackFinal: async (config, { configType }) => {
//   //   config.module.rules.push({
//   //     test: /\.css$/,
//   //     use: ["style-loader", "css-loader", "sass-loader"],
//   //     include: path.resolve(__dirname, "../src"),
//   //   });

//   //   return config;
//   // },
// };

// .storybook/main.js

// your app's webpack.config.js
const custom = require('../webpack.config.js');

module.exports = {
  stories: ['../src/stories/**/*.stories.[tj]s'],
  target: 'web',
  webpackFinal: (config) => {
    return {
      ...config,
      module: { ...config.module, rules: custom.module.rules },
    };
  },
};

// // .storybook/main.js
// const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin');

// module.exports = {
//   stories: ['../src/stories/**/*.stories.[tj]s'],
//   webpackFinal: (config) => {
//     config.resolve.plugins = [
//       ...(config.resolve.plugins || []),
//       new TsconfigPathsPlugin({
//         extensions: config.resolve.extensions,
//       }),
//     ];
//     return config;
//   },
// };
