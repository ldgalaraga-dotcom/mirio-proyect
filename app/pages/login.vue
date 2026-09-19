<template>
  <div class="login-page">
    <!-- Ambient Glow Orbs -->
    <div class="login-glow glow-1" />
    <div class="login-glow glow-2" />
    <div class="login-glow glow-3" />

    <!-- Floating Particles -->
    <div class="particles-field">
      <span v-for="n in 12" :key="n" :class="`particle p-${n}`" />
    </div>

    <!-- Main Content -->
    <v-container fluid class="login-container">
      <v-row align="center" justify="center" class="fill-height">
        <!-- Left Panel: Branding (Desktop) -->
        <v-col cols="12" md="6" lg="5" class="d-none d-md-flex flex-column align-center justify-center branding-col">
          <div class="branding-content">
            <!-- Logo -->
            <NuxtLink to="/" class="text-decoration-none">
              <img
                src="/images/mirio-logo.png"
                alt="Mirio - Aprende. Programa. Crea Con IA"
                class="branding-logo"
              />
            </NuxtLink>

            <!-- Mascot Stage -->
            <div class="mascot-stage">
              <div class="mascot-halo" />
              <img
                src="/images/mirio-mascot.png"
                alt="Robot Mirio"
                class="mascot-login-img"
              />
              <div class="mascot-shadow" />
            </div>

            <!-- Tagline -->
            <h2 class="branding-tagline">
              Aprende. <span class="text-accent">Programa.</span> Crea.
            </h2>
            <p class="branding-desc">
              Tu compañero de código con IA te espera para aprender a programar desde cero.
            </p>

            <!-- Feature Pills -->
            <div class="feature-pills">
              <div class="feature-pill">
                <v-icon icon="mdi-robot-outline" size="18" color="#34D399" />
                <span>Tutor IA</span>
              </div>
              <div class="feature-pill">
                <v-icon icon="mdi-code-tags" size="18" color="#38BDF8" />
                <span>Editor en Vivo</span>
              </div>
              <div class="feature-pill">
                <v-icon icon="mdi-certificate-outline" size="18" color="#F59E0B" />
                <span>Certificados</span>
              </div>
            </div>
          </div>
        </v-col>

        <!-- Right Panel: Login Form -->
        <v-col cols="12" md="6" lg="5" class="d-flex align-center justify-center form-col">
          <!-- Mobile Logo (shown only on mobile) -->
          <div class="mobile-branding d-flex d-md-none flex-column align-center mb-6">
            <NuxtLink to="/" class="text-decoration-none">
              <img
                src="/images/mirio-logo.png"
                alt="Mirio"
                class="mobile-logo"
              />
            </NuxtLink>
          </div>

          <LoginForm
            :is-google-loading="auth.isLoading.value"
            :external-error="authErrorText"
            @login="onLogin"
            @register="onRegister"
            @social-login="onSocialLogin"
          />
        </v-col>
      </v-row>
    </v-container>

    <!-- Google OAuth Setup Modal (Shown if Client ID is missing) -->
    <v-dialog v-model="showConfigDialog" max-width="520" persistent>
      <v-card class="dialog-card pa-6" rounded="xl">
        <div class="d-flex align-center ga-3 mb-3">
          <div class="dialog-icon-wrap">
            <svg viewBox="0 0 24 24" width="26" height="26">
              <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z"/>
              <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
              <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
              <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
            </svg>
          </div>
          <div>
            <h3 class="dialog-title">Configuración de Google OAuth</h3>
            <span class="dialog-subtitle">Google Identity Services</span>
          </div>
        </div>

        <p class="dialog-desc mb-3">
          Para conectar con tu cuenta real de Google en desarrollo y producción, añade tu <strong>Client ID</strong> en el archivo <code class="env-chip">.env</code> del proyecto:
        </p>

        <div class="code-snippet-box mb-4">
          <code>NUXT_PUBLIC_GOOGLE_CLIENT_ID=tu-id-de-cliente.apps.googleusercontent.com</code>
        </div>

        <v-alert
          type="info"
          variant="tonal"
          rounded="lg"
          density="compact"
          color="#38BDF8"
          class="mb-4"
        >
          <div class="text-caption">
            Puedes obtener tu Client ID gratis en
            <a href="https://console.cloud.google.com/apis/credentials" target="_blank" class="text-accent text-decoration-underline font-weight-bold">
              Google Cloud Console
            </a>
            agregando <code>http://localhost:3000</code> como origen de JS autorizado.
          </div>
        </v-alert>

        <div class="d-flex flex-column flex-sm-row justify-end ga-2 pt-2">
          <v-btn
            variant="text"
            rounded="lg"
            class="text-grey-lighten-1 font-weight-medium"
            @click="showConfigDialog = false"
          >
            Cerrar
          </v-btn>
          <v-btn
            variant="flat"
            rounded="lg"
            color="#34D399"
            class="demo-login-btn"
            prepend-icon="mdi-account-check"
            @click="handleDemoLogin"
          >
            Probar Sesión de Prueba (Demo)
          </v-btn>
        </div>
      </v-card>
    </v-dialog>

    <!-- Success Snackbar -->
    <v-snackbar
      v-model="showSuccessSnackbar"
      color="#059669"
      location="top"
      rounded="lg"
      :timeout="2200"
    >
      <div class="d-flex align-center ga-2">
        <v-icon icon="mdi-check-circle" color="#FFFFFF" size="20" />
        <span class="font-weight-bold">{{ successMessage }}</span>
      </div>
    </v-snackbar>

    <!-- Footer -->
    <div class="login-footer">
      <span class="footer-status">
        <span class="status-dot" />
        Mirio IA v2.0
      </span>
      <span class="footer-copy">© 2026 Mirio · Todos los derechos reservados</span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

