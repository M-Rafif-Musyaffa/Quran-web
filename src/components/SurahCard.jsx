import { Link } from 'react-router-dom';

export default function SurahCard({ surah }) {
  return (
    <Link 
      to={`/surah/${surah.nomor}`} 
      // PERUBAHAN: Menambahkan border-slate-200, shadow-sm, hover:-translate-y-1 agar kartu melayang saat disentuh
      className="bg-white dark:bg-slate-800 rounded-2xl p-5 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300 border border-slate-200 dark:border-slate-700 flex items-center justify-between group relative overflow-hidden"
    >
      {/* Efek Animasi Baru: Garis hijau di sebelah kiri yang muncul saat di-hover */}
      <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-emerald-500 scale-y-0 group-hover:scale-y-100 transition-transform origin-bottom duration-300 rounded-r-full"></div>

      <div className="flex items-center gap-4 pl-1">
        {/* Lingkaran Nomor Surah */}
        <div className="w-12 h-12 bg-emerald-50 dark:bg-slate-700/50 text-emerald-600 dark:text-emerald-400 rounded-xl flex items-center justify-center font-bold text-sm group-hover:bg-emerald-600 group-hover:text-white transition-colors duration-300 border border-emerald-100 dark:border-slate-600 shrink-0">
          {surah.nomor}
        </div>
        
        {/* Teks Nama Latin & Arti */}
        <div>
          <h3 className="font-bold text-lg text-slate-800 dark:text-slate-100 group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">
            {surah.namaLatin}
          </h3>
          <p className="text-xs text-slate-500 dark:text-slate-400 font-medium mt-0.5 uppercase tracking-wider">
            {surah.arti} • {surah.jumlahAyat} Ayat
          </p>
        </div>
      </div>

      {/* Teks Arab di Sebelah Kanan */}
      <div className="text-2xl font-bold font-arab text-emerald-700 dark:text-emerald-400 text-right group-hover:scale-110 transition-transform duration-300 pl-4">
        {surah.nama}
      </div>
    </Link>
  );
}