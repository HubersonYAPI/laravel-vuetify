require('./bootstrap');

window.Vue = require('vue');

Vue.component('app-init', require('./AppInit.vue').default);

import VueRouter from 'vue-router'
Vue.use(VueRouter)

import Vuetify from 'vuetify'
import 'vuetify/dist/vuetify.min.css'
Vue.use(Vuetify)


import Dashboard from './views/Dashboard'
import Products from './views/Products'
import Users from './views/Users'
import Profil from './views/Profil'
import Laptop from './views/Laptop'
import Uc from './views/Uc'

const router = new VueRouter({
    mode: 'history',
    routes: [
        {
            path: '/',
            name: 'dashboard',
            component: Dashboard
        },
        {
            path: '/products',
            name: 'products',
            component: Products,
        },
        {
            path: '/users',
            name: 'users',
            component: Users,
        },
        {
            path: '/profil',
            name: 'profil',
            component: Profil,
        },
        {
            path: '/laptop',
            name: 'laptop',
            component: Laptop,
        },
        {
            path: '/uc',
            name: 'uc',
            component: Uc,
        }
    ],
});

const app = new Vue({
    el: '#app',
    router,
    vuetify: new Vuetify(),
});