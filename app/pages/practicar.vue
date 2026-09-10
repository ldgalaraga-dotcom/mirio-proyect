<template>
  <div class="practice-page">
    <!-- ======================================================= -->
    <!-- TOP BAR                                                  -->
    <!-- ======================================================= -->
    <header class="practice-topbar">
      <div class="topbar-left">
        <NuxtLink to="/" class="back-btn" aria-label="Volver al inicio">
          <v-icon icon="mdi-arrow-left" size="20" />
        </NuxtLink>
        <div class="topbar-brand">
          <img src="/images/mirio-logo.png" alt="Mirio" class="topbar-logo" />
        </div>
        <div class="topbar-divider" />
        <span class="topbar-mode">
          <v-icon icon="mdi-code-tags" size="18" color="#00E699" />
          Modo Práctica
        </span>
      </div>

      <div class="topbar-center">
        <!-- Exercise selector -->
        <button
          class="exercise-selector-btn"
          @click="showExercisePanel = !showExercisePanel"
        >
          <v-icon icon="mdi-puzzle-outline" size="18" />
          <span class="exercise-selector-text">{{ currentExercise?.titulo || 'Seleccionar ejercicio' }}</span>
          <v-icon :icon="showExercisePanel ? 'mdi-chevron-up' : 'mdi-chevron-down'" size="16" />
        </button>
      </div>

      <div class="topbar-right">
        <v-btn
          color="#00E699"
          rounded="lg"
          class="run-btn"
          :loading="isRunning"
          :disabled="isRunning"
          prepend-icon="mdi-play"
          @click="runCode"
        >
          Ejecutar
        </v-btn>
        <v-btn
          variant="outlined"
          rounded="lg"
          class="clear-btn"
          prepend-icon="mdi-broom"
          @click="clearConsole"
        >
          Limpiar
        </v-btn>
        <v-btn
          icon
          variant="flat"
          class="reset-btn"
          aria-label="Reiniciar código"
          @click="resetCode"
        >
          <v-icon icon="mdi-refresh" size="20" />
        </v-btn>
      </div>
    </header>

    <!-- ======================================================= -->
    <!-- EXERCISE SELECTOR PANEL (OVERLAY)                       -->
    <!-- ======================================================= -->
    <Transition name="slide-panel">
      <div v-if="showExercisePanel" class="exercise-panel-overlay">
        <div class="exercise-panel-backdrop" @click="showExercisePanel = false" />
        <div class="exercise-panel">
          <div class="exercise-panel-header">
            <h3>
              <v-icon icon="mdi-puzzle-outline" size="20" color="#00E699" />
              Ejercicios del Curso de Python
            </h3>
            <button class="panel-close-btn" @click="showExercisePanel = false">
              <v-icon icon="mdi-close" size="20" />
            </button>
          </div>

          <div class="exercise-panel-body">
            <div
              v-for="nivel in exercisesByNivel"
              :key="nivel.nombre"
              class="exercise-nivel-group"
            >
              <h4 class="nivel-group-title">
                <v-icon :icon="nivel.nombre === 'Básico' ? 'mdi-sprout' : 'mdi-rocket-launch-outline'" size="16" />
                Nivel {{ nivel.nombre }}
              </h4>

              <div
                v-for="item in nivel.items"
                :key="item.id"
                :class="['exercise-item', { 'is-active': currentExerciseId === item.id }]"
                @click="selectExercise(item)"
              >
                <div class="exercise-item-left">
                  <span :class="['dif-dot', `dif-${item.dificultad}`]" />
                  <div>
                    <span class="exercise-item-title">{{ item.titulo }}</span>
                    <span class="exercise-item-source">{{ item.moduloTitulo }} · {{ item.leccionTitulo }}</span>
                  </div>
                </div>
                <span :class="['dif-label', `dif-label-${item.dificultad}`]">{{ item.dificultad }}</span>
              </div>
            </div>

            <!-- Free coding option -->
            <div class="exercise-nivel-group">
              <h4 class="nivel-group-title">
                <v-icon icon="mdi-code-braces" size="16" />
                Código Libre
              </h4>
              <div
                :class="['exercise-item', { 'is-active': currentExerciseId === 'free' }]"
                @click="selectFreeMode"
              >
                <div class="exercise-item-left">
                  <span class="dif-dot dif-free" />
                  <div>
                    <span class="exercise-item-title">Editor libre</span>
                    <span class="exercise-item-source">Escribe cualquier código Python</span>
                  </div>
                </div>
                <v-icon icon="mdi-pencil" size="16" color="#00E699" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </Transition>

    <!-- ======================================================= -->
    <!-- MAIN EDITOR LAYOUT                                      -->
    <!-- ======================================================= -->
    <div class="editor-layout">
      <!-- LEFT SIDE: Exercise Info + Editor -->
      <div class="editor-main-col">
        <!-- Exercise description bar -->
        <div v-if="currentExercise" class="exercise-info-bar">
          <div class="exercise-info-header">
            <div class="exercise-info-left">
              <span :class="['dif-badge', `dif-badge-${currentExercise.dificultad}`]">
                {{ currentExercise.dificultad }}
              </span>
              <h3 class="exercise-info-title">{{ currentExercise.titulo }}</h3>
            </div>
            <button class="toggle-info-btn" @click="showExerciseInfo = !showExerciseInfo">
              <v-icon :icon="showExerciseInfo ? 'mdi-chevron-up' : 'mdi-chevron-down'" size="18" />
            </button>
          </div>

          <Transition name="slide-info">
            <div v-if="showExerciseInfo" class="exercise-info-body">
              <p class="exercise-enunciado">{{ currentExercise.enunciado }}</p>
              <div v-if="currentExercise.entradaEjemplo || currentExercise.salidaEsperada" class="exercise-io-section">
                <div v-if="currentExercise.entradaEjemplo" class="io-example">
                  <span class="io-label">
                    <v-icon icon="mdi-import" size="14" /> Entrada ejemplo
                  </span>
                  <code>{{ currentExercise.entradaEjemplo }}</code>
                </div>
                <div v-if="currentExercise.salidaEsperada" class="io-example">
                  <span class="io-label">
                    <v-icon icon="mdi-export" size="14" /> Salida esperada
                  </span>
                  <code>{{ currentExercise.salidaEsperada }}</code>
                </div>
              </div>
            </div>
          </Transition>
        </div>

        <!-- Monaco Editor -->
        <div class="editor-wrapper">
          <div class="editor-tab-bar">
            <div class="editor-tab active">
              <v-icon icon="mdi-language-python" size="16" color="#00E699" />
              <span>main.py</span>
            </div>
            <div class="editor-tab-actions">
              <span class="editor-lang-label">Python</span>
              <span class="editor-status-dot" />
            </div>
          </div>
          <div class="editor-body">
            <ClientOnly>
              <MonacoEditor
                v-model="code"
                language="python"
                :fontSize="14"
              />
              <template #fallback>
                <div class="editor-loading">
                  <v-progress-circular indeterminate color="#00E699" size="36" />
                  <span>Cargando editor VS Code…</span>
                </div>
              </template>
            </ClientOnly>
          </div>
        </div>
      </div>

      <!-- RIGHT SIDE: Console Output -->
      <div class="console-col">
        <div class="console-wrapper">
          <div class="console-tab-bar">
            <div class="console-tab active">
              <v-icon icon="mdi-console" size="16" />
              <span>Consola</span>
            </div>
            <div class="console-tab" @click="activeConsoleTab = 'input'">
              <v-icon icon="mdi-keyboard-outline" size="16" />
              <span>Entrada</span>
            </div>
            <div class="console-status">
              <span :class="['status-indicator', isRunning ? 'running' : consoleOutput.length ? 'done' : 'idle']" />
              <span>{{ isRunning ? 'Ejecutando…' : consoleOutput.length ? 'Completado' : 'Listo' }}</span>
            </div>
          </div>

          <div class="console-body" ref="consoleBody">
            <!-- Welcome message -->
            <div v-if="!consoleOutput.length && !isRunning" class="console-welcome">
              <v-icon icon="mdi-robot-happy-outline" size="48" color="#1A3A2E" />
              <p>Presiona <kbd>Ejecutar</kbd> o <kbd>Ctrl+Enter</kbd> para correr tu código Python</p>
              <div class="console-shortcuts">
                <span><kbd>Ctrl</kbd>+<kbd>Enter</kbd> Ejecutar</span>
                <span><kbd>Ctrl</kbd>+<kbd>L</kbd> Limpiar consola</span>
              </div>
            </div>

            <!-- Output lines -->
            <div v-for="(line, i) in consoleOutput" :key="i" :class="['console-line', `line-${line.type}`]">
              <span class="line-prefix">{{ line.type === 'error' ? '✗' : line.type === 'system' ? '⚙' : '›' }}</span>
              <span class="line-content" v-html="line.text" />
            </div>

            <!-- Running indicator -->
            <div v-if="isRunning" class="console-running">
              <v-progress-circular indeterminate color="#00E699" size="16" width="2" />
              <span>Ejecutando código Python…</span>
            </div>
          </div>

          <!-- Input area for stdin -->
          <div class="console-input-bar">
            <v-icon icon="mdi-chevron-right" size="16" color="#00E699" />
            <input
              v-model="stdinInput"
              type="text"
              class="console-stdin"
              placeholder="Entrada de datos (input)…"
              @keydown.enter="submitInput"
            />
            <button class="stdin-send-btn" @click="submitInput" :disabled="!stdinInput">
              <v-icon icon="mdi-send" size="16" />
            </button>
          </div>
        </div>

        <!-- Quick Tips Card -->
        <div class="tips-card">
          <div class="tips-header">
            <v-icon icon="mdi-lightbulb-on-outline" size="18" color="#F59E0B" />
            <span>Consejo rápido</span>
          </div>
          <p class="tips-text">{{ currentTip }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onBeforeUnmount, nextTick } from 'vue'
