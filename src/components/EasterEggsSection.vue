<!-- src/components/EasterEggsSection.vue -->
<script setup lang="ts">
import type { EasterEgg } from '@/types/itinerary'

defineProps<{
  easterEggs: EasterEgg[]
  borderColor: string
}>()

const getTypeIcon = (type: EasterEgg['type']) => {
  const icons = {
    'hunt': '🔍',
    'reference': '🎬',
    'cultural': '🏛️',
    'photo-challenge': '📸',
    'secret': '🤫',
    'discovery': '✨'
  }
  return icons[type] || '🎯'
}

const getDifficultyColor = (difficulty: EasterEgg['difficulty']) => {
  switch (difficulty) {
    case 'easy': return '#4ade80'
    case 'medium': return '#fbbf24'
    case 'hard': return '#f87171'
    default: return '#94a3b8'
  }
}
</script>

<template>
  <section class="easter-eggs-section">
    <h2 :style="{ borderColor: borderColor }">🥚 Easter Eggs y Desafíos</h2>
    <p class="section-subtitle">Misiones especiales y secretos por descubrir durante tu visita</p>
    
    <div class="easter-eggs-grid">
      <div
        v-for="(egg, index) in easterEggs"
        :key="index"
        class="easter-egg-card"
      >
        <div class="egg-header">
          <div class="egg-type">
            <span class="type-icon">{{ getTypeIcon(egg.type) }}</span>
            <span class="type-label">{{ egg.type.replace('-', ' ') }}</span>
          </div>
          <div 
            v-if="egg.difficulty" 
            class="difficulty-badge"
            :style="{ backgroundColor: getDifficultyColor(egg.difficulty) }"
          >
            {{ egg.difficulty }}
          </div>
        </div>

        <h3 class="egg-title">{{ egg.title }}</h3>
        
        <div class="egg-content">
          <p class="egg-description">{{ egg.description }}</p>
          
          <p v-if="egg.category" class="egg-category">
            <strong>Categoría:</strong> {{ egg.category }}
          </p>
          
          <p v-if="egg.reward" class="egg-reward">
            🎁 <strong>Recompensa:</strong> {{ egg.reward }}
          </p>
          
          <div v-if="egg.hint" class="egg-hint">
            <p class="hint-text">💡 <strong>Pista:</strong> {{ egg.hint }}</p>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.easter-eggs-section {
  margin-bottom: 3rem;
}

.easter-eggs-section h2 {
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

.easter-eggs-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
  gap: 1.5rem;
}

.easter-egg-card {
  background: linear-gradient(135deg, rgba(255, 255, 255, 0.1) 0%, rgba(255, 255, 255, 0.05) 100%);
  border-radius: var(--border-radius);
  padding: 1.5rem;
  transition: all 0.3s ease;
  border: 1px solid rgba(255, 255, 255, 0.1);
  position: relative;
  overflow: hidden;
  cursor: pointer;
}

.easter-egg-card::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 3px;
  background: linear-gradient(90deg, 
    #ff6b6b 0%, 
    #4ecdc4 25%, 
    #45b7d1 50%, 
    #96ceb4 75%, 
    #feca57 100%
  );
}

.easter-egg-card:hover {
  transform: translateY(-4px);
  background: linear-gradient(135deg, rgba(255, 255, 255, 0.15) 0%, rgba(255, 255, 255, 0.08) 100%);
  border-color: rgba(255, 255, 255, 0.2);
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
}

.egg-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 1rem;
}

.egg-type {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.type-icon {
  font-size: 1.5rem;
}

.type-label {
  background: rgba(255, 255, 255, 0.1);
  color: var(--color-text-secondary);
  padding: 0.25rem 0.75rem;
  border-radius: 20px;
  font-size: 0.8rem;
  font-weight: 500;
  text-transform: capitalize;
  border: 1px solid rgba(255, 255, 255, 0.2);
}

.difficulty-badge {
  color: white;
  padding: 0.25rem 0.5rem;
  border-radius: 12px;
  font-size: 0.7rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.egg-title {
  color: var(--color-text-primary);
  font-size: 1.2rem;
  font-weight: 600;
  margin-bottom: 1rem;
  line-height: 1.3;
}

.egg-description {
  color: var(--color-text-secondary);
  line-height: 1.6;
  margin-bottom: 1rem;
}

.egg-category {
  color: var(--color-text-secondary);
  font-size: 0.9rem;
  margin-bottom: 0.5rem;
}

.egg-reward {
  color: #feca57;
  font-size: 0.95rem;
  margin-bottom: 1rem;
  padding: 0.75rem;
  background: rgba(254, 202, 87, 0.1);
  border-radius: 8px;
  border-left: 3px solid #feca57;
}

.egg-hint {
  margin-top: 1rem;
}

.hint-text {
  color: var(--color-text-secondary);
  font-style: italic;
  margin: 0;
  padding: 0.75rem;
  background: rgba(255, 255, 255, 0.05);
  border-radius: 8px;
  border-left: 3px solid #4ecdc4;
  font-size: 0.9rem;
}

/* Responsive Design */
@media (max-width: 768px) {
  .easter-eggs-grid {
    grid-template-columns: 1fr;
  }
  
  .easter-egg-card {
    padding: 1.25rem;
  }
  
  .type-icon {
    font-size: 1.3rem;
  }
  
  .egg-title {
    font-size: 1.1rem;
  }
}

@media (max-width: 480px) {
  .easter-egg-card {
    padding: 1rem;
  }
  
  .egg-header {
    flex-direction: column;
    align-items: flex-start;
    gap: 0.5rem;
  }
  
  .reveal-button, .hide-button {
    padding: 0.6rem 1.2rem;
    font-size: 0.8rem;
  }
}

/* Animation for when cards come into view */
@media (prefers-reduced-motion: no-preference) {
  .easter-egg-card {
    animation: slideInUp 0.6s ease-out forwards;
    opacity: 0;
    transform: translateY(30px);
  }
  
  .easter-egg-card:nth-child(1) { animation-delay: 0.1s; }
  .easter-egg-card:nth-child(2) { animation-delay: 0.2s; }
  .easter-egg-card:nth-child(3) { animation-delay: 0.3s; }
  .easter-egg-card:nth-child(4) { animation-delay: 0.4s; }
  .easter-egg-card:nth-child(5) { animation-delay: 0.5s; }
  .easter-egg-card:nth-child(6) { animation-delay: 0.6s; }
}

@keyframes slideInUp {
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>