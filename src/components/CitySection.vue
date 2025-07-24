<!-- src/components/CitySection.vue -->
<script setup lang="ts">
import type { City } from '@/types/itinerary'
import DayCard from './DayCard.vue'

defineProps<{
  city: City
}>()
</script>

<template>
  <section class="city-section" :id="city.id">
    <h2>{{ city.nombre }}</h2>
    <DayCard
      v-for="day in city.dias"
      :key="`${city.id}-${day.titulo}`"
      :day="day"
      :border-color="city.colorBorde"
    />
  </section>
</template>

<style scoped>
.city-section {
  margin-bottom: 3.5rem;
}

.city-section h2 {
  font-family: 'Rajdhani', sans-serif;
  font-size: 2.8rem;
  font-weight: 700;
  color: var(--color-text-primary);
  border-bottom: 4px solid var(--color-accent-primary);
  padding-bottom: 0.8rem;
  margin-bottom: 2rem;
  text-transform: uppercase;
  letter-spacing: 1px;
}

@media (max-width: 768px) {
  .city-section h2 {
    font-size: 2rem;
  }
}
</style>
