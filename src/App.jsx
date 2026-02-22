import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import SurahDetail from './pages/SurahDetail';
import Doa from './pages/Doa';
import Tasbih from './pages/Tasbih';
import DoaDetail from './pages/DoaDetail';
import Panduan from './pages/Panduan';
import Kalender from './pages/Kalender';
import Kamus from './pages/Kamus';
import AsmaulHusna from './pages/AsmaulHusna';
import Pengaturan from './pages/Pengaturan';
import Quran from './pages/Quran';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="surah/:id" element={<SurahDetail />} />
          
          <Route path="doa" element={<Doa />} />
          <Route path="tasbih" element={<Tasbih />} />
          <Route path="doa/:id" element={<DoaDetail />} />
          <Route path="panduan" element={<Panduan />} />
          <Route path="kalender" element={<Kalender />} />
          <Route path="kamus" element={<Kamus />} />
          <Route path="asmaul-husna" element={<AsmaulHusna />} />
          <Route path="pengaturan" element={<Pengaturan />} />
          <Route path="/" element={<Home />} />
          <Route path="/quran" element={<Quran />} />  {/* INI BARU */}
          <Route path="/surah/:id" element={<SurahDetail />} />

        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;