import { useParams, Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import doaApi from '../services/doaApi';

export default function DoaDetail() {
  const { id } = useParams();

  const { data: detailDoa, isLoading, isError } = useQuery({
    queryKey: ['doadoa'],
    queryFn: async () => {
      const response = await doaApi.get('/doa');
      return response.data.data || response.data;
    },
    select: (dataSemuaDoa) => dataSemuaDoa[id]
  });

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center py-20">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-600 mb-4"></div>
        <p className="text-emerald-600 dark:text-emerald-400 font-medium">Memuat detail doa...</p>
      </div>
    );
  }

  if (isError || !detailDoa) {
    return (
      <div className="text-center py-20">
        <p className="text-red-500 font-bold mb-2">Doa tidak ditemukan.</p>
        <Link to="/doa" className="text-emerald-600 hover:underline">Kembali ke Daftar Doa</Link>
      </div>
    );
  }

  // ==========================================
  // JURUS BERTAHAN & PENGAMBILAN DATA BARU
  // ==========================================
  const judulDoa = detailDoa.nama || detailDoa.judul || detailDoa.title || "Doa Harian";
  const teksArab = detailDoa.ar || detailDoa.arab || detailDoa.arabic || detailDoa.ayat || "";
  const teksLatin = detailDoa.tr || detailDoa.latin || detailDoa.transliterasi || "";
  const teksArti = detailDoa.idn || detailDoa.arti || detailDoa.artinya || detailDoa.terjemah || "";
  
  // KITA TAMBAHKAN PENANGKAP VARIABEL 'tentang' DI SINI!
  // Kalau dari server kosong, kita kasih teks pengganti yang sopan.
  const teksTentang = detailDoa.tentang || detailDoa.keterangan || "Keterangan riwayat tidak tersedia untuk doa ini.";

  return (
    <div className="max-w-4xl mx-auto overflow-hidden">
      
      <Link to="/doa" className="text-emerald-600 hover:text-emerald-700 dark:text-emerald-400 dark:hover:text-emerald-300 font-medium mb-6 inline-flex items-center transition">
        <span className="mr-2">&larr;</span> Kembali ke Kumpulan Doa
      </Link>

      <div className="bg-emerald-600 text-white rounded-3xl p-8 md:p-12 mb-8 text-center shadow-lg bg-gradient-to-br from-emerald-500 to-emerald-700 dark:from-slate-800 dark:to-slate-900 border dark:border-slate-700">
        <h1 className="text-3xl md:text-5xl font-bold mb-4">{judulDoa}</h1>
        <div className="inline-block bg-emerald-800/40 dark:bg-slate-700/50 px-6 py-2 rounded-full border border-emerald-500/30 dark:border-slate-600 text-sm md:text-base font-medium">
          Doa & Dzikir Harian
        </div>
      </div>

      <div className="space-y-6">
        
        {/* KOTAK 1: BACAAN ARAB & TERJEMAHAN */}
        <div className="bg-white rounded-3xl p-6 md:p-10 shadow-sm border border-slate-100 hover:shadow-md transition duration-300 dark:bg-slate-800 dark:border-slate-700">
          
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

        {/* KOTAK 2: RIWAYAT & KETERANGAN ASLI DARI API */}
        <div className="bg-emerald-50/50 dark:bg-slate-900/50 rounded-3xl p-6 md:p-8 border border-emerald-100 dark:border-slate-700">
          <div className="flex items-center gap-3 mb-4 border-b border-emerald-200/50 dark:border-slate-600 pb-4">
            <span className="text-2xl">📚</span>
            <h3 className="text-xl font-bold text-emerald-800 dark:text-emerald-400">Riwayat & Keterangan</h3>
          </div>
          
          <div className="text-slate-700 dark:text-slate-300 leading-relaxed space-y-4">
            {/* Kita render isi dari variabel teksTentang di dalam kotak estetik ini */}
            <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl border-l-4 border-emerald-500 shadow-sm">
              <p className="text-base md:text-lg font-medium leading-relaxed text-slate-700 dark:text-slate-300">
                {teksTentang}
              </p>
            </div>
          </div>
        </div>

      </div>

    </div>
  );
}