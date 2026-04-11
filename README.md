# 🕌 Ruang Ibadah - Aplikasi Edukasi & Panduan Islami Pintar

Aplikasi web Islami modern yang dirancang untuk memberikan ketenangan dan kemudahan dalam beribadah. Dibangun dengan fokus pada *User Experience* (UX) tingkat tinggi, antarmuka yang menenangkan, dan fitur pintar yang berjalan sepenuhnya di sisi klien (*Offline-first* & *Privacy-focused*).

[![Live Demo](https://img.shields.io/badge/Live_Demo-Vercel-success?style=for-the-badge&logo=vercel)](https://ruangibadah.vercel.app/) 
[![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)](#)
[![TailwindCSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](#)

---

## ✨ Fitur Unggulan

### 🏡 Dashboard Cerdas & Interaktif
Beranda yang hidup dan memahami pengguna. Menampilkan sapaan dinamis berdasarkan waktu (Pagi/Siang/Malam), jadwal sholat *real-time*, dan **Comfort Mode** (penyesuaian UI dan pesan motivasi berdasarkan suasana hati/mood pengguna seperti lelah, sakit, atau sedang siklus haid).

### 📖 Ensiklopedia Mini (Kamus Islam)
Kamus pintar untuk mempelajari istilah-istilah fiqh, aqidah, dan akhlaq.
- **Pencarian Cerdas Anti-Crash:** Mencari kata berdasarkan istilah, arti, contoh, maupun kategori dengan sangat cepat.
- **Relasi Data (Tags):** Menampilkan lencana (badge) yang menghubungkan satu istilah dengan istilah terkait lainnya secara dinamis.

### 🎯 Perencana Khatam (Smart Target Planner)
Bukan sekadar kalkulator biasa. Sistem akan memecah target khatam Al-Quran pengguna menjadi porsi bacaan yang sangat logis dan ringan (misal: "Baca 4 halaman setiap selesai sholat").
- **Visual Dashboard:** Dilengkapi dengan *Progress Bar* persentase dan papan ceklis (grid) interaktif per hari.
- **Persistent Memory:** Progres bacaan disimpan dengan aman di `localStorage` browser sehingga tidak hilang meski aplikasi ditutup.

### 🤲 Kumpulan Doa & Dzikir Lokal (Offline 100%)
Dilengkapi dengan data doa dan dzikir harian yang dimuat langsung dari memori lokal (tanpa jeda *loading* API).
- **Intent-Search (Membaca Niat):** Pengguna bisa mencari doa berdasarkan "situasi" atau "perasaan" (misal: ketik "skripsi", "galau", atau "tidur", dan aplikasi akan menyodorkan doa yang tepat berkat sistem *Tags Mapping* rahasia).
- **Smart Navigation:** Antarmuka detail doa dengan fitur geser (*swipe*) di layar HP untuk berpindah doa, lengkap dengan teks Arab, Latin, Arti, dan kotak khusus untuk Riwayat Hadits.

### 🕌 Panduan Sholat Dinamis
Halaman edukasi tata cara sholat yang adaptif. Niat sholat (Arab, Latin, Arti) serta urutan bacaan (seperti penambahan Doa Qunut di waktu Subuh) akan berubah secara otomatis mengikuti jenis sholat yang dipilih.

### 📖 Al-Quran Digital
Jelajahi 114 surah dengan antarmuka yang bersih dan jernih. Dilengkapi dengan fitur **Bookmark Pintar** untuk menyimpan posisi ayat terakhir yang dibaca, yang langsung terhubung dan ditampilkan di Beranda.

---

## 🛠️ Teknologi & Arsitektur

Aplikasi ini dibangun menggunakan *stack* modern tanpa bergantung pada *database backend* eksternal untuk menjaga privasi pengguna:
- **Frontend Framework:** [React.js](https://reactjs.org/) (via Vite)
- **Styling:** [Tailwind CSS](https://tailwindcss.com/)
- **Routing:** React Router DOM
- **State Management:** Zustand & Context API
- **Data Storage:** `localStorage` API (untuk *Tracking* Khatam, *Bookmark*, & Pengaturan Mood)
- **Deployment:** Vercel

---

## 🚀 Cara Menjalankan di Komputer Lokal

Jika Anda ingin mencoba menjalankan atau ikut mengembangkan aplikasi ini, ikuti langkah-langkah berikut:

1. **Clone repository ini:**
   ```bash
   git clone [https://github.com/M-Rafif-Musyaffa/Quran-web.git]
2. **Masuk ke folder proyek:**
   ```bash
   cd Quran-web
3. **Install semua dependensi:**
   ```bash
   npm install
4. **Jalankan server pengembangan (Localhost):**
   ```bash
   npm run dev 
