import React, { createRef } from "react";
import PropTypes from "prop-types";
import Editor from "@monaco-editor/react";

const MonacoCodeEditor = React.forwardRef((props, ref) => {
  // Editor options
  const options = { selectOnLineNumbers: true };
  const editorRef = createRef();
  // Props
  const value = props.value;
  const theme = props.theme;
  const style = props.style;
  const language = props.language;
  const onChange = props.onChange;

  const onEditorMount = (editor, monaco) => {
    // Set forwarded ref
    if (ref) ref.current = editor;
    // Call props onLoad
    props.onLoad(editor);
  };

  return (
    <div style={{ ...style, maxHeight: "100%" }} ref={editorRef}>
      <Editor
        theme={theme}
        options={{ ...options, ...props.options }}
        defaultLanguage="python"
        language={language}
        value={value}
        onMount={onEditorMount}
        onChange={onChange}
      />
    </div>
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
