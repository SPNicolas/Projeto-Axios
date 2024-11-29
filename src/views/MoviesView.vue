<script setup>
  import { ref, onMounted } from 'vue';
  import api from '@/plugins/axios';
  import Loading from 'vue-loading-overlay';
  import { useGenreStore } from '@/stores/genre';

  const genreStore = useGenreStore();

  const isLoading = ref(false);
  const genres = ref([]);

  onMounted(async () => {
    isLoading.value = true;
    await genreStore.getAllGenres('movie');
    isLoading.value = false;
  });

  const movies = ref([]);

  const listMovies = async (genreId) => {
    isLoading.value = true;
    const response = await api.get('discover/movie', {
      params: {
        with_genres: genreId,
        language: 'pt-BR'
      }
    });
    movies.value = response.data.results;
    isLoading.value = false;
  };

  const formatDate = (date) => new Date(date).toLocaleDateString('pt-BR');

  const getGenreName = (id) => genres.value.find((genre) => genre.id === id).name;
</script>

<template>
  <div class="container">
    
    <ul class="genre-list">
      <li
        v-for="genre in genreStore.genres"
        :key="genre.id"
        @click="listMovies(genre.id)"
        class="genre-item"
      >
        {{ genre.name }}
      </li>
    </ul>

    <loading v-model:active="isLoading" is-full-page />
    
    <div class="movie-list">
      <div v-for="movie in movies" :key="movie.id" class="movie-card">
        <img
          :src="`https://image.tmdb.org/t/p/w500${movie.poster_path}`"
          :alt="movie.title"
        />
        <p class="movie-genres">
          <span
            v-for="genre_id in movie.genre_ids"
            :key="genre_id"
            @click="listMovies(genre_id)"
          >
            {{ genreStore.getGenreName(genre_id) }}
          </span>
        </p>
        <p class="movie-release-date">{{ formatDate(movie.release_date) }}</p>
      </div>
    </div>
  </div>
</template>

<style scoped>





/* Garantir que o container ocupe 100% da altura */
.container {
  background-color: rgb(0, 0, 0);
  display: flex;
  flex-direction: column; /* Colocar header e movie-list um abaixo do outro */

  padding: 0;
  margin: 0;
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

/* Estilo dos itens de gêneros */
.genre-item {
  background-color: #FF0000; /* Vermelho do YouTube */
  border-radius: 0.5rem;
  padding: 0.5rem 1rem;
  color: #ffffff;
  font-weight: bold;
}

.genre-item:hover {
  cursor: pointer;
  background-color: #331515; /* Vermelho mais escuro no hover */
  box-shadow: 0 0 0.5rem #FF0000;
  transition: 0.5s;
}

/* Estilo para a lista de filmes */
.movie-list {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  margin: 0 10px 35px 10px; /* Remover margem extra nas laterais */
  flex-grow: 1; 
  justify-content: center; 

}


.movie-card {
  width: 15rem;
  height: 30rem;
  border-radius: 0.5rem;
  overflow: hidden;
  box-shadow: 0 0 0.5rem #ffdada;
  background-color: #242323;
  transition: transform 0.3s ease-in-out; 
  margin: 20px;
}


.movie-card:hover {
  transform: scale(1.05);
}

.movie-card img {
  width: 220px;
  height: 300px;
  border-radius: 0.5rem;
  box-shadow: 0 0 0.9rem #e92626;
  margin: 10px;

}



.movie-details {
  padding: 0 0.5rem;
  color: #fff;
}

.movie-title {
  font-size: 1.1rem;
  font-weight: bold;
  line-height: 1.3rem;
  height: 3.2rem;
  color: #ffffff;
}

/* Ajustes para a parte dos gêneros */
.movie-genres {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  align-items: flex-start;
  justify-content: center;
  gap: 0.8rem;
}

.movie-genres span {
  background-color: #FF0000; /* Vermelho do YouTube */
  border-radius: 0.5rem;
  padding: 0.2rem 0.5rem;
  color: #fff;
  font-size: 0.8rem;
  font-weight: bold;
}

.movie-genres span:hover {
  cursor: pointer;
  background-color: #CC0000; /* Vermelho mais escuro no hover */
  box-shadow: 0 0 0.5rem #FF0000;
}

.movie-release-date {
  color: #ffffff;
  text-align: center;
}
</style>
