<script setup>
  import { ref, onMounted } from 'vue';
  import axios from 'axios';

  const moviesGenres = ref([]);
  const TVGenres = ref([]);

  onMounted(async () => {
    let response = await axios.get(
      'https://api.themoviedb.org/3/genre/movie/list?language=pt-BR',
      {
        headers: {
          Authorization: `Bearer AQUI_COLOCAR O TOKEN DE LEITURA DA API`,
        },
      },
    );
    moviesGenres.value = response.data.genres;
    response = await axios.get(
      'https://api.themoviedb.org/3/genre/tv/list?language=pt-BR',
      {
        headers: {
          Authorization: `Bearer AQUI_COLOCAR O TOKEN DE LEITURA DA API`,
        },
      },
    );
    TVGenres.value = response.data.genres;
  });
</script>

<template>
  <h1>Gêneros de filmes</h1>
  <ul>
    <li v-for="genre in moviesGenres" :key="genre.id">
      {{ genre.name }} 
    </li>
  </ul>
  <hr />
  <h1>Gêneros de programas de TV</h1>
  <ul>
    <li v-for="genre in TVGenres" :key="genre.id">
      {{ genre.name }}
    </li>
  </ul>
</template>
