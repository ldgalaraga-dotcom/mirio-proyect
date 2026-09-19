<template>
  <header class="mirio-navbar">
    <v-container class="d-flex align-center justify-space-between py-3 py-md-4" fluid>
      <!-- Brand Logo (Official Mirio PNG Logo or Mirio 2 Python Logo) -->
      <NuxtLink to="/" class="d-flex align-center text-decoration-none brand-link">
        <img
          v-if="isPythonCourse"
          src="/images/python/mirio-brand-logo.png"
          alt="Mirio 2 - Aprende · Programa · Crea Con IA"
          class="mirio-logo-img mirio-2-python-logo"
        />
        <img
          v-else
          src="/images/mirio-logo.png"
          alt="Mirio - Aprende. Programa. Crea Con IA"
          class="mirio-logo-img"
        />
      </NuxtLink>

      <!-- Right Action Controls -->
      <div class="d-flex align-center ga-3 relative-box">
        <!-- Python Mode Pill (Desktop) -->
        <div v-if="isPythonCourse" class="python-navbar-pill d-none d-md-flex align-center ga-2 px-3 py-1">
          <img src="/images/python/python-snakes-icon.png" alt="Python" class="python-nav-icon" />
          <span class="python-nav-text">Modo Python 2.0</span>
          <span class="python-nav-badge">Activo</span>
        </div>

        <!-- User Pill (when authenticated) -->
        <div
          v-if="auth.isAuthenticated.value"
          class="user-nav-pill d-none d-sm-flex align-center ga-2 px-3 py-1 cursor-pointer"
          @click="toggleMenu"
        >
          <v-avatar size="28" class="user-pill-avatar">
            <v-img
              v-if="auth.user.value?.avatar"
              :src="auth.user.value.avatar"
              :alt="auth.user.value.name"
              cover
            />
            <span v-else class="user-pill-initials">{{ userInitials }}</span>
          </v-avatar>
          <span class="user-pill-name">{{ firstName }}</span>
          <v-icon icon="mdi-chevron-down" size="16" color="#34D399" />
        </div>

        <!-- Login Button (when guest) -->
        <NuxtLink
          v-else
          to="/login"
          class="text-decoration-none d-none d-sm-inline-flex"
        >
          <v-btn
            variant="outlined"
            rounded="lg"
            size="small"
            class="nav-login-btn text-none"
            prepend-icon="mdi-login"
          >
            Iniciar Sesión
          </v-btn>
        </NuxtLink>

        <!-- Notification Button -->
        <v-btn icon variant="flat" :class="['icon-btn', { 'python-btn': isPythonCourse }]" aria-label="Notificaciones">
          <v-badge :color="isPythonCourse ? '#FFD43B' : '#00E699'" dot location="top end" offset-x="4" offset-y="4">
            <v-icon icon="mdi-bell-outline" size="22" color="#E7EDEA" />
          </v-badge>
        </v-btn>

        <!-- Main Menu Trigger Button -->
        <v-btn
          icon
          variant="flat"
          :class="['icon-btn', 'menu-trigger-btn', { 'is-active': isMenuOpen, 'python-btn': isPythonCourse }]"
          aria-label="Abrir Menú"
          @click="toggleMenu"
        >
          <v-icon :icon="isMenuOpen ? 'mdi-close' : 'mdi-menu'" size="24" class="menu-icon-transition" />
        </v-btn>

        <!-- MIRIO ROBOTIC HAND ANIMATION CONTAINER -->
        <div :class="['mirio-hand-animator', { 'hand-extended': isMenuOpen, 'hand-retracting': isRetracting }]">
          <img src="/images/mirio-hand.svg" alt="Mano robótica de Mirio" class="mirio-robot-hand-svg" />
        </div>
      </div>
    </v-container>

    <!-- BACKDROP BLUR OVERLAY FOR MENU -->
    <Transition name="fade-backdrop">
      <div v-if="isMenuOpen" class="menu-backdrop" @click="closeMenu" />
    </Transition>

    <!-- DROPDOWN NAVIGATION MENU PULLED DOWN BY MIRIO'S HAND -->
    <Transition name="mirio-pull-down">
      <div v-if="isMenuOpen" :class="['mirio-dropdown-menu', { 'python-menu': isPythonCourse }]">
        <div class="dropdown-inner">
          <!-- Mirio Mascot Header Banner -->
          <div class="mirio-menu-header d-flex align-center ga-3 px-4 py-3 mb-4">
            <v-avatar size="44" class="mascot-avatar">
              <v-img
                v-if="auth.isAuthenticated.value && auth.user.value?.avatar"
                :src="auth.user.value.avatar"
                :alt="auth.user.value.name"
                cover
              />
              <v-img
                v-else-if="isPythonCourse"
                src="/images/python/mirio-face-happy.png"
                alt="Mirio Mascot"
                cover
              />
              <v-img
                v-else
                src="/images/mirio-mascot.png"
                alt="Mirio Mascot"
                cover
              />
            </v-avatar>
            <div class="flex-grow-1 text-truncate">
              <div class="mascot-greeting text-truncate">
                <template v-if="auth.isAuthenticated.value">¡Hola, {{ firstName }}! 👋</template>
                <template v-else-if="isPythonCourse">¡Hola, Pythonista! 🐍</template>
                <template v-else>¡Hola, Desarrollador! 👋</template>
              </div>
              <div class="mascot-bubble-text text-truncate">
                <template v-if="auth.isAuthenticated.value">{{ auth.user.value?.email }}</template>
                <template v-else-if="isPythonCourse">Mirio 2 te acompaña en Python</template>
                <template v-else>¿A dónde quieres ir hoy?</template>
              </div>
            </div>
            <div class="hand-pull-badge d-none d-sm-flex align-center ga-1">
              <v-icon icon="mdi-gesture-swipe-down" size="16" :color="isPythonCourse ? '#38BDF8' : '#00E699'" />
            </div>
          </div>

          <!-- 7 REQUESTED MENU ITEMS -->
          <div class="menu-items-grid">
            <NuxtLink
              v-for="(item, index) in menuItems"
              :key="item.title"
              :to="item.link"
              class="menu-item-card text-decoration-none"
              :style="{ animationDelay: `${index * 0.05 + 0.1}s` }"
              @click="closeMenu"
            >
              <div class="item-icon-wrapper" :style="{ background: item.bgGlow }">
                <v-icon :icon="item.icon" size="24" :color="item.iconColor" />
              </div>
              <div class="item-content">
                <div class="d-flex align-center justify-space-between">
                  <span class="item-title">{{ item.title }}</span>
                  <v-badge v-if="item.badge" :content="item.badge" color="#00E699" class="item-badge" inline />
                </div>
                <span class="item-subtitle">{{ item.subtitle }}</span>
              </div>
              <v-icon icon="mdi-chevron-right" size="18" class="item-arrow" />
            </NuxtLink>
          </div>

          <!-- Menu Auth Action (Logout if logged in, Login if guest) -->
          <div class="menu-auth-action mt-3 pt-2">
            <v-btn
              v-if="auth.isAuthenticated.value"
              variant="tonal"
              color="#EF4444"
              class="logout-btn text-none font-weight-bold"
              prepend-icon="mdi-logout"
              block
              rounded="lg"
              size="small"
              @click="handleLogout"
            >
              Cerrar Sesión
            </v-btn>
            <NuxtLink v-else to="/login" class="text-decoration-none" @click="closeMenu">
              <v-btn
                variant="flat"
                color="#00E699"
                class="login-menu-btn text-none font-weight-bold text-black"
                prepend-icon="mdi-login"
                block
                rounded="lg"
                size="small"
              >
                Iniciar Sesión
              </v-btn>
            </NuxtLink>
          </div>

          <!-- Bottom Footer Helper Bar -->
          <div class="menu-footer mt-4 pt-3 d-flex align-center justify-space-between">
            <div class="d-flex align-center ga-2 text-caption text-grey-lighten-1">
              <span class="status-dot"></span>
              <span>Mirio IA v2.0 • Asistente Activo</span>
            </div>
            <v-btn
              variant="text"
              density="compact"
              color="#00E699"
              class="text-none font-weight-bold text-caption"
              prepend-icon="mdi-sparkles"
              @click="closeMenu"
            >
              Preguntar a Mirio
            </v-btn>
          </div>
        </div>
      </div>
    </Transition>
  </header>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'

