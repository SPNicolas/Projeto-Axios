<script setup>
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router'; // Para acessar os parâmetros da rota
import api from '@/plugins/axios';

const route = useRoute();  // Acessando os parâmetros da rota
const movie = ref({});  // Armazenando os dados do filme

// Função para formatar a data
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
    <!-- Título do Filme -->
    <h1>{{ movie.title }}</h1>

    <!-- Imagem do Filme -->
    <img :src="`https://image.tmdb.org/t/p/w500${movie.poster_path}`" alt="Movie Poster" />

    <!-- Descrição do Filme -->
    <p class="movie-description">{{ movie.overview }}</p>

    <!-- Data de Lançamento -->
    <p>{{ formatDate(movie.release_date) }}</p>
  </div>
</template>

<style scoped>
.movie-details-container {
  color: black;
  padding: 20px;
}

.movie-details-container h1 {
  font-size: 2rem;
  margin-bottom: 1rem;
}

.movie-details-container img {
  width: 300px;
  height: 450px;
  border-radius: 8px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.7);
  margin-bottom: 1rem;
}

.movie-description {
  font-size: 1.1rem;
  line-height: 1.6rem;
  margin-bottom: 1rem;
}

.movie-details-container p {
  font-size: 1rem;
  margin-bottom: 0.5rem;
}
</style>