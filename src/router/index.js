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
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;