import { cursoPythonPrincipiantes } from '~/data/cursos/curso_python'

// SEO
useHead({
  title: 'Practicar Python — Mirio · Modo Práctica',
  meta: [
    { name: 'description', content: 'Practica Python con un editor de código estilo VS Code integrado directamente en Mirio. Ejecuta código Python en tu navegador.' },
  ],
})

// ---- Exercise Data ----
interface ExerciseItem {
  id: string
  titulo: string
  enunciado: string
  dificultad: string
  entradaEjemplo?: string
  salidaEsperada?: string
  moduloTitulo: string
  leccionTitulo: string
  codigoInicial: string
}

const exercisesByNivel = computed(() => {
  return cursoPythonPrincipiantes.niveles.map(nivel => ({
    nombre: nivel.nombre,
    items: nivel.modulos.flatMap(modulo =>
      modulo.lecciones.flatMap(leccion =>
        leccion.ejercicios.map((ej, i) => ({
          id: `${leccion.id}-ej${i}`,
          titulo: ej.titulo,
          enunciado: ej.enunciado,
          dificultad: ej.dificultad,
          entradaEjemplo: ej.entradaEjemplo,
          salidaEsperada: ej.salidaEsperada,
          moduloTitulo: modulo.titulo,
          leccionTitulo: leccion.titulo,
          codigoInicial: `# Ejercicio: ${ej.titulo}\n# ${ej.enunciado}\n\n# Escribe tu solución aquí:\n\n`,
        }))
      )
    ),
  }))
})

