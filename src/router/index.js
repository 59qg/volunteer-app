import Vue from 'vue'
import Router from 'vue-router'
import ActivityList from '@/components/ActivityList'
import Login from '@/components/Login'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Login',
      component: Login
    },
    {
      path: '/activity-list',
      name: 'ActivityList',
      component: ActivityList
    }
  ]
})
