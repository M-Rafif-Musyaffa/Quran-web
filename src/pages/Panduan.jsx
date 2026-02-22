import { useState } from 'react';
// Mengimpor database lokal Wudhu & Sholat milikmu
import { dataWudhu, dataSholat } from '../data/panduanIbadah';
// Mengimpor database Haji & Umrah yang baru
import { dataHajiUmrah } from '../data/dataHajiUmrah';

export default function Panduan() {
  // STATE: Tab Utama
  const [tabAktif, setTabAktif] = useState('wudhu');
  // STATE: Sub-Tab khusus Haji & Umrah
  const [tipeHaji, setTipeHaji] = useState('umrah');

  // Variabel penentu data mana yang akan dirender (khusus Wudhu & Sholat)
  const dataTampil = tabAktif === 'wudhu' ? dataWudhu : dataSholat;

  return (
    <div className="max-w-5xl mx-auto py-4">
      
      {/* 🌸 HEADER CUTE & MANIS */}
      <div className="bg-emerald-600 text-white rounded-3xl p-8 md:p-10 mb-8 text-center shadow-lg bg-gradient-to-br from-emerald-500 to-emerald-700 dark:from-slate-800 dark:to-slate-900 border dark:border-slate-700 relative overflow-hidden">
        {/* Dekorasi Awan, Bintang & Masjid */}
        <div className="absolute top-4 left-6 opacity-20 text-6xl md:text-7xl animate-pulse">☁️</div>
        <div className="absolute bottom-6 right-10 opacity-20 text-5xl animate-pulse" style={{ animationDelay: '0.5s' }}>✨</div>
        <div className="absolute top-8 right-24 opacity-10 text-4xl animate-bounce" style={{ animationDuration: '3s' }}>🕌</div>

        <div className="relative z-10">
          <p className="text-emerald-100 dark:text-emerald-400 font-medium tracking-widest uppercase text-xs mb-2">
            Pusat Edukasi 🌸
          </p>
          <h1 className="text-3xl md:text-5xl font-bold mb-3 drop-shadow-sm">
            Panduan Ibadah
          </h1>
          <p className="text-emerald-50 dark:text-slate-300 text-lg md:text-xl font-medium">
            Langkah-langkah tata cara ibadah yang benar. ✨
          </p>
        </div>
      </div>

      {/* SISTEM TAB (Tombol Pemilih) */}
      <div className="flex flex-wrap justify-center mb-10">
        <div className="bg-slate-200/50 dark:bg-slate-800 p-1.5 rounded-3xl flex flex-wrap justify-center gap-2 border border-slate-100 dark:border-slate-700">
          
          <button
            onClick={() => setTabAktif('wudhu')}
            className={`px-6 py-2.5 rounded-2xl font-bold transition-all ${
              tabAktif === 'wudhu' 
              ? 'bg-blue-50 dark:bg-blue-900/40 text-blue-600 dark:text-blue-400 shadow-sm border border-blue-200 dark:border-blue-800/50' 
              : 'text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-200 border border-transparent'
            }`}
          >
            💧 Wudhu
          </button>
          
          <button
            onClick={() => setTabAktif('sholat')}
            className={`px-6 py-2.5 rounded-2xl font-bold transition-all ${
              tabAktif === 'sholat' 
              ? 'bg-emerald-50 dark:bg-emerald-900/40 text-emerald-600 dark:text-emerald-400 shadow-sm border border-emerald-200 dark:border-emerald-800/50' 
              : 'text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-200 border border-transparent'
            }`}
          >
            🕌 Sholat
          </button>
          
          <button
            onClick={() => setTabAktif('haji')}
            className={`px-6 py-2.5 rounded-2xl font-bold transition-all ${
              tabAktif === 'haji' 
              ? 'bg-amber-50 dark:bg-amber-900/40 text-amber-600 dark:text-amber-400 shadow-sm border border-amber-200 dark:border-amber-800/50' 
              : 'text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-200 border border-transparent'
            }`}
          >
            🕋 Haji & Umrah
          </button>

        </div>
      </div>

      {/* ========================================= */}
      {/* KONTEN TAB: WUDHU & SHOLAT (Memakai Kode Aslimu) */}
      {/* ========================================= */}
      {(tabAktif === 'wudhu' || tabAktif === 'sholat') && (
        <div className="space-y-6 pb-10 animate-fade-in">
          {dataTampil.map((item) => (
            <div 
              key={item.id} 
              className="bg-white dark:bg-slate-800 rounded-3xl p-6 md:p-8 shadow-sm border border-slate-100 dark:border-slate-700 transition duration-300 hover:shadow-md hover:-translate-y-1 group"
            >
              <h3 className="text-xl font-bold text-emerald-700 dark:text-emerald-400 mb-4 border-b border-slate-100 dark:border-slate-700 pb-3 group-hover:text-emerald-500 transition-colors">
                <span className="mr-2">✨</span> {item.judul}
              </h3>
              
              <p className="text-slate-700 dark:text-slate-300 leading-relaxed mb-4 text-lg">
                {item.deskripsi}
              </p>

              {/* Kalau ada teks Arab, Latin, dan Arti, tampilkan di dalam kotak khusus */}
              {item.arab && (
                <div className="bg-emerald-50/50 dark:bg-slate-900/50 rounded-2xl p-6 border border-emerald-100 dark:border-slate-700 mt-4 shadow-inner">
                  <p 
                    className="text-right text-3xl md:text-4xl font-arab text-emerald-800 dark:text-emerald-300 py-2 mb-4 leading-loose break-words" 
                    style={{ lineHeight: '2.5' }} 
                    dir="rtl"
                  >
                    {item.arab}
                  </p>
                  <p className="text-emerald-600 dark:text-emerald-400 font-medium italic mb-2 text-lg">
                    {item.latin}
                  </p>
                  <p className="text-slate-600 dark:text-slate-400">
                    "{item.arti}"
                  </p>
                </div>
              )}
              
            </div>
          ))}
        </div>
      )}

      {/* ========================================= */}
      {/* KONTEN TAB: HAJI & UMRAH (Desain Timeline)  */}
      {/* ========================================= */}
      {tabAktif === 'haji' && (
        <div className="animate-fade-in pb-10">
          
          {/* Sub-Tabs: Pilih Umrah atau Haji */}
          <div className="flex justify-center gap-4 mb-10">
            <button 
              onClick={() => setTipeHaji('umrah')}
              className={`px-8 py-3 rounded-full font-bold border-2 transition-all ${
                tipeHaji === 'umrah'
                ? 'border-amber-400 bg-amber-50 text-amber-700 dark:bg-amber-900/30 dark:border-amber-500 dark:text-amber-400 scale-105 shadow-sm'
                : 'border-slate-200 text-slate-500 hover:border-amber-300 dark:border-slate-700 dark:text-slate-400'
              }`}
            >
              Langkah Umrah 🕋
            </button>
            <button 
              onClick={() => setTipeHaji('haji')}
              className={`px-8 py-3 rounded-full font-bold border-2 transition-all ${
                tipeHaji === 'haji'
                ? 'border-amber-400 bg-amber-50 text-amber-700 dark:bg-amber-900/30 dark:border-amber-500 dark:text-amber-400 scale-105 shadow-sm'
                : 'border-slate-200 text-slate-500 hover:border-amber-300 dark:border-slate-700 dark:text-slate-400'
              }`}
            >
              Langkah Haji ⛺
            </button>
          </div>

          {/* Timeline / Urutan Langkah */}
          <div className="max-w-3xl mx-auto space-y-6">
            {dataHajiUmrah[tipeHaji].map((langkah, index) => (
              <div 
                key={langkah.id}
                className="bg-white dark:bg-slate-800 rounded-3xl p-6 md:p-8 shadow-sm border border-slate-100 dark:border-slate-700 flex gap-5 md:gap-6 items-start group hover:-translate-y-1 hover:shadow-amber-500/10 hover:border-amber-300 dark:hover:border-amber-600/50 transition-all duration-300 relative overflow-hidden"
              >
                {/* Garis Vertikal Timeline (Kecuali item terakhir) */}
                {index !== dataHajiUmrah[tipeHaji].length - 1 && (
                  <div className="absolute left-[3.25rem] md:left-[3.75rem] top-24 bottom-[-2rem] w-1 bg-amber-100 dark:bg-slate-700 rounded-full group-hover:bg-amber-300 dark:group-hover:bg-amber-500/50 transition-colors z-0 hidden sm:block"></div>
                )}

                {/* Lingkaran Ikon */}
                <div className="w-14 h-14 md:w-16 md:h-16 shrink-0 bg-amber-50 dark:bg-amber-900/40 text-3xl flex items-center justify-center rounded-2xl border border-amber-200 dark:border-amber-800/50 z-10 group-hover:scale-110 group-hover:bg-amber-100 transition-all shadow-sm">
                  {langkah.ikon}
                </div>

                <div className="pt-1 z-10">
                  <span className="text-xs font-bold uppercase tracking-widest text-amber-500 mb-1 block">
                    Langkah {langkah.id}
                  </span>
                  <h3 className="text-xl md:text-2xl font-bold text-slate-800 dark:text-slate-100 mb-2 group-hover:text-amber-600 dark:group-hover:text-amber-400 transition-colors">
                    {langkah.judul}
                  </h3>
                  <p className="text-slate-600 dark:text-slate-300 leading-relaxed text-base md:text-lg">
                    {langkah.deskripsi}
                  </p>
                </div>
              </div>
            ))}
          </div>
          
        </div>
      )}

    </div>
  );
}