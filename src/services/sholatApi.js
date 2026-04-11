import axios from 'axios';

//  API Jadwal Sholat
const sholatApi = axios.create({
  //server pembuat jadwal sholat Indonesia
  baseURL: 'https://api.myquran.com/v2/sholat',
  
  // Kalau server lambat dan tidak membalas dalam 10 detik, batalkan (error)
  timeout: 10000,
});

export default sholatApi;
