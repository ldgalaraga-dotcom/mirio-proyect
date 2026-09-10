<template>
  <section id="cursos" class="paths-section-wrapper py-3 py-sm-4 px-3 px-sm-6 px-lg-8">
    <div class="paths-card">
      <div class="px-4 px-md-8 pt-6 pb-2">
        <h2 class="section-title">Rutas de aprendizaje</h2>
        <p class="section-subtitle">Comienza desde cero y construye tus habilidades.</p>
      </div>

      <div class="paths-grid px-4 px-md-8 pb-8 pt-2">
        <LearningPathCard
          v-for="path in paths"
          :key="path.id"
          v-bind="path"
          @select="handleSelect"
        />
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { initialLearningPaths } from '~/data/learningPaths'

const paths = ref(initialLearningPaths)

const handleSelect = (id?: string) => {
  if (!id) return
  const target = paths.value.find(p => p.id === id)
  if (target && target.progress < 100) {
    target.progress = Math.min(100, target.progress + 20)
  }
}
</script>

<style scoped>
.paths-section-wrapper {
  max-width: 1400px;
  margin: 0 auto;
  width: 100%;
}

.paths-card {
  background: linear-gradient(165deg, #061914 0%, #03120e 100%);
  border: 1.5px solid rgba(0, 230, 153, 0.16);
  border-radius: 28px;
  position: relative;
  box-shadow: 0 20px 50px rgba(0, 0, 0, 0.6), inset 0 1px 1px rgba(0, 230, 153, 0.15);
}

.section-title {
  color: #FFFFFF;
  font-size: 1.45rem;
  font-weight: 800;
  margin-bottom: 0.25rem;
}

.section-subtitle {
  color: #8E9E98;
  font-size: 0.92rem;
}

.paths-grid {
  display: grid;
  grid-template-columns: repeat(5, minmax(0, 1fr));
  gap: 1.1rem;
}

@media (max-width: 1264px) {
  .paths-grid {
    grid-template-columns: repeat(3, minmax(0, 1fr));
  }
}

@media (max-width: 760px) {
  .paths-grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
}

@media (max-width: 600px) {
  .paths-section-wrapper {
    padding-left: 0.5rem;
    padding-right: 0.5rem;
  }
  .paths-card {
    border-radius: 20px;
    padding: 0;
  }
  .paths-grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 0.75rem;
  }
  .section-title {
    font-size: 1.2rem;
  }
  .section-subtitle {
    font-size: 0.82rem;
  }
}

@media (max-width: 420px) {
  .paths-section-wrapper {
    padding-left: 0.35rem;
    padding-right: 0.35rem;
  }
  .paths-card {
    border-radius: 16px;
  }
  .paths-grid {
    grid-template-columns: 1fr;
  }
  .section-title {
    font-size: 1.1rem;
  }
}

@media (min-width: 1800px) {
  .paths-section-wrapper {
    max-width: 1600px;
  }
}
</style>
