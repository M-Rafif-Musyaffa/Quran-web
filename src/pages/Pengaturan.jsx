import useQuranStore from '../store/useQuranStore';

export default function Pengaturan() {
  // Mengambil semua fungsi dan state dari Gudang Data
  const { 
    ukuranFontArab, setUkuranFontArab,
    jenisFontArab, setJenisFontArab,
    qariAudio, setQariAudio
  } = useQuranStore();

  // Daftar Qari dari API EQuran
  const daftarQari = [
    { id: '01', nama: "Abdullah Al-Juhany" },
    { id: '02', nama: "Abdul Muhsin Al-Qasim" },
    { id: '03', nama: "Abdurrahman as-Sudais" },
    { id: '04', nama: "Ibrahim Al-Dawsari" },
    { id: '05', nama: "Misyari Rasyid Al-Afasi" }
  ];

  // Daftar Font Arab (Akan otomatis memanggil font dari Google Fonts/Sistem)
  const daftarFont = [
    { value: 'LPMQ IsepMisbah, Amiri, serif', nama: "LPMQ Kemenag (Standar Indonesia)" },
    { value: '"Amiri", serif', nama: "Amiri (Klasik & Elegan)" },
    { value: '"Scheherazade New", serif', nama: "Scheherazade (Sangat Jelas & Tebal)" },
    { value: '"Noto Naskh Arabic", sans-serif', nama: "Noto Naskh (Modern & Bersih)" }
  ];

  return (
    <div className="max-w-3xl mx-auto py-4">
      
      {/* Header */}
      <div className="text-center mb-10">
        <h1 className="text-3xl md:text-4xl font-bold text-slate-800 dark:text-slate-100 mb-3">
          ⚙️ Pengaturan Aplikasi
        </h1>
        <p className="text-slate-500 dark:text-slate-400">
          Sesuaikan pengalaman membaca Al-Quran sesuai kenyamananmu.
        </p>
      </div>

      <div className="space-y-8">

        {/* 1. PENGATURAN UKURAN HURUF */}
        <div className="bg-white dark:bg-slate-800 rounded-3xl p-6 md:p-8 shadow-sm border border-slate-100 dark:border-slate-700">
          <div className="flex items-center gap-3 mb-6">
            <span className="text-2xl bg-emerald-100 dark:bg-emerald-900/40 text-emerald-600 dark:text-emerald-400 w-10 h-10 flex items-center justify-center rounded-xl">🔎</span>
            <h2 className="text-xl font-bold text-slate-800 dark:text-slate-100">Ukuran Teks Arab</h2>
          </div>
          
          <div className="flex items-center gap-4 mb-8">
            <span className="text-lg text-slate-500 dark:text-slate-400">A-</span>
            <input 
              type="range" 
              min="24" 
              max="64" 
              value={ukuranFontArab}
              onChange={(e) => setUkuranFontArab(Number(e.target.value))}
              className="w-full h-2 bg-emerald-200 dark:bg-slate-700 rounded-lg appearance-none cursor-pointer accent-emerald-600"
            />
            <span className="text-2xl font-bold text-slate-800 dark:text-slate-100">A+</span>
          </div>

          {/* Preview Teks */}
          <div className="bg-slate-50 dark:bg-slate-900/50 p-6 rounded-2xl border border-slate-100 dark:border-slate-700 text-center overflow-x-auto">
            <p className="text-sm text-slate-400 mb-4 uppercase tracking-widest font-bold">Pratinjau Ukuran:</p>
            <p 
              className="text-emerald-700 dark:text-emerald-400"
              style={{ fontSize: `${ukuranFontArab}px`, fontFamily: jenisFontArab, lineHeight: '2' }}
              dir="rtl"
            >
              بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ
            </p>
          </div>
        </div>

        {/* 2. PENGATURAN JENIS HURUF (FONT) */}
        <div className="bg-white dark:bg-slate-800 rounded-3xl p-6 md:p-8 shadow-sm border border-slate-100 dark:border-slate-700">
          <div className="flex items-center gap-3 mb-6">
            <span className="text-2xl bg-emerald-100 dark:bg-emerald-900/40 text-emerald-600 dark:text-emerald-400 w-10 h-10 flex items-center justify-center rounded-xl">🔠</span>
            <h2 className="text-xl font-bold text-slate-800 dark:text-slate-100">Jenis Khat (Kaligrafi)</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {daftarFont.map((font) => (
              <label 
                key={font.nama} 
                className={`flex items-center justify-between p-4 rounded-xl border cursor-pointer transition-all ${
                  jenisFontArab === font.value 
                  ? 'border-emerald-500 bg-emerald-50 dark:bg-emerald-900/20 shadow-sm' 
                  : 'border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800'
                }`}
              >
                <span className={`font-medium ${jenisFontArab === font.value ? 'text-emerald-700 dark:text-emerald-400' : 'text-slate-700 dark:text-slate-300'}`}>
                  {font.nama}
                </span>
                <input 
                  type="radio" 
                  name="font" 
                  value={font.value} 
                  checked={jenisFontArab === font.value} 
                  onChange={(e) => setJenisFontArab(e.target.value)}
                  className="w-5 h-5 accent-emerald-600"
                />
              </label>
            ))}
          </div>
        </div>

        {/* 3. PENGATURAN QARI (PEMBACA AUDIO) */}
        <div className="bg-white dark:bg-slate-800 rounded-3xl p-6 md:p-8 shadow-sm border border-slate-100 dark:border-slate-700">
          <div className="flex items-center gap-3 mb-6">
            <span className="text-2xl bg-emerald-100 dark:bg-emerald-900/40 text-emerald-600 dark:text-emerald-400 w-10 h-10 flex items-center justify-center rounded-xl">🎙️</span>
            <h2 className="text-xl font-bold text-slate-800 dark:text-slate-100">Suara Qari (Lantunan Audio)</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {daftarQari.map((qari) => (
              <label 
                key={qari.id} 
                className={`flex items-center justify-between p-4 rounded-xl border cursor-pointer transition-all ${
                  qariAudio === qari.id 
                  ? 'border-emerald-500 bg-emerald-50 dark:bg-emerald-900/20 shadow-sm' 
                  : 'border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800'
                }`}
              >
                <div className="flex items-center gap-3">
                  <span className="text-2xl text-slate-400">👤</span>
                  <span className={`font-medium ${qariAudio === qari.id ? 'text-emerald-700 dark:text-emerald-400' : 'text-slate-700 dark:text-slate-300'}`}>
                    Syeikh {qari.nama}
                  </span>
                </div>
                <input 
                  type="radio" 
                  name="qari" 
                  value={qari.id} 
                  checked={qariAudio === qari.id} 
                  onChange={(e) => setQariAudio(e.target.value)}
                  className="w-5 h-5 accent-emerald-600"
                />
              </label>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}