const auth = useAuth()
const route = useRoute()
const isPythonCourse = computed(() => {
  return route.path.includes('/cursos/python')
})

const firstName = computed(() => {
  if (!auth.user.value?.name) return 'Usuario'
  return auth.user.value.name.split(' ')[0]
})

const userInitials = computed(() => {
  if (!auth.user.value?.name) return 'U'
  return auth.user.value.name
    .split(' ')
    .map((n) => n[0])
    .join('')
    .toUpperCase()
    .slice(0, 2)
})

const isMenuOpen = ref(false)
const isRetracting = ref(false)

const toggleMenu = () => {
  if (isMenuOpen.value) {
    closeMenu()
  } else {
    isRetracting.value = false
    isMenuOpen.value = true
  }
}

const closeMenu = () => {
  if (!isMenuOpen.value) return
  isRetracting.value = true
  setTimeout(() => {
    isMenuOpen.value = false
    isRetracting.value = false
  }, 350)
}

const handleLogout = () => {
  auth.logout()
  closeMenu()
  navigateTo('/login')
}

// 7 EXPLICITLY REQUESTED MENU ITEMS
const menuItems = [
  {
    title: 'Inicio',
    subtitle: 'Panel principal y novedades',
    icon: 'mdi-home-variant-outline',
    iconColor: '#00E699',
    bgGlow: 'rgba(0, 230, 153, 0.12)',
    link: '/',
  },
  {
    title: 'Cursos',
    subtitle: 'Rutas de aprendizaje e IA',
    icon: 'mdi-school-outline',
    iconColor: '#38BDF8',
    bgGlow: 'rgba(56, 189, 248, 0.12)',
    badge: 'Popular',
    link: '#cursos',
  },
  {
    title: 'Practicar',
    subtitle: 'Desafíos de código en vivo',
    icon: 'mdi-code-tags',
    iconColor: '#F59E0B',
    bgGlow: 'rgba(245, 158, 11, 0.12)',
    badge: 'IA Live',
    link: '/practicar',
  },
  {
    title: 'Explorar',
    subtitle: 'Proyectos y comunidad',
    icon: 'mdi-compass-outline',
    iconColor: '#EC4899',
    bgGlow: 'rgba(236, 72, 153, 0.12)',
    link: '#explorar',
  },
  {
    title: 'Progreso',
    subtitle: 'Estadísticas y logros',
    icon: 'mdi-trophy-outline',
    iconColor: '#10B981',
    bgGlow: 'rgba(16, 185, 129, 0.12)',
    link: '#progreso',
  },
  {
    title: 'Ajustes',
    subtitle: 'Perfil y preferencias',
    icon: 'mdi-cog-outline',
    iconColor: '#A855F7',
    bgGlow: 'rgba(168, 85, 247, 0.12)',
    link: '#ajustes',
  },
  {
    title: 'Ayuda',
    subtitle: 'Soporte y documentación',
    icon: 'mdi-help-circle-outline',
    iconColor: '#00FFA6',
    bgGlow: 'rgba(0, 255, 166, 0.12)',
    link: '#ayuda',
  },
]
</script>

