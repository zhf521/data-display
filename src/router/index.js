import { createRouter, createWebHistory } from 'vue-router';

// 导入组件
import Area from '../views/Area.vue';
import Home from '../views/Home.vue';
// 创建路由实例
const router = createRouter({
    history: createWebHistory(),
    routes: [
        {
            path: '/',
            redirect: '/home',
        },
        {
            path: '/home',
            name: 'Home',
            component: Home,
        },
        {
            path: '/area',
            name: 'Area',
            component: Area,
        },
    ],
});

export default router;
