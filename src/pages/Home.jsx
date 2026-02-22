import { Link } from 'react-router-dom';
import JadwalSholat from '../components/JadwalSholat';
import useQuranStore from '../store/useQuranStore';
import RandomDoa from '../components/RandomDoa';

export default function Home() {
  const { bookmark, moodHariIni, setMoodHariIni } = useQuranStore();

  const jam = new Date().getHours();
  let sapaan = 'Selamat Pagi 🌸';
  let pesan = 'Awali harimu dengan senyuman dan Bismillah! ✨';
  let bgWarna = 'from-emerald-500 to-emerald-700'; 
  
  if (jam >= 11 && jam < 15) {
    sapaan = 'Selamat Siang 🌻'; pesan = 'Jangan lupa istirahat sejenak dan sholat ya! 🦋';
  } else if (jam >= 15 && jam < 18) {
    sapaan = 'Selamat Sore ⛅'; pesan = 'Sore yang indah untuk bersantai sejenak! ☕🎀';
  } else if (jam >= 18 || jam < 3) {
    sapaan = 'Selamat Malam 🌙✨'; pesan = 'Selamat beristirahat, jangan lupa doa sebelum tidur ya! ☁️💤';
  }

  if (moodHariIni === 'sedih') {
    sapaan = 'Pelukan Hangat Untukmu 🫂'; pesan = 'Tarik napas pelan-pelan. Tidak apa-apa merasa lelah hari ini. Allah selalu bersamamu. ☁️🤍'; bgWarna = 'from-slate-500 to-slate-700';
  } else if (moodHariIni === 'sakit') {
    sapaan = 'Syafakallah / Syafakillah 🌿'; pesan = 'Semoga sakitmu menjadi penggugur dosa. Istirahatlah yang cukup dan jangan lupa minum obat ya. 🍵✨'; bgWarna = 'from-teal-500 to-teal-700';
  } else if (moodHariIni === 'haid') {
    sapaan = 'Masa Istirahat 🌸'; pesan = 'Meskipun sedang tidak sholat, dzikir dan senyummu hari ini tetap bernilai pahala yang besar. 💕'; bgWarna = 'from-rose-400 to-rose-600';
  } else if (moodHariIni === 'baik') {
    sapaan = 'Alhamdulillah! 🌟'; pesan = 'Semoga kebahagiaan dan keberkahan selalu menyertaimu sepanjang hari ini! ✨'; bgWarna = 'from-sky-400 to-sky-600';
  }

  return (
    <div className="max-w-5xl mx-auto">
      
      {/* 🌸 HEADER SAPAAN MANIS & MOOD TRACKER */}
      <div className={`text-white rounded-3xl p-8 md:p-10 mb-8 shadow-lg bg-gradient-to-br ${bgWarna} dark:from-slate-800 dark:to-slate-900 border dark:border-slate-700 relative overflow-hidden transition-colors duration-1000`}>
        <div className="absolute top-2 right-6 opacity-20 text-7xl select-none animate-pulse">☁️</div>
        <div className="absolute bottom-2 right-32 opacity-10 text-5xl select-none">✨</div>

        <div className="relative z-10">
          <h1 className="text-3xl md:text-5xl font-bold mb-3 tracking-wide drop-shadow-sm transition-all duration-500">
            {sapaan}
          </h1>
          <p className="text-white/90 dark:text-slate-300 text-lg md:text-xl font-medium mb-6 transition-all duration-500 min-h-[3rem]">
            {pesan}
          </p>

          <div className="flex flex-wrap gap-2 items-center mb-2">
            <span className="text-xs font-bold uppercase tracking-widest text-white/80 mr-2">
              Bagaimana hatimu hari ini?
            </span>
            <button onClick={() => setMoodHariIni('baik')} className={`px-4 py-2 rounded-full text-sm font-bold transition-all border ${moodHariIni === 'baik' ? 'bg-white text-sky-600 border-white shadow-md scale-105' : 'bg-white/20 text-white border-white/30 hover:bg-white/30'}`}>😊 Baik</button>
            <button onClick={() => setMoodHariIni('sedih')} className={`px-4 py-2 rounded-full text-sm font-bold transition-all border ${moodHariIni === 'sedih' ? 'bg-white text-slate-600 border-white shadow-md scale-105' : 'bg-white/20 text-white border-white/30 hover:bg-white/30'}`}>😔 Lelah / Sedih</button>
            <button onClick={() => setMoodHariIni('sakit')} className={`px-4 py-2 rounded-full text-sm font-bold transition-all border ${moodHariIni === 'sakit' ? 'bg-white text-teal-600 border-white shadow-md scale-105' : 'bg-white/20 text-white border-white/30 hover:bg-white/30'}`}>🤒 Sakit</button>
            <button onClick={() => setMoodHariIni('haid')} className={`px-4 py-2 rounded-full text-sm font-bold transition-all border ${moodHariIni === 'haid' ? 'bg-white text-rose-500 border-white shadow-md scale-105' : 'bg-white/20 text-white border-white/30 hover:bg-white/30'}`}>🩸 Siklus Haid</button>
            {moodHariIni && (
              <button onClick={() => setMoodHariIni(null)} className="px-3 py-2 rounded-full text-xs font-bold transition-all text-white/70 hover:text-white underline ml-auto">Reset</button>
            )}
          </div>
        </div>
      </div>

      <JadwalSholat />
      <RandomDoa />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
        
        {/* 🔖 KOTAK 1: Banner Terakhir Dibaca */}
        {bookmark ? (
          <div className="bg-emerald-50 dark:bg-slate-800/80 border border-emerald-200 dark:border-slate-700 rounded-3xl p-6 flex flex-col justify-between shadow-sm hover:shadow-md transition group h-full">
            <div className="flex items-start gap-4 mb-6">
              <div className="w-14 h-14 bg-emerald-100 dark:bg-slate-700 text-emerald-600 dark:text-emerald-400 rounded-2xl flex items-center justify-center text-2xl group-hover:scale-110 transition-transform shrink-0">🔖</div>
              <div>
                <p className="text-xs font-bold uppercase tracking-widest text-emerald-600/80 dark:text-emerald-500 mb-1">Terakhir Dibaca</p>
                <h3 className="font-bold text-xl text-slate-800 dark:text-slate-100 leading-tight">Surah {bookmark.namaSurah}</h3>
                <p className="text-slate-500 dark:text-slate-400 mt-1">Berhenti di Ayat {bookmark.nomorAyat}</p>
              </div>
            </div>
            <Link to={`/surah/${bookmark.surahId}#ayat-${bookmark.nomorAyat}`} className="w-full bg-emerald-600 hover:bg-emerald-700 text-white px-6 py-3.5 rounded-xl font-bold transition text-center shadow-sm hover:shadow-emerald-500/30">
              Lanjutkan Membaca &rarr;
            </Link>
          </div>
        ) : (
          <div className="bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-3xl p-6 flex flex-col items-center justify-center text-center h-full">
            <div className="text-4xl mb-3 grayscale opacity-50">📖</div>
            <p className="text-slate-500 dark:text-slate-400 font-medium">Belum ada surah yang ditandai.</p>
          </div>
        )}

        {/* 📖 KOTAK 2: Pintasan ke Daftar Surah */}
        <div className="bg-white dark:bg-slate-800 border border-slate-100 dark:border-slate-700 rounded-3xl p-6 flex flex-col justify-between shadow-sm hover:shadow-emerald-500/10 hover:border-emerald-300 dark:hover:border-emerald-600 transition group h-full">
          <div className="flex items-start gap-4 mb-6">
            <div className="w-14 h-14 bg-emerald-50 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400 rounded-2xl flex items-center justify-center text-2xl group-hover:scale-110 transition-transform shrink-0">✨</div>
            <div>
              <p className="text-xs font-bold uppercase tracking-widest text-emerald-500 mb-1">Mulai Membaca</p>
              <h3 className="font-bold text-xl text-slate-800 dark:text-slate-100 leading-tight">Jelajahi Al-Quran</h3>
              <p className="text-slate-500 dark:text-slate-400 mt-1">Baca 114 Surah lengkap dengan tafsir dan audio.</p>
            </div>
          </div>
          <Link to="/quran" className="w-full bg-emerald-50 hover:bg-emerald-100 text-emerald-700 dark:bg-slate-700 dark:text-emerald-300 dark:hover:bg-slate-600 px-6 py-3.5 rounded-xl font-bold transition text-center border border-emerald-200 dark:border-slate-600">
            Buka Daftar Surah &rarr;
          </Link>
        </div>

      </div>

    </div>
  );
}