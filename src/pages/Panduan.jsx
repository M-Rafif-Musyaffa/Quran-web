import { useState } from 'react';

// Mengimpor database lokal Wudhu & Haji
import { dataWudhu } from '../data/panduanIbadah';
import { dataHajiUmrah } from '../data/dataHajiUmrah';

// Mengimpor database Sholat BARU milikmu
import { 
  niatSholat, dataSholat as tataCaraFardhu, dataIdulFitriAdha, 
  dataJenazah, dataJumat, dataDhuha, dataTahajjud, dataWitir 
} from '../data/dataSholat';

export default function Panduan() {
  // STATE UTAMA
  const [tabAktif, setTabAktif] = useState('wudhu');
  
  // STATE SUB-TAB
  const [tipeHaji, setTipeHaji] = useState('umrah');
  const [tipeSholat, setTipeSholat] = useState('fardhu');
  
  // STATE KHUSUS NIAT SHOLAT
  const [niatFardhuAktif, setNiatFardhuAktif] = useState('subuh');
  const [niatIdulAktif, setNiatIdulAktif] = useState('idulFitri');
  const [niatJenazahAktif, setNiatJenazahAktif] = useState('jenazahLakiLaki');

  // DATABASE KATEGORI SHOLAT
  const daftarKategoriSholat = [
    { id: 'fardhu', label: 'Wajib (Fardhu)', data: tataCaraFardhu },
    { id: 'jumat', label: 'Jumat', data: dataJumat },
    { id: 'idul', label: 'Idul Fitri/Adha', data: dataIdulFitriAdha },
    { id: 'jenazah', label: 'Jenazah', data: dataJenazah },
    { id: 'dhuha', label: 'Dhuha', data: dataDhuha },
    { id: 'tahajjud', label: 'Tahajjud', data: dataTahajjud },
    { id: 'witir', label: 'Witir', data: dataWitir },
  ];

  // FUNGSI UNTUK MERENDER KOTAK NIAT BERDASARKAN SHOLAT YANG DIPILIH
  const renderKotakNiat = () => {
    let dataNiatAktif = null;
    let pemilihNiat = null;

    if (tipeSholat === 'fardhu') {
      dataNiatAktif = niatSholat[niatFardhuAktif];
      pemilihNiat = (
        <div className="flex flex-wrap justify-center gap-2 mb-6">
          {['subuh', 'dzuhur', 'ashar', 'maghrib', 'isya'].map(waktu => (
            <button key={waktu} onClick={() => setNiatFardhuAktif(waktu)}
              className={`px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest transition-all border ${niatFardhuAktif === waktu ? 'bg-emerald-600 text-white border-emerald-600 shadow-md' : 'bg-emerald-50 text-emerald-600 border-emerald-200 hover:bg-emerald-100 dark:bg-emerald-900/30 dark:border-emerald-700/50'}`}>
              {waktu}
            </button>
          ))}
        </div>
      );
    } else if (tipeSholat === 'idul') {
      dataNiatAktif = niatSholat[niatIdulAktif];
      pemilihNiat = (
        <div className="flex flex-wrap justify-center gap-2 mb-6">
          {['idulFitri', 'idulAdha'].map(idul => (
            <button key={idul} onClick={() => setNiatIdulAktif(idul)}
              className={`px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest transition-all border ${niatIdulAktif === idul ? 'bg-emerald-600 text-white border-emerald-600 shadow-md' : 'bg-emerald-50 text-emerald-600 border-emerald-200 hover:bg-emerald-100 dark:bg-emerald-900/30 dark:border-emerald-700/50'}`}>
              {idul === 'idulFitri' ? 'Idul Fitri' : 'Idul Adha'}
            </button>
          ))}
        </div>
      );
    } else if (tipeSholat === 'jenazah') {
      dataNiatAktif = niatSholat[niatJenazahAktif];
      pemilihNiat = (
        <div className="flex flex-wrap justify-center gap-2 mb-6">
          {['jenazahLakiLaki', 'jenazahPerempuan'].map(gender => (
            <button key={gender} onClick={() => setNiatJenazahAktif(gender)}
              className={`px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest transition-all border ${niatJenazahAktif === gender ? 'bg-emerald-600 text-white border-emerald-600 shadow-md' : 'bg-emerald-50 text-emerald-600 border-emerald-200 hover:bg-emerald-100 dark:bg-emerald-900/30 dark:border-emerald-700/50'}`}>
              {gender === 'jenazahLakiLaki' ? 'Jenazah Laki-laki' : 'Jenazah Perempuan'}
            </button>
          ))}
        </div>
      );
    } else {
      // Untuk sholat yang tidak ada variasinya (Jumat, Dhuha, Tahajjud, Witir)
      dataNiatAktif = niatSholat[tipeSholat]; 
    }

    if (!dataNiatAktif) return null;

    return (
      <div className="bg-white dark:bg-slate-800 rounded-[2rem] p-6 sm:p-8 md:p-10 shadow-sm border border-slate-100 dark:border-slate-700 mb-10 relative overflow-hidden group">
        <div className="absolute top-0 right-0 w-32 h-32 opacity-10 bg-emerald-500 rounded-bl-[100px] -z-0"></div>
        
        <div className="relative z-10 text-center">
          <h2 className="text-2xl md:text-3xl font-black uppercase tracking-widest text-emerald-600 dark:text-emerald-400 mb-6">
            {dataNiatAktif.judul}
          </h2>
          
          {pemilihNiat}

          <div className="bg-slate-50 dark:bg-slate-900/50 p-6 md:p-8 rounded-3xl border border-slate-100 dark:border-slate-700 shadow-inner mb-6">
            <h3 className="text-3xl md:text-4xl font-arab font-bold leading-loose text-slate-800 dark:text-white" dir="rtl" style={{ lineHeight: '1.8' }}>
              {dataNiatAktif.arab}
            </h3>
          </div>
          
          <p className="font-bold text-emerald-700 dark:text-emerald-400 text-sm md:text-base mb-2 italic">
            "{dataNiatAktif.latin}"
          </p>
          <p className="text-slate-500 dark:text-slate-400 text-sm md:text-base font-medium max-w-2xl mx-auto">
            Artinya: {dataNiatAktif.arti}
          </p>
        </div>
      </div>
    );
  };

  return (
    <div className="max-w-5xl mx-auto py-4">
      
      {/* 🌸 HEADER */}
      <div className="bg-emerald-600 text-white rounded-3xl p-8 md:p-10 mb-8 text-center shadow-lg bg-gradient-to-br from-emerald-500 to-emerald-700 dark:from-slate-800 dark:to-slate-900 border dark:border-slate-700 relative overflow-hidden">
        <div className="absolute top-4 left-6 opacity-20 text-6xl md:text-7xl animate-pulse">☁️</div>
        <div className="absolute bottom-6 right-10 opacity-20 text-5xl animate-pulse" style={{ animationDelay: '0.5s' }}>✨</div>
        <div className="absolute top-8 right-24 opacity-10 text-4xl animate-bounce" style={{ animationDuration: '3s' }}>🕌</div>

        <div className="relative z-10">
          <p className="text-emerald-100 dark:text-emerald-400 font-medium tracking-widest uppercase text-xs mb-2">
            Pusat Edukasi 🌸
          </p>
          <h1 className="text-3xl md:text-5xl font-bold mb-3 drop-shadow-sm">
            Panduan Ibadah
          </h1>
          <p className="text-emerald-50 dark:text-slate-300 text-lg md:text-xl font-medium">
            Langkah-langkah tata cara ibadah yang benar. ✨
          </p>
        </div>
      </div>

      {/* 🧭 TABS UTAMA */}
      <div className="flex flex-wrap justify-center mb-10">
        <div className="bg-slate-200/50 dark:bg-slate-800 p-1.5 rounded-3xl flex flex-wrap justify-center gap-2 border border-slate-100 dark:border-slate-700">
          <button onClick={() => setTabAktif('wudhu')} className={`px-6 py-2.5 rounded-2xl font-bold transition-all ${tabAktif === 'wudhu' ? 'bg-blue-50 dark:bg-blue-900/40 text-blue-600 dark:text-blue-400 shadow-sm border border-blue-200' : 'text-slate-500 hover:text-slate-700 border border-transparent'}`}>💧 Wudhu</button>
          <button onClick={() => setTabAktif('sholat')} className={`px-6 py-2.5 rounded-2xl font-bold transition-all ${tabAktif === 'sholat' ? 'bg-emerald-50 dark:bg-emerald-900/40 text-emerald-600 dark:text-emerald-400 shadow-sm border border-emerald-200' : 'text-slate-500 hover:text-slate-700 border border-transparent'}`}>🕌 Sholat</button>
          <button onClick={() => setTabAktif('haji')} className={`px-6 py-2.5 rounded-2xl font-bold transition-all ${tabAktif === 'haji' ? 'bg-amber-50 dark:bg-amber-900/40 text-amber-600 dark:text-amber-400 shadow-sm border border-amber-200' : 'text-slate-500 hover:text-slate-700 border border-transparent'}`}>🕋 Haji & Umrah</button>
        </div>
      </div>

      {/* ========================================= */}
      {/* 💧 KONTEN TAB: WUDHU */}
      {/* ========================================= */}
      {tabAktif === 'wudhu' && (
        <div className="space-y-6 pb-10 animate-fade-in">
          {dataWudhu.map((item) => (
            <div key={item.id} className="bg-white dark:bg-slate-800 rounded-3xl p-6 md:p-8 shadow-sm border border-slate-100 dark:border-slate-700 transition duration-300 hover:shadow-md hover:-translate-y-1 group">
              <h3 className="text-xl font-bold text-blue-700 dark:text-blue-400 mb-4 border-b border-slate-100 dark:border-slate-700 pb-3">
                <span className="mr-2">✨</span> {item.judul}
              </h3>
              <p className="text-slate-700 dark:text-slate-300 leading-relaxed mb-4 text-lg">{item.deskripsi}</p>
              
              {item.arab && (
                <div className="bg-blue-50/50 dark:bg-slate-900/50 rounded-2xl p-6 border border-blue-100 dark:border-slate-700 mt-4 shadow-inner">
                  <p className="text-right text-3xl md:text-4xl font-arab text-blue-800 dark:text-blue-300 py-2 mb-4 leading-loose break-words" style={{ lineHeight: '2.5' }} dir="rtl">{item.arab}</p>
                  <p className="text-blue-600 dark:text-blue-400 font-medium italic mb-2 text-lg">{item.latin}</p>
                  <p className="text-slate-600 dark:text-slate-400">"{item.arti}"</p>
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      {/* ========================================= */}
      {/* 🕌 KONTEN TAB: SHOLAT (TERINTEGRASI DGN JSON BARU) */}
      {/* ========================================= */}
      {tabAktif === 'sholat' && (
        <div className="animate-fade-in pb-10">
          
          {/* Sub-Tabs: Kategori Sholat */}
          <div className="flex flex-wrap justify-center gap-2 mb-10">
            {daftarKategoriSholat.map((kategori) => (
              <button key={kategori.id} onClick={() => setTipeSholat(kategori.id)}
                className={`px-5 py-2.5 rounded-full font-bold transition-all text-sm border-2 ${tipeSholat === kategori.id ? 'border-emerald-400 bg-emerald-50 text-emerald-700 dark:bg-emerald-900/30 dark:border-emerald-500 dark:text-emerald-400 scale-105 shadow-sm' : 'border-slate-100 text-slate-500 hover:border-emerald-200 dark:border-slate-700 dark:text-slate-400 bg-white dark:bg-slate-800'}`}>
                {kategori.label}
              </button>
            ))}
          </div>

          {/* Kotak Niat Sholat Dinamis */}
          {renderKotakNiat()}

          {/* List Tata Cara & Bacaan */}
          <h3 className="text-2xl font-black text-slate-800 dark:text-white mb-6 text-center tracking-tight">
            Urutan Bacaan & Tata Cara
          </h3>
          <div className="space-y-6">
            {daftarKategoriSholat.find(k => k.id === tipeSholat)?.data.map((item) => (
              <div key={item.id} className="bg-white dark:bg-slate-800 rounded-3xl p-6 md:p-8 shadow-[0_4px_20px_rgb(0,0,0,0.03)] border border-slate-100 dark:border-slate-700 flex flex-col items-start relative overflow-hidden group hover:border-emerald-300 dark:hover:border-emerald-600 transition-colors duration-300">
                
                <h4 className="text-xl font-bold text-emerald-700 dark:text-emerald-400 mb-3">{item.judul}</h4>
                <p className="text-slate-600 dark:text-slate-300 leading-relaxed text-base md:text-lg w-full text-justify mb-4">
                  {item.deskripsi}
                </p>

                {item.arab && (
                  <div className="bg-emerald-50/40 dark:bg-slate-900/40 w-full p-5 rounded-2xl border border-emerald-100/50 dark:border-slate-700/50 mt-2">
                    <p className="font-arab text-2xl md:text-3xl font-bold text-slate-800 dark:text-white text-right leading-loose mb-5" dir="rtl" style={{ lineHeight: '1.9' }}>
                      {item.arab}
                    </p>
                    <div className="space-y-2 pt-4 border-t border-emerald-100 dark:border-slate-700">
                      <div>
                        <p className="text-[10px] font-bold uppercase tracking-widest text-emerald-500 mb-1">Cara Baca</p>
                        <p className="text-sm md:text-base font-bold text-slate-600 dark:text-slate-300">{item.latin}</p>
                      </div>
                      <div className="pt-2">
                        <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-1">Artinya</p>
                        <p className="text-sm text-slate-500 dark:text-slate-400 italic">"{item.arti}"</p>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>

        </div>
      )}

      {/* ========================================= */}
      {/* 🕋 KONTEN TAB: HAJI & UMRAH (Timeline Asli) */}
      {/* ========================================= */}
      {tabAktif === 'haji' && (
        <div className="animate-fade-in pb-10">
          <div className="flex justify-center gap-4 mb-10">
            <button onClick={() => setTipeHaji('umrah')} className={`px-8 py-3 rounded-full font-bold border-2 transition-all ${tipeHaji === 'umrah' ? 'border-amber-400 bg-amber-50 text-amber-700 dark:bg-amber-900/30 dark:border-amber-500 scale-105 shadow-sm' : 'border-slate-200 text-slate-500 hover:border-amber-300 dark:border-slate-700 bg-white dark:bg-slate-800'}`}>Langkah Umrah 🕋</button>
            <button onClick={() => setTipeHaji('haji')} className={`px-8 py-3 rounded-full font-bold border-2 transition-all ${tipeHaji === 'haji' ? 'border-amber-400 bg-amber-50 text-amber-700 dark:bg-amber-900/30 dark:border-amber-500 scale-105 shadow-sm' : 'border-slate-200 text-slate-500 hover:border-amber-300 dark:border-slate-700 bg-white dark:bg-slate-800'}`}>Langkah Haji ⛺</button>
          </div>

          <div className="max-w-3xl mx-auto space-y-6">
            {dataHajiUmrah[tipeHaji].map((langkah, index) => (
              <div key={langkah.id} className="bg-white dark:bg-slate-800 rounded-3xl p-6 md:p-8 shadow-sm border border-slate-100 dark:border-slate-700 flex gap-5 md:gap-6 items-start group hover:-translate-y-1 hover:shadow-amber-500/10 hover:border-amber-300 dark:hover:border-amber-600/50 transition-all duration-300 relative overflow-hidden">
                {index !== dataHajiUmrah[tipeHaji].length - 1 && (
                  <div className="absolute left-[3.25rem] md:left-[3.75rem] top-24 bottom-[-2rem] w-1 bg-amber-100 dark:bg-slate-700 rounded-full group-hover:bg-amber-300 dark:group-hover:bg-amber-500/50 transition-colors z-0 hidden sm:block"></div>
                )}
                <div className="w-14 h-14 md:w-16 md:h-16 shrink-0 bg-amber-50 dark:bg-amber-900/40 text-3xl flex items-center justify-center rounded-2xl border border-amber-200 dark:border-amber-800/50 z-10 group-hover:scale-110 group-hover:bg-amber-100 transition-all shadow-sm">
                  {langkah.ikon}
                </div>
                <div className="pt-1 z-10">
                  <span className="text-xs font-bold uppercase tracking-widest text-amber-500 mb-1 block">Langkah {langkah.id}</span>
                  <h3 className="text-xl md:text-2xl font-bold text-slate-800 dark:text-slate-100 mb-2 group-hover:text-amber-600 dark:group-hover:text-amber-400 transition-colors">{langkah.judul}</h3>
                  <p className="text-slate-600 dark:text-slate-300 leading-relaxed text-base md:text-lg">{langkah.deskripsi}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

    </div>
  );
}