<script setup>
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import api from '@/plugins/axios';

const route = useRoute();
const movie = ref({});
const cast = ref([]); // Lista de atores
const trailerUrl = ref(''); // URL do trailer

// Função para formatar a data
const formatDate = (date) => new Date(date).toLocaleDateString('pt-BR');

// Função para buscar os detalhes do filme, elenco e trailer
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
  cast.value = castResponse.data.cast.slice(0, 10); // Limitar a exibição aos 10 principais atores

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
  <div class="movie-details-container">
    <!-- Imagem do Filme -->
    <div class="movie-poster">
      <img :src="`https://image.tmdb.org/t/p/w500${movie.poster_path}`" alt="Movie Poster" />
    </div>

    <!-- Informações do Filme -->
    <div class="movie-info">
      <h1 class="movie-title">{{ movie.title }}</h1>
      <p class="movie-description">{{ movie.overview }}</p>
      <p class="movie-release-date">Lançamento: {{ formatDate(movie.release_date) }}</p>
      
      <!-- Botão Assistir Trailer -->
      <div v-if="trailerUrl" class="trailer-button-container">
        <a :href="trailerUrl" target="_blank" class="trailer-button">Assistir Trailer</a>
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
.movie-details-container {
  display: flex;
  padding: 20px;
  height: auto;
  color: #ffffff;
}

.movie-poster img {
  width: 500px;
  height: auto;
  border-radius: 8px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.9);
  margin-bottom: 20px;
}

.movie-info {
  margin: 40px;
}

.movie-title {
  font-size: 2.8rem;
  font-weight: bold;
  color: #e50914;
  margin-bottom: 1rem;
}

.movie-description {
  font-size: 1.3rem;
  line-height: 1.8rem;
  margin-bottom: 1rem;
  color: #dcdcdc;
}

.movie-release-date {
  font-size: 1rem;
  color: #8c8c8c;
  margin-top: 1rem;
}

.trailer-button-container {
  margin-top: 20px;
}

.trailer-button {
  display: inline-block;
  padding: 10px 20px;
  background-color: #e50914;
  color: #ffffff;
  text-decoration: none;
  font-size: 1.2rem;
  font-weight: bold;
  border-radius: 5px;
  transition: background-color 0.3s ease;
}

.trailer-button:hover {
  background-color: #f40612;
}

.movie-cast {
  display: block;
  margin: 2rem;
  text-align: center;
}

.cast-title {
  font-size: 2.2rem;
  font-weight: bold;
  color: #e50914;
  margin-bottom: 1.5rem;
  text-transform: uppercase;
}

.cast-list {
  display: flex;
  flex-wrap: wrap;
  gap: 1.5rem;
  justify-content: center;
}

.cast-item {
  text-align: center;
  width: 120px;
  color: #ffffff;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.cast-item:hover {
  transform: scale(1.05);
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.8);
}

.cast-image {
  width: 100px;
  height: 150px;
  border-radius: 8px;
  margin-bottom: 0.5rem;
  object-fit: cover;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.8);
}

.cast-name {
  font-size: 1.1rem;
  font-weight: bold;
  color: #e50914;
  margin-top: 0.5rem;
}

.cast-character {
  font-size: 0.9rem;
  color: #dcdcdc;
}

@media (max-width: 768px) {
  .movie-title {
    font-size: 2rem;
  }

  .movie-description {
    font-size: 1rem;
  }

  .cast-item {
    width: 100px;
  }

  .cast-image {
    width: 80px;
    height: 120px;
  }

  .cast-title {
    font-size: 1.8rem;
  }
}
</style>
