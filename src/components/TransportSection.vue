<!-- src/components/TransportSection.vue -->
<script setup lang="ts">
import type { Transport } from '@/types/itinerary'

defineProps<{
  transport: Transport
  borderColor: string
}>()
</script>

<template>
  <section class="transport-section">
    <h2 :style="{ borderColor: borderColor }">🚇 Información de Transporte</h2>
    
    <div class="transport-overview">
      <div class="overview-card">
        <h3>Resumen de Transporte</h3>
        <p>{{ transport.overview }}</p>
      </div>
    </div>

    <div v-if="transport.routes && transport.routes.length > 0" class="routes-section">
      <h3>Rutas Detalladas</h3>
      <div class="routes-list">
        <div
          v-for="(route, index) in transport.routes"
          :key="`${route.from}-${route.to}-${index}`"
          class="route-card"
        >
          <div class="route-header">
            <div class="route-path">
              <span class="location from">{{ route.from }}</span>
              <span class="arrow">→</span>
              <span class="location to">{{ route.to }}</span>
            </div>
            <div class="route-meta">
              <span class="line-badge">{{ route.line }}</span>
              <span class="duration">{{ route.duration }}</span>
            </div>
          </div>
          
          <div class="route-details">
            <div v-if="route.cost" class="cost">
              <span class="cost-label">Precio:</span>
              <span class="cost-value">{{ route.cost }}</span>
            </div>
            
            <div v-if="route.notes" class="route-notes">
              <span class="notes-label">💡 Nota:</span>
              <span class="notes-text">{{ route.notes }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.transport-section {
  margin-bottom: 3rem;
}

.transport-section h2 {
  font-family: 'Rajdhani', sans-serif;
  font-size: 1.8rem;
  font-weight: 600;
  color: var(--color-text-primary);
  margin-bottom: 2rem;
  padding-bottom: 0.5rem;
  border-bottom: 2px solid;
}

.transport-overview {
  margin-bottom: 2rem;
}

.overview-card {
  background: linear-gradient(135deg, rgba(255, 255, 255, 0.1) 0%, rgba(255, 255, 255, 0.05) 100%);
  border-radius: var(--border-radius);
  padding: 2rem;
  border-left: 4px solid var(--color-accent-primary);
}

.overview-card h3 {
  font-size: 1.3rem;
  font-weight: 600;
  color: var(--color-text-primary);
  margin: 0 0 1rem 0;
}

.overview-card p {
  color: var(--color-text-secondary);
  line-height: 1.6;
  margin: 0;
  font-size: 1rem;
}

.routes-section h3 {
  font-size: 1.4rem;
  font-weight: 600;
  color: var(--color-text-primary);
  margin: 0 0 1.5rem 0;
}

.routes-list {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.route-card {
  background: rgba(255, 255, 255, 0.05);
  border-radius: var(--border-radius);
  padding: 1.5rem;
  transition: transform 0.2s ease, background 0.2s ease;
}

.route-card:hover {
  transform: translateY(-2px);
  background: rgba(255, 255, 255, 0.08);
}

.route-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
  flex-wrap: wrap;
  gap: 1rem;
}

.route-path {
  display: flex;
  align-items: center;
  gap: 1rem;
  flex: 1;
}

.location {
  font-weight: 600;
  color: var(--color-text-primary);
  padding: 0.4rem 0.8rem;
  border-radius: 20px;
  font-size: 0.9rem;
}

.location.from {
  background: rgba(79, 172, 254, 0.2);
  border: 1px solid rgba(79, 172, 254, 0.4);
}

.location.to {
  background: rgba(16, 185, 129, 0.2);
  border: 1px solid rgba(16, 185, 129, 0.4);
}

.arrow {
  font-size: 1.5rem;
  color: var(--color-accent-primary);
  font-weight: bold;
}

.route-meta {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 0.5rem;
}

.line-badge {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  padding: 0.3rem 0.8rem;
  border-radius: 15px;
  font-size: 0.8rem;
  font-weight: 600;
  text-transform: uppercase;
}

.duration {
  color: var(--color-text-secondary);
  font-size: 0.9rem;
  font-weight: 500;
}

.route-details {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.cost {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.cost-label {
  color: var(--color-text-secondary);
  font-size: 0.9rem;
}

.cost-value {
  background: rgba(34, 197, 94, 0.2);
  color: rgb(34, 197, 94);
  padding: 0.2rem 0.6rem;
  border-radius: 12px;
  font-weight: 600;
  font-size: 0.85rem;
}

.route-notes {
  background: rgba(255, 255, 255, 0.05);
  padding: 1rem;
  border-radius: 8px;
  border-left: 3px solid var(--color-accent-primary);
}

.notes-label {
  color: var(--color-text-primary);
  font-weight: 600;
  font-size: 0.9rem;
  margin-right: 0.5rem;
}

.notes-text {
  color: var(--color-text-secondary);
  font-size: 0.9rem;
  line-height: 1.4;
}

/* Responsive Design */
@media (max-width: 768px) {
  .route-header {
    flex-direction: column;
    align-items: flex-start;
  }
  
  .route-meta {
    align-items: flex-start;
    flex-direction: row;
    gap: 1rem;
  }
  
  .route-path {
    flex-wrap: wrap;
    justify-content: center;
  }
  
  .overview-card, .route-card {
    padding: 1.5rem;
  }
}

@media (max-width: 480px) {
  .route-path {
    flex-direction: column;
    gap: 0.5rem;
  }
  
  .arrow {
    transform: rotate(90deg);
  }
}
</style>