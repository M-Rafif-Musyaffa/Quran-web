import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import api from '../services/api';
import SurahCard from '../components/SurahCard';
import SurahCardSkeleton from '../components/SurahCardSkeleton';

export default function Quran() {
  const [kataKunci, setKataKunci] = useState('');

  const { data: surahs, isLoading, isError, refetch } = useQuery({
    queryKey: ['surahs'],
    queryFn: async () => {
      const response = await api.get('/surat');
      return response.data.data;
    },
    retry: 2 
  });

  const surahTersaring = surahs?.filter((surah) => {
    return surah.namaLatin.toLowerCase().includes(kataKunci.toLowerCase()) || 
           surah.arti.toLowerCase().includes(kataKunci.toLowerCase());
  });

  return (
    <div className="max-w-5xl mx-auto py-4">
      
      {/* HEADER AL-QURAN */}
      <div className="bg-emerald-600 text-white rounded-3xl p-8 md:p-10 mb-8 text-center shadow-lg bg-gradient-to-br from-emerald-500 to-emerald-700 dark:from-slate-800 dark:to-slate-900 border dark:border-slate-700 relative overflow-hidden">
        <div className="absolute top-2 right-6 opacity-20 text-7xl select-none animate-pulse">📖</div>
        <div className="absolute bottom-2 left-10 opacity-10 text-5xl select-none">✨</div>
        
        <div className="relative z-10">
          <h1 className="text-3xl md:text-5xl font-bold mb-3 drop-shadow-sm">Al-Quran</h1>
          <p className="text-emerald-50 dark:text-slate-300 text-lg md:text-xl font-medium mb-8">
            Baca, pelajari, dan amalkan kitab suci Al-Quran. 🌸
          </p>

          <div className="relative max-w-xl mx-auto">
            <input
              type="text"
              placeholder="Cari surah (misal: Al-Mulk, Yasin)... 🔍"
              value={kataKunci}
              onChange={(e) => setKataKunci(e.target.value)}
              className="w-full pl-6 pr-12 py-3.5 bg-white/95 dark:bg-slate-800/95 text-slate-800 dark:text-white rounded-full focus:outline-none focus:ring-4 focus:ring-emerald-300/50 shadow-inner placeholder-slate-400 font-medium transition-all"
            />
            {kataKunci && (
              <button onClick={() => setKataKunci('')} className="absolute right-5 top-3.5 text-slate-400 hover:text-red-400 transition text-lg">✖️</button>
            )}
          </div>
        </div>
      </div>

      <div className="flex items-center gap-2 mb-6 px-2">
        <h2 className="text-2xl font-bold text-slate-800 dark:text-slate-200">Daftar Surah</h2>
        <span className="text-2xl animate-bounce">🌱</span>
      </div>

      {isLoading && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 pb-10">
          {[...Array(12)].map((_, index) => <SurahCardSkeleton key={index} />)}
        </div>
      )}

      {isError && (
        <div className="text-center py-12 bg-red-50 dark:bg-red-900/20 rounded-3xl border border-red-100 dark:border-red-800/50 mb-10">
          <p className="text-red-500 font-bold mb-4">Waduh, gagal memuat data surah. Coba periksa koneksimu ya 🥺</p>
          <button onClick={() => refetch()} className="bg-red-500 text-white px-6 py-2 rounded-xl hover:bg-red-600 transition font-medium shadow-sm">🔄 Coba Lagi</button>
        </div>
      )}

      {!isLoading && !isError && surahTersaring && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 pb-10">
          {surahTersaring.length === 0 ? (
            <div className="col-span-full text-center text-slate-500 py-12 bg-white dark:bg-slate-800 rounded-3xl border border-dashed border-slate-300 dark:border-slate-700">
              <span className="text-4xl block mb-3">🥺</span> Waduh, surah "{kataKunci}" tidak ketemu nih...
            </div>
          ) : (
            surahTersaring.map((surah) => <SurahCard key={surah.nomor} surah={surah} />)
          )}
        </div>
      )}

    </div>
  );
}