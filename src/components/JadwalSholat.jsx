import { useState, useEffect } from 'react';
import axios from 'axios';

export default function JadwalSholat() {
  const [jadwal, setJadwal] = useState(null);
  const [lokasi, setLokasi] = useState('Mendeteksi lokasi... 📍');
  const [waktuSekarang, setWaktuSekarang] = useState(new Date());
  
  // State Baru: Untuk Fitur Ganti Kota Manual
  const [modeCari, setModeCari] = useState(false);
  const [inputKota, setInputKota] = useState('');
  
  const [infoSelanjutnya, setInfoSelanjutnya] = useState({ 
    nama: '', waktu: '', sisa: '', ikon: '' 
  });

  // 1. FUNGSI AMBIL JADWAL BERDASARKAN KOORDINAT (GPS OTOMATIS)
  const fetchJadwalGPS = async (lat, lon, namaKota) => {
    try {
      const res = await axios.get(`https://api.aladhan.com/v1/timings?latitude=${lat}&longitude=${lon}&method=20`);
      const dataWaktu = res.data.data.timings;
      
      // Imsak sekarang ditambahkan!
      setJadwal({
        Imsak: dataWaktu.Imsak,
        Subuh: dataWaktu.Fajr,
        Dzuhur: dataWaktu.Dhuhr,
        Ashar: dataWaktu.Asr,
        Maghrib: dataWaktu.Maghrib,
        Isya: dataWaktu.Isha
      });
      setLokasi(namaKota);
    } catch (err) {
      console.error('Gagal mengambil jadwal', err);
      setLokasi('Gagal memuat lokasi 🥺');
    }
  };

  // 2. FUNGSI AMBIL JADWAL BERDASARKAN NAMA KOTA (MANUAL)
  const fetchJadwalKota = async (e) => {
    e.preventDefault();
    if (!inputKota.trim()) return;

    setLokasi('Mencari kota... 🔍');
    setModeCari(false); // Tutup form pencarian
    setJadwal(null); // Tampilkan animasi loading sebentar

    try {
      // Menggunakan endpoint timingsByCity dari Aladhan
      const res = await axios.get(`https://api.aladhan.com/v1/timingsByCity?city=${inputKota}&country=Indonesia&method=20`);
      const dataWaktu = res.data.data.timings;

      setJadwal({
        Imsak: dataWaktu.Imsak,
        Subuh: dataWaktu.Fajr,
        Dzuhur: dataWaktu.Dhuhr,
        Ashar: dataWaktu.Asr,
        Maghrib: dataWaktu.Maghrib,
        Isya: dataWaktu.Isha
      });
      setLokasi(inputKota.toUpperCase());
      setInputKota('');
    } catch (err) {
      alert('Waduh, kota tidak ditemukan. Pastikan nama kotanya benar ya!');
      setLokasi('Kota Tidak Ditemukan');
    }
  };

  // 3. EFEK PERTAMA KALI JALAN: MINTA LOKASI GPS
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async (pos) => {
          const { latitude, longitude } = pos.coords;
          try {
            const geoRes = await axios.get(`https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${latitude}&longitude=${longitude}&localityLanguage=id`);
            const kota = geoRes.data.city || geoRes.data.locality || 'Lokasi Anda';
            fetchJadwalGPS(latitude, longitude, kota);
          } catch {
            fetchJadwalGPS(latitude, longitude, 'Lokasi Anda');
          }
        },
        () => {
          // Jika GPS ditolak
          fetchJadwalGPS(-6.2088, 106.8456, 'JAKARTA (Default)');
        }
      );
    } else {
      fetchJadwalGPS(-6.2088, 106.8456, 'JAKARTA (Default)');
    }
  }, []);

  // 4. EFEK JAM BERJALAN & LOGIKA HITUNG MUNDUR
  useEffect(() => {
    const timer = setInterval(() => {
      const sekarang = new Date();
      setWaktuSekarang(sekarang);

      if (jadwal) {
        // Imsak ditambahkan ke dalam siklus putaran waktu
        const listSholat = [
          { nama: 'Imsak', waktuStr: jadwal.Imsak, ikon: '✨' },
          { nama: 'Subuh', waktuStr: jadwal.Subuh, ikon: '🌅' },
          { nama: 'Dzuhur', waktuStr: jadwal.Dzuhur, ikon: '☀️' },
          { nama: 'Ashar', waktuStr: jadwal.Ashar, ikon: '🌤️' },
          { nama: 'Maghrib', waktuStr: jadwal.Maghrib, ikon: '🌇' },
          { nama: 'Isya', waktuStr: jadwal.Isya, ikon: '🌙' },
        ];

        let sholatBerikutnya = null;

        for (let i = 0; i < listSholat.length; i++) {
          const [jam, menit] = listSholat[i].waktuStr.split(':');
          const waktuSholat = new Date();
          waktuSholat.setHours(jam, menit, 0, 0);

          if (sekarang < waktuSholat) {
            sholatBerikutnya = { ...listSholat[i], objWaktu: waktuSholat };
            break;
          }
        }

        if (!sholatBerikutnya) {
          const [jam, menit] = listSholat[0].waktuStr.split(':');
          const waktuImsakBesok = new Date();
          waktuImsakBesok.setDate(waktuImsakBesok.getDate() + 1);
          waktuImsakBesok.setHours(jam, menit, 0, 0);
          sholatBerikutnya = { ...listSholat[0], objWaktu: waktuImsakBesok };
        }

        const selisihMs = sholatBerikutnya.objWaktu - sekarang;
        const jam = Math.floor((selisihMs / (1000 * 60 * 60)) % 24);
        const menit = Math.floor((selisihMs / 1000 / 60) % 60);
        const detik = Math.floor((selisihMs / 1000) % 60);

        const formatAngka = (num) => num.toString().padStart(2, '0');
        const sisaWaktuStr = `${formatAngka(jam)}:${formatAngka(menit)}:${formatAngka(detik)}`;

        setInfoSelanjutnya({
          nama: sholatBerikutnya.nama,
          waktu: sholatBerikutnya.waktuStr,
          sisa: sisaWaktuStr,
          ikon: sholatBerikutnya.ikon
        });
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [jadwal]);

  const formatJam = waktuSekarang.toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' });

  return (
    <div className="bg-white dark:bg-slate-800 rounded-3xl p-6 md:p-8 mb-8 shadow-sm border border-slate-100 dark:border-slate-700 relative overflow-hidden group">
      
      {/* Dekorasi Masjid */}
      <div className="absolute -top-6 -right-6 text-[8rem] opacity-5 group-hover:rotate-12 transition-transform duration-700 select-none">
        🕌
      </div>

      <div className="flex flex-col md:flex-row justify-between items-center gap-6 relative z-10">
        
        {/* BAGIAN KIRI: Info Waktu & Ganti Lokasi */}
        <div className="text-center md:text-left w-full md:w-auto">
          
          {/* Label Lokasi dengan Tombol Edit */}
          {!modeCari ? (
            <div className="flex justify-center md:justify-start items-center gap-2 mb-2">
              <p className="text-xs md:text-sm font-bold text-emerald-600 dark:text-emerald-500 uppercase tracking-widest">
                📍 {lokasi}
              </p>
              <button 
                onClick={() => setModeCari(true)}
                className="text-xs bg-slate-100 dark:bg-slate-700 text-slate-500 dark:text-slate-300 px-2 py-1 rounded-md hover:bg-emerald-100 hover:text-emerald-600 transition"
                title="Ganti Kota"
              >
                ✎ Ubah
              </button>
            </div>
          ) : (
            /* Form Pencarian Kota Manual */
            <form onSubmit={fetchJadwalKota} className="flex justify-center md:justify-start gap-2 mb-2">
              <input 
                type="text" 
                value={inputKota}
                onChange={(e) => setInputKota(e.target.value)}
                placeholder="Ketik nama kota..." 
                className="text-sm px-3 py-1.5 rounded-lg border border-emerald-300 focus:outline-none focus:ring-2 focus:ring-emerald-500 dark:bg-slate-700 dark:border-slate-600 dark:text-white"
                autoFocus
              />
              <button type="submit" className="bg-emerald-500 text-white px-3 py-1.5 rounded-lg text-sm font-bold hover:bg-emerald-600 transition">
                Cari
              </button>
              <button type="button" onClick={() => setModeCari(false)} className="bg-slate-200 text-slate-600 px-2 py-1.5 rounded-lg text-sm hover:bg-slate-300 transition dark:bg-slate-600 dark:text-slate-200">
                ✕
              </button>
            </form>
          )}

          <h2 className="text-5xl md:text-6xl font-black text-slate-800 dark:text-slate-100 tracking-tight mb-2">
            {formatJam}
          </h2>
          <p className="text-slate-500 dark:text-slate-400 font-medium text-sm md:text-base capitalize">
            {waktuSekarang.toLocaleDateString('id-ID', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })}
          </p>
        </div>

        {/* BAGIAN KANAN: Hitung Mundur */}
        {jadwal && infoSelanjutnya.nama && (
          <div className="bg-emerald-50 dark:bg-emerald-900/30 border border-emerald-200 dark:border-emerald-800/50 rounded-3xl p-5 md:p-6 text-center w-full md:min-w-[240px] md:w-auto shadow-inner transform group-hover:scale-105 transition-transform duration-300">
            <p className="text-xs font-bold text-emerald-600 dark:text-emerald-400 uppercase tracking-widest mb-2">
              {infoSelanjutnya.ikon} Menuju {infoSelanjutnya.nama}
            </p>
            <div className="text-4xl font-black text-emerald-700 dark:text-emerald-300 tabular-nums tracking-wider mb-2">
              {infoSelanjutnya.sisa}
            </div>
            <p className="text-xs text-emerald-600/70 dark:text-emerald-500 font-bold bg-emerald-100/50 dark:bg-slate-800 py-1.5 px-3 rounded-full inline-block border border-emerald-100 dark:border-slate-700">
              Masuk pada {infoSelanjutnya.waktu}
            </p>
          </div>
        )}
      </div>

      {/* BAGIAN BAWAH: 6 Kotak Jadwal (Kini menampilkan Imsak) */}
      {jadwal ? (
        // Menggunakan grid-cols-3 untuk HP agar menjadi 2 baris (3 atas, 3 bawah), dan grid-cols-6 untuk layar besar
        <div className="grid grid-cols-3 lg:grid-cols-6 gap-2 md:gap-3 mt-8 pt-6 border-t border-slate-100 dark:border-slate-700">
          {['Imsak', 'Subuh', 'Dzuhur', 'Ashar', 'Maghrib', 'Isya'].map((nama) => {
            const isNext = infoSelanjutnya.nama === nama;
            const ikon = nama === 'Imsak' ? '✨' : nama === 'Subuh' ? '🌅' : nama === 'Dzuhur' ? '☀️' : nama === 'Ashar' ? '🌤️' : nama === 'Maghrib' ? '🌇' : '🌙';
            
            return (
              <div 
                key={nama}
                className={`flex flex-col items-center justify-center py-3 md:py-4 px-1 rounded-2xl transition-all duration-300 ${
                  isNext 
                  ? 'bg-emerald-500 text-white shadow-lg transform -translate-y-2 scale-105 ring-4 ring-emerald-500/20' 
                  : 'bg-slate-50 dark:bg-slate-900/50 text-slate-600 dark:text-slate-400 border border-slate-100 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800'
                }`}
              >
                <span className={`text-xl md:text-2xl mb-1 md:mb-1.5 ${isNext ? 'animate-pulse' : ''}`}>{ikon}</span>
                <span className={`text-[10px] md:text-xs font-bold uppercase tracking-wider mb-1 ${isNext ? 'text-emerald-100' : 'text-slate-400'}`}>
                  {nama}
                </span>
                <span className={`text-sm md:text-lg font-black ${isNext ? 'text-white' : 'text-slate-800 dark:text-slate-200'}`}>
                  {jadwal[nama]}
                </span>
              </div>
            )
          })}
        </div>
      ) : (
        // Animasi Loading
        <div className="mt-8 pt-6 border-t border-slate-100 dark:border-slate-700 flex justify-center">
          <div className="animate-pulse text-emerald-500 font-medium text-sm flex items-center gap-2">
            <span className="animate-spin text-xl">⏳</span> Sedang menyelaraskan jadwal...
          </div>
        </div>
      )}
      
    </div>
  );
}