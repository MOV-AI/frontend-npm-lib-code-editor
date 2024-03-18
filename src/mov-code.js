function getUrl() {
  if (document.currentScript)
    return document.currentScript.src;
  else
    return import.meta.url;
}

const currentUrl = getUrl();
globalThis.__webpack_public_path__ = currentUrl
  .substring(0, currentUrl.lastIndexOf('/') + 1);

import MonacoCodeEditor from "./components/MonacoCodeEditor/MonacoCodeEditor";

export { MonacoCodeEditor };
