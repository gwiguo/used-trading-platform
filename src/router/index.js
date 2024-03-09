import { createRouter, createWebHistory } from 'vue-router';
import { useMain } from "@/store/index.js";
import { ElMessage } from "element-plus";

const routes = [
    {
        path: '/',
        name: 'Home',
        component: () => import(/* webpackChunkName: "login" */ '../views/home.vue'),
    },
    {
        path: '/publish',
        name: 'Publish',
        meta: {
            requiresAuth:true
        },
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
        meta: {
            requiresAuth:true
        },
        component: () => import(/* webpackChunkName: "login" */ '../views/order_id.vue'),
    },
    {
        path: '/my',
        name: 'my',
        meta: {
            requiresAuth:true
        },
        component: () => import(/* webpackChunkName: "login" */ '../views/my.vue'),
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

router.beforeEach((to, from) => {    
    const useStore = useMain();
    const { userInfo } = useStore;

    if( to.meta.requiresAuth && !userInfo.account){
        ElMessage({
            type: "error",
            message: "请先登录！"
		});	
        return false;
    }else{
        return true
    }
  })

export default router;