import Vue from 'vue'
import Router from 'vue-router'
import Top from '@/pages/Top'
import VueGtag from 'vue-gtag'

import Syllabus from '@/pages/Syllabus'
import Institution from '@/pages/Institution'

if (process.env.NODE_ENV === "production") {
    Vue.use(VueGtag, {
        config: {id: process.env.VUE_APP_GA_ID}
    },Router)
} else {
    Vue.use(Router)
}


export default new Router({
    mode: 'history',
    relative: true,
    base: 'other/nutt',
    routes:[
        {
            path:'/syllabus',
            name: 'syllabus',
            component: Syllabus,
            meta: { title: 'Syllabus' }
        },
        {
            path: '/',
            name: 'top',
            component: Top,
            meta: { title: 'Top' }
        },
        {
            path: '/institution',
            name: 'institution',
            component: Institution,
            meta: { title: 'Institution' }
        }

    ]
})
