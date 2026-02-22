import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import api from '../services/api';
import useQuranStore from '../store/useQuranStore';

export default function SurahDetail() {
  const { id } = useParams();
  
  const { 
    bookmark, 
    setBookmark, 
    ukuranFontArab, 
    jenisFontArab, 
    qariAudio,
    setAudioData 
  } = useQuranStore();

  const [tafsirTerbuka, setTafsirTerbuka] = useState(null);

  const { data: surah, isLoading, isError } = useQuery({
    queryKey: ['surah', id],
    queryFn: async () => {
      const [resSurat, resTafsir] = await Promise.all([
        api.get(`/surat/${id}`),
        api.get(`/tafsir/${id}`)
      ]);

      const dataSurat = resSurat.data.data;
      const dataTafsir = resTafsir.data.data.tafsir;
      dataSurat.ayat = dataSurat.ayat.map((ayt) => {
        const tafsirCocok = dataTafsir.find(t => t.ayat === ayt.nomorAyat);
        return {
          ...ayt,
          teksTafsir: tafsirCocok ? tafsirCocok.teks : "Tafsir tidak tersedia."
        };
      });

      return dataSurat;
    }
  });

  const toggleTafsir = (nomorAyat) => {
    setTafsirTerbuka(tafsirTerbuka === nomorAyat ? null : nomorAyat);
  };

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center py-32">
        <div className="text-5xl mb-6 animate-bounce">⏳</div>
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-600 mb-4"></div>
        <p className="text-emerald-600 dark:text-emerald-400 font-medium animate-pulse text-lg">
          Tunggu sebentar ya, sedang menyiapkan ayat suci... ✨
        </p>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="text-center py-32">
        <div className="text-6xl mb-6">🥺</div>
        <p className="text-red-500 font-bold mb-4 text-xl">Yah, gagal memuat surah. Coba cek internetmu ya...</p>
        <Link to="/" className="bg-emerald-600 text-white px-6 py-2 rounded-full hover:bg-emerald-700 transition shadow-sm inline-flex items-center gap-2">
          <span>🌱</span> Kembali ke Beranda
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto overflow-hidden">   
      <Link to="/" className="text-emerald-600 hover:text-emerald-700 dark:text-emerald-400 dark:hover:text-emerald-300 font-medium mb-6 inline-flex items-center transition bg-white dark:bg-slate-800 px-5 py-2.5 rounded-full shadow-sm border border-slate-100 dark:border-slate-700 hover:-translate-x-1">
        <span className="mr-2">🌱</span> Kembali ke Beranda
      </Link>
      
      {/* HEADER CUTE & ELEGAN */}
      <div className="bg-emerald-600 text-white rounded-3xl p-8 mb-8 text-center shadow-lg bg-gradient-to-br from-emerald-500 to-emerald-700 dark:from-slate-800 dark:to-slate-900 border dark:border-slate-700 relative overflow-hidden">
        
        {/* Dekorasi Awan & Bintang Lucu */}
        <div className="absolute top-4 left-6 opacity-20 text-6xl md:text-7xl select-none animate-pulse">☁️</div>
        <div className="absolute bottom-6 right-8 opacity-20 text-5xl select-none animate-pulse" style={{ animationDelay: '1s' }}>✨</div>
        <div className="absolute top-10 right-16 opacity-10 text-8xl select-none font-arab transform rotate-12">
          {surah.nama}
        </div>

        <div className="relative z-10">
          <p className="text-emerald-100 dark:text-emerald-400 font-medium tracking-widest uppercase text-xs mb-2">Selamat Membaca 🌸</p>
          <h1 className="text-4xl md:text-5xl font-bold mb-2 drop-shadow-sm">{surah.namaLatin}</h1>
          <p className="text-emerald-100 dark:text-slate-300 text-lg mb-6">"{surah.arti}"</p>
          
          <div className="flex flex-wrap justify-center gap-2 md:gap-4 text-sm font-medium mb-8">
            <span className="bg-white/20 px-4 py-2 rounded-full border border-white/20 backdrop-blur-sm flex items-center gap-1.5 shadow-sm">
              📍 {surah.tempatTurun}
            </span>
            <span className="bg-white/20 px-4 py-2 rounded-full border border-white/20 backdrop-blur-sm flex items-center gap-1.5 shadow-sm">
              📜 {surah.jumlahAyat} Ayat
            </span>
          </div>

          {surah.audioFull && (
            <div className="flex justify-center mt-6">
              <button 
                onClick={() => setAudioData({
                  url: surah.audioFull[qariAudio],
                  title: `Surah ${surah.namaLatin}`,
                  subtitle: `Murottal Full (${surah.arti})`
                })}
                className="bg-white/20 hover:bg-white/30 text-white px-6 py-3 rounded-full backdrop-blur-md border border-white/20 font-bold transition-all shadow-sm flex items-center gap-3 hover:scale-105"
              >
                <span className="text-xl">▶️</span> Putar Full Surah
              </button>
            </div>
          )}
        </div>
      </div>

      <div className="space-y-6 md:space-y-8 pb-10">
        {surah.ayat.map((ayt) => {
          const isBookmarked = bookmark?.surahId === id && bookmark?.nomorAyat === ayt.nomorAyat;
          return (
            <div 
              key={ayt.nomorAyat} 
              id={`ayat-${ayt.nomorAyat}`}
              className={`rounded-3xl p-5 md:p-8 shadow-sm border transition duration-300 overflow-hidden group
                ${isBookmarked 
                  ? 'bg-emerald-50/80 border-emerald-300 dark:bg-emerald-900/20 dark:border-emerald-700/50' 
                  : 'bg-white border-slate-100 hover:shadow-md dark:bg-slate-800 dark:border-slate-700'}
              `}
            >
              <div className="flex justify-between items-start gap-4 md:gap-6 mb-8">
                
                <div className="flex flex-col items-center gap-3 mt-2 shrink-0">
                  {/* Nomor Ayat */}
                  <div className={`w-12 h-12 rounded-2xl flex items-center justify-center font-bold text-lg
                    ${isBookmarked 
                      ? 'bg-emerald-600 text-white shadow-md dark:bg-emerald-500' 
                      : 'bg-emerald-50 text-emerald-600 border border-emerald-100 dark:bg-slate-700 dark:border-slate-600 dark:text-emerald-400'}
                  `}>
                    {ayt.nomorAyat}
                  </div>    
                  {/* Tombol Bookmark */}
                  <button 
                    onClick={() => setBookmark(id, surah.namaLatin, ayt.nomorAyat)}
                    title={isBookmarked ? "Sudah Ditandai" : "Tandai Terakhir Dibaca"}
                    className={`text-2xl transition-all duration-300 hover:scale-125
                      ${isBookmarked 
                        ? 'text-emerald-600 drop-shadow-md animate-bounce-short' 
                        : 'text-slate-300 hover:text-emerald-400 dark:text-slate-500 dark:hover:text-emerald-400 grayscale'}
                    `}
                  >
                    🔖
                  </button>
                </div>               
                
                {/* TEKS ARAB */}
                <div 
                  className="flex-1 w-full text-right font-arab text-slate-800 dark:text-slate-200 break-words group-hover:text-emerald-800 dark:group-hover:text-emerald-300 transition-colors" 
                  dir="rtl"
                  style={{ 
                    fontSize: `${ukuranFontArab}px`, 
                    fontFamily: jenisFontArab, 
                    lineHeight: '2.5' 
                  }}
                >
                  {ayt.teksArab}
                </div>
              </div>
              
              {/* Teks Latin & Terjemahan */}
              <div className="space-y-4 pt-6 border-t border-slate-100 dark:border-slate-700/70">
                <p className="text-emerald-600 dark:text-emerald-400 font-medium leading-relaxed text-sm md:text-base">
                  {ayt.teksLatin}
                </p>
                <p className="text-slate-600 dark:text-slate-300 leading-relaxed text-base md:text-lg">
                  "{ayt.teksIndonesia}"
                </p>
              </div>
              
              {/* Tombol Tafsir & Audio Recorder */}
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-5 mt-6 pt-5 border-t border-slate-100 dark:border-slate-700/70 border-dashed">              
                
                {/* Tombol Tafsir (Lebih Cute) */}
                <button
                  onClick={() => toggleTafsir(ayt.nomorAyat)}
                  className={`font-medium text-sm flex items-center gap-2 px-5 py-2.5 rounded-xl transition-all shadow-sm
                    ${tafsirTerbuka === ayt.nomorAyat 
                      ? 'bg-slate-100 text-slate-600 dark:bg-slate-700 dark:text-slate-300' 
                      : 'bg-emerald-50 text-emerald-600 hover:bg-emerald-100 dark:bg-emerald-900/40 dark:text-emerald-400 dark:hover:bg-emerald-900/60'}
                  `}
                >
                  {tafsirTerbuka === ayt.nomorAyat ? '☁️ Tutup Tafsir' : '🌸 Baca Tafsir Singkat'}
                </button>
                
                {/* AUDIO PER-AYAT */}
                <div className="w-full md:w-auto flex items-center gap-3 bg-slate-50 dark:bg-slate-900/50 p-1.5 rounded-full border border-slate-100 dark:border-slate-700">
                  <span className="pl-3 text-lg">🎧</span>
                  <button
                  onClick={() => setAudioData({
                    url: ayt.audio[qariAudio],
                    title: `Surah ${surah.namaLatin}`,
                    subtitle: `Ayat Ke-${ayt.nomorAyat}`
                  })}
                  className="w-full md:w-auto font-medium text-sm flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl transition-all shadow-sm bg-slate-100 text-slate-600 hover:bg-emerald-100 hover:text-emerald-600 dark:bg-slate-700 dark:text-slate-300 dark:hover:bg-slate-600"
                >
                  ▶️ Putar Ayat Ini
                </button>
                </div>
              </div>
              
              {/* KOTAK TAFSIR */}
              {tafsirTerbuka === ayt.nomorAyat && (
                <div className="mt-5 p-6 bg-amber-50/50 dark:bg-slate-900/80 rounded-2xl border border-amber-100/50 dark:border-slate-700 shadow-inner animate-fade-in">
                  <p className="text-sm font-bold text-amber-700 dark:text-amber-500 mb-3 flex items-center gap-2 border-b border-amber-200/50 dark:border-slate-600 pb-2">
                    <span>💡</span> Tafsir Kemenag RI
                  </p>
                  <p className="text-slate-700 dark:text-slate-300 text-base md:text-lg leading-relaxed text-justify font-serif">
                    {ayt.teksTafsir}
                  </p>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}