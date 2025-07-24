<!-- src/components/DayCard.vue -->
<script setup lang="ts">
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import type { Day, DayOption } from '@/types/itinerary'

const props = defineProps<{
  day: Day
  borderColor: string
  cityId: string
  dayIndex: number
}>()

const router = useRouter()

const selectedOptionId = ref<string>('')

const hasOptions = computed(() => props.day.opciones && props.day.opciones.length > 0)

const currentOption = computed(() => {
  if (!hasOptions.value) return null
  
  if (!selectedOptionId.value) {
    const defaultOption = props.day.opciones?.find(opt => opt.isDefault)
    const firstOption = props.day.opciones?.[0]
    return defaultOption || firstOption || null
  }
  
  return props.day.opciones?.find(opt => opt.id === selectedOptionId.value) || null
})

const displayData = computed(() => {
  if (hasOptions.value && currentOption.value) {
    return {
      status: currentOption.value.status,
      puntosClave: currentOption.value.puntosClave
    }
  }
  return {
    status: props.day.status || [],
    puntosClave: props.day.puntosClave || []
  }
})

const selectOption = (optionId: string) => {
  selectedOptionId.value = optionId
}

const navigateToDetail = () => {
  const routeParams: any = {
    cityId: props.cityId,
    dayIndex: props.dayIndex.toString()
  }
  
  // If there's a selected option or a current option, include it in the route
  if (hasOptions.value && currentOption.value) {
    routeParams.optionId = currentOption.value.id
  }
  
  router.push({
    name: 'day-detail',
    params: routeParams
  })
}

// Initialize with default option
if (hasOptions.value && !selectedOptionId.value) {
  const defaultOption = props.day.opciones?.find(opt => opt.isDefault)
  if (defaultOption) {
    selectedOptionId.value = defaultOption.id
  } else if (props.day.opciones?.[0]) {
    selectedOptionId.value = props.day.opciones[0].id
  }
}
</script>

<template>
  <div class="day-card" :style="{ borderColor: borderColor }" @click="navigateToDetail">
    <div class="day-header">
      <h3>
        {{ day.titulo }} <span class="date">({{ day.fecha }})</span>
      </h3>
      <div class="status-container">
        <div
          v-for="status in displayData.status"
          :key="status.texto"
          :class="`status-badge ${status.clase}`"
        >
          {{ status.texto }}
        </div>
        <div class="detail-indicator">
          <span class="detail-text">Ver detalles</span>
          <span class="detail-arrow">→</span>
        </div>
      </div>
    </div>

    <!-- Day Options Tabs -->
    <div v-if="hasOptions" class="day-options">
      <button
        v-for="option in day.opciones"
        :key="option.id"
        @click.stop="selectOption(option.id)"
        :class="['option-tab', { active: selectedOptionId === option.id }]"
      >
        {{ option.label }}
      </button>
    </div>

    <ul class="key-points-list">
      <li v-for="punto in displayData.puntosClave" :key="punto.titulo" class="key-point">
        <span class="icon">{{ punto.icono }}</span>
        <div class="text-content">
          <strong>{{ punto.titulo }}</strong>
          <span>{{ punto.descripcion }}</span>
          
          <!-- Activity Alternatives -->
          <div v-if="punto.alternativas && punto.alternativas.length > 0" class="alternatives">
            <div class="alternatives-header">Alternativas:</div>
            <div class="alternatives-list">
              <div 
                v-for="alt in punto.alternativas" 
                :key="alt.titulo"
                class="alternative-item"
              >
                <strong>{{ alt.titulo }}</strong>
                <span>{{ alt.descripcion }}</span>
              </div>
            </div>
          </div>
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
  cursor: pointer;
  transition:
    transform 0.3s ease,
    box-shadow 0.3s ease;
}

.day-card:hover {
  transform: translateY(-8px) scale(1.02);
  box-shadow: 0 12px 30px rgba(0, 0, 0, 0.7);
}

.day-card:hover .detail-indicator {
  opacity: 1;
  transform: translateX(0);
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

/* Day Options Styling */
.day-options {
  display: flex;
  gap: 0.5rem;
  margin: 1rem 0;
  flex-wrap: wrap;
}

.option-tab {
  background: rgba(255, 255, 255, 0.1);
  border: 2px solid rgba(255, 255, 255, 0.3);
  color: var(--color-text-secondary);
  padding: 0.5rem 1rem;
  border-radius: 25px;
  font-size: 0.9rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
}

.option-tab:hover {
  background: rgba(255, 255, 255, 0.2);
  border-color: rgba(255, 255, 255, 0.5);
}

.option-tab.active {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border-color: #667eea;
  color: #fff;
  transform: translateY(-2px);
}

/* Activity Alternatives Styling */
.alternatives {
  margin-top: 1rem;
  padding: 1rem;
  background: rgba(255, 255, 255, 0.05);
  border-radius: 8px;
  border-left: 3px solid rgba(255, 255, 255, 0.3);
}

.alternatives-header {
  font-size: 0.9rem;
  font-weight: 600;
  color: var(--color-text-primary);
  margin-bottom: 0.75rem;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.alternatives-list {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.alternative-item {
  padding: 0.5rem;
  background: rgba(255, 255, 255, 0.05);
  border-radius: 6px;
  transition: background 0.2s ease;
}

.alternative-item:hover {
  background: rgba(255, 255, 255, 0.1);
}

.alternative-item strong {
  display: block;
  font-size: 0.95rem;
  color: var(--color-text-primary);
  margin-bottom: 0.25rem;
}

.alternative-item span {
  font-size: 0.85rem;
  color: var(--color-text-secondary);
  line-height: 1.4;
}

@media (max-width: 768px) {
  .day-card {
    padding: 1.5rem;
  }
  .day-header h3 {
    font-size: 1.5rem;
  }
  .option-tab {
    font-size: 0.8rem;
    padding: 0.4rem 0.8rem;
  }
  .alternatives {
    padding: 0.75rem;
  }
}

/* Detail indicator styling */
.detail-indicator {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  opacity: 0;
  transform: translateX(-10px);
  transition: all 0.3s ease;
  font-size: 0.85rem;
  color: var(--color-text-secondary);
}

.detail-text {
  font-weight: 500;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.detail-arrow {
  font-size: 1.2rem;
  font-weight: bold;
  color: var(--color-accent-primary);
}
</style>
