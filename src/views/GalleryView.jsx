import React, { useState, useEffect } from 'react';
import { Image as ImageIcon, Maximize2, ArrowRight } from 'lucide-react';
import RevealOnScroll from '../components/ui/RevealOnScroll';
import GalleryModal from '../components/ui/GalleryModal';
import { galleryAlbums } from '../data/mockData';

const GalleryView = () => {
  const [activeAlbumIndex, setActiveAlbumIndex] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedAlbum, setSelectedAlbum] = useState(null);

  // AUTOMATIC CAROUSEL LOGIC
  useEffect(() => {
    if (!galleryAlbums || galleryAlbums.length === 0) return;
    const interval = setInterval(() => {
      setActiveAlbumIndex((prev) => (prev + 1) % galleryAlbums.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const openModal = (album) => {
    setSelectedAlbum(album);
    setIsModalOpen(true);
  };

  if (!galleryAlbums || galleryAlbums.length === 0) {
    return (
      <div className="pt-28 pb-20 px-4 min-h-screen flex flex-col items-center justify-center text-center">
        <div className="bg-[#C7DBEB]/30 p-6 rounded-full text-[#3D6599] mb-6">
          <ImageIcon size={48} />
        </div>
        <h2 className="text-3xl font-bold text-stone-900 dark:text-white mb-2">
          Sin Fotografías
        </h2>
        <p className="text-stone-500 dark:text-stone-400 max-w-md mx-auto">
          Aún no hemos subido álbumes a nuestra galería. ¡Estamos capturando nuevos momentos para compartir contigo pronto!
        </p>
      </div>
    );
  }

  return (
    <div className="pt-28 pb-20 px-4 min-h-screen">
      <GalleryModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} album={selectedAlbum} />
      
      {/* Header */}
      <div className="max-w-4xl mx-auto text-center mb-16">
        <RevealOnScroll direction="down">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#C7DBEB]/30 dark:bg-[#3D6599]/20 text-[#3D6599] dark:text-[#C7DBEB] border border-[#C7DBEB] dark:border-[#3D6599]/30 text-sm font-medium mb-6">
            <ImageIcon size={16} /> <span>Recuerdos</span>
          </div>
          <h1 className="font-serif text-5xl md:text-6xl font-bold text-stone-900 dark:text-white mb-6">
            Nuestra Galería
          </h1>
          <p className="text-lg text-stone-600 dark:text-stone-300 max-w-2xl mx-auto leading-relaxed">
            Momentos especiales que hemos compartido como familia en la fe. Revive nuestras conferencias, aniversarios y más.
          </p>
        </RevealOnScroll>
      </div>

      {/* Main Grid */}
      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-8">
          {/* Álbum Activo (Grande) */}
          <RevealOnScroll direction="left" className="h-full">
            <div 
              onClick={() => openModal(galleryAlbums[activeAlbumIndex])}
              className="bg-white dark:bg-[#1e1a17] rounded-2xl overflow-hidden border border-stone-100 dark:border-stone-800 shadow-sm flex flex-col md:flex-row lg:flex-col xl:flex-row h-full group hover:shadow-xl transition-shadow duration-300 relative cursor-pointer"
            >
              <div className="absolute top-4 left-4 z-10 bg-black/60 backdrop-blur-sm text-white px-3 py-1 rounded-full text-xs font-bold flex items-center gap-2">
                <Maximize2 size={12} /> 
                Ver Álbum Completo
              </div>
              <div className="md:w-1/2 lg:w-full xl:w-1/2 h-64 md:h-auto lg:h-64 xl:h-auto relative overflow-hidden">
                <img 
                  src={galleryAlbums[activeAlbumIndex].cover} 
                  alt={galleryAlbums[activeAlbumIndex].title} 
                  draggable={false}
                  onContextMenu={(e) => e.preventDefault()}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 select-none" />
                <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors"></div>
              </div>
              <div className="p-8 flex flex-col justify-center flex-1 relative">
                <div className="flex items-center gap-4 mb-4">
                    <div className="bg-[#C7DBEB]/30 dark:bg-[#3D6599]/20 text-[#3D6599] dark:text-[#C7DBEB] px-3 py-1 rounded text-center"><span className="block font-bold text-lg leading-none">{galleryAlbums[activeAlbumIndex].year}</span></div>
                    <div className="text-stone-400 text-sm flex items-center gap-1"><ImageIcon size={14} /> {galleryAlbums[activeAlbumIndex].photos.length} Fotos</div>
                </div>
                <h3 className="font-serif text-2xl font-bold text-stone-900 dark:text-white mb-2">{galleryAlbums[activeAlbumIndex].title}</h3>
                <p className="text-stone-600 dark:text-stone-300 text-sm mb-4">{galleryAlbums[activeAlbumIndex].desc}</p>
                <button className="self-start text-[#3D6599] font-bold text-sm flex items-center gap-2 group-hover:gap-3 transition-all">Abrir Galería <ArrowRight size={16} /></button>
                
                {/* Dots para móvil */}
                <div className="flex gap-2 mt-4 lg:hidden">
                    {galleryAlbums.map((_, i) => (<button key={i} onClick={(e) => {e.stopPropagation(); setActiveAlbumIndex(i);}} className={`w-2 h-2 rounded-full transition-all ${i === activeAlbumIndex ? 'bg-[#3D6599] w-6' : 'bg-stone-300 dark:bg-stone-700'}`} aria-label={`Ver álbum ${i + 1}`}/>))}
                </div>
              </div>
            </div>
          </RevealOnScroll>

          {/* Lista Lateral (Desktop) */}
          <div className="hidden lg:grid sm:grid-cols-2 lg:grid-cols-2 gap-4 content-start">
            {galleryAlbums.filter((_, i) => i !== activeAlbumIndex).map((album) => (
              <RevealOnScroll key={album.id} direction="right">
                <div onClick={() => setActiveAlbumIndex(galleryAlbums.indexOf(album))} className="bg-white dark:bg-[#1e1a17] p-4 rounded-2xl border border-stone-100 dark:border-stone-800 shadow-sm flex flex-col h-full hover:shadow-md transition-all duration-300 hover:-translate-y-1 cursor-pointer group">
                  <div className="relative h-32 rounded-xl overflow-hidden mb-3">
                    <img 
                      src={album.cover} 
                      alt={album.title} 
                      draggable={false}
                      onContextMenu={(e) => e.preventDefault()}
                      className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500 select-none" 
                    />
                  </div>
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-[#3D6599] dark:text-[#C7DBEB] text-xs font-bold">{album.year}</span>
                  </div>
                  <h4 className="font-serif font-bold text-stone-900 dark:text-white text-sm mb-1 leading-tight group-hover:text-[#3D6599] transition-colors">{album.title}</h4>
                </div>
              </RevealOnScroll>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default GalleryView;