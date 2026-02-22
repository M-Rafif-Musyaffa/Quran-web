import axios from 'axios';

// Kita ganti pakai server EQuran.id yang jauh lebih besar dan stabil
const doaApi = axios.create({
  baseURL: 'https://equran.id/api',
  timeout: 10000,
});

export default doaApi;