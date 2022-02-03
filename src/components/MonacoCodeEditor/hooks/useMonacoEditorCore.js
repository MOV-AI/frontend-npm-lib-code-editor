import React, { useCallback, useEffect } from 'react';
import { listen } from '@codingame/monaco-jsonrpc';
import * as monaco from 'monaco-editor';
import {
  MonacoLanguageClient,
  CloseAction,
  ErrorAction,
  MonacoServices,
  createConnection,
} from '@codingame/monaco-languageclient';
import normalizeUrl from 'normalize-url';
import ReconnectingWebSocket from 'reconnecting-websocket';

const SERVER_URL = '/sampleServer';

self.MonacoEnvironment = {
  getWorkerUrl: function (moduleId, label) {
    if (label === 'json') {
      return './json.worker.bundle.js';
    }
    if (label === 'css' || label === 'scss' || label === 'less') {
      return './css.worker.bundle.js';
    }
    if (label === 'html' || label === 'handlebars' || label === 'razor') {
      return './html.worker.bundle.js';
    }
    if (label === 'typescript' || label === 'javascript') {
      return './ts.worker.bundle.js';
    }
    return './editor.worker.bundle.js';
  },
};

const createUrl = (path) => {
  const protocol = location.protocol === 'https:' ? 'wss' : 'ws';
  return normalizeUrl(`ws://localhost:3000/sampleServer`);
  // return normalizeUrl(
  //   `${protocol}://${location.host}${location.pathname}${path}`
  // );
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

const useMonacoEditor = () => {
  const createLanguageClient = useCallback((connection) => {
    return new MonacoLanguageClient({
      name: 'Sample Language Client',
      clientOptions: {
        // use a language id as a document selector
        documentSelector: ['python'],
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

    MonacoServices.install(monaco);
    const webSocket = createWebSocket(createUrl(SERVER_URL));

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

    return monaco.editor.create(element, {
      value: value,
      language: language,
      theme: theme,
      'semanticHighlighting.enabled': true,
      selectOnLineNumbers: true,
      autoIndent: 'full',
      lineNumbers: disableMinimap ? 'off' : 'on',
      overviewRulerBorder: !disableMinimap,
      overviewRulerLanes: disableMinimap ? 0 : 3,
      minimap: {
        enabled: !disableMinimap,
      },
      ...options,
    });
  }, []);

  return { createEditor };
};

export default useMonacoEditor;
