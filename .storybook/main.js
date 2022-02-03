const path = require('path');
const { merge } = require('webpack-merge');
const MonacoWebpackPlugin = require('monaco-editor-webpack-plugin');

module.exports = {
  stories: ['../src/stories/**/*.stories.[tj]s'],
  // addons: ["@storybook/addon-knobs/register"],
  webpackFinal: async (config) => {
    const finalConfig = merge(config, {
      resolve: {
        alias: {
          vscode: require.resolve(
            '@codingame/monaco-languageclient/lib/vscode-compatibility'
          ),
        },
        extensions: ['.js', '.json', '.ttf'],
      },
    });

    finalConfig.entry = {
      main: finalConfig.entry,
      'editor.worker': 'monaco-editor-core/esm/vs/editor/editor.worker.js',
    };

    finalConfig.output.filename = '[name].bundle.js';

    return finalConfig;
  },
  core: {
    builder: 'webpack5',
  },
};
