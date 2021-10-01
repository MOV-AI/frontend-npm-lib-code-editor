import React, { createRef } from "react";
import PropTypes from "prop-types";
import { MonacoServices } from "monaco-languageclient";
import { connectToLanguageServer } from "../../language-server/client";
import * as monaco from "monaco-editor";
import "./MonacoCodeEditor.css";

const MonacoCodeEditor = React.forwardRef((props, ref) => {
  // state hooks
  const [isFirstTime, setFirstTime] = React.useState(true);
  const [editor, setEditor] = React.useState(null);
  const editorRef = createRef();
  // Props
  const value = props.value;
  const theme = props.theme;
  const style = props.style;
  const language = props.language;
  const onChange = props.onChange;

  // ========== Languages ========== //
  const python = {
    id: "python",
    extensions: [".py"],
    aliases: ["python"],
    mimetypes: ["application/text"],
  };

  // On component did mount
  React.useEffect(() => {
    if (!isFirstTime) return;
    const element = editorRef.current;
    // register
    monaco.languages.register(python);
    const _editor = monaco.editor.create(element, {
      value: value,
      language: language,
      theme: theme,
      "semanticHighlighting.enabled": true,
      selectOnLineNumbers: true,
      autoIndent: "full",
      lightbulb: {
        enabled: true,
      },
      ...props.options,
    });
    MonacoServices.install(editor);
    setFirstTime(false);
    setEditor(_editor);
    connectToLanguageServer();
    // ========== Setup events ========== //
    // On change
    _editor.onDidChangeModelContent(() => onChange(_editor.getValue()));
    // On load
    props.onLoad(_editor);
    if (ref) ref.current = _editor;
  }, []);

  // On change Theme
  React.useEffect(() => {
    monaco.editor.setTheme(theme);
  }, [theme]);

  // On change Language
  React.useEffect(() => {
    if (editor) {
      const model = editor.getModel();
      monaco.editor.setModelLanguage(model, language);
    }
  }, [language]);

  return (
    <div
      ref={editorRef}
      className="mov-ai-monaco-code-editor"
      style={{ ...style, maxHeight: "100%", maxWidth: "100%" }}
    ></div>
  );
});

MonacoCodeEditor.propTypes = {
  theme: PropTypes.string,
  language: PropTypes.string,
  onChange: PropTypes.func,
  onLoad: PropTypes.func,
  options: PropTypes.object,
  value: PropTypes.string,
  style: PropTypes.object,
};

MonacoCodeEditor.defaultProps = {
  value: "",
  theme: "vs-dark",
  language: "python",
  options: {},
  onChange: () => {},
  onLoad: () => {},
  style: { display: "flex", flexDirection: "column", flexGrow: 1 },
};

export default MonacoCodeEditor;
