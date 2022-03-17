import Vue from 'vue'
import App from './App.vue'
import router from './router'
import axios from 'axios'
import VueAxios from 'vue-axios'
import VueGtag from 'vue-gtag'
import VueVirtualScroller from 'vue-virtual-scroller'

import "bootstrap"
// import 'bootstrap-vue/dist/bootstrap-vue.css'
// import 'bootstrap/dist/css/bootstrap.css'
import '@/assets/custom.scss'

import { library } from '@fortawesome/fontawesome-svg-core'
import { faAngleRight } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
library.add(faAngleRight)

Vue.component('font-awesome-icon', FontAwesomeIcon)
Vue.component('RecycleScroller', VueVirtualScroller.RecycleScroller)

Vue.use(VueAxios, axios)
Vue.use(VueGtag, {
    config: { id: "G-E0221B3Z54"}
});
Vue.use(VueVirtualScroller)


Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
