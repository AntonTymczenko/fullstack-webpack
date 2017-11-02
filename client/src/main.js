// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import Vuetify from 'vuetify'
import { sync } from 'vuex-router-sync'
import store from './store/store'
import Panel from '@/components/globals/Panel'
import Centered from '@/components/globals/Centered'

import VueYouTubeEmbed from 'vue-youtube-embed'
Vue.use(VueYouTubeEmbed)

Vue.config.productionTip = false
Vue.use(Vuetify)

Vue.component('panel', Panel)
Vue.component('centered', Centered)

sync(store, router)


/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App }
})
