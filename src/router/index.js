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
    path: '/movie/:id',
    name: 'MovieDetails',
    component: () => import('../views/MovieDetailsView.vue'),
    props: true,
  },
  {
    path: '/spiderMan',
    name: 'Spider-Man',
    component: () => import('../views/SpiderManView.vue'),
  },
  {
    path: '/serie/:id',
    name: 'SerieDetails',
    component: () => import('../views/SerieDetailsView.vue'),
    props: true,
  },
  {
    path: '/barbie',
    name: 'Barbie',
    component: () => import('../views/BarbieView.vue'),
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;






