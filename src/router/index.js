import Vue from 'vue'
import Router from 'vue-router'
import ActivityList from '@/components/ActivityList'
import Login from '@/components/Login'
import Register from '@/components/Register'
import News from '@/components/News'
import ActivityDetail from '@/components/ActivityDetail'
import NewsDetail from '@/components/NewsDetail'
import MyActivity from '@/components/MyActivity'
import MyActivityDetail from '@/components/MyActivityDetail'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Login',
      component: Login
    },
    {
      path: '/Login',
      name: 'Login',
      component: Login
    },
    {
      path: '/register',
      name: 'Register',
      component: Register
    },
    {
      path: '/activity-list',
      name: 'ActivityList',
      component: ActivityList
    },
    {
      path: '/news-list',
      name: 'News',
      component: News
    },
    {
      path: '/news-detail',
      name: 'NewsDetail',
      component: NewsDetail
    },
    {
      path: '/activity-detail',
      name: 'ActivityDetail',
      component: ActivityDetail
    },
    {
      path: '/my-activity',
      name: 'MyActivity',
      component: MyActivity
    },
    {
      path: '/my-activity-detail',
      name: 'MyActivityDetail',
      component: MyActivityDetail
    }

  ]
})
