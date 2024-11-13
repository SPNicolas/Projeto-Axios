import axios from 'axios';

const api = axios.create({
  baseURL: 'https://api.themoviedb.org/3/',
  headers: {
    Authorization: `Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIyOWE3YTBhZDVkNGQ4MWU4YjkxODE4NzgyMTJjMWEzYyIsIm5iZiI6MTczMTQ5NzU1My45NzQwOTI3LCJzdWIiOiI2NzMyNWEwNzY4OTVmMzgyMmU0NjBlN2QiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.lAUafzNfkYR3wuRJ4cvChW_SWwAwpR_sCuAkixS7Ack`,
  },
});

export default api;
