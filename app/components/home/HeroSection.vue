<template>
  <section class="hero-section-wrapper py-3 py-sm-4 px-3 px-sm-6 px-lg-8">
    <div class="hero-card">
      <!-- App Header Navigation inside Hero Card -->
      <AppNavbar />

      <!-- Main Hero Body Content -->
      <v-container fluid class="hero-content px-4 px-md-10 pb-6 pb-md-10 pt-1 pt-md-3">
        <v-row align="center" no-gutters>
          <!-- Left Column: Copy & Actions -->
          <v-col cols="12" md="6" class="hero-copy">
            <p class="hero-greeting">¡Hola, Desarrollador! 👋</p>
            <h1 class="hero-title text-balance">
              ¿Qué vas a <span class="text-primary">aprender</span> hoy?
            </h1>

            <div class="quick-actions">
              <button
                v-for="action in quickActions"
                :key="action.label"
                type="button"
                class="quick-action-card"
              >
                <v-icon :icon="action.icon" size="26" color="#00E699" />
                <span>{{ action.label }}</span>
              </button>
            </div>
          </v-col>

          <!-- Right Column: Mascot Visual with Green Aura Circle & Floating Pixel Particles -->
          <v-col cols="12" md="6" class="hero-visual d-none d-md-flex">
            <div class="mascot-wrapper">
              <!-- Green Glow Background Circle -->
              <div class="glow-circle-bg"></div>

              <!-- Floating Pixel Squares -->
              <div class="pixel-square p1"></div>
              <div class="pixel-square p2"></div>
              <div class="pixel-square p3"></div>
              <div class="pixel-square p4"></div>
              <div class="pixel-square p5"></div>
              <div class="pixel-square p6"></div>
              <div class="pixel-square p7"></div>

              <!-- Mascot Robot Image -->
              <img
                src="/images/mirio-mascot.png"
                alt="Mirio, la mascota robot de la app"
                class="mascot-img"
              />
            </div>
          </v-col>
        </v-row>
      </v-container>
    </div>
  </section>
</template>

<script setup lang="ts">
const quickActions = [
  { icon: 'mdi-code-tags', label: 'Elige un\nlenguaje' },
  { icon: 'mdi-book-open-page-variant-outline', label: 'Aprende\npaso a paso' },
  { icon: 'mdi-trophy-outline', label: 'Sigue tu\nprogreso' },
]
</script>

<style scoped>
.hero-section-wrapper {
  max-width: 1400px;
  margin: 0 auto;
  width: 100%;
}

