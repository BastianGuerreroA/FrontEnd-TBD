import Vue from 'vue'
import VueRouter from 'vue-router'
import HomeViewLogin from '../views/HomeViewLogin.vue'
import Register from '../views/HomeViewRegister.vue'
import UserView from "@/views/UserView.vue";
import Editar from "@/views/Editar.vue";
import CoordinadorView from "@/views/CoordinadorView.vue";
import EditarCoordinador from "@/views/EditarCoordinador.vue";
import CrearEmergencia from "@/views/CrearEmergencia.vue";
import CrearHabilidad from "@/views/CrearHabilidad.vue";
import RequerimientosEmergencia from "@/views/RequerimientosEmergencia.vue";
import Map from "@/views/Map.vue";

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'login',
    component: HomeViewLogin
  },
  {
    path: '/home/:id',
    name: 'home',
    component: UserView
  },
  {
    path: '/coordinador/:id',
    name: 'coordinador',
    component: CoordinadorView
  },
  {
    path: '/register',
    name: 'register',
    component: Register
  },
  {
    path: '/home/:id/editar',
    name: 'editar',
    component: Editar
  },
  {
    path: '/coordinador/:id/editar',
    name: 'editarCoordinador',
    component: EditarCoordinador
  },
  {
    path: '/coordinador/:id/crearEmergencia',
    name: 'crearEmergencia',
    component: CrearEmergencia
  },
  {
    path: '/coordinador/:id/crearHabilidad',
    name: 'crearHabilidad',
    component: CrearHabilidad
  },
  {
    path: '/coordinador/:id/requerimientosEmergencia',
    name: 'requerimientosEmergencia',
    component: RequerimientosEmergencia
  },
  {
    path: '/coordinador/:id/map',
    name: 'map',
    component: Map
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