definePageMeta({
  layout: 'auth',
})

useHead({
  title: 'Iniciar Sesión — Mirio · Aprende. Programa. Crea.',
  meta: [
    {
      name: 'description',
      content: 'Inicia sesión en Mirio para acceder a cursos de programación con IA, editor de código en vivo y rutas de aprendizaje personalizadas.',
    },
  ],
})

const auth = useAuth()
const showConfigDialog = ref(false)
const showSuccessSnackbar = ref(false)
const authErrorText = ref('')
const successMessage = ref('¡Sesión iniciada con éxito! Redirigiendo...')

const onLogin = async (payload: { email: string; password: string; rememberMe: boolean }) => {
  authErrorText.value = ''
  const res = await auth.loginWithCredentials(payload.email, payload.password, payload.rememberMe)
  if (res.success) {
    successMessage.value = '¡Sesión iniciada con éxito! Redirigiendo...'
    showSuccessSnackbar.value = true
    setTimeout(() => {
      navigateTo('/')
    }, 1200)
  } else {
    authErrorText.value = res.error || 'Error al iniciar sesión'
  }
}

const onRegister = async (payload: { name: string; email: string; password: string }) => {
  authErrorText.value = ''
  const res = await auth.registerUser(payload.name, payload.email, payload.password)
  if (res.success) {
    successMessage.value = '¡Cuenta creada con éxito! Bienvenido a Mirio.'
    showSuccessSnackbar.value = true
    setTimeout(() => {
      navigateTo('/')
    }, 1200)
  } else {
    authErrorText.value = res.error || 'Error al crear la cuenta'
  }
}

const onSocialLogin = async (provider: string) => {
  if (provider === 'google') {
    authErrorText.value = ''
    const res = await auth.loginWithGoogle()

    if (res.success) {
      successMessage.value = '¡Sesión con Google iniciada con éxito!'
      showSuccessSnackbar.value = true
      setTimeout(() => {
        navigateTo('/')
      }, 1200)
    } else if (res.error === 'NO_CLIENT_ID') {
      showConfigDialog.value = true
    } else if (res.error) {
      authErrorText.value = res.error
    }
  }
}

const handleDemoLogin = async () => {
  showConfigDialog.value = false
  await auth.loginWithGoogleDemo('Usuario Google (Mirio)', 'usuario.mirio@gmail.com')
  successMessage.value = '¡Sesión de prueba iniciada con éxito!'
  showSuccessSnackbar.value = true
  setTimeout(() => {
    navigateTo('/')
  }, 1200)
}
</script>

<style scoped>
.login-page {
  position: relative;
  min-height: 100vh;
  background: #050B1A;
  display: flex;
  flex-direction: column;
  overflow: hidden;
}

/* ===== AMBIENT GLOW ORBS ===== */
.login-glow {
  position: absolute;
  border-radius: 50%;
  pointer-events: none;
  filter: blur(100px);
  z-index: 0;
}

.glow-1 {
  width: 500px;
  height: 500px;
  top: -15%;
  left: -10%;
  background: radial-gradient(circle, rgba(52, 211, 153, 0.15) 0%, transparent 70%);
}

.glow-2 {
  width: 400px;
  height: 400px;
  bottom: -10%;
  right: -8%;
  background: radial-gradient(circle, rgba(56, 189, 248, 0.12) 0%, transparent 70%);
}