// ---- State ----
const code = ref(`# ¡Bienvenido a Mirio! 🤖
# Editor de Python con VS Code integrado
# Presiona "Ejecutar" para correr tu código

print("¡Hola, Mirio! 🚀")
print("Estoy aprendiendo Python")

nombre = "Estudiante"
print(f"Bienvenido, {nombre}")

# Prueba con operaciones matemáticas
for i in range(1, 6):
    print(f"{i} x 5 = {i * 5}")
`)

const currentExerciseId = ref<string>('free')
const showExercisePanel = ref(false)
const showExerciseInfo = ref(true)
const isRunning = ref(false)
const stdinInput = ref('')
const stdinQueue = ref<string[]>([])
const activeConsoleTab = ref('console')
const consoleBody = ref<HTMLElement | null>(null)

interface ConsoleLine {
  type: 'output' | 'error' | 'system'
  text: string
}

const consoleOutput = ref<ConsoleLine[]>([])

const currentExercise = computed<ExerciseItem | null>(() => {
  if (currentExerciseId.value === 'free') return null
  for (const nivel of exercisesByNivel.value) {
    const found = nivel.items.find(e => e.id === currentExerciseId.value)
    if (found) return found
  }
  return null
})

// ---- Tips ----
const tips = [
  'Usa print() para mostrar resultados en la consola.',
  'Las variables en Python no necesitan declarar su tipo.',
  'Recuerda indentar con 4 espacios dentro de if, for, while.',
  'Usa f-strings para formatear texto: f"Hola {nombre}"',
  'La función input() lee datos del usuario.',
  'Las listas se crean con corchetes: [1, 2, 3]',
  'Un diccionario almacena pares clave-valor: {"nombre": "Ana"}',
  'Usa len() para saber la longitud de una lista o cadena.',
  'El operador // hace división entera, % da el residuo.',
  'Usa try/except para manejar errores en tu código.',
]

const currentTipIndex = ref(0)
const currentTip = computed(() => tips[currentTipIndex.value])

let tipInterval: ReturnType<typeof setInterval> | null = null

onMounted(() => {
  tipInterval = setInterval(() => {
    currentTipIndex.value = (currentTipIndex.value + 1) % tips.length
  }, 8000)

  // Keyboard shortcuts
  window.addEventListener('keydown', handleKeyboard)
})

onBeforeUnmount(() => {
  if (tipInterval) clearInterval(tipInterval)
  window.removeEventListener('keydown', handleKeyboard)
})

const handleKeyboard = (e: KeyboardEvent) => {
  if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
    e.preventDefault()
    runCode()
  }
  if ((e.ctrlKey || e.metaKey) && e.key === 'l') {
    e.preventDefault()
    clearConsole()
  }
}

// ---- Exercise Selection ----
const selectExercise = (item: ExerciseItem) => {
  currentExerciseId.value = item.id
  code.value = item.codigoInicial
  showExercisePanel.value = false
  clearConsole()
}

const selectFreeMode = () => {
  currentExerciseId.value = 'free'
  code.value = `# Modo libre — escribe tu código Python aquí\n\nprint("¡Hola, Mirio!")\n`
  showExercisePanel.value = false
  clearConsole()
}

// ---- Code Execution (Pyodide) ----
let pyodide: any = null
let pyodideLoading = false

const loadPyodide = async () => {
  if (pyodide) return pyodide
  if (pyodideLoading) {
    // Wait for existing load
    while (pyodideLoading) {
      await new Promise(r => setTimeout(r, 100))
    }
    return pyodide
  }

  pyodideLoading = true
  consoleOutput.value.push({ type: 'system', text: '⚙ Cargando Python (primera vez puede tardar unos segundos)…' })

  try {
    // Load Pyodide from CDN
    if (!(window as any).loadPyodide) {
      const script = document.createElement('script')
      script.src = 'https://cdn.jsdelivr.net/pyodide/v0.27.5/full/pyodide.js'
      document.head.appendChild(script)
      await new Promise<void>((resolve, reject) => {
        script.onload = () => resolve()
        script.onerror = () => reject(new Error('Failed to load Pyodide'))
      })
    }

    pyodide = await (window as any).loadPyodide({
      indexURL: 'https://cdn.jsdelivr.net/pyodide/v0.27.5/full/',
    })

    consoleOutput.value.push({ type: 'system', text: '✓ Python cargado correctamente' })
    pyodideLoading = false
    return pyodide
  } catch (err: any) {
    pyodideLoading = false
    consoleOutput.value.push({ type: 'error', text: `✗ Error cargando Python: ${err.message}` })
    throw err
  }
}

