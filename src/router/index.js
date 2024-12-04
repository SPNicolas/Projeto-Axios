import { createRouter, createWebHistory } from 'vue-router';

const routes = [
  {
    path: '/',
    name: 'Home',
    component: () => import('../views/Home.vue'),
  },
  {
    path: '/filmes',
    name: 'Movies',
    component: () => import('../views/MoviesView.vue'),
  },
  {
    path: '/tv',
    name: 'TV',
    component: () => import('../views/TvView.vue'),
  },
  {
    path: '/movie/:id',  // Rota dinâmica para detalhes do filme
    name: 'MovieDetails',
    component: () => import('../views/MovieDetails.vue'), // Página de detalhes do filme
    props: true,  // Passa o parâmetro id como propriedade para o componente
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;





