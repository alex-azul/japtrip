<!-- src/components/TriviaSection.vue -->
<script setup lang="ts">
import { ref } from 'vue'
import type { TriviaItem } from '@/types/itinerary'

defineProps<{
  trivia: TriviaItem[]
  borderColor: string
}>()

const revealedTrivia = ref<Set<number>>(new Set())
const passwordInputs = ref<{ [key: number]: string }>({})

const triviaIcons = [
  '💡', '🤔', '📚', '🎭', '🏛️', '🗾', '⛩️', '🌸', 
  '🍜', '🎨', '🏞️', '🚄', '🗼', '🎌', '🎯', '📖'
]

const getRandomIcon = (index: number) => {
  return triviaIcons[index % triviaIcons.length]
}

const checkPassword = (index: number, triviaItem: TriviaItem) => {
  const inputPassword = passwordInputs.value[index]?.toLowerCase().trim()
  const correctPassword = triviaItem.password.toLowerCase().trim()
  
  if (inputPassword === correctPassword) {
    revealedTrivia.value.add(index)
    passwordInputs.value[index] = ''
  } else {
    // Show error feedback
    alert('Contraseña incorrecta. ¡Inténtalo de nuevo!')
  }
}

const hideAnswer = (index: number) => {
  revealedTrivia.value.delete(index)
}
</script>

<template>
  <section class="trivia-section">
    <h2 :style="{ borderColor: borderColor }">🧠 Datos Curiosos y Trivia</h2>
    <p class="section-subtitle">Información interesante para enriquecer tu experiencia</p>
    
    <div class="trivia-grid">
      <div
        v-for="(triviaItem, index) in trivia"
        :key="index"
        class="trivia-card"
        :class="{ 'revealed': revealedTrivia.has(index) }"
      >
        <div class="trivia-header">
          <span class="trivia-icon">{{ getRandomIcon(index) }}</span>
          <span class="trivia-number">#{{ index + 1 }}</span>
        </div>
        
        <p class="trivia-question">{{ triviaItem.question }}</p>
        
        <div v-if="!revealedTrivia.has(index)" class="password-section">
          <div class="password-input-group">
            <input
              v-model="passwordInputs[index]"
              type="text"
              placeholder="Introduce la contraseña..."
              class="password-input"
              @keyup.enter="checkPassword(index, triviaItem)"
            />
            <button 
              @click="checkPassword(index, triviaItem)"
              class="reveal-button"
            >
              🔓 Revelar
            </button>
          </div>
        </div>
        
        <div v-else class="answer-section">
          <div class="trivia-answer">
            <p class="answer-text">{{ triviaItem.answer }}</p>
            <button 
              @click="hideAnswer(index)"
              class="hide-button"
            >
              🙈 Ocultar
            </button>
          </div>
        </div>
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

.trivia-question {
  color: var(--color-text-primary);
  line-height: 1.6;
  margin: 0 0 1rem 0;
  font-size: 1rem;
  font-weight: 500;
}

.password-section {
  margin-top: 1rem;
}

.password-input-group {
  display: flex;
  gap: 0.5rem;
  align-items: center;
}

.password-input {
  flex: 1;
  background: rgba(255, 255, 255, 0.1);
  border: 2px solid rgba(255, 255, 255, 0.2);
  border-radius: 8px;
  padding: 0.5rem 0.75rem;
  color: var(--color-text-primary);
  font-size: 0.9rem;
  transition: all 0.3s ease;
}

.password-input:focus {
  outline: none;
  border-color: var(--color-accent-primary);
  background: rgba(255, 255, 255, 0.15);
}

.password-input::placeholder {
  color: var(--color-text-secondary);
  opacity: 0.7;
}

.reveal-button, .hide-button {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 8px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  font-size: 0.8rem;
  white-space: nowrap;
}

.reveal-button:hover, .hide-button:hover {
  background: linear-gradient(135deg, #5a67d8 0%, #6b46c1 100%);
  transform: translateY(-2px);
  box-shadow: 0 5px 15px rgba(102, 126, 234, 0.3);
}

.hide-button {
  background: linear-gradient(135deg, #4ecdc4 0%, #45b7d1 100%);
}

.hide-button:hover {
  background: linear-gradient(135deg, #38b2ac 0%, #3182ce 100%);
  box-shadow: 0 5px 15px rgba(78, 205, 196, 0.3);
}

.answer-section {
  margin-top: 1rem;
}

.trivia-answer {
  background: rgba(78, 205, 196, 0.1);
  border-radius: 8px;
  padding: 1rem;
  border-left: 3px solid #4ecdc4;
}

.answer-text {
  color: var(--color-text-secondary);
  line-height: 1.6;
  margin: 0 0 1rem 0;
  font-size: 0.95rem;
}

.trivia-card.revealed {
  background: linear-gradient(135deg, rgba(78, 205, 196, 0.1) 0%, rgba(69, 183, 209, 0.05) 100%);
  border-color: rgba(78, 205, 196, 0.3);
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
  
  .password-input-group {
    flex-direction: column;
    align-items: stretch;
  }
  
  .reveal-button, .hide-button {
    width: 100%;
    margin-top: 0.5rem;
  }
}

@media (max-width: 480px) {
  .trivia-card {
    padding: 1rem;
  }
  
  .trivia-header {
    margin-bottom: 0.75rem;
  }
  
  .trivia-question {
    font-size: 0.95rem;
  }
  
  .answer-text {
    font-size: 0.9rem;
  }
  
  .password-input {
    font-size: 0.85rem;
    padding: 0.45rem 0.65rem;
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