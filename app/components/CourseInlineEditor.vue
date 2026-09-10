<template>
  <div :class="['inline-editor-wrapper', `lang-${language}`]">
    <!-- Header -->
    <div class="inline-editor-header">
      <div class="inline-editor-tab">
        <img v-if="language === 'python'" src="/images/python/python-snakes-icon.png" class="inline-py-icon" alt="" />
        <v-icon v-else :icon="langIcon" size="15" :color="langColor" />
        <span>{{ filename }}</span>
      </div>
      <div class="inline-editor-actions">
        <button class="ie-action-btn run-action" @click="runCode" :disabled="isRunning">
          <v-icon :icon="isRunning ? 'mdi-loading' : 'mdi-play'" size="15" :class="{ 'spin': isRunning }" />
          <span>{{ isRunning ? 'Ejecutando…' : 'Ejecutar' }}</span>
        </button>
        <button class="ie-action-btn" @click="resetCode" title="Reiniciar código">
          <v-icon icon="mdi-refresh" size="15" />
        </button>
        <button class="ie-action-btn" @click="copyCode" :title="copied ? 'Copiado' : 'Copiar código'">
          <v-icon :icon="copied ? 'mdi-check' : 'mdi-content-copy'" size="15" />
        </button>
      </div>
    </div>

    <!-- Monaco Editor -->
    <div class="inline-editor-body" :style="{ height: editorHeight + 'px' }">
      <ClientOnly>
        <MonacoEditor
          v-model="localCode"
          :language="language"
          :fontSize="13"
        />
        <template #fallback>
          <div class="inline-editor-loading">
            <v-progress-circular indeterminate color="#00E699" size="24" width="2" />
            <span>Cargando editor…</span>
          </div>
        </template>
      </ClientOnly>
    </div>

    <!-- Console Output -->
    <Transition name="console-slide">
      <div v-if="showConsole" class="inline-console">
        <div class="inline-console-header">
          <div class="console-title-row">
            <v-icon icon="mdi-console" size="14" />
            <span>Salida</span>
            <span :class="['inline-status', isRunning ? 'running' : output.length ? 'done' : 'idle']" />
          </div>
          <button class="ie-action-btn" @click="clearOutput" title="Limpiar consola">
            <v-icon icon="mdi-close" size="14" />
          </button>
        </div>
        <div class="inline-console-body">
          <div
            v-for="(line, i) in output"
            :key="i"
            :class="['output-line', `line-${line.type}`]"
          >
            <span class="out-prefix">{{ line.type === 'error' ? '✗' : '›' }}</span>
            <span>{{ line.text }}</span>
          </div>
          <div v-if="isRunning" class="output-running">
            <v-progress-circular indeterminate color="#00E699" size="12" width="2" />
            <span>Ejecutando…</span>
          </div>
        </div>
      </div>
    </Transition>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch } from 'vue'

const props = withDefaults(defineProps<{
  initialCode?: string
  language?: 'python' | 'javascript'
  height?: number
}>(), {
  initialCode: '',
  language: 'python',
  height: 180,
})

const localCode = ref(props.initialCode)
const isRunning = ref(false)
const showConsole = ref(false)
const copied = ref(false)

interface OutputLine {
  type: 'output' | 'error'
  text: string
}

const output = ref<OutputLine[]>([])

const editorHeight = computed(() => props.height)

const langIcon = computed(() =>
  props.language === 'python' ? 'mdi-language-python' : 'mdi-language-javascript'
)

const langColor = computed(() =>
  props.language === 'python' ? '#38BDF8' : '#F59E0B'
)

const filename = computed(() =>
  props.language === 'python' ? 'main.py' : 'main.js'
)

// Watch for initialCode changes
watch(() => props.initialCode, (val) => {
  localCode.value = val
})

// ---- Run Code ----
let pyodide: any = null

const runCode = async () => {
  if (isRunning.value) return
  isRunning.value = true
  output.value = []
  showConsole.value = true

  try {
    if (props.language === 'javascript') {
      await runJavaScript()
    } else {
      await runPython()
    }
  } catch (err: any) {
    output.value.push({ type: 'error', text: err.message || String(err) })
  }

  isRunning.value = false
}

