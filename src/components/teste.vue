<script setup>
  import { ref, onMounted } from 'vue';
  import api from '../plugins/axios';

  const moviesGenres = ref([]);
  const TVGenres = ref([]);
  const isMenuOpen = ref(false); // Controle do estado do menu

  onMounted(async () => {
    let response = await api.get('genre/movie/list?language=pt-BR');
    moviesGenres.value = response.data.genres;
    response = await api.get('genre/tv/list?language=pt-BR');
    TVGenres.value = response.data.genres;
  });

  const toggleMenu = () => {
    isMenuOpen.value = !isMenuOpen.value;
  };
</script>

<template>
  <header>
    <div class="nav-container">
      <button class="menu-toggle" @click="toggleMenu">☰</button>
      <nav :class="{ open: isMenuOpen }">
        <router-link to="/">Home</router-link>
        <router-link to="/filmes">Filmes</router-link>
        <router-link to="/tv">Programas de TV</router-link>
        <router-link to="/spiderMan">Homem-Aranha</router-link>
      </nav>
    </div>
  </header>
  <main>
    <router-view />
  </main>
</template>

<style scoped>
/* Header principal */
header {
  background-color: #000;
  color: #fff;
  padding: 0.5rem 1rem;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
}

.nav-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
}



.menu-toggle {
  display: none;
  background: none;
  border: none;
  color: #fff;
  font-size: 1.5rem;
  cursor: pointer;
}

nav {
  display: flex;
  align-items: center;
  gap: 2rem;
  transition: max-height 0.3s ease-in-out;
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

/* Estilo responsivo */
@media (max-width: 425px) {
  .menu-toggle {
    display: block;
  }

  nav {
    height: 400px;
    flex-direction: column;
    position: absolute;
    top: 8%;
    left: 0;
    width: 100%;
    background-color: #000;
    overflow: hidden;
    max-height: 0;
    z-index: 99; /* Coloca o menu acima de outros elementos */
  }

  nav.open {
    max-height: 350px; /* Altura máxima do menu quando aberto */
  }

  nav a {
    padding: 1rem;
    text-align: center;
    border-top: 1px solid #333;
  }
}

</style>
