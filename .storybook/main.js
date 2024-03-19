const path = require("path");
const { merge } = require("webpack-merge");
const webpack = require("webpack");
const MonacoWebpackPlugin = require("monaco-editor-webpack-plugin");

module.exports = {
  stories: ["../stories/**/*.stories.[tj]s"],
  // addons: ["@storybook/addon-knobs/register"],
  webpackFinal: async (config) => {
    const finalConfig = merge(config, {
      resolve: {
        alias: {
          vscode: require.resolve(
            "@codingame/monaco-languageclient/lib/vscode-compatibility"
          ),
        },
        extensions: [".js", ".json", ".ttf"],
      },
    });

    finalConfig.entry = {
      main: finalConfig.entry,
      "editor.worker": "monaco-editor-core/esm/vs/editor/editor.worker.js",
    };

    finalConfig.output.filename = "[name].bundle.js";
    // workaround in https://github.com/storybookjs/storybook/issues/18276#issuecomment-1137101774
    finalConfig.plugins = finalConfig.plugins.map((plugin) => {
      if (plugin.constructor.name === "IgnorePlugin") {
        return new webpack.IgnorePlugin({
          resourceRegExp: plugin.options.resourceRegExp,
          contextRegExp: plugin.options.contextRegExp,
        });
      }
      return plugin;
    });
    return finalConfig;
  },
  core: {
    builder: "webpack5",
  },
  addons: ['storybook-addon-mock/register'],
};
