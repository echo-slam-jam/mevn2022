import { createWebHistory, createRouter } from 'vue-router';

const routes = [
	{
		path: '/',
		name: "Home",
		component: () => import('../views/Home.vue'),
	},
	{
		path: '/login',
		name: "login",
		component: () => import('../components/login.vue'),
	},
];

const router = createRouter({
	history: createWebHistory(),
	routes,
});

export default router