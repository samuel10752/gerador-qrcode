import { createRouter, createWebHistory } from 'vue-router';
import QRCodeGenerator from './components/QRCodeGenerator.vue';
import ImageDisplay from './components/ImageDisplay.vue';

const routes = [
  { path: '/', name: 'Home', component: QRCodeGenerator },
  {
    path: '/imagem/dataimage',
    name: 'Imagem',
    component: ImageDisplay,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
