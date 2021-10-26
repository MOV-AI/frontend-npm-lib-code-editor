import React, { useEffect, useRef } from 'react';
import { listen } from '@codingame/monaco-jsonrpc';
import {
  MonacoLanguageClient,
  MessageConnection,
  CloseAction,
  ErrorAction,
  MonacoServices,
  createConnection,
} from '@codingame/monaco-languageclient';
import normalizeUrl from 'normalize-url';

const createUrl = (path) => {
  const protocol = location.protocol === 'https:' ? 'wss' : 'ws';
  return normalizeUrl(
    `${protocol}://${location.host}${location.pathname}${path}`
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

const createLanguageClient = (connection) => {
  return new MonacoLanguageClient({
    name: 'Language Client',
    clientOptions: {
      // use a language id as a document selector
      documentSelector: ['json'],
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
};

const useLanguageClient = (monaco) => {
  const _monaco = useRef(monaco);

  useEffect(() => {
    // install Monaco language client services
    MonacoServices.install(_monaco);

    // create the web socket
    const url = createUrl('/sampleServer');
    const webSocket = createWebSocket(url);

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
  });
};

export default useLanguageClient;
