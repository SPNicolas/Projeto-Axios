<script setup>
import { ref, onMounted } from 'vue';
import api from '@/plugins/axios';

const movies = ref([]);
const series = ref([]);

onMounted(async () => {

  const moviesResponse = await api.get('/search/movie', {
    params: {
      query: 'Homem Aranha',
      language: 'pt-BR',
    },
  });
  movies.value = moviesResponse.data.results;


  const seriesResponse = await api.get('/search/tv', {
    params: {
      query: 'Homem Aranha',
      language: 'pt-BR',
    },
  });
  series.value = seriesResponse.data.results;
});
</script>
<template>
  <div class="spiderman-page">
    <h1 class="page-title">Filmes e Séries do Homem-Aranha</h1>

    <section class="movies-section">
      <h2 class="section-title">Filmes</h2>
      <div class="movies-list">
        <div v-for="movie in movies" :key="movie.id" class="movie-item">
          <router-link :to="`/movie/${movie.id}`">
            <img
              :src="movie.poster_path ? `https://image.tmdb.org/t/p/w200${movie.poster_path}` : '/default-movie.png'"
              :alt="movie.title"
              class="movie-poster"
            />
            <h3 class="movie-title">{{ movie.title }}</h3>
          </router-link>
        </div>
      </div>
    </section>


    <section class="series-section">
      <h2 class="section-title">Séries</h2>
      <div class="series-list">
        <div v-for="serie in series" :key="serie.id" class="serie-item">
          <router-link :to="`/serie/${serie.id}`">
            <img
              :src="serie.poster_path ? `https://image.tmdb.org/t/p/w200${serie.poster_path}` : '/default-movie.png'"
              :alt="serie.name"
              class="serie-poster"
            />
            <h3 class="serie-title">{{ serie.name }}</h3>
          </router-link>
        </div>
      </div>
    </section>
  </div>
</template>

<style scoped>
.spiderman-page {
  padding: 20px;
  background-color: #111;
  color: #fff;
  font-family: Arial, sans-serif;
}

.page-title {
  font-size: 2.5rem;
  text-align: center;
  margin-bottom: 2rem;
  color: #9a0824;
}

.section-title {
  font-size: 2rem;
  margin-bottom: 1.5rem;
  color: #0e4cfb;
}

.movies-list,
.series-list {
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  justify-content: center;
}

.movie-item,
.serie-item {
  text-align: center;
  width: 150px;
}

.movie-poster,
.serie-poster {
  width: 150px;
  height: 225px;
  border-radius: 8px;
  object-fit: cover;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.8);
  transition: transform 0.3s ease;
}

.movie-poster:hover,
.serie-poster:hover {
  transform: scale(1.05);
}

.movie-title,
.serie-title {
  font-size: 1rem;
  margin-top: 0.5rem;
  color: #fff;
}
</style>
