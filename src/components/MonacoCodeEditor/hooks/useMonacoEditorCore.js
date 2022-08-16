import { listen } from "@codingame/monaco-jsonrpc";
import {
  CloseAction,
  createConnection,
  ErrorAction,
  MonacoLanguageClient,
  MonacoServices,
} from "@codingame/monaco-languageclient";
import * as monaco from "monaco-editor";
import normalizeUrl from "normalize-url";
import { useCallback, useEffect, useState } from "react";
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
  // const jsonBuiltins = {
  //   count: { label: "count", detail: "", kind: "variable", methods: [] },
  //   gd: { label: "gd", detail: "", kind: "variable", methods: [] },
  //   logger: {
  //     label: "logger",
  //     detail: "movai logger object",
  //     kind: "variable",
  //     methods: ["info", "warning", "error"].map((label) => ({
  //       label: label,
  //       detail: `log in ${label} mode`,
  //     })),
  //   },
  //   msg: { label: "msg", detail: "", kind: "function" },
  //   run: { label: "run", detail: "", kind: "function" },
  //   Configuration: { label: "Configuration", detail: "", kind: "class" },
  //   FleetRobot: {
  //     label: "FleetRobot",
  //     detail: "Fleet of robots movai robots",
  //     kind: "class",
  //   },
  //   PortName: { label: "PortName", detail: "", kind: "variable", methods: [] },
  //   Robot: { label: "Robot", detail: "", kind: "class" },
  //   Scene: { label: "Scene", detail: "", kind: "class" },
  //   Var: { label: "Var", detail: "", kind: "class" },
  // };
  const jsonBuiltins = await fetch("/callback-builtins/").then((data) =>
    data.json()
  );
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
  console.log("debug ls built in address ", lsBuiltinsAddress);
  fetch(lsBuiltinsAddress, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(Object.values(builtins)),
  })
    .then((res) => res.text)
    .then((text) => console.log("debug got response from lsp", text));
}

//========================================================================================
/*                                                                                      *
 *                                         MAIN                                         *
 *                                                                                      */
//========================================================================================

const useMonacoEditorCore = () => {
  const [builtins, setBuiltins] = useState([]);

  useEffect(() => {
    getBuiltins().then((actualBuiltins) => {
      setBuiltins(actualBuiltins);
      sendBuiltins2LanguageServer(actualBuiltins);
    });
  });

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
      if (builtins.length <= 0) return [];
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
      console.log("debug suggestions textUntilPosition", textUntilPosition);
      console.log("debug suggestions range", range);
      const split = textUntilPosition.split(" ");
      const lastWord = split[split.length - 1];
      const builtinVars = Object.values(builtins).filter(
        (builtin) =>
          builtin.kind === monaco.languages.CompletionItemKind.Variable
      );
      let suggestionsForInstance = [];
      for (let builtinVar of builtinVars) {
        if (lastWord.match(`${builtinVar.label}.`)) {
          suggestionsForInstance = builtinVar.methods.map((method) => ({
            label: method.label,
            insertText: method.label,
            kind: monaco.languages.CompletionItemKind.method,
            detail: method.detail,
          }));
        }
      }
      return suggestionsForInstance.length > 0
        ? suggestionsForInstance
        : Object.values(builtins).map((builtin) => ({
            ...builtin,
            range: range,
          }));
    }

    monaco.languages.registerCompletionItemProvider("python", {
      provideCompletionItems: function (model, position) {
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

export default useMonacoEditorCore;
