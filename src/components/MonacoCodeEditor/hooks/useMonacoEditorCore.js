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
import { useCallback } from "react";
import ReconnectingWebSocket from "reconnecting-websocket";
import { PORT, SERVER_PATH } from "../../../constants/Constants";

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

const useMonacoEditorCore = () => {
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
        middleware: {
          workspace: {
            configuration: (params, token, configuration) => {
              console.log("debug params", params);
              console.log("debug token", token);
              console.log("debug config", configuration);
              return [
                {
                  pylsp: {
                    configurationSources: ["pycodestyle", "flake8"],
                    plugins: {
                      flake8: {
                        enabled: true,
                        config: "~/.config/flake8",
                      },
                    },
                  },
                },
              ];
            },
          },
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

    function createProposals() {
      return [
        { label: "count" },
        { label: "gd" },
        {
          label: "logger",
          documentation: "movai logger object",
          insertText: "logger",
        },
        { label: "msg" },
        { label: "run" },
        { label: "Configuration" },
        {
          label: "FleetRobot",
          documentation: "Fleet of robots movai robots",
          insertText: "FleetRobot",
        },
        { label: "PortName" },
        { label: "Robot" },
        { label: "Scene" },
        { label: "Var" },
      ];
    }

    monaco.languages.registerCompletionItemProvider("python", {
      provideCompletionItems: function (model, position) {
        return {
          suggestions: createProposals(),
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
