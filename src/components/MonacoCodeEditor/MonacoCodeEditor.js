import * as monaco from "monaco-editor-core";
import { MenuRegistry } from "monaco-editor/esm/vs/platform/actions/common/actions";
import PropTypes from "prop-types";
import React, { createRef, useRef } from "react";
import useMonacoEditor from "./hooks/useMonacoEditor";
import useMonacoEditorServer from "./hooks/useMonacoEditorCore";
import "./MonacoCodeEditor.css";

const MonacoCodeEditor = React.forwardRef((props, ref) => {
  // Refs
  const editorRef = createRef();
  const debounceRef = useRef(null);
  const editor = useRef(null);
  // Props

  const {
    value,
    theme,
    style,
    actions,
    language,
    onChange,
    disableMinimap,
    useLanguageServer,
    builtins,
  } = props;
  // Hooks
  const { createEditor } = useLanguageServer
    ? useMonacoEditorServer()
    : useMonacoEditor();

  //========================================================================================
  /*                                                                                      *
   *                                   React callbacks                                    *
   *                                                                                      */
  //========================================================================================

  /**
   * Remove editor action by id
   * @param {ContextMenuEntry} list : Menu entry array (defined in monaco)
   * @param {String} id : Action ID
   */
  const removeAction = React.useCallback((list, id) => {
    let node = list._first;
    do {
      let shouldRemove = id === node.element?.command?.id;
      if (shouldRemove) {
        list._remove(node);
      }
    } while ((node = node.next));
  }, []);

  //========================================================================================
  /*                                                                                      *
   *                                   React lifecycles                                   *
   *                                                                                      */
  //========================================================================================

  /**
   * On component did mount
   */
  React.useEffect(() => {
    const element = editorRef.current;
    const _editor = createEditor({
      element,
      value,
      theme,
      style,
      language,
      disableMinimap,
      builtins,
      options: { ...props.options },
    });

    // ========== Setup events ========== //
    // On change
    _editor.onDidChangeModelContent(() => onChange(_editor.getValue()));
    // On load
    props.onLoad(_editor);
    // Add more custom actions
    actions.forEach((action) => {
      _editor.addAction(action);
    });
    // rerender editor on resize
    const resizeObserver = new ResizeObserver(() => _editor.layout());
    resizeObserver.observe(editorRef.current);
    // Set editor ref
    if (ref) ref.current = _editor;
    editor.current = _editor;
  }, []);

  /**
   * On change Code
   */
  React.useEffect(() => {
    clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => {
      const currentValue = editor.current?.getValue();
      if (editor.current && currentValue !== value) {
        editor.current.setValue(value);
      }
    }, 100);
  }, [value]);

  /**
   * On change Theme
   */
  React.useEffect(() => {
    monaco.editor.setTheme(theme);
  }, [theme]);

  /**
   * On change Language
   */
  React.useEffect(() => {
    if (editor.current) {
      const model = editor.current.getModel();
      monaco.editor.setModelLanguage(model, language);
    }
  }, [language]);

  //========================================================================================
  /*                                                                                      *
   *                                   Render Functions                                   *
   *                                                                                      */
  //========================================================================================

  return (
    <div
      style={{ ...style, maxHeight: "100%", maxWidth: "100%" }}
      className="mov-ai-monaco-code-editor"
      ref={editorRef}
    ></div>
  );
});

MonacoCodeEditor.propTypes = {
  theme: PropTypes.string,
  language: PropTypes.string,
  onChange: PropTypes.func,
  onLoad: PropTypes.func,
  options: PropTypes.object,
  disableMinimap: PropTypes.bool,
  value: PropTypes.string,
  style: PropTypes.object,
  useLanguageServer: PropTypes.bool,
  builtins: PropTypes.object,
};

MonacoCodeEditor.defaultProps = {
  value: "",
  theme: "vs-dark",
  language: "python",
  options: {},
  actions: [],
  onChange: () => {
    /*  empty on purpose */
  },
  onLoad: () => {
    /* empty on purpose */
  },
  disableMinimap: false,
  style: { display: "flex", flexDirection: "column", flexGrow: 1 },
  useLanguageServer: false,
  builtins: [],
};

export default MonacoCodeEditor;
