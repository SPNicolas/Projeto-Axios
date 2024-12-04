<script setup>
import { ref, onMounted } from 'vue';
import api from '@/plugins/axios';
import Loading from 'vue-loading-overlay';
import { useGenreStore } from '@/stores/genre';

const genreStore = useGenreStore();

const isLoading = ref(false);
const genres = ref([]);
const tvShows = ref([]);
const errorMessage = ref(null);

// Função para formatar datas em pt-BR
const formatDate = (date) => new Date(date).toLocaleDateString('pt-BR');

// Buscar programas de TV por gênero
const listTvShows = async (genreId) => {
  try {
    isLoading.value = true;
    errorMessage.value = null;

    const response = await api.get('discover/tv', {
      params: {
        with_genres: genreId,
        language: 'pt-BR',
      },
    });

    tvShows.value = response.data.results;
  } catch (err) {
    console.error('Erro ao buscar programas de TV:', err);
    errorMessage.value = 'Não foi possível carregar os programas de TV.';
  } finally {
    isLoading.value = false;
  }
};

// Carregamento inicial de gêneros
onMounted(async () => {
  try {
    isLoading.value = true;
    await genreStore.getAllGenres('tv'); // Obter gêneros para programas de TV
  } catch (err) {
    console.error('Erro ao carregar gêneros:', err);
    errorMessage.value = 'Não foi possível carregar os gêneros.';
  } finally {
    isLoading.value = false;
  }
});
</script>

<template>
  <div class="container">
    <!-- Lista de gêneros -->
    <ul class="genre-list">
      <li
        v-for="genre in genreStore.genres"
        :key="genre.id"
        @click="listTvShows(genre.id)"
        class="genre-item"
      >
        {{ genre.name }}
      </li>
    </ul>

    <!-- Indicador de carregamento -->
    <loading v-model:active="isLoading" is-full-page />

    <!-- Mensagem de erro -->
    <div v-if="errorMessage" class="error-message">
      {{ errorMessage }}
    </div>

    <!-- Lista de programas de TV -->
    <div v-if="!errorMessage && tvShows.length" class="tv-list">
      <div v-for="tv in tvShows" :key="tv.id" class="tv-card">
        <img
          :src="`https://image.tmdb.org/t/p/w500${tv.poster_path}`"
          :alt="tv.name"
        />
        <div class="tv-details">
          <p class="tv-title">{{ tv.name }}</p>
          <p class="tv-original-name">Título Original: {{ tv.original_name }}</p>
          <p class="tv-release-date">Estreia: {{ formatDate(tv.first_air_date) }}</p>
        </div>
      </div>
    </div>

    <!-- Mensagem quando não há programas de TV -->
    <div v-if="!isLoading && !tvShows.length && !errorMessage" class="no-tv">
      Nenhum programa de TV encontrado.
    </div>
  </div>
</template>

<style scoped>
/* Estilo para o TvView */
.container {
  background-color: black;
  color: white;
  padding: 20px;
  text-align: center;
}

.genre-list {
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  gap: 1rem;
  list-style: none;
  padding: 0;
  margin: 30px;
}

.genre-item {
  background-color: #ff0000;
  border-radius: 0.5rem;
  padding: 0.5rem 1rem;
  color: white;
  font-weight: bold;
  cursor: pointer;
}

.genre-item:hover {
  background-color: #cc0000;
  transition: 0.3s;
}

.tv-list {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  justify-content: center;
}

.tv-card {
  background-color: #242323;
  width: 200px;
  border-radius: 8px;
  box-shadow: 0 0 10px rgba(255, 0, 0, 0.5);
  text-align: center;
  overflow: hidden;
  transition: transform 0.3s;
}

.tv-card:hover {
  transform: scale(1.05);
}

.tv-card img {
  width: 100%;
  height: 300px;
  object-fit: cover;
}

.tv-details {
  padding: 10px;
}

.tv-title {
  font-weight: bold;
  margin-bottom: 5px;
}

.tv-original-name,
.tv-release-date {
  font-size: 0.9rem;
  color: #ccc;
}

.no-tv {
  margin-top: 20px;
  color: #ccc;
}

.error-message {
  color: red;
  margin-top: 20px;
}
</style>
