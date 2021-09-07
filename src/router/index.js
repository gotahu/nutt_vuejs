import Vue from 'vue'
import Router from 'vue-router'
import Top from '@/pages/top'

import Syllabus from '@/pages/syllabus'

Vue.use(Router)

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

    ]
})
