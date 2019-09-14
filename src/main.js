import Vue from 'vue'
import VueMq from 'vue-mq'
import App from './App.vue'
import router from './router'
import store from './store'



Vue.config.productionTip = false

Vue.use(VueMq, {
  breakpoints: {
    mobile: 500,
    tablet: 770,
    laptop: Infinity,
  }
})

new Vue({
  render: h => h(App),
  router,
  store,
}).$mount('#app')
