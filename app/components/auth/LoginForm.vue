<template>
  <v-card
    class="login-card mx-auto"
    max-width="460"
    rounded="xl"
    elevation="0"
  >
    <!-- Card Header with Mascot -->
    <div class="login-card-header">
      <div class="mascot-glow-ring">
        <v-avatar size="80" class="mascot-avatar-login">
          <v-img src="/images/mirio-mascot.png" alt="Mirio Mascot" cover />
        </v-avatar>
        <span class="mascot-pulse" />
      </div>
      <h2 class="login-heading mt-3">
        {{ isRegisterMode ? '¡Crea tu Cuenta!' : '¡Bienvenido a Mirio!' }}
      </h2>
      <p class="login-subheading">
        {{ isRegisterMode ? 'Regístrate para guardar tu progreso con IA' : 'Inicia sesión para continuar aprendiendo' }}
      </p>
    </div>

    <v-card-text class="login-card-body px-6 px-sm-8 pb-6 pt-2">
      <!-- Mode Switcher (Login vs Register) -->
      <div class="auth-mode-switch mb-4">
        <button
          type="button"
          :class="['mode-btn', { active: !isRegisterMode }]"
          @click="switchMode(false)"
        >
          <v-icon icon="mdi-login" size="16" class="mr-1" />
          Iniciar Sesión
        </button>
        <button
          type="button"
          :class="['mode-btn', { active: isRegisterMode }]"
          @click="switchMode(true)"
        >
          <v-icon icon="mdi-account-plus" size="16" class="mr-1" />
          Registrarse
        </button>
      </div>

      <!-- Auth Form -->
      <v-form ref="formRef" v-model="isFormValid" @submit.prevent="handleSubmit" class="login-form">
        <!-- Name Field (Only in Register Mode) -->
        <v-slide-y-transition>
          <div v-if="isRegisterMode" class="field-group mb-2">
            <label for="reg-name" class="field-label">
              <v-icon icon="mdi-account-outline" size="15" class="mr-1" />
              Nombre completo
            </label>
            <v-text-field
              id="reg-name"
              v-model="name"
              placeholder="Ej. Juan Pérez"
              variant="outlined"
              density="comfortable"
              rounded="lg"
              :rules="nameRules"
              class="login-field"
              bg-color="rgba(255,255,255,0.04)"
              color="#34D399"
              base-color="rgba(255,255,255,0.15)"
              prepend-inner-icon="mdi-account"
              hide-details="auto"
            />
          </div>
        </v-slide-y-transition>

        <!-- Email Field -->
        <div class="field-group mb-1">
          <label for="login-email" class="field-label">
            <v-icon icon="mdi-email-outline" size="15" class="mr-1" />
            Correo electrónico
          </label>
          <v-text-field
            id="login-email"
            v-model="email"
            type="email"
            placeholder="tu@email.com"
            variant="outlined"
            density="comfortable"
            rounded="lg"
            :rules="emailRules"
            class="login-field"
            bg-color="rgba(255,255,255,0.04)"
            color="#34D399"
            base-color="rgba(255,255,255,0.15)"
            prepend-inner-icon="mdi-at"
            hide-details="auto"
          />
        </div>

        <!-- Password Field -->
        <div class="field-group mb-1">
          <label for="login-password" class="field-label">
            <v-icon icon="mdi-lock-outline" size="15" class="mr-1" />
            Contraseña
          </label>
          <v-text-field
            id="login-password"
            v-model="password"
            :type="showPassword ? 'text' : 'password'"
            placeholder="••••••••"
            variant="outlined"
            density="comfortable"
            rounded="lg"
            :rules="passwordRules"
            class="login-field"
            bg-color="rgba(255,255,255,0.04)"
            color="#34D399"
            base-color="rgba(255,255,255,0.15)"
            prepend-inner-icon="mdi-key-variant"
            :append-inner-icon="showPassword ? 'mdi-eye-off' : 'mdi-eye'"
            hide-details="auto"
            @click:append-inner="showPassword = !showPassword"
          />
        </div>

        <!-- Confirm Password Field (Only in Register Mode) -->
        <v-slide-y-transition>
          <div v-if="isRegisterMode" class="field-group mb-2">
            <label for="reg-confirm-password" class="field-label">
              <v-icon icon="mdi-lock-check-outline" size="15" class="mr-1" />
              Confirmar contraseña
            </label>
            <v-text-field
              id="reg-confirm-password"
              v-model="confirmPassword"
              :type="showPassword ? 'text' : 'password'"
              placeholder="••••••••"
              variant="outlined"
              density="comfortable"
              rounded="lg"
              :rules="confirmPasswordRules"
              class="login-field"
              bg-color="rgba(255,255,255,0.04)"
              color="#34D399"
              base-color="rgba(255,255,255,0.15)"
              prepend-inner-icon="mdi-lock-check"
              hide-details="auto"
            />
          </div>
        </v-slide-y-transition>

        <!-- Remember + Forgot Row (Only in Login Mode) -->
        <div v-if="!isRegisterMode" class="d-flex align-center justify-space-between mt-2 mb-4">
          <v-checkbox
            v-model="rememberMe"
            label="Recordarme"
            density="compact"
            color="#34D399"
            hide-details
            class="remember-check"
          />
          <a href="#" class="forgot-link" @click.prevent>¿Olvidaste tu contraseña?</a>
        </div>

        <!-- Spacer for register mode -->
        <div v-else class="mb-4" />

        <!-- Submit Button -->
        <v-btn
          type="submit"
          block
          size="large"
          rounded="lg"
          :loading="isLoading"
          :disabled="!isFormValid"
          class="login-submit-btn mb-4"
          :prepend-icon="isRegisterMode ? 'mdi-account-plus' : 'mdi-login-variant'"
        >
          {{ isRegisterMode ? 'Crear Cuenta' : 'Iniciar Sesión' }}
        </v-btn>

        <!-- Error Alert -->
        <v-slide-y-transition>
          <v-alert
            v-if="loginError"
            type="error"
            variant="tonal"
            rounded="lg"
            density="compact"
            closable
            class="mb-4"
            @click:close="loginError = ''"
          >
            {{ loginError }}
          </v-alert>
        </v-slide-y-transition>
      </v-form>

      <!-- Divider -->
      <div class="social-divider mb-4">
        <span class="divider-line" />
        <span class="divider-text">o continúa con</span>
        <span class="divider-line" />
      </div>

      <!-- Social Login Button (Google) -->
      <div class="social-buttons-single">
        <v-btn
          variant="outlined"
          rounded="lg"
          size="large"
          block
          class="social-btn google-btn"
          :loading="isGoogleLoading"
          :disabled="isLoading || isGoogleLoading"
          @click="handleSocialLogin('google')"
        >
          <template #prepend>
            <svg class="social-icon" viewBox="0 0 24 24" width="20" height="20">
              <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z"/>
              <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
              <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
              <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
            </svg>
          </template>
          Continuar con Google
        </v-btn>
      </div>

      <!-- Toggle Prompt -->
      <div class="register-prompt mt-5">
        <template v-if="!isRegisterMode">
          <span>¿No tienes cuenta?</span>
          <a href="#" class="register-link" @click.prevent="switchMode(true)">Regístrate gratis</a>
        </template>
        <template v-else>
          <span>¿Ya tienes una cuenta?</span>
          <a href="#" class="register-link" @click.prevent="switchMode(false)">Inicia sesión</a>
        </template>
      </div>
    </v-card-text>
  </v-card>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'

