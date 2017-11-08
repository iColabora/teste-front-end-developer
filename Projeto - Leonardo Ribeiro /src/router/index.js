import Vue from 'vue'
import Router from 'vue-router'

import Task from '../components/Task.vue'
import Dashboard from '../components/Dashboard.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Dashboard',
      component: Dashboard
    },
    {
      path: '/task',
      name: 'Task',
      component: Task
    },
    {
      path: '*',
      name: Dashboard,
      component: Dashboard
    }
  ]
})