.glow-3 {
  width: 300px;
  height: 300px;
  top: 40%;
  left: 50%;
  transform: translateX(-50%);
  background: radial-gradient(circle, rgba(99, 102, 241, 0.08) 0%, transparent 70%);
}

/* ===== FLOATING PARTICLES ===== */
.particles-field {
  position: absolute;
  inset: 0;
  pointer-events: none;
  z-index: 0;
  overflow: hidden;
}

.particle {
  position: absolute;
  width: 3px;
  height: 3px;
  border-radius: 50%;
  background: rgba(52, 211, 153, 0.4);
  animation: floatParticle 8s ease-in-out infinite;
}

.p-1  { top: 12%; left: 8%;  animation-delay: 0s;    animation-duration: 7s; }
.p-2  { top: 25%; left: 82%; animation-delay: 1.2s;  animation-duration: 9s;  background: rgba(56, 189, 248, 0.3); }
.p-3  { top: 68%; left: 15%; animation-delay: 2.5s;  animation-duration: 6s; }
.p-4  { top: 85%; left: 70%; animation-delay: 0.8s;  animation-duration: 10s; background: rgba(245, 158, 11, 0.3); }
.p-5  { top: 40%; left: 5%;  animation-delay: 3s;    animation-duration: 8s;  background: rgba(56, 189, 248, 0.3); }
.p-6  { top: 55%; left: 90%; animation-delay: 1.5s;  animation-duration: 7s; }
.p-7  { top: 8%;  left: 45%; animation-delay: 4s;    animation-duration: 11s; background: rgba(99, 102, 241, 0.3); }
.p-8  { top: 92%; left: 35%; animation-delay: 2s;    animation-duration: 9s; }
.p-9  { top: 33%; left: 60%; animation-delay: 0.5s;  animation-duration: 6.5s; background: rgba(52, 211, 153, 0.25); }
.p-10 { top: 75%; left: 50%; animation-delay: 3.5s;  animation-duration: 8.5s; background: rgba(56, 189, 248, 0.25); }
.p-11 { top: 18%; left: 72%; animation-delay: 1s;    animation-duration: 7.5s; }
.p-12 { top: 60%; left: 28%; animation-delay: 2.8s;  animation-duration: 10s; background: rgba(245, 158, 11, 0.2); }

@keyframes floatParticle {
  0%, 100% { transform: translateY(0) translateX(0); opacity: 0.3; }
  25% { transform: translateY(-20px) translateX(10px); opacity: 0.7; }
  50% { transform: translateY(-10px) translateX(-15px); opacity: 0.5; }
  75% { transform: translateY(-25px) translateX(5px); opacity: 0.8; }
}

/* ===== CONTAINER ===== */
.login-container {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  z-index: 1;
  padding: 2rem 1rem;
}

.fill-height {
  min-height: calc(100vh - 80px);
}

/* ===== LEFT BRANDING PANEL ===== */
.branding-col {
  position: relative;
}

.branding-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  max-width: 380px;
}

.branding-logo {
  height: 70px;
  width: auto;
  object-fit: contain;
  filter: drop-shadow(0 4px 14px rgba(52, 211, 153, 0.3));
  margin-bottom: 2rem;
  transition: transform 0.3s ease;
}

.branding-logo:hover {
  transform: scale(1.04);
}

/* Mascot Stage */
.mascot-stage {
  position: relative;
  width: 220px;
  height: 220px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 1.5rem;
}

.mascot-halo {
  position: absolute;
  width: 200px;
  height: 200px;
  border-radius: 50%;
  background: radial-gradient(circle, rgba(52, 211, 153, 0.15) 0%, transparent 70%);
  border: 1.5px solid rgba(52, 211, 153, 0.2);
  animation: haloRotate 12s linear infinite;
}

@keyframes haloRotate {
  0% { transform: rotate(0deg) scale(1); border-color: rgba(52, 211, 153, 0.2); }
  50% { transform: rotate(180deg) scale(1.05); border-color: rgba(56, 189, 248, 0.25); }
  100% { transform: rotate(360deg) scale(1); border-color: rgba(52, 211, 153, 0.2); }
}

.mascot-login-img {
  width: 160px;
  height: 160px;
  object-fit: contain;
  z-index: 1;
  filter: drop-shadow(0 10px 30px rgba(52, 211, 153, 0.3));
  animation: mascotFloat 4s ease-in-out infinite;
}

