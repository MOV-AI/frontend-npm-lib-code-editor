import { listen } from "vscode-ws-jsonrpc";
import {
  MonacoLanguageClient,
  CloseAction,
  ErrorAction,
  createConnection,
} from "monaco-languageclient";

const createLanguageClient = (connection) => {
  return new MonacoLanguageClient({
    name: "Monaco language client",
    clientOptions: {
      documentSelector: ["python"],
      errorHandler: {
        error: () => ErrorAction.Continue,
        closed: () => CloseAction.DoNotRestart,
      },
    },
    connectionProvider: {
      get: (errorHandler, closeHandler) => {
        return Promise.resolve(
          createConnection(connection, errorHandler, closeHandler)
        );
      },
    },
  });
};

export const connectToLanguageServer = () => {
  const webSocket = new WebSocket("/language-server");
  listen({
    webSocket: webSocket,
    onConnection: (connection) => {
      const languageClient = createLanguageClient(connection);
      const disposable = languageClient.start();
      connection.onClose(function () {
        return disposable.dispose();
      });
      connection.onError(function (error) {
        console.log(error);
      });
    },
  });
};
