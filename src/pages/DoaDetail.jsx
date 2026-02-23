import { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';

// 📂 IMPORT DATA LOKAL KITA (Ganti doaApi dengan ini)
import { dataDoaHarian } from '../data/dataDoa';

export default function DoaDetail() {
  const { id } = useParams();
  const navigate = useNavigate();

  // State untuk deteksi usapan jari (Swipe) di layar HP
  const [touchStart, setTouchStart] = useState(null);
  const [touchEnd, setTouchEnd] = useState(null);

  // 1. KITA UBAH ID DARI URL MENJADI ANGKA
  const doaId = parseInt(id);

  // 2. MENCARI POSISI DOA DI DALAM DATABASE LOKAL
  const currentIndex = dataDoaHarian.findIndex((doa) => doa.id === doaId);
  const detailDoa = dataDoaHarian[currentIndex];

  // JIKA DOA TIDAK DITEMUKAN (Atau ID ngawur)
  if (!detailDoa) {
    return (
      <div className="text-center py-20 animate-fade-in">
        <div className="text-6xl mb-4 grayscale opacity-60">🧐</div>
        <p className="text-slate-500 font-bold mb-6 text-xl">Doa tidak ditemukan.</p>
        <Link to="/doa" className="bg-emerald-600 text-white px-6 py-3.5 rounded-full hover:bg-emerald-700 shadow-md transition-all">
          Kembali ke Daftar Doa
        </Link>
      </div>
    );
  }

  // 3. LOGIKA NAVIGASI (NEXT & PREVIOUS)
  const prevDoaId = currentIndex > 0 ? dataDoaHarian[currentIndex - 1].id : null;
  const nextDoaId = currentIndex < dataDoaHarian.length - 1 ? dataDoaHarian[currentIndex + 1].id : null;

  const keDoaSebelumnya = () => { if (prevDoaId) navigate(`/doa/${prevDoaId}`); };
  const keDoaSelanjutnya = () => { if (nextDoaId) navigate(`/doa/${nextDoaId}`); };

  // 4. LOGIKA DETEKSI SWIPE LAYAR HP
  const batasSwipe = 50; // Jarak usapan jari (pixel)
  const onTouchStart = (e) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };
  const onTouchMove = (e) => setTouchEnd(e.targetTouches[0].clientX);
  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    const jarakSwipe = touchStart - touchEnd;
    if (jarakSwipe > batasSwipe) keDoaSelanjutnya(); // Usap ke Kiri -> Next
    if (jarakSwipe < -batasSwipe) keDoaSebelumnya(); // Usap ke Kanan -> Prev
  };

  // 5. PENARIKAN DATA
  const judulDoa = detailDoa.judul;
  const teksArab = detailDoa.arab;
  const teksLatin = detailDoa.latin;
  const teksArti = detailDoa.arti;
  const teksTentang = detailDoa.riwayat || "Keterangan riwayat tidak tersedia untuk doa ini.";

  return (
    <div 
      className="max-w-4xl mx-auto overflow-hidden pb-10 animate-fade-in"
      onTouchStart={onTouchStart}
      onTouchMove={onTouchMove}
      onTouchEnd={onTouchEnd}
    >
      
      {/* 🧭 NAVIGASI ATAS (KEMBALI & NEXT/PREV) */}
      <div className="flex flex-wrap items-center justify-between mb-6 gap-4">
        <Link to="/doa" className="text-emerald-600 hover:text-emerald-700 dark:text-emerald-400 dark:hover:text-emerald-300 font-medium inline-flex items-center transition bg-emerald-50 dark:bg-slate-800 px-4 py-2 rounded-full border border-emerald-100 dark:border-slate-700">
          <span className="mr-2">&larr;</span> Kembali
        </Link>

        {/* Tombol Pintasan Next/Prev */}
        <div className="flex gap-2">
          <button onClick={keDoaSebelumnya} disabled={!prevDoaId} className={`flex items-center gap-2 px-4 py-2 rounded-full font-bold transition-all text-sm border ${!prevDoaId ? 'bg-slate-100 text-slate-400 border-slate-200 cursor-not-allowed dark:bg-slate-800 dark:border-slate-700' : 'bg-white text-emerald-700 border-emerald-200 hover:bg-emerald-50 dark:bg-slate-800 dark:text-emerald-400 dark:border-emerald-800/50'}`}>
            &larr; Prev
          </button>
          <button onClick={keDoaSelanjutnya} disabled={!nextDoaId} className={`flex items-center gap-2 px-4 py-2 rounded-full font-bold transition-all text-sm border ${!nextDoaId ? 'bg-slate-100 text-slate-400 border-slate-200 cursor-not-allowed dark:bg-slate-800 dark:border-slate-700' : 'bg-white text-emerald-700 border-emerald-200 hover:bg-emerald-50 dark:bg-slate-800 dark:text-emerald-400 dark:border-emerald-800/50'}`}>
            Next &rarr;
          </button>
        </div>
      </div>

      {/* 🌸 HEADER DOA */}
      <div className="bg-emerald-600 text-white rounded-3xl p-8 md:p-12 mb-8 text-center shadow-lg bg-gradient-to-br from-emerald-500 to-emerald-700 dark:from-slate-800 dark:to-slate-900 border dark:border-slate-700 relative overflow-hidden group">
        <div className="absolute -right-4 -bottom-4 text-8xl opacity-10 group-hover:scale-110 transition-transform duration-500">🤲</div>
        <h1 className="text-3xl md:text-5xl font-bold mb-4 relative z-10">{judulDoa}</h1>
        <div className="inline-block bg-emerald-800/40 dark:bg-slate-700/50 px-6 py-2 rounded-full border border-emerald-500/30 dark:border-slate-600 text-sm md:text-base font-medium relative z-10">
          Doa & Dzikir Harian
        </div>
      </div>

      <div className="space-y-6">
        
        {/* KOTAK 1: BACAAN ARAB & TERJEMAHAN */}
        <div className="bg-white rounded-3xl p-6 md:p-10 shadow-sm border border-slate-100 hover:shadow-emerald-500/10 hover:border-emerald-300 transition duration-300 dark:bg-slate-800 dark:border-slate-700">
          
          <div 
            className="text-right text-4xl md:text-5xl font-arab text-slate-800 dark:text-slate-100 break-words mb-8 py-2" 
            style={{ lineHeight: '2.5' }}
            dir="rtl"
          >
            {teksArab}
          </div>

          <div className="space-y-4 pt-6 border-t border-slate-100 dark:border-slate-700">
            <h4 className="text-xs uppercase tracking-widest text-emerald-600 dark:text-emerald-500 font-bold">Cara Membaca:</h4>
            <p className="text-emerald-600 dark:text-emerald-400 font-medium leading-relaxed text-base md:text-lg">
              {teksLatin}
            </p>
            
            <h4 className="text-xs uppercase tracking-widest text-slate-500 dark:text-slate-400 font-bold mt-4">Artinya:</h4>
            <p className="text-slate-600 dark:text-slate-300 leading-relaxed text-base md:text-lg">
              "{teksArti}"
            </p>
          </div>

        </div>

        {/* KOTAK 2: RIWAYAT & KETERANGAN */}
        {detailDoa.riwayat && (
          <div className="bg-emerald-50/50 dark:bg-slate-900/50 rounded-3xl p-6 md:p-8 border border-emerald-100 dark:border-slate-700">
            <div className="flex items-center gap-3 mb-4 border-b border-emerald-200/50 dark:border-slate-600 pb-4">
              <span className="text-2xl">📚</span>
              <h3 className="text-xl font-bold text-emerald-800 dark:text-emerald-400">Riwayat & Keterangan</h3>
            </div>
            
            <div className="text-slate-700 dark:text-slate-300 leading-relaxed space-y-4">
              <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl border-l-4 border-emerald-500 shadow-sm">
                <p className="text-base md:text-lg font-medium leading-relaxed text-slate-700 dark:text-slate-300">
                  {teksTentang}
                </p>
              </div>
            </div>
          </div>
        )}

      </div>

      {/* Indikator Geser (Hanya muncul di HP) */}
      <div className="mt-8 text-center md:hidden">
        <span className="bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400 px-6 py-2 rounded-full text-xs font-bold uppercase tracking-widest animate-pulse border border-slate-200 dark:border-slate-700 shadow-sm">
          👈 Geser untuk pindah doa 👉
        </span>
      </div>

    </div>
  );
}