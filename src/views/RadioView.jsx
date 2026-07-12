import React, { useState, useRef, useEffect } from 'react';
import { Play, Pause, Volume2, VolumeX, Radio, Mic2, RadioTower } from 'lucide-react';
import RevealOnScroll from '../components/ui/RevealOnScroll';
import { RADIO_CONFIG } from "../data/radioConfig";
import { radioData } from "../data/mockData";
import Logo from '../assets/img/logo.png';

const RadioView = () => {
  const audioRef = useRef(null);
  const [volume, setVolume] = useState(1);
  const [showVolume, setShowVolume] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [nowPlaying] = useState({
    title: "Radio en Vivo",
    artist: "Transmisión 24/7",
  });
  const volumeRef = useRef(null);
  
  const coverUrl = Logo;
  const [isLive] = useState(true);

  const togglePlay = () => {
    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current.volume = volume;
      audioRef.current.play();
      setIsPlaying(true);
    }
  };

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume;
    }
  }, [volume]);

  useEffect(() => { 
    const handleClickOutside = (e) => {
      if (volumeRef.current && !volumeRef.current.contains(e.target)) {
        setShowVolume(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="pt-28 pb-20 px-4 min-h-screen transition-colors duration-500 bg-gradient-to-b from-stone-50 to-stone-100 dark:from-[#141211] dark:to-[#1a1816]">
      {/* Elemento de Audio Invisible */}
      <audio ref={audioRef} src={RADIO_CONFIG.streamUrl} preload="none" crossOrigin="anonymous" />
      
      <div className="max-w-6xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-8 items-center mb-16">
          
          {/* Lado Izquierdo: Información */}
          <RevealOnScroll direction="right">
            <div className="text-center lg:text-left space-y-6">
              {isLive && (
                <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-red-50 dark:bg-red-950/40 text-red-600 dark:text-red-400 border border-red-200/60 dark:border-red-900/40 text-xs font-black tracking-wider uppercase animate-pulse shadow-sm">
                  <span className="w-2 h-2 rounded-full bg-red-500 shadow-sm shadow-red-500"></span>
                  TRANSMISIÓN CONTINUA
                </div>
              )}
              
              <h1 className="font-serif text-5xl md:text-7xl font-black text-stone-900 dark:text-white tracking-tight leading-none">
                {radioData.stationName}
              </h1>
              
              <p className="text-2xl md:text-3xl text-[#3D6599] dark:text-[#C7DBEB] font-serif italic font-medium leading-relaxed max-w-xl">
                "{radioData.slogan}"
              </p>
              
              <p className="text-stone-600 dark:text-stone-400 max-w-md mx-auto lg:mx-0 leading-relaxed font-medium">
                Disfruta de la mejor música cristiana, mensajes edificantes y compañía espiritual las 24 horas del día.
              </p>
            </div>
          </RevealOnScroll>

          {/* Lado Derecho: Reproductor de Alta Gama */}
          <RevealOnScroll direction="left">
            <div className="flex justify-center w-full relative group">
              
              {/* Resplandor de fondo dinámico */}
              <div className={`absolute -inset-4 bg-gradient-to-tr from-[#3D6599]/20 to-[#C7DBEB]/20 rounded-[44px] blur-3xl opacity-70 transition-opacity duration-700 ${isPlaying ? 'opacity-100' : 'opacity-40'}`} />

              {/* Contenedor Principal */}
              <div className="bg-white/80 dark:bg-[#1a1816]/90 backdrop-blur-xl rounded-[40px] p-8 md:p-10 shadow-[0_32px_64px_-16px_rgba(45,38,34,0.12)] dark:shadow-[0_40px_80px_-24px_rgba(0,0,0,0.7)] border border-white/60 dark:border-stone-800/60 relative w-full max-w-md flex flex-col items-center z-10 transition-transform duration-500 hover:scale-[1.01]">
                
                {/* Zona de Carátula con Efecto Aura */}
                <div className="relative mb-8 group/cover">
                  <div className={`absolute inset-0 bg-[#3D6599]/30 rounded-3xl blur-xl transition-transform duration-1000 scale-95 ${isPlaying ? 'animate-pulse scale-105' : ''}`} />
                  
                  <div className={`w-40 h-40 md:w-44 md:h-44 rounded-3xl overflow-hidden relative shadow-2xl border-2 border-white dark:border-stone-800 transition-transform duration-700 ${isPlaying ? 'scale-105' : ''}`}>
                    {coverUrl ? (
                      <img
                        src={coverUrl}
                        alt="Logo Estación"
                        className={`w-full h-full object-cover select-none transition-transform duration-[10000ms] ease-linear ${isPlaying ? 'rotate-360' : ''}`}
                        style={{ animationIterationCount: 'infinite' }}
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center bg-stone-100 dark:bg-stone-900">
                        <Radio size={56} className="text-[#3D6599] dark:text-[#C7DBEB]" />
                      </div>
                    )}
                  </div>
                </div>

                {/* Info de Transmisión */}
                <div className="text-center w-full mb-6">
                  <h3 className="text-2xl font-extrabold text-stone-800 dark:text-stone-100 tracking-tight mb-1.5 flex items-center justify-center gap-2">
                    {nowPlaying.title}
                  </h3>
                  <p className="text-xs font-bold uppercase tracking-widest text-[#3D6599] dark:text-[#C7DBEB] flex items-center justify-center gap-1.5">
                    <Mic2 size={12} /> {nowPlaying.artist}
                  </p>
                </div>

                {/* Ecualizador Visual / Línea de Onda */}
                <div className="w-full flex items-center justify-center gap-1 h-8 mb-8 px-4 overflow-hidden">
                  {isPlaying ? (
                    // Barras animadas cuando está activo
                    Array.from({ length: 17 }).map((_, i) => {
                      const delays = [0.2, 0.4, 0.6, 0.3, 0.7, 0.1, 0.5, 0.8, 0.2, 0.6, 0.4, 0.9, 0.1, 0.5, 0.3, 0.7, 0.2];
                      const heights = ['h-3', 'h-5', 'h-7', 'h-4', 'h-6', 'h-3', 'h-5', 'h-7', 'h-4', 'h-6', 'h-3', 'h-5', 'h-7', 'h-4', 'h-6', 'h-3', 'h-5'];
                      return (
                        <span 
                          key={i} 
                          className={`w-1 bg-[#3D6599] dark:bg-[#C7DBEB] rounded-full transition-all duration-300 ${heights[i % heights.length]}`}
                          style={{
                            animation: `bounce 1s ease-in-out infinite alternate`,
                            animationDelay: `${delays[i % delays.length]}s`
                          }}
                        />
                      );
                    })
                  ) : (
                    // Onda en reposo plano
                    <div className="w-full h-[3px] bg-stone-200 dark:bg-stone-800 rounded-full relative">
                      <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 flex justify-between px-2">
                        {Array.from({ length: 5 }).map((_, i) => (
                          <span key={i} className="w-1.5 h-1.5 rounded-full bg-stone-300 dark:bg-stone-700" />
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                {/* Controles Principales */}
                <div className="flex items-center justify-between w-full bg-stone-50/50 dark:bg-stone-900/30 p-4 rounded-full border border-stone-100 dark:border-stone-800/40">
                  
                  {/* Control Integrado de Volumen Círculo */}
                  <div ref={volumeRef} className="flex items-center gap-2">
                    <button
                      onClick={() => setShowVolume(!showVolume)}
                      className={`w-11 h-11 rounded-full flex items-center justify-center transition-all ${
                        showVolume || volume === 0 
                          ? 'bg-[#3D6599] text-white shadow-md shadow-[#3D6599]/20' 
                          : 'bg-white dark:bg-stone-800 text-stone-600 dark:text-stone-300 shadow-sm border border-stone-200/50 dark:border-stone-700/50 hover:bg-stone-100'
                      }`}
                      aria-label="Ajustar Volumen"
                    >
                      {volume === 0 ? <VolumeX size={18} /> : <Volume2 size={18} />}
                    </button>

                    {/* Barra de Volumen Horizontal Desplegable Amigable */}
                    <div className={`flex items-center overflow-hidden transition-all duration-300 ease-out ${showVolume ? "w-24 opacity-100 px-1" : "w-0 opacity-0"}`}>
                      <input
                        type="range"
                        min="0"
                        max="1"
                        step="0.01"
                        value={volume}
                        onChange={(e) => setVolume(parseFloat(e.target.value))}
                        className="w-full h-1 bg-stone-200 dark:bg-stone-700 rounded-full appearance-none cursor-pointer accent-[#3D6599] dark:accent-[#C7DBEB]"
                      />
                    </div>
                  </div>

                  {/* Botón Central Play / Pause Círculo */}
                  <button 
                    onClick={togglePlay}
                    className="w-16 h-16 rounded-full bg-[#3D6599] hover:bg-[#32537d] text-white flex items-center justify-center shadow-lg shadow-[#3D6599]/20 transition-all duration-300 transform active:scale-95"
                    aria-label={isPlaying ? 'Pausar Radio' : 'Reproducir Radio'}
                  >
                    {isPlaying ? <Pause size={26} fill="currentColor" /> : <Play size={26} fill="currentColor" className="ml-1" />}
                  </button>

                  {/* Identificador Estado de Antena Círculo */}
                  <div className="flex items-center justify-center w-11 h-11 rounded-full bg-white dark:bg-stone-800 border border-stone-200/50 dark:border-stone-700/50 text-stone-400 dark:text-stone-500 shadow-sm">
                    <RadioTower size={18} className={isPlaying ? 'text-emerald-500 dark:text-emerald-400' : ''} />
                  </div>
                </div>

              </div>
            </div>
          </RevealOnScroll>
          
        </div>
      </div>
    </div>
  );
};

export default RadioView;