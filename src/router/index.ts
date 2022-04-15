import {createRouter, createWebHistory, RouteRecordRaw} from 'vue-router'
import TopView from '../views/TopView.vue'
import InstitutionView from "@/views/InstitutionView.vue";
import ContactView from "@/views/ContactView.vue";

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'Top',
    component: TopView,
    meta: { title: 'Top' }
  },
  {
    path: '/institution',
    name: 'institution',
    component: InstitutionView,
    meta: { title: 'Institution' }
  },
  {
    path: '/contact',
    name: 'contact',
    component: ContactView,
    meta: { title: 'Contact' }
  }
]

const router = createRouter({
  history: createWebHistory('/other/nutt'),
  routes
})

const DEFAULT_TITLE = 'NUTT'

router.afterEach((to) => {
  if (typeof(to.meta.title) === "string") {
    document.title = `${to.meta.title} | ${DEFAULT_TITLE}`
  }
})

export default router
