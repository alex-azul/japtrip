// src/stores/itinerary.ts

import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import type { Itinerary } from '@/types/itinerary'

export const useItineraryStore = defineStore('itinerary', () => {
  // --- STATE ---
  const itinerary = ref<Itinerary | null>(null)
  const isLoading = ref(false)
  const error = ref<string | null>(null)
  const selectedDayOptions = ref<Record<string, string>>({})

  // --- GETTERS (Computed properties) ---
  const tripTitle = computed(() => itinerary.value?.tituloViaje ?? 'Cargando...')
  const tripSubtitle = computed(() => itinerary.value?.subtituloViaje ?? '')
  const cities = computed(() => itinerary.value?.ciudades ?? [])

  // Getter to find a single city by its ID, useful for detail pages
  const getCityById = computed(() => {
    return (cityId: string) => cities.value.find((city) => city.id === cityId)
  })

  // Getter to get selected option for a specific day
  const getSelectedOption = computed(() => {
    return (dayKey: string) => selectedDayOptions.value[dayKey]
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
      
      // Load saved day options from localStorage
      loadDayOptions()
    } catch (e) {
      error.value = `Failed to load itinerary data: ${e instanceof Error ? e.message : 'Unknown error'}`
      console.error('Error fetching itinerary:', e)
    } finally {
      isLoading.value = false
    }
  }

  function setDayOption(cityId: string, dayIndex: number, optionId: string) {
    const dayKey = `${cityId}-${dayIndex}`
    selectedDayOptions.value[dayKey] = optionId
    saveDayOptions()
  }

  function getDayOptionKey(cityId: string, dayIndex: number): string {
    return `${cityId}-${dayIndex}`
  }

  function saveDayOptions() {
    try {
      localStorage.setItem('itinerary-day-options', JSON.stringify(selectedDayOptions.value))
    } catch (e) {
      console.warn('Failed to save day options to localStorage:', e)
    }
  }

  function loadDayOptions() {
    try {
      const saved = localStorage.getItem('itinerary-day-options')
      if (saved) {
        selectedDayOptions.value = JSON.parse(saved)
      }
    } catch (e) {
      console.warn('Failed to load day options from localStorage:', e)
      selectedDayOptions.value = {}
    }
  }

  return {
    itinerary,
    isLoading,
    error,
    selectedDayOptions,
    tripTitle,
    tripSubtitle,
    cities,
    getCityById,
    getSelectedOption,
    fetchItinerary,
    setDayOption,
    getDayOptionKey,
  }
})
