// src/components/ui/MaintenanceModal.jsx
import React, { useState, useEffect } from 'react';
import { Radio, X} from 'lucide-react';
import Logo from '../../img/flogo.png';

const NewYearModal = () => {
  const [isOpen, setIsOpen] = useState(true);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Pequeño delay para animación al abrir
    const timer = setTimeout(() => setIsVisible(true), 200);
    return () => clearTimeout(timer);
  }, []);

  const handleClose = () => {
    // Animación de cierre
    setIsVisible(false);
    setTimeout(() => setIsOpen(false), 300); // removemos del DOM luego de animación
  };

  if (!isOpen) return null; // NO renderizamos nada si el modal está cerrado

  return (
    <div className="fixed inset-0 z-[150] flex items-center justify-center p-4 sm:p-6 pointer-events-auto">
      
      {/* Backdrop con desenfoque */}
      <div
        className={`absolute inset-0 bg-black/50 backdrop-blur-sm transition-opacity duration-300 ${isVisible ? "opacity-100" : "opacity-0"}`}
        onClick={handleClose}
      />

      {/* Modal principal */}
      <div className={`relative bg-gradient-to-b from-[#1E293B] via-[#0F172A] to-[#1E293B] w-full max-w-md md:max-w-lg lg:max-w-xl rounded-3xl shadow-2xl overflow-hidden border border-stone-700 transition-transform duration-300
        ${isVisible ? "opacity-100 scale-100 translate-y-0" : "opacity-0 scale-95 translate-y-6"} pointer-events-auto`}>

        {/* Botón cerrar */}
        <button
          onClick={handleClose}
          className="absolute top-4 right-4 p-2 text-stone-400 hover:text-stone-200 transition-colors z-20"
        >
          <X size={24} />
        </button>

        {/* Contenido */}
        <div className="relative z-10 p-8 flex flex-col items-center text-center">
          {/* Logo */}
          <div className="mb-6 p-4 bg-stone-900 rounded-full shadow-inner ring-1 ring-stone-600">
            <div className="scale-125">
              <img src={Logo} alt="Logo Iglesia" className="w-16 h-16 sm:w-20 sm:h-20 object-contain" />
            </div>
          </div>

          {/* Icono de radio */}
          <div className="mb-4 flex items-center justify-center">
            <Radio className="text-yellow-400 animate-ping-slow" size={48} />
          </div>

          {/* Título */}
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-yellow-400 via-yellow-300 to-yellow-400 bg-clip-text text-transparent drop-shadow-lg">
            Radio Offline
          </h2>

          {/* Mensaje */}
          <p className="text-sm sm:text-base text-stone-300 mb-6">
            Estimada congregación, les informamos que nuestro servicio de <span className="font-semibold text-yellow-300">Radio Online</span> no estará disponible temporalmente.
            <br />
            Estamos realizando <span className="font-semibold text-yellow-300">mantenimientos</span> para mejorar su experiencia.
            <br />
            <br />
            Gracias por su paciencia. Pronto estaremos de vuelta. Dios les bendiga.
          </p>

          {/* Footer */}
          <div className="mt-4 text-center text-stone-400 text-xs">
            <span>C.E. La Voz Del Triunfo Pentecostal</span>
          </div>
        </div>

        {/* Borde inferior decorativo */}
        <div className="h-2 w-full bg-gradient-to-r from-yellow-400 via-blue-500 to-yellow-400 animate-gradient-x"></div>
      </div>
    </div>
  );
};

export default NewYearModal;
