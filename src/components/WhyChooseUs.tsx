import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Play, Pause, Volume2, VolumeX, Settings, Maximize, 
  ShieldCheck, Wrench, FileText, Smartphone, Headphones, 
  ChevronRight, ChevronLeft, Sparkles, Check, AlertCircle, Droplets, Info
} from 'lucide-react';

// Import images safely
import familyPhoto from '../assets/images/happy_family_kitchen_1784483599701.jpg';
import filtersPhoto from '../assets/images/water_filters_1784480612578.jpg';
import agentPhoto from '../assets/images/support_agent_1784480597301.jpg';

interface Chapter {
  id: number;
  title: string;
  sub: string;
  duration: number; // in seconds
}

const CHAPTERS: Chapter[] = [
  { id: 1, title: '1. Impure Water', sub: 'The raw water crisis', duration: 45 },
  { id: 2, title: '2. Advanced Purification', sub: 'Multi-stage filtration', duration: 45 },
  { id: 3, title: '3. Pure & Safe Water', sub: 'Healthy mineral balance', duration: 45 },
  { id: 4, title: '4. Expert Installation', sub: 'Hassle-free setup', duration: 45 },
  { id: 5, title: '5. Smart Monitoring', sub: 'Real-time filter life', duration: 45 },
  { id: 6, title: '6. Happy Families', sub: '10,000+ healthy homes', duration: 45 },
];