const runCode = async () => {
  if (isRunning.value) return
  isRunning.value = true

  // Clear previous output for new run
  consoleOutput.value = []

  try {
    const py = await loadPyodide()

    // Set up stdin from queue
    const inputValues = [...stdinQueue.value]
    let inputIndex = 0

    // Redirect stdout and stdin
    py.runPython(`
import sys
from io import StringIO

class MirioStdout:
    def __init__(self):
        self.buffer = []
    def write(self, text):
        if text and text != '\\n':
            self.buffer.append(text)
        elif text == '\\n' and self.buffer:
            pass
    def flush(self):
        pass

sys.stdout = StringIO()
sys.stderr = StringIO()
`)

    // Handle input() calls
    const inputValues2 = stdinQueue.value.length > 0 ? [...stdinQueue.value] : []
    if (inputValues2.length > 0) {
      const inputStr = inputValues2.join('\n') + '\n'
      py.runPython(`
import sys
from io import StringIO
sys.stdin = StringIO("""${inputStr}""")
`)
    }

    // Run user code
    try {
      py.runPython(code.value)
    } catch (err: any) {
      const errorMsg = err.message || String(err)
      // Extract just the Python error, not the full Pyodide traceback
      const lines = errorMsg.split('\n')
      const pythonError = lines.filter((l: string) =>
        !l.includes('at ') && !l.includes('pyodide') && l.trim()
      ).join('\n') || errorMsg

      consoleOutput.value.push({ type: 'error', text: pythonError })
    }

    // Get stdout
    const stdout = py.runPython('sys.stdout.getvalue()')
    if (stdout) {
      const lines = stdout.split('\n')
      for (const line of lines) {
        if (line !== '') {
          consoleOutput.value.push({ type: 'output', text: escapeHtml(line) })
        }
      }
    }

    // Get stderr
    const stderr = py.runPython('sys.stderr.getvalue()')
    if (stderr) {
      consoleOutput.value.push({ type: 'error', text: escapeHtml(stderr) })
    }

    // Reset streams
    py.runPython(`
import sys
from io import StringIO
sys.stdout = StringIO()
sys.stderr = StringIO()
`)

  } catch (err: any) {
    if (!consoleOutput.value.some(l => l.type === 'error')) {
      consoleOutput.value.push({ type: 'error', text: `Error: ${err.message || err}` })
    }
  }

  isRunning.value = false

  // Scroll console to bottom
  await nextTick()
  if (consoleBody.value) {
    consoleBody.value.scrollTop = consoleBody.value.scrollHeight
  }
}

const clearConsole = () => {
  consoleOutput.value = []
  stdinQueue.value = []
}

const resetCode = () => {
  if (currentExercise.value) {
    code.value = currentExercise.value.codigoInicial
  } else {
    code.value = `# Modo libre — escribe tu código Python aquí\n\nprint("¡Hola, Mirio!")\n`
  }
  clearConsole()
}

const submitInput = () => {
  if (!stdinInput.value) return
  stdinQueue.value.push(stdinInput.value)
  consoleOutput.value.push({ type: 'system', text: `↳ Entrada: ${stdinInput.value}` })
  stdinInput.value = ''
}

const escapeHtml = (text: string) => {
  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
}
</script>

<style scoped>
/* ================================================================ */
/* PAGE LAYOUT                                                      */
/* ================================================================ */
.practice-page {
  height: 100vh;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  background: #040C08;
}

/* ================================================================ */
/* TOP BAR                                                          */
/* ================================================================ */
.practice-topbar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0.5rem 1rem;
  background: #060E0B;
  border-bottom: 1px solid rgba(0, 230, 153, 0.12);
  flex-shrink: 0;
  z-index: 50;
  gap: 0.75rem;
}

.topbar-left {
  display: flex;
  align-items: center;
  gap: 0.6rem;
  flex-shrink: 0;
}

.back-btn {
  width: 36px;
  height: 36px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 10px;
  background: rgba(0, 230, 153, 0.08);
  border: 1px solid rgba(0, 230, 153, 0.15);
  color: #00E699;
  transition: all 0.2s;
  text-decoration: none;
}

.back-btn:hover {
  background: rgba(0, 230, 153, 0.15);
  border-color: #00E699;
}

.topbar-logo {
  height: 34px;
  object-fit: contain;
}

.topbar-divider {
  width: 1px;
  height: 24px;
  background: rgba(0, 230, 153, 0.2);
}

.topbar-mode {
  display: flex;
  align-items: center;
  gap: 0.35rem;
  font-size: 0.85rem;
  font-weight: 700;
  color: #00E699;
}

