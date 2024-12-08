<template>
    <div class="serie-details-page">
      <h1 class="serie-title">{{ serieDetails.name }}</h1>
  
      <div class="serie-info">
        <p><strong>Temporadas:</strong> {{ serieDetails.number_of_seasons }}</p>
        <p><strong>Personagens:</strong> {{ serieDetails.characters.length }}</p>
      </div>
  
      <div class="characters-list">
        <h2>Personagens</h2>
        <ul>
  <li v-for="character in serieDetails.characters" :key="character.id">
    {{ character.name }}
  </li>
</ul>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref, onMounted } from 'vue';
  import { useRoute } from 'vue-router';
  import api from '@/plugins/axios';
  
  const route = useRoute();
  const serieId = route.params.id;
  
  const serieDetails = ref({
    name: '',
    number_of_seasons: 0,
    characters: [],
  });
  
  onMounted(async () => {
  // Fetch series details
  const serieResponse = await api.get(`/tv/${serieId}`, {
    params: {
      language: 'pt-BR',
    },
  });

  serieDetails.value.name = serieResponse.data.name;
  serieDetails.value.number_of_seasons = serieResponse.data.number_of_seasons;

  // Fetch characters (credits)
  const creditsResponse = await api.get(`/tv/${serieId}/credits`, {
    params: {
      language: 'pt-BR',
    },
  });

  // Mapear os nomes dos personagens
  serieDetails.value.characters = creditsResponse.data.cast.map(castMember => ({
    id: castMember.id,
    name: castMember.character, // Nome do personagem
  }));
});
  </script>
  
  <style scoped>
  .serie-details-page {
    padding: 20px;
    background-color: #111;
    color: #fff;
    font-family: Arial, sans-serif;
  }
  
  .serie-title {
    font-size: 2.5rem;
    text-align: center;
    margin-bottom: 2rem;
    color: #e50914;
  }
  
  .serie-info {
    font-size: 1.2rem;
    margin-bottom: 2rem;
    text-align: center;
  }
  
  .characters-list {
    text-align: center;
  }
  
  .characters-list h2 {
    font-size: 2rem;
    margin-bottom: 1rem;
    color: #f5c518;
  }
  
  .characters-list ul {
    list-style: none;
    padding: 0;
  }
  
  .characters-list li {
    font-size: 1rem;
    margin: 0.5rem 0;
    color: #fff;
  }
  </style>
  