interface Props {
  isGoogleLoading?: boolean
  externalError?: string
}

const props = withDefaults(defineProps<Props>(), {
  isGoogleLoading: false,
  externalError: '',
})

const isRegisterMode = ref(false)
const formRef = ref()
const name = ref('')
const email = ref('')
const password = ref('')
const confirmPassword = ref('')
const showPassword = ref(false)
const rememberMe = ref(false)
const isFormValid = ref(false)
const isLoading = ref(false)
const loginError = ref('')

watch(
  () => props.externalError,
  (val) => {
    if (val) {
      loginError.value = val
    }
  }
)

const switchMode = (toRegister: boolean) => {
  isRegisterMode.value = toRegister
  loginError.value = ''
  formRef.value?.resetValidation()
}

const nameRules = [
  (v: string) => !isRegisterMode.value || !!v || 'El nombre es requerido',
  (v: string) => !isRegisterMode.value || v.length >= 2 || 'Mínimo 2 caracteres',
]

const emailRules = [
  (v: string) => !!v || 'El correo es requerido',
  (v: string) => /.+@.+\..+/.test(v) || 'Ingresa un correo válido',
]

const passwordRules = [
  (v: string) => !!v || 'La contraseña es requerida',
  (v: string) => v.length >= 6 || 'Mínimo 6 caracteres',
]

