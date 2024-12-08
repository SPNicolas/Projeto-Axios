<script setup>
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import api from '@/plugins/axios';

const route = useRoute();
const movie = ref({});
const cast = ref([]); // Adicionando elenco
const trailerUrl = ref('');

onMounted(async () => {
  const movieId = route.params.id;

  // Buscando detalhes do filme
  const movieResponse = await api.get(`movie/${movieId}`, {
    params: {
      language: 'pt-BR',
    },
  });
  movie.value = movieResponse.data;

  // Buscando elenco do filme
  const castResponse = await api.get(`movie/${movieId}/credits`, {
    params: {
      language: 'pt-BR',
    },
  });
  cast.value = castResponse.data.cast.slice(0, 10); // Limitar a 10 atores principais

  // Buscando trailer do filme
  const videosResponse = await api.get(`movie/${movieId}/videos`, {
    params: {
      language: 'pt-BR',
    },
  });
  const trailer = videosResponse.data.results.find((video) => video.type === 'Trailer' && video.site === 'YouTube');
  if (trailer) {
    trailerUrl.value = `https://www.youtube.com/watch?v=${trailer.key}`;
  }
});
</script>
<template>
  <div class="movie-page" :style="{ backgroundImage: `url(https://image.tmdb.org/t/p/original${movie.backdrop_path})` }">
    <div class="movie-overlay">
      <div class="movie-content">
        <!-- Título -->
        <h1 class="movie-title">{{ movie.title }}</h1>
        <!-- Subtítulo -->
        <p class="movie-subtitle">Um amuleto mudará a vida dela para sempre.</p>
        <!-- Destaque -->
        <p class="movie-highlight">🔥 Brasil: Top 5 de hoje</p>
        <!-- Descrição -->
        <p class="movie-description">
          {{ movie.overview }}
        </p>
        <!-- Botões -->
        <div class="movie-buttons">
          <a v-if="trailerUrl" :href="trailerUrl" target="_blank" class="btn-watch">▶ Assistir Trailer</a>
          <button class="btn-more">Mais informações</button>
        </div>
      </div>
    </div>
  </div>

  <!-- Elenco -->
  <div class="movie-cast">
    <h2 class="cast-title">Elenco</h2>
    <div class="cast-list">
      <div class="cast-item" v-for="actor in cast" :key="actor.id">
        <img
          :src="actor.profile_path ? `https://image.tmdb.org/t/p/w200${actor.profile_path}` : '/default-avatar.png'"
          :alt="actor.name"
          class="cast-image"
        />
        <p class="cast-name">{{ actor.name }}</p>
        <p class="cast-character">como {{ actor.character }}</p>
      </div>
    </div>
  </div>
</template>
<style scoped>
/* Estilo principal */
.movie-page {
  position: relative;
  height: 100vh;
  background-size: cover;
  background-position: center;
  color: #ffffff;
}

.movie-overlay {
  position: absolute;
  inset: 0;
  background: rgba(0, 0, 0, 0.6); /* Sobreposição escura */
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px;
}

.movie-content {
  max-width: 700px;
  text-align: center;
}

.movie-title {
  font-size: 3.5rem;
  font-weight: bold;
  color: #e50914;
  margin-bottom: 1rem;
}

.movie-subtitle {
  font-size: 1.5rem;
  color: #ffffff;
  margin-bottom: 1rem;
}

.movie-highlight {
  font-size: 1.2rem;
  font-weight: bold;
  color: #f5c518;
  margin-bottom: 1.5rem;
}

.movie-description {
  font-size: 1.1rem;
  line-height: 1.8;
  color: #dcdcdc;
  margin-bottom: 2rem;
}

.movie-buttons {
  display: flex;
  gap: 10px;
  justify-content: center;
}

.btn-watch {
  padding: 10px 20px;
  background-color: #e50914;
  color: #ffffff;
  text-decoration: none;
  font-size: 1.2rem;
  font-weight: bold;
  border-radius: 5px;
  transition: background-color 0.3s ease;
}

.btn-watch:hover {
  background-color: #f40612;
}

.btn-more {
  padding: 10px 20px;
  background-color: #333333;
  color: #ffffff;
  font-size: 1.2rem;
  font-weight: bold;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.btn-more:hover {
  background-color: #444444;
}

/* Elenco */
.movie-cast {
  padding: 20px;
  text-align: center;
  background-color: #111111;
}

.cast-title {
  font-size: 2rem;
  font-weight: bold;
  color: #e50914;
  margin-bottom: 20px;
}

.cast-list {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 20px;
}

.cast-item {
  text-align: center;
  width: 120px;
  color: #ffffff;
}

.cast-image {
  width: 100px;
  height: 150px;
  border-radius: 8px;
  margin-bottom: 0.5rem;
  object-fit: cover;
}

.cast-name {
  font-size: 1rem;
  font-weight: bold;
}

.cast-character {
  font-size: 0.9rem;
  color: #dcdcdc;
}
</style>