<style scoped>
.mirio-navbar {
  position: relative;
  z-index: 100;
  background: transparent;
  border-bottom: none;
}

.mirio-logo-img {
  height: 82px;
  max-height: 88px;
  width: auto;
  object-fit: contain;
  filter: drop-shadow(0 4px 14px rgba(0, 230, 153, 0.25));
  transition: transform 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
}

.brand-link:hover .mirio-logo-img {
  transform: scale(1.03);
}

.mirio-2-python-logo {
  height: 44px;
  filter: drop-shadow(0 0 12px rgba(56, 189, 248, 0.45));
}

.python-navbar-pill {
  background: rgba(13, 31, 74, 0.85);
  border: 1px solid rgba(56, 189, 248, 0.4);
  border-radius: 20px;
  box-shadow: 0 0 15px rgba(56, 189, 248, 0.2);
}

/* ===== USER AUTH NAVBAR STYLES ===== */
.user-nav-pill {
  background: rgba(13, 38, 30, 0.85);
  border: 1.5px solid rgba(52, 211, 153, 0.3);
  border-radius: 20px;
  box-shadow: 0 0 15px rgba(52, 211, 153, 0.15);
  transition: all 0.25s ease;
}

.user-nav-pill:hover {
  border-color: #34D399;
  background: rgba(19, 56, 44, 0.95);
  box-shadow: 0 0 20px rgba(52, 211, 153, 0.3);
}

