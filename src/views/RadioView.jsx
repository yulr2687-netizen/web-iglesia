import React, { useState, useRef, useEffect } from 'react';
import { Play, Pause, Volume2, VolumeX, Radio, Mic2, RadioTower, ListMusic, X, History, Music2 } from 'lucide-react';
import RevealOnScroll from '../components/ui/RevealOnScroll';
import { RADIO_CONFIG } from "../data/radioConfig";
import { radioData } from "../data/mockData";
import Logo from '../assets/img/rlogo.png';
import { customCovers } from '../data/customCovers';

const RadioView = () => {
  const audioRef = useRef(null);
  const volumeRef = useRef(null);
  const playerCardRef = useRef(null);
  const currentSongRef = useRef("");
  const radioModeRef = useRef("AUTO_DJ")
  const liveCandidateSinceRef = useRef(null);
  const autoDjCandidateSinceRef = useRef(null);
  const metadataMissingSinceRef = useRef(null);

  const LIVE_TITLE = "En Vivo";
  const LIVE_ARTIST = "La Voz Del Triunfo Pentecostal";

  const normalizeSongName = (text) => {
    return (text || "")
      .trim()
      .toLowerCase()

      //ELIMINA LAS TILDES (CONSERVA LA Ñ)
      .replace(/[áàäâã]/g, "a")
      .replace(/[éèëê]/g, "e")
      .replace(/[íìïî]/g, "i")
      .replace(/[óòöôõ]/g, "o")
      .replace(/[úùüû]/g, "u")

      //ELIMINA SIGNOS
      .replace(/[¿?¡!.,;:()[\]{}"'`]/g, "")

      //REEMPLAZA MULTIPLES ESPACIOS POR UNO
      .replace(/\s+/g, " ")
  };

  const [volume, setVolume] = useState(1);
  const [showVolume, setShowVolume] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [showHistoryDrawer, setShowHistoryDrawer] = useState(false);
  
  const [nowPlaying, setNowPlaying] = useState({
    title: "Cargando...",
    artist: "Radio en Vivo",
  });
  const [isChangingSong, setIsChangingSong] = useState(false);
  
  const [coverUrl, setCoverUrl] = useState(Logo);
  const [songHistory, setSongHistory] = useState([]);
  const [radioMode, setRadioMode] = useState("AUTO_DJ");
  const isLive = radioMode === "LIVE";

  const formatPlayedTime = (date) => {

    if (!date || isNaN(new Date(date))) {
      return "Reciente";
    }

    const diff = Math.floor(
     (new Date() - new Date(date)) / 60000
    );

    if (diff <= 1) {
      return "Hace 1 minuto";
    }

    if (diff === 2) {
      return "Hace 2 minuto";
    }

    return `Hace ${diff} minutos`;
  };

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
      if (playerCardRef.current && !playerCardRef.current.contains(e.target)) {
        setShowHistoryDrawer(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Fetch Metadata & Historial
  useEffect(() => {
    const fetchMetadata = async () => {
      try {
        const response = await fetch(
          "https://player.extassisnetwork.com/api.php?url=https://radios.mipanel.stream:6924/stream",
          {
            cache: "no-store",
          }
        );

        const data = await response.json();

        // 1. DETECTAR SI EXTASSIS ESTÁ ENTREGANDO INFORMACIÓN
        const hasArtist = Boolean(data?.artist?.trim());
        const hasSong = Boolean(data?.song?.trim());

        const artist = data?.artist?.trim()?.toLowerCase() || "";
        const song = data?.song?.trim()?.toLowerCase() || "";
        const title = data?.title?.trim()?.toLowerCase() || "";
        const songTitle = data?.songtitle?.trim()?.toLowerCase() || "";

        const isExtassisLive =
        artist === "en vivo" &&
        (
          song.includes("live broadcast") ||
          title.includes("live broadcast") ||
          songTitle.includes("live broadcast")
        );

        const isAutoDj = hasSong && hasArtist && !isExtassisLive;

        // 2. LIVE DETECTADO
        if (isExtassisLive) {

          autoDjCandidateSinceRef.current = null;
          metadataMissingSinceRef.current = null;

          if (!liveCandidateSinceRef.current) {
            liveCandidateSinceRef.current = Date.now();
          }

          const liveDuration = Date.now() - liveCandidateSinceRef.current;

          if (radioModeRef.current !== "LIVE" && liveDuration >= 10000) {
            radioModeRef.current = "LIVE";
            setRadioMode("LIVE");

            // IMPORTANTE:
            // Limpiamos cualquier canción anterior
            currentSongRef.current = "";

            // FORZAMOS LOS DATOS DEL LIVE
            setNowPlaying({
              title: LIVE_TITLE,
              artist: LIVE_ARTIST,
            });

            // FORZAMOS EL LOGO DE LA IGLESIA
            setCoverUrl(Logo);

            setIsChangingSong(false);
          }

          if (radioModeRef.current === "LIVE") {
            setNowPlaying({
              title: LIVE_TITLE,
              artist: LIVE_ARTIST,
            });

            setCoverUrl(Logo);
          }

          return;
        }

        // 3. AUTO DJ DETECTADO

        if (isAutoDj) {
          liveCandidateSinceRef.current = null;
          metadataMissingSinceRef.current = null;

          if (!autoDjCandidateSinceRef.current) {
            autoDjCandidateSinceRef.current = Date.now();
          }

          const autoDjDuration = Date.now() - autoDjCandidateSinceRef.current;

          if (radioModeRef.current === "LIVE" && autoDjDuration < 10000) {
            return;
          }

          if (radioModeRef.current === "LIVE") {
            radioModeRef.current = "AUTO_DJ";
            setRadioMode("AUTO_DJ");

            currentSongRef.current = "";
          }

          const songIdentifier = `${data.artist}-${data.song}`;

          if (data.song && data.artist && songIdentifier !== currentSongRef.current) {
            currentSongRef.current = songIdentifier;

            setIsChangingSong(true);

            setTimeout(() => {
              setNowPlaying({
                title: data.song,
                artist: data.artist,
              });

              setIsChangingSong(false);
            }, 300);
          }

          const songKey = normalizeSongName(data.song);

          const matchedKey = Object.keys(customCovers).find((key) =>
            songKey.includes(normalizeSongName(key))
          );

          if (matchedKey) {
            setCoverUrl(customCovers[matchedKey]);
          } else if (data.cover?.trim()) {
            setCoverUrl(data.cover);
          }

          if (data.song_history) {
            setSongHistory((prevHistory) => {
              return data.song_history
                .slice(1, 11)
                .map((item, index) => {
                  const existingSong = prevHistory.find(
                    (old) =>
                      old?.song?.title === item?.song?.title &&
                      old?.song?.artist === item?.song?.artist
                  );

                  return {
                    ...item,
                    playedAt:
                      existingSong?.playedAt ||
                      new Date(Date.now() - index * 180000),
                  };
                });
            });
          }

          return;
        }

        // 4. EXTASSIS NO DEVUELVE INFORMACIÓN
        liveCandidateSinceRef.current = null;
        autoDjCandidateSinceRef.current = null;

        if (!metadataMissingSinceRef.current) {
          metadataMissingSinceRef.current = Date.now();
        }

        const missingDuration =
          Date.now() - metadataMissingSinceRef.current;

        if (missingDuration >= 10000) {

          radioModeRef.current = "LIVE";
          setRadioMode("LIVE");

          currentSongRef.current = "";

          setNowPlaying({
            title: LIVE_TITLE,
            artist: LIVE_ARTIST,
          });

          setCoverUrl(Logo);

          setIsChangingSong(false);
        }

      } catch (error) {
        console.error("Error obteniendo metadata:", error);

        liveCandidateSinceRef.current = null;
        autoDjCandidateSinceRef.current = null;

        if (!metadataMissingSinceRef.current) {
          metadataMissingSinceRef.current = Date.now();
        }

        const missingDuration =
          Date.now() - metadataMissingSinceRef.current;

        if (missingDuration >= 10000) {

          radioModeRef.current = "LIVE";
          setRadioMode("LIVE");

          currentSongRef.current = "";

          setNowPlaying({
            title: LIVE_TITLE,
            artist: LIVE_ARTIST,
          });

          setCoverUrl(Logo);

          setIsChangingSong(false);
        }
      }
    };

    fetchMetadata();

    const interval = setInterval(fetchMetadata, 4000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="pt-28 pb-20 px-4 min-h-screen transition-colors duration-500 bg-gradient-to-b from-stone-50 to-stone-100 dark:from-[#141211] dark:to-[#1a1816]">
      {/* ELEMENTO DE AUDIO INVISIBLE */}
      <audio 
        ref={audioRef} 
        src={RADIO_CONFIG.streamUrl} 
        preload="none" 
        crossOrigin="anonymous"
        onEnded={() => {
          if (isPlaying) {
            audioRef.current.load();
            audioRef.current.play().catch(() => {});
          }
        }}
      />
      
      <div className="max-w-6xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-8 items-center mb-16">
          
          {/* LADO IZQUIERDO: INFORMACIÓN */}
          <RevealOnScroll direction="right">
            <div className="text-center lg:text-left space-y-6">
              <div className={`inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-black tracking-wider uppercase animate-pulse shadow-sm transition-all duration-500 ${
                isLive ? "bg-red-50 dark:bg-red-950/40 text-red-600 dark:text-red-400 border border-red-200/60 dark:border-red-900/40"
                : "bg-blue-50 dark:bg-blue-950/40 text-blue-600 dark:text-blue-400 border border-blue-200/60 dark:border-blue-900/40"}`}>
                <span className={`w-2 h-2 rounded-full animate-pulse shadow-sm ${isLive ? "bg-red-500 shadow-red-500" : "bg-blue-500 shadow-blue-500"}`}></span>
                  {isLive ? "EN VIVO" : "TRANSMISIÓN CONTINUA"}
              </div>
              
              
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

          {/* LADO DERECHO: REPRODUCOR DE ALTA GAMA */}
          <RevealOnScroll direction="left">
            <div className="flex justify-center w-full relative group">
              
              {/* RESPLANDOR DE FONDO DINÁMICO */}
              <div className={`absolute -inset-4 bg-gradient-to-tr from-[#3D6599]/20 to-[#C7DBEB]/20 rounded-[44px] blur-3xl opacity-70 transition-opacity duration-700 ${isPlaying ? 'opacity-100' : 'opacity-40'}`} />

              {/* CONTENEDOR PRINCIPAL DEL REPRODUCOR */}
              <div 
                ref={playerCardRef}
                className="bg-white/80 dark:bg-[#1a1816]/90 backdrop-blur-xl rounded-[40px] p-8 md:p-10 shadow-[0_32px_64px_-16px_rgba(45,38,34,0.12)] dark:shadow-[0_40px_80px_-24px_rgba(0,0,0,0.7)] border border-white/60 dark:border-stone-800/60 relative w-full max-w-md flex flex-col items-center z-10 transition-transform duration-500 hover:scale-[1.01] overflow-hidden"
              >
                
                {/* BOTÓN MENÚ HAMBURGUESA / HISTORIAL (ESQUINA SUPERIOR DERECHA) */}
                <button
                  onClick={() => setShowHistoryDrawer(!showHistoryDrawer)}
                  className="absolute top-6 right-6 p-2.5 rounded-full bg-stone-100/80 dark:bg-stone-800/80 text-stone-700 dark:text-stone-300 hover:text-[#3D6599] dark:hover:text-[#C7DBEB] hover:bg-stone-200/80 dark:hover:bg-stone-700/80 transition-all z-30 focus:outline-none"
                  aria-label="Ver historial de canciones"
                  title="Historial de reproducción"
                >
                  {showHistoryDrawer ? <X size={20} /> : <ListMusic size={20} />}
                </button>

                {/* PANEL HISTORIAL DESPLAZABLE */}
                <div 
                  className={`absolute top-0 right-0 h-full w-[82%] sm:w-[78%] bg-white/95 dark:bg-[#181614]/95 backdrop-blur-2xl z-20 p-6 flex flex-col shadow-[-10px_0_30px_rgba(0,0,0,0.15)] border-l border-stone-200/50 dark:border-stone-800/60 transition-transform duration-500 ease-in-out ${
                    showHistoryDrawer ? 'translate-x-0' : 'translate-x-full'
                  }`}
                >
                  {/* ENCABEZADO DRAWER */}
                  <div className="flex items-center gap-2 pb-4 mb-4 border-b border-stone-200/60 dark:border-stone-800/60">
                    <History size={18} className="text-[#3D6599] dark:text-[#C7DBEB]" />
                    <h4 className="font-extrabold text-sm uppercase tracking-wider text-stone-800 dark:text-stone-100">
                      Historial Reciente
                    </h4>
                  </div>

                  {/* REPRODUCIENDO AHORA */}
                  <div className='mb-4 p-3 rounded-2xl bg-gradient-to-r from-[#3D6599]/10 to-[#C7DBEB]/10 border border-[#3D6599]/20 dark:border-[#C7DBEB]/20'>
                    <div className='flex items-center gap-2 mb-2'>
                      <div className='w-2 h-2 rounded-full bg-red-500 animate-pulse'></div>
                      <span className='text-[10px] font-black tracking-[0.2em] uppercase text-[#3D6599] dark:text-[#C7DBEB]'>
                        Reproduciendo Ahora
                      </span>
                    </div>

                    <p className='font-bold text-sm text-stone-800 dark:text-stone-100 line-clamp-1'>
                      {nowPlaying.title}
                    </p>

                    <p className='text-xs text-stone-500 dark:text-stone-400 line-clamp-1'>
                      {nowPlaying.artist}
                    </p>
                  </div>

                  {/* LISTA DE CANCIONES SCROLL PERSONALIZADO */}
                  <div className="flex-1 overflow-y-auto pr-1.5 space-y-3 custom-scrollbar">
                    {songHistory.length > 0 ? (
                      songHistory.map((item, index) => (
                        <div 
                          key={index}
                          className="flex items-center gap-3 p-3 rounded-2xl bg-stone-50/80 dark:bg-stone-900/50 border border-stone-100 dark:border-stone-800/60 hover:border-[#3D6599]/30 transition-colors"
                        >
                          {/* MINI PORTADA */}
                          <div className='w-10 h-10 shrink-0 rounded-xl bg-[#3D6599]/10 dark:bg-[#C7DBEB]/10 flex items-center justify-center overflow-hidden'>
                            <Music2
                              size={18}
                              className='text-[#3D6599] dark:text-[#C7DBEB]'
                            />
                          </div>

                          {/* INFORMACIÓN */}
                          <div className='min-w-0 flex-1'>
                            <p className="font-bold text-xs text-stone-800 dark:text-stone-200 line-clamp-1">
                              {item?.song?.title || item?.title || "Canción sin título"}
                            </p>

                            <p className="text-[11px] font-medium text-stone-500 dark:text-stone-400 line-clamp-1 mt-0.5">
                              {item?.song?.artist || item?.artist || "Artista desconocido"}
                            </p>

                            <p className='text-[10px] text-[#3D6599] dark:text-[#C7DBEB] mt-1'>
                              {formatPlayedTime(item.playedAt)}
                            </p>
                          </div>
                        </div>
                      ))
                    ) : (
                      <p className="text-xs text-stone-400 text-center py-8 font-medium">
                        Sin historial disponible
                      </p>
                    )}
                  </div>
                </div>

                {/* ZONA DE CARÁTULA CON EFECTO AURA */}
                <div className="relative mb-8 group/cover mt-2">
                  <div className={`absolute inset-0 bg-[#3D6599]/30 rounded-3xl blur-xl transition-transform duration-1000 scale-95 ${isPlaying ? 'animate-pulse scale-105' : ''}`} />
                  
                  <div className={`w-40 h-40 md:w-44 md:h-44 rounded-3xl overflow-hidden relative shadow-2xl border-2 border-white dark:border-stone-800 transition-transform duration-700 ${isPlaying ? 'scale-105' : ''}`}>
                    {coverUrl ? (
                      <img
                        key={coverUrl}
                        src={coverUrl}
                        alt="Logo"
                        className={`w-full h-full object-cover select-none transition-all duration-700 ${isPlaying 
                        ? 'scale-105 rotate-0' 
                        : 'scale-100'}`}
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center bg-stone-100 dark:bg-stone-900">
                        <Radio size={56} className="text-[#3D6599] dark:text-[#C7DBEB]" />
                      </div>
                    )}
                  </div>
                </div>

                {/* Info de Transmisión */}
                <div className={`text-center w-full mb-6 transition-all duration-500 ${isChangingSong ? "opacity-0 translate-y-2" : "opacity-100 translate-y-0"}`}>
                  <h3 className="text-2xl font-extrabold text-stone-800 dark:text-stone-100 tracking-tight mb-1.5 flex items-center justify-center gap-2 px-2 line-clamp-1">
                    {nowPlaying.title}
                  </h3>
                  <p className="text-xs font-bold uppercase tracking-widest text-[#3D6599] dark:text-[#C7DBEB] flex items-center justify-center gap-1.5 px-2 line-clamp-1">
                    <Mic2 size={12} className="shrink-0" /> {nowPlaying.artist}
                  </p>
                </div>

                {/* Ecualizador Visual / Línea de Onda */}
                <div className="w-full flex items-center justify-center gap-1 h-8 mb-8 px-4 overflow-hidden">
                  {isPlaying ? (
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
                  
                  {/* Control Integrado de Volumen */}
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

                    <div className={`flex items-center overflow-hidden transition-all duration-300 ease-out ${showVolume ? "w-24 opacity-100 px-1" : "w-0 opacity-0"}`}>
                      <input
                        type="range"
                        min="0"
                        max="1"
                        step="0.01"
                        value={volume}
                        onChange={(e) => setVolume(parseFloat(e.target.value))}
                        className="volume-slider"
                      />
                    </div>
                  </div>

                  {/* Botón Central Play / Pause */}
                  <button 
                    onClick={togglePlay}
                    className="w-16 h-16 rounded-full bg-[#3D6599] hover:bg-[#32537d] text-white flex items-center justify-center shadow-lg shadow-[#3D6599]/20 transition-all duration-300 transform active:scale-95"
                    aria-label={isPlaying ? 'Pausar Radio' : 'Reproducir Radio'}
                  >
                    {isPlaying ? <Pause size={26} fill="currentColor" /> : <Play size={26} fill="currentColor" className="ml-1" />}
                  </button>

                  {/* Identificador Estado de Antena */}
                  <div className={`flex items-center justify-center w-11 h-11 rounded-full border shadow-sm transition-all duration-500 
                    ${isPlaying ? 'bg-emerald-50 dark:bg-emerald-950/30 border-emerald-300 dark:border-emerald-700 shadow-emerald-500/20 animate-pulse'
                    : 'bg-white dark:bg-stone-800 border-stone-200/50 dark:border-stone-700/50 text-stone-400 dark:text-stone-500'}`}
                  >
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