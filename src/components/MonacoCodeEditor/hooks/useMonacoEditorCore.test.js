import { renderHook, act } from "@testing-library/react-hooks";
import useMonacoEditorCore from "./useMonacoEditorCore";
import * as monaco from "monaco-editor";
import { listen } from "@codingame/monaco-jsonrpc";
import {
  MonacoLanguageClient,
  createConnection,
  CloseAction,
  ErrorAction,
  MonacoServices,
} from "@codingame/monaco-languageclient";
import normalizeUrl from "normalize-url";
import ReconnectingWebSocket from "reconnecting-websocket";
import { Rest } from "@mov-ai/mov-fe-lib-core";

// Mocking external dependencies
jest.mock("monaco-editor", () => ({
  editor: {
    create: jest.fn(),
  },
  languages: {
    registerCompletionItemProvider: jest.fn(),
    CompletionItemKind: {
      Variable: "variable",
      Function: "function",
      Class: "class",
      Value: "value",
      method: "method",
    },
  },
}));

jest.mock("@codingame/monaco-jsonrpc", () => ({
  listen: jest.fn(),
}));

jest.mock("@codingame/monaco-languageclient", () => ({
  MonacoLanguageClient: jest.fn().mockImplementation(() => ({
    start: jest.fn(() => ({ dispose: jest.fn() })),
  })),
  createConnection: jest.fn(),
  CloseAction: { DoNotRestart: "DoNotRestart" },
  ErrorAction: { Continue: "Continue" },
  MonacoServices: {
    install: jest.fn(),
  },
}));

jest.mock("normalize-url", () => jest.fn());
jest.mock("reconnecting-websocket", () => jest.fn());

jest.mock("@mov-ai/mov-fe-lib-core", () => ({
  Rest: {
    get: jest.fn(() => Promise.resolve({})),
  },
}));

// Mock fetch
global.fetch = jest.fn(() =>
  Promise.resolve({
    text: () => Promise.resolve("response from language server"),
  }),
);

describe("useMonacoEditorCore", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should disable minimap when disableMinimap is true", async () => {
    const { result } = renderHook(() => useMonacoEditorCore());

    const props = {
      element: document.createElement("div"),
      value: 'print("Hello, world!")',
      language: "python",
      theme: "vs-dark",
      options: {},
      disableMinimap: true,
      builtins: ["builtin1", "builtin2"],
    };

    await act(async () => {
      result.current.createEditor(props);
    });

    expect(monaco.editor.create).toHaveBeenCalledWith(
      expect.any(HTMLElement),
      expect.objectContaining({
        value: 'print("Hello, world!")',
        language: "python",
        theme: "vs-dark",
        minimap: { enabled: false },
      }),
    );
  });
});