.topbar-center {
  flex: 1;
  display: flex;
  justify-content: center;
  min-width: 0;
}

.exercise-selector-btn {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  background: rgba(0, 230, 153, 0.06);
  border: 1px solid rgba(0, 230, 153, 0.15);
  border-radius: 12px;
  padding: 0.45rem 1rem;
  color: #C3D1CB;
  font-size: 0.82rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;
  max-width: 400px;
  overflow: hidden;
}

.exercise-selector-btn:hover {
  background: rgba(0, 230, 153, 0.12);
  border-color: rgba(0, 230, 153, 0.35);
  color: #00E699;
}

.exercise-selector-text {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.topbar-right {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  flex-shrink: 0;
}

.run-btn {
  color: #041713 !important;
  font-weight: 700 !important;
  text-transform: none;
  box-shadow: 0 0 16px rgba(0, 230, 153, 0.3) !important;
  transition: all 0.25s;
}

.run-btn:hover {
  box-shadow: 0 0 28px rgba(0, 230, 153, 0.5) !important;
  transform: translateY(-1px);
}

.clear-btn {
  color: #8E9E98 !important;
  border-color: rgba(142, 158, 152, 0.2) !important;
  text-transform: none;
  font-weight: 600 !important;
}

.clear-btn:hover {
  background: rgba(142, 158, 152, 0.08) !important;
}

.reset-btn {
  width: 38px !important;
  height: 38px !important;
  background: rgba(255, 255, 255, 0.04) !important;
  border: 1px solid rgba(255, 255, 255, 0.08) !important;
  border-radius: 10px !important;
  color: #8E9E98 !important;
}

.reset-btn:hover {
  background: rgba(0, 230, 153, 0.08) !important;
  color: #00E699 !important;
  border-color: rgba(0, 230, 153, 0.25) !important;
}

/* ================================================================ */
/* EXERCISE SELECTOR PANEL                                          */
/* ================================================================ */
.exercise-panel-overlay {
  position: fixed;
  inset: 0;
  z-index: 200;
}

.exercise-panel-backdrop {
  position: absolute;
  inset: 0;
  background: rgba(4, 12, 8, 0.75);
  backdrop-filter: blur(6px);
}

.exercise-panel {
  position: absolute;
  top: 56px;
  left: 50%;
  transform: translateX(-50%);
  width: calc(100% - 2rem);
  max-width: 600px;
  max-height: calc(100vh - 80px);
  background: linear-gradient(165deg, #081A14 0%, #040E0A 100%);
  border: 1.5px solid rgba(0, 230, 153, 0.25);
  border-radius: 20px;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.8), 0 0 30px rgba(0, 230, 153, 0.15);
}

.exercise-panel-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1rem 1.25rem;
  border-bottom: 1px solid rgba(0, 230, 153, 0.1);
}

.exercise-panel-header h3 {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: #F0F6F4;
  font-size: 1rem;
  font-weight: 700;
}

.panel-close-btn {
  width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 8px;
  background: rgba(255, 255, 255, 0.05);
  border: none;
  color: #8E9E98;
  cursor: pointer;
  transition: all 0.2s;
}

.panel-close-btn:hover {
  background: rgba(236, 72, 153, 0.12);
  color: #EC4899;
}

.exercise-panel-body {
  padding: 0.75rem 1.25rem 1.25rem;
  overflow-y: auto;
  scrollbar-width: thin;
  scrollbar-color: #00E699 rgba(0, 0, 0, 0.2);
}

.exercise-nivel-group {
  margin-bottom: 1rem;
}

.nivel-group-title {
  display: flex;
  align-items: center;
  gap: 0.4rem;
  font-size: 0.78rem;
  font-weight: 700;
  color: #8E9E98;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  margin-bottom: 0.5rem;
  padding-bottom: 0.35rem;
  border-bottom: 1px solid rgba(255, 255, 255, 0.05);
}

.exercise-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 0.6rem;
  padding: 0.65rem 0.8rem;
  border-radius: 12px;
  cursor: pointer;
  transition: all 0.2s;
  margin-bottom: 0.35rem;
  border: 1px solid transparent;
}

.exercise-item:hover {
  background: rgba(0, 230, 153, 0.06);
  border-color: rgba(0, 230, 153, 0.15);
}

.exercise-item.is-active {
  background: rgba(0, 230, 153, 0.1);
  border-color: rgba(0, 230, 153, 0.3);
}

.exercise-item-left {
  display: flex;
  align-items: center;
  gap: 0.6rem;
  min-width: 0;
}

.dif-dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  flex-shrink: 0;
}

