import { useState, useEffect } from 'react';
import useQuranStore from '../store/useQuranStore';

// Kumpulan pesan dibagi berdasarkan Mood!
const databaseQuotes = {
  sedih: [
    { teks: "Maka sesungguhnya bersama kesulitan ada kemudahan.", sumber: "QS. Al-Insyirah: 5" },
    { teks: "Jangan bersedih, sesungguhnya Allah bersama kita.", sumber: "QS. At-Taubah: 40" },
    { teks: "Dan bersabarlah (Muhammad) menunggu ketetapan Tuhanmu, karena sesungguhnya engkau berada dalam pengawasan Kami.", sumber: "QS. At-Tur: 48" }
  ],
  sakit: [
    { teks: "Tidaklah seorang muslim tertimpa rasa sakit, kelelahan, atau kesedihan, melainkan Allah akan menghapus dosa-dosanya.", sumber: "HR. Bukhari" },
    { teks: "Boleh jadi kamu membenci sesuatu, padahal ia amat baik bagimu.", sumber: "QS. Al-Baqarah: 216" },
    { teks: "Dan apabila aku sakit, Dialah (Allah) yang menyembuhkan aku.", sumber: "QS. Asy-Syu'ara: 80" }
  ],
  haid: [
    { teks: "Senyummu di hadapan saudaramu adalah sedekah.", sumber: "HR. Tirmidzi" },
    { teks: "Sesungguhnya Allah menyukai orang-orang yang bertaubat dan menyukai orang-orang yang mensucikan diri.", sumber: "QS. Al-Baqarah: 222" },
    { teks: "Barangsiapa yang meringankan penderitaan orang lain, Allah akan meringankan penderitaannya di dunia dan akhirat.", sumber: "HR. Muslim" }
  ],
  netral: [
    { teks: "Barangsiapa bertakwa kepada Allah niscaya Dia akan mengadakan baginya jalan keluar.", sumber: "QS. At-Talaq: 2" },
    { teks: "Doa adalah senjata seorang mukmin dan tiang agama serta cahaya langit dan bumi.", sumber: "HR. Abu Ya'la" },
    { teks: "Tidak ada balasan kebaikan kecuali kebaikan (pula).", sumber: "QS. Ar-Rahman: 60" }
  ]
};

export default function QuotePopup() {
  const [tampil, setTampil] = useState(false);
  const [quote, setQuote] = useState(null);
  
  // Panggil memori Mood dari Gudang
  const { moodHariIni } = useQuranStore();

  useEffect(() => {
    // 1. Tentukan kategori quote berdasarkan mood
    let kategori = 'netral';
    if (moodHariIni === 'sedih') kategori = 'sedih';
    if (moodHariIni === 'sakit') kategori = 'sakit';
    if (moodHariIni === 'haid') kategori = 'haid';
    // Kalau 'baik' atau null, masuk ke netral

    const kumpulanPilihan = databaseQuotes[kategori];
    const acak = Math.floor(Math.random() * kumpulanPilihan.length);
    setQuote(kumpulanPilihan[acak]);

    // 2. Tunda kemunculannya (agar tidak kaget)
    const timerMuncul = setTimeout(() => {
      setTampil(true);
    }, 2500);

    // 3. Otomatis tutup setelah 15 detik
    const timerHilang = setTimeout(() => {
      setTampil(false);
    }, 15000);

    return () => {
      clearTimeout(timerMuncul);
      clearTimeout(timerHilang);
    };
  }, [moodHariIni]); // Efek ini akan diulang kalau mood-nya berubah!

  if (!quote) return null;

  // Sesuaikan ikon dan warna pop-up dengan mood
  let ikon = '💌';
  let warnaTeks = 'text-emerald-500';
  if (moodHariIni === 'sedih') { ikon = '🫂'; warnaTeks = 'text-slate-500'; }
  if (moodHariIni === 'sakit') { ikon = '🌿'; warnaTeks = 'text-teal-500'; }
  if (moodHariIni === 'haid') { ikon = '🌸'; warnaTeks = 'text-rose-400'; }
  if (moodHariIni === 'baik') { ikon = '🌟'; warnaTeks = 'text-sky-500'; }

  return (
    <div 
      className={`fixed bottom-6 right-6 md:bottom-10 md:right-10 z-[100] max-w-sm w-[85vw] md:w-full transition-all duration-1000 ease-out transform ${
        tampil ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0 pointer-events-none'
      }`}
    >
      <div className="bg-white dark:bg-slate-800 rounded-3xl p-5 md:p-6 shadow-2xl border border-slate-100 dark:border-slate-700 relative overflow-hidden group">
        
        <div className="absolute -top-4 -right-4 text-6xl opacity-5 group-hover:rotate-12 transition-transform duration-500 select-none">
          {ikon}
        </div>
        
        <button 
          onClick={() => setTampil(false)}
          className="absolute top-3 right-3 text-slate-400 hover:text-red-400 hover:bg-red-50 dark:hover:bg-slate-700 transition w-7 h-7 rounded-full flex items-center justify-center text-xs z-10"
        >
          ✕
        </button>

        <div className="flex gap-4 items-start pr-6 relative z-10">
          <div className="text-3xl md:text-4xl animate-bounce" style={{ animationDuration: '3s' }}>
            {ikon}
          </div>
          <div>
            <p className={`text-[10px] md:text-xs font-bold uppercase tracking-widest mb-1 ${warnaTeks}`}>
              {moodHariIni === 'sedih' ? 'Pengingat Sabar ✨' : moodHariIni === 'sakit' ? 'Doa Kesembuhan ✨' : 'Pesan Untukmu ✨'}
            </p>
            <p className="text-slate-700 dark:text-slate-300 font-medium text-sm md:text-base leading-relaxed mb-3 italic font-serif">
              "{quote.teks}"
            </p>
            <p className="text-xs text-slate-500 dark:text-slate-400 font-bold">
              — {quote.sumber}
            </p>
          </div>
        </div>

      </div>
    </div>
  );
}