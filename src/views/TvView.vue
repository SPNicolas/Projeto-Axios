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


const formatDate = (date) => new Date(date).toLocaleDateString('pt-BR');


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


onMounted(async () => {
  try {
    isLoading.value = true;
    await genreStore.getAllGenres('tv');
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


    <loading v-model:active="isLoading" is-full-page />


    <div v-if="errorMessage" class="error-message">
      {{ errorMessage }}
    </div>

>
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


    <div v-if="!isLoading && !tvShows.length && !errorMessage" class="no-tv">
      Nenhum programa de TV encontrado.
    </div>
  </div>
</template>

<style scoped>
@import "../assets/sass/_tvPrograms.scss";
</style>
