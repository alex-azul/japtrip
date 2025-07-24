// src/stores/itinerary.ts

import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import type { Itinerary } from '@/types/itinerary'

export const useItineraryStore = defineStore('itinerary', () => {
  // --- STATE ---
  const itinerary = ref<Itinerary | null>(null)
  const isLoading = ref(false)
  const error = ref<string | null>(null)

  // --- GETTERS (Computed properties) ---
  const tripTitle = computed(() => itinerary.value?.tituloViaje ?? 'Cargando...')
  const tripSubtitle = computed(() => itinerary.value?.subtituloViaje ?? '')
  const cities = computed(() => itinerary.value?.ciudades ?? [])

  // Getter to find a single city by its ID, useful for detail pages
  const getCityById = computed(() => {
    return (cityId: string) => cities.value.find((city) => city.id === cityId)
  })

  // --- ACTIONS ---
  async function fetchItinerary() {
    isLoading.value = true
    error.value = null
    try {
      // Use relative path that works with GitHub Pages
      const response = await fetch('./itinerario.json')
      if (!response.ok) throw new Error(`Network response was not ok: ${response.status}`)

      const data: Itinerary = await response.json()
      itinerary.value = data
    } catch (e) {
      error.value = `Failed to load itinerary data: ${e instanceof Error ? e.message : 'Unknown error'}`
      console.error('Error fetching itinerary:', e)
    } finally {
      isLoading.value = false
    }
  }

  return {
    itinerary,
    isLoading,
    error,
    tripTitle,
    tripSubtitle,
    cities,
    getCityById,
    fetchItinerary,
  }
})
