<template>
  <section class="stats-section">
    <v-container fluid class="pb-8">
      <div class="stats-bar">
        <div v-for="stat in stats" :key="stat.label" class="stat-item">
          <v-icon :icon="stat.icon" :color="stat.color" size="26" class="mb-1" />
          <div class="stat-value">{{ stat.value }}</div>
          <div class="stat-label">{{ stat.label }}</div>
        </div>
      </div>
    </v-container>
  </section>
</template>

<script setup lang="ts">
const stats = [
  { icon: 'mdi-code-tags', color: '#34D399', value: '0', label: 'Lenguajes explorados' },
  { icon: 'mdi-book-open-page-variant-outline', color: '#34D399', value: '0', label: 'Lecciones completadas' },
  { icon: 'mdi-clock-time-four-outline', color: '#34D399', value: '0 h', label: 'Tiempo de aprendizaje' },
  { icon: 'mdi-trophy-outline', color: '#F2B84B', value: '0', label: 'Logros obtenidos' },
  { icon: 'mdi-fire', color: '#F2734B', value: '0 días', label: 'Racha actual' },
]
</script>

<style scoped>
.stats-section {
  padding: 0 0.75rem;
}

.stats-bar {
  background: #0F1D19;
  border: 1px solid #1E332C;
  border-radius: 20px;
  padding: 1.75rem 1rem;
  display: grid;
  grid-template-columns: repeat(5, minmax(0, 1fr));
  gap: 1rem;
  max-width: 1400px;
  margin: 0 auto;
}

.stat-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
}

.stat-value {
  color: #F4F7F5;
  font-size: clamp(1rem, 2.5vw, 1.4rem);
  font-weight: 800;
  line-height: 1.2;
}

.stat-label {
  color: #92A19B;
  font-size: clamp(0.65rem, 1.5vw, 0.8rem);
  margin-top: 0.15rem;
}

@media (max-width: 900px) {
  .stats-bar {
    grid-template-columns: repeat(3, minmax(0, 1fr));
    gap: 1rem 0.5rem;
  }
}

@media (max-width: 600px) {
  .stats-section {
    padding: 0 0.5rem;
  }
  .stats-bar {
    grid-template-columns: repeat(3, minmax(0, 1fr));
    padding: 1.25rem 0.5rem;
    border-radius: 16px;
    gap: 0.75rem 0.35rem;
  }
}

@media (max-width: 400px) {
  .stats-section {
    padding: 0 0.35rem;
  }
  .stats-bar {
    grid-template-columns: repeat(2, minmax(0, 1fr));
    padding: 1rem 0.5rem;
    border-radius: 14px;
    gap: 0.75rem;
  }
}

@media (min-width: 1800px) {
  .stats-bar {
    max-width: 1600px;
  }
}
</style>
