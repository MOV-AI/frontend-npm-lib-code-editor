import { listen } from "@codingame/monaco-jsonrpc";
import {
  CloseAction,
  createConnection,
  ErrorAction,
  MonacoLanguageClient,
  MonacoServices,
} from "@codingame/monaco-languageclient";
import { Rest } from "@mov-ai/mov-fe-lib-core";
import * as monaco from "monaco-editor";
import normalizeUrl from "normalize-url";
import { useCallback, useEffect } from "react";
import ReconnectingWebSocket from "reconnecting-websocket";
import { PORT, SERVER_PATH } from "../../../constants/Constants";

//========================================================================================
/*                                                                                      *
 *                                         UTILS                                        *
 *                                                                                      */
//========================================================================================

self.MonacoEnvironment = {
  getWorkerUrl: function (_, label) {
    if (label === "json") {
      return "./json.worker.bundle.js";
    }
    if (label === "css" || label === "scss" || label === "less") {
      return "./css.worker.bundle.js";
    }
    if (label === "html" || label === "handlebars" || label === "razor") {
      return "./html.worker.bundle.js";
    }
    if (label === "typescript" || label === "javascript") {
      return "./ts.worker.bundle.js";
    }
    return "./editor.worker.bundle.js";
  },
};

const createUrl = () => {
  const protocol = location.protocol === "https:" ? "wss" : "ws";
  return normalizeUrl(
    `${protocol}://${location.hostname}:${PORT}/${SERVER_PATH}`
  );
};

const createWebSocket = (url) => {
  const socketOptions = {
    maxReconnectionDelay: 10000,
    minReconnectionDelay: 1000,
    reconnectionDelayGrowFactor: 1.3,
    connectionTimeout: 10000,
    maxRetries: Infinity,
    debug: false,
  };
  return new ReconnectingWebSocket(url, [], socketOptions);
};

async function getBuiltins() {
  const defaultMonacoKind = monaco.languages.CompletionItemKind.Value;
  const kind2monacoKind = {
    variable: monaco.languages.CompletionItemKind.Variable,
    function: monaco.languages.CompletionItemKind.Function,
    class: monaco.languages.CompletionItemKind.Class,
  };
  const jsonBuiltins = await Rest.get({
    path: "v1/callback-builtins/",
  });
  Object.keys(jsonBuiltins).forEach((k) => {
    const builtin = jsonBuiltins[k];
    if (!builtin.kind) {
      delete jsonBuiltins[k];
      return;
    }
    builtin.kind = kind2monacoKind[builtin.kind] || defaultMonacoKind;
    builtin.insertText = builtin.label;
  });
  return jsonBuiltins;
}
/**
 *
 * @param {*} builtins
 * @returns {undefined}
 */
function sendBuiltins2LanguageServer(builtins) {
  const lsBuiltinsAddress = `${location.protocol}//${location.hostname}:${PORT}/builtins`;
  console.debug("Sending to language server builtins", lsBuiltinsAddress);
  fetch(lsBuiltinsAddress, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(
      Object.values(builtins).map(({ label }) => ({ label: label }))
    ),
  })
    .then((res) => res.text)
    .then((text) => console.debug("Got response from language server", text));
}

//========================================================================================
/*                                                                                      *
 *                                         MAIN                                         *
 *                                                                                      */
//========================================================================================

const useMonacoEditorCore = () => {
  useEffect(() => {
    getBuiltins().then((actualBuiltins) => {
      console.debug("debug builtins", actualBuiltins);
      BUILTINS = actualBuiltins;
      sendBuiltins2LanguageServer(actualBuiltins);
    });
  }, []);

  const createLanguageClient = useCallback((connection) => {
    return new MonacoLanguageClient({
      name: "Python Language Client",
      clientOptions: {
        // use a language id as a document selector
        documentSelector: ["python"],
        // disable the default error handler
        errorHandler: {
          error: () => ErrorAction.Continue,
          closed: () => CloseAction.DoNotRestart,
        },
      },
      // create a language client connection from the JSON RPC connection on demand
      connectionProvider: {
        get: (errorHandler, closeHandler) => {
          return Promise.resolve(
            createConnection(connection, errorHandler, closeHandler)
          );
        },
      },
    });
  }, []);

  /**
   * Create editor
   * @param {{element: HTMLElement, value: string, language: string, theme: string, options: object, disableMinimap: boolean}} props
   *  Props to be used to compose editor
   * @returns Monaco Editor object
   */
  const createEditor = useCallback((props) => {
    const { element, value, language, theme, options, disableMinimap } = props;
    function getSuggestions(model, position) {
      if (!BUILTINS) return [];
      // parse the current suggestion position
      const textUntilPosition = model.getValueInRange({
        startLineNumber: position.lineNumber,
        startColumn: 1,
        endLineNumber: position.lineNumber,
        endColumn: position.column,
      });
      const word = model.getWordUntilPosition(position);
      const range = {
        startLineNumber: position.lineNumber,
        endLineNumber: position.lineNumber,
        startColumn: word.startColumn,
        endColumn: word.endColumn,
      };
      const split = textUntilPosition.split(" ");
      const lastWord = split[split.length - 1];
      const builtinVars = Object.values(BUILTINS).filter(
        (builtin) =>
          builtin.kind === monaco.languages.CompletionItemKind.Variable
      );
      let suggestionsForObject = [];
      for (let builtinVar of builtinVars) {
        if (lastWord.match(`${builtinVar.label}.`)) {
          suggestionsForObject = builtinVar.methods.map(
            ({ label, documentation }) => ({
              label: label,
              insertText: label,
              kind: monaco.languages.CompletionItemKind.method,
              documentation: documentation,
              sortText: /^_{1,2}\w+_{1,2}$/.test(label)
                ? "z" + label
                : /^_\w+$/.test(label)
                ? "y" + label
                : label,
            })
          );
        }
      }
      return suggestionsForObject.length > 0
        ? suggestionsForObject
        : Object.values(BUILTINS).map((builtin) => ({
            ...builtin,
            range: range,
          }));
    }

    monaco.languages.registerCompletionItemProvider("python", {
      provideCompletionItems: function (model, position) {
        console.debug(
          "debug provide completion item",
          getSuggestions(model, position)
        );
        return {
          suggestions: getSuggestions(model, position),
        };
      },
    });

    const editor = monaco.editor.create(element, {
      value: value,
      language: language,
      theme: theme,
      "semanticHighlighting.enabled": true,
      selectOnLineNumbers: true,
      autoIndent: "full",
      lineNumbers: disableMinimap ? "off" : "on",
      overviewRulerBorder: !disableMinimap,
      overviewRulerLanes: disableMinimap ? 0 : 3,
      minimap: {
        enabled: !disableMinimap,
      },
      ...options,
    });

    MonacoServices.install(monaco);
    const webSocket = createWebSocket(createUrl());

    // listen when the web socket is opened
    listen({
      webSocket,
      onConnection: (connection) => {
        // create and start the language client
        const languageClient = createLanguageClient(connection);
        const disposable = languageClient.start();
        connection.onClose(() => disposable.dispose());
      },
    });

    return editor;
  }, []);

  return { createEditor };
};

/**
 * It had to be this way, it didn't work as a React.useState.
 */
let BUILTINS = undefined;

export default useMonacoEditorCore;
