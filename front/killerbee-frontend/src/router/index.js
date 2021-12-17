import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Authentification from '../views/Authentification.vue'
import Applications from '../views/Applications.vue'
import FreezeBeeFabrications from '../views/FreezeBeeFabrications.vue'
import FreezeBeeDetails from '../views/FreezeBeeDetails.vue'
import Catalogue from '../views/Catalogue.vue'
import Processus from '../views/Processus.vue'
import ModificationModel from '../components/ModificationModel.vue'
import ModificationIngredient from '../components/ModificationIngredient.vue'
import ModificationProcessus from '../components/ModificationProcessus.vue'
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
    path: '/home/modifications',
    name: 'ModificationModel',
    component: ModificationModel
  },
  {
    path: '/catalogue',
    name: 'Catalogue',
    component: Catalogue
  },
  {
    path: '/catalogue/modifications',
    name: 'ModificationIngredient',
    component: ModificationIngredient
  },
  {
    path: '/processus',
    name: 'Processus',
    component: Processus
  },
  {
    path: '/processus/modifications',
    name: 'ModificationProcessus',
    component: ModificationProcessus
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
