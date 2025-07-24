<!-- src/components/KeyPlacesSection.vue -->
<script setup lang="ts">
import type { KeyPlace } from '@/types/itinerary'

defineProps<{
  keyPlaces: KeyPlace[]
  borderColor: string
}>()

const getImportanceClass = (importance: string) => {
  switch (importance) {
    case 'must-see': return 'importance-must-see'
    case 'recommended': return 'importance-recommended'
    case 'optional': return 'importance-optional'
    default: return 'importance-recommended'
  }
}

const getImportanceLabel = (importance: string) => {
  switch (importance) {
    case 'must-see': return 'Imprescindible'
    case 'recommended': return 'Recomendado'
    case 'optional': return 'Opcional'
    default: return 'Recomendado'
  }
}
</script>

<template>
  <section class="key-places-section">
    <h2 :style="{ borderColor: borderColor }">🗺️ Lugares Clave del Día</h2>
    
    <div class="places-grid">
      <div
        v-for="place in keyPlaces"
        :key="place.name"
        class="place-card"
      >
        <!-- Place Header -->
        <div class="place-header">
          <h3>{{ place.name }}</h3>
          <div class="place-meta">
            <span 
              :class="['importance-badge', getImportanceClass(place.importance)]"
            >
              {{ getImportanceLabel(place.importance) }}
            </span>
            <span v-if="place.timeSlot" class="time-slot">
              ⏰ {{ place.timeSlot }}
            </span>
          </div>
        </div>

        <!-- Place Description -->
        <p class="place-description">{{ place.description }}</p>

        <!-- Options (if available) -->
        <div v-if="place.options && place.options.length > 0" class="place-options">
          <h4>Opciones disponibles:</h4>
          <ul class="options-list">
            <li v-for="option in place.options" :key="option" class="option-item">
              {{ option }}
            </li>
          </ul>
        </div>

        <!-- Trivia (if available) -->
        <div v-if="place.trivia && place.trivia.length > 0" class="place-trivia">
          <h4>💡 Dato curioso:</h4>
          <ul class="trivia-list">
            <li v-for="fact in place.trivia" :key="fact" class="trivia-item">
              {{ fact }}
            </li>
          </ul>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.key-places-section {
  margin-bottom: 3rem;
}

.key-places-section h2 {
  font-family: 'Rajdhani', sans-serif;
  font-size: 1.8rem;
  font-weight: 600;
  color: var(--color-text-primary);
  margin-bottom: 2rem;
  padding-bottom: 0.5rem;
  border-bottom: 2px solid;
}

.places-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
  gap: 2rem;
}

.place-card {
  background: rgba(255, 255, 255, 0.05);
  border-radius: var(--border-radius);
  padding: 2rem;
  transition: transform 0.2s ease, background 0.2s ease;
}

.place-card:hover {
  transform: translateY(-4px);
  background: rgba(255, 255, 255, 0.08);
}

.place-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 1rem;
  flex-wrap: wrap;
  gap: 1rem;
}

.place-header h3 {
  font-size: 1.4rem;
  font-weight: 600;
  color: var(--color-text-primary);
  margin: 0;
  flex: 1;
}

.place-meta {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  align-items: flex-end;
}

.importance-badge {
  padding: 0.3rem 0.8rem;
  border-radius: 20px;
  font-size: 0.75rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.importance-must-see {
  background: linear-gradient(135deg, #FF6B6B 0%, #EE5A24 100%);
  color: white;
}

.importance-recommended {
  background: linear-gradient(135deg, #4ECDC4 0%, #44A08D 100%);
  color: white;
}

.importance-optional {
  background: linear-gradient(135deg, #A8E6CF 0%, #88D8A3 100%);
  color: #2c3e50;
}

.time-slot {
  font-size: 0.85rem;
  color: var(--color-text-secondary);
  font-weight: 500;
}

.place-description {
  color: var(--color-text-secondary);
  line-height: 1.6;
  margin-bottom: 1.5rem;
  font-size: 0.95rem;
}

.place-options, .place-trivia {
  margin-top: 1.5rem;
}

.place-options h4, .place-trivia h4 {
  font-size: 1rem;
  font-weight: 600;
  color: var(--color-text-primary);
  margin: 0 0 0.75rem 0;
}

.options-list, .trivia-list {
  list-style: none;
  padding: 0;
  margin: 0;
}

.option-item, .trivia-item {
  padding: 0.5rem 0;
  color: var(--color-text-secondary);
  font-size: 0.9rem;
  line-height: 1.4;
  position: relative;
  padding-left: 1.5rem;
}

.option-item::before {
  content: "▸";
  position: absolute;
  left: 0;
  color: var(--color-accent-primary);
  font-weight: bold;
}

.trivia-item::before {
  content: "💭";
  position: absolute;
  left: 0;
  font-size: 0.8rem;
}

/* Responsive Design */
@media (max-width: 768px) {
  .places-grid {
    grid-template-columns: 1fr;
  }
  
  .place-header {
    flex-direction: column;
    align-items: flex-start;
  }
  
  .place-meta {
    align-items: flex-start;
  }
  
  .place-card {
    padding: 1.5rem;
  }
}
</style>