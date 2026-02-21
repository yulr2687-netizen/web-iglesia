import React, { useState, useRef, useEffect } from 'react';
import { Play, Pause, Volume2, VolumeX, Radio, Mic2 } from 'lucide-react';
import RevealOnScroll from '../components/ui/RevealOnScroll';
import { RADIO_CONFIG } from "../data/radioConfig";
import { radioData } from "../data/mockData";
import Logo from '../img/logo.png';

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
    <div className="pt-28 pb-20 px-4 min-h-screen">
      {/* Elemento de Audio Invisible */}
      <audio ref={audioRef} src={RADIO_CONFIG.streamUrl} preload="none" crossOrigin="anonymous" />
      <div className="max-w-6xl mx-auto">        
        <div className="grid lg:grid-cols-2 gap-12 items-center mb-16">
          {/* Lado Izquierdo: Información */}
          <RevealOnScroll direction="right">
            <div className="text-center lg:text-left">
              {isLive && (
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400 border border-red-200 dark:border-red-800 text-sm font-bold mb-6 animate-pulse">
                  <div className="w-2 h-2 rounded-full bg-red-600"></div>
                  TRANSMISIÓN CONTINUA
                </div>
              )}
              <h1 className="font-serif text-5xl md:text-6xl font-bold text-stone-900 dark:text-white mb-4">
                {radioData.stationName}
              </h1>
              <p className="text-3xl text-[#3D6599] dark:text-[#C7DBEB] font-medium mb-6">
                {radioData.slogan}
              </p>
              <p className="text-stone-600 dark:text-stone-300 mb-8 leading-relaxed">
                Disfruta de la mejor música cristiana, mensajes edificantes y compañía espiritual las 24 horas del día.
              </p>
            </div>
          </RevealOnScroll>

          {/* Lado Derecho: Reproductor con Profundidad */}
          <RevealOnScroll direction="left">
            <div className="flex justify-center w-full">
              {/* Contenedor principal con mayor sombra para el efecto de profundidad */}
              <div className="bg-white dark:bg-[#1a1816] rounded-[32px] p-8 md:p-10 shadow-[0_30px_60px_-15px_rgba(0,0,0,0.15)] dark:shadow-[0_30px_60px_-15px_rgba(0,0,0,0.8)] border border-stone-100 dark:border-[#2a2623] relative w-full max-w-md flex flex-col items-center transition-all duration-300">

                {/* Carátula Cuadrada (Más pequeña) */}
                <div className="w-32 h-32 md:w-36 md:h-36 rounded-2xl overflow-hidden mb-8 shadow-xl dark:shadow-2xl">
                  {coverUrl ? (
                    <img
                      src={coverUrl}
                      alt="Carátula actual"
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-stone-100 dark:bg-stone-800">
                      <Radio size={48} className="text-[#3D6599] dark:text-[#C7DBEB]" />
                    </div>
                  )}
                </div>

                {/* Info del Programa */}
                <h3 className="text-2xl font-bold text-stone-800 dark:text-white mb-1 text-center">
                  {nowPlaying.title}
                </h3>
                <p className="text-sm text-stone-500 dark:text-stone-400 mb-8 text-center flex items-center justify-center gap-2">
                  <Mic2 size={14} /> <span>{nowPlaying.artist}</span>
                </p>

                {/* Barra de Progreso (Línea de tiempo para 24/7) */}
                <div className="w-full flex items-center gap-3 mb-10 px-3">
                  {/* Texto VIVO con parpadeo */}
                  <span className="text-[11px] font-bold text-red-500 animate-pulse">VIVO</span>
                  <div className="flex-1 h-1.5 bg-stone-200 dark:bg-stone-700/50 rounded-full relative">
                    {/* Barra de color al 100% */}
                    <div className="absolute left-0 top-0 h-full w-full bg-[#3D6599] rounded-full"></div>
                    {/* Círculo indicador fijo al final */}
                    <div className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2 w-3.5 h-3.5 bg-[#3D6599] rounded-full shadow-md border-[2px] border-stone-100 dark:border-[#1a1816]"></div>
                  </div>
                  <span className="text-[11px] font-bold text-stone-400">24/7</span>
                </div>

                {/* Controles: Volumen y Play */}
                <div className="flex items-center justify-center gap-4 w-full">
                  
                  {/* Contenedor Volumen (Izquierda) */}
                  <div ref={volumeRef} className="relative flex items-center">
                    <button
                      onClick={() => setShowVolume(!showVolume)}
                      className="w-12 h-12 rounded-full bg-stone-50 dark:bg-[#221f1d] text-stone-600 dark:text-stone-300 flex items-center justify-center shadow-sm border border-stone-100 dark:border-[#2f2b28] hover:scale-105 transition-all"
                    >
                      {volume === 0 ? <VolumeX size={20} /> : <Volume2 size={20} />}
                    </button>

                    {/* DESKTOP: Slider Horizontal (Como el original) */}
                    <div
                      className={`hidden md:flex items-center overflow-hidden transition-all duration-300 ease-out
                      ${showVolume ? "w-24 opacity-100 ml-3" : "w-0 opacity-0 ml-0"}`}
                    >
                      <input
                        type="range"
                        min="0"
                        max="1"
                        step="0.01"
                        value={volume}
                        onChange={(e) => setVolume(parseFloat(e.target.value))}
                        className="w-24 h-1.5 bg-stone-200 dark:bg-stone-700 rounded-full appearance-none cursor-pointer accent-[#3D6599] dark:accent-[#C7DBEB]"
                      />
                    </div>

                    {/* MOBILE: Slider Vertical Corto */}
                    {showVolume && (
                      <div
                        className="md:hidden absolute bottom-full mb-3 left-1/2 -translate-x-1/2 bg-white dark:bg-stone-800 border border-stone-100 dark:border-stone-700 px-2 py-3 rounded-2xl shadow-xl animate-in fade-in slide-in-from-bottom-2 z-20"
                      >
                        <input
                          type="range"
                          min="0"
                          max="1"
                          step="0.01"
                          value={volume}
                          onChange={(e) => setVolume(parseFloat(e.target.value))}
                          className="h-16 w-1.5 bg-stone-200 dark:bg-stone-700 rounded-full appearance-none cursor-pointer accent-[#3D6599] dark:accent-[#C7DBEB]"
                          style={{
                            writingMode: "vertical-rl",
                            direction: "rtl",
                          }}
                        />
                      </div>
                    )}
                  </div>

                  {/* Botón Play (Centro con el color original) */}
                  <button 
                    onClick={togglePlay}
                    className="w-20 h-20 rounded-full bg-[#3D6599] text-white flex items-center justify-center shadow-lg shadow-[#3D6599]/30 hover:scale-105 hover:bg-[#2d4b73] transition-all duration-300 z-10"
                  >
                    {isPlaying ? <Pause size={32} fill="currentColor" /> : <Play size={32} fill="currentColor" className="ml-1" />}
                  </button>

                  {/* Espacio vacío para balancear el botón de volumen y mantener el Play al centro */}
                  <div className="w-12 h-12"></div>
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