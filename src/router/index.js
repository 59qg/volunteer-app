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
import AddComment from '@/components/AddComment'
import MyAddComment from '@/components/MyAddComment'
import MyInfo from '@/components/MyInfo'
import ModifyPsd from '@/components/ModifyPsd'

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
    },
    {
      path: '/add-comment',
      name: 'AddComment',
      component: AddComment
    },
    {
      path: '/my-add-comment',
      name: 'MyAddComment',
      component: MyAddComment
    },
    {
      path: '/my-info',
      name: 'MyInfo',
      component: MyInfo
    },
    {
      path: '/modify-psd',
      name: 'ModifyPsd',
      component: ModifyPsd
    }

  ]
})
