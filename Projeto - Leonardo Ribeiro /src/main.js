// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import vmodal from 'vue-js-modal'
import money from 'v-money'
import moment from 'moment'

Vue.config.productionTip = false

Vue.filter('currency', function (value) {
  return 'R$ ' + value.toFixed(2).replace('.', ',')
})

Vue.filter('dataBR', function (value) {
  return moment(value).format('l')
})

Vue.use(vmodal)
Vue.use(money, {precision: 4})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
})
