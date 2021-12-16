import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Authentification from '../views/Authentification.vue'
import Applications from '../views/Applications.vue'
import FreezeBeeFabrications from '../views/FreezeBeeFabrications.vue'
import FreezeBeeDetails from '../views/FreezeBeeDetails.vue'
import Catalogue from '../views/Catalogue.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Applications',
    component: Applications
  },
  {
    path: '/login',
    name: 'Authentification',
    component: Authentification
  },
  {
    path: '/home',
    name: 'Home',
    component: Home
  },
  {
    path: '/home/fabrications',
    name: 'FreezeBeeFabrications',
    component: FreezeBeeFabrications
  },
  {
    path: '/home/details',
    name: 'FreezeBeeDetails',
    component: FreezeBeeDetails
  },
  {
    path: '/catalogue',
    name: 'Catalogue',
    component: Catalogue
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
