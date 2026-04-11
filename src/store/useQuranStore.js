import { create } from 'zustand';
import { persist } from 'zustand/middleware';

// Menggunakan persist agar pengaturan DAN bookmark tidak hilang saat web ditutup
const useQuranStore = create(
  persist(
    (set) => ({
      // 1. PENGATURAN TEMA (Mode Gelap/Terang)
      theme: 'light',
      toggleTheme: () => set((state) => ({ theme: state.theme === 'light' ? 'dark' : 'light' })),
      
      // 2. FITUR BOOKMARK
      bookmark: null,
      setBookmark: (surahId, namaSurah, nomorAyat) => 
        set({ bookmark: { surahId, namaSurah, nomorAyat } }),

      // 3. PENGATURAN UKURAN HURUF ARAB
      ukuranFontArab: 36,
      setUkuranFontArab: (ukuran) => set({ ukuranFontArab: ukuran }),

      // 4. PENGATURAN JENIS HURUF ARAB
      jenisFontArab: 'LPMQ IsepMisbah, Amiri, serif',
      setJenisFontArab: (jenis) => set({ jenisFontArab: jenis }),

      // 5. PENGATURAN QARI (Pembaca Audio)
      qariAudio: '05',
      setQariAudio: (qari) => set({ qariAudio: qari }),

      audioData: null,
      setAudioData: (data) => set({ audioData: data }),
      tutupAudio: () => set({ audioData: null }),
      catatanKalender: {}, 
      tambahCatatan: (tanggal, data) => set((state) => ({
        catatanKalender: { ...state.catatanKalender, [tanggal]: data }
      })),
      hapusCatatan: (tanggal) => set((state) => {
        const jadwalBaru = { ...state.catatanKalender };
        delete jadwalBaru[tanggal]; 
        return { catatanKalender: jadwalBaru };
      }),
      moodHariIni: null,
      setMoodHariIni: (mood) => set({ moodHariIni: mood }),
    }),
    {
      name: 'webquran-storage', // Kunci penyimpanan di browser
    }
  )
);

export default useQuranStore;
