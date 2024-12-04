<script setup>
import { ref, onMounted } from 'vue';
import api from '@/plugins/axios';
import { useGenreStore } from '@/stores/genre';

const genreStore = useGenreStore();

// Estado reativo
const isLoading = ref(false);
const movies = ref([]);
const errorMessage = ref(null);

// Buscar os filmes iniciais
const listMovies = async (genreId) => {
  try {
    isLoading.value = true;
    errorMessage.value = null;

    const response = await api.get('discover/movie', {
      params: {
        with_genres: genreId,
        language: 'pt-BR',
      },
    });

    movies.value = response.data.results;
  } catch (err) {
    console.error('Erro ao buscar filmes:', err);
    errorMessage.value = 'Não foi possível carregar os filmes.';
  } finally {
    isLoading.value = false;
  }
};

// Inicialização
onMounted(async () => {
  try {
    isLoading.value = true;
    errorMessage.value = null;

    await genreStore.getAllGenres('movie');

    if (genreStore.genres.length > 0) {
      await listMovies(genreStore.genres[0].id); // Carregar filmes do primeiro gênero
    }
  } catch (err) {
    console.error('Erro ao inicializar:', err);
    errorMessage.value = 'Não foi possível carregar os dados iniciais.';
  } finally {
    isLoading.value = false;
  }
});
</script>

<template>
  <div class="home-container">
    <h1>Seja Bem-Vindo</h1>

    <!-- Indicador de carregamento -->
    <loading v-model:active="isLoading" is-full-page />

    <!-- Mensagem de erro -->
    <div v-if="errorMessage" class="error-message">
      {{ errorMessage }}
    </div>

    <!-- Lista de filmes em fila horizontal -->
    <div v-if="!errorMessage && movies.length" class="movie-carousel">
      <div v-for="movie in movies" :key="movie.id" class="movie-item">
        <img
          :src="movie.poster_path ? `https://image.tmdb.org/t/p/w500${movie.poster_path}` : '/placeholder.jpg'"
          :alt="movie.title"
        />
        <p class="movie-title">{{ movie.title }}</p>
      </div>
    </div>

    <!-- Mensagem quando não há filmes -->
    <div v-if="!isLoading && !movies.length && !errorMessage" class="no-movies">
      Nenhum filme encontrado.
    </div>
  </div>
</template>

<style scoped>
.home-container {
  background-color: black;
  color: white;
  padding: 20px;
  text-align: center;
}

.movie-carousel {
  display: flex;
  overflow-x: auto;
  gap: 16px;
  padding: 10px;
  scroll-behavior: smooth;
}

.movie-carousel::-webkit-scrollbar {
  height: 8px;
}

.movie-carousel::-webkit-scrollbar-thumb {
  background-color: #ff0000;
  border-radius: 4px;
}

.movie-item {
  flex: 0 0 auto;
  width: 150px;
  text-align: center;
}

.movie-item img {
  width: 100%;
  border-radius: 8px;
  box-shadow: 0 0 10px rgba(255, 0, 0, 0.5);
}

.movie-title {
  font-size: 14px;
  margin-top: 8px;
}
</style>

