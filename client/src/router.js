import Vue from 'vue'
import Router from 'vue-router'
import Register from '@/components/Register'
import Login from '@/components/Login'
import Songs from '@/components/Songs/Index'
import CreateSong from '@/components/CreateSong'
import ViewSong from '@/components/ViewSong'
import EditSong from '@/components/EditSong'
import ViewUser from '@/components/ViewUser'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'songs',
      component: Songs
    },
    {
      path: '/register',
      name: 'register',
      component: Register
    },
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path: '/songs/create',
      name: 'create-song',
      component: CreateSong
    },
    {
      path: '/songs/:id',
      name: 'song',
      component: ViewSong
    },
    {
      path: '/songs/:id/edit',
      name: 'edit-song',
      component: EditSong
    },
    {
      path: '/users/:id',
      name: 'user',
      component: ViewUser
    },
    {
      path: '*',
      redirect: 'songs'
    }
  ]
})
