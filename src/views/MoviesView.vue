<script setup>
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import api from '@/plugins/axios';
import Loading from 'vue-loading-overlay';
import { useGenreStore } from '@/stores/genre';

const genreStore = useGenreStore();
const router = useRouter();

const isLoading = ref(false);
const genres = ref([]);

onMounted(async () => {
  isLoading.value = true;
  await genreStore.getAllGenres('movie');
  isLoading.value = false;
});

const movies = ref([]);

const listMovies = async (genreId) => {
  isLoading.value = true;
  const response = await api.get('discover/movie', {
    params: {
      with_genres: genreId,
      language: 'pt-BR'
    }
  });
  movies.value = response.data.results;
  isLoading.value = false;
};

const formatDate = (date) => new Date(date).toLocaleDateString('pt-BR');

const getGenreName = (id) => genres.value.find((genre) => genre.id === id).name;

const goToMovieDetails = (movieId) => {
  router.push({ name: 'MovieDetails', params: { id: movieId } }); 
};
</script>
<template>
  <div class="container">
    
    <ul class="genre-list">
      <li
        v-for="genre in genreStore.genres"
        :key="genre.id"
        @click="listMovies(genre.id)"
        class="genre-item"
      >
        {{ genre.name }}
      </li>
    </ul>

    <loading v-model:active="isLoading" is-full-page />
    
    <div class="movie-list">
      <div 
        v-for="movie in movies" 
        :key="movie.id" 
        class="movie-card"
        @click="goToMovieDetails(movie.id)"   Evento de clique para navegação 
      >
        <img
          :src="`https://image.tmdb.org/t/p/w500${movie.poster_path}`"
          :alt="movie.title"
        />
        <p class="movie-genres">
          <span
            v-for="genre_id in movie.genre_ids"
            :key="genre_id"
            @click="listMovies(genre_id)"
          >
            {{ genreStore.getGenreName(genre_id) }}
          </span>
        </p>
        <p class="movie-release-date">{{ formatDate(movie.release_date) }}</p>
      </div>
  </div>
</div>
</template>

<style scoped>
@import "../assets/sass/_filmes.scss";
</style>
