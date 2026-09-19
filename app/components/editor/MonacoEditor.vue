<template>
  <div ref="editorContainer" class="monaco-editor-container" />
</template>

<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount, watch, shallowRef } from 'vue'
import loader from '@monaco-editor/loader'

const props = withDefaults(defineProps<{
  modelValue?: string
  language?: string
  readOnly?: boolean
  minimap?: boolean
  fontSize?: number
}>(), {
  modelValue: '',
  language: 'python',
  readOnly: false,
  minimap: false,
  fontSize: 15,
})

const emit = defineEmits<{
  'update:modelValue': [value: string]
}>()

const editorContainer = ref<HTMLElement | null>(null)
const editor = shallowRef<any>(null)

onMounted(async () => {
  const monaco = await loader.init()

  // Define Mirio dark theme
  monaco.editor.defineTheme('mirio-dark', {
    base: 'vs-dark',
    inherit: true,
    rules: [
      { token: 'comment', foreground: '5C7A6E', fontStyle: 'italic' },
      { token: 'keyword', foreground: '00E699', fontStyle: 'bold' },
      { token: 'string', foreground: '38BDF8' },
      { token: 'number', foreground: 'F59E0B' },
      { token: 'type', foreground: 'A855F7' },
      { token: 'function', foreground: 'EC4899' },
      { token: 'variable', foreground: 'E0F0EA' },
      { token: 'operator', foreground: '00FFA6' },
      { token: 'delimiter', foreground: '8E9E98' },
      { token: 'identifier', foreground: 'E0F0EA' },
    ],
    colors: {
      'editor.background': '#060E0B',
      'editor.foreground': '#E0F0EA',
      'editor.lineHighlightBackground': '#0A1A14',
      'editor.selectionBackground': '#00E69933',
      'editor.inactiveSelectionBackground': '#00E69918',
      'editorLineNumber.foreground': '#3D5A4E',
      'editorLineNumber.activeForeground': '#00E699',
      'editorCursor.foreground': '#00E699',
      'editor.selectionHighlightBackground': '#00E69920',
      'editorIndentGuide.background': '#1A2E26',
      'editorIndentGuide.activeBackground': '#2A4A3C',
      'editorWidget.background': '#081410',
      'editorWidget.border': '#00E69940',
      'editorSuggestWidget.background': '#081410',
      'editorSuggestWidget.border': '#00E69930',
      'editorSuggestWidget.selectedBackground': '#00E69920',
      'editorHoverWidget.background': '#081410',
      'editorHoverWidget.border': '#00E69930',
      'scrollbar.shadow': '#00000000',
      'scrollbarSlider.background': '#00E69920',
      'scrollbarSlider.hoverBackground': '#00E69940',
      'scrollbarSlider.activeBackground': '#00E69960',
    },
  })

  if (editorContainer.value) {
    editor.value = monaco.editor.create(editorContainer.value, {
      value: props.modelValue,
      language: props.language,
      theme: 'mirio-dark',
      readOnly: props.readOnly,
      minimap: { enabled: props.minimap },
      fontSize: props.fontSize,
      fontFamily: "'JetBrains Mono', 'Fira Code', 'Cascadia Code', 'Consolas', monospace",
      fontLigatures: true,
      lineNumbers: 'on',
      roundedSelection: true,
      scrollBeyondLastLine: false,
      automaticLayout: true,
      padding: { top: 16, bottom: 16 },
      cursorBlinking: 'smooth',
      cursorSmoothCaretAnimation: 'on',
      smoothScrolling: true,
      renderLineHighlight: 'all',
      bracketPairColorization: { enabled: true },
      tabSize: 4,
      insertSpaces: true,
      wordWrap: 'on',
      suggest: {
        showKeywords: true,
        showSnippets: true,
      },
      overviewRulerLanes: 0,
      hideCursorInOverviewRuler: true,
      overviewRulerBorder: false,
      contextmenu: true,
      formatOnPaste: true,
    })

    editor.value.onDidChangeModelContent(() => {
      const value = editor.value?.getValue() || ''
      emit('update:modelValue', value)
    })
  }
})

watch(() => props.modelValue, (newVal) => {
  if (editor.value && editor.value.getValue() !== newVal) {
    editor.value.setValue(newVal || '')
  }
})

watch(() => props.language, (newLang) => {
  if (editor.value) {
    const monaco = (window as any).monaco
    if (monaco) {
      const model = editor.value.getModel()
      if (model) {
        monaco.editor.setModelLanguage(model, newLang)
      }
    }
  }
})

onBeforeUnmount(() => {
  editor.value?.dispose()
})
</script>

<style scoped>
.monaco-editor-container {
  width: 100%;
  height: 100%;
  min-height: 200px;
  border-radius: 12px;
  overflow: hidden;
}

@media (max-width: 600px) {
  .monaco-editor-container {
    min-height: 150px;
    border-radius: 8px;
  }
}

@media (max-width: 400px) {
  .monaco-editor-container {
    min-height: 120px;
  }
}
</style>
