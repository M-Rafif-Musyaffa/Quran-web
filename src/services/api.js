import axios from 'axios';

// Membuat "telepon khusus" yang nomor awalnya (baseURL) sudah disave
const api = axios.create({
  // Ini adalah alamat utama server pembuat data Al-Quran
  baseURL: 'https://equran.id/api/v2',
  
  // Kalau server tidak membalas dalam 10 detik (10000 ms), tutup teleponnya (error)
  timeout: 10000,
});

export default api;