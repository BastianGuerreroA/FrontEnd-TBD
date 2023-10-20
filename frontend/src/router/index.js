import Vue from 'vue'
import VueRouter from 'vue-router'
import HomeViewLogin from '../views/HomeViewLogin.vue'
import Register from '../views/HomeViewRegister.vue'
import UserView from "@/views/UserView.vue";

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
    path: '/register',
    name: 'register',
    component: Register
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
