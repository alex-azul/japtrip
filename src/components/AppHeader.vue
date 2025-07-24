<!-- src/components/AppHeader.vue -->
<script setup lang="ts">
defineProps<{
  title: string
  subtitle: string
}>()
</script>

<template>
  <header>
    <h1>{{ title }}</h1>
    <p>{{ subtitle }}</p>
  </header>
</template>

<style scoped>
header {
  background:
    linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.8)),
    url('https://images.unsplash.com/photo-1524413840807-0c3cb6fa808d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwzNjUyOXwwfDF8c2VhcmNofDEzfHx0b2t5byUyMG5pZ2h0fGVufDB8fHx8MTY4ODU2NzIzNA&ixlib=rb-4.0.3&q=80&w=1080')
      no-repeat center center;
  background-size: cover;
  color: white;
  text-align: center;
  padding: 5rem 1rem 4rem;
  text-shadow: 2px 2px 8px rgba(0, 0, 0, 0.8);
}

header h1 {
  font-family: 'Rajdhani', sans-serif;
  font-size: 4rem;
  font-weight: 700;
  letter-spacing: 2px;
  text-transform: uppercase;
}

header p {
  font-size: 1.25rem;
  font-weight: 500;
  color: rgba(255, 255, 255, 0.8);
}

@media (max-width: 768px) {
  header h1 {
    font-size: 2.5rem;
  }
  header p {
    font-size: 1rem;
  }
}
</style>
