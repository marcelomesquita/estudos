import Vue from 'vue'
import Router from 'vue-router'
import ProgramaList from '@/pages/ProgramaList'
import ProgramaForm from '@/pages/ProgramaForm'

Vue.use(Router)

const routes = [
  {
    name: 'ProgramaList',
    path: '/',
    component: ProgramaList
  },
  {
    name: 'ProgramaForm',
    path: '/programa',
    component: ProgramaForm
  }
]

const router = new Router({ routes })

export default router
