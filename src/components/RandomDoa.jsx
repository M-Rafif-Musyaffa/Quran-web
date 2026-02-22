import { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import doaApi from '../services/doaApi';

export default function RandomDoa() {
  // State untuk menyimpan 1 doa acak yang sedang ditampilkan
  const [doaAcak, setDoaAcak] = useState(null);

  // Mengambil seluruh data doa (Karena Asisten Pintar/React Query sudah menyimpannya
  // di cache dari halaman Doa, proses ini akan instan dan tidak membebani server!)
  const { data: doadoa, isLoading, isError } = useQuery({
    queryKey: ['doadoa'],
    queryFn: async () => {
      const response = await doaApi.get('/doa');
      return response.data.data || response.data;
    },
    // staleTime Infinity membuat Asisten Pintar tidak perlu menelepon server berulang kali
    staleTime: Infinity, 
  });

  // Fungsi untuk mengocok dan memilih 1 doa secara acak
  const kocokDoa = () => {
    if (doadoa && doadoa.length > 0) {
      const randomIndex = Math.floor(Math.random() * doadoa.length);
      setDoaAcak(doadoa[randomIndex]);
    }
  };

  // Jalankan fungsi kocokDoa SATU KALI saja saat data berhasil dimuat pertama kali
  useEffect(() => {
    if (doadoa && !doaAcak) {
      kocokDoa();
    }
  }, [doadoa]);

  // Kalau sedang loading, tampilkan kotak berkedip seukuran banner
  if (isLoading) {
    return <div className="animate-pulse bg-emerald-100 dark:bg-slate-800 h-40 rounded-3xl mb-8"></div>;
  }

  // Kalau error atau doaAcak belum siap, jangan tampilkan apa-apa (biar halaman Home tetap bersih)
  if (isError || !doaAcak) return null;

  // Merapikan nama variabel dari server
  const judulDoa = doaAcak.nama || doaAcak.judul || "Doa Harian";
  const teksArab = doaAcak.ar || doaAcak.arab || doaAcak.ayat || "";
  const teksArti = doaAcak.idn || doaAcak.arti || doaAcak.artinya || "";
  const teksLatin = doaAcak.tr || doaAcak.latin || doaAcak.transliterasi || "";
  const teksTentang = doaAcak.tentang || doaAcak.keterangan || "Keterangan riwayat tidak tersedia untuk doa ini.";

  return (
    // Banner doa acak ini memakai gradasi hijau yang cantik
    <div className="bg-gradient-to-br from-emerald-600 to-emerald-800 dark:from-slate-800 dark:to-slate-900 rounded-3xl p-6 md:p-8 mb-8 text-white shadow-lg relative overflow-hidden group border dark:border-slate-700">
      
      {/* Dekorasi Ikon Tangan Berdoa transparan di latar belakang */}
      <div className="absolute top-0 right-0 opacity-10 text-9xl -mt-6 -mr-6 transform rotate-12 select-none">
        🤲
      </div>

      <div className="relative z-10">
        <div className="flex flex-col md:flex-row justify-between md:items-center gap-4 mb-6 border-b border-emerald-500/50 dark:border-slate-700 pb-4">
          <h2 className="font-bold text-lg md:text-xl flex items-center gap-2 text-emerald-100 dark:text-emerald-400">
            <span>✨</span> Doa Pilihan Hari Ini
          </h2>
          
          {/* Tombol untuk mengocok doa lagi */}
          <button 
            onClick={kocokDoa} 
            className="bg-white/20 hover:bg-white/30 dark:bg-slate-700 dark:hover:bg-slate-600 px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wider transition backdrop-blur-sm self-start md:self-auto shadow-sm"
          >
            🔄 Ganti Doa
          </button>
        </div>

        <div className="space-y-4">
          <h3 className="font-bold text-xl md:text-2xl text-white">{judulDoa}</h3>
          
          <p 
            className="text-right text-3xl md:text-4xl font-arab leading-[2.5] md:leading-loose py-2 break-words text-emerald-50 dark:text-slate-200" 
            style={{ lineHeight: '2.5' }} 
            dir="rtl"
          >
            {teksArab}
          </p>
          
          <p className="text-sm md:text-base text-emerald-100/90 dark:text-slate-400 italic font-medium">
            "{teksLatin}"
          </p>

          <p className="text-sm md:text-base text-emerald-100/90 dark:text-slate-400 italic font-medium">
            "{teksArti}"
          </p>
            <p className="text-sm md:text-base text-emerald-100/90 dark:text-slate-400 italic font-medium">
            "{teksTentang}"
          </p>
        </div>
      </div>
    </div>
  );
}