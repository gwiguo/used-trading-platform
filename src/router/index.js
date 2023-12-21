import { createRouter, createWebHistory } from 'vue-router';

const routes = [
    {
        path: '/'
    },
    {
        path: '/login',
        name: 'Login',
        meta: {
            title: '登录',
        },
        component: () => import(/* webpackChunkName: "login" */ '../views/login.vue'),
    }
];


const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;