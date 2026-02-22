import { useEffect, useRef } from 'react';
import useQuranStore from '../store/useQuranStore';

export default function GlobalPlayer() {
  const { audioData, tutupAudio } = useQuranStore();
  const audioRef = useRef(null);

  // Efek: Otomatis memutar audio (Auto-play) saat lagu berganti
  useEffect(() => {
    if (audioRef.current && audioData) {
      // Browser modern butuh penanganan error jika autoplay dicegah
      audioRef.current.play().catch((err) => console.log('Autoplay dicegah browser:', err));
    }
  }, [audioData]);

  // Jika tidak ada data audio yang dipilih, sembunyikan pemutarnya
  if (!audioData) return null;

  return (
    <div className="fixed bottom-0 left-0 md:left-64 right-0 z-[90] bg-white/95 dark:bg-slate-900/95 backdrop-blur-xl border-t border-slate-200 dark:border-slate-700 shadow-[0_-10px_40px_rgba(0,0,0,0.1)] transition-transform duration-500 animate-slide-up">
      <div className="flex flex-col sm:flex-row items-center justify-between p-3 md:px-6 md:py-4 gap-3 max-w-7xl mx-auto">
        
        {/* INFO KIRI: Ikon, Judul, dan Subjudul */}
        <div className="flex items-center w-full sm:w-auto gap-3 sm:gap-4 flex-1">
          <div className="w-12 h-12 bg-emerald-100 dark:bg-emerald-900/50 text-emerald-600 dark:text-emerald-400 rounded-full flex items-center justify-center text-xl shrink-0 animate-pulse shadow-inner">
            🎧
          </div>
          <div className="truncate flex-1">
            <h4 className="font-bold text-slate-800 dark:text-slate-100 text-sm md:text-base truncate">
              {audioData.title}
            </h4>
            <p className="text-xs text-slate-500 dark:text-slate-400 truncate mt-0.5">
              {audioData.subtitle}
            </p>
          </div>
          {/* Tombol Tutup Khusus Layar HP */}
          <button 
            onClick={tutupAudio}
            className="sm:hidden text-slate-400 hover:text-red-500 w-8 h-8 flex items-center justify-center rounded-full bg-slate-100 dark:bg-slate-800"
          >
            ✕
          </button>
        </div>

        {/* TENGAH: Kontrol Pemutar Audio Native */}
        <div className="w-full sm:flex-1 sm:max-w-md lg:max-w-lg">
           <audio 
             ref={audioRef} 
             controls 
             src={audioData.url} 
             className="w-full h-10 outline-none rounded-full" 
             autoPlay
           />
        </div>

        {/* KANAN: Tombol Tutup Khusus Layar Laptop */}
        <button 
          onClick={tutupAudio}
          className="hidden sm:flex text-slate-400 hover:text-red-500 w-10 h-10 items-center justify-center rounded-full hover:bg-red-50 dark:hover:bg-slate-800 transition-colors"
          title="Tutup Pemutar"
        >
          ✕
        </button>

      </div>
    </div>
  );
}