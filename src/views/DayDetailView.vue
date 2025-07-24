<!-- src/views/DayDetailView.vue -->
<script setup lang="ts">
import { computed, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useItineraryStore } from '@/stores/itinerary'
import KeyPlacesSection from '@/components/KeyPlacesSection.vue'
import TransportSection from '@/components/TransportSection.vue'
import RestaurantsSection from '@/components/RestaurantsSection.vue'
import NearbyActivitiesSection from '@/components/NearbyActivitiesSection.vue'
import TriviaSection from '@/components/TriviaSection.vue'

const route = useRoute()
const router = useRouter()
const store = useItineraryStore()

// Extract route parameters
const cityId = computed(() => route.params.cityId as string)
const dayIndex = computed(() => parseInt(route.params.dayIndex as string))
const optionId = computed(() => route.params.optionId as string | undefined)

// Get data from store
const city = computed(() => store.getCityById(cityId.value))
const day = computed(() => store.getDayByIndex(cityId.value, dayIndex.value))
const dayDetails = computed(() => store.getDayDetails(cityId.value, dayIndex.value, optionId.value))
const activeOption = computed(() => store.getActiveDayOption(cityId.value, dayIndex.value))

// Compute display data (similar to DayCard logic)
const displayData = computed(() => {
  if (day.value?.opciones && activeOption.value) {
    return {
      titulo: day.value.titulo,
      fecha: day.value.fecha,
      status: activeOption.value.status,
      puntosClave: activeOption.value.puntosClave,
      borderColor: city.value?.colorBorde || '#ccc'
    }
  }
  return {
    titulo: day.value?.titulo || '',
    fecha: day.value?.fecha || '',
    status: day.value?.status || [],
    puntosClave: day.value?.puntosClave || [],
    borderColor: city.value?.colorBorde || '#ccc'
  }
})

const goBack = () => {
  router.push({ name: 'home' })
}

// Fetch itinerary if not loaded
onMounted(() => {
  if (!store.itinerary) {
    store.fetchItinerary()
  }
})
</script>