.dif-dot.dif-fácil { background: #00E699; box-shadow: 0 0 6px rgba(0, 230, 153, 0.5); }
.dif-dot.dif-media { background: #F59E0B; box-shadow: 0 0 6px rgba(245, 158, 11, 0.5); }
.dif-dot.dif-alta { background: #EC4899; box-shadow: 0 0 6px rgba(236, 72, 153, 0.5); }
.dif-dot.dif-free { background: #38BDF8; box-shadow: 0 0 6px rgba(56, 189, 248, 0.5); }

.exercise-item-title {
  display: block;
  font-size: 0.85rem;
  font-weight: 600;
  color: #F0F6F4;
}

.exercise-item-source {
  display: block;
  font-size: 0.72rem;
  color: #6B8078;
}

.dif-label {
  font-size: 0.68rem;
  font-weight: 700;
  padding: 0.15rem 0.45rem;
  border-radius: 6px;
  text-transform: capitalize;
  flex-shrink: 0;
}

.dif-label-fácil { background: rgba(0, 230, 153, 0.12); color: #00E699; }
.dif-label-media { background: rgba(245, 158, 11, 0.12); color: #F59E0B; }
.dif-label-alta { background: rgba(236, 72, 153, 0.12); color: #EC4899; }

/* Panel transitions */
.slide-panel-enter-active {
  transition: opacity 0.25s ease;
}
.slide-panel-enter-active .exercise-panel {
  animation: panelSlideIn 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
}
.slide-panel-leave-active {
  transition: opacity 0.2s ease;
}
.slide-panel-enter-from,
.slide-panel-leave-to {
  opacity: 0;
}

@keyframes panelSlideIn {
  from { transform: translateX(-50%) translateY(-20px) scale(0.95); opacity: 0; }
  to { transform: translateX(-50%) translateY(0) scale(1); opacity: 1; }
}

/* ================================================================ */
/* EDITOR LAYOUT                                                    */
/* ================================================================ */
.editor-layout {
  flex: 1;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 0;
  overflow: hidden;
  min-height: 0;
}

.editor-main-col {
  display: flex;
  flex-direction: column;
  min-height: 0;
  border-right: 1px solid rgba(0, 230, 153, 0.08);
}

.console-col {
  display: flex;
  flex-direction: column;
  min-height: 0;
}

/* ================================================================ */
/* EXERCISE INFO BAR                                                */
/* ================================================================ */
.exercise-info-bar {
  padding: 0.75rem 1rem;
  background: rgba(0, 230, 153, 0.04);
  border-bottom: 1px solid rgba(0, 230, 153, 0.1);
  flex-shrink: 0;
}

.exercise-info-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.exercise-info-left {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.dif-badge {
  font-size: 0.68rem;
  font-weight: 700;
  padding: 0.2rem 0.5rem;
  border-radius: 6px;
  text-transform: capitalize;
}

.dif-badge-fácil { background: rgba(0, 230, 153, 0.12); color: #00E699; }
.dif-badge-media { background: rgba(245, 158, 11, 0.12); color: #F59E0B; }
.dif-badge-alta { background: rgba(236, 72, 153, 0.12); color: #EC4899; }

.exercise-info-title {
  color: #F0F6F4;
  font-size: 0.92rem;
  font-weight: 700;
}

.toggle-info-btn {
  width: 28px;
  height: 28px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 8px;
  border: none;
  background: rgba(255, 255, 255, 0.05);
  color: #8E9E98;
  cursor: pointer;
  transition: all 0.2s;
}

.toggle-info-btn:hover {
  background: rgba(0, 230, 153, 0.1);
  color: #00E699;
}

.exercise-info-body {
  margin-top: 0.6rem;
}

.exercise-enunciado {
  color: #C3D1CB;
  font-size: 0.84rem;
  line-height: 1.5;
  margin-bottom: 0.5rem;
}

.exercise-io-section {
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
}

.io-example {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.io-label {
  display: flex;
  align-items: center;
  gap: 0.25rem;
  font-size: 0.75rem;
  font-weight: 600;
  color: #8E9E98;
}

.io-example code {
  background: rgba(0, 230, 153, 0.08);
  color: #00E699;
  padding: 0.15rem 0.45rem;
  border-radius: 6px;
  font-family: 'JetBrains Mono', monospace;
  font-size: 0.78rem;
}

.slide-info-enter-active,
.slide-info-leave-active {
  transition: all 0.2s ease;
}
.slide-info-enter-from,
.slide-info-leave-to {
  opacity: 0;
  max-height: 0;
}

/* ================================================================ */
/* EDITOR WRAPPER                                                   */
/* ================================================================ */
.editor-wrapper {
  flex: 1;
  display: flex;
  flex-direction: column;
  min-height: 0;
}

.editor-tab-bar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 0.75rem;
  height: 38px;
  background: #060E0B;
  border-bottom: 1px solid rgba(0, 230, 153, 0.08);
  flex-shrink: 0;
}

.editor-tab {
  display: flex;
  align-items: center;
  gap: 0.4rem;
  padding: 0.35rem 0.75rem;
  font-size: 0.78rem;
  font-weight: 600;
  color: #8E9E98;
  border-radius: 8px;
}

.editor-tab.active {
  color: #F0F6F4;
  background: rgba(0, 230, 153, 0.08);
}

.editor-tab-actions {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.editor-lang-label {
  font-size: 0.72rem;
  font-weight: 600;
  color: #5C6E67;
}

.editor-status-dot {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: #00E699;
  box-shadow: 0 0 6px rgba(0, 230, 153, 0.6);
}

.editor-body {
  flex: 1;
  min-height: 0;
}

.editor-loading {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 1rem;
  height: 100%;
  color: #8E9E98;
  font-size: 0.88rem;
}

/* ================================================================ */
/* CONSOLE                                                          */
/* ================================================================ */
.console-wrapper {
  flex: 1;
  display: flex;
  flex-direction: column;
  min-height: 0;
}

.console-tab-bar {
  display: flex;
  align-items: center;
  padding: 0 0.75rem;
  height: 38px;
  background: #060E0B;
  border-bottom: 1px solid rgba(0, 230, 153, 0.08);
  flex-shrink: 0;
  gap: 0.25rem;
}

.console-tab {
  display: flex;
  align-items: center;
  gap: 0.35rem;
  padding: 0.3rem 0.65rem;
  font-size: 0.78rem;
  font-weight: 600;
  color: #5C6E67;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.2s;
}

.console-tab.active {
  color: #F0F6F4;
  background: rgba(0, 230, 153, 0.08);
}

.console-tab:hover:not(.active) {
  color: #8E9E98;
}

.console-status {
  margin-left: auto;
  display: flex;
  align-items: center;
  gap: 0.35rem;
  font-size: 0.72rem;
  font-weight: 600;
  color: #5C6E67;
}

.status-indicator {
  width: 6px;
  height: 6px;
  border-radius: 50%;
}

.status-indicator.idle { background: #3D5A4E; }
.status-indicator.running { background: #F59E0B; box-shadow: 0 0 8px rgba(245, 158, 11, 0.6); animation: pulse 1s infinite; }
.status-indicator.done { background: #00E699; box-shadow: 0 0 6px rgba(0, 230, 153, 0.5); }

@keyframes pulse {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.4; }
}

.console-body {
  flex: 1;
  padding: 1rem;
  overflow-y: auto;
  font-family: 'JetBrains Mono', 'Fira Code', 'Cascadia Code', monospace;
  font-size: 0.82rem;
  line-height: 1.6;
  min-height: 0;
  scrollbar-width: thin;
  scrollbar-color: #1A2E26 transparent;
}

.console-welcome {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  height: 100%;
  gap: 0.75rem;
  color: #3D5A4E;
}

.console-welcome p {
  font-size: 0.85rem;
  font-family: 'Plus Jakarta Sans', sans-serif;
  max-width: 300px;
}

.console-welcome kbd {
  background: rgba(0, 230, 153, 0.1);
  color: #00E699;
  padding: 0.15rem 0.4rem;
  border-radius: 5px;
  font-size: 0.78rem;
  font-family: 'Plus Jakarta Sans', sans-serif;
  border: 1px solid rgba(0, 230, 153, 0.2);
}

.console-shortcuts {
  display: flex;
  gap: 1rem;
  margin-top: 0.25rem;
}

.console-shortcuts span {
  display: flex;
  align-items: center;
  gap: 0.25rem;
  font-size: 0.72rem;
  color: #2A4A3C;
  font-family: 'Plus Jakarta Sans', sans-serif;
}

.console-shortcuts kbd {
  background: rgba(255, 255, 255, 0.04);
  color: #5C6E67;
  padding: 0.1rem 0.3rem;
  border-radius: 4px;
  font-size: 0.68rem;
  border: 1px solid rgba(255, 255, 255, 0.06);
}

.console-line {
  display: flex;
  gap: 0.5rem;
  margin-bottom: 0.25rem;
  animation: lineAppear 0.15s ease-out;
}

@keyframes lineAppear {
  from { opacity: 0; transform: translateY(4px); }
  to { opacity: 1; transform: translateY(0); }
}

.line-prefix {
  flex-shrink: 0;
  width: 16px;
  text-align: center;
}

.line-content {
  word-break: break-word;
  white-space: pre-wrap;
}

.line-output .line-prefix { color: #00E699; }
.line-output .line-content { color: #E0F0EA; }

.line-error .line-prefix { color: #F87171; }
.line-error .line-content { color: #FCA5A5; }

.line-system .line-prefix { color: #38BDF8; }
.line-system .line-content { color: #7DD3FC; font-style: italic; }

.console-running {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: #8E9E98;
  font-style: italic;
  font-size: 0.8rem;
  margin-top: 0.5rem;
}

.console-input-bar {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 0.75rem;
  background: #060E0B;
  border-top: 1px solid rgba(0, 230, 153, 0.08);
  flex-shrink: 0;
}

.console-stdin {
  flex: 1;
  background: transparent;
  border: none;
  outline: none;
  color: #E0F0EA;
  font-family: 'JetBrains Mono', monospace;
  font-size: 0.82rem;
}

.console-stdin::placeholder {
  color: #3D5A4E;
}

.stdin-send-btn {
  width: 30px;
  height: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 8px;
  background: rgba(0, 230, 153, 0.1);
  border: 1px solid rgba(0, 230, 153, 0.2);
  color: #00E699;
  cursor: pointer;
  transition: all 0.2s;
}

.stdin-send-btn:hover:not(:disabled) {
  background: rgba(0, 230, 153, 0.2);
}

.stdin-send-btn:disabled {
  opacity: 0.3;
  cursor: default;
}

/* ================================================================ */
/* TIPS CARD                                                        */
/* ================================================================ */
.tips-card {
  padding: 0.75rem 1rem;
  background: rgba(245, 158, 11, 0.04);
  border-top: 1px solid rgba(245, 158, 11, 0.1);
  flex-shrink: 0;
}

.tips-header {
  display: flex;
  align-items: center;
  gap: 0.4rem;
  font-size: 0.75rem;
  font-weight: 700;
  color: #F59E0B;
  margin-bottom: 0.3rem;
}

.tips-text {
  font-size: 0.78rem;
  color: #8E9E98;
  line-height: 1.4;
  margin: 0;
}

/* ================================================================ */
/* RESPONSIVE                                                       */
/* ================================================================ */

/* Tablets and small desktops */
@media (max-width: 900px) {
  .editor-layout {
    grid-template-columns: 1fr;
    grid-template-rows: 1fr 1fr;
  }

  .editor-main-col {
    border-right: none;
    border-bottom: 1px solid rgba(0, 230, 153, 0.1);
  }

  .topbar-center {
    display: none;
  }

  .clear-btn {
    display: none;
  }

  .console-shortcuts {
    flex-wrap: wrap;
    gap: 0.5rem;
  }
}

/* Mobile phones */
@media (max-width: 600px) {
  .practice-topbar {
    padding: 0.4rem 0.5rem;
    gap: 0.4rem;
  }

  .topbar-mode {
    display: none;
  }

  .topbar-divider {
    display: none;
  }

  .topbar-logo {
    height: 26px;
  }

  .back-btn {
    width: 30px;
    height: 30px;
    border-radius: 8px;
  }

  .run-btn {
    font-size: 0.78rem !important;
    padding: 0 0.65rem !important;
    min-width: auto !important;
    height: 34px !important;
  }

  .reset-btn {
    width: 34px !important;
    height: 34px !important;
  }

  .editor-layout {
    grid-template-rows: 1fr 1fr;
  }

  .exercise-info-bar {
    padding: 0.5rem 0.65rem;
  }

  .exercise-info-title {
    font-size: 0.82rem;
  }

  .exercise-enunciado {
    font-size: 0.78rem;
  }

  .exercise-io-section {
    flex-direction: column;
    gap: 0.5rem;
  }

  .editor-tab-bar,
  .console-tab-bar {
    height: 32px;
    padding: 0 0.5rem;
  }

  .editor-tab,
  .console-tab {
    font-size: 0.72rem;
    padding: 0.25rem 0.5rem;
  }

  .console-body {
    padding: 0.6rem;
    font-size: 0.75rem;
  }

  .console-welcome p {
    font-size: 0.78rem;
  }

  .console-welcome kbd {
    font-size: 0.72rem;
    padding: 0.1rem 0.3rem;
  }

  .console-shortcuts {
    flex-direction: column;
    gap: 0.35rem;
    align-items: center;
  }

  .console-input-bar {
    padding: 0.35rem 0.5rem;
  }

  .console-stdin {
    font-size: 0.75rem;
  }

  .tips-card {
    padding: 0.5rem 0.65rem;
  }

  .tips-text {
    font-size: 0.72rem;
  }

  .exercise-panel {
    top: 48px;
    max-width: calc(100% - 1rem);
    border-radius: 16px;
    max-height: calc(100vh - 60px);
  }

  .exercise-panel-header {
    padding: 0.75rem 1rem;
  }

  .exercise-panel-header h3 {
    font-size: 0.88rem;
  }

  .exercise-panel-body {
    padding: 0.5rem 1rem 1rem;
  }

  .exercise-item {
    padding: 0.5rem 0.6rem;
    border-radius: 10px;
  }

  .exercise-item-title {
    font-size: 0.78rem;
  }

  .exercise-item-source {
    font-size: 0.68rem;
  }
}

/* Very small phones */
@media (max-width: 400px) {
  .practice-topbar {
    padding: 0.35rem 0.35rem;
    gap: 0.3rem;
  }

  .topbar-logo {
    height: 22px;
  }

  .back-btn {
    width: 28px;
    height: 28px;
  }

  .run-btn {
    font-size: 0.72rem !important;
    padding: 0 0.5rem !important;
    height: 30px !important;
  }

  .run-btn :deep(.v-btn__prepend) {
    margin-right: 2px;
  }

  .reset-btn {
    width: 30px !important;
    height: 30px !important;
  }

  .editor-tab,
  .console-tab {
    font-size: 0.68rem;
    padding: 0.2rem 0.35rem;
    gap: 0.2rem;
  }

  .editor-lang-label {
    display: none;
  }

  .console-body {
    font-size: 0.7rem;
    padding: 0.5rem;
  }

  .tips-card {
    padding: 0.4rem 0.5rem;
  }

  .tips-header {
    font-size: 0.68rem;
  }

  .tips-text {
    font-size: 0.68rem;
  }

  .exercise-panel {
    top: 42px;
    max-width: calc(100% - 0.5rem);
    border-radius: 14px;
  }
}

/* Very short screens (landscape phones) */
@media (max-height: 500px) {
  .practice-topbar {
    padding: 0.25rem 0.5rem;
  }

  .tips-card {
    display: none;
  }

  .console-welcome {
    gap: 0.35rem;
  }

  .console-welcome p {
    font-size: 0.72rem;
  }
}
</style>
