<template>
  <div :class="['learning-path-card', { 'is-python-card': id === 'python' }]">
    <div class="card-header d-flex align-center ga-3 mb-4">
      <div class="logo-wrapper">
        <img v-if="logo" :src="logo" :alt="title" class="path-logo-img" />
        <v-icon v-else :icon="icon || 'mdi-code-tags'" size="28" color="#00E699" />
      </div>
      <div class="path-info">
        <div class="d-flex align-center justify-space-between">
          <h3 class="path-title">{{ title }}</h3>
          <span v-if="id === 'python'" class="mirio-2-badge-home">Mirio 2</span>
        </div>
        <p class="path-description mb-0">{{ description }}</p>
      </div>
    </div>

    <div class="path-progress mt-auto">
      <div class="path-progress-labels">
        <span>Progreso</span>
        <span>{{ progress }}%</span>
      </div>
      <v-progress-linear
        :model-value="progress"
        color="#00E699"
        bg-color="#0e2a22"
        height="6"
        rounded
      />
    </div>

    <NuxtLink v-if="courseRoute" :to="courseRoute" class="text-decoration-none d-block mt-4">
      <v-btn block color="#00E699" class="path-btn" rounded="lg" size="large">
        Comenzar
      </v-btn>
    </NuxtLink>
    <v-btn v-else block color="#00E699" class="path-btn mt-4" rounded="lg" size="large" @click="$emit('select', id)">
      Comenzar
    </v-btn>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps<{
  id?: string
  title: string
  description: string
  logo?: string
  icon?: string
  progress?: number
}>()

defineEmits(['select'])

// Map learning path IDs to their dedicated course pages
const courseRouteMap: Record<string, string> = {
  python: '/cursos/python',
  javascript: '/cursos/javascript',
}

const courseRoute = computed(() => props.id ? courseRouteMap[props.id] : undefined)
</script>

<style scoped>
.learning-path-card {
  background: #08211b;
  border: 1px solid rgba(0, 230, 153, 0.18);
  border-radius: 18px;
  padding: 1.25rem;
  height: 100%;
  display: flex;
  flex-direction: column;
  transition: all 0.25s cubic-bezier(0.4, 0, 0.2, 1);
}

.learning-path-card.is-python-card {
  background: linear-gradient(165deg, #091a42 0%, #050d22 100%);
  border-color: rgba(56, 189, 248, 0.35);
}

.learning-path-card.is-python-card:hover {
  border-color: #38BDF8;
  box-shadow: 0 8px 25px rgba(56, 189, 248, 0.25), 0 0 15px rgba(255, 212, 59, 0.15);
}

.mirio-2-badge-home {
  font-size: 0.65rem;
  font-weight: 800;
  background: rgba(255, 212, 59, 0.15);
  border: 1px solid rgba(255, 212, 59, 0.4);
  color: #FFD43B;
  padding: 1px 6px;
  border-radius: 8px;
  text-transform: uppercase;
  letter-spacing: 0.3px;
}

.learning-path-card:hover {
  border-color: #00E699;
  transform: translateY(-3px);
  box-shadow: 0 8px 24px rgba(0, 230, 153, 0.18);
}

.logo-wrapper {
  width: 48px;
  height: 48px;
  flex-shrink: 0;
  display: flex;
  align-items: center;
  justify-content: center;
}

.path-logo-img {
  width: 100%;
  height: 100%;
  object-fit: contain;
}

.path-info {
  flex-grow: 1;
}

.path-title {
  color: #F4F7F5;
  font-size: 1.05rem;
  font-weight: 700;
  line-height: 1.2;
}

.path-description {
  color: #8E9E98;
  font-size: 0.82rem;
  line-height: 1.3;
}

.path-progress-labels {
  display: flex;
  justify-content: space-between;
  font-size: 0.78rem;
  color: #8E9E98;
  margin-bottom: 0.4rem;
}

.path-btn {
  color: #041713 !important;
  font-weight: 700 !important;
  text-transform: none;
  box-shadow: none !important;
  transition: all 0.2s ease;
}

.is-python-card .path-btn {
  background: linear-gradient(135deg, #00D2FF 0%, #2563EB 100%) !important;
  color: #FFFFFF !important;
}

.is-python-card .path-btn:hover {
  box-shadow: 0 0 20px rgba(0, 210, 255, 0.6) !important;
}

.path-btn:hover {
  box-shadow: 0 0 16px rgba(0, 230, 153, 0.5) !important;
}

@media (max-width: 600px) {
  .learning-path-card {
    padding: 1rem;
    border-radius: 14px;
  }
  .logo-wrapper {
    width: 40px;
    height: 40px;
  }
  .path-title {
    font-size: 0.92rem;
  }
  .path-description {
    font-size: 0.75rem;
  }
  .path-progress-labels {
    font-size: 0.72rem;
  }
}

@media (max-width: 400px) {
  .learning-path-card {
    padding: 0.85rem;
    border-radius: 12px;
  }
  .logo-wrapper {
    width: 36px;
    height: 36px;
  }
  .path-title {
    font-size: 0.85rem;
  }
  .path-description {
    font-size: 0.7rem;
  }
}
</style>
