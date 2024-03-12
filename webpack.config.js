const makeConfigs = require("@tty-pt/scripts/webpack.config");

module.exports = env => {
  const config = makeConfigs(env)[0];

  config.entry["editor-worker"] = "monaco-editor/esm/vs/editor/editor.worker";
  
  return config;
}