const confirmPasswordRules = [
  (v: string) => !isRegisterMode.value || !!v || 'Por favor confirma la contraseña',
  (v: string) => !isRegisterMode.value || v === password.value || 'Las contraseñas no coinciden',
]

const emit = defineEmits<{
  (e: 'login', payload: { email: string; password: string; rememberMe: boolean }): void
  (e: 'register', payload: { name: string; email: string; password: string }): void
  (e: 'social-login', provider: string): void
}>()

const handleSubmit = async () => {
  const { valid } = await formRef.value.validate()
  if (!valid) return

  isLoading.value = true
  loginError.value = ''

  if (isRegisterMode.value) {
    emit('register', {
      name: name.value,
      email: email.value,
      password: password.value,
    })
  } else {
    emit('login', {
      email: email.value,
      password: password.value,
      rememberMe: rememberMe.value,
    })
  }

  setTimeout(() => {
    isLoading.value = false
  }, 1000)
}

const handleSocialLogin = (provider: string) => {
  emit('social-login', provider)
}
</script>

<style scoped>
.login-card {
  background: linear-gradient(165deg, rgba(10, 25, 20, 0.95) 0%, rgba(5, 15, 12, 0.98) 100%) !important;
  border: 1.5px solid rgba(52, 211, 153, 0.2) !important;
  box-shadow:
    0 25px 60px rgba(0, 0, 0, 0.7),
    0 0 40px rgba(52, 211, 153, 0.08),
    inset 0 1px 1px rgba(52, 211, 153, 0.1) !important;
  backdrop-filter: blur(20px);
  overflow: visible;
}

/* ===== HEADER ===== */
.login-card-header {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 2.2rem 2rem 0.8rem;
  position: relative;
}

.mascot-glow-ring {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
}

.mascot-avatar-login {
  border: 2.5px solid #34D399;
  box-shadow: 0 0 30px rgba(52, 211, 153, 0.35);
  z-index: 1;
}

.mascot-pulse {
  position: absolute;
  inset: -6px;
  border-radius: 50%;
  border: 2px solid rgba(52, 211, 153, 0.3);
  animation: pulseGlow 2.5s ease-in-out infinite;
}

@keyframes pulseGlow {
  0%, 100% { transform: scale(1); opacity: 0.7; }
  50% { transform: scale(1.12); opacity: 0.2; }
}

.login-heading {
  font-size: 1.45rem;
  font-weight: 800;
  color: #FFFFFF;
  text-align: center;
}

.login-subheading {
  font-size: 0.86rem;
  color: #8E9E98;
  text-align: center;
  margin-top: 0.25rem;
}

/* ===== MODE SWITCHER ===== */
.auth-mode-switch {
  display: flex;
  background: rgba(255, 255, 255, 0.04);
  border: 1px solid rgba(52, 211, 153, 0.2);
  border-radius: 12px;
  padding: 4px;
  gap: 4px;
}

.mode-btn {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 8px 12px;
  border-radius: 8px;
  border: none;
  background: transparent;
  color: #8E9E98;
  font-size: 0.84rem;
  font-weight: 700;
  cursor: pointer;
  transition: all 0.25s ease;
}

.mode-btn:hover {
  color: #FFFFFF;
  background: rgba(255, 255, 255, 0.04);
}