const runJavaScript = async () => {
  const logs: OutputLine[] = []

  // Override console.log temporarily
  const originalLog = console.log
  const originalError = console.error
  const originalWarn = console.warn

  const captureLog = (...args: any[]) => {
    const text = args.map(a => {
      if (typeof a === 'object') return JSON.stringify(a, null, 2)
      return String(a)
    }).join(' ')
    logs.push({ type: 'output', text })
  }

  const captureError = (...args: any[]) => {
    logs.push({ type: 'error', text: args.map(String).join(' ') })
  }

  try {
    console.log = captureLog
    console.error = captureError
    console.warn = captureLog

    // Use Function constructor for safer execution
    const fn = new Function(localCode.value)
    fn()
  } catch (err: any) {
    logs.push({ type: 'error', text: err.message || String(err) })
  } finally {
    console.log = originalLog
    console.error = originalError
    console.warn = originalWarn
  }

  output.value = logs
}

const runPython = async () => {
  try {
    // Load Pyodide if not loaded
    if (!pyodide) {
      output.value.push({ type: 'output', text: '⚙ Cargando Python…' })

      if (!(window as any).loadPyodide) {
        const script = document.createElement('script')
        script.src = 'https://cdn.jsdelivr.net/pyodide/v0.27.5/full/pyodide.js'
        document.head.appendChild(script)
        await new Promise<void>((resolve, reject) => {
          script.onload = () => resolve()
          script.onerror = () => reject(new Error('No se pudo cargar Python'))
        })
      }

      pyodide = await (window as any).loadPyodide({
        indexURL: 'https://cdn.jsdelivr.net/pyodide/v0.27.5/full/',
      })
      output.value = []
    }

    // Reset streams
    pyodide.runPython(`
import sys
from io import StringIO
sys.stdout = StringIO()
sys.stderr = StringIO()
`)

    try {
      pyodide.runPython(localCode.value)
    } catch (err: any) {
      const errorMsg = err.message || String(err)
      const lines = errorMsg.split('\n')
      const pythonError = lines.filter((l: string) =>
        !l.includes('at ') && !l.includes('pyodide') && l.trim()
      ).join('\n') || errorMsg
      output.value.push({ type: 'error', text: pythonError })
    }

    const stdout = pyodide.runPython('sys.stdout.getvalue()')
    if (stdout) {
      stdout.split('\n').forEach((line: string) => {
        if (line !== '') output.value.push({ type: 'output', text: line })
      })
    }

    const stderr = pyodide.runPython('sys.stderr.getvalue()')
    if (stderr) {
      output.value.push({ type: 'error', text: stderr })
    }

    pyodide.runPython(`
import sys
from io import StringIO
sys.stdout = StringIO()
sys.stderr = StringIO()
`)
  } catch (err: any) {
    if (!output.value.some(l => l.type === 'error')) {
      output.value.push({ type: 'error', text: `Error: ${err.message || err}` })
    }
  }
}

const resetCode = () => {
  localCode.value = props.initialCode
  output.value = []
  showConsole.value = false
}

const clearOutput = () => {
  output.value = []
  showConsole.value = false
}

const copyCode = async () => {
  try {
    await navigator.clipboard.writeText(localCode.value)
    copied.value = true
    setTimeout(() => { copied.value = false }, 2000)
  } catch {}
}
</script>

<style scoped>
.inline-editor-wrapper {
  border-radius: 14px;
  overflow: hidden;
  border: 1px solid rgba(0, 230, 153, 0.15);
  background: #060E0B;
  margin-top: 0.5rem;
}

.inline-editor-wrapper.lang-python {
  border-color: rgba(56, 189, 248, 0.28);
  background: #050D21;
}

.inline-editor-wrapper.lang-python .inline-editor-header {
  background: rgba(14, 34, 82, 0.6);
  border-bottom-color: rgba(56, 189, 248, 0.2);
}

.inline-editor-wrapper.lang-python .inline-editor-tab {
  background: rgba(56, 189, 248, 0.12);
  color: #BAE6FD;
}

.inline-editor-wrapper.lang-python .run-action {
  background: rgba(56, 189, 248, 0.18) !important;
  border-color: rgba(56, 189, 248, 0.4) !important;
  color: #38BDF8 !important;
}

.inline-editor-wrapper.lang-python .run-action:hover {
  background: #38BDF8 !important;
  color: #03122A !important;
}

.inline-editor-wrapper.lang-python .ie-action-btn:hover {
  border-color: rgba(56, 189, 248, 0.4);
  color: #38BDF8;
}

.inline-py-icon {
  width: 15px;
  height: 15px;
  object-fit: contain;
}

/* Header */
.inline-editor-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0.4rem 0.65rem;
  background: rgba(0, 230, 153, 0.05);
  border-bottom: 1px solid rgba(0, 230, 153, 0.08);
}

.inline-editor-tab {
  display: flex;
  align-items: center;
  gap: 0.35rem;
  font-size: 0.75rem;
  font-weight: 700;
  color: #C3D1CB;
  padding: 0.2rem 0.5rem;
  background: rgba(0, 230, 153, 0.06);
  border-radius: 6px;
}

