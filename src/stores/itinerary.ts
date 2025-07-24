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

  // Getter to find a specific day by city ID and day index
  const getDayByIndex = computed(() => {
    return (cityId: string, dayIndex: number) => {
      const city = getCityById.value(cityId)
      return city?.dias[dayIndex] || null
    }
  })

  // Getter to get the active option for a day (either selected or default)
  const getActiveDayOption = computed(() => {
    return (cityId: string, dayIndex: number) => {
      const day = getDayByIndex.value(cityId, dayIndex)
      if (!day?.opciones) return null

      const dayKey = getDayOptionKey(cityId, dayIndex)
      const selectedOptionId = selectedDayOptions.value[dayKey]
      
      if (selectedOptionId) {
        return day.opciones.find(opt => opt.id === selectedOptionId) || null
      }
      
      // Return default option or first option
      return day.opciones.find(opt => opt.isDefault) || day.opciones[0] || null
    }
  })

  // Getter to get day details for a specific day/option
  const getDayDetails = computed(() => {
    return (cityId: string, dayIndex: number, optionId?: string) => {
      const day = getDayByIndex.value(cityId, dayIndex)
      if (!day) return null

      // If optionId is provided, get details from that specific option
      if (optionId && day.opciones) {
        const option = day.opciones.find(opt => opt.id === optionId)
        return option?.dayDetails || null
      }

      // If day has options but no specific optionId, get from active option
      if (day.opciones) {
        const activeOption = getActiveDayOption.value(cityId, dayIndex)
        return activeOption?.dayDetails || null
      }

      // Otherwise, get details from the day itself
      return day.dayDetails || null
    }
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
    getDayByIndex,
    getActiveDayOption,
    getDayDetails,
    fetchItinerary,
    setDayOption,
    getDayOptionKey,
  }
})