.mode-btn.active {
  background: rgba(52, 211, 153, 0.18);
  color: #34D399;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.3);
}

/* ===== FORM FIELDS ===== */
.field-group {
  margin-bottom: 0.5rem;
}

.field-label {
  display: flex;
  align-items: center;
  font-size: 0.82rem;
  font-weight: 700;
  color: #B0BFB8;
  margin-bottom: 0.35rem;
  padding-left: 2px;
}

.login-field :deep(.v-field) {
  border-color: rgba(52, 211, 153, 0.2) !important;
  transition: all 0.25s ease;
}

.login-field :deep(.v-field:hover) {
  border-color: rgba(52, 211, 153, 0.4) !important;
}

.login-field :deep(.v-field--focused) {
  border-color: #34D399 !important;
  box-shadow: 0 0 0 3px rgba(52, 211, 153, 0.12) !important;
}

.login-field :deep(.v-field__input) {
  color: #F0F6F4 !important;
  font-weight: 500;
}

.login-field :deep(.v-field__input::placeholder) {
  color: #5C6E67 !important;
}

/* ===== REMEMBER / FORGOT ===== */
.remember-check :deep(.v-label) {
  font-size: 0.82rem;
  color: #8E9E98;
  font-weight: 500;
}

.forgot-link {
  font-size: 0.82rem;
  color: #34D399;
  text-decoration: none;
  font-weight: 600;
  transition: color 0.2s;
}

.forgot-link:hover {
  color: #5EEAD4;
  text-decoration: underline;
}

/* ===== SUBMIT BUTTON ===== */
.login-submit-btn {
  background: linear-gradient(135deg, #059669 0%, #34D399 50%, #10B981 100%) !important;
  color: #FFFFFF !important;
  font-weight: 700 !important;
  font-size: 0.95rem !important;
  letter-spacing: 0.02em !important;
  box-shadow: 0 8px 24px rgba(52, 211, 153, 0.35) !important;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1) !important;
}

.login-submit-btn:hover {
  box-shadow: 0 12px 32px rgba(52, 211, 153, 0.5) !important;
  transform: translateY(-1px);
}

.login-submit-btn:active {
  transform: translateY(0);
}

/* ===== DIVIDER ===== */
.social-divider {
  display: flex;
  align-items: center;
  gap: 12px;
}

.divider-line {
  flex: 1;
  height: 1px;
  background: rgba(255, 255, 255, 0.08);
}

.divider-text {
  font-size: 0.78rem;
  color: #5C6E67;
  font-weight: 600;
  white-space: nowrap;
}

/* ===== SOCIAL BUTTONS ===== */
.social-buttons-row {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 12px;
}

.social-btn {
  border-color: rgba(255, 255, 255, 0.1) !important;
  color: #C8D5CE !important;
  font-weight: 600 !important;
  background: rgba(255, 255, 255, 0.03) !important;
  transition: all 0.25s ease !important;
}

.social-btn:hover {
  border-color: rgba(52, 211, 153, 0.4) !important;
  background: rgba(52, 211, 153, 0.08) !important;
  box-shadow: 0 4px 16px rgba(52, 211, 153, 0.15) !important;
}

.social-icon {
  flex-shrink: 0;
}

/* ===== REGISTER PROMPT ===== */
.register-prompt {
  text-align: center;
  font-size: 0.85rem;
  color: #8E9E98;
}

.register-link {
  color: #34D399;
  font-weight: 700;
  text-decoration: none;
  margin-left: 0.4rem;
  transition: color 0.2s;
}

.register-link:hover {
  color: #5EEAD4;
  text-decoration: underline;
}

/* ===== RESPONSIVE ===== */
@media (max-width: 500px) {
  .login-card {
    margin: 0 0.5rem;
  }

  .login-card-header {
    padding: 1.75rem 1.25rem 0.75rem;
  }

  .login-heading {
    font-size: 1.3rem;
  }

  .login-card-body {
    padding-left: 1.25rem !important;
    padding-right: 1.25rem !important;
  }
}
</style>
