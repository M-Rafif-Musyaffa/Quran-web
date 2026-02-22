import { useState, useEffect } from 'react'; // Tambahkan useEffect
import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import QuotePopup from './QuotePopup';
import GlobalPlayer from './GlobalPlayer';
import useQuranStore from '../store/useQuranStore'; // Impor Gudang Data

export default function Layout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  
  // Ambil status tema saat ini dari Gudang Data
  const { theme } = useQuranStore();

  // 🌙 MANTRA AJAIB UNTUK DARK MODE
  // Efek ini akan memantau: setiap kali 'theme' berubah, ia akan mengubah warna website!
  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [theme]);

  return (
    <div className="flex min-h-screen bg-slate-50 dark:bg-slate-900 text-slate-800 dark:text-slate-100 transition-colors duration-500 font-sans">
      
      {/* SIDEBAR */}
      <Sidebar isOpen={sidebarOpen} toggleSidebar={() => setSidebarOpen(!sidebarOpen)} />

      {/* AREA KONTEN UTAMA */}
      <main className="flex-1 flex flex-col min-h-screen md:ml-72 w-full transition-all duration-500 relative overflow-hidden">
        
        {/* HEADER MOBILE */}
        <header className="md:hidden flex items-center justify-between p-4 bg-white/90 dark:bg-slate-900/90 backdrop-blur-md sticky top-0 z-30 border-b border-slate-200 dark:border-slate-800 shadow-sm">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-emerald-100 dark:bg-emerald-900/50 text-emerald-600 dark:text-emerald-400 rounded-lg flex items-center justify-center text-lg">
              🕌
            </div>
            <h1 className="font-bold text-lg text-slate-800 dark:text-slate-100 tracking-tight">Ruang<span className="text-emerald-500">Ibadah</span></h1>
          </div>
          <button 
            onClick={() => setSidebarOpen(true)}
            className="px-3 py-2 bg-slate-100 dark:bg-slate-800 rounded-xl text-slate-600 dark:text-slate-300 font-bold hover:bg-emerald-50 hover:text-emerald-600 transition"
          >
            ☰ Menu
          </button>
        </header>

        {/* WADAH KONTEN UTAMA */}
        <div className="flex-1 p-4 md:p-8 lg:p-10 w-full max-w-7xl mx-auto">
          <Outlet />
        </div>

        {/* FOOTER */}
        <footer className="text-center py-6 text-slate-500 dark:text-slate-500/70 text-sm border-t border-slate-200 dark:border-slate-800/50 mt-auto font-medium">
          Dibuat dengan ❤️ untuk menemani ibadahmu
        </footer>

      </main>

      {/* FITUR GLOBAL MELAYANG */}
      <QuotePopup />
      <GlobalPlayer />
      
    </div>
  );
}