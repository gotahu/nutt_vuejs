import Vue from 'vue'
import Router from 'vue-router'

import Top from '@/pages/Top'
import Syllabus from '@/pages/Syllabus'
import Institution from '@/pages/Institution'
import Contact from '@/pages/Contact'
import Humanities from '@/pages/Humanities'

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
        {
            path: '/institution',
            name: 'institution',
            component: Institution,
            meta: { title: 'Institution' }
        },
        {
            path: '/contact',
            name: 'contact',
            component: Contact,
            meta: { title: 'Contact' }
        },
        {
            path: '/humanities',
            name: 'humanities',
            component: Humanities,
            meta: { title: 'Humanities'}
        }
    ]
})
