import React, { createRef, useRef } from "react";
import PropTypes from "prop-types";
import "./MonacoCodeEditor.css";
import * as monaco from "monaco-editor";
import { MenuRegistry } from "monaco-editor/esm/vs/platform/actions/common/actions";

const createEditor = ({ element, value, language, theme, options }) =>
  monaco.editor.create(element, {
    value: value,
    language: language,
    theme: theme,
    "semanticHighlighting.enabled": true,
    selectOnLineNumbers: true,
    autoIndent: "full",
    ...options,
  });

const MonacoCodeEditor = React.forwardRef((props, ref) => {
  // Refs
  const editorRef = createRef();
  const editor = useRef(null);

  // Props
  const value = props.value;
  const theme = props.theme;
  const style = props.style;
  const actions = props.actions;
  const onSave = props.onSave;
  const language = props.language;
  const onChange = props.onChange;

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
    if (ref) ref.current = _editor;
    editor.current = _editor;
  }, []);

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

  /**
   * On update save function
   */
  React.useEffect(() => {
    const saveAction = editor.current.getAction("save");
    // Remove previous save action (if existing)
    if (saveAction) {
      const menuItems = MenuRegistry._menuItems;
      const contextMenuEntry = [...menuItems].find(
        (entry) => entry[0]._debugName == "EditorContext"
      );
      const contextMenuLinks = contextMenuEntry[1];
      removeAction(contextMenuLinks, saveAction.id);
    }
    // Add new save action
    if (onSave)
      editor.current.addAction({
        id: "save",
        label: "Save",
        keybindings: [
          monaco.KeyMod.chord(monaco.KeyMod.CtrlCmd | monaco.KeyCode.KEY_S),
        ],
        precondition: null,
        keybindingContext: null,
        contextMenuGroupId: "navigation",
        contextMenuOrder: 1,
        run: onSave,
      });
  }, [onSave]);

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
  value: PropTypes.string,
  style: PropTypes.object,
};

MonacoCodeEditor.defaultProps = {
  value: "",
  theme: "vs-dark",
  language: "python",
  options: {},
  actions: [],
  onChange: () => {},
  onLoad: () => {},
  style: { display: "flex", flexDirection: "column", flexGrow: 1 },
};

export default MonacoCodeEditor;
