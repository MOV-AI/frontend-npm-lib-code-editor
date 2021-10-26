import React, { createRef, useRef } from 'react';
import PropTypes from 'prop-types';
import './MonacoCodeEditor.css';
import * as monaco from 'monaco-editor';
import useLanguageClient from './hooks/useLanguageClient';

const createEditor = ({ element, value, language, theme, options }) =>
  monaco.editor.create(element, {
    value: value,
    language: language,
    theme: theme,
    'semanticHighlighting.enabled': true,
    selectOnLineNumbers: true,
    autoIndent: 'full',
    ...options,
  });

const MonacoCodeEditor = React.forwardRef((props, ref) => {
  // state hooks
  const editorRef = createRef();
  const editor = useRef(null);

  //const [isFirstTime, setFirstTime] = React.useState(true);
  //const [editor, setEditor] = React.useState(null);

  //const [] = useLanguageClient();

  // Props
  const value = props.value;
  const theme = props.theme;
  const style = props.style;
  const language = props.language;
  const onChange = props.onChange;

  // On component did mount
  React.useEffect(() => {
    //if (!isFirstTime) return;
    const element = editorRef.current;
    // const _editor = monaco.editor.create(element, {
    //   value: value,
    //   language: language,
    //   theme: theme,
    //   'semanticHighlighting.enabled': true,
    //   selectOnLineNumbers: true,
    //   autoIndent: 'full',
    //   ...props.options,
    // });

    const _editor = createEditor({
      element,
      value,
      theme,
      style,
      language,
      options: { ...props.options },
    });

    //setFirstTime(false);
    //setEditor(_editor);

    // ========== Setup events ========== //
    // On change
    _editor.onDidChangeModelContent(() => onChange(_editor.getValue()));
    // On load
    props.onLoad(_editor);
    if (ref) ref.current = _editor;

    editor.current = _editor;
  }, []);

  // On change Theme
  React.useEffect(() => {
    monaco.editor.setTheme(theme);
  }, [theme]);

  // On change Language
  React.useEffect(() => {
    if (editor.current) {
      const model = editor.current.getModel();
      monaco.editor.setModelLanguage(model, language);
    }
  }, [language]);

  return (
    <div
      style={{ ...style, maxHeight: '100%', maxWidth: '100%' }}
      className='mov-ai-monaco-code-editor'
      ref={editorRef}></div>
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
  value: '',
  theme: 'vs-dark',
  language: 'python',
  options: {},
  onChange: () => {},
  onLoad: () => {},
  style: { display: 'flex', flexDirection: 'column', flexGrow: 1 },
};

export default MonacoCodeEditor;
