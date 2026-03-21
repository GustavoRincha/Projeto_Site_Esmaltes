import { createRouter, createWebHistory } from 'vue-router';
import Catalog from '../views/Catalog.vue';
import UsagesGallery from '../views/UsagesGallery.vue';

const routes = [
  {
    path: '/',
    name: 'Catalog',
    component: Catalog
  },
  {
    path: '/gallery',
    name: 'Gallery',
    component: UsagesGallery
  },
  {
    path: '/dashboard',
    name: 'Dashboard',
    component: () => import('../views/Dashboard.vue')
  },
  {
    path: '/wishlist',
    name: 'Wishlist',
    component: () => import('../views/Wishlist.vue')
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;
