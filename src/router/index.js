import { createRouter, createWebHistory } from 'vue-router';

const routes = [
    {
        path: '/',
        name: 'Home',
        component: () => import(/* webpackChunkName: "login" */ '../views/home.vue'),
    },
    {
        path: '/publish',
        name: 'Publish',
        component: () => import(/* webpackChunkName: "login" */ '../views/publish.vue'),
    },
    {
        path: '/item/:id',
        name: 'item',
        component: () => import(/* webpackChunkName: "login" */ '../views/goods_id.vue'),
    },
    {
        path: '/order/:id',
        name: 'order',
        component: () => import(/* webpackChunkName: "login" */ '../views/order_id.vue'),
    },
    // {
    //     path: '/login',
    //     name: 'Login',
    //     meta: {
    //         title: '登录',
    //     },
    //     component: () => import(/* webpackChunkName: "login" */ '../views/login.vue'),
    // },
    {
        path: '/:pathMatch(.*)',
        redirect: '/404'
    },
    {
        path: '/404',
        name: '404',
        component: () => import(/* webpackChunkName: "login" */ '../views/404.vue'),
    },
];


const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;