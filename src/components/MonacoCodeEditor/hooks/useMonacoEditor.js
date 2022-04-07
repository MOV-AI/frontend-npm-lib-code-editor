import * as monaco from 'monaco-editor';

const useMonacoEditor = () => {
  /**
   * Create editor
   * @param {{element: HTMLElement, value: string, language: string, theme: string, options: object, disableMinimap: boolean}} props
   *  Props to be used to compose editor
   * @returns Monaco Editor object
   */
  const createEditor = (props) => {
    const { element, value, language, theme, options, disableMinimap } = props;

    return monaco.editor.create(element, {
      value: value,
      language: language,
      theme: theme,
      'semanticHighlighting.enabled': true,
      selectOnLineNumbers: true,
      autoIndent: 'full',
      lineNumbers: disableMinimap ? 'off' : 'on',
      overviewRulerBorder: !disableMinimap,
      overviewRulerLanes: disableMinimap ? 0 : 3,
      minimap: {
        enabled: !disableMinimap,
      },
      ...options,
    });
  };

  return { createEditor };
};

export default useMonacoEditor;
