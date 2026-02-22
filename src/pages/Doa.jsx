import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Link } from 'react-router-dom';
import doaApi from '../services/doaApi';
// Import Database Dzikir yang baru kita buat
import { dataDzikir } from '../data/dataDzikir';

export default function Doa() {
  const [kataKunci, setKataKunci] = useState('');
  // STATE BARU: Untuk Tab Saklar
  const [tabAktif, setTabAktif] = useState('doa');

  const { data: doadoa, isLoading, isError } = useQuery({
    queryKey: ['doadoa'],
    queryFn: async () => {
      const response = await doaApi.get('/doa');
      return response.data.data || response.data;
    },
    staleTime: Infinity, 
  });

  const doaTersaring = doadoa?.filter((doa) => {
    const judul = doa.nama || doa.judul || "";
    return judul.toLowerCase().includes(kataKunci.toLowerCase());
  });

  return (
    <div className="max-w-5xl mx-auto py-4">
      
      {/* HEADER ELEGAN */}
      <div className="bg-emerald-600 text-white rounded-3xl p-8 mb-8 text-center shadow-lg bg-gradient-to-br from-emerald-500 to-emerald-700 dark:from-slate-800 dark:to-slate-900 border dark:border-slate-700">
        <h1 className="text-3xl md:text-5xl font-bold mb-4">🤲 Doa & Dzikir</h1>
        <p className="text-emerald-100 dark:text-slate-300 text-lg md:text-xl font-medium">
          Kumpulan doa harian dan dzikir utama umat muslim
        </p>
      </div>

      {/* TOMBOL SAKLAR (TABS) */}
      <div className="flex justify-center mb-10">
        <div className="bg-slate-200/50 dark:bg-slate-800 p-1.5 rounded-2xl flex gap-2 shadow-inner border border-slate-100 dark:border-slate-700">
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
      {/* KONTEN TAB 1: DOA HARIAN (Dari API)         */}
      {/* ========================================= */}
      {tabAktif === 'doa' && (
        <div className="animate-fade-in">
          {/* Kotak Pencarian Khusus Doa */}
          <div className="relative w-full max-w-xl mx-auto mb-10">
            <input
              type="text"
              placeholder="Cari doa (misal: tidur, makan, belajar)..."
              value={kataKunci}
              onChange={(e) => setKataKunci(e.target.value)}
              className="w-full pl-12 pr-4 py-4 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl focus:outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 dark:text-white transition shadow-sm text-lg"
            />
            <span className="absolute left-4 top-4 text-slate-400 text-xl">🔍</span>
          </div>

          {isLoading && (
            <div className="flex flex-col items-center justify-center py-10">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-600 mb-4"></div>
              <p className="text-emerald-600 font-medium">Memuat kumpulan doa...</p>
            </div>
          )}

          {isError && (
            <div className="text-center py-10 text-red-500 font-bold bg-red-50 dark:bg-red-900/20 rounded-2xl">
              Gagal memuat data doa. Periksa koneksi internet Anda.
            </div>
          )}

          {!isLoading && !isError && doaTersaring && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
              {doaTersaring.length === 0 ? (
                <div className="col-span-full text-center text-slate-500 py-10 bg-white dark:bg-slate-800 rounded-2xl border border-dashed border-slate-300 dark:border-slate-700">
                  Doa dengan kata kunci "{kataKunci}" tidak ditemukan.
                </div>
              ) : (
                doaTersaring.map((doa, index) => {
                  const judulDoa = doa.nama || doa.judul || `Doa ${index + 1}`;
                  return (
                    <Link 
                      to={`/doa/${index}`} 
                      key={index}
                      className="bg-white dark:bg-slate-800 rounded-2xl p-5 shadow-sm border border-slate-100 dark:border-slate-700 hover:shadow-emerald-500/20 hover:border-emerald-400 dark:hover:border-emerald-500 transition-all duration-300 flex items-center gap-4 group hover:-translate-y-1 relative overflow-hidden"
                    >
                      {/* Garis Hijau Animasi */}
                      <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-emerald-500 scale-y-0 group-hover:scale-y-100 transition-transform origin-bottom duration-300 rounded-r-full"></div>
                      
                      <div className="w-12 h-12 bg-emerald-50 dark:bg-slate-700/50 text-emerald-600 dark:text-emerald-400 rounded-xl flex items-center justify-center font-bold text-xl group-hover:bg-emerald-600 group-hover:text-white transition-colors duration-300 shrink-0 border border-emerald-100 dark:border-slate-600">
                        🤲
                      </div>
                      <h3 className="font-bold text-slate-800 dark:text-slate-100 text-lg group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors line-clamp-2">
                        {judulDoa}
                      </h3>
                    </Link>
                  );
                })
              )}
            </div>
          )}
        </div>
      )}

      {/* ========================================= */}
      {/* KONTEN TAB 2: DZIKIR (Dari Data Lokal)      */}
      {/* ========================================= */}
      {tabAktif === 'dzikir' && (
        <div className="animate-fade-in space-y-6">
          {dataDzikir.map((dzikir) => (
            <div 
              key={dzikir.id} 
              className="bg-white dark:bg-slate-800 rounded-3xl p-6 md:p-8 shadow-sm border border-slate-100 dark:border-slate-700 transition duration-300"
            >
              <div className="flex flex-wrap items-center justify-between gap-2 mb-6 border-b border-slate-100 dark:border-slate-700 pb-4">
                <h3 className="text-xl md:text-2xl font-bold text-slate-800 dark:text-slate-100">
                  {dzikir.judul}
                </h3>
                {/* Lencana (Badge) Jumlah Ulang & Kategori */}
                <div className="flex gap-2">
                  <span className="bg-emerald-100 dark:bg-emerald-900/40 text-emerald-700 dark:text-emerald-400 text-xs font-bold px-3 py-1.5 rounded-full border border-emerald-200 dark:border-emerald-800/50">
                    🏷️ {dzikir.kategori}
                  </span>
                  <span className="bg-amber-100 dark:bg-amber-900/40 text-amber-700 dark:text-amber-400 text-xs font-bold px-3 py-1.5 rounded-full border border-amber-200 dark:border-amber-800/50">
                    🔁 {dzikir.ulang}
                  </span>
                </div>
              </div>

              {/* Teks Arab Dzikir */}
              <div className="bg-emerald-50/50 dark:bg-slate-900/50 rounded-2xl p-6 border border-emerald-100/50 dark:border-slate-700 mb-6">
                <p 
                  className="text-right text-3xl md:text-4xl font-arab text-emerald-800 dark:text-emerald-400 py-2 leading-loose break-words" 
                  style={{ lineHeight: '2.5' }} 
                  dir="rtl"
                >
                  {dzikir.arab}
                </p>
              </div>

              {/* Teks Latin & Arti */}
              <div className="space-y-3">
                <p className="text-emerald-700 dark:text-emerald-500 font-medium italic text-lg leading-relaxed">
                  {dzikir.latin}
                </p>
                <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                  "{dzikir.arti}"
                </p>
              </div>
              
            </div>
          ))}

          {/* Tombol Pintasan ke Tasbih Digital */}
          <div className="mt-8 text-center bg-emerald-50 dark:bg-slate-900/50 p-6 rounded-2xl border border-emerald-200 dark:border-slate-700">
            <p className="text-slate-600 dark:text-slate-400 mb-4 font-medium">Ingin menghitung dzikir dengan mudah?</p>
            <Link to="/tasbih" className="inline-block bg-emerald-600 text-white font-bold px-8 py-3 rounded-full hover:bg-emerald-700 hover:shadow-lg transition-all transform hover:-translate-y-1">
              Buka Tasbih Digital 📿
            </Link>
          </div>

        </div>
      )}

    </div>
  );
}