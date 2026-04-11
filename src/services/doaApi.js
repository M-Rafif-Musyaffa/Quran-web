import axios from 'axios';

// Server EQuran.id 
const doaApi = axios.create({
  baseURL: 'https://equran.id/api',
  timeout: 10000,
});

export default doaApi;
