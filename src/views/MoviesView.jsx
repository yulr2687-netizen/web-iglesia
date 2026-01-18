import React, { useState, useRef, useEffect } from 'react';
import { Film, Play, Clock, Calendar, ChevronUp, ChevronDown, Info } from 'lucide-react';
import RevealOnScroll from '../components/ui/RevealOnScroll';
import { christianMovies } from '../data/mockData';

const MoviesView = () => {
    // Estado para la película actual (inicia con la primera)
    const [movies, setMovies] = useState([]);
    const [currentMovie, setCurrentMovie] = useState(null);
    const listRef = useRef(null); // Referencia al contenedor de la lista para controlar el scroll
    // Estados para mostrar u ocultar los botones de navegación
    const [showUpBtn, setShowUpBtn] = useState(false);
    const [showDownBtn, setShowDownBtn] = useState(false);

    // Función para verificar si se necesitan botones
    const checkScroll = () => {
        if (listRef.current) {
            const { scrollTop, scrollHeight, clientHeight } = listRef.current;
      
            setShowUpBtn(scrollTop > 10); // Mostrar botón ARRIBA si hemos bajado algo (scrollTop > 0)

            // Mostrar botón ABAJO si no hemos llegado al final
            // (usamos un margen de error de 1px)
            setShowDownBtn(scrollTop + clientHeight < scrollHeight - 1);
        }
    };

    const formatDuration = (seconds) => {
        if (!seconds) return "—";
        const h = Math.floor(seconds / 3600);
        const m = Math.floor((seconds % 3600) / 60);
        return h > 0 ? `${h}h ${m}m` : `${m}m`;
    };
    
    const stripHtml = (html) => {
        if (!html) return "Sin descripción disponible.";
        return html.replace(/<[^>]*>?/gm, '').trim();
    };

    const parseDuration = (file) => {
        if (!file?.duration) return null;

        // Caso "HH:MM:SS"
        if (typeof file.duration === "string" && file.duration.includes(":")) {
            const parts = file.duration.split(":").map(Number);
            let seconds = 0;
            if (parts.length === 3) {
                seconds = parts[0] * 3600 + parts[1] * 60 + parts[2];
            } else if (parts.length === 2) {
                seconds = parts[0] * 60 + parts[1];
            }
            return seconds;
        }
        // Caso segundos
        const num = Number(file.duration);
        return isNaN(num) ? null : num;
    };

    const formatCategory = (subject) => {
        if (!subject) return "Película Cristiana";

        // Si viene como array
        if (Array.isArray(subject)) {
            return subject.join(" · ");
        }

        // Si viene como string
        if (typeof subject === "string") {
            return subject
            .split(",")
            .map(s => s.trim())
            .join(" · ");
        }
        return "Película Cristiana";
    };

    useEffect(() => {
        const loadMovies = async () => {
            const results = await Promise.all(
                christianMovies.map(async (item) => {
                    const res = await fetch(`https://archive.org/metadata/${item.identifier}`);
                    const data = await res.json();

                    const videoFile = data.files?.find(
                        f =>
                        f.format === "MPEG4" ||
                        f.format === "h.264" ||
                        f.name?.toLowerCase().endsWith(".mp4")
                    );



                    return {
                        id: item.id,
                        title: data.metadata.title || "Sin título",
                        category: formatCategory(data.metadata.subject),
                        year: data.metadata.year || data.metadata.date?.slice(0, 4) || data.metadata.publicdate?.slice(0, 4) ||"—",
                        duration: formatDuration(parseDuration(videoFile) || item.duration),
                        image: `https://archive.org/services/img/${item.identifier}`,
                        desc: stripHtml(data.metadata.description),
                        videoUrl: videoFile ? `https://archive.org/download/${item.identifier}/${videoFile.name}` : null
                    };
                })
            );

            setMovies(results);
            setCurrentMovie(results[0]);
        };

        loadMovies();
    }, []);


    // Efecto para verificar el scroll al cargar y cuando cambia la ventana
    useEffect(() => {
        checkScroll();
        window.addEventListener('resize', checkScroll);
        return () => window.removeEventListener('resize', checkScroll);
    }, [christianMovies]);

    // Función para mover el scroll con los botones
    const scrollList = (direction) => {
        if (listRef.current) {
            const scrollAmount = 200; // Cantidad de pixeles a mover
            listRef.current.scrollBy({
                top: direction === 'up' ? -scrollAmount : scrollAmount,
                behavior: 'smooth'
            });
        }
    };

    if (!currentMovie) return null;
  
    return (
        <div className="pt-28 pb-10 px-4 min-h-screen bg-stone-50 dark:bg-[#151210]">
      
            {/* 1. HEADER (Igual que las otras vistas) */}
            <div className="max-w-7xl mx-auto text-center mb-12">
                <RevealOnScroll direction="down">
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-red-100 dark:bg-red-900/20 text-red-600 dark:text-red-400 border border-red-200 dark:border-red-800 text-sm font-medium mb-6">
                        <Film size={16} />
                        <span>Cine Familiar</span>
                    </div>
                    <h1 className="font-serif text-5xl md:text-6xl font-bold text-stone-900 dark:text-white mb-6">
                        Películas de Fe
                    </h1>
                    <p className="text-lg text-stone-600 dark:text-stone-300 max-w-2xl mx-auto leading-relaxed">
                        Historias que inspiran, edifican y transforman el corazón. Disfruta de nuestra selección especial para toda la familia.
                    </p>
                </RevealOnScroll>
            </div>

            {/* 2. CONTENEDOR PRINCIPAL (REPRODUCTOR + PLAYLIST) */}
            <div className="max-w-7xl mx-auto mb-20">
                {/* En Desktop: Grid de 3 columnas (2 para video, 1 para lista). Misma altura (h-[600px]) */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:h-[600px]">
          
                    {/* A. REPRODUCTOR (IZQUIERDA) - Ocupa 2 espacios en LG */}
                    <div className="lg:col-span-2 bg-black rounded-2xl overflow-hidden shadow-2xl border border-stone-800 relative group h-[300px] lg:h-full">
                        {currentMovie?.videoUrl ? (
                            <video
                                controls
                                className="w-full h-full object-cover"
                                preload="metadata"
                                controlsList="nodownload"
                                >
                                <source src={currentMovie.videoUrl} type="video/mp4" />
                                Tu navegador no soporta video HTML5.
                            </video>
                        ) : (
                            <div className="w-full h-full flex items-center justify-center text-white">
                                Video no disponible
                            </div>
                        )}
                    </div>

                    {/* B. LISTA DE PELÍCULAS (DERECHA) - Ocupa 1 espacio en LG */}
                    <div className="lg:col-span-1 relative bg-white dark:bg-[#1e1a17] rounded-2xl border border-stone-200 dark:border-stone-800 shadow-xl overflow-hidden flex flex-col h-[500px] lg:h-full">
            
                        {/* Cabecera de la lista */}
                        <div className="p-4 border-b border-stone-100 dark:border-stone-800 bg-stone-50 dark:bg-[#1a1614]">
                            <h3 className="font-bold text-stone-800 dark:text-stone-200 flex items-center gap-2">
                                <Play size={16} className="text-[#3D6599]" fill="currentColor"/> 
                                En Cartelera ({movies.length})
                            </h3>
                        </div>

                        {/* Botón Flotante ARRIBA (Solo si es necesario) */}
                        <div className={`absolute top-14 left-0 w-full z-10 flex justify-center transition-all duration-300 pointer-events-none ${showUpBtn ? 'opacity-100' : 'opacity-0'}`}>
                            <button 
                                onClick={() => scrollList('up')}
                                className="pointer-events-auto bg-white/80 dark:bg-black/60 backdrop-blur-md text-[#3D6599] p-1 rounded-full shadow-lg hover:scale-110 transition-transform mt-2 border border-stone-200 dark:border-stone-700"
                                >
                                <ChevronUp size={24} />
                            </button>
                        </div>

                        {/* LISTA SCROLLABLE */}
                        {/* 'flex-1' para ocupar todo el alto disponible */}
                        <div 
                            ref={listRef}
                            onScroll={checkScroll} // Chequear scroll al mover manualmente
                            className="overflow-y-auto flex-1 p-3 space-y-3 scroll-smooth"
                            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }} // Ocultar barra nativa
                            >
                            <style>{`div::-webkit-scrollbar { display: none; }`}</style> {/* Ocultar en Chrome */}

                            {movies.map((movie) => (
                                <button 
                                    key={movie.id}
                                    onClick={() => setCurrentMovie(movie)}
                                    className={`w-full flex items-center justify-between gap-3 p-3 rounded-xl transition-all duration-300 text-left border 
                                    ${currentMovie.id === movie.id ? 'bg-[#3D6599]/10 border-[#3D6599] ring-1 ring-[#3D6599]' // Estado Activo
                                    : 'bg-stone-50 dark:bg-[#151210] border-transparent hover:bg-stone-100 dark:hover:bg-stone-800 hover:border-stone-300 dark:hover:border-stone-700'} // Estado Normal`}
                                    >
                                    {/* TEXTO (IZQUIERDA) */}
                                    <div className="flex-1 min-w-0"> {/* min-w-0 ayuda a truncar texto */}
                                        <h4 className={`font-bold text-sm mb-1 truncate ${currentMovie.id === movie.id ? 'text-[#3D6599]' : 'text-stone-800 dark:text-stone-200'}`}>
                                            {movie.title}
                                        </h4>
                    
                                        {/* Metadatos pequeños */}
                                        <div className="flex flex-wrap gap-y-1 gap-x-3 text-[11px] text-stone-500 dark:text-stone-400 font-medium">
                                            <span className="flex items-center gap-1"><Calendar size={10} /> {movie.year}</span>
                                            <span className="flex items-center gap-1"><Clock size={10} /> {movie.duration}</span>
                                        </div>
                                        <span className="text-[10px] text-[#3D6599]/80 dark:text-[#C7DBEB]/70 mt-1 block truncate">
                                            {movie.category}
                                        </span>
                                    </div>

                                    {/* PORTADA (DERECHA) */}
                                    <div className="w-16 h-20 flex-shrink-0 rounded-lg overflow-hidden shadow-sm">
                                        <img src={movie.image} alt={movie.title} className="w-full h-full object-cover" />
                                    </div>
                                </button>
                            ))}
                        </div>

                        {/* Botón Flotante ABAJO (Solo si es necesario) */}
                        <div className={`absolute bottom-0 left-0 w-full z-10 flex justify-center pb-2 bg-gradient-to-t from-white dark:from-[#1e1a17] to-transparent pt-6 transition-all duration-300 pointer-events-none ${showDownBtn ? 'opacity-100' : 'opacity-0'}`}>
                            <button 
                                onClick={() => scrollList('down')}
                                className="pointer-events-auto bg-white/80 dark:bg-black/60 backdrop-blur-md text-[#3D6599] p-1 rounded-full shadow-lg hover:scale-110 transition-transform border border-stone-200 dark:border-stone-700"
                                >
                                <ChevronDown size={24} />
                            </button>
                        </div>
                    </div>
                </div>

                {/* Info de la Película Actual (Debajo del player en móvil, o como bloque extra) */}
                <RevealOnScroll direction="up">
                    <div className="mt-8 p-6 md:p-8 bg-white dark:bg-[#1e1a17] rounded-2xl border border-stone-100 dark:border-stone-800 shadow-sm">
                        <div className="flex flex-col md:flex-row gap-6 items-start">
                            <div className="flex-1">
                                <h2 className="text-3xl font-serif font-bold text-stone-900 dark:text-white mb-2">
                                    {currentMovie.title}
                                </h2>
                                <div className="flex items-center gap-4 mb-4">
                                    <span className="bg-stone-100 dark:bg-stone-800 text-stone-600 dark:text-stone-300 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider">{currentMovie.category}</span>
                                    <span className="text-stone-500 text-sm flex items-center gap-1">
                                        <Clock size={16}/> 
                                        {currentMovie.duration}
                                    </span>
                                </div>
                                <p className="text-stone-600 dark:text-stone-300 leading-relaxed text-lg">
                                    {currentMovie.desc}
                                </p>
                            </div>
                            {/* Botón de acción adicional si quisieras */}
                            <button className="flex items-center gap-2 text-[#3D6599] font-bold hover:underline mt-2 md:mt-0">
                                <Info size={18} /> Detalles
                            </button>
                        </div>
                    </div>
                </RevealOnScroll>
            </div>

            {/* 3. SEPARADOR BÍBLICO (Antes del Footer) */}
            <RevealOnScroll direction="up" delay={200}>
                <div className="max-w-4xl mx-auto text-center mt-20 mb-8 px-6 py-12 border-t border-b border-stone-200 dark:border-stone-800 relative">
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-stone-50 dark:bg-[#151210] px-4 text-stone-300">
                        <Film size={24} />
                    </div>
                    <p className="font-serif text-2xl md:text-3xl italic text-stone-700 dark:text-stone-300 mb-4">
                        "Por lo demás, hermanos, todo lo que es verdadero, todo lo honesto, todo lo justo, todo lo puro, todo lo amable... en esto pensad."
                    </p>
                    <span className="text-[#3D6599] font-bold tracking-widest text-sm">FILIPENSES 4:8</span>
                </div>
            </RevealOnScroll>
        </div>
    );
};

export default MoviesView;