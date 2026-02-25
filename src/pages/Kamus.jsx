import { useState } from 'react';
import { dataKamus } from '../data/kamusIslam';

export default function Kamus() {
  const [kataKunci, setKataKunci] = useState('');

  // Mengurutkan data kamus sesuai abjad (A-Z)
  const kamusTerurut = [...dataKamus].sort((a, b) => 
    (a.istilah || "").localeCompare(b.istilah || "")
  );

  // 🛡️ FITUR PENCARIAN ANTI-CRASH
  const hasilCari = kamusTerurut.filter((item) => {
    const keyword = kataKunci.toLowerCase();
    
    // Teks biasa
    const istilah = (item.istilah || "").toLowerCase();
    const arti = (item.arti || "").toLowerCase();
    const contoh = (item.contoh || "").toLowerCase();
    const kategori = (item.kategori || "").toLowerCase();
    
    // 🛠️ Penanganan khusus untuk ARRAY 'related'
    // Kita gabungkan array-nya pakai .join(" ") agar jadi satu teks panjang
    const relatedArray = Array.isArray(item.related) ? item.related : [];
    const relatedString = relatedArray.join(" ").toLowerCase(); 

    return (
      istilah.includes(keyword) || 
      arti.includes(keyword) ||
      contoh.includes(keyword) ||
      kategori.includes(keyword) ||
      relatedString.includes(keyword) // Cari di dalam array yang sudah jadi teks
    );
  });

  return (
    <div className="max-w-7xl mx-auto px-4 md:px-8 py-6">
      
      {/* 🌸 HEADER CUTE & MANIS */}
      <div className="bg-emerald-600 text-white rounded-3xl p-8 md:p-10 mb-10 text-center shadow-lg bg-gradient-to-br from-emerald-500 to-emerald-700 dark:from-slate-800 dark:to-slate-900 border dark:border-slate-700 relative overflow-hidden">
        
        {/* Dekorasi Awan & Bintang Transparan */}
        <div className="absolute top-4 left-6 opacity-20 text-6xl md:text-7xl animate-pulse">☁️</div>
        <div className="absolute bottom-6 right-10 opacity-20 text-5xl animate-pulse" style={{ animationDelay: '0.5s' }}>✨</div>
        <div className="absolute top-10 right-20 opacity-10 text-4xl animate-bounce" style={{ animationDuration: '3s' }}>🎈</div>

        <div className="relative z-10">
          <p className="text-emerald-100 dark:text-emerald-400 font-medium tracking-widest uppercase text-xs mb-2">
            Ensiklopedia Mini 📖
          </p>
          <h1 className="text-3xl md:text-5xl font-bold mb-3 drop-shadow-sm">
            Kamus Islam
          </h1>
          <p className="text-emerald-50 dark:text-slate-300 text-lg md:text-xl font-medium mb-8">
            Yuk, pelajari istilah-istilah agama dengan mudah! 🌸
          </p>

          {/* Kolom Pencarian */}
          <div className="relative w-full max-w-xl mx-auto">
            <input
              type="text"
              placeholder="Cari kata apa hari ini? (misal: Fiqh) 🧐🔍"
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

      {/* DAFTAR HASIL PENCARIAN */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pb-10">
        {hasilCari.length === 0 ? (
          <div className="col-span-full text-center py-16 bg-white dark:bg-slate-800 rounded-3xl border border-dashed border-slate-300 dark:border-slate-700">
            <span className="text-6xl block mb-4 animate-bounce">🥺</span>
            <p className="text-xl text-slate-600 dark:text-slate-300 font-bold mb-2">
              Waduh, kata "{kataKunci}" belum ada...
            </p>
            <p className="text-slate-500 dark:text-slate-400">
              Coba cari istilah yang lain ya! 🌱
            </p>
          </div>
        ) : (
          hasilCari.map((item, index) => {
            const hurufPertama = (item.istilah || "?").charAt(0).toUpperCase();

            return (
              <div 
                key={index} 
                className="bg-white dark:bg-slate-800 rounded-3xl p-5 md:p-6 shadow-sm border border-slate-100 dark:border-slate-700 flex flex-col sm:flex-row gap-5 items-start hover:shadow-emerald-500/10 hover:border-emerald-300 dark:hover:border-emerald-600 transition-all duration-300 group hover:-translate-y-1 relative overflow-hidden"
              >
                <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-emerald-400 scale-y-0 group-hover:scale-y-100 transition-transform origin-bottom duration-300 rounded-r-full"></div>

                <div className="w-14 h-14 shrink-0 bg-emerald-50 dark:bg-emerald-900/40 text-emerald-600 dark:text-emerald-400 font-black text-2xl rounded-2xl flex items-center justify-center group-hover:bg-emerald-500 group-hover:text-white transition-colors duration-300 shadow-sm border border-emerald-100 dark:border-emerald-800/50">
                  {hurufPertama}
                </div>

                <div className="pt-1 w-full">
                  <h3 className="text-xl font-bold text-slate-800 dark:text-slate-100 mb-2 group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors flex items-center gap-2">
                    {item.istilah}
                    <span className="opacity-0 group-hover:opacity-100 transition-opacity text-sm">✨</span>
                  </h3>
                  
                  <p className="text-slate-600 dark:text-slate-300 leading-relaxed text-base mb-2 md:text-lg">
                    {item.arti}
                  </p>
                  
                  {item.contoh && (
                    <div className="bg-slate-50 dark:bg-slate-900/50 p-3 rounded-xl border border-slate-100 dark:border-slate-700 mb-3">
                      <p className="text-slate-600 dark:text-slate-400 text-sm md:text-base italic">
                        <span className="font-bold not-italic">💡 Contoh: </span> 
                        {item.contoh}
                      </p>
                    </div>
                  )}
                  
                  {/* Menampilkan Array Related sebagai Label/Badge kecil */}
                  <div className="flex flex-wrap gap-2 mt-2">
                    <span className="bg-slate-100 dark:bg-slate-700 text-slate-500 dark:text-slate-300 text-xs font-bold px-2 py-1 rounded border border-slate-200 dark:border-slate-600">
                      📂 {item.kategori}
                    </span>
                    
                    {Array.isArray(item.related) && item.related.map((rel, i) => (
                      <span key={i} className="bg-emerald-50 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400 text-xs font-bold px-2 py-1 rounded border border-emerald-200 dark:border-emerald-800/50">
                        🔗 {rel}
                      </span>
                    ))}
                  </div>
                                                          
                </div>
              </div>
            );
          })
        )}
      </div>

    </div>
  );
}