<template>
  <div v-if="store.isLoading" class="loading">
    <div class="loading-spinner"></div>
    <p>Cargando detalles del día...</p>
  </div>
  
  <div v-else-if="store.error" class="error">
    <p>{{ store.error }}</p>
    <button @click="goBack" class="back-button">Volver al Itinerario</button>
  </div>
  
  <div v-else-if="!day" class="not-found">
    <h2>Día no encontrado</h2>
    <p>El día solicitado no existe en el itinerario.</p>
    <button @click="goBack" class="back-button">Volver al Itinerario</button>
  </div>
  
  <div v-else class="day-detail-view">
    <!-- Breadcrumb Navigation -->
    <nav class="breadcrumb">
      <button @click="goBack" class="breadcrumb-item breadcrumb-back">
        ← Itinerario
      </button>
      <span class="breadcrumb-separator">/</span>
      <span class="breadcrumb-item breadcrumb-current">
        {{ city?.nombre }}
      </span>
      <span class="breadcrumb-separator">/</span>
      <span class="breadcrumb-item breadcrumb-current">
        {{ displayData.titulo }}
      </span>
    </nav>

    <!-- Day Header -->
    <header class="day-header" :style="{ borderColor: displayData.borderColor }">
      <div class="header-content">
        <h1>{{ displayData.titulo }}</h1>
        <div class="header-meta">
          <span class="date">{{ displayData.fecha }}</span>
          <div class="status-badges">
            <div
              v-for="status in displayData.status"
              :key="status.texto"
              :class="`status-badge ${status.clase}`"
            >
              {{ status.texto }}
            </div>
          </div>
        </div>
      </div>
    </header>

    <!-- Day Options (if available) -->
    <div v-if="day.opciones && day.opciones.length > 1" class="day-options-section">
      <h3>Opciones Disponibles</h3>
      <div class="option-tabs">
        <button
          v-for="option in day.opciones"
          :key="option.id"
          @click="$router.push({ name: 'day-detail', params: { cityId, dayIndex: dayIndex.toString(), optionId: option.id } })"
          :class="['option-tab', { active: !optionId ? option.isDefault : optionId === option.id }]"
        >
          {{ option.label }}
        </button>
      </div>
    </div>

    <!-- Quick Overview -->
    <section class="overview-section">
      <h2>Resumen del Día</h2>
      <div class="key-points-grid">
        <div
          v-for="punto in displayData.puntosClave"
          :key="punto.titulo"
          class="key-point-card"
        >
          <span class="point-icon">{{ punto.icono }}</span>
          <div class="point-content">
            <h4>{{ punto.titulo }}</h4>
            <p>{{ punto.descripcion }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Detailed Sections (only if dayDetails exists) -->
    <div v-if="dayDetails" class="detail-sections">
      <KeyPlacesSection
        v-if="dayDetails.keyPlaces && dayDetails.keyPlaces.length > 0"
        :keyPlaces="dayDetails.keyPlaces"
        :borderColor="displayData.borderColor"
      />
      
      <TransportSection
        v-if="dayDetails.transport"
        :transport="dayDetails.transport"
        :borderColor="displayData.borderColor"
      />
      
      <TriviaSection
        v-if="dayDetails.trivia && dayDetails.trivia.length > 0"
        :trivia="dayDetails.trivia"
        :borderColor="displayData.borderColor"
      />
      
      <NearbyActivitiesSection
        v-if="dayDetails.nearbyActivities && dayDetails.nearbyActivities.length > 0"
        :nearbyActivities="dayDetails.nearbyActivities"
        :borderColor="displayData.borderColor"
      />
      
      <RestaurantsSection
        v-if="dayDetails.restaurants && dayDetails.restaurants.length > 0"
        :restaurants="dayDetails.restaurants"
        :borderColor="displayData.borderColor"
      />
    </div>

    <!-- No Details Available Message -->
    <div v-else class="no-details">
      <div class="no-details-content">
        <h3>🚧 Detalles en construcción</h3>
        <p>Los detalles extendidos para este día aún no están disponibles.</p>
        <p>Por ahora puedes ver el resumen arriba, y pronto tendremos información detallada sobre transporte, restaurantes, y actividades adicionales.</p>
      </div>
    </div>

    <!-- Back to top button -->
    <button @click="goBack" class="back-to-itinerary">
      Volver al Itinerario Completo
    </button>
  </div>
</template>

<style scoped>
.loading, .error, .not-found {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 60vh;
  text-align: center;
  padding: 2rem;
}

.loading-spinner {
  width: 50px;
  height: 50px;
  border: 4px solid rgba(255, 255, 255, 0.1);
  border-left: 4px solid var(--color-accent-primary);
  border-radius: 50%;
  animation: spin 1s linear infinite;
  margin-bottom: 1rem;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

.day-detail-view {
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
}

/* Breadcrumb Navigation */
.breadcrumb {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 2rem;
  font-size: 0.9rem;
}

.breadcrumb-item {
  color: var(--color-text-secondary);
}

.breadcrumb-back {
  background: none;
  border: none;
  color: var(--color-accent-primary);
  cursor: pointer;
  font-size: 0.9rem;
  font-weight: 500;
  transition: color 0.2s ease;
}

.breadcrumb-back:hover {
  color: var(--color-text-primary);
}

.breadcrumb-separator {
  color: rgba(255, 255, 255, 0.3);
}

.breadcrumb-current {
  font-weight: 500;
  color: var(--color-text-primary);
}

/* Day Header */
.day-header {
  background: linear-gradient(135deg, rgba(255, 255, 255, 0.1) 0%, rgba(255, 255, 255, 0.05) 100%);
  border-radius: var(--border-radius);
  border-left: 6px solid;
  padding: 2rem;
  margin-bottom: 3rem;
}

.header-content h1 {
  font-family: 'Rajdhani', sans-serif;
  font-size: 2.5rem;
  font-weight: 700;
  color: var(--color-text-primary);
  margin: 0 0 1rem 0;
}

.header-meta {
  display: flex;
  align-items: center;
  gap: 1.5rem;
  flex-wrap: wrap;
}

.date {
  font-size: 1.1rem;
  color: var(--color-text-secondary);
  font-weight: 500;
}

.status-badges {
  display: flex;
  gap: 0.5rem;
  flex-wrap: wrap;
}

.status-badge {
  padding: 0.4rem 1rem;
  border-radius: 50px;
  font-size: 0.8rem;
  font-weight: 700;
  color: #fff;
  text-transform: uppercase;
}

/* Day Options */
.day-options-section {
  margin-bottom: 3rem;
}

.day-options-section h3 {
  font-family: 'Rajdhani', sans-serif;
  font-size: 1.5rem;
  font-weight: 600;
  color: var(--color-text-primary);
  margin-bottom: 1rem;
}

.option-tabs {
  display: flex;
  gap: 0.5rem;
  flex-wrap: wrap;
}

.option-tab {
  background: rgba(255, 255, 255, 0.1);
  border: 2px solid rgba(255, 255, 255, 0.3);
  color: var(--color-text-secondary);
  padding: 0.75rem 1.5rem;
  border-radius: 25px;
  font-size: 1rem;
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
}

/* Overview Section */
.overview-section {
  margin-bottom: 3rem;
}

.overview-section h2 {
  font-family: 'Rajdhani', sans-serif;
  font-size: 2rem;
  font-weight: 600;
  color: var(--color-text-primary);
  margin-bottom: 1.5rem;
  border-bottom: 2px solid var(--color-accent-primary);
  padding-bottom: 0.5rem;
}

.key-points-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 1.5rem;
}

.key-point-card {
  background: rgba(255, 255, 255, 0.05);
  border-radius: var(--border-radius);
  padding: 1.5rem;
  display: flex;
  align-items: flex-start;
  gap: 1rem;
  transition: transform 0.2s ease, background 0.2s ease;
}

.key-point-card:hover {
  transform: translateY(-2px);
  background: rgba(255, 255, 255, 0.08);
}

.point-icon {
  font-size: 2rem;
  flex-shrink: 0;
}

.point-content h4 {
  font-size: 1.1rem;
  font-weight: 600;
  color: var(--color-text-primary);
  margin: 0 0 0.5rem 0;
}

.point-content p {
  font-size: 0.95rem;
  color: var(--color-text-secondary);
  line-height: 1.5;
  margin: 0;
}

/* Detail Sections */
.detail-sections {
  display: flex;
  flex-direction: column;
  gap: 3rem;
}

/* No Details */
.no-details {
  margin: 3rem 0;
  text-align: center;
}

.no-details-content {
  background: rgba(255, 255, 255, 0.05);
  border-radius: var(--border-radius);
  padding: 3rem 2rem;
  max-width: 600px;
  margin: 0 auto;
}

.no-details-content h3 {
  font-size: 1.5rem;
  color: var(--color-text-primary);
  margin-bottom: 1rem;
}

.no-details-content p {
  color: var(--color-text-secondary);
  line-height: 1.6;
  margin-bottom: 1rem;
}

/* Back Button */
.back-to-itinerary, .back-button {
  display: block;
  width: fit-content;
  margin: 3rem auto 0;
  padding: 1rem 2rem;
  background: linear-gradient(135deg, var(--color-accent-primary) 0%, #764ba2 100%);
  color: white;
  border: none;
  border-radius: 50px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
}

.back-to-itinerary:hover, .back-button:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.3);
}

/* Responsive Design */
@media (max-width: 768px) {
  .day-detail-view {
    padding: 1rem;
  }
  
  .header-content h1 {
    font-size: 2rem;
  }
  
  .header-meta {
    flex-direction: column;
    align-items: flex-start;
    gap: 1rem;
  }
  
  .key-points-grid {
    grid-template-columns: 1fr;
  }
  
  .breadcrumb {
    flex-wrap: wrap;
  }
}
</style>