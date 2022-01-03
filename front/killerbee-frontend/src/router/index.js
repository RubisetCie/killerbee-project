import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Authentification from '../views/Authentification.vue'
import Applications from '../views/Applications.vue'
import FreezeBeeFabrications from '../views/FreezeBeeFabrications.vue'
import FreezeBeeDetails from '../views/FreezeBeeDetails.vue'
import CatalogueIngredients from '../views/CatalogueIngredients.vue'
import Processus from '../views/Processus.vue'
import AddModel from '../components/AddModel.vue'
import AddIngredient from '../components/AddIngredient.vue'
import AddProcessus from '../components/AddProcessus.vue'
import DeleteModel from '../components/DeleteModel.vue'
import DeleteIngredient from '../components/DeleteIngredient.vue'
import DeleteProcessus from '../components/DeleteProcessus.vue'
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
    path: '/home/addmodel',
    name: 'AddModel',
    component: AddModel
  },
  {
    path: '/home/deletemodel',
    name: 'DeleteModel',
    component: DeleteModel
  },
  {
    path: '/ingerdients',
    name: 'CatalogueIngredients',
    component: CatalogueIngredients
  },
  {
    path: '/ingredients/addingredient',
    name: 'AddIngredient',
    component: AddIngredient
  },
  {
    path: '/ingredients/deleteingredient',
    name: 'DeleteIngredient',
    component: DeleteIngredient
  },
  {
    path: '/processus',
    name: 'Processus',
    component: Processus
  },
  {
    path: '/processus/addprocessus',
    name: 'AddProcessus',
    component: AddProcessus
  },
  {
    path: '/processus/deleteprocessus',
    name: 'DeleteProcessus',
    component: DeleteProcessus
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,// a changer
  //base: process.env.URL_APP,
  routes
})

export default router