.user-pill-avatar {
  border: 1.5px solid #34D399;
}

.user-pill-initials {
  font-size: 0.75rem;
  font-weight: 700;
  color: #34D399;
  background: rgba(52, 211, 153, 0.15);
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.user-pill-name {
  font-size: 0.84rem;
  font-weight: 700;
  color: #E7EDEA;
  max-width: 110px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.nav-login-btn {
  border-color: rgba(52, 211, 153, 0.4) !important;
  color: #34D399 !important;
  background: rgba(52, 211, 153, 0.08) !important;
  font-weight: 700 !important;
  font-size: 0.82rem !important;
  letter-spacing: 0.02em !important;
  transition: all 0.25s ease !important;
}

.nav-login-btn:hover {
  border-color: #34D399 !important;
  background: rgba(52, 211, 153, 0.18) !important;
  box-shadow: 0 0 16px rgba(52, 211, 153, 0.3) !important;
  transform: translateY(-1px);
}

.menu-auth-action {
  border-top: 1px solid rgba(255, 255, 255, 0.08);
}

.logout-btn {
  background: rgba(239, 68, 68, 0.1) !important;
  border: 1px solid rgba(239, 68, 68, 0.25) !important;
  transition: all 0.25s ease !important;
}

.logout-btn:hover {
  background: rgba(239, 68, 68, 0.2) !important;
  border-color: #EF4444 !important;
}

.login-menu-btn {
  background: linear-gradient(135deg, #059669 0%, #34D399 100%) !important;
  box-shadow: 0 4px 14px rgba(52, 211, 153, 0.3) !important;
}

.python-nav-icon {
  width: 22px;
  height: 22px;
  object-fit: contain;
}

.python-nav-text {
  font-size: 0.82rem;
  font-weight: 700;
  color: #38BDF8;
}

.python-nav-badge {
  background: rgba(255, 212, 59, 0.2);
  border: 1px solid rgba(255, 212, 59, 0.5);
  color: #FFD43B;
  font-size: 0.68rem;
  font-weight: 800;
  padding: 1px 6px;
  border-radius: 10px;
  text-transform: uppercase;
}

.relative-box {
  position: relative;
}

.icon-btn {
  width: 46px !important;
  height: 46px !important;
  border-radius: 14px !important;
  background: #0D261E !important;
  border: 1px solid rgba(0, 230, 153, 0.3) !important;
  color: #E7EDEA !important;
  transition: all 0.25s ease;
}

.icon-btn.python-btn {
  background: #0B1A3D !important;
  border-color: rgba(56, 189, 248, 0.4) !important;
  color: #E0F2FE !important;
}

.icon-btn.python-btn:hover {
  background: #11285A !important;
  border-color: #38BDF8 !important;
  box-shadow: 0 0 16px rgba(56, 189, 248, 0.45) !important;
}

.icon-btn:hover {
  background: #13382C !important;
  border-color: #00E699 !important;
  box-shadow: 0 0 14px rgba(0, 230, 153, 0.35) !important;
}

.menu-trigger-btn.is-active {
  background: #00E699 !important;
  color: #071913 !important;
  border-color: #00FFA6;
  box-shadow: 0 0 16px rgba(0, 230, 153, 0.6);
}

.menu-trigger-btn.is-active.python-btn {
  background: linear-gradient(135deg, #00D2FF 0%, #2563EB 100%) !important;
  color: #FFFFFF !important;
  border-color: #38BDF8;
  box-shadow: 0 0 20px rgba(0, 210, 255, 0.65) !important;
}

.python-menu {
  background: linear-gradient(170deg, #0A173A 0%, #060F26 100%) !important;
  border-color: rgba(56, 189, 248, 0.35) !important;
  box-shadow: 0 25px 60px rgba(2, 6, 23, 0.85), 0 0 30px rgba(56, 189, 248, 0.2) !important;
}

.python-menu .mirio-menu-header {
  background: rgba(16, 37, 86, 0.6) !important;
  border-bottom: 1px solid rgba(56, 189, 248, 0.2) !important;
}

.python-menu .menu-item-card:hover {
  background: rgba(22, 50, 115, 0.5) !important;
  border-color: rgba(56, 189, 248, 0.4) !important;
}

.menu-icon-transition {
  transition: transform 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
}

/* ========================================================== */
/* MIRIO ROBOTIC HAND PULL-DOWN ANIMATION STYLES             */
/* ========================================================== */

.mirio-hand-animator {
  position: absolute;
  top: 100%;
  right: 0;
  width: 140px;
  height: 260px;
  pointer-events: none;
  z-index: 120;
  opacity: 0;
  transform: translateY(-160px) scaleY(0.4);
  transform-origin: top center;
  transition: all 0.35s cubic-bezier(0.34, 1.56, 0.64, 1);
}

.mirio-robot-hand-svg {
  width: 100%;
  height: 100%;
  object-fit: contain;
  filter: drop-shadow(0 8px 20px rgba(0, 230, 153, 0.4));
}

.mirio-hand-animator.hand-extended {
  opacity: 1;
  animation: mirioArmPullDown 0.6s cubic-bezier(0.34, 1.56, 0.64, 1) forwards;
}

.mirio-hand-animator.hand-retracting {
  animation: mirioArmRetract 0.35s ease-in forwards;
}

@keyframes mirioArmPullDown {
  0% {
    opacity: 0;
    transform: translateY(-140px) scaleY(0.3) rotate(-10deg);
  }
  40% {
    opacity: 1;
    transform: translateY(20px) scaleY(1.15) rotate(4deg);
  }
  70% {
    transform: translateY(-5px) scaleY(0.95) rotate(-2deg);
  }
  100% {
    opacity: 1;
    transform: translateY(0) scaleY(1) rotate(0deg);
  }
}

@keyframes mirioArmRetract {
  0% {
    opacity: 1;
    transform: translateY(0) scaleY(1);
  }
  100% {
    opacity: 0;
    transform: translateY(-160px) scaleY(0.3);
  }
}

/* ========================================================== */
/* DROPDOWN MENU CONTAINER & TRANSITION                      */
/* ========================================================== */

.menu-backdrop {
  position: fixed;
  inset: 0;
  background: rgba(4, 14, 11, 0.7);
  backdrop-filter: blur(8px);
  z-index: 105;
}

.mirio-dropdown-menu {
  position: absolute;
  top: 100%;
  right: 16px;
  width: calc(100vw - 32px);
  max-width: 440px;
  max-height: min(580px, calc(85vh - 110px));
  overflow-y: auto;
  overflow-x: hidden;
  background: linear-gradient(165deg, rgba(12, 34, 27, 0.98) 0%, rgba(6, 19, 15, 0.99) 100%);
  border: 1.5px solid rgba(0, 230, 153, 0.35);
  border-radius: 24px;
  padding: 20px;
  z-index: 110;
  box-shadow: 0 20px 50px rgba(0, 0, 0, 0.75), 0 0 30px rgba(0, 230, 153, 0.25);
  transform-origin: top right;

  /* Sleek custom scrollbar */
  scrollbar-width: thin;
  scrollbar-color: #00E699 rgba(0, 0, 0, 0.3);
}

.mirio-dropdown-menu::-webkit-scrollbar {
  width: 6px;
}

.mirio-dropdown-menu::-webkit-scrollbar-track {
  background: rgba(0, 0, 0, 0.2);
  border-radius: 10px;
}

.mirio-dropdown-menu::-webkit-scrollbar-thumb {
  background: #00E699;
  border-radius: 10px;
}

/* Vue Transitions for Dropdown Menu */
.mirio-pull-down-enter-active {
  animation: menuElasticPullDown 0.55s cubic-bezier(0.34, 1.56, 0.64, 1) forwards;
}

.mirio-pull-down-leave-active {
  animation: menuElasticRetract 0.35s cubic-bezier(0.4, 0, 0.2, 1) forwards;
}

@keyframes menuElasticPullDown {
  0% {
    opacity: 0;
    transform: translateY(-60px) scale(0.85);
  }
  50% {
    opacity: 1;
    transform: translateY(12px) scale(1.02);
  }
  75% {
    transform: translateY(-4px) scale(0.99);
  }
  100% {
    opacity: 1;
    transform: translateY(0) scale(1);
  }
}

@keyframes menuElasticRetract {
  0% {
    opacity: 1;
    transform: translateY(0) scale(1);
  }
  100% {
    opacity: 0;
    transform: translateY(-40px) scale(0.9);
  }
}

.fade-backdrop-enter-active,
.fade-backdrop-leave-active {
  transition: opacity 0.3s ease;
}

.fade-backdrop-enter-from,
.fade-backdrop-leave-to {
  opacity: 0;
}

/* ========================================================== */
/* MENU CONTENT & CARD STYLING                                */
/* ========================================================== */

.mirio-menu-header {
  background: rgba(0, 230, 153, 0.08);
  border: 1px solid rgba(0, 230, 153, 0.2);
  border-radius: 16px;
}

.mascot-avatar {
  background: #0E2A22;
  border: 1.5px solid #00E699;
}

.mascot-greeting {
  font-size: 0.95rem;
  font-weight: 700;
  color: #FFFFFF;
}

.mascot-bubble-text {
  font-size: 0.8rem;
  color: #00E699;
  font-weight: 600;
}

.hand-pull-badge {
  font-size: 0.7rem;
  color: #9CA8A4;
  background: rgba(0, 0, 0, 0.3);
  padding: 4px 8px;
  border-radius: 20px;
  border: 1px stroke rgba(0, 230, 153, 0.2);
}

.menu-items-grid {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.menu-item-card {
  display: flex;
  align-items: center;
  gap: 14px;
  padding: 12px 14px;
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid rgba(255, 255, 255, 0.07);
  border-radius: 16px;
  transition: all 0.25s cubic-bezier(0.4, 0, 0.2, 1);
  animation: itemFadeSlide 0.35s ease-out backwards;
}

.menu-item-card:hover {
  background: rgba(0, 230, 153, 0.1);
  border-color: rgba(0, 230, 153, 0.4);
  transform: translateX(6px);
  box-shadow: 0 4px 16px rgba(0, 230, 153, 0.15);
}

.item-icon-wrapper {
  width: 42px;
  height: 42px;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  border: 1px solid rgba(255, 255, 255, 0.1);
}

.item-content {
  flex-grow: 1;
}

.item-title {
  font-weight: 700;
  font-size: 0.95rem;
  color: #F0F6F4;
}

.item-subtitle {
  display: block;
  font-size: 0.78rem;
  color: #8E9E98;
}

.item-arrow {
  color: #5C6E67;
  transition: transform 0.2s ease, color 0.2s ease;
}

.menu-item-card:hover .item-arrow {
  color: #00E699;
  transform: translateX(4px);
}

.menu-footer {
  border-top: 1px solid rgba(255, 255, 255, 0.08);
}

.status-dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: #00E699;
  box-shadow: 0 0 8px #00E699;
  display: inline-block;
}

@keyframes itemFadeSlide {
  0% {
    opacity: 0;
    transform: translateY(10px);
  }
  100% {
    opacity: 1;
    transform: translateY(0);
  }
}

@media (max-width: 600px) {
  .mirio-logo-img {
    height: 42px;
  }
  .mirio-dropdown-menu {
    right: 8px;
    width: calc(100vw - 16px);
    padding: 16px;
    border-radius: 18px;
    max-height: calc(90vh - 80px);
  }
  .icon-btn {
    width: 38px !important;
    height: 38px !important;
    border-radius: 10px !important;
  }
  .menu-item-card {
    padding: 10px 12px;
    gap: 10px;
  }
  .item-icon-wrapper {
    width: 36px;
    height: 36px;
    border-radius: 10px;
  }
  .item-title {
    font-size: 0.88rem;
  }
  .item-subtitle {
    font-size: 0.72rem;
  }
}

@media (max-width: 400px) {
  .mirio-logo-img {
    height: 34px;
  }
  .icon-btn {
    width: 34px !important;
    height: 34px !important;
    border-radius: 8px !important;
  }
  .mirio-dropdown-menu {
    right: 4px;
    width: calc(100vw - 8px);
    padding: 12px;
    border-radius: 16px;
  }
  .mascot-greeting {
    font-size: 0.85rem;
  }
  .mascot-bubble-text {
    font-size: 0.72rem;
  }
}
</style>
