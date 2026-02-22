import { useState, useRef, useEffect } from 'react';

export default function Tasbih() {
  const [count, setCount] = useState(0);
  const [totalDzikir, setTotalDzikir] = useState(0);
  const [mode, setMode] = useState('sholat');
  const [phaseIndex, setPhaseIndex] = useState(0);
  const [targetBebas, setTargetBebas] = useState(33);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [soundEnabled, setSoundEnabled] = useState(true);

  const audioContextRef = useRef(null);

  // Load dari localStorage
  useEffect(() => {
    const savedTotal = localStorage.getItem('tasbihTotalDzikir');
    const savedSound = localStorage.getItem('tasbihSoundEnabled');
    if (savedTotal) setTotalDzikir(parseInt(savedTotal));
    if (savedSound !== null) setSoundEnabled(savedSound === 'true');
  }, []);

  // Save ke localStorage
  useEffect(() => {
    localStorage.setItem('tasbihTotalDzikir', totalDzikir);
  }, [totalDzikir]);

  useEffect(() => {
    localStorage.setItem('tasbihSoundEnabled', soundEnabled);
  }, [soundEnabled]);

  const phases = [
    { id: 0, nama: 'Subhanallah', arab: 'سُبْحَانَ ٱللَّٰهِ', arti: 'Maha Suci Allah', color: 'emerald' },
    { id: 1, nama: 'Alhamdulillah', arab: 'ٱلْحَمْدُ لِلَّٰهِ', arti: 'Segala Puji Bagi Allah', color: 'amber' },
    { id: 2, nama: 'Allahu Akbar', arab: 'ٱللَّٰهُ أَكْبَرُ', arti: 'Allah Maha Besar', color: 'sky' },
    { id: 3, nama: 'Selesai', arab: 'لَا إِلَٰهَ إِلَّا ٱللَّٰهُ', arti: 'Tiada Tuhan Selain Allah', color: 'rose' }
  ];

  const currentTarget = mode === 'sholat' ? (phaseIndex < 3 ? 33 : 1) : targetBebas;
  const progress = isTransitioning ? 100 : Math.min((count / currentTarget) * 100, 100);

  const activeColor = mode === 'sholat' ? phases[phaseIndex].color : 'emerald';
  const theme = {
    emerald: { text: 'text-emerald-600 dark:text-emerald-400', ring: 'text-emerald-400', glow: 'drop-shadow-[0_0_20px_rgba(52,211,153,0.7)]', buttonBg: 'bg-emerald-50/90 dark:bg-slate-800/90', border: 'border-emerald-300 dark:border-emerald-600', bgOrb: 'bg-emerald-400/10' },
    amber:   { text: 'text-amber-600 dark:text-amber-400', ring: 'text-amber-400', glow: 'drop-shadow-[0_0_20px_rgba(251,191,36,0.7)]', buttonBg: 'bg-amber-50/90 dark:bg-slate-800/90', border: 'border-amber-300 dark:border-amber-600', bgOrb: 'bg-amber-400/10' },
    sky:     { text: 'text-sky-600 dark:text-sky-400', ring: 'text-sky-400', glow: 'drop-shadow-[0_0_20px_rgba(56,189,248,0.7)]', buttonBg: 'bg-sky-50/90 dark:bg-slate-800/90', border: 'border-sky-300 dark:border-sky-600', bgOrb: 'bg-sky-400/10' },
    rose:    { text: 'text-rose-600 dark:text-rose-400', ring: 'text-rose-400', glow: 'drop-shadow-[0_0_20px_rgba(251,113,133,0.7)]', buttonBg: 'bg-rose-50/90 dark:bg-slate-800/90', border: 'border-rose-300 dark:border-rose-600', bgOrb: 'bg-rose-400/10' }
  }[activeColor];

  const triggerVibration = (type) => {
    if (!navigator.vibrate) return;
    if (type === 'tap') navigator.vibrate(45);
    if (type === 'done') navigator.vibrate([120, 60, 120, 60, 180]);
  };

  const getAudioContext = () => {
    if (!audioContextRef.current) {
      audioContextRef.current = new (window.AudioContext || window.webkitAudioContext)();
    }
    return audioContextRef.current;
  };

  const playTapSound = () => {
    if (!soundEnabled) return;
    const ctx = getAudioContext();
    const oscillator = ctx.createOscillator();
    const gain = ctx.createGain();

    oscillator.type = 'sine';
    oscillator.frequency.setValueAtTime(920, ctx.currentTime);
    gain.gain.setValueAtTime(0.15, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.08);

    oscillator.connect(gain);
    gain.connect(ctx.destination);
    oscillator.start();
    oscillator.stop(ctx.currentTime + 0.1);
  };

  const playDoneSound = () => {
    if (!soundEnabled) return;
    const ctx = getAudioContext();
    const notes = [880, 1100, 1320];
    let time = ctx.currentTime;

    notes.forEach((freq) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, time);
      gain.gain.setValueAtTime(0.25, time);
      gain.gain.exponentialRampToValueAtTime(0.001, time + 0.6);

      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(time);
      osc.stop(time + 0.6);
      time += 0.18;
    });
  };

  const handleTap = () => {
    if (isTransitioning) return;

    if (mode === 'sholat' && phaseIndex === 3) {
      setCount(0);
      setPhaseIndex(0);
      triggerVibration('tap');
      playTapSound();
      return;
    }

    const newCount = count + 1;
    setCount(newCount);
    setTotalDzikir(prev => prev + 1);

    playTapSound();
    triggerVibration('tap');

    if (newCount >= currentTarget) {
      triggerVibration('done');
      playDoneSound();

      if (mode === 'sholat') {
        setIsTransitioning(true);
        const delay = phaseIndex === 3 ? 1800 : 1550;
        setTimeout(() => {
          setPhaseIndex(p => p === 3 ? 0 : p + 1);
          setCount(0);
          setIsTransitioning(false);
        }, delay);
      }
    }
  };

  const reset = () => {
    setCount(0);
    setIsTransitioning(false);
    triggerVibration('tap');
    playTapSound();
  };

  const toggleSound = () => {
    setSoundEnabled(!soundEnabled);
    if (!soundEnabled) {
      setTimeout(playTapSound, 50); 
    }
  };

  const radius = 132;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (progress / 100) * circumference;

  return (
    <div className="max-w-4xl mx-auto py-4">

      {/* HEADER UTAMA */}
      <div className="bg-emerald-600 text-white rounded-[2rem] p-6 sm:p-8 md:p-10 mb-8 shadow-lg bg-gradient-to-br from-emerald-500 to-emerald-700 dark:from-slate-800 dark:to-slate-900 border dark:border-slate-700 relative overflow-hidden flex flex-col md:flex-row items-center justify-between gap-6">
        
        <div className="absolute top-4 left-6 opacity-20 text-6xl md:text-7xl animate-pulse">☁️</div>
        <div className="absolute bottom-6 right-10 opacity-20 text-5xl animate-pulse" style={{ animationDelay: '0.5s' }}>✨</div>

        <div className="relative z-10 text-center md:text-left">
          <p className="text-emerald-100 dark:text-emerald-400 font-medium tracking-widest uppercase text-xs mb-2">
            Penyejuk Hati 🌿
          </p>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-2 md:mb-3 drop-shadow-sm tracking-tight">
            Tasbih Digital
          </h1>
          <p className="text-emerald-50 dark:text-slate-300 text-sm md:text-lg font-medium">
            Berdzikir dengan nyaman dan tenang.
          </p>
        </div>

        <div className="relative z-10 bg-white/20 dark:bg-slate-900/50 backdrop-blur-md px-6 py-4 rounded-2xl border border-white/30 dark:border-slate-700 flex items-center gap-4 w-full md:w-auto justify-center md:justify-start">
          <span className="text-3xl sm:text-4xl">📿</span>
          <div className="text-left">
            <p className="text-[10px] sm:text-xs tracking-widest uppercase text-emerald-100 dark:text-emerald-400 font-bold mb-0.5">Total Hari Ini</p>
            <p className="text-2xl sm:text-3xl font-black tabular-nums tracking-tighter leading-none">{totalDzikir}</p>
          </div>
        </div>

      </div>

      {/* TABS MODE TASBIH */}
      <div className="flex justify-center mb-8">
        <div className="bg-slate-200/50 dark:bg-slate-800 p-1.5 rounded-full flex flex-wrap justify-center gap-1 shadow-inner border border-slate-200 dark:border-slate-700 w-full sm:w-auto max-w-fit">
          <button onClick={() => { setMode('sholat'); setCount(0); setPhaseIndex(0); setIsTransitioning(false); }}
            className={`px-5 sm:px-8 py-3 rounded-full font-bold transition-all text-xs sm:text-sm md:text-base flex items-center justify-center gap-2 flex-1 sm:flex-none ${mode === 'sholat' ? 'bg-white dark:bg-slate-700 text-emerald-600 dark:text-emerald-400 shadow-sm' : 'text-slate-500 dark:text-slate-400 hover:text-emerald-600 dark:hover:text-emerald-300'}`}>
            🕌 Sholat
          </button>
          <button onClick={() => { setMode('bebas'); setCount(0); setIsTransitioning(false); }}
            className={`px-5 sm:px-8 py-3 rounded-full font-bold transition-all text-xs sm:text-sm md:text-base flex items-center justify-center gap-2 flex-1 sm:flex-none ${mode === 'bebas' ? 'bg-white dark:bg-slate-700 text-emerald-600 dark:text-emerald-400 shadow-sm' : 'text-slate-500 dark:text-slate-400 hover:text-emerald-600 dark:hover:text-emerald-300'}`}>
            ♾️ Bebas
          </button>
        </div>
      </div>

      {/* 💎 KARTU UTAMA TASBIH */}
      <div className="bg-white dark:bg-slate-800 rounded-[2.5rem] p-6 sm:p-8 md:p-14 shadow-sm border border-slate-100 dark:border-slate-700 max-w-2xl mx-auto relative overflow-hidden flex flex-col items-center">

        <div className={`absolute -top-28 -left-28 w-[340px] h-[340px] rounded-full blur-[80px] opacity-40 ${theme.bgOrb} pointer-events-none`}></div>
        <div className={`absolute -bottom-28 -right-28 w-[340px] h-[340px] rounded-full blur-[80px] opacity-40 ${theme.bgOrb} pointer-events-none`}></div>

        {/* MODE SHOLAT: FASE & ARAB */}
        {mode === 'sholat' && (
          <div className="w-full relative z-10 flex flex-col items-center">
            
            <div className="flex flex-wrap justify-center gap-2 mb-8 w-full">
              {phases.map((p, i) => {
                const isActive = phaseIndex === i;
                const colorMap = {
                  emerald: isActive ? 'bg-emerald-100 text-emerald-700 border-emerald-400 dark:bg-emerald-900/60 dark:text-emerald-300' : 'hover:bg-emerald-50 dark:hover:bg-slate-700',
                  amber: isActive ? 'bg-amber-100 text-amber-700 border-amber-400 dark:bg-amber-900/60 dark:text-amber-300' : 'hover:bg-amber-50 dark:hover:bg-slate-700',
                  sky: isActive ? 'bg-sky-100 text-sky-700 border-sky-400 dark:bg-sky-900/60 dark:text-sky-300' : 'hover:bg-sky-50 dark:hover:bg-slate-700',
                  rose: isActive ? 'bg-rose-100 text-rose-700 border-rose-400 dark:bg-rose-900/60 dark:text-rose-300' : 'hover:bg-rose-50 dark:hover:bg-slate-700',
                };
                return (
                  <button key={p.id} onClick={() => { setPhaseIndex(i); setCount(0); setIsTransitioning(false); }}
                    className={`px-3 sm:px-5 py-2 sm:py-2.5 rounded-xl text-[11px] sm:text-xs md:text-sm font-bold border-2 transition-all duration-300 ${isActive ? colorMap[p.color] + ' scale-105 shadow-sm' : 'border-slate-100 dark:border-slate-700 text-slate-500 dark:text-slate-400 bg-white dark:bg-slate-800 ' + colorMap[p.color]}`}
                  >
                    {p.nama}
                  </button>
                );
              })}
            </div>

            {/* Tulisan Arab (PERBAIKAN OFFSIDE DI SINI!) */}
            <div className={`text-center mb-10 transition-colors duration-500 ${theme.text}`}>
              <div className="bg-slate-50 dark:bg-slate-900/50 px-6 sm:px-10 py-6 sm:py-8 rounded-3xl border border-slate-100 dark:border-slate-700 shadow-inner inline-flex items-center justify-center min-w-[280px] max-w-full">
                <h2 
                  className="text-4xl sm:text-5xl md:text-6xl font-arab font-black" 
                  dir="rtl" 
                  style={{ lineHeight: '1.8', paddingBottom: '0.2rem' }}
                >
                  {phases[phaseIndex].arab}
                </h2>
              </div>
              <p className="mt-5 text-sm sm:text-base font-medium opacity-80">{phases[phaseIndex].arti}</p>
            </div>
          </div>
        )}

        {/* CONTAINER CINCIN & TOMBOL */}
        <div className="relative w-[260px] h-[260px] sm:w-[320px] sm:h-[320px] md:w-[360px] md:h-[360px] flex items-center justify-center mb-10 z-10 shrink-0">
          
          <svg className="absolute inset-0 w-full h-full -rotate-90 pointer-events-none" viewBox="0 0 300 300">
            <circle cx="150" cy="150" r={radius} fill="none" strokeWidth="16" className="stroke-slate-100 dark:stroke-slate-700" />
            <circle 
              cx="150" cy="150" r={radius} fill="none" stroke="currentColor" strokeWidth="16"
              strokeDasharray={circumference} strokeDashoffset={strokeDashoffset}
              strokeLinecap="round" className={`${theme.ring} transition-all duration-700 ease-out ${progress > 0 ? theme.glow : ''}`}
            />
          </svg>

          <button
            onClick={handleTap}
            disabled={isTransitioning}
            className={`absolute w-[82%] h-[82%] rounded-full flex flex-col items-center justify-center active:scale-95 transition-all duration-300 shadow-[0_10px_40px_rgba(0,0,0,0.08)] border-[6px] outline-none focus:outline-none select-none
              ${theme.border} ${theme.buttonBg} 
              ${isTransitioning ? 'ring-[12px] ring-emerald-400/30' : ''}
            `}
            style={{ WebkitTapHighlightColor: 'transparent' }}
          >
            {isTransitioning ? (
              <div className="text-center px-2">
                <div className="text-5xl sm:text-6xl mb-2 animate-bounce">🌸</div>
                <p className={`font-bold text-2xl sm:text-3xl tracking-widest ${theme.text}`}>MashaAllah</p>
                <p className="text-slate-500 dark:text-slate-400 text-[10px] sm:text-xs mt-1 leading-tight px-4">Semoga dzikir diterima 🌿</p>
              </div>
            ) : (
              <>
                <span className={`text-7xl sm:text-[80px] md:text-[96px] font-black tabular-nums tracking-[-2px] transition-colors duration-500 ${theme.text} leading-none`}>
                  {count}
                </span>
                <span className="uppercase text-[10px] sm:text-xs font-bold tracking-[1.5px] text-slate-400 dark:text-slate-500 mt-2 bg-white/50 dark:bg-slate-800/50 px-3 py-1 rounded-full shadow-sm">
                  {mode === 'sholat' && phaseIndex === 3 ? 'Selesai' : `Target ${currentTarget}`}
                </span>
              </>
            )}
          </button>
        </div>

        {/* KONTROL BAWAH */}
        <div className="flex flex-wrap justify-center items-center gap-3 sm:gap-4 relative z-10 w-full">
          
          <button onClick={reset} className="w-12 h-12 sm:w-14 sm:h-14 bg-white dark:bg-slate-800 rounded-2xl flex items-center justify-center text-xl sm:text-2xl shadow-sm transition-all active:scale-90 border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-700" title="Reset">
            🔄
          </button>

          <button onClick={toggleSound} className="w-12 h-12 sm:w-14 sm:h-14 bg-white dark:bg-slate-800 rounded-2xl flex items-center justify-center text-xl sm:text-2xl shadow-sm transition-all active:scale-90 border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-700" title={soundEnabled ? "Matikan Suara" : "Nyalakan Suara"}>
            {soundEnabled ? '🔊' : '🔇'}
          </button>

          {mode === 'bebas' && (
            <div className="bg-slate-50 dark:bg-slate-900/50 rounded-2xl p-1.5 shadow-inner flex gap-1 border border-slate-100 dark:border-slate-700">
              {[33, 100, 1000].map(n => (
                <button key={n} onClick={() => { setTargetBebas(n); setCount(0); setIsTransitioning(false); }}
                  className={`px-4 sm:px-6 py-2 sm:py-3 rounded-xl font-bold transition-all text-xs sm:text-sm ${targetBebas === n ? 'bg-emerald-500 text-white shadow-md' : 'hover:bg-white dark:hover:bg-slate-700 text-slate-500 dark:text-slate-400'}`}>
                  {n}
                </button>
              ))}
            </div>
          )}
          
        </div>

      </div>
    </div>
  );
}