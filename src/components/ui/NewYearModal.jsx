// src/components/ui/NewYearModal.jsx
import React, { useState, useEffect } from 'react';
import { X, Sparkles, CalendarHeart } from 'lucide-react';
import Logo from '../../img/flogo.png';

const NewYearModal = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [isClosing, setIsClosing] = useState(false);

  useEffect(() => {
    const checkDateAndShow = () => {
      const now = new Date();
      
      // CONFIGURACIÓN DE LA FECHA OBJETIVO (01 de Enero de 2026)
      // Nota: en JavaScript los meses van de 0 (Enero) a 11 (Diciembre)
      const targetYear = 2026;
      const targetMonth = 0; // Enero
      const targetDay = 1;

      // 1. Validar si es el día correcto
      const isTargetDate = 
        now.getFullYear() === targetYear && 
        now.getMonth() === targetMonth && 
        now.getDate() === targetDay;

      // 2. Validar si ya se mostró en esta sesión (para no molestar al usuario)
      const hasSeenModal = sessionStorage.getItem('seenNewYearModal_2026');

      // PARA PROBAR AHORA MISMO:
      // Cambia "isTargetDate" por "true" en la línea de abajo temporalmente.
      if (isTargetDate && !hasSeenModal) {
        // Pequeño delay para que no aparezca de golpe al cargar
        setTimeout(() => {
            setIsOpen(true);

            requestAnimationFrame(() => {
                setIsVisible(true);
            });
        }, 1000);
      }
    };

    checkDateAndShow();
  }, []);

  const handleClose = () => {
    setIsVisible(false);
    setIsClosing(true);

    setTimeout(() => {
        setIsOpen(false);
        setIsClosing(false);
        sessionStorage.setItem('seenNewYearModal_2026', 'true');
    }, 500);
    // Guardamos que ya lo vio para no volver a abrirlo hasta cerrar el navegador
    
  };

  if (!isOpen && !isClosing) return null;

  return (
    <div className="fixed inset-0 z-[150] flex items-center justify-center p-4 sm:p-6">
      {/* Backdrop con desenfoque */}
      <div 
        className={`absolute inset-0 bg-black/60 backdrop-blur-md transition-all duration-500 ease-out ${isVisible ? "opacity-100" : "opacity-0"}`}
        onClick={handleClose}
      />

      {/* Tarjeta del Modal */}
      <div className={`relative bg-white dark:bg-[#1a1614] w-full max-w-md md:max-w-lg lg:max-w-xl rounded-3xl shadow-2xl overflow-hidden border border-stone-100 dark:border-stone-800 transition-all duration-500 ease-out
                     ${isVisible ? "opacity-100 scale-100 translate-y-0" : "opacity-0 scale-95 translate-y-6"}`}>
        {/* Decoración de fondo (Brillos) */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
            <div className="absolute -top-10 -right-10 w-40 h-40 bg-yellow-400/20 rounded-full blur-3xl"></div>
            <div className="absolute bottom-0 left-0 w-32 h-32 bg-[#3D6599]/20 rounded-full blur-3xl"></div>
        </div>

        {/* Contenido */}
        <div className="relative z-10 p-8 flex flex-col items-center text-center">
          
          {/* Botón cerrar */}
          <button 
            onClick={handleClose} 
            className="absolute top-4 right-4 p-2 text-stone-400 hover:text-stone-600 dark:hover:text-stone-200 transition-colors"
          >
            <X size={24} />
          </button>

          {/* Logo Animado */}
          <div className="mb-6 p-4 bg-stone-50 dark:bg-stone-800 rounded-full shadow-inner ring-1 ring-stone-100 dark:ring-stone-700">
            <div className="scale-125">
               {/* USA ETIQUETA IMG, NO COMPONENTE */}
               <img src={Logo} alt="Logo Iglesia" className="w-14 h-14 sm:w-20 sm:h-20 object-contain" />
            </div>
          </div>

          {/* Título con Gradiente Dorado */}
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold mb-2 bg-gradient-to-r from-yellow-600 via-yellow-500 to-yellow-600 bg-clip-text text-transparent drop-shadow-sm">
            ¡Feliz Año Nuevo!
          </h2>
          
          <div className="flex items-center gap-2 justify-center mb-6">
             <Sparkles className="text-yellow-500" size={20} />
             <span className="font-bold text-2xl text-stone-800 dark:text-stone-200 tracking-widest">2026</span>
             <Sparkles className="text-yellow-500" size={20} />
          </div>

          {/* Mensaje */}
          <p className="text-sm sm:text-base text-stone-600 dark:text-stone-300">
            "He aquí, yo hago nuevas todas las cosas." <span className="text-xs font-bold text-[#3D6599] block mt-1">— Apocalipsis 21:5</span>
            <br className="my-2"/>
            Deseamos que este nuevo año esté lleno de la gracia, la paz y las bendiciones de Dios para ustedes y sus familias.
            Gracias por ser parte de nosotros. <br />
            <br />
            ¡Les deseamos muchas bendiciones! 
          </p>
            <div className="mt-6 text-center text-stone-500 dark:text-stone-400">
                <span className="block text-[11px] tracking-wide">
                    C.E. La Voz Del Triunfo Pentecostal
                </span>
            </div>

        </div>

        {/* Borde inferior decorativo */}
        <div className="h-2 w-full bg-gradient-to-r from-[#3D6599] via-yellow-400 to-[#3D6599]"></div>
      </div>
    </div>
  );
};

export default NewYearModal;