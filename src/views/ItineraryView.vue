<!-- src/views/ItineraryView.vue -->
<script setup lang="ts">
import { onMounted } from 'vue'
import { useItineraryStore } from '@/stores/itinerary'
import CitySection from '@/components/CitySection.vue'

const store = useItineraryStore()

// Fetch data when the component is first created
onMounted(() => {
  if (!store.itinerary) {
    store.fetchItinerary()
  }
})
</script>

<template>
  <div v-if="store.isLoading">Loading itinerary...</div>
  <div v-else-if="store.error">{{ store.error }}</div>
  <section v-else-if="store.cities.length > 0">
    <CitySection v-for="city in store.cities" :key="city.id" :city="city" />
  </section>
</template>
