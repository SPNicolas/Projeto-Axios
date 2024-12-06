<script setup>
  import { ref, onMounted } from 'vue';
  import api from '../plugins/axios';

  const moviesGenres = ref([]);
  const TVGenres = ref([]);

  onMounted(async () => {
    let response = await api.get('genre/movie/list?language=pt-BR');
    moviesGenres.value = response.data.genres;
    response = await api.get('genre/tv/list?language=pt-BR');
    TVGenres.value = response.data.genres;
  });
</script>

<template>
  <header>
    <nav>
      <router-link to="/">Home</router-link>
      <router-link to="/filmes">Filmes</router-link>
      <router-link to="/tv">Programas de TV</router-link>
      <router-link to="/spiderMan">Homem-Aranha</router-link>
    </nav>
  </header>
  <main>
    <router-view />
  </main>
</template>

<style scoped>




header {
  height: 4rem;
  display: flex;
  background-color: #000; 
  color: #fff;
  font-size: 1.2rem;
  align-items: center;
  justify-content: space-between;
  padding: 0 2rem;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2); 
  border: 1px solid white;
}


nav {
  display: flex;
  align-items: center;
  column-gap: 2rem;
}

nav a {
  text-decoration: none;
  color: #fff; 
  font-weight: 600; 
  letter-spacing: 1px; 
}

nav a:hover {
  color: #FF9900;
  transition: color 0.2s ease-in-out; 
}

nav a:active {
  color: #FF6600; 
}


</style>
