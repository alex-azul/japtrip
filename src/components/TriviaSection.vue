<!-- src/components/TriviaSection.vue -->
<script setup lang="ts">
defineProps<{
  trivia: string[]
  borderColor: string
}>()

const triviaIcons = [
  '💡', '🤔', '📚', '🎭', '🏛️', '🗾', '⛩️', '🌸', 
  '🍜', '🎨', '🏞️', '🚄', '🗼', '🎌', '🎯', '📖'
]

const getRandomIcon = (index: number) => {
  return triviaIcons[index % triviaIcons.length]
}
</script>

<template>
  <section class="trivia-section">
    <h2 :style="{ borderColor: borderColor }">🧠 Datos Curiosos y Trivia</h2>
    <p class="section-subtitle">Información interesante para enriquecer tu experiencia</p>
    
    <div class="trivia-grid">
      <div
        v-for="(fact, index) in trivia"
        :key="index"
        class="trivia-card"
      >
        <div class="trivia-header">
          <span class="trivia-icon">{{ getRandomIcon(index) }}</span>
          <span class="trivia-number">#{{ index + 1 }}</span>
        </div>
        <p class="trivia-text">{{ fact }}</p>
      </div>
    </div>
  </section>
</template>

<style scoped>
.trivia-section {
  margin-bottom: 3rem;
}

.trivia-section h2 {
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

.trivia-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 1.5rem;
}

.trivia-card {
  background: linear-gradient(135deg, rgba(255, 255, 255, 0.1) 0%, rgba(255, 255, 255, 0.05) 100%);
  border-radius: var(--border-radius);
  padding: 1.5rem;
  transition: transform 0.2s ease, background 0.2s ease;
  border: 1px solid rgba(255, 255, 255, 0.1);
  position: relative;
  overflow: hidden;
}

.trivia-card::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 3px;
  background: linear-gradient(90deg, 
    var(--color-accent-primary) 0%, 
    #667eea 50%, 
    #764ba2 100%
  );
}

.trivia-card:hover {
  transform: translateY(-4px);
  background: linear-gradient(135deg, rgba(255, 255, 255, 0.15) 0%, rgba(255, 255, 255, 0.08) 100%);
  border-color: rgba(255, 255, 255, 0.2);
}

.trivia-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 1rem;
}

.trivia-icon {
  font-size: 2rem;
  animation: pulse 2s infinite;
}

@keyframes pulse {
  0%, 100% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.1);
  }
}

.trivia-number {
  background: rgba(255, 255, 255, 0.1);
  color: var(--color-text-secondary);
  padding: 0.3rem 0.6rem;
  border-radius: 12px;
  font-size: 0.8rem;
  font-weight: 600;
  border: 1px solid rgba(255, 255, 255, 0.2);
}

.trivia-text {
  color: var(--color-text-secondary);
  line-height: 1.6;
  margin: 0;
  font-size: 0.95rem;
  position: relative;
}

.trivia-text::first-letter {
  font-size: 1.2em;
  font-weight: 600;
  color: var(--color-text-primary);
}

/* Hover effects for individual cards */
.trivia-card:nth-child(even):hover {
  background: linear-gradient(135deg, rgba(102, 126, 234, 0.1) 0%, rgba(118, 75, 162, 0.05) 100%);
}

.trivia-card:nth-child(odd):hover {
  background: linear-gradient(135deg, rgba(79, 172, 254, 0.1) 0%, rgba(0, 242, 195, 0.05) 100%);
}

/* Responsive Design */
@media (max-width: 768px) {
  .trivia-grid {
    grid-template-columns: 1fr;
  }
  
  .trivia-card {
    padding: 1.25rem;
  }
  
  .trivia-icon {
    font-size: 1.8rem;
  }
}

@media (max-width: 480px) {
  .trivia-card {
    padding: 1rem;
  }
  
  .trivia-header {
    margin-bottom: 0.75rem;
  }
  
  .trivia-text {
    font-size: 0.9rem;
  }
}

/* Animation for when cards come into view */
@media (prefers-reduced-motion: no-preference) {
  .trivia-card {
    animation: fadeInUp 0.6s ease-out forwards;
    opacity: 0;
    transform: translateY(20px);
  }
  
  .trivia-card:nth-child(1) { animation-delay: 0.1s; }
  .trivia-card:nth-child(2) { animation-delay: 0.2s; }
  .trivia-card:nth-child(3) { animation-delay: 0.3s; }
  .trivia-card:nth-child(4) { animation-delay: 0.4s; }
  .trivia-card:nth-child(5) { animation-delay: 0.5s; }
  .trivia-card:nth-child(6) { animation-delay: 0.6s; }
}

@keyframes fadeInUp {
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>