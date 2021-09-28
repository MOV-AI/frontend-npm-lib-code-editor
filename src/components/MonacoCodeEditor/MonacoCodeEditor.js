import React from "react";
import PropTypes from "prop-types";
import Editor from "@monaco-editor/react";

const MonacoCodeEditor = (props) => {
  // Editor options
  const options = { selectOnLineNumbers: true };
  // Props
  const code = props.code;
  const theme = props.theme;
  const width = props.width;
  const height = props.height;
  const language = props.language;

  return (
    <div style={{ width, height }}>
      <Editor
        theme={theme}
        options={options}
        defaultLanguage="python"
        language={language}
        value={code}
      />
    </div>
  );
};

MonacoCodeEditor.propTypes = {
  theme: PropTypes.string,
  language: PropTypes.string,
  value: PropTypes.string,
  width: PropTypes.any,
  height: PropTypes.any,
};

MonacoCodeEditor.defaultProps = {
  value: "",
  height: "90vh",
  width: "100%",
  theme: "vs-dark",
  language: "python",
};

export default MonacoCodeEditor;
