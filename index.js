if (document.currentScript) {
  const currentScriptUrl = document.currentScript.src;
  const basePath = currentScriptUrl.substring(0, currentScriptUrl.lastIndexOf('/') + 1);
  __webpack_public_path__ = basePath;
}

import MonacoCodeEditor from "./src/components/MonacoCodeEditor/MonacoCodeEditor";

export { MonacoCodeEditor };
