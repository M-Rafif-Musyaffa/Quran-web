import { useState } from 'react';

export default function Tajwid() {
  const [kategoriAktif, setKategoriAktif] = useState('nunMati');

  // 📚 DATABASE MATERI TAJWID (Sekarang dilengkapi Penjelasan!)
  const materiTajwid = {
    nunMati: {
      judul: "Hukum Nun Mati (نْ) & Tanwin (ـً ـٍ ـٌ)",
      deskripsi: "Aturan cara membaca ketika Nun Sukun atau Tanwin bertemu dengan huruf hijaiyah tertentu.",
      ikon: "🌸",
      data: [
        { 
          id: 1, nama: "Idzhar Halqi", huruf: "ء ه ع ح غ خ", 
          penjelasan: "Idzhar artinya 'Jelas', dan Halqi artinya 'Tenggorokan'. Jika Nun Mati/Tanwin bertemu huruf-huruf tenggorokan ini, suaranya tidak boleh ditahan atau didengungkan.",
          caraBaca: "Jelas & Terang (Tanpa Dengung)", contoh: "مِنْ خَوْفٍ", artiContoh: "Min khoufin", warna: "sky" 
        },
        { 
          id: 2, nama: "Idgham Bighunnah", huruf: "ي ن م و", 
          penjelasan: "Idgham artinya 'Memasukkan', Bighunnah artinya 'Dengan Dengung'. Suara Nun Mati/Tanwin dilebur masuk ke huruf depannya dan ditahan di hidung selama 2 ketukan.",
          caraBaca: "Masuk & Mendengung (Ditahan 2 harakat)", contoh: "مَنْ يَقُولُ", artiContoh: "May-yaquulu", warna: "emerald" 
        },
        { 
          id: 3, nama: "Idgham Bilaghunnah", huruf: "ل ر", 
          penjelasan: "Berbeda dengan Bighunnah, 'Bilaghunnah' artinya 'Tanpa Dengung'. Suaranya langsung dimasukkan ke huruf Lam atau Ro dengan jelas dan cepat tanpa ditahan di hidung.",
          caraBaca: "Masuk Jelas (Tanpa Dengung)", contoh: "مِنْ رَبِّهِمْ", artiContoh: "Mir-robbihim", warna: "amber" 
        },
        { 
          id: 4, nama: "Iqlab", huruf: "ب", 
          penjelasan: "Iqlab artinya 'Menukar'. Bunyi huruf Nun (N) ditukar menjadi bunyi huruf Mim (M). Biasanya di Al-Quran ditandai dengan huruf Mim kecil (م) di atasnya.",
          caraBaca: "Menjadi bunyi 'Mim' & Mendengung", contoh: "مِنْ بَعْدِ", artiContoh: "Mim-ba'di", warna: "rose" 
        },
        { 
          id: 5, nama: "Ikhfa Haqiqi", huruf: "ت ث ج د ذ ز س ش ص ض ط ظ ف ق ك", 
          penjelasan: "Ikhfa artinya 'Samar'. Suara Nun Mati/Tanwin dibaca mengambang (samar-samar) bersiap menuju makhraj huruf depannya, disertai dengungan yang cukup panjang.",
          caraBaca: "Samar-samar & Mendengung", contoh: "مِنْ دُونِ", artiContoh: "Ming-duuni", warna: "violet" 
        }
      ]
    },
    mimMati: {
      judul: "Hukum Mim Mati (مْ)",
      deskripsi: "Aturan cara membaca ketika Mim Sukun bertemu dengan huruf hijaiyah lainnya.",
      ikon: "🌿",
      data: [
        { 
          id: 1, nama: "Ikhfa Syafawi", huruf: "ب", 
          penjelasan: "Syafawi artinya 'Bibir'. Jika Mim Mati bertemu Ba, bibir dikatupkan dengan ringan (tidak terlalu rapat), lalu suaranya disamarkan dan didengungkan.",
          caraBaca: "Samar di bibir & Mendengung", contoh: "تَرْمِيهِمْ بِحِجَارَةٍ", artiContoh: "Tarmiihim-bihijaarotin", warna: "rose" 
        },
        { 
          id: 2, nama: "Idgham Mimi (Mutamatsilain)", huruf: "م", 
          penjelasan: "Terjadi karena bertemunya dua huruf yang kembar persis (Mim bertemu Mim). Cara membacanya seolah-olah Mim tersebut memiliki tasydid, sehingga harus ditahan dan mendengung.",
          caraBaca: "Masuk & Mendengung (Ditahan)", contoh: "لَهُمْ مَا", artiContoh: "Lahum-maa", warna: "emerald" 
        },
        { 
          id: 3, nama: "Idzhar Syafawi", huruf: "Semua huruf kecuali م dan ب", 
          penjelasan: "Karena Idzhar artinya 'Jelas', maka ketika Mim Mati bertemu selain Mim dan Ba, bibir harus tertutup rapat dan suaranya dibaca sangat jelas tanpa ada dengungan sama sekali.",
          caraBaca: "Jelas di bibir (Tanpa Dengung)", contoh: "هُمْ نَائِمُونَ", artiContoh: "Hum-naaimuuna", warna: "sky" 
        }
      ]
    },
    qalqalah: {
      judul: "Hukum Qalqalah (Memantul)",
      deskripsi: "Pantulan suara ketika membaca huruf Qalqalah yang bersukun (mati) atau diwaqafkan (diberhentikan).",
      ikon: "✨",
      data: [
        { 
          id: 1, nama: "Huruf Qalqalah", huruf: "ق ط ب ج د", 
          penjelasan: "Ada 5 huruf khusus di dalam Al-Quran yang jika berbaris Sukun (Mati), bunyinya harus memantul. Agar mudah diingat, huruf ini sering disingkat menjadi: BA-JU-DI-TO-QO.",
          caraBaca: "Disingkat: BA-JU-DI-TO-QO", contoh: "", artiContoh: "", warna: "sky" 
        },
        { 
          id: 2, nama: "Qalqalah Sugra (Kecil)", huruf: "Mati di tengah kata", 
          penjelasan: "Terjadi ketika huruf Qalqalah mati 'asli' (bersukun) dan posisinya berada di tengah-tengah ayat. Pantulannya harus dibaca dengan ringan, cepat, dan tidak boleh diputus.",
          caraBaca: "Pantulan Ringan/Kecil", contoh: "يَقْطَعُونَ", artiContoh: "Yaq-thouun", warna: "amber" 
        },
        { 
          id: 3, nama: "Qalqalah Kubra (Besar)", huruf: "Mati di akhir kata (Waqaf)", 
          penjelasan: "Terjadi ketika huruf Qalqalah berada di akhir ayat dan kita berhenti (Waqaf) di sana, sehingga huruf tersebut 'dimatikan' secara terpaksa. Pantulannya sangat kuat dan lebih jelas.",
          caraBaca: "Pantulan Kuat/Besar", contoh: "مِنْ مَسَدٍ", artiContoh: "Mim-masad (Pantulan D)", warna: "emerald" 
        }
      ]
    }
  };

  // 🎨 TEMA WARNA KARTU
  const themeCard = {
    sky: 'bg-sky-50 border-sky-200 text-sky-700 dark:bg-sky-900/20 dark:border-sky-800 dark:text-sky-300',
    emerald: 'bg-emerald-50 border-emerald-200 text-emerald-700 dark:bg-emerald-900/20 dark:border-emerald-800 dark:text-emerald-300',
    amber: 'bg-amber-50 border-amber-200 text-amber-700 dark:bg-amber-900/20 dark:border-amber-800 dark:text-amber-300',
    rose: 'bg-rose-50 border-rose-200 text-rose-700 dark:bg-rose-900/20 dark:border-rose-800 dark:text-rose-300',
    violet: 'bg-violet-50 border-violet-200 text-violet-700 dark:bg-violet-900/20 dark:border-violet-800 dark:text-violet-300'
  };

  const materiAktif = materiTajwid[kategoriAktif];

  return (
    <div className="max-w-5xl mx-auto py-4">
      
      {/* 🌸 HEADER */}
      <div className="bg-emerald-600 text-white rounded-[2rem] p-8 md:p-10 mb-8 text-center shadow-lg bg-gradient-to-br from-emerald-500 to-teal-700 dark:from-slate-800 dark:to-slate-900 border dark:border-slate-700 relative overflow-hidden">
        <div className="absolute top-2 right-6 opacity-20 text-6xl md:text-7xl animate-pulse">☁️</div>
        <div className="absolute bottom-4 left-10 opacity-20 text-5xl animate-bounce" style={{ animationDuration: '3s' }}>📖</div>

        <div className="relative z-10">
          <p className="text-emerald-100 dark:text-emerald-400 font-medium tracking-widest uppercase text-xs mb-2">
            Madrasah Digital 🌿
          </p>
          <h1 className="text-3xl md:text-5xl font-bold mb-3 drop-shadow-sm">
            Belajar Tajwid
          </h1>
          <p className="text-emerald-50 dark:text-slate-300 text-sm md:text-lg font-medium max-w-xl mx-auto">
            Mempelajari hukum bacaan Al-Quran agar tartil, indah, dan benar maknanya.
          </p>
        </div>
      </div>

      {/* 🗂️ TABS KATEGORI */}
      <div className="flex justify-center mb-8">
        <div className="bg-slate-100 dark:bg-slate-800 p-1.5 rounded-2xl md:rounded-full flex flex-wrap justify-center gap-1 shadow-inner border border-slate-200 dark:border-slate-700 w-full sm:w-auto">
          {Object.keys(materiTajwid).map((kategori) => (
            <button
              key={kategori}
              onClick={() => setKategoriAktif(kategori)}
              className={`px-4 sm:px-6 py-3 rounded-xl md:rounded-full font-bold transition-all text-xs sm:text-sm flex-1 sm:flex-none flex items-center justify-center gap-2
                ${kategoriAktif === kategori 
                  ? 'bg-white dark:bg-slate-700 text-emerald-600 dark:text-emerald-400 shadow-sm border border-slate-200 dark:border-slate-600' 
                  : 'text-slate-500 dark:text-slate-400 hover:text-emerald-600 hover:bg-slate-50 dark:hover:bg-slate-700'}`}
            >
              <span>{materiTajwid[kategori].ikon}</span>
              {kategori === 'nunMati' ? 'Nun Mati' : kategori === 'mimMati' ? 'Mim Mati' : 'Qalqalah'}
            </button>
          ))}
        </div>
      </div>

      {/* 📚 KONTEN MATERI AKTIF */}
      <div className="bg-white dark:bg-slate-800 rounded-[2rem] p-6 sm:p-8 md:p-10 shadow-sm border border-slate-100 dark:border-slate-700 mb-10 animate-fade-in">
        
        <div className="text-center mb-10">
          <h2 className="text-2xl md:text-3xl font-bold text-slate-800 dark:text-slate-100 mb-3">
            {materiAktif.judul}
          </h2>
          <p className="text-slate-500 dark:text-slate-400 font-medium max-w-2xl mx-auto">
            {materiAktif.deskripsi}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 h-full">
          {materiAktif.data.map((item) => (
            <div 
              key={item.id} 
              className={`rounded-3xl p-6 md:p-8 border-2 transition-transform hover:scale-[1.02] duration-300 relative overflow-hidden group flex flex-col h-full ${themeCard[item.warna]}`}
            >
              {/* Efek Kaca di Background Kanan Atas */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-white/40 dark:bg-slate-900/20 rounded-bl-[100px] -z-0"></div>
              
              <div className="relative z-10 flex flex-col flex-1">
                {/* Header Kartu */}
                <div className="flex justify-between items-start mb-5">
                  <h3 className="text-xl md:text-2xl font-black tracking-tight drop-shadow-sm">{item.nama}</h3>
                  <span className="bg-white/70 dark:bg-slate-900/50 px-3 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-widest shadow-sm">
                    {item.huruf.length < 5 ? 'Huruf' : 'Huruf-huruf'}
                  </span>
                </div>

                {/* Kotak Huruf Arab */}
                <div className="bg-white/60 dark:bg-slate-900/40 rounded-2xl p-4 mb-5 backdrop-blur-sm border border-white/50 dark:border-slate-700/50 shadow-inner">
                  <p className="text-center font-arab text-2xl md:text-3xl font-bold leading-loose text-slate-800 dark:text-slate-100" dir="rtl">
                    {item.huruf}
                  </p>
                </div>

                {/* 📖 KOTAK PENJELASAN (Fitur Baru!) */}
                <div className="mb-6 flex-1">
                  <p className="text-[13px] md:text-sm font-medium leading-relaxed opacity-90 text-justify">
                    {item.penjelasan}
                  </p>
                </div>

                {/* Cara Baca & Contoh di Bagian Bawah */}
                <div className="space-y-4 mt-auto">
                  <div className="bg-white/40 dark:bg-slate-900/30 p-3.5 rounded-xl">
                    <p className="text-[10px] md:text-[11px] font-bold uppercase tracking-widest opacity-70 mb-1">Cara Baca</p>
                    <p className="font-bold text-sm md:text-base">{item.caraBaca}</p>
                  </div>
                  
                  {item.contoh && (
                    <div className="pt-4 border-t-2 border-black/10 dark:border-white/10 flex justify-between items-center gap-4">
                      <div className="flex-1">
                        <p className="text-[10px] md:text-[11px] font-bold uppercase tracking-widest opacity-70 mb-1">Contoh</p>
                        <p className="font-medium text-xs md:text-sm italic">"{item.artiContoh}"</p>
                      </div>
                      <div className="bg-white/80 dark:bg-slate-800 px-4 py-2 rounded-xl shadow-sm border border-white dark:border-slate-600">
                        <p className="font-arab text-2xl md:text-3xl font-bold text-slate-800 dark:text-white" dir="rtl" style={{ lineHeight: '1.6' }}>
                          {item.contoh}
                        </p>
                      </div>
                    </div>
                  )}
                </div>
                
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}