@keyframes mascotFloat {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-10px); }
}

.mascot-shadow {
  position: absolute;
  bottom: 10px;
  width: 100px;
  height: 12px;
  border-radius: 50%;
  background: rgba(52, 211, 153, 0.15);
  filter: blur(8px);
  animation: shadowPulse 4s ease-in-out infinite;
}

@keyframes shadowPulse {
  0%, 100% { transform: scaleX(1); opacity: 0.5; }
  50% { transform: scaleX(0.85); opacity: 0.3; }
}

.branding-tagline {
  font-size: 1.6rem;
  font-weight: 800;
  color: #FFFFFF;
  line-height: 1.3;
}

.text-accent {
  color: #34D399;
}

.branding-desc {
  font-size: 0.92rem;
  color: #8E9E98;
  margin-top: 0.5rem;
  line-height: 1.5;
}

/* Feature Pills */
.feature-pills {
  display: flex;
  gap: 10px;
  margin-top: 1.5rem;
  flex-wrap: wrap;
  justify-content: center;
}

.feature-pill {
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 6px 14px;
  background: rgba(255, 255, 255, 0.04);
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 20px;
  font-size: 0.8rem;
  font-weight: 600;
  color: #B0BFB8;
  transition: all 0.25s ease;
}

.feature-pill:hover {
  border-color: rgba(52, 211, 153, 0.3);
  background: rgba(52, 211, 153, 0.08);
}

/* ===== RIGHT FORM PANEL ===== */
.form-col {
  flex-direction: column;
  position: relative;
  z-index: 2;
}

/* ===== MOBILE BRANDING ===== */
.mobile-branding {
  width: 100%;
}

.mobile-logo {
  height: 50px;
  width: auto;
  object-fit: contain;
  filter: drop-shadow(0 4px 10px rgba(52, 211, 153, 0.25));
}

/* ===== FOOTER ===== */
.login-footer {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1rem 1.5rem;
  position: relative;
  z-index: 1;
}

.footer-status {
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 0.75rem;
  color: #5C6E67;
  font-weight: 600;
}

.status-dot {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: #34D399;
  box-shadow: 0 0 8px #34D399;
}

.footer-copy {
  font-size: 0.75rem;
  color: #3A4A44;
}

/* ===== RESPONSIVE ===== */
@media (max-width: 960px) {
  .login-container {
    padding: 1rem 0.5rem;
  }

  .fill-height {
    min-height: calc(100vh - 60px);
  }
}

@media (max-width: 600px) {
  .login-page {
    background: #050B1A;
  }

  .login-container {
    padding: 0.5rem;
  }

  .login-footer {
    flex-direction: column;
    gap: 0.25rem;
    padding: 0.75rem 1rem;
  }
}

/* ===== GOOGLE DIALOG STYLES ===== */
.dialog-card {
  background: linear-gradient(165deg, rgba(10, 25, 20, 0.98) 0%, rgba(5, 15, 12, 0.99) 100%) !important;
  border: 1.5px solid rgba(52, 211, 153, 0.25) !important;
  box-shadow: 0 25px 60px rgba(0, 0, 0, 0.8), 0 0 40px rgba(52, 211, 153, 0.1) !important;
  backdrop-filter: blur(25px);
  color: #FFFFFF;
}

.dialog-icon-wrap {
  width: 44px;
  height: 44px;
  border-radius: 12px;
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
  display: flex;
  align-items: center;
  justify-content: center;
}

.dialog-title {
  font-size: 1.15rem;
  font-weight: 700;
  color: #FFFFFF;
  margin: 0;
}

.dialog-subtitle {
  font-size: 0.78rem;
  color: #8E9E98;
}

.dialog-desc {
  font-size: 0.88rem;
  color: #B0BFB8;
  line-height: 1.5;
}

.env-chip {
  background: rgba(52, 211, 153, 0.12);
  color: #34D399;
  padding: 2px 6px;
  border-radius: 4px;
  font-size: 0.82rem;
  font-weight: 600;
}

.code-snippet-box {
  background: rgba(0, 0, 0, 0.5);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 8px;
  padding: 10px 14px;
  font-family: monospace;
  font-size: 0.78rem;
  color: #5EEAD4;
  overflow-x: auto;
  word-break: break-all;
}

.demo-login-btn {
  background: linear-gradient(135deg, #059669 0%, #34D399 100%) !important;
  color: #FFFFFF !important;
  font-weight: 700 !important;
  box-shadow: 0 4px 16px rgba(52, 211, 153, 0.35) !important;
}
</style>
