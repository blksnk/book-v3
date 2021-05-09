import { createRouter, createWebHistory } from 'vue-router';
import Home from '../views/Home.vue';
import ProjectDetails from '../views/ProjectDetails.vue';
import CategoryDetails from '../views/CategoryDetails.vue';

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ '../views/About.vue'),
  },
  {
    path: '/work',
    name: 'Categories',
    component: () =>
      import(/* webpackChunkName: "about" */ '../views/Categories.vue'),
  },
  {
    path: '/category/:name/',
    name: 'Category Details',
    component: CategoryDetails,
  },
  {
    path: '/project/:id/:name',
    name: 'Project Details',
    component: ProjectDetails,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
