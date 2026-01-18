import React, { useState, useEffect, useRef } from 'react';
import { X, ChevronLeft, ChevronRight, ChevronUp, ChevronDown } from 'lucide-react';

const GalleryModal = ({ isOpen, onClose, album }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const thumbnailsRef = useRef(null);

  // Resetear índice cuando se abre un álbum nuevo
  useEffect(() => {
    if (isOpen) {
      setCurrentIndex(0);
    }
  }, [isOpen, album]);

  // Bloquear el scroll del body cuando el modal está abierto
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => (document.body.style.overflow = 'unset');
  }, [isOpen]);

  // ✅ AUTO-SCROLL DE MINIATURAS (RESCATADO DEL OTRO CÓDIGO)
  useEffect(() => {
    if (!isOpen || !thumbnailsRef.current) return;

    const activeThumb = document.getElementById(`thumb-${currentIndex}`);
    const container = thumbnailsRef.current;

    if (!activeThumb) return;

    const isDesktop = window.innerWidth >= 768;

    if (isDesktop) {
      const thumbTop = activeThumb.offsetTop;
      const thumbHeight = activeThumb.offsetHeight;
      const containerHeight = container.offsetHeight;

      const targetTop =
        thumbTop - containerHeight / 2 + thumbHeight / 2;

      container.scrollTo({
        top: targetTop,
        behavior: 'smooth',
      });
    } else {
      const thumbLeft = activeThumb.offsetLeft;
      const thumbWidth = activeThumb.offsetWidth;
      const containerWidth = container.offsetWidth;

      const targetLeft =
        thumbLeft - containerWidth / 2 + thumbWidth / 2;

      container.scrollTo({
        left: targetLeft,
        behavior: 'smooth',
      });
    }
  }, [currentIndex, isOpen]);

  if (!isOpen || !album) return null;

  const nextPhoto = () =>
    setCurrentIndex((prev) => (prev + 1) % album.photos.length);

  const prevPhoto = () =>
    setCurrentIndex((prev) => (prev - 1 + album.photos.length) % album.photos.length);

  const scrollThumbnails = (direction) => {
    if (thumbnailsRef.current) {
      const scrollAmount = 150;
      const currentScroll = thumbnailsRef.current.scrollTop;

      thumbnailsRef.current.scrollTo({
        top: direction === 'up'
          ? currentScroll - scrollAmount
          : currentScroll + scrollAmount,
        behavior: 'smooth',
      });
    }
  };

  return (
    <div className="fixed inset-0 z-[150] bg-black/95 backdrop-blur-md flex items-center justify-center p-4 animate-in fade-in duration-300">
      
      <button 
        onClick={onClose} 
        className="absolute top-4 right-4 md:top-6 md:right-6 text-white/70 hover:text-white p-2 rounded-full hover:bg-white/10 transition-colors z-50"
      >
        <X size={32} />
      </button>

      <div className="w-full max-w-7xl h-[85vh] flex flex-col md:flex-row gap-4 relative">

        {/* MINIATURAS */}
        <div className="order-2 md:order-1 relative group w-full md:w-24 h-24 md:h-full flex-shrink-0 flex flex-col justify-center">

          <button 
            onClick={() => scrollThumbnails('up')}
            className="hidden md:flex absolute -top-2 left-0 w-full justify-center items-center h-8 bg-gradient-to-b from-black/80 to-transparent text-white opacity-0 group-hover:opacity-100 transition-opacity z-10 hover:text-[#3D6599]"
          >
            <ChevronUp size={24} />
          </button>

          <div 
            ref={thumbnailsRef}
            className="flex md:flex-col gap-3 overflow-x-auto md:overflow-y-auto h-full w-full items-center md:py-2 px-2 scroll-smooth"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            <style>{`div::-webkit-scrollbar { display: none; }`}</style>

            {album.photos.map((photo, idx) => (
              <button 
                key={idx}
                id={`thumb-${idx}`}
                onClick={() => setCurrentIndex(idx)} 
                className={`
                  relative flex-shrink-0 rounded-md overflow-hidden transition-all duration-300
                  w-16 h-16 md:w-20 md:h-20 
                  ${currentIndex === idx 
                    ? 'ring-2 ring-[#3D6599] opacity-100 scale-105' 
                    : 'opacity-50 hover:opacity-100 hover:scale-105'}
                `}
              >
                <img 
                  src={photo} 
                  alt="thumbnail" 
                  draggable={false}
                  onContextMenu={(e) => e.preventDefault()}
                  className="w-full h-full object-cover select-none"
                />
              </button>
            ))}
          </div>

          <button 
            onClick={() => scrollThumbnails('down')}
            className="hidden md:flex absolute -bottom-2 left-0 w-full justify-center items-center h-8 bg-gradient-to-t from-black/80 to-transparent text-white opacity-0 group-hover:opacity-100 transition-opacity z-10 hover:text-[#3D6599]"
          >
            <ChevronDown size={24} />
          </button>
        </div>

        {/* IMAGEN PRINCIPAL */}
        <div className="order-1 md:order-2 flex-1 relative flex items-center justify-center bg-black/20 rounded-lg overflow-hidden h-full">
          
          <button 
            onClick={prevPhoto} 
            className="absolute left-2 md:left-4 text-white/50 hover:text-white p-2 rounded-full hover:bg-black/40 transition-all z-20"
          >
            <ChevronLeft size={36} />
          </button>

          <img 
            src={album.photos[currentIndex]} 
            alt={`Foto ${currentIndex + 1}`}
            draggable={false}
            onContextMenu={(e) => e.preventDefault()} 
            className="max-w-full max-h-full object-contain animate-in zoom-in-95 duration-300 shadow-2xl select-none"
            key={currentIndex}
          />

          <button 
            onClick={nextPhoto} 
            className="absolute right-2 md:right-4 text-white/50 hover:text-white p-2 rounded-full hover:bg-black/40 transition-all z-20"
          >
            <ChevronRight size={36} />
          </button>

          <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/80 to-transparent text-center">
            <h3 className="text-white font-serif text-lg md:text-xl font-bold">
              {album.title}
            </h3>
            <p className="text-white/60 text-sm">
              {currentIndex + 1} / {album.photos.length}
            </p>
          </div>
        </div>

      </div>
    </div>
  );
};

export default GalleryModal;
