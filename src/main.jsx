// Mengimpor React dan ReactDOM untuk merender aplikasi ke layar
import React from 'react';
import ReactDOM from 'react-dom/client';

// Mengimpor komponen utama aplikasi 
import App from './App.jsx';

// Mengimpor file CSS 
import './index.css';

// Mengimpor Asisten Pintar (QueryClient) dan Pembungkusnya (QueryClientProvider)
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

// Membuat satu Asisten Pintar baru untuk menjaga memori aplikasi 
const queryClient = new QueryClient();

// Merender aplikasi ke dalam elemen HTML yang memiliki id="root"
ReactDOM.createRoot(document.getElementById('root')).render(
  // StrictMode membantu mencari error tersembunyi selama masa development
  <React.StrictMode>
    {/* Membungkus seluruh aplikasi agar bisa menggunakan layanan si Asisten Pintar */}
    <QueryClientProvider client={queryClient}>
      <App />
    </QueryClientProvider>
  </React.StrictMode>
);
