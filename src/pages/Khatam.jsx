import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

export default function Khatam() {
  const [targetHari, setTargetHari] = useState(30);
  const [hasil, setHasil] = useState(null);
  
  // 🚀 STATE BARU UNTUK TRACKER
  const [isTracking, setIsTracking] = useState(false);
  const [progressData, setProgressData] = useState([]);

  // 🧮 LOGIKA PERHITUNGAN KHATAM
  const hitungTarget = (hari) => {
    const totalHalaman = 604;
    const totalJuz = 30;

    if (!hari || hari <= 0) {
      setHasil(null);
      return;
    }

    const halamanPerHari = Math.ceil(totalHalaman / hari);
    const halamanPerSholat = Math.ceil(halamanPerHari / 5);
    const juzPerHari = (totalJuz / hari).toFixed(1);

    setHasil({
      hari,
      halamanPerHari,
      halamanPerSholat,
      juzPerHari: juzPerHari.replace('.0', ''),
    });
  };

  // 💾 MENGAMBIL DATA DARI MEMORI HP SAAT DIBUKA
  useEffect(() => {
    const memoriTarget = localStorage.getItem('khatamTarget');
    const memoriProgress = localStorage.getItem('khatamProgress');

    if (memoriTarget && memoriProgress) {
      const hari = parseInt(memoriTarget);
      setTargetHari(hari);
      setProgressData(JSON.parse(memoriProgress));
      setIsTracking(true);
      hitungTarget(hari);
    } else {
      hitungTarget(30); // Default jika belum ada program
    }
  }, []);

  // 🏁 MEMULAI PROGRAM BARU
  const mulaiProgram = () => {
    localStorage.setItem('khatamTarget', targetHari);
    const progressAwal = Array(targetHari).fill(false); // Membuat deretan 'false' sebanyak target hari
    localStorage.setItem('khatamProgress', JSON.stringify(progressAwal));
    
    setProgressData(progressAwal);
    setIsTracking(true);
  };

  // ✅ MENCEKLIS HARI
  const toggleHari = (index) => {
    const progressBaru = [...progressData];
    progressBaru[index] = !progressBaru[index]; // Ubah dari false ke true (atau sebaliknya)
    
    setProgressData(progressBaru);
    localStorage.setItem('khatamProgress', JSON.stringify(progressBaru)); // Simpan ke memori
  };

  // 🔄 MENGULANG/MENGHAPUS PROGRAM
  const resetProgram = () => {
    if (window.confirm('Yakin ingin mereset targetmu? Semua progres ceklis akan hilang lho. 🥺')) {
      localStorage.removeItem('khatamTarget');
      localStorage.removeItem('khatamProgress');
      setIsTracking(false);
      setTargetHari(30);
      hitungTarget(30);
    }
  };

  // Menghitung Persentase Progress
  const hariSelesai = progressData.filter(status => status === true).length;
  const persentase = hasil ? Math.round((hariSelesai / hasil.hari) * 100) : 0;

  return (
    <div className="max-w-5xl mx-auto py-4 animate-fade-in">
      
      {/* 🌸 HEADER */}
      <div className={`text-white rounded-[2rem] p-8 md:p-12 mb-8 text-center shadow-lg transition-colors duration-700 relative overflow-hidden ${isTracking ? 'bg-gradient-to-br from-sky-500 to-indigo-700 dark:from-slate-800 dark:to-slate-900' : 'bg-gradient-to-br from-emerald-500 to-teal-700 dark:from-slate-800 dark:to-slate-900'}`}>
        <div className="absolute top-4 right-10 opacity-20 text-6xl md:text-7xl animate-pulse">🎯</div>
        <div className="absolute bottom-4 left-6 opacity-20 text-5xl animate-bounce" style={{ animationDuration: '3s' }}>📖</div>

        <div className="relative z-10">
          <p className="text-white/80 font-bold tracking-widest uppercase text-xs mb-2">
            Smart Target Planner ✨
          </p>
          <h1 className="text-3xl md:text-5xl font-bold mb-4 drop-shadow-sm">
            {isTracking ? 'Progres Khatam' : 'Perencana Khatam'}
          </h1>
          <p className="text-white/90 text-sm md:text-lg font-medium max-w-xl mx-auto">
            {isTracking ? 'Konsistensi adalah kunci. Mari selesaikan target bacaanmu hari ini!' : 'Tentukan targetmu, dan biarkan sistem memandu porsi bacaan harianmu agar khatam tepat waktu.'}
          </p>
        </div>
      </div>

      {/* ======================================================== */}
      {/* 🖥️ MODE 1: SETUP TARGET (Muncul jika belum mulai)        */}
      {/* ======================================================== */}
      {!isTracking && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          <div className="md:col-span-1 bg-white dark:bg-slate-800 rounded-[2rem] p-8 shadow-sm border border-slate-100 dark:border-slate-700 flex flex-col justify-center items-center text-center">
            <div className="text-5xl mb-4">⏱️</div>
            <h3 className="text-xl font-bold text-slate-800 dark:text-white mb-2">Target Khatam</h3>
            <p className="text-sm text-slate-500 dark:text-slate-400 mb-6">Berapa hari waktu yang kamu inginkan untuk menyelesaikan 30 Juz?</p>
            
            <div className="flex items-center justify-center gap-3 bg-slate-50 dark:bg-slate-900/50 p-4 rounded-2xl border border-slate-200 dark:border-slate-700 w-full mb-4">
              <input 
                type="number" min="1" max="365"
                value={targetHari || ''}
                onChange={(e) => {
                  const nilai = parseInt(e.target.value);
                  setTargetHari(nilai);
                  hitungTarget(nilai);
                }}
                className="w-20 text-center text-3xl font-black text-emerald-600 dark:text-emerald-400 bg-transparent border-b-2 border-emerald-300 focus:border-emerald-600 outline-none transition-colors"
              />
              <span className="text-lg font-bold text-slate-600 dark:text-slate-300">Hari</span>
            </div>
            
            <div className="flex flex-wrap justify-center gap-2">
              <button onClick={() => {setTargetHari(7); hitungTarget(7);}} className="px-3 py-1.5 bg-emerald-50 text-emerald-600 dark:bg-slate-700 dark:text-emerald-400 text-xs font-bold rounded-full hover:bg-emerald-100 transition">1 Minggu</button>
              <button onClick={() => {setTargetHari(30); hitungTarget(30);}} className="px-3 py-1.5 bg-emerald-50 text-emerald-600 dark:bg-slate-700 dark:text-emerald-400 text-xs font-bold rounded-full hover:bg-emerald-100 transition">1 Bulan</button>
            </div>
          </div>

          <div className="md:col-span-2 space-y-4">
            {hasil ? (
              <>
                <div className="bg-emerald-50 dark:bg-slate-800/80 border border-emerald-200 dark:border-slate-700 rounded-3xl p-6 flex items-start gap-4">
                  <div className="text-3xl animate-bounce" style={{ animationDuration: '2s' }}>💡</div>
                  <div>
                    <h4 className="font-bold text-emerald-800 dark:text-emerald-400 text-lg mb-1">Misi yang Sangat Mungkin!</h4>
                    <p className="text-slate-600 dark:text-slate-300 text-sm md:text-base leading-relaxed">
                      Untuk khatam dalam <strong className="text-emerald-600 dark:text-emerald-400">{hasil.hari} hari</strong>, kamu harus membaca <strong className="text-emerald-600 dark:text-emerald-400">{hasil.halamanPerHari} halaman</strong> per hari. Agar terasa sangat ringan, cukup baca <strong className="text-emerald-600 dark:text-emerald-400">{hasil.halamanPerSholat} halaman</strong> setiap selesai sholat fardhu!
                    </p>
                  </div>
                </div>

                <button 
                  onClick={mulaiProgram}
                  className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xl py-5 rounded-3xl shadow-lg shadow-emerald-500/30 transition-all active:scale-95 flex items-center justify-center gap-3"
                >
                  🚀 Mulai Program Khatam Ini!
                </button>
              </>
            ) : (
              <div className="h-full bg-slate-50 dark:bg-slate-800/50 rounded-[2rem] flex items-center justify-center p-8 text-center border border-dashed border-slate-200 dark:border-slate-700">
                <p className="text-slate-500 font-medium">Masukkan jumlah hari di panel sebelah kiri.</p>
              </div>
            )}
          </div>
        </div>
      )}

      {/* ======================================================== */}
      {/* 🚀 MODE 2: TRACKER DASHBOARD (Muncul saat program jalan) */}
      {/* ======================================================== */}
      {isTracking && hasil && (
        <div className="animate-fade-in pb-10">
          
          {/* Baris Ringkasan Misi */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
            <div className="bg-white dark:bg-slate-800 p-5 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-700 text-center">
              <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-1">Target Selesai</p>
              <p className="text-2xl font-black text-sky-600 dark:text-sky-400">{hasil.hari} Hari</p>
            </div>
            <div className="bg-white dark:bg-slate-800 p-5 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-700 text-center">
              <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-1">Misi Harian</p>
              <p className="text-2xl font-black text-emerald-600 dark:text-emerald-400">{hasil.halamanPerHari} Hal</p>
            </div>
            <div className="bg-white dark:bg-slate-800 p-5 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-700 text-center">
              <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-1">Misi Per Sholat</p>
              <p className="text-2xl font-black text-amber-500">{hasil.halamanPerSholat} Hal</p>
            </div>
            <div className="bg-white dark:bg-slate-800 p-5 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-700 text-center">
              <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-1">Rata-rata Juz</p>
              <p className="text-2xl font-black text-rose-500">{hasil.juzPerHari} Juz</p>
            </div>
          </div>

          {/* Progress Bar Persentase */}
          <div className="bg-white dark:bg-slate-800 p-6 md:p-8 rounded-[2rem] shadow-sm border border-slate-100 dark:border-slate-700 mb-8">
            <div className="flex justify-between items-end mb-4">
              <div>
                <h3 className="text-xl font-bold text-slate-800 dark:text-white">Jejak Langkahmu</h3>
                <p className="text-sm text-slate-500 font-medium">{hariSelesai} dari {hasil.hari} hari telah diselesaikan.</p>
              </div>
              <span className="text-3xl font-black text-sky-600 dark:text-sky-400">{persentase}%</span>
            </div>
            <div className="w-full bg-slate-100 dark:bg-slate-700 h-6 rounded-full overflow-hidden shadow-inner">
              <div 
                className="h-full bg-gradient-to-r from-sky-400 to-indigo-500 transition-all duration-1000 ease-out flex items-center justify-end pr-2"
                style={{ width: `${persentase}%` }}
              >
                {persentase > 10 && <span className="text-[10px] text-white font-bold opacity-80">🔥</span>}
              </div>
            </div>
            
            {persentase === 100 && (
              <div className="mt-6 bg-amber-50 dark:bg-amber-900/30 border border-amber-200 p-4 rounded-xl text-center animate-pulse">
                <span className="text-2xl block mb-2">🎉🏆✨</span>
                <p className="font-bold text-amber-700 dark:text-amber-400">Alhamdulillah! Kamu berhasil menyelesaikan khatam Al-Quran sesuai target!</p>
              </div>
            )}
          </div>

          {/* Papan Ceklis Hari (Grid) */}
          <div className="bg-white dark:bg-slate-800 p-6 md:p-8 rounded-[2rem] shadow-sm border border-slate-100 dark:border-slate-700 mb-8">
            <h3 className="text-lg font-bold text-slate-800 dark:text-white mb-6 flex items-center gap-2">
              <span>📅</span> Tandai Hari yang Selesai
            </h3>
            
            <div className="grid grid-cols-4 sm:grid-cols-5 md:grid-cols-7 lg:grid-cols-10 gap-3">
              {progressData.map((selesai, index) => (
                <button
                  key={index}
                  onClick={() => toggleHari(index)}
                  className={`aspect-square rounded-2xl flex flex-col items-center justify-center transition-all duration-300 border-2 ${
                    selesai 
                    ? 'bg-sky-500 border-sky-500 shadow-md shadow-sky-500/30 text-white scale-105' 
                    : 'bg-slate-50 dark:bg-slate-900/50 border-slate-100 dark:border-slate-700 text-slate-400 hover:border-sky-300 dark:hover:border-sky-700'
                  }`}
                >
                  <span className="text-[10px] font-bold uppercase tracking-widest opacity-80">Hari</span>
                  <span className={`text-xl font-black ${selesai ? 'text-white' : 'text-slate-600 dark:text-slate-300'}`}>
                    {index + 1}
                  </span>
                  {selesai && <span className="text-xs absolute top-1 right-1">✨</span>}
                </button>
              ))}
            </div>
          </div>

          {/* Tombol Aksi Bawah */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/quran" className="bg-sky-600 hover:bg-sky-700 text-white font-bold px-8 py-3.5 rounded-full shadow-md transition-all active:scale-95 text-center">
              📖 Lanjut Baca Quran
            </Link>
            <button onClick={resetProgram} className="bg-rose-50 text-rose-600 dark:bg-rose-900/30 dark:text-rose-400 border border-rose-200 dark:border-rose-800/50 hover:bg-rose-100 font-bold px-8 py-3.5 rounded-full transition-all active:scale-95 text-center">
              🔄 Reset / Ubah Target
            </button>
          </div>

        </div>
      )}

    </div>
  );
}