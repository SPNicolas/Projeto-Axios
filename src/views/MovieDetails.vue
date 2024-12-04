<script setup>
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router'; // Para acessar os parâmetros da rota
import api from '@/plugins/axios';

const route = useRoute();  // Acessando os parâmetros da rota
const movie = ref({});  // Armazenando os dados do filme

const formatDate = (date) => new Date(date).toLocaleDateString('pt-BR');

// Função para buscar os detalhes do filme
onMounted(async () => {
  const movieId = route.params.id; // Acessando o id do filme passado pela rota
  const response = await api.get(`movie/${movieId}`, {
    params: {
      language: 'pt-BR'
    }
  });
  movie.value = response.data;
});
</script>

<template>
    <div class="movie-details-container">
      <h1>{{ movie.title }}</h1>
      <img :src="`https://image.tmdb.org/t/p/w500${movie.poster_path}`" alt="Movie Poster">
      <p>{{ movie.overview }}</p>
      <p>{{ formatDate(movie.release_date) }}</p>
    </div>
  </template>

<style scoped>
.movie-details-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  color: white;
}

.movie-poster {
  width: 300px;
  border-radius: 10px;
  box-shadow: 0 0 20px rgba(255, 0, 0, 0.5);
}

.movie-info {
  max-width: 600px;
  text-align: center;
  margin-top: 20px;
}

.movie-title {
  font-size: 2rem;
  font-weight: bold;
  margin-bottom: 10px;
}

.movie-overview {
  margin-top: 10px;
}

.movie-release-date,
.movie-genres {
  margin-top: 10px;
}

.movie-genres span {
  margin-right: 5px;
}
</style>
