
import * as monaco from 'monaco-editor';
import { renderHook } from '@testing-library/react-hooks';
import useMonacoEditor from './useMonacoEditor';

describe('useMonacoEditor', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should create editor with given props', () => {
    const { result } = renderHook(() => useMonacoEditor());
    const props = {
      element: document.createElement('div'),
      value: 'console.log("Hello, world!");',
      language: 'javascript',
      theme: 'vs-dark',
      options: {},
      disableMinimap: false
    };

    result.current.createEditor(props);

    expect(monaco.editor.create).toHaveBeenCalledWith(props.element, {
      value: props.value,
      language: props.language,
      theme: props.theme,
      'semanticHighlighting.enabled': true,
      selectOnLineNumbers: true,
      autoIndent: 'full',
      lineNumbers: 'on',
      overviewRulerBorder: true,
      overviewRulerLanes: 3,
      minimap: {
        enabled: true
      },
      ...props.options
    });
  });

  it('should disable minimap and overview ruler when disableMinimap is true', () => {
    const { result } = renderHook(() => useMonacoEditor());
    const props = {
      element: document.createElement('div'),
      value: 'console.log("Hello, world!");',
      language: 'javascript',
      theme: 'vs-dark',
      options: {},
      disableMinimap: true
    };

    result.current.createEditor(props);

    expect(monaco.editor.create).toHaveBeenCalledWith(props.element, {
      value: props.value,
      language: props.language,
      theme: props.theme,
      'semanticHighlighting.enabled': true,
      selectOnLineNumbers: true,
      autoIndent: 'full',
      lineNumbers: 'off',
      overviewRulerBorder: false,
      overviewRulerLanes: 0,
      minimap: {
        enabled: false
      },
      ...props.options
    });
  });
});
