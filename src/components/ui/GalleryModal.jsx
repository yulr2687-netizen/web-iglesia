import React, { useState, useEffect } from 'react';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';

const GalleryModal = ({ isOpen, onClose, album }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (isOpen) setCurrentIndex(0); 
  }, [isOpen]);

  if (!isOpen || !album) return null;

  const nextPhoto = () => setCurrentIndex((prev) => (prev + 1) % album.photos.length);
  const prevPhoto = () => setCurrentIndex((prev) => (prev - 1 + album.photos.length) % album.photos.length);

  return (
    <div className="fixed inset-0 z-[100] bg-black/95 flex flex-col items-center justify-center backdrop-blur-md animate-in fade-in duration-300">
      <button onClick={onClose} className="absolute top-6 right-6 text-white/70 hover:text-white p-2 rounded-full hover:bg-white/10 transition-colors z-20">
        <X size={32} />
      </button>
      <div className="relative w-full max-w-5xl h-[60vh] md:h-[70vh] flex items-center justify-center px-4">
        <button onClick={prevPhoto} className="absolute left-4 text-white/50 hover:text-white p-2 rounded-full hover:bg-white/10 transition-colors">
          <ChevronLeft size={48} />
        </button>
        <img src={album.photos[currentIndex]} alt={`Foto ${currentIndex + 1}`} className="max-w-full max-h-full object-contain rounded-lg shadow-2xl animate-in zoom-in-95 duration-300 key={currentIndex}" />
        <button onClick={nextPhoto} className="absolute right-4 text-white/50 hover:text-white p-2 rounded-full hover:bg-white/10 transition-colors">
          <ChevronRight size={48} />
        </button>
      </div>
      <div className="w-full max-w-4xl px-4 mt-6">
        <div className="text-center mb-4">
          <h3 className="text-white font-serif text-xl">
            {album.title}
          </h3>
          <p className="text-white/50 text-sm">
            {currentIndex + 1} / {album.photos.length}
          </p>
        </div>
        <div className="flex gap-2 overflow-x-auto justify-center pb-2 px-4 no-scrollbar">
          {album.photos.map((photo, idx) => (
            <button key={idx} onClick={() => setCurrentIndex(idx)} className={`relative h-16 w-16 md:h-20 md:w-20 flex-shrink-0 rounded-md overflow-hidden transition-all duration-300 ${currentIndex === idx ? 'ring-2 ring-[#3D6599] scale-110 opacity-100' : 'opacity-50 hover:opacity-80'}`}>
              <img src={photo} alt="thumbnail" className="w-full h-full object-cover" />
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default GalleryModal;