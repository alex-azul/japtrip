<!-- src/components/DayCard.vue -->
<script setup lang="ts">
import type { Day } from '@/types/itinerary'

defineProps<{
  day: Day
  borderColor: string
}>()
</script>

<template>
  <div class="day-card" :style="{ borderColor: borderColor }">
    <div class="day-header">
      <h3>
        {{ day.titulo }} <span class="date">({{ day.fecha }})</span>
      </h3>
      <div class="status-container">
        <div
          v-for="status in day.status"
          :key="status.texto"
          :class="`status-badge ${status.clase}`"
        >
          {{ status.texto }}
        </div>
      </div>
    </div>
    <ul class="key-points-list">
      <li v-for="punto in day.puntosClave" :key="punto.titulo" class="key-point">
        <span class="icon">{{ punto.icono }}</span>
        <div class="text-content">
          <strong>{{ punto.titulo }}</strong>
          <span>{{ punto.descripcion }}</span>
        </div>
      </li>
    </ul>
  </div>
</template>

<style scoped>
.day-card {
  background-color: var(--color-card-bg);
  border-radius: var(--border-radius);
  box-shadow: var(--shadow);
  padding: 1.5rem 2rem;
  margin-bottom: 2rem;
  border-left: 6px solid;
  transition:
    transform 0.3s ease,
    box-shadow 0.3s ease;
}

.day-card:hover {
  transform: translateY(-8px) scale(1.02);
  box-shadow: 0 12px 30px rgba(0, 0, 0, 0.7);
}

.day-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 1rem;
  margin-bottom: 1rem;
  border-bottom: 1px solid #333;
  padding-bottom: 1rem;
}

.day-header h3 {
  font-family: 'Rajdhani', sans-serif;
  font-size: 1.8rem;
  font-weight: 700;
  color: var(--color-text-primary);
  margin: 0;
}

.day-header .date {
  font-weight: 500;
  color: var(--color-text-secondary);
  margin-left: 0.5rem;
}

.day-header .status-container {
  display: flex;
  gap: 0.5rem;
  flex-wrap: wrap;
}

.key-points-list {
  list-style: none;
  margin-top: 1.5rem;
}

.key-point {
  display: flex;
  align-items: flex-start;
  margin-bottom: 1.25rem;
}

.key-point .icon {
  font-size: 1.8rem;
  margin-right: 1rem;
  margin-top: -4px;
}

.key-point .text-content strong {
  display: block;
  font-size: 1.1rem;
  color: var(--color-text-primary);
  margin-bottom: 0.25rem;
}

.key-point .text-content span {
  font-size: 0.95rem;
  color: var(--color-text-secondary);
}

.status-badge {
  padding: 0.4rem 1rem;
  border-radius: 50px;
  font-size: 0.8rem;
  font-weight: 700;
  color: #fff;
  text-transform: uppercase;
}

@media (max-width: 768px) {
  .day-card {
    padding: 1.5rem;
  }
  .day-header h3 {
    font-size: 1.5rem;
  }
}
</style>
