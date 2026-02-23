import { NavLink } from 'react-router-dom';
import useQuranStore from '../store/useQuranStore';

export default function Sidebar({ isOpen, toggleSidebar }) {
  // Mengambil state tema dari Gudang Data untuk fitur Dark Mode
  const { theme, toggleTheme } = useQuranStore();

  // Daftar Menu Lengkap & Terurut
  const menuItems = [
    { path: '/', name: 'Beranda', icon: '🏡' },
    { path: '/quran', name: 'Al-Quran', icon: '📖' },
    { path: '/khatam', name: 'Perencana Khatam', icon: '🎯' },
    { path: '/tajwid', name: 'Belajar Tajwid', icon: '📚' },
    { path: '/doa', name: 'Doa & Dzikir', icon: '🤲' },
    { path: '/tasbih', name: 'Tasbih Digital', icon: '📿' },
    { path: '/panduan', name: 'Panduan Ibadah', icon: '🕌' },
    { path: '/kalender', name: 'Kalender', icon: '🗓️' },
    { path: '/asmaul-husna', name: 'Asmaul Husna', icon: '✨' },
    { path: '/kamus', name: 'Kamus Islam', icon: '📚' },
    { path: '/pengaturan', name: 'Pengaturan', icon: '⚙️' },
  ];

  return (
    <>
      {/* BACKGROUND GELAP UNTUK MOBILE (Meredupkan layar belakang saat menu dibuka di HP) */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm z-40 md:hidden animate-fade-in"
          onClick={toggleSidebar}
        ></div>
      )}

      {/* CONTAINER SIDEBAR */}
      <div 
        className={`fixed top-0 left-0 h-full bg-white/95 dark:bg-slate-900/95 backdrop-blur-xl w-64 md:w-72 shadow-2xl md:shadow-[4px_0_24px_rgba(0,0,0,0.02)] border-r border-slate-100 dark:border-slate-800 z-50 transform transition-transform duration-500 ease-in-out flex flex-col
          ${isOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}
        `}
      >
        {/* 🌸 HEADER LOGO */}
        <div className="p-6 md:p-8 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-emerald-100 dark:bg-emerald-900/50 text-emerald-600 dark:text-emerald-400 rounded-xl flex items-center justify-center text-2xl shadow-sm border border-emerald-200 dark:border-emerald-800/50 transform transition hover:rotate-12">
              🕌
            </div>
            <div>
              <h1 className="text-xl font-black text-slate-800 dark:text-slate-100 tracking-tight">
                Ruang<span className="text-emerald-500">Ibadah</span>
              </h1>
              <p className="text-[10px] font-bold text-slate-400 tracking-widest uppercase">
                Teman Hijrahmu ✨
              </p>
            </div>
          </div>
          
          {/* Tombol Silang (Hanya muncul di HP) */}
          <button 
            onClick={toggleSidebar}
            className="md:hidden w-8 h-8 flex items-center justify-center rounded-full bg-slate-100 dark:bg-slate-800 text-slate-500 hover:text-red-500 transition-colors"
          >
            ✕
          </button>
        </div>

        {/* 📋 DAFTAR MENU (Bisa di-scroll kalau layarnya kecil) */}
        <nav className="flex-1 overflow-y-auto px-4 py-2 space-y-1.5 scrollbar-hide">
          {menuItems.map((item) => (
            <NavLink
              key={item.name}
              to={item.path}
              onClick={toggleSidebar} // Otomatis tutup menu di HP setelah diklik
              className={({ isActive }) => `
                flex items-center gap-3.5 px-4 py-3.5 rounded-2xl font-medium transition-all duration-300 group
                ${isActive 
                  ? 'bg-emerald-50 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400 shadow-sm border border-emerald-200/50 dark:border-emerald-800/50 scale-[1.02]' 
                  : 'text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800/50 hover:text-emerald-500 dark:hover:text-emerald-300 border border-transparent'}
              `}
            >
              {({ isActive }) => (
                <>
                  <span className={`text-xl transition-transform duration-300 ${isActive ? 'scale-110 drop-shadow-sm' : 'grayscale group-hover:grayscale-0'}`}>
                    {item.icon}
                  </span>
                  <span className={isActive ? 'font-bold' : ''}>
                    {item.name}
                  </span>
                  
                  {/* Titik indikator aktif di sebelah kanan */}
                  {isActive && (
                    <div className="ml-auto w-2 h-2 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.5)]"></div>
                  )}
                </>
              )}
            </NavLink>
          ))}
        </nav>

        {/* 🌙 FOOTER: TOMBOL DARK MODE */}
        <div className="p-6 mt-auto border-t border-slate-100 dark:border-slate-800 shrink-0">
          <button
            onClick={toggleTheme}
            className="w-full flex items-center justify-between px-4 py-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 font-bold hover:bg-emerald-50 hover:border-emerald-200 dark:hover:bg-slate-700 transition-all group"
          >
            <div className="flex items-center gap-3">
              <span className="text-xl group-hover:animate-pulse">
                {theme === 'light' ? '🌙' : '☀️'}
              </span>
              <span>{theme === 'light' ? 'Mode Gelap' : 'Mode Terang'}</span>
            </div>
            
            {/* Saklar Mini Lucu */}
            <div className={`w-10 h-6 rounded-full p-1 transition-colors duration-300 ${theme === 'dark' ? 'bg-emerald-500' : 'bg-slate-300'}`}>
              <div className={`w-4 h-4 bg-white rounded-full shadow-sm transition-transform duration-300 ${theme === 'dark' ? 'translate-x-4' : 'translate-x-0'}`}></div>
            </div>
          </button>
        </div>

      </div>
    </>
  );
}