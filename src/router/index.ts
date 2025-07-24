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
    {
      path: '/day/:cityId/:dayIndex/:optionId?',
      name: 'day-detail',
      component: () => import('../views/DayDetailView.vue'),
      props: true
    }
  ],
})

export default router
