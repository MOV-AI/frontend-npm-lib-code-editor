/* --------------------------------------------------------------------------------------------
 * Copyright (c) 2018 TypeFox GmbH (http://www.typefox.io). All rights reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 *
 * References:
 * https://kamneemaran45.medium.com/intellisense-autocomplete-in-python-editor-d5c0cfa82b3f
 * https://github.com/TypeFox/monaco-languageclient/tree/master/example/src
 * ------------------------------------------------------------------------------------------ */
import * as ws from "ws";
import * as url from "url";
import * as express from "express";
import { launch as pythonLauncher } from "./python/python-launcher";

process.on("uncaughtException", function (err) {
  console.error("Uncaught Exception: ", err.toString());
  if (err.stack) {
    console.error(err.stack);
  }
});

// create the express application
const app = express();
// server the static content, i.e. index.html
app.use(express.static(__dirname));
// start the server
const server = app.listen(7001);
// create the web socket
const wss = new ws.Server({
  noServer: true,
  perMessageDeflate: false,
});
server.on("upgrade", (request, socket, head) => {
  const pathname = request.url ? url.parse(request.url).pathname : undefined;
  if (pathname === "/language-server") {
    wss.handleUpgrade(request, socket, head, (webSocket) => {
      const socket = {
        send: (content) =>
          webSocket.send(content, (error) => {
            if (error) {
              throw error;
            }
          }),
        onMessage: (cb) => webSocket.on("message", cb),
        onError: (cb) => webSocket.on("error", cb),
        onClose: (cb) => webSocket.on("close", cb),
        dispose: () => webSocket.close(),
      };
      // launch the server when the web socket is opened
      if (webSocket.readyState === webSocket.OPEN) {
        pythonLauncher(socket);
      } else {
        webSocket.on("open", () => pythonLauncher(socket));
      }
    });
  }
});
