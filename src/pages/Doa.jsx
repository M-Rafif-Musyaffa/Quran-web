import { useState } from 'react';
import { Link } from 'react-router-dom';

// 📂 IMPORT DATA LOKAL KITA
import { dataDzikir } from '../data/dataDzikir';
import { dataDoaHarian } from '../data/dataDoa'; 

export default function Doa() {
  const [kataKunci, setKataKunci] = useState('');
  const [tabAktif, setTabAktif] = useState('doa');

  // 🔍 MESIN PENCARIAN SUPER CEPAT (Membaca tags dari database)
  const doaTersaring = dataDoaHarian.filter((doa) => {
    if (!kataKunci) return true;

    const pencarian = kataKunci.toLowerCase();
    const judul = (doa.judul || "").toLowerCase();
    const arti = (doa.arti || "").toLowerCase();

    // 1. Cek Judul dan Arti
    const cocokStandar = judul.includes(pencarian) || arti.includes(pencarian);

    // 2. Cek Tags Tersembunyi (Gunakan ? untuk berjaga-jaga jika tags kosong)
    const cocokTags = doa.tags?.some(tag => tag.toLowerCase().includes(pencarian)) || false;

    return cocokStandar || cocokTags;
  });

  return (
    <div className="max-w-5xl mx-auto py-4">
      
      {/* HEADER ELEGAN */}
      <div className="bg-emerald-600 text-white rounded-[2rem] p-8 md:p-12 mb-8 text-center shadow-lg bg-gradient-to-br from-emerald-500 to-teal-700 dark:from-slate-800 dark:to-slate-900 border dark:border-slate-700 relative overflow-hidden">
        <div className="absolute top-4 left-6 opacity-20 text-6xl md:text-7xl animate-pulse">☁️</div>
        
        <div className="relative z-10">
          <p className="text-emerald-100 font-medium tracking-widest uppercase text-xs mb-2">Kumpulan Doa 🤲</p>
          <h1 className="text-3xl md:text-5xl font-bold mb-6 drop-shadow-sm">Doa & Dzikir</h1>
          <p className="text-emerald-50 dark:text-slate-300 text-lg md:text-xl font-medium max-w-xl mx-auto">
            Kumpulan doa harian dan dzikir utama umat muslim untuk menemani setiap langkahmu.
          </p>
        </div>
      </div>

      {/* TOMBOL SAKLAR (TABS) */}
      <div className="flex justify-center mb-10">
        <div className="bg-slate-200/50 dark:bg-slate-800 p-1.5 rounded-2xl flex flex-wrap gap-2 shadow-inner border border-slate-100 dark:border-slate-700">
          <button
            onClick={() => setTabAktif('doa')}
            className={`px-6 py-2.5 rounded-xl font-bold transition-all duration-300 flex items-center gap-2 ${
              tabAktif === 'doa' 
              ? 'bg-white dark:bg-slate-700 text-emerald-600 dark:text-emerald-400 shadow-sm' 
              : 'text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-200'
            }`}
          >
            🤲 Doa Harian
          </button>
          <button
            onClick={() => setTabAktif('dzikir')}
            className={`px-6 py-2.5 rounded-xl font-bold transition-all duration-300 flex items-center gap-2 ${
              tabAktif === 'dzikir' 
              ? 'bg-white dark:bg-slate-700 text-emerald-600 dark:text-emerald-400 shadow-sm' 
              : 'text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-200'
            }`}
          >
            📿 Dzikir Utama
          </button>
        </div>
      </div>

      {/* ========================================= */}
      {/* 📚 KONTEN TAB 1: DAFTAR DOA HARIAN        */}
      {/* ========================================= */}
      {tabAktif === 'doa' && (
        <div className="animate-fade-in">
          
          {/* Kotak Pencarian Pintar */}
          <div className="relative w-full max-w-xl mx-auto mb-10 group">
            <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
              <span className="text-xl">🔍</span>
            </div>
            <input
              type="text"
              placeholder="Apa yang sedang kamu rasakan? (misal: galau, skripsi, tidur)..."
              value={kataKunci}
              onChange={(e) => setKataKunci(e.target.value)}
              className="w-full pl-12 pr-4 py-4 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl focus:outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 dark:text-white transition shadow-sm text-lg"
            />
          </div>

          {/* LIST DOA RINGKAS (KOTAK-KOTAK) */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {doaTersaring.length === 0 ? (
              <div className="col-span-full text-center text-slate-500 py-12 bg-white dark:bg-slate-800 rounded-[2rem] border border-dashed border-slate-300 dark:border-slate-700">
                <div className="text-5xl mb-4 grayscale opacity-60">🧐</div>
                <h3 className="text-xl font-bold text-slate-800 dark:text-slate-200">Doa tidak ditemukan</h3>
                <p className="mt-2">Doa untuk "{kataKunci}" belum tersedia. Coba gunakan kata lain.</p>
              </div>
            ) : (
              doaTersaring.map((doa) => (
                <Link 
                  to={`/doa/${doa.id}`}
                  key={doa.id}
                  className="bg-white dark:bg-slate-800 p-5 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-700 hover:shadow-emerald-500/20 hover:border-emerald-300 dark:hover:border-emerald-500 transition-all flex items-center gap-4 group text-left w-full relative overflow-hidden"
                >
                  <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-emerald-500 scale-y-0 group-hover:scale-y-100 transition-transform origin-bottom rounded-r-full"></div>
                  <div className="w-12 h-12 bg-emerald-50 dark:bg-slate-700/50 text-emerald-600 dark:text-emerald-400 rounded-xl flex items-center justify-center text-xl shrink-0 group-hover:bg-emerald-600 group-hover:text-white transition-colors border border-emerald-100 dark:border-slate-600">
                    🤲
                  </div>
                  <h3 className="font-bold text-slate-800 dark:text-slate-100 text-base md:text-lg group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors line-clamp-2">
                    {doa.judul}
                  </h3>
                </Link>
              ))
            )}
          </div>
        </div>
      )}

      {/* ========================================= */}
      {/* 📿 KONTEN TAB 2: DZIKIR (Tetap Tampil Penuh) */}
      {/* ========================================= */}
      {tabAktif === 'dzikir' && (
        <div className="animate-fade-in space-y-6">
          {dataDzikir.map((dzikir) => (
            <div 
              key={dzikir.id} 
              className="bg-white dark:bg-slate-800 rounded-[2rem] p-6 md:p-8 shadow-sm border border-slate-100 dark:border-slate-700 transition duration-300 relative overflow-hidden group hover:border-emerald-300"
            >
              <div className="absolute -right-4 -bottom-4 text-8xl opacity-5 group-hover:scale-110 transition-transform duration-500">📿</div>
              
              <div className="flex flex-wrap items-center justify-between gap-2 mb-6 border-b border-slate-100 dark:border-slate-700 pb-4 relative z-10">
                <h3 className="text-xl md:text-2xl font-bold text-slate-800 dark:text-slate-100">
                  {dzikir.judul}
                </h3>
                <div className="flex gap-2">
                  <span className="bg-emerald-100 dark:bg-emerald-900/40 text-emerald-700 dark:text-emerald-400 text-xs font-bold px-3 py-1.5 rounded-full border border-emerald-200 dark:border-emerald-800/50 shadow-sm">
                    🏷️ {dzikir.kategori}
                  </span>
                  <span className="bg-amber-100 dark:bg-amber-900/40 text-amber-700 dark:text-amber-400 text-xs font-bold px-3 py-1.5 rounded-full border border-amber-200 dark:border-amber-800/50 shadow-sm">
                    🔁 {dzikir.ulang}
                  </span>
                </div>
              </div>

              <div className="bg-emerald-50/40 dark:bg-slate-900/40 rounded-2xl p-6 border border-emerald-100/50 dark:border-slate-700/50 mb-6 relative z-10">
                <p className="text-right text-3xl md:text-4xl font-arab text-emerald-800 dark:text-emerald-400 py-2 leading-loose break-words" style={{ lineHeight: '1.9' }} dir="rtl">
                  {dzikir.arab}
                </p>
              </div>

              <div className="space-y-3 relative z-10">
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-widest text-emerald-500 mb-1">Cara Baca</p>
                  <p className="font-bold text-slate-600 dark:text-slate-300 text-sm md:text-base">{dzikir.latin}</p>
                </div>
                <div className="pt-3 border-t border-slate-100 dark:border-slate-700">
                  <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-1">Artinya</p>
                  <p className="text-slate-500 dark:text-slate-400 italic text-sm md:text-base">"{dzikir.arti}"</p>
                </div>

                {dzikir.riwayat && (
                  <div className="pt-3 border-t border-slate-100 dark:border-slate-700">
                    <p className="text-[10px] font-bold uppercase tracking-widest text-sky-500 dark:text-sky-400 mb-1">Riwayat & Keterangan</p>
                    <p className="text-sm md:text-base font-medium text-sky-700 dark:text-sky-300 bg-sky-50 dark:bg-sky-900/20 p-3 rounded-xl border border-sky-100 dark:border-sky-800/50 flex items-start gap-2">
                      <span className="shrink-0 text-base">📚</span> 
                      {dzikir.riwayat}
                    </p>
                  </div>
                )}
              </div>
            </div>
          ))}

          <div className="mt-8 text-center bg-emerald-50 dark:bg-slate-900/50 p-6 rounded-[2rem] border border-emerald-200 dark:border-slate-700">
            <p className="text-slate-600 dark:text-slate-400 mb-4 font-medium">Ingin menghitung dzikir dengan mudah?</p>
            <Link to="/tasbih" className="inline-block bg-emerald-600 text-white font-bold px-8 py-3.5 rounded-full hover:bg-emerald-700 hover:shadow-lg shadow-emerald-500/30 transition-all active:scale-95">
              Buka Tasbih Digital 📿
            </Link>
          </div>

        </div>
      )}

    </div>
  );
}