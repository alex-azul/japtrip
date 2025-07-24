<!-- src/components/RestaurantsSection.vue -->
<script setup lang="ts">
import type { Restaurant } from '@/types/itinerary'

defineProps<{
  restaurants: Restaurant[]
  borderColor: string
}>()

const getPriceDisplay = (priceRange: string) => {
  switch (priceRange) {
    case '$': return '💰'
    case '$$': return '💰💰'
    case '$$$': return '💰💰💰'
    case '$$$$': return '💰💰💰💰'
    default: return '💰'
  }
}

const getPriceClass = (priceRange: string) => {
  switch (priceRange) {
    case '$': return 'price-budget'
    case '$$': return 'price-moderate'
    case '$$$': return 'price-expensive'
    case '$$$$': return 'price-luxury'
    default: return 'price-moderate'
  }
}
</script>

<template>
  <section class="restaurants-section">
    <h2 :style="{ borderColor: borderColor }">🍜 Restaurantes Recomendados</h2>
    
    <div class="restaurants-grid">
      <div
        v-for="restaurant in restaurants"
        :key="restaurant.name"
        class="restaurant-card"
      >
        <!-- Restaurant Header -->
        <div class="restaurant-header">
          <h3>{{ restaurant.name }}</h3>
          <div class="restaurant-meta">
            <span :class="['price-badge', getPriceClass(restaurant.priceRange)]">
              {{ getPriceDisplay(restaurant.priceRange) }}
            </span>
            <span class="cuisine-type">{{ restaurant.type }}</span>
          </div>
        </div>

        <!-- Restaurant Info -->
        <div class="restaurant-info">
          <div class="specialty">
            <h4>🌟 Especialidad</h4>
            <p>{{ restaurant.specialty }}</p>
          </div>

          <div v-if="restaurant.walkTime" class="walk-time">
            <span class="walk-icon">🚶</span>
            <span class="walk-text">{{ restaurant.walkTime }}</span>
          </div>
        </div>

        <!-- Additional Notes -->
        <div v-if="restaurant.notes" class="restaurant-notes">
          <h4>💡 Información adicional</h4>
          <p>{{ restaurant.notes }}</p>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.restaurants-section {
  margin-bottom: 3rem;
}

.restaurants-section h2 {
  font-family: 'Rajdhani', sans-serif;
  font-size: 1.8rem;
  font-weight: 600;
  color: var(--color-text-primary);
  margin-bottom: 2rem;
  padding-bottom: 0.5rem;
  border-bottom: 2px solid;
}

.restaurants-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  gap: 2rem;
}

.restaurant-card {
  background: rgba(255, 255, 255, 0.05);
  border-radius: var(--border-radius);
  padding: 2rem;
  transition: transform 0.2s ease, background 0.2s ease;
  border: 1px solid rgba(255, 255, 255, 0.1);
}

.restaurant-card:hover {
  transform: translateY(-4px);
  background: rgba(255, 255, 255, 0.08);
  border-color: rgba(255, 255, 255, 0.2);
}

.restaurant-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 1.5rem;
  flex-wrap: wrap;
  gap: 1rem;
}

.restaurant-header h3 {
  font-size: 1.4rem;
  font-weight: 600;
  color: var(--color-text-primary);
  margin: 0;
  flex: 1;
}

.restaurant-meta {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  align-items: flex-end;
}

.price-badge {
  padding: 0.3rem 0.6rem;
  border-radius: 15px;
  font-size: 0.8rem;
  font-weight: 600;
}

.price-budget {
  background: rgba(34, 197, 94, 0.2);
  color: rgb(34, 197, 94);
  border: 1px solid rgba(34, 197, 94, 0.3);
}

.price-moderate {
  background: rgba(59, 130, 246, 0.2);
  color: rgb(59, 130, 246);
  border: 1px solid rgba(59, 130, 246, 0.3);
}

.price-expensive {
  background: rgba(245, 158, 11, 0.2);
  color: rgb(245, 158, 11);
  border: 1px solid rgba(245, 158, 11, 0.3);
}

.price-luxury {
  background: rgba(239, 68, 68, 0.2);
  color: rgb(239, 68, 68);
  border: 1px solid rgba(239, 68, 68, 0.3);
}

.cuisine-type {
  color: var(--color-text-secondary);
  font-size: 0.9rem;
  font-weight: 500;
  text-transform: capitalize;
  background: rgba(255, 255, 255, 0.1);
  padding: 0.2rem 0.8rem;
  border-radius: 12px;
}

.restaurant-info {
  margin-bottom: 1.5rem;
}

.specialty {
  margin-bottom: 1rem;
}

.specialty h4 {
  font-size: 1rem;
  font-weight: 600;
  color: var(--color-text-primary);
  margin: 0 0 0.5rem 0;
}

.specialty p {
  color: var(--color-text-secondary);
  line-height: 1.5;
  margin: 0;
  font-size: 0.95rem;
}

.walk-time {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.75rem 1rem;
  background: rgba(255, 255, 255, 0.05);
  border-radius: 8px;
  border-left: 3px solid var(--color-accent-primary);
}

.walk-icon {
  font-size: 1.1rem;
}

.walk-text {
  color: var(--color-text-secondary);
  font-size: 0.9rem;
  font-weight: 500;
}

.restaurant-notes {
  background: rgba(255, 255, 255, 0.05);
  padding: 1rem;
  border-radius: 8px;
  border: 1px solid rgba(255, 255, 255, 0.1);
}

.restaurant-notes h4 {
  font-size: 1rem;
  font-weight: 600;
  color: var(--color-text-primary);
  margin: 0 0 0.75rem 0;
}

.restaurant-notes p {
  color: var(--color-text-secondary);
  line-height: 1.5;
  margin: 0;
  font-size: 0.9rem;
}

/* Responsive Design */
@media (max-width: 768px) {
  .restaurants-grid {
    grid-template-columns: 1fr;
  }
  
  .restaurant-header {
    flex-direction: column;
    align-items: flex-start;
  }
  
  .restaurant-meta {
    align-items: flex-start;
    flex-direction: row;
    gap: 1rem;
  }
  
  .restaurant-card {
    padding: 1.5rem;
  }
}
</style>