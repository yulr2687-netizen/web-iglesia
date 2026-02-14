import React, { useState, useRef, useEffect } from 'react';
import { Play, Pause, Volume2, VolumeX, Radio, Mic2, Clock, Calendar } from 'lucide-react';
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

  const getCoverUrl = () => Logo;

  return (
    <div className="pt-28 pb-20 px-4 min-h-screen">
      {/* Elemento de Audio Invisible */}
      <audio ref={audioRef} src={RADIO_CONFIG.streamUrl} preload="none" crossOrigin="anonymous" />
      <div className="max-w-6xl mx-auto">
        
        {/* ENCABEZADO Y REPRODUCTOR */}
        <div className="grid lg:grid-cols-2 gap-12 items-center mb-16">
          {/* Lado Izquierdo: Información */}
          <RevealOnScroll direction="right">
            <div className="text-center lg:text-left">
              {isLive && (
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400 border border-red-200 dark:border-red-800 text-sm font-bold mb-6 animate-pulse">
                  <div className="w-2 h-2 rounded-full bg-red-600"></div>
                  EN VIVO AHORA
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

          {/* Lado Derecho: Tarjeta del Reproductor */}
          <RevealOnScroll direction="left">
            <div className="bg-white dark:bg-[#1e1a17] rounded-3xl p-8 shadow-2xl border border-stone-100 dark:border-stone-800 relative overflow-hidden group">
              {/* Fondo con carátula difuminada */}
              {coverUrl && (
                <div
                  className="absolute inset-0 -z-0"
                  style={{
                    backgroundImage: `url(${getCoverUrl()})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    filter: 'blur(30px)',
                    transform: 'scale(1.2)',
                    opacity: 0.6
                  }}
                />
              )}
              {/* Degradado para legibilidad */}
              <div className="absolute inset-0 bg-gradient-to-b from-black/10 via-black/30 to-black/60 -z-0"></div>
              {/* Fondo decorativo */}
              <div className="absolute top-0 right-0 w-64 h-64 bg-[#3D6599]/10 rounded-full blur-3xl -z-0 translate-x-1/2 -translate-y-1/2"></div>
              <div className="relative z-10 flex flex-col items-center justify-center py-8">
                {/* Icono Grande o Carátula */}
                <div className="w-40 h-40 rounded-full overflow-hidden mb-8 shadow-inner">
                  {coverUrl ? (
                    <img
                      src={coverUrl}
                      alt="Carátula actual"
                      className={`w-full h-full object-cover ${isPlaying ? 'animate-spin-slow' : ''}`}
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-stone-100 to-stone-200 dark:from-stone-800 dark:to-stone-900">
                      <Radio size={64} className="text-[#3D6599] dark:text-[#C7DBEB]" />
                    </div>
                  )}
                </div>
                {/* Info del Programa Actual */}
                <h3 className="text-1xl font-bold text-white mb-2 drop-shadow-lg">
                  {nowPlaying.title}
                </h3>
                <div className="flex items-center gap-2 text-white/90 text-sm mb-8 drop-shadow-md">
                  <Mic2 size={14} className="text-white/90"/> <span>{nowPlaying.artist}</span>
                </div>
                {/* Controles */}
                <div className="flex items-center gap-4">
                  <div ref={volumeRef} className="relative flex items-center">
                    {/* Botón volumen */}
                    <button
                      onClick={() => setShowVolume(!showVolume)}
                      className="p-3 text-white/80 hover:text-white transition-colors drop-shadow-md"
                      >
                      {volume === 0 ? <VolumeX size={24} /> : <Volume2 size={24} />}
                    </button>
                    {/* DESKTOP */}
                    <div
                      className={`hidden md:flex items-center overflow-hidden transition-all duration-300 ease-out
                      ${showVolume ? "w-28 opacity-100 ml-2" : "w-0 opacity-0 ml-0"}`}
                      >
                      <input
                        type="range"
                        min="0"
                        max="1"
                        step="0.01"
                        value={volume}
                        onChange={(e) => setVolume(parseFloat(e.target.value))}
                        className="w-28 h-1 bg-white/50 rounded-full appearance-none cursor-pointer relative z-10"
                      />
                    </div>
                    {/* MOBILE */}
                    {showVolume && (
                      <div
                        className="md:hidden absolute bottom-full mb-1 left-1/2 -translate-x-1/2 bg-white/10 backdrop-blur-sm
                        px-2 py-1 rounded-lg shadow-md animate-in fade-in slide-in-from-bottom-1"
                        >
                        <input
                          type="range"
                          min="0"
                          max="1"
                          step="0.01"
                          value={volume}
                          onChange={(e) => setVolume(parseFloat(e.target.value))}
                          className="h-12 w-1 bg-white/70 rounded-full appearance-none cursor-pointer"
                          style={{
                            writingMode: "vertical-rl",
                            direction: "rtl",
                          }}
                        />
                      </div>
                    )}
                  </div>
                  <button 
                    onClick={togglePlay}
                    className="w-20 h-20 rounded-full bg-[#3D6599] text-white flex items-center justify-center shadow-lg shadow-[#3D6599]/40 hover:scale-110 hover:bg-[#2d4b73] transition-all duration-300"
                    >
                    {isPlaying ? <Pause size={32} fill="currentColor" /> : <Play size={32} fill="currentColor" className="ml-1" />}
                  </button>
                  {/* Espacio vacío para balancear visualmente */}
                  <div className="w-12"></div>
                </div>
              </div>
            </div>
          </RevealOnScroll>
        </div>

        {/* PROGRAMACIÓN */}
        {/* INFORMACIÓN DE TRANSMISIÓN 
        <RevealOnScroll direction="up">
          <div className="bg-stone-50 dark:bg-[#1a1614] rounded-3xl p-8 md:p-12 border border-stone-200 dark:border-stone-800">
            <div className="flex items-center gap-3 mb-8">
              <Radio className="text-[#3D6599]" size={28} />
              <h2 className="text-3xl font-serif font-bold text-stone-900 dark:text-white">
                Información de Transmisión
              </h2>
            </div>

            <div className="grid md:grid-cols-3 gap-6">

              {/* CANCIÓN ACTUAL 
              <div className="bg-white dark:bg-[#1e1a17] p-6 rounded-xl border border-stone-100 dark:border-stone-800">
                <p className="text-sm text-stone-500 mb-2">Sonando ahora</p>
                <p className="font-bold text-stone-800 dark:text-stone-200">
                  {nowPlaying.title}
                </p>
                <p className="text-sm text-stone-500">
                  {nowPlaying.artist}
                </p>
              </div>

              {/* MENSAJE 
              <div className="bg-white dark:bg-[#1e1a17] p-6 rounded-xl border border-stone-100 dark:border-stone-800">
                <p className="text-sm text-stone-500 mb-2">Mensaje</p>
                <p className="text-stone-700 dark:text-stone-300">
                  Gracias por escucharnos. Que esta transmisión sea de bendición para tu vida 🙏
                </p>
              </div>

            </div>
          </div>
        </RevealOnScroll>*/}
      </div>
    </div>
  );
};

export default RadioView;