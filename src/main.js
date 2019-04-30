import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import axios from "axios"
import VueAxios from 'vue-axios'
import G2 from '@antv/g2'
import '@antv/g2-plugin-slider'
import {View,DataSet} from '@antv/data-set'
Vue.use(VueAxios,axios)
Vue.use(G2)
Vue.use(View)
Vue.use(DataSet)


import './mock-data.js'
import url from "./request-url.js"
Vue.use(url);

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
