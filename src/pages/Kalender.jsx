import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
// IMPOR GUDANG DATA
import useQuranStore from '../store/useQuranStore';

const namaBulanIndo = [
  "Januari", "Februari", "Maret", "April", "Mei", "Juni",
  "Juli", "Agustus", "September", "Oktober", "November", "Desember"
];

const namaHariIndo = {
  "Sunday": "Minggu", "Monday": "Senin", "Tuesday": "Selasa",
  "Wednesday": "Rabu", "Thursday": "Kamis", "Friday": "Jum'at", "Saturday": "Sabtu"
};

const namaBulanHijriahIndo = {
  "Muharram": "Muharram", "Safar": "Shafar", "Rabi' al-awwal": "Rabi'ul Awal", "Rabi' al-thani": "Rabi'ul Akhir",
  "Jumada al-awwal": "Jumadil Awal", "Jumada al-thani": "Jumadil Akhir", "Rajab": "Rajab", "Sha'ban": "Sya'ban",
  "Ramadan": "Ramadhan", "Shawwal": "Syawal", "Dhu al-Qi'dah": "Dzulqa'dah", "Dhu al-Hijjah": "Dzulhijjah"
};

const terjemahHariBesar = (namaInggris) => {
  const kamus = {
    "Islamic New Year": "Tahun Baru Islam", "Ashura": "Hari Asyura", "Ramadan beginning": "Awal Puasa Ramadhan",
    "Eid-ul-Fitr": "Hari Raya Idul Fitri", "Arafa": "Hari Arafah", "Eid-al-Adha": "Hari Raya Idul Adha",
    "Mawlid al-Nabi": "Maulid Nabi SAW", "Shab-e-Miraj": "Isra' Mi'raj", "Shab-e-Baraat": "Nisfu Sya'ban",
    "Laylat al-Qadr": "Lailatul Qadar"
  };
  return kamus[namaInggris] || namaInggris;
};