/* Main Container Div with custom dark green gradient matching screenshot */
.hero-card {
  background: linear-gradient(165deg, #061914 0%, #03120e 100%);
  border: 1.5px solid rgba(0, 230, 153, 0.16);
  border-radius: 28px;
  position: relative;
  overflow: visible;
  box-shadow: 0 20px 50px rgba(0, 0, 0, 0.6), inset 0 1px 1px rgba(0, 230, 153, 0.15);
}

.hero-greeting {
  color: #00E699;
  font-weight: 700;
  font-size: 1.05rem;
  margin-bottom: 0.5rem;
  letter-spacing: 0.2px;
}

.hero-title {
  font-size: clamp(2rem, 3.8vw, 2.65rem);
  font-weight: 800;
  color: #FFFFFF;
  line-height: 1.2;
  margin-bottom: 1.8rem;
}

.text-primary {
  color: #00E699 !important;
  font-weight: 800;
}

.quick-actions {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 0.9rem;
  max-width: 580px;
}

.quick-action-card {
  background: #08211b;
  border: 1px solid rgba(0, 230, 153, 0.18);
  border-radius: 16px;
  padding: 1.1rem 0.6rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 0.55rem;
  color: #F0F6F4;
  font-weight: 600;
  font-size: 0.88rem;
  line-height: 1.25;
  text-align: center;
  white-space: pre-line;
  cursor: pointer;
  transition: all 0.25s cubic-bezier(0.4, 0, 0.2, 1);
}

.quick-action-card:hover {
  border-color: #00E699;
  background: #0c2d24;
  transform: translateY(-3px);
  box-shadow: 0 8px 20px rgba(0, 230, 153, 0.18);
}

.hero-visual {
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
}

.mascot-wrapper {
  position: relative;
  width: 100%;
  max-width: 440px;
  aspect-ratio: 1 / 1;
  display: flex;
  align-items: center;
  justify-content: center;
}

.glow-circle-bg {
  position: absolute;
  width: 86%;
  height: 86%;
  border-radius: 50%;
  background: radial-gradient(circle at 50% 50%, rgb(13, 248, 80) 0%, #10B981 55%, #05291f 100%);
  box-shadow: 0 0 50px rgba(13, 215, 34, 0.776);
}

.mascot-img {
  position: relative;
  z-index: 2;
  width: 105%;
  max-width: 480px;
  object-fit: contain;
  filter: drop-shadow(0 15px 30px rgba(0, 0, 0, 0.45));
}

/* Floating Pixel Squares matching image */
.pixel-square {
  position: absolute;
  background: #00E699;
  border-radius: 2px;
  z-index: 3;
  box-shadow: 0 0 8px rgba(0, 230, 153, 0.8);
  animation: floatPixel 4s ease-in-out infinite alternate;
}

.p1 { width: 12px; height: 12px; top: 10%; right: 12%; animation-delay: 0s; }
.p2 { width: 8px;  height: 8px;  top: 22%; left: 6%;   animation-delay: 0.7s; }
.p3 { width: 14px; height: 14px; bottom: 16%; right: 6%; animation-delay: 1.2s; }
.p4 { width: 10px; height: 10px; bottom: 10%; left: 14%; animation-delay: 1.8s; }
.p5 { width: 6px;  height: 6px;  top: 42%; right: 3%;  animation-delay: 0.4s; }
.p6 { width: 10px; height: 10px; top: 6%; left: 30%;   animation-delay: 2.2s; }
.p7 { width: 8px;  height: 8px;  bottom: 28%; left: 4%; animation-delay: 1.5s; }

@keyframes floatPixel {
  0% { transform: translateY(0px) rotate(0deg); opacity: 0.7; }
  100% { transform: translateY(-10px) rotate(12deg); opacity: 1; }
}

@media (max-width: 960px) {
  .quick-actions {
    max-width: 100%;
  }
  .hero-content {
    text-align: center;
  }
  .hero-copy {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  .quick-actions {
    justify-content: center;
  }
}

@media (max-width: 600px) {
  .hero-section-wrapper {
    padding-left: 0.5rem;
    padding-right: 0.5rem;
  }
  .hero-card {
    border-radius: 20px;
  }
  .hero-title {
    font-size: clamp(1.5rem, 7vw, 2rem);
  }
  .hero-greeting {
    font-size: 0.92rem;
  }
  .quick-actions {
    grid-template-columns: repeat(3, minmax(0, 1fr));
    gap: 0.5rem;
  }
  .quick-action-card {
    padding: 0.85rem 0.4rem;
    font-size: 0.8rem;
    border-radius: 12px;
  }
}

@media (max-width: 400px) {
  .hero-section-wrapper {
    padding-left: 0.35rem;
    padding-right: 0.35rem;
  }
  .hero-card {
    border-radius: 16px;
  }
  .hero-title {
    font-size: clamp(1.3rem, 6vw, 1.7rem);
    margin-bottom: 1.2rem;
  }
  .hero-greeting {
    font-size: 0.85rem;
  }
  .quick-actions {
    grid-template-columns: 1fr 1fr;
    gap: 0.45rem;
  }
  .quick-action-card {
    padding: 0.7rem 0.35rem;
    font-size: 0.75rem;
    border-radius: 10px;
  }
}

@media (min-width: 1800px) {
  .hero-section-wrapper {
    max-width: 1600px;
  }
  .hero-title {
    font-size: 3rem;
  }
  .mascot-wrapper {
    max-width: 520px;
  }
}
</style>
