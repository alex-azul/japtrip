<script setup lang="ts">
import { RouterView } from 'vue-router'
import { useItineraryStore } from '@/stores/itinerary'
import AppHeader from '@/components/AppHeader.vue'

const store = useItineraryStore()
</script>

<template>
  <AppHeader :title="store.tripTitle" :subtitle="store.tripSubtitle" />
  <main>
    <RouterView />
  </main>
</template>

<style scoped>
main {
  max-width: 950px;
  margin: 2.5rem auto;
  padding: 0 1rem;
}
</style>
