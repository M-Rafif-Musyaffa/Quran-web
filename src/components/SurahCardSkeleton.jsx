export default function SurahCardSkeleton() {
  return (
    // animate-pulse adalah class sakti Tailwind untuk membuat efek kedap-kedip halus (napas)
    <div className="bg-white rounded-xl p-4 shadow-sm border border-slate-100 flex items-center justify-between animate-pulse">
      
      {/* Bagian Kiri: Lingkaran dan Baris Teks Kosong */}
      <div className="flex items-center gap-4">
        {/* Lingkaran abu-abu sebagai pengganti nomor surah */}
        <div className="w-10 h-10 bg-slate-200 rounded-full"></div>
        
        <div className="space-y-2">
          {/* Persegi panjang abu-abu pendek sebagai pengganti Nama Surah */}
          <div className="h-4 bg-slate-200 rounded w-24"></div>
          {/* Persegi panjang abu-abu lebih panjang sebagai pengganti Arti Surah */}
          <div className="h-3 bg-slate-200 rounded w-32"></div>
        </div>
      </div>

      {/* Bagian Kanan: Persegi panjang abu-abu sebagai pengganti Teks Arab */}
      <div className="w-16 h-8 bg-slate-200 rounded"></div>

    </div>
  );
}