.inline-editor-actions {
  display: flex;
  align-items: center;
  gap: 0.3rem;
}

.ie-action-btn {
  display: flex;
  align-items: center;
  gap: 0.3rem;
  padding: 0.25rem 0.5rem;
  border-radius: 7px;
  font-size: 0.72rem;
  font-weight: 600;
  color: #8E9E98;
  background: rgba(255, 255, 255, 0.04);
  border: 1px solid rgba(255, 255, 255, 0.06);
  cursor: pointer;
  transition: all 0.2s;
}

.ie-action-btn:hover {
  background: rgba(0, 230, 153, 0.08);
  color: #00E699;
  border-color: rgba(0, 230, 153, 0.2);
}

.ie-action-btn:disabled {
  opacity: 0.5;
  cursor: default;
}

.run-action {
  background: rgba(0, 230, 153, 0.1) !important;
  border-color: rgba(0, 230, 153, 0.25) !important;
  color: #00E699 !important;
}

.run-action:hover:not(:disabled) {
  background: rgba(0, 230, 153, 0.2) !important;
  box-shadow: 0 0 10px rgba(0, 230, 153, 0.2);
}

.spin {
  animation: spinAnim 1s linear infinite;
}

@keyframes spinAnim {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}

/* Editor body */
.inline-editor-body {
  width: 100%;
  overflow: hidden;
}

.inline-editor-loading {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.6rem;
  height: 100%;
  color: #5C6E67;
  font-size: 0.8rem;
}

/* Console */
.inline-console {
  border-top: 1px solid rgba(0, 230, 153, 0.1);
}

.inline-console-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0.35rem 0.65rem;
  background: rgba(0, 0, 0, 0.2);
}

.console-title-row {
  display: flex;
  align-items: center;
  gap: 0.35rem;
  font-size: 0.72rem;
  font-weight: 600;
  color: #8E9E98;
}

.inline-status {
  width: 5px;
  height: 5px;
  border-radius: 50%;
  margin-left: 0.25rem;
}

.inline-status.idle { background: #3D5A4E; }
.inline-status.running { background: #F59E0B; animation: pulse 1s infinite; }
.inline-status.done { background: #00E699; }

@keyframes pulse {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.4; }
}

.inline-console-body {
  padding: 0.5rem 0.75rem;
  max-height: 150px;
  overflow-y: auto;
  font-family: 'JetBrains Mono', 'Fira Code', monospace;
  font-size: 0.78rem;
  line-height: 1.55;
  scrollbar-width: thin;
  scrollbar-color: #1A2E26 transparent;
}

.output-line {
  display: flex;
  gap: 0.4rem;
  margin-bottom: 0.15rem;
  animation: lineIn 0.12s ease-out;
}

@keyframes lineIn {
  from { opacity: 0; transform: translateY(3px); }
  to { opacity: 1; transform: translateY(0); }
}

.out-prefix {
  flex-shrink: 0;
  width: 14px;
  text-align: center;
}

.line-output .out-prefix { color: #00E699; }
.line-output span { color: #E0F0EA; }

.line-error .out-prefix { color: #F87171; }
.line-error span { color: #FCA5A5; }

.output-running {
  display: flex;
  align-items: center;
  gap: 0.4rem;
  color: #5C6E67;
  font-size: 0.75rem;
  font-style: italic;
}

/* Console transition */
.console-slide-enter-active { transition: all 0.2s ease-out; }
.console-slide-leave-active { transition: all 0.15s ease-in; }
.console-slide-enter-from,
.console-slide-leave-to {
  opacity: 0;
  max-height: 0;
}

@media (max-width: 600px) {
  .inline-editor-wrapper {
    border-radius: 10px;
  }
  .inline-editor-header {
    padding: 0.3rem 0.5rem;
    flex-wrap: wrap;
    gap: 0.3rem;
  }
  .inline-editor-tab {
    font-size: 0.68rem;
    padding: 0.15rem 0.35rem;
  }
  .ie-action-btn {
    font-size: 0.65rem;
    padding: 0.2rem 0.35rem;
  }
  .ie-action-btn span {
    display: none;
  }
  .run-action span {
    display: inline;
  }
  .inline-console-body {
    padding: 0.4rem 0.5rem;
    font-size: 0.72rem;
    max-height: 120px;
  }
}

@media (max-width: 400px) {
  .inline-editor-wrapper {
    border-radius: 8px;
  }
  .inline-editor-header {
    padding: 0.25rem 0.4rem;
  }
}
</style>
