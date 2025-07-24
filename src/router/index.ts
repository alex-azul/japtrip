import { createRouter, createWebHashHistory } from 'vue-router'
import ItineraryView from '../views/ItineraryView.vue'

const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    {
      path: '/',
      name: 'home',
      component: ItineraryView,
    },
    // Example of an expandable route for a city detail page
    // {
    //   path: '/city/:id',
    //   name: 'city-details',
    //   component: () => import('../views/CityDetailView.vue')
    // }
  ],
})

export default router
