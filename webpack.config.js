const makeConfigs = require("@mov-ai/mov-fe-lib-scripts/webpack.config");

module.exports = env => {
  const configs = makeConfigs(env);

  for (const config of configs) {
    config.entry["editor-worker"] = "monaco-editor/esm/vs/editor/editor.worker";
  }
  
  return configs;
}
