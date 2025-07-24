<!-- src/components/NearbyActivitiesSection.vue -->
<script setup lang="ts">
import type { NearbyActivity } from '@/types/itinerary'

defineProps<{
  nearbyActivities: NearbyActivity[]
  borderColor: string
}>()

const getCategoryIcon = (category: string) => {
  switch (category) {
    case 'shopping': return '🛍️'
    case 'sightseeing': return '👀'
    case 'cultural': return '🏛️'
    case 'nature': return '🌳'
    case 'entertainment': return '🎭'
    default: return '📍'
  }
}

const getCategoryClass = (category: string) => {
  switch (category) {
    case 'shopping': return 'category-shopping'
    case 'sightseeing': return 'category-sightseeing'
    case 'cultural': return 'category-cultural'
    case 'nature': return 'category-nature'
    case 'entertainment': return 'category-entertainment'
    default: return 'category-default'
  }
}

const getCategoryLabel = (category: string) => {
  switch (category) {
    case 'shopping': return 'Compras'
    case 'sightseeing': return 'Turismo'
    case 'cultural': return 'Cultural'
    case 'nature': return 'Naturaleza'
    case 'entertainment': return 'Entretenimiento'
    default: return 'Actividad'
  }
}
</script>

<template>
  <section class="nearby-activities-section">
    <h2 :style="{ borderColor: borderColor }">🎯 Actividades Adicionales</h2>
    <p class="section-subtitle">Cosas que puedes hacer "de paso" durante el día</p>
    
    <div class="activities-grid">
      <div
        v-for="activity in nearbyActivities"
        :key="activity.name"
        class="activity-card"
      >
        <!-- Activity Header -->
        <div class="activity-header">
          <div class="activity-title">
            <span class="category-icon">{{ getCategoryIcon(activity.category) }}</span>
            <h3>{{ activity.name }}</h3>
          </div>
          <div class="activity-meta">
            <span :class="['category-badge', getCategoryClass(activity.category)]">
              {{ getCategoryLabel(activity.category) }}
            </span>
          </div>
        </div>

        <!-- Activity Description -->
        <p class="activity-description">{{ activity.description }}</p>

        <!-- Activity Details -->
        <div class="activity-details">
          <div class="time-needed">
            <span class="detail-icon">⏱️</span>
            <span class="detail-label">Tiempo necesario:</span>
            <span class="detail-value">{{ activity.timeNeeded }}</span>
          </div>

          <div v-if="activity.walkTime" class="walk-time">
            <span class="detail-icon">🚶</span>
            <span class="detail-label">Distancia:</span>
            <span class="detail-value">{{ activity.walkTime }}</span>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.nearby-activities-section {
  margin-bottom: 3rem;
}

.nearby-activities-section h2 {
  font-family: 'Rajdhani', sans-serif;
  font-size: 1.8rem;
  font-weight: 600;
  color: var(--color-text-primary);
  margin-bottom: 0.5rem;
  padding-bottom: 0.5rem;
  border-bottom: 2px solid;
}

.section-subtitle {
  color: var(--color-text-secondary);
  font-size: 1rem;
  margin-bottom: 2rem;
  font-style: italic;
}

.activities-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
  gap: 1.5rem;
}

.activity-card {
  background: rgba(255, 255, 255, 0.05);
  border-radius: var(--border-radius);
  padding: 1.5rem;
  transition: transform 0.2s ease, background 0.2s ease;
  border: 1px solid rgba(255, 255, 255, 0.1);
}

.activity-card:hover {
  transform: translateY(-2px);
  background: rgba(255, 255, 255, 0.08);
  border-color: rgba(255, 255, 255, 0.2);
}

.activity-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 1rem;
  gap: 1rem;
}

.activity-title {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  flex: 1;
}

.category-icon {
  font-size: 1.5rem;
  flex-shrink: 0;
}

.activity-title h3 {
  font-size: 1.2rem;
  font-weight: 600;
  color: var(--color-text-primary);
  margin: 0;
  line-height: 1.3;
}

.activity-meta {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
}

.category-badge {
  padding: 0.3rem 0.7rem;
  border-radius: 15px;
  font-size: 0.75rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.category-shopping {
  background: rgba(236, 72, 153, 0.2);
  color: rgb(236, 72, 153);
  border: 1px solid rgba(236, 72, 153, 0.3);
}

.category-sightseeing {
  background: rgba(59, 130, 246, 0.2);
  color: rgb(59, 130, 246);
  border: 1px solid rgba(59, 130, 246, 0.3);
}

.category-cultural {
  background: rgba(147, 51, 234, 0.2);
  color: rgb(147, 51, 234);
  border: 1px solid rgba(147, 51, 234, 0.3);
}

.category-nature {
  background: rgba(34, 197, 94, 0.2);
  color: rgb(34, 197, 94);
  border: 1px solid rgba(34, 197, 94, 0.3);
}

.category-entertainment {
  background: rgba(245, 158, 11, 0.2);
  color: rgb(245, 158, 11);
  border: 1px solid rgba(245, 158, 11, 0.3);
}

.category-default {
  background: rgba(107, 114, 128, 0.2);
  color: rgb(107, 114, 128);
  border: 1px solid rgba(107, 114, 128, 0.3);
}

.activity-description {
  color: var(--color-text-secondary);
  line-height: 1.5;
  margin-bottom: 1.5rem;
  font-size: 0.95rem;
}

.activity-details {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.time-needed, .walk-time {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 0.75rem;
  background: rgba(255, 255, 255, 0.05);
  border-radius: 6px;
  font-size: 0.85rem;
}

.detail-icon {
  font-size: 1rem;
  flex-shrink: 0;
}

.detail-label {
  color: var(--color-text-secondary);
  font-weight: 500;
}

.detail-value {
  color: var(--color-text-primary);
  font-weight: 600;
  margin-left: auto;
}

/* Responsive Design */
@media (max-width: 768px) {
  .activities-grid {
    grid-template-columns: 1fr;
  }
  
  .activity-header {
    flex-direction: column;
    align-items: flex-start;
    gap: 0.75rem;
  }
  
  .activity-meta {
    align-items: flex-start;
  }
  
  .activity-card {
    padding: 1.25rem;
  }
}

@media (max-width: 480px) {
  .activity-title {
    flex-direction: column;
    align-items: flex-start;
    gap: 0.5rem;
  }
  
  .category-icon {
    font-size: 1.2rem;
  }
}
</style>