import { useState } from 'react';
import { dataAsmaulHusna } from '../data/asmaulHusna';

export default function AsmaulHusna() {
  const [kataKunci, setKataKunci] = useState('');

  // Fitur Saringan (Pencarian)
  const hasilCari = dataAsmaulHusna.filter((item) => 
    item.latin.toLowerCase().includes(kataKunci.toLowerCase()) || 
    item.arti.toLowerCase().includes(kataKunci.toLowerCase())
  );

  return (
    <div className="max-w-6xl mx-auto py-4">
      
      {/* 🌸 HEADER CUTE & MANIS */}
      <div className="bg-emerald-600 text-white rounded-3xl p-8 md:p-10 mb-10 text-center shadow-lg bg-gradient-to-br from-emerald-500 to-emerald-700 dark:from-slate-800 dark:to-slate-900 border dark:border-slate-700 relative overflow-hidden">
        
        {/* Dekorasi Awan, Bintang & Burung Transparan */}
        <div className="absolute top-4 left-6 opacity-20 text-6xl md:text-7xl animate-pulse">☁️</div>
        <div className="absolute bottom-6 right-10 opacity-20 text-5xl animate-pulse" style={{ animationDelay: '0.5s' }}>✨</div>
        <div className="absolute top-8 right-24 opacity-10 text-4xl animate-bounce" style={{ animationDuration: '3s' }}>🕊️</div>

        <div className="relative z-10">
          <p className="text-emerald-100 dark:text-emerald-400 font-medium tracking-widest uppercase text-xs mb-2">
            Mengenal Sang Pencipta 🌸
          </p>
          <h1 className="text-3xl md:text-5xl font-bold mb-3 drop-shadow-sm">
            ✨ Asmaul Husna
          </h1>
          <p className="text-emerald-50 dark:text-slate-300 text-lg md:text-xl font-medium mb-8">
            99 Nama Allah Yang Maha Indah & Sempurna 💖
          </p>

          {/* Kolom Pencarian Ramah */}
          <div className="relative w-full max-w-xl mx-auto">
            <input
              type="text"
              placeholder="Cari nama atau arti (misal: Rahman)... 🧐🔍"
              value={kataKunci}
              onChange={(e) => setKataKunci(e.target.value)}
              className="w-full pl-6 pr-12 py-4 bg-white/95 dark:bg-slate-800/95 text-slate-800 dark:text-white border-0 rounded-full focus:outline-none focus:ring-4 focus:ring-emerald-300/50 shadow-inner placeholder-slate-400 font-medium transition-all text-lg"
            />
            {kataKunci ? (
              <button 
                onClick={() => setKataKunci('')}
                className="absolute right-5 top-4 text-slate-400 hover:text-red-400 transition text-xl"
              >
                ✖️
              </button>
            ) : (
              <span className="absolute right-5 top-4 text-slate-400 text-xl">✨</span>
            )}
          </div>
        </div>
      </div>

      {/* DAFTAR GRID KARTU */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 md:gap-6 pb-10">
        {hasilCari.length === 0 ? (
          /* Pesan Kalau Kata Tidak Ketemu (Cute Version) */
          <div className="col-span-full text-center py-16 bg-white dark:bg-slate-800 rounded-3xl border border-dashed border-slate-300 dark:border-slate-700">
            <span className="text-6xl block mb-4 animate-bounce">🥺</span>
            <p className="text-xl text-slate-600 dark:text-slate-300 font-bold mb-2">
              Waduh, nama "{kataKunci}" tidak ditemukan...
            </p>
            <p className="text-slate-500 dark:text-slate-400">
              Coba ketik kata kunci yang lain ya! 🌱
            </p>
          </div>
        ) : (
          hasilCari.map((item) => (
            <div 
              key={item.id} 
              className="bg-white dark:bg-slate-800 rounded-3xl p-5 shadow-sm border border-slate-100 dark:border-slate-700 hover:shadow-emerald-500/20 hover:border-emerald-400 dark:hover:border-emerald-500 transition duration-300 flex flex-col items-center text-center group relative overflow-hidden hover:-translate-y-1"
            >
              {/* Efek Garis Hijau saat di-hover */}
              <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-emerald-400 scale-y-0 group-hover:scale-y-100 transition-transform origin-bottom duration-300 rounded-r-full"></div>

              {/* Angka di Kiri Atas */}
              <div className="absolute top-3 left-4 text-slate-300 dark:text-slate-600 font-bold text-lg group-hover:text-emerald-300 dark:group-hover:text-slate-500 transition">
                {item.id}
              </div>
              
              {/* Ikon Bintang Muncul Saat Hover di Kanan Atas */}
              <div className="absolute top-3 right-4 opacity-0 group-hover:opacity-100 text-emerald-400 transition-opacity animate-pulse text-lg">
                ✨
              </div>

              {/* Teks Arab */}
              <div 
                className="text-4xl md:text-5xl font-arab text-emerald-600 dark:text-emerald-400 mt-5 mb-4 py-2 drop-shadow-sm group-hover:scale-110 transition-transform duration-300"
                style={{ lineHeight: '1.5' }}
                dir="rtl"
              >
                {item.arab}
              </div>
              
              {/* Pemisah Kecil */}
              <div className="w-8 h-1 bg-emerald-100 dark:bg-slate-600 rounded-full mb-3 group-hover:bg-emerald-400 transition-colors"></div>

              <h3 className="font-bold text-slate-800 dark:text-slate-100 text-lg mb-1 group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition">
                {item.latin}
              </h3>
              <p className="text-xs md:text-sm text-slate-500 dark:text-slate-400 font-medium px-2">
                {item.arti}
              </p>
            </div>
          ))
        )}
      </div>

    </div>
  );
}