export default function WhyChooseUs() {
  const [activeChapter, setActiveChapter] = useState<number>(6); // Default to Happy Families to match poster
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [currentTime, setCurrentTime] = useState<number>(0);
  const [isMuted, setIsMuted] = useState<boolean>(false);
  const [volume, setVolume] = useState<number>(80);
  const [showSettings, setShowSettings] = useState<boolean>(false);
  const [playbackSpeed, setPlaybackSpeed] = useState<string>('1.0x');
  const [isFullscreen, setIsFullscreen] = useState<boolean>(false);

  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const playerRef = useRef<HTMLDivElement>(null);

  // Playback logic simulation
  useEffect(() => {
    if (isPlaying) {
      timerRef.current = setInterval(() => {
        setCurrentTime((prev) => {
          if (prev >= 45) {
            setIsPlaying(false);
            return 0;
          }
          return prev + 1;
        });
      }, 1000);
    } else {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    }

    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, [isPlaying]);

  // When chapter changes, reset playback
  const handleSelectChapter = (id: number) => {
    setActiveChapter(id);
    setIsPlaying(false);
    setCurrentTime(0);
  };

  const togglePlay = () => {
    setIsPlaying(!isPlaying);
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  // Carousel navigation
  const nextChapter = () => {
    setActiveChapter((prev) => (prev === 6 ? 1 : prev + 1));
    setCurrentTime(0);
    setIsPlaying(false);
  };

  const prevChapter = () => {
    setActiveChapter((prev) => (prev === 1 ? 6 : prev - 1));
    setCurrentTime(0);
    setIsPlaying(false);
  };

  // Fullscreen trigger simulation
  const toggleFullscreen = () => {
    if (!playerRef.current) return;
    if (!document.fullscreenElement) {
      playerRef.current.requestFullscreen().catch(() => {
        setIsFullscreen(!isFullscreen);
      });
      setIsFullscreen(true);
    } else {
      document.exitFullscreen();
      setIsFullscreen(false);
    }
  };

  return (
    <section className="w-full max-w-6xl mx-auto mb-12" id="why-choose-neapure-section">
      
      {/* Upper Brand/Header row */}
      <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 mb-8" id="why-choose-header-row">
        <div className="space-y-3 max-w-2xl text-left" id="why-choose-header-text">
          <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold bg-[#0A58CA]/15 text-[#0A58CA] uppercase tracking-wider font-heading shadow-xs" id="why-choose-badge">
            <Droplets className="w-3.5 h-3.5 fill-[#0A58CA]/10" />
            Why Choose NeaPure
          </span>
          <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight font-heading leading-tight">
            Why Thousands of Families <br className="hidden sm:block"/>
            <span className="text-[#0A58CA] relative">
              Trust NeaPure
              <span className="absolute left-0 right-0 -bottom-1 h-1 bg-blue-100 rounded-full -z-10" />
            </span>
          </h2>
          <p className="text-slate-500 text-sm md:text-base tracking-tight leading-relaxed font-medium">
            We go beyond just selling purifiers. We deliver pure water, complete trust, and lifelong support for your family.
          </p>
        </div>

        {/* Top Right circular badge styled to match image */}
        <div className="shrink-0 flex items-center justify-center self-start lg:self-center bg-blue-50/50 border border-blue-100 rounded-3xl p-5 md:p-6 shadow-sm hover:shadow-md transition-shadow duration-300 w-full sm:w-auto" id="trust-badge-circle">
          <div className="flex items-center gap-4" id="trust-badge-inner">
            <div className="w-12 h-12 rounded-full bg-blue-100/80 flex items-center justify-center text-[#0A58CA] shrink-0 border border-blue-200 shadow-xs">
              <ShieldCheck className="w-6 h-6 stroke-[2]" />
            </div>
            <div className="text-left">
              <span className="block text-xs text-slate-400 font-bold tracking-wider uppercase leading-none">Trusted by</span>
              <span className="block text-2xl font-black text-[#0A58CA] tracking-tight mt-1 font-heading">10,000+</span>
              <span className="block text-xs text-slate-500 font-semibold leading-none mt-0.5">Bangladesh Families</span>
            </div>
          </div>
        </div>
      </div>

      {/* 2-Column Responsive Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start" id="why-choose-grid">
        
        {/* Left Column: Video Player & Carousel (8 columns) */}
        <div className="lg:col-span-8 space-y-6" id="player-container-col">
          
          {/* Main Video Screen Container */}
          <div 
            ref={playerRef}
            className={`relative bg-slate-950 rounded-3xl overflow-hidden aspect-[16/10] shadow-xl border border-slate-900 group select-none
              ${isFullscreen ? 'fixed inset-0 z-50 w-screen h-screen rounded-none border-none' : ''}`}
            id="video-screen-player"
          >
            {/* Top Play Indicator Overlay */}
            <div className="absolute top-4 left-4 z-20 flex items-center gap-2 bg-slate-900/70 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/10 text-white text-xs font-semibold" id="top-indicator">
              <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
              <span>Play 45-second video</span>
            </div>

            {/* Video Contents depending on Active Chapter */}
            <div className="w-full h-full relative" id="player-content-window">
              <AnimatePresence mode="wait">
                {activeChapter === 1 && (
                  <motion.div 
                    key="impure-water"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="absolute inset-0 bg-gradient-to-br from-slate-900 via-amber-950/20 to-slate-950 flex flex-col items-center justify-center p-8 text-center"
                  >
                    <div className="absolute inset-0 bg-[radial-gradient(#ffffff03_1px,transparent_1px)] [background-size:16px_16px]" />
                    <AlertCircle className="w-16 h-16 text-amber-500 mb-4 animate-bounce" />
                    <h3 className="text-xl md:text-2xl font-bold text-white tracking-tight">Bangladesh Water Crisis</h3>
                    <p className="text-slate-400 text-xs md:text-sm max-w-md mt-2">
                      High TDS, iron, heavy metals, and bacteria contaminate tap water across Dhaka and divisional cities.
                    </p>
                    <div className="mt-4 bg-slate-900/80 border border-amber-500/30 rounded-xl px-4 py-2 flex items-center gap-3">
                      <span className="text-xs font-mono text-amber-400">AVERAGE TDS LEVEL:</span>
                      <span className="text-sm font-bold text-amber-500 font-mono animate-pulse">680 PPM (HIGHLY UNSAFE)</span>
                    </div>
                  </motion.div>
                )}

                {activeChapter === 2 && (
                  <motion.div 
                    key="purification-tech"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="absolute inset-0 bg-slate-950 flex flex-col items-center justify-center p-8 text-center"
                  >
                    <div className="absolute inset-0 bg-[radial-gradient(#0A58CA15_1px,transparent_1px)] [background-size:24px_24px] animate-pulse" />
                    <div className="flex gap-4 items-center mb-6" id="filtration-flow">
                      <div className="px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-800 text-[10px] font-bold text-slate-400">Sediment</div>
                      <span className="text-blue-500 animate-pulse">→</span>
                      <div className="px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-800 text-[10px] font-bold text-slate-400">Carbon</div>
                      <span className="text-blue-500 animate-pulse">→</span>
                      <div className="px-3 py-1.5 rounded-lg bg-blue-900/30 border border-blue-500/40 text-[10px] font-bold text-blue-400 animate-pulse">RO Membrane</div>
                      <span className="text-blue-500 animate-pulse">→</span>
                      <div className="px-3 py-1.5 rounded-lg bg-emerald-900/30 border border-emerald-500/40 text-[10px] font-bold text-emerald-400">UV-LED</div>
                    </div>
                    <h3 className="text-xl md:text-2xl font-bold text-white tracking-tight">Multi-Stage Filtration</h3>
                    <p className="text-slate-400 text-xs md:text-sm max-w-md mt-2">
                      Our advanced reverse osmosis membrane combined with double-acting UV sterilization removes 99.9% of biological and chemical impurities.
                    </p>
                  </motion.div>
                )}

                {activeChapter === 3 && (
                  <motion.div 
                    key="pure-water"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="absolute inset-0 bg-slate-900 flex items-center justify-center"
                  >
                    <img 
                      src={filtersPhoto} 
                      alt="Water Purifier Filters" 
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover opacity-80"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent" />
                    <div className="absolute bottom-16 left-6 right-6 text-left" id="pure-water-details">
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-bold bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 uppercase tracking-wider mb-2">
                        Safe Drinking Standard
                      </span>
                      <h3 className="text-lg md:text-xl font-bold text-white tracking-tight">Pure, Mineral-Rich Alkaline Water</h3>
                      <p className="text-slate-300 text-xs max-w-md mt-1 leading-relaxed">
                        Retains calcium, magnesium, and essential minerals to keep the pH balanced at an optimal 7.5 to 8.2 standard.
                      </p>
                    </div>
                  </motion.div>
                )}

                {activeChapter === 4 && (
                  <motion.div 
                    key="expert-install"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="absolute inset-0 bg-slate-900 flex items-center justify-center"
                  >
                    <img 
                      src={agentPhoto} 
                      alt="Expert Technician Support" 
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover opacity-70"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/25 to-transparent" />
                    <div className="absolute bottom-16 left-6 right-6 text-left" id="install-details">
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-bold bg-blue-500/20 text-blue-400 border border-blue-500/30 uppercase tracking-wider mb-2">
                        Professional Setup
                      </span>
                      <h3 className="text-lg md:text-xl font-bold text-white tracking-tight">Certified Technician Service</h3>
                      <p className="text-slate-300 text-xs max-w-md mt-1 leading-relaxed">
                        No-leak plumbing adjustments, kitchen tiles layout check, water input pressure balancing, and output TDS calibration completed free of charge.
                      </p>
                    </div>
                  </motion.div>
                )}

                {activeChapter === 5 && (
                  <motion.div 
                    key="smart-monitoring"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="absolute inset-0 bg-gradient-to-br from-slate-950 to-blue-950/30 flex items-center justify-center p-6"
                  >
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 items-center max-w-xl w-full" id="smart-app-mock">
                      {/* Left Side: Mock App dashboard */}
                      <div className="bg-slate-900 border border-white/10 rounded-2xl p-4 text-left space-y-3 shadow-lg" id="app-card-preview">
                        <div className="flex justify-between items-center pb-2 border-b border-white/5">
                          <span className="text-[10px] font-extrabold text-blue-400 uppercase tracking-widest">NeaPure Smart Care</span>
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                        </div>
                        <div className="space-y-1">
                          <span className="block text-[9px] text-slate-400 font-bold uppercase">Filter Health</span>
                          <div className="flex justify-between items-center">
                            <span className="text-lg font-black text-white font-mono">98.4%</span>
                            <span className="text-[10px] text-emerald-400 font-semibold">Perfect</span>
                          </div>
                          <div className="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden">
                            <div className="bg-emerald-500 h-full rounded-full" style={{ width: '98.4%' }} />
                          </div>
                        </div>
                        <div className="grid grid-cols-2 gap-2 text-[10px]">
                          <div className="bg-white/5 p-2 rounded-lg">
                            <span className="block text-[8px] text-slate-400 font-bold">PURIFIED</span>
                            <span className="font-extrabold text-white font-mono mt-0.5 block">142 Liters</span>
                          </div>
                          <div className="bg-white/5 p-2 rounded-lg">
                            <span className="block text-[8px] text-slate-400 font-bold">NEXT SERVICE</span>
                            <span className="font-extrabold text-white font-mono mt-0.5 block">142 Days</span>
                          </div>
                        </div>
                      </div>
                      {/* Right Side description */}
                      <div className="text-left space-y-2">
                        <h3 className="text-lg font-bold text-white tracking-tight">Smart Mobile Companion</h3>
                        <p className="text-slate-400 text-xs leading-relaxed">
                          Monitor continuous cartridge health, track volumetric daily consumption logs, and book certified services instantly inside our companion Android & iOS app.
                        </p>
                      </div>
                    </div>
                  </motion.div>
                )}

                {activeChapter === 6 && (
                  <motion.div 
                    key="happy-family"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="absolute inset-0 bg-slate-900 flex items-center justify-center"
                  >
                    <img 
                      src={familyPhoto} 
                      alt="Happy Family drinking clean NeaPure water" 
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent" />
                    <div className="absolute bottom-16 left-6 right-6 text-left" id="family-details">
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-bold bg-blue-500 text-white uppercase tracking-wider mb-2 shadow-sm font-heading">
                        Healthy Bangladesh Homes
                      </span>
                      <h3 className="text-xl md:text-2xl font-extrabold text-white tracking-tight leading-tight font-heading">
                        Over 10,000+ Families Saved from Contaminated Water
                      </h3>
                      <p className="text-slate-200 text-xs md:text-sm max-w-xl mt-1 leading-relaxed">
                        We are proud to serve healthy families across Dhaka, Chittagong, Sylhet, and key divisional hubs, delivering pure water daily.
                      </p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Central Big Floating Play button overlay if paused */}
            <AnimatePresence>
              {!isPlaying && (
                <motion.div 
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  className="absolute inset-0 flex items-center justify-center z-10 bg-slate-950/25 backdrop-blur-[2px]"
                  id="floating-play-overlay"
                >
                  <button
                    onClick={togglePlay}
                    className="w-20 h-20 md:w-24 md:h-24 rounded-full bg-[#0A58CA] hover:bg-blue-600 hover:scale-105 active:scale-95 text-white flex items-center justify-center transition-all duration-300 shadow-2xl cursor-pointer select-none outline-none border-4 border-white/40"
                    id="floating-play-btn"
                  >
                    <Play className="w-8 h-8 fill-white ml-1 text-white" />
                  </button>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Custom Video Controls Bar at bottom styled exactly to mock */}
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-slate-950 via-slate-950/90 to-transparent p-4 flex flex-col gap-3 z-20 opacity-95 group-hover:opacity-100 transition-opacity" id="player-controls-panel">
              
              {/* Progress Seek Bar */}
              <div className="relative w-full h-1.5 bg-white/20 rounded-full cursor-pointer overflow-hidden" id="seek-bar-track">
                <div 
                  className="bg-[#0A58CA] h-full rounded-full transition-all duration-300"
                  style={{ width: `${(currentTime / 45) * 100}%` }}
                />
              </div>

              {/* Controls triggers row */}
              <div className="flex items-center justify-between gap-4 text-white" id="controls-row">
                
                {/* Left controls cluster */}
                <div className="flex items-center gap-4" id="left-controls">
                  <button 
                    onClick={togglePlay}
                    className="p-1 rounded-full hover:bg-white/10 text-white hover:text-blue-400 transition-all cursor-pointer"
                    id="controls-play-btn"
                  >
                    {isPlaying ? <Pause className="w-5 h-5 fill-white text-white" /> : <Play className="w-5 h-5 fill-white text-white" />}
                  </button>

                  <div className="text-xs font-semibold tracking-wider font-mono text-slate-300" id="controls-timer">
                    {formatTime(currentTime)} <span className="text-slate-500">/</span> 0:45
                  </div>
                </div>

                {/* Right controls cluster */}
                <div className="flex items-center gap-4" id="right-controls">
                  {/* Volume Control */}
                  <div className="flex items-center gap-2" id="volume-wrapper">
                    <button 
                      onClick={() => setIsMuted(!isMuted)}
                      className="p-1 rounded-full hover:bg-white/10 text-white transition-all cursor-pointer"
                      id="volume-btn"
                    >
                      {isMuted || volume === 0 ? <VolumeX className="w-5 h-5 text-slate-400" /> : <Volume2 className="w-5 h-5 text-white" />}
                    </button>
                    <input 
                      type="range"
                      min="0"
                      max="100"
                      value={isMuted ? 0 : volume}
                      onChange={(e) => {
                        setVolume(Number(e.target.value));
                        setIsMuted(false);
                      }}
                      className="w-16 h-1 bg-white/20 rounded-full appearance-none cursor-pointer accent-[#0A58CA] outline-none hidden sm:block"
                      id="volume-slider"
                    />
                  </div>

                  {/* Settings Trigger */}
                  <div className="relative" id="settings-wrapper">
                    <button 
                      onClick={() => setShowSettings(!showSettings)}
                      className="p-1 rounded-full hover:bg-white/10 text-white hover:text-blue-400 transition-all cursor-pointer"
                      id="settings-btn"
                    >
                      <Settings className="w-5 h-5" />
                    </button>
                    {showSettings && (
                      <div className="absolute bottom-8 right-0 bg-slate-900 border border-slate-800 rounded-xl p-2 w-32 shadow-xl text-left flex flex-col z-30" id="settings-popup">
                        <span className="block text-[9px] text-slate-400 font-bold uppercase p-1.5 tracking-widest border-b border-white/5">Speed</span>
                        {['0.75x', '1.0x', '1.5x', '2.0x'].map((speed) => (
                          <button
                            key={speed}
                            onClick={() => {
                              setPlaybackSpeed(speed);
                              setShowSettings(false);
                            }}
                            className={`w-full text-left text-xs px-2 py-1.5 rounded-lg font-semibold transition-colors
                              ${playbackSpeed === speed ? 'text-blue-400 bg-white/5' : 'text-slate-300 hover:bg-white/5'}`}
                          >
                            {speed}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Fullscreen Button */}
                  <button 
                    onClick={toggleFullscreen}
                    className="p-1 rounded-full hover:bg-white/10 text-white hover:text-blue-400 transition-all cursor-pointer"
                    id="fullscreen-btn"
                  >
                    <Maximize className="w-5 h-5" />
                  </button>
                </div>

              </div>

            </div>
          </div>

          {/* Video chapters selection carousel exactly matching mock carousel */}
          <div className="relative bg-slate-50 border border-slate-100 rounded-3xl p-4" id="chapter-carousel-section">
            <div className="flex items-center justify-between mb-3" id="chapter-carousel-header">
              <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">Chapters / Step-by-Step Guide</span>
              
              <div className="flex gap-1.5" id="carousel-arrows">
                <button 
                  onClick={prevChapter}
                  className="w-8 h-8 rounded-full bg-white border border-slate-200 text-slate-600 hover:text-blue-600 flex items-center justify-center hover:shadow-xs transition-all active:scale-95 cursor-pointer"
                  id="carousel-arrow-prev"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <button 
                  onClick={nextChapter}
                  className="w-8 h-8 rounded-full bg-white border border-slate-200 text-slate-600 hover:text-blue-600 flex items-center justify-center hover:shadow-xs transition-all active:scale-95 cursor-pointer"
                  id="carousel-arrow-next"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Carousel list of chapters */}
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3" id="chapters-list-grid">
              {CHAPTERS.map((ch) => {
                const isActive = activeChapter === ch.id;
                return (
                  <button
                    key={ch.id}
                    onClick={() => handleSelectChapter(ch.id)}
                    className={`p-3 rounded-2xl border text-left transition-all relative group overflow-hidden cursor-pointer outline-none select-none h-[110px] flex flex-col justify-between
                      ${isActive 
                        ? 'bg-blue-50/50 border-blue-500/20 ring-1 ring-blue-500/30' 
                        : 'bg-white border-slate-100 hover:border-slate-200'
                      }`}
                    id={`chapter-item-${ch.id}`}
                  >
                    {/* Tiny decorative play overlay inside item */}
                    <div className="flex items-center justify-between" id={`chapter-icon-row-${ch.id}`}>
                      <div className={`w-6 h-6 rounded-lg flex items-center justify-center shadow-xs transition-all
                        ${isActive ? 'bg-[#0A58CA] text-white' : 'bg-slate-100 text-slate-400 group-hover:bg-blue-50 group-hover:text-[#0A58CA]'}`}>
                        <Play className="w-2.5 h-2.5 fill-current" />
                      </div>
                      {isActive && (
                        <span className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-ping" />
                      )}
                    </div>

                    <div className="space-y-0.5" id={`chapter-text-row-${ch.id}`}>
                      <span className={`block text-[11px] font-bold tracking-tight leading-tight truncate
                        ${isActive ? 'text-[#0A58CA]' : 'text-slate-800'}`}>
                        {ch.title.split('. ')[1]}
                      </span>
                      <span className="block text-[9px] text-slate-400 font-semibold leading-none truncate">
                        {ch.sub}
                      </span>
                    </div>

                    {/* Progress tracking bar on bottom */}
                    {isActive && (
                      <div className="absolute bottom-0 left-0 right-0 h-1 bg-blue-100">
                        <div 
                          className="bg-[#0A58CA] h-full"
                          style={{ width: `${(currentTime / 45) * 100}%` }}
                        />
                      </div>
                    )}
                  </button>
                );
              })}
            </div>
          </div>

        </div>

        {/* Right Column: 5 key features/reasons to trust (4 columns) */}
        <div className="lg:col-span-4 space-y-4" id="reasons-list-col">
          
          {/* Section Description Card */}
          <div className="bg-slate-50 border border-slate-100 rounded-3xl p-5" id="why-choose-desc-box">
            <div className="flex gap-3 text-left" id="why-choose-desc-inner">
              <div className="w-10 h-10 rounded-xl bg-white border border-slate-100 flex items-center justify-center text-[#0A58CA] shrink-0 shadow-xs">
                <Sparkles className="w-5 h-5 fill-blue-50" />
              </div>
              <div>
                <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wider">The NeaPure Guarantee</h4>
                <p className="text-xs text-slate-400 leading-relaxed mt-1">
                  We promise safe water or full refund. Over 99% uptime with immediate technician response.
                </p>
              </div>
            </div>
          </div>

          {/* Reason item 1: Genuine Products */}
          <div 
            id="trust-reason-1"
            className="bg-white border border-slate-100 p-5 rounded-2xl flex items-start gap-4 hover:shadow-md hover:border-slate-200 transition-all duration-300 cursor-default"
          >
            <div className="w-12 h-12 rounded-xl bg-blue-50 border border-blue-100/60 flex items-center justify-center text-[#0A58CA] shrink-0">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div className="text-left space-y-0.5">
              <h3 className="font-bold text-[15px] text-slate-800 leading-tight font-heading">Genuine Products</h3>
              <p className="text-xs text-slate-400 leading-normal font-medium">
                100% original cartridges, food-grade pipes, certified RO membranes & parts.
              </p>
            </div>
          </div>

          {/* Reason item 2: Free Installation */}
          <div 
            id="trust-reason-2"
            className="bg-white border border-slate-100 p-5 rounded-2xl flex items-start gap-4 hover:shadow-md hover:border-slate-200 transition-all duration-300 cursor-default"
          >
            <div className="w-12 h-12 rounded-xl bg-blue-50 border border-blue-100/60 flex items-center justify-center text-[#0A58CA] shrink-0">
              <Wrench className="w-5 h-5" />
            </div>
            <div className="text-left space-y-0.5">
              <h3 className="font-bold text-[15px] text-slate-800 leading-tight font-heading">Free Installation</h3>
              <p className="text-xs text-slate-400 leading-normal font-medium">
                Professional, zero-leak certified wall-mount or under-sink installation across Bangladesh.
              </p>
            </div>
          </div>

          {/* Reason item 3: Digital Warranty */}
          <div 
            id="trust-reason-3"
            className="bg-white border border-slate-100 p-5 rounded-2xl flex items-start gap-4 hover:shadow-md hover:border-slate-200 transition-all duration-300 cursor-default"
          >
            <div className="w-12 h-12 rounded-xl bg-blue-50 border border-blue-100/60 flex items-center justify-center text-[#0A58CA] shrink-0">
              <FileText className="w-5 h-5" />
            </div>
            <div className="text-left space-y-0.5">
              <h3 className="font-bold text-[15px] text-slate-800 leading-tight font-heading">Digital Warranty</h3>
              <p className="text-xs text-slate-400 leading-normal font-medium">
                Easy paperless online registry, real-time SMS tracking & complete coverage claims.
              </p>
            </div>
          </div>

          {/* Reason item 4: Smart Care App */}
          <div 
            id="trust-reason-4"
            className="bg-white border border-slate-100 p-5 rounded-2xl flex items-start gap-4 hover:shadow-md hover:border-slate-200 transition-all duration-300 cursor-default"
          >
            <div className="w-12 h-12 rounded-xl bg-blue-50 border border-blue-100/60 flex items-center justify-center text-[#0A58CA] shrink-0">
              <Smartphone className="w-5 h-5" />
            </div>
            <div className="text-left space-y-0.5">
              <h3 className="font-bold text-[15px] text-slate-800 leading-tight font-heading">Smart Care App</h3>
              <p className="text-xs text-slate-400 leading-normal font-medium">
                Monitor cartridge remaining lifetime, water quality, and book on-demand services.
              </p>
            </div>
          </div>

          {/* Reason item 5: 24/7 Expert Support */}
          <div 
            id="trust-reason-5"
            className="bg-white border border-slate-100 p-5 rounded-2xl flex items-start gap-4 hover:shadow-md hover:border-slate-200 transition-all duration-300 cursor-default"
          >
            <div className="w-12 h-12 rounded-xl bg-blue-50 border border-blue-100/60 flex items-center justify-center text-[#0A58CA] shrink-0">
              <Headphones className="w-5 h-5" />
            </div>
            <div className="text-left space-y-0.5">
              <h3 className="font-bold text-[15px] text-slate-800 leading-tight font-heading">24/7 Expert Support</h3>
              <p className="text-xs text-slate-400 leading-normal font-medium">
                We are always online via Live Chat, direct call routing, or encrypted WhatsApp callbacks.
              </p>
            </div>
          </div>

        </div>

      </div>

    </section>
  );
}
