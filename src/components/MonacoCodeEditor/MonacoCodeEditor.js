import React from "react";
import PropTypes from "prop-types";
import Editor from "@monaco-editor/react";

const MonacoCodeEditor = (props) => {
  // Editor options
  const options = { selectOnLineNumbers: true };
  // Props
  const value = props.value;
  const theme = props.theme;
  const style = props.style;
  const language = props.language;
  const onChange = props.onChange;

  return (
    <div style={style}>
      <Editor
        theme={theme}
        options={{ ...options, ...props.options }}
        defaultLanguage="python"
        language={language}
        value={value}
        onChange={onChange}
      />
    </div>
  );
};

MonacoCodeEditor.propTypes = {
  theme: PropTypes.string,
  language: PropTypes.string,
  onChange: PropTypes.func,
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
  style: { display: "flex", flexDirection: "column", flexGrow: 1 },
};

export default MonacoCodeEditor;
