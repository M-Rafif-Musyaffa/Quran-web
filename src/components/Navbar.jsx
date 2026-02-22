import { Link } from 'react-router-dom';
import useQuranStore from '../store/useQuranStore';

export default function Navbar() {
  // Mengambil state tema dan fungsi tombol saklar dari Papan Tulis
  const { theme, toggleTheme } = useQuranStore();

  return (
    // dark:bg-slate-800 artinya "Kalau mode gelap aktif, ubah warna hijau ini jadi abu-abu gelap"
    <header className="bg-emerald-600 dark:bg-slate-900 text-white shadow-md sticky top-0 z-50 transition-colors duration-300">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold tracking-wider">
          📖 WebQuran
        </Link>
        <nav className="flex items-center gap-4 md:gap-6">
          <Link to="/" className="hover:text-emerald-200 transition font-medium">Beranda</Link>
          <Link to="/doa" className="hover:text-emerald-200 transition font-medium">Doa Harian</Link>
          <Link to="/tasbih" className="hover:text-emerald-200 transition font-medium">Tasbih</Link>
          <Link to="/panduan" className="hover:text-emerald-200 transition font-medium">Panduan</Link>
          <Link to="/kalender" className="hover:text-emerald-200 transition font-medium">Kalender</Link>
          <Link to="/kamus" className="hover:text-emerald-200 transition font-medium">Kamus</Link>
          <Link to="/asmaul-husna" className="hover:text-emerald-200 transition font-medium hidden lg:block">Asmaul Husna</Link>
          
          <button 
            onClick={toggleTheme}
            className="text-xl p-2 rounded-full hover:bg-white/20 transition"
            title={theme === 'light' ? 'Nyalakan Mode Gelap' : 'Nyalakan Mode Terang'}
          >
            {theme === 'light' ? '🌙' : '☀️'}
          </button>
        </nav>
      </div>
    </header>
  );
}