export default function Kalender() {
  const hariIni = new Date();
  const [bulan, setBulan] = useState(hariIni.getMonth() + 1); 
  const [tahun, setTahun] = useState(hariIni.getFullYear());
  const [modeTampilan, setModeTampilan] = useState('kotak');
  
  // STATE BARU UNTUK MODAL (POP-UP) PENCATATAN
  const { catatanKalender, tambahCatatan, hapusCatatan } = useQuranStore();
  const [modalTerbuka, setModalTerbuka] = useState(false);
  const [tanggalPilih, setTanggalPilih] = useState(null); // Menyimpan tanggal yang sedang diklik ("DD-MM-YYYY")
  const [formTipe, setFormTipe] = useState('haid');
  const [formTeks, setFormTeks] = useState('');

  const { data: hariBulanIni, isLoading, isError } = useQuery({
    queryKey: ['kalender', bulan, tahun],
    queryFn: async () => {
      const res = await axios.get(`https://api.aladhan.com/v1/gToHCalendar/${bulan}/${tahun}`);
      return res.data.data;
    },
    staleTime: Infinity, 
  });

  const prevMonth = () => { if (bulan === 1) { setBulan(12); setTahun(t => t - 1); } else { setBulan(b => b - 1); } };
  const nextMonth = () => { if (bulan === 12) { setBulan(1); setTahun(t => t + 1); } else { setBulan(b => b + 1); } };

  const hariBesar = hariBulanIni?.filter(hari => hari.hijri.holidays.length > 0) || [];

  const getEmptyCells = () => {
    if (!hariBulanIni || hariBulanIni.length === 0) return [];
    const [d, m, y] = hariBulanIni[0].gregorian.date.split('-');
    const dateObj = new Date(`${y}-${m}-${d}`);
    const startDay = dateObj.getDay(); 
    return Array(startDay).fill(null); 
  };

  // FUNGSI UNTUK MEMBUKA POP-UP SAAT TANGGAL DIKLIK
  const klikTanggal = (hariObj) => {
    const tglKey = hariObj.gregorian.date; // Format: "DD-MM-YYYY"
    setTanggalPilih(hariObj);
    
    // Kalau sudah ada catatannya, isi formnya dengan data yang sudah ada
    if (catatanKalender[tglKey]) {
      setFormTipe(catatanKalender[tglKey].tipe);
      setFormTeks(catatanKalender[tglKey].teks);
    } else {
      setFormTipe('haid');
      setFormTeks('');
    }
    setModalTerbuka(true);
  };

  // FUNGSI SIMPAN & HAPUS CATATAN
  const simpanCatatanUser = () => {
    tambahCatatan(tanggalPilih.gregorian.date, { tipe: formTipe, teks: formTeks });
    setModalTerbuka(false);
  };

  const hapusCatatanUser = () => {
    hapusCatatan(tanggalPilih.gregorian.date);
    setModalTerbuka(false);
  };

  return (
    <div className="max-w-5xl mx-auto py-4 relative">
      
      {/* HEADER ELEGAN */}
      <div className="bg-emerald-600 text-white rounded-3xl p-8 mb-8 text-center shadow-lg bg-gradient-to-br from-emerald-500 to-emerald-700 dark:from-slate-800 dark:to-slate-900 border dark:border-slate-700 relative overflow-hidden">
        <div className="absolute top-2 right-6 opacity-20 text-6xl select-none animate-pulse">☁️</div>
        <div className="absolute bottom-4 left-10 opacity-20 text-5xl select-none">✨</div>
        <div className="relative z-10">
          <h1 className="text-3xl md:text-5xl font-bold mb-3 drop-shadow-sm">🗓️ Kalender Islam</h1>
          <p className="text-emerald-50 dark:text-slate-300 text-lg md:text-xl font-medium">
            Penanggalan & Penanda Catatan Pribadimu 🌸
          </p>
        </div>
      </div>

      {/* KONTROL BULAN & TAHUN */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-6 mb-8">
        <div className="bg-white dark:bg-slate-800 rounded-full p-2 flex items-center shadow-sm border border-slate-100 dark:border-slate-700 w-full md:w-auto">
          <button onClick={prevMonth} className="w-12 h-12 bg-emerald-50 hover:bg-emerald-100 text-emerald-600 dark:bg-slate-700 dark:text-emerald-400 rounded-full flex items-center justify-center transition text-xl font-bold">&larr;</button>
          <div className="text-center px-8 md:px-12 w-48 md:w-64">
            <h2 className="text-xl md:text-2xl font-bold text-slate-800 dark:text-slate-100">
              {namaBulanIndo[bulan - 1]} {tahun}
            </h2>
          </div>
          <button onClick={nextMonth} className="w-12 h-12 bg-emerald-50 hover:bg-emerald-100 text-emerald-600 dark:bg-slate-700 dark:text-emerald-400 rounded-full flex items-center justify-center transition text-xl font-bold">&rarr;</button>
        </div>

        <div className="bg-slate-100 dark:bg-slate-800 p-1.5 rounded-full flex gap-1 shadow-inner border border-slate-200 dark:border-slate-700">
          <button onClick={() => setModeTampilan('kotak')} className={`px-5 py-2.5 rounded-full font-bold transition-all flex items-center gap-2 text-sm ${modeTampilan === 'kotak' ? 'bg-white dark:bg-slate-700 text-emerald-600 dark:text-emerald-400 shadow-sm' : 'text-slate-500 hover:text-slate-700 dark:text-slate-400'}`}>📅 Mode Kalender</button>
          <button onClick={() => setModeTampilan('daftar')} className={`px-5 py-2.5 rounded-full font-bold transition-all flex items-center gap-2 text-sm ${modeTampilan === 'daftar' ? 'bg-white dark:bg-slate-700 text-emerald-600 dark:text-emerald-400 shadow-sm' : 'text-slate-500 hover:text-slate-700 dark:text-slate-400'}`}>📋 Mode Daftar</button>
        </div>
      </div>

      {!isLoading && !isError && hariBulanIni && (
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          
          {/* KOLOM KIRI: Sorotan Hari Besar */}
          <div className="lg:col-span-1">
            <div className="bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-700/50 rounded-3xl p-6 sticky top-24 shadow-sm">
              <h3 className="text-lg font-bold text-amber-800 dark:text-amber-500 mb-4 flex items-center gap-2"><span>✨</span> Sorotan Bulan Ini</h3>
              {hariBesar.length === 0 ? (
                <p className="text-amber-700/70 dark:text-amber-500/70 text-sm font-medium">Tidak ada hari besar Islam di bulan ini.</p>
              ) : (
                <div className="space-y-3">
                  {hariBesar.map((hari, idx) => (
                    <div key={idx} className="bg-white dark:bg-slate-800 rounded-2xl p-4 shadow-sm border border-amber-100 dark:border-slate-700 group hover:border-amber-300 transition">
                      <p className="font-bold text-amber-700 dark:text-amber-400 mb-1 group-hover:text-amber-600">{terjemahHariBesar(hari.hijri.holidays[0])}</p>
                      <p className="text-sm text-slate-600 dark:text-slate-300 font-medium">{hari.gregorian.day} {namaBulanIndo[bulan - 1]}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* KOLOM KANAN: KONTEN UTAMA */}
          <div className="lg:col-span-3">
            
            {/* TAMPILAN 1: MODE KOTAK */}
            {modeTampilan === 'kotak' && (
              <div className="bg-white dark:bg-slate-800 rounded-3xl p-4 md:p-6 shadow-sm border border-slate-100 dark:border-slate-700 animate-fade-in">
                <div className="grid grid-cols-7 gap-2 mb-4 text-center">
                  {['Min', 'Sen', 'Sel', 'Rab', 'Kam', 'Jum', 'Sab'].map((hari, i) => (
                    <div key={i} className={`font-bold text-sm md:text-base py-2 rounded-xl ${i === 0 || i === 6 ? 'text-red-500 bg-red-50 dark:bg-red-900/20' : 'text-slate-500 bg-slate-50 dark:bg-slate-700/50'}`}>{hari}</div>
                  ))}
                </div>

                <div className="grid grid-cols-7 gap-2 md:gap-3">
                  {getEmptyCells().map((_, idx) => (
                    <div key={`empty-${idx}`} className="bg-slate-50/50 dark:bg-slate-800/50 rounded-2xl border border-dashed border-slate-200 dark:border-slate-700/50 min-h-[80px] md:min-h-[100px]"></div>
                  ))}

                  {hariBulanIni.map((hari, idx) => {
                    const isHariIni = parseInt(hari.gregorian.day) === hariIni.getDate() && bulan === (hariIni.getMonth() + 1) && tahun === hariIni.getFullYear();
                    const isHariBesar = hari.hijri.holidays.length > 0;
                    
                    // AMBIL DATA CATATAN DARI ZUSTAND JIKA ADA
                    const tglKey = hari.gregorian.date;
                    const catatan = catatanKalender[tglKey];

                    return (
                      <div 
                        key={idx} 
                        onClick={() => klikTanggal(hari)} // Buka modal saat diklik
                        className={`relative rounded-2xl p-2 md:p-3 min-h-[80px] md:min-h-[100px] flex flex-col justify-between border transition duration-300 group cursor-pointer hover:scale-105 active:scale-95
                          ${catatan?.tipe === 'haid' ? 'bg-rose-50 border-rose-200 dark:bg-rose-900/20 dark:border-rose-800' 
                          : catatan?.tipe === 'puasa' ? 'bg-blue-50 border-blue-200 dark:bg-blue-900/20 dark:border-blue-800'
                          : catatan?.tipe === 'catatan' ? 'bg-emerald-50 border-emerald-200 dark:bg-emerald-900/20 dark:border-emerald-800'
                          : isHariIni ? 'bg-emerald-50 border-emerald-400 dark:bg-emerald-900/40 shadow-sm' 
                          : isHariBesar ? 'bg-amber-50 border-amber-200 dark:bg-amber-900/20' 
                          : 'bg-white border-slate-100 hover:border-emerald-300 dark:bg-slate-800 dark:border-slate-700 hover:shadow-md'}
                        `}
                      >
                        <div className={`text-xl md:text-2xl font-black ${isHariIni ? 'text-emerald-600 dark:text-emerald-400' : 'text-slate-700 dark:text-slate-200 group-hover:text-emerald-500'}`}>
                          {hari.gregorian.day}
                        </div>
                        
                        <div className="text-right">
                          <p className={`text-[10px] md:text-xs font-bold ${isHariIni ? 'text-emerald-500' : 'text-slate-400 group-hover:text-emerald-400'}`}>
                            {hari.hijri.day}
                          </p>
                        </div>

                        {/* Tampilkan Emoji Penanda Kalau Ada Catatan */}
                        {catatan && (
                          <div className="absolute bottom-1 left-2 md:bottom-2 md:left-3 text-lg md:text-2xl animate-fade-in drop-shadow-sm">
                            {catatan.tipe === 'haid' ? '🩸' : catatan.tipe === 'puasa' ? '🌙' : '📝'}
                          </div>
                        )}

                        {isHariBesar && !catatan && (
                          <div className="absolute top-2 right-2 w-2 h-2 bg-amber-500 rounded-full animate-pulse shadow-[0_0_8px_rgba(245,158,11,0.6)]"></div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* TAMPILAN 2: MODE DAFTAR */}
            {modeTampilan === 'daftar' && (
              <div className="space-y-3 animate-fade-in">
                {hariBulanIni.map((hari, idx) => {
                  const isHariIni = parseInt(hari.gregorian.day) === hariIni.getDate() && bulan === (hariIni.getMonth() + 1) && tahun === hariIni.getFullYear();
                  
                  const tglKey = hari.gregorian.date;
                  const catatan = catatanKalender[tglKey];

                  return (
                    <div 
                      key={idx} 
                      onClick={() => klikTanggal(hari)} // Buka modal saat diklik
                      className={`flex flex-col sm:flex-row justify-between items-start sm:items-center p-4 rounded-2xl border transition duration-300 cursor-pointer hover:scale-[1.01] active:scale-[0.99]
                        ${catatan?.tipe === 'haid' ? 'bg-rose-50 border-rose-200 dark:bg-rose-900/20' 
                        : catatan?.tipe === 'puasa' ? 'bg-blue-50 border-blue-200 dark:bg-blue-900/20'
                        : isHariIni ? 'bg-emerald-50 border-emerald-400 dark:bg-emerald-900/30 shadow-md' 
                        : 'bg-white border-slate-100 hover:shadow-md dark:bg-slate-800 dark:border-slate-700'}
                      `}
                    >
                      <div className="flex gap-4 items-center mb-3 sm:mb-0">
                        <div className={`w-12 h-12 flex items-center justify-center rounded-xl font-black text-xl shrink-0
                          ${catatan?.tipe === 'haid' ? 'bg-rose-500 text-white shadow-sm' 
                          : catatan?.tipe === 'puasa' ? 'bg-blue-500 text-white shadow-sm'
                          : isHariIni ? 'bg-emerald-600 text-white shadow-sm' 
                          : 'bg-slate-100 text-slate-600 dark:bg-slate-700 dark:text-slate-300'}
                        `}>
                          {catatan?.tipe === 'haid' ? '🩸' : catatan?.tipe === 'puasa' ? '🌙' : hari.gregorian.day}
                        </div>
                        
                        <div>
                          <p className={`font-bold text-lg ${isHariIni ? 'text-emerald-700 dark:text-emerald-400' : 'text-slate-700 dark:text-slate-200'}`}>
                            {hari.gregorian.day} {namaBulanIndo[bulan - 1]} {tahun}
                          </p>
                          <p className="text-sm text-slate-500 dark:text-slate-400 capitalize">
                            {namaHariIndo[hari.gregorian.weekday.en]} • {hari.hijri.day} {namaBulanHijriahIndo[hari.hijri.month.en]} H
                          </p>
                        </div>
                      </div>

                      {/* Tampilkan Teks Catatan di Mode Daftar */}
                      {catatan && (
                        <span className={`text-xs font-bold px-3 py-1.5 rounded-full border sm:ml-4 flex items-center gap-1
                          ${catatan.tipe === 'haid' ? 'bg-rose-100 text-rose-700 border-rose-200 dark:bg-rose-900/40 dark:text-rose-400'
                          : catatan.tipe === 'puasa' ? 'bg-blue-100 text-blue-700 border-blue-200 dark:bg-blue-900/40 dark:text-blue-400'
                          : 'bg-emerald-100 text-emerald-700 border-emerald-200 dark:bg-emerald-900/40 dark:text-emerald-400'}`}
                        >
                          {catatan.teks || (catatan.tipe === 'haid' ? 'Siklus Haid' : catatan.tipe === 'puasa' ? 'Puasa Sunnah' : 'Catatan Pribadi')}
                        </span>
                      )}
                    </div>
                  );
                })}
              </div>
            )}

          </div>
        </div>
      )}

      {/* ============================================================== */}
      {/* POP-UP (MODAL) PENGISIAN CATATAN (Muncul kalau modalTerbuka = true) */}
      {/* ============================================================== */}
      {modalTerbuka && tanggalPilih && (
        <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm z-[100] flex items-center justify-center p-4 animate-fade-in">
          <div className="bg-white dark:bg-slate-800 rounded-3xl p-6 md:p-8 w-full max-w-md shadow-2xl transform scale-100 border border-slate-100 dark:border-slate-700">
            
            <div className="flex justify-between items-center mb-6">
              <div>
                <h3 className="text-2xl font-bold text-slate-800 dark:text-slate-100">Buat Penanda</h3>
                <p className="text-slate-500 dark:text-slate-400 text-sm font-medium mt-1">
                  {tanggalPilih.gregorian.day} {namaBulanIndo[bulan - 1]} {tahun}
                </p>
              </div>
              <button onClick={() => setModalTerbuka(false)} className="w-8 h-8 flex items-center justify-center rounded-full bg-slate-100 hover:bg-slate-200 dark:bg-slate-700 dark:hover:bg-slate-600 text-slate-500 transition">✕</button>
            </div>

            {/* Pilihan Tipe Penanda */}
            <div className="grid grid-cols-3 gap-2 md:gap-3 mb-6">
              <button 
                onClick={() => setFormTipe('haid')}
                className={`py-3 px-2 rounded-2xl flex flex-col items-center gap-1 transition-all border-2 ${formTipe === 'haid' ? 'border-rose-400 bg-rose-50 text-rose-700 dark:bg-rose-900/30' : 'border-slate-100 text-slate-500 hover:bg-slate-50 dark:border-slate-700 dark:hover:bg-slate-700'}`}
              >
                <span className="text-2xl mb-1">🩸</span>
                <span className="text-xs font-bold uppercase">Haid</span>
              </button>
              
              <button 
                onClick={() => setFormTipe('puasa')}
                className={`py-3 px-2 rounded-2xl flex flex-col items-center gap-1 transition-all border-2 ${formTipe === 'puasa' ? 'border-blue-400 bg-blue-50 text-blue-700 dark:bg-blue-900/30' : 'border-slate-100 text-slate-500 hover:bg-slate-50 dark:border-slate-700 dark:hover:bg-slate-700'}`}
              >
                <span className="text-2xl mb-1">🌙</span>
                <span className="text-xs font-bold uppercase">Puasa</span>
              </button>

              <button 
                onClick={() => setFormTipe('catatan')}
                className={`py-3 px-2 rounded-2xl flex flex-col items-center gap-1 transition-all border-2 ${formTipe === 'catatan' ? 'border-emerald-400 bg-emerald-50 text-emerald-700 dark:bg-emerald-900/30' : 'border-slate-100 text-slate-500 hover:bg-slate-50 dark:border-slate-700 dark:hover:bg-slate-700'}`}
              >
                <span className="text-2xl mb-1">📝</span>
                <span className="text-xs font-bold uppercase">Lainnya</span>
              </button>
            </div>

            {/* Input Teks Catatan */}
            <div className="mb-8">
              <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2">
                Keterangan Singkat (Opsional)
              </label>
              <input 
                type="text" 
                value={formTeks}
                onChange={(e) => setFormTeks(e.target.value)}
                placeholder={formTipe === 'haid' ? "Misal: Hari ke-1 (Deras)" : "Tambahkan keterangan..."}
                className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-600 bg-slate-50 dark:bg-slate-700 focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-all dark:text-white"
                maxLength={30}
              />
            </div>

            {/* Tombol Aksi */}
            <div className="flex gap-3">
              {/* Tombol hapus hanya muncul kalau catatannya sudah pernah dibuat */}
              {catatanKalender[tanggalPilih.gregorian.date] && (
                <button 
                  onClick={hapusCatatanUser}
                  className="px-5 py-3 rounded-xl bg-red-100 text-red-600 font-bold hover:bg-red-200 transition dark:bg-red-900/40 dark:text-red-400"
                >
                  🗑️ Hapus
                </button>
              )}
              <button 
                onClick={simpanCatatanUser}
                className="flex-1 bg-emerald-600 text-white font-bold py-3 rounded-xl hover:bg-emerald-700 shadow-sm hover:shadow-md transition-all active:scale-95"
              >
                💾 Simpan Penanda
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
}