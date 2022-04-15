import { createApp } from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import axios from "axios"
import VueAxios from "vue-axios"

import "bootstrap"
import "@/assets/styles/nutt.scss"
import { store } from './store'

import dayjs from 'dayjs'
import 'dayjs/locale/ja'

dayjs.locale('ja')


createApp(App).use(store)
    .use(router)
    .use(VueAxios, axios)
    .provide('dayjs', dayjs)
    .mount('#app')