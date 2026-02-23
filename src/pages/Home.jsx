import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import JadwalSholat from '../components/JadwalSholat';
import useQuranStore from '../store/useQuranStore';
import RandomDoa from '../components/RandomDoa';

export default function Home() {
  const { bookmark, moodHariIni, setMoodHariIni, catatanKalender } = useQuranStore();
  
  // State untuk Notifikasi Kalender
  const [notifAgenda, setNotifAgenda] = useState(null);
  
  // 🚀 STATE BARU: Untuk Data Widget Khatam
  const [khatamData, setKhatamData] = useState({ target: null, progress: [] });

  // 🔔 LOGIKA PENDETEKSI TANGGAL & DATA KHATAM
  useEffect(() => {
    // --- 1. Logika Notifikasi Kalender ---
    const dateObj = new Date();
    const dd = String(dateObj.getDate()).padStart(2, '0');
    const mm = String(dateObj.getMonth() + 1).padStart(2, '0');
    const yyyy = dateObj.getFullYear();
    const tglHariIni = `${dd}-${mm}-${yyyy}`;

    const agendaHariIni = catatanKalender[tglHariIni];
    // const sudahDinotif = sessionStorage.getItem('notifAgendaHariIni');

    if (agendaHariIni) {
      setNotifAgenda(agendaHariIni);
    }

    // --- 2. Logika Widget Khatam ---
    const memoriTarget = localStorage.getItem('khatamTarget');
    const memoriProgress = localStorage.getItem('khatamProgress');
    
    if (memoriTarget && memoriProgress) {
      setKhatamData({
        target: parseInt(memoriTarget),
        progress: JSON.parse(memoriProgress)
      });
    }
  }, [catatanKalender]);

  const tanganiNotif = (aktifkanComfortMode) => {
    if (aktifkanComfortMode && notifAgenda.tipe === 'haid') {
      setMoodHariIni('haid');
    }
    setNotifAgenda(null);
  };

  // 🧮 MENGHITUNG PERSENTASE KHATAM UNTUK WIDGET
  const hariSelesai = khatamData.progress.filter(status => status === true).length;
  const persentaseKhatam = khatamData.target ? Math.round((hariSelesai / khatamData.target) * 100) : 0;

  // 🌸 LOGIKA WAKTU & SAPAAN
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

  // 🫂 LOGIKA COMFORT MODE
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
    <div className="max-w-5xl mx-auto relative">

      {/* ========================================================= */}
      {/* 🔔 POP-UP NOTIFIKASI KALENDER                           */}
      {/* ========================================================= */}
      {notifAgenda && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-[100] flex items-center justify-center p-4 animate-fade-in">
          <div className="bg-white dark:bg-slate-800 rounded-[2rem] p-8 max-w-sm w-full text-center shadow-2xl border border-slate-100 dark:border-slate-700">
            <div className="text-6xl mb-4 animate-bounce" style={{ animationDuration: '2s' }}>
              {notifAgenda.tipe === 'haid' ? '🩸' : notifAgenda.tipe === 'puasa' ? '🌙' : '📝'}
            </div>
            <h3 className="text-2xl font-bold text-slate-800 dark:text-white mb-2">Pengingat Hari Ini!</h3>
            <p className="text-slate-600 dark:text-slate-300 mb-4 font-medium">
              {notifAgenda.tipe === 'haid' ? 'Hari ini adalah jadwal siklus haidmu.' : notifAgenda.tipe === 'puasa' ? 'Hari ini kamu punya jadwal puasa sunnah.' : 'Kamu punya catatan khusus untuk hari ini:'}
            </p>
            {notifAgenda.teks && (
              <div className="bg-emerald-50 dark:bg-slate-700/50 p-4 rounded-2xl mb-6 border border-emerald-100 dark:border-slate-600">
                <span className="font-bold text-emerald-700 dark:text-emerald-400">"{notifAgenda.teks}"</span>
              </div>
            )}
            <div className="flex flex-col gap-3 mt-2">
              {notifAgenda.tipe === 'haid' && (
                <button onClick={() => tanganiNotif(true)} className="w-full bg-rose-500 text-white font-bold py-3.5 rounded-xl hover:bg-rose-600 shadow-md transition-all active:scale-95 flex justify-center items-center gap-2">
                  <span>🌸</span> Aktifkan Comfort Mode
                </button>
              )}
              <button onClick={() => tanganiNotif(false)} className={`w-full font-bold py-3.5 rounded-xl shadow-sm transition-all active:scale-95 ${notifAgenda.tipe === 'haid' ? 'bg-slate-100 text-slate-600 hover:bg-slate-200' : 'bg-emerald-600 text-white hover:bg-emerald-700'}`}>
                {notifAgenda.tipe === 'haid' ? 'Tutup Saja' : 'Baik, Terima Kasih! ✨'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 🌸 HEADER SAPAAN MANIS */}
      <div className={`text-white rounded-3xl p-8 md:p-10 mb-8 shadow-lg bg-gradient-to-br ${bgWarna} dark:from-slate-800 dark:to-slate-900 border dark:border-slate-700 relative overflow-hidden transition-colors duration-1000`}>
        
        <div className="absolute top-2 right-6 opacity-20 text-7xl select-none animate-pulse">☁️</div>
        <div className="absolute bottom-2 right-32 opacity-10 text-5xl select-none">✨</div>

        <div className="relative z-10">
          <h1 className="text-3xl md:text-5xl font-bold mb-3 tracking-wide">{sapaan}</h1>
          <p className="text-white/90 dark:text-slate-300 text-lg md:text-xl font-medium mb-6 min-h-[3rem]">{pesan}</p>

          <div className="flex flex-wrap gap-2 items-center mb-2">
            <span className="text-xs font-bold uppercase tracking-widest text-white/80 mr-2">Bagaimana hatimu?</span>
            <button onClick={() => setMoodHariIni('baik')} className={`px-4 py-2 rounded-full text-sm font-bold border transition-all ${moodHariIni === 'baik' ? 'bg-white text-sky-600 shadow-md scale-105' : 'bg-white/20 text-white hover:bg-white/30'}`}>😊 Baik</button>
            <button onClick={() => setMoodHariIni('sedih')} className={`px-4 py-2 rounded-full text-sm font-bold border transition-all ${moodHariIni === 'sedih' ? 'bg-white text-slate-600 shadow-md scale-105' : 'bg-white/20 text-white hover:bg-white/30'}`}>😔 Lelah</button>
            <button onClick={() => setMoodHariIni('sakit')} className={`px-4 py-2 rounded-full text-sm font-bold border transition-all ${moodHariIni === 'sakit' ? 'bg-white text-teal-600 shadow-md scale-105' : 'bg-white/20 text-white hover:bg-white/30'}`}>🤒 Sakit</button>
            <button onClick={() => setMoodHariIni('haid')} className={`px-4 py-2 rounded-full text-sm font-bold border transition-all ${moodHariIni === 'haid' ? 'bg-white text-rose-500 shadow-md scale-105' : 'bg-white/20 text-white hover:bg-white/30'}`}>🩸 Haid</button>
            {moodHariIni && <button onClick={() => setMoodHariIni(null)} className="px-3 py-2 text-xs text-white/70 hover:text-white underline ml-auto">Reset</button>}
          </div>
        </div>
      </div>

      <JadwalSholat />
      <RandomDoa />

      {/* ========================================================= */}
      {/* 🎯 WIDGET: PROGRES KHATAM AL-QURAN                        */}
      {/* ========================================================= */}
      {khatamData.target ? (
        <div className="bg-white dark:bg-slate-800 rounded-[2rem] p-6 md:p-8 shadow-sm border border-slate-100 dark:border-slate-700 mb-6 flex flex-col md:flex-row items-center justify-between gap-6 group hover:border-sky-300 dark:hover:border-sky-700 transition-colors relative overflow-hidden">
          <div className="absolute -right-4 -bottom-4 text-8xl opacity-5 group-hover:scale-110 transition-transform duration-500">📖</div>
          
          <div className="flex-1 w-full relative z-10">
            <div className="flex items-center gap-3 mb-2">
              <span className="text-2xl">🎯</span>
              <h3 className="font-bold text-xl text-slate-800 dark:text-white">Progres Khatammu</h3>
            </div>
            <p className="text-slate-500 dark:text-slate-400 text-sm md:text-base mb-4">
              Kamu telah menyelesaikan <strong className="text-sky-600 dark:text-sky-400">{hariSelesai} hari</strong> dari total target <strong className="text-slate-700 dark:text-slate-300">{khatamData.target} hari</strong>.
            </p>
            
            <div className="flex items-center gap-4">
              <div className="w-full bg-slate-100 dark:bg-slate-700 h-3.5 rounded-full overflow-hidden shadow-inner">
                <div 
                  className="h-full bg-gradient-to-r from-sky-400 to-indigo-500 transition-all duration-1000 ease-out" 
                  style={{ width: `${persentaseKhatam}%` }}
                ></div>
              </div>
              <span className="font-black text-sky-600 dark:text-sky-400">{persentaseKhatam}%</span>
            </div>
          </div>

          <Link to="/khatam" className="w-full md:w-auto shrink-0 bg-sky-50 text-sky-600 dark:bg-sky-900/30 dark:text-sky-400 border border-sky-200 dark:border-sky-800/50 hover:bg-sky-100 dark:hover:bg-sky-900/50 px-8 py-3.5 rounded-full font-bold transition-all active:scale-95 text-center z-10 shadow-sm">
            Update Misi 🚀
          </Link>
        </div>
      ) : (
        <div className="bg-gradient-to-r from-sky-50 to-indigo-50 dark:from-slate-800 dark:to-slate-800/80 rounded-[2rem] p-6 md:p-8 shadow-sm border border-sky-100 dark:border-slate-700 mb-6 flex flex-col sm:flex-row items-center justify-between gap-4 group">
          <div className="flex items-center gap-4 text-center sm:text-left">
            <div className="w-14 h-14 bg-sky-100 dark:bg-slate-700 text-sky-600 dark:text-sky-400 rounded-2xl flex items-center justify-center text-2xl shrink-0 shadow-inner group-hover:scale-110 transition-transform">🎯</div>
            <div>
              <h3 className="font-bold text-lg text-slate-800 dark:text-white">Punya Target Khatam?</h3>
              <p className="text-sm text-slate-500 dark:text-slate-400">Buat jadwal rutin bacaan harianmu sekarang, biar makin konsisten!</p>
            </div>
          </div>
          <Link to="/khatam" className="w-full sm:w-auto shrink-0 bg-sky-600 hover:bg-sky-700 text-white px-6 py-3 rounded-full font-bold transition-all shadow-md shadow-sky-500/20 active:scale-95 text-center">
            Buat Target ✨
          </Link>
        </div>
      )}

      {/* ========================================================= */}
      {/* 🔖 KOTAK AL-QURAN: TERAKHIR DIBACA & DAFTAR SURAH         */}
      {/* ========================================================= */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
        
        {/* KOTAK 1: Banner Terakhir Dibaca */}
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

        {/* KOTAK 2: Pintasan ke Daftar Surah */}
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