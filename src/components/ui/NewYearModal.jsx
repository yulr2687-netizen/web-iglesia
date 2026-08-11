import React, { useState, useEffect } from 'react';
import { X, Radio, Wrench } from 'lucide-react';
import Logo from '../../assets/img/flogo.png';

const RadioMaintenanceModal = () => {
  const [isOpen, setIsOpen] = useState(true);
  const [isVisible, setIsVisible] = useState(false);

  // Control de entrada del modal con animación suave
  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 150);
    return () => clearTimeout(timer);
  }, []);

  if (!isOpen) return null;

  const handleClose = () => {
    setIsVisible(false);
    setTimeout(() => setIsOpen(false), 500);
  };

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 pointer-events-none">
      
      {/* 1. Fondo Borroso (Backdrop adaptativo a tema Claro / Oscuro) */}
      <div
        className={`absolute inset-0 bg-slate-900/30 dark:bg-black/75 backdrop-blur-md transition-opacity duration-500 pointer-events-auto ${
          isVisible ? "opacity-100" : "opacity-0"
        }`}
        onClick={handleClose}
      />

      {/* 2. Contenedor Principal (Mantiene posición y bordes adaptativos) */}
      <div className={`relative w-full max-w-md bg-white/95 dark:bg-[#0d0f12]/95 backdrop-blur-xl rounded-3xl shadow-2xl border border-stone-200/80 dark:border-white/10 transition-all duration-500 ease-out pointer-events-auto overflow-hidden
        ${isVisible ? "opacity-100 scale-100 translate-y-0" : "opacity-0 scale-95 translate-y-6"}`}>
        
        {/* Iluminación sutil de fondo (Glows adaptados al tema de radio) */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
          <div className="absolute -top-20 -right-20 w-52 h-52 bg-amber-500/15 dark:bg-amber-500/10 blur-[60px] rounded-full"></div>
          <div className="absolute -bottom-20 -left-20 w-52 h-52 bg-[#3D6599]/20 dark:bg-[#3D6599]/15 blur-[60px] rounded-full"></div>
        </div>

        {/* 3. Botón de Cerrar (Posición exacta) */}
        <button 
          onClick={handleClose} 
          aria-label="Cerrar modal"
          className="absolute top-4 right-4 p-2.5 rounded-full text-stone-400 dark:text-stone-400 hover:text-stone-800 dark:hover:text-white hover:bg-stone-100 dark:hover:bg-white/5 transition-all z-50"
        >
          <X size={18} />
        </button>

        <div className="relative z-10 p-8 md:p-10 flex flex-col items-center text-center">
          
          {/* 4. Logo con Halo Animado (Posición exacta) */}
          <div className="mb-6 relative flex items-center justify-center">
            {/* Halo pulsante de señal */}
            <div className="absolute inset-0 rounded-full bg-gradient-to-r from-amber-500/30 via-[#3D6599]/40 to-amber-500/30 animate-[spin_6s_linear_infinite] blur-md scale-110"></div>
            
            <div className="relative bg-white dark:bg-[#14171d] p-4 rounded-full border border-stone-200 dark:border-white/10 shadow-lg">
              <img src={Logo} alt="Logo Radio" className="w-16 h-16 object-contain" />
            </div>
          </div>

          {/* 5. Título Principal */}
          <h2 className="font-serif text-2xl md:text-3xl font-bold text-stone-900 dark:text-white leading-tight mb-2">
            Radio Online <br />
            <span className="text-amber-600 dark:text-amber-400 font-normal italic">en Mantenimiento</span>
          </h2>

          {/* Subtítulo / Descripción */}
          <p className="text-stone-600 dark:text-stone-300 text-sm max-w-[280px] mx-auto mb-6 leading-relaxed">
            Estamos realizando ajustes técnicos para brindarles una mejor calidad, como también cambios internos para futuras trasmisiones en vivo.
          </p>

          {/* 6. Indicador de Estado (Ocupa la posición donde estaba el contador) */}
          <div className="w-full bg-stone-50/80 dark:bg-white/[0.03] border border-stone-200/80 dark:border-white/10 rounded-2xl p-4 mb-2 flex items-center justify-center gap-3 shadow-inner">
            <div className="relative flex items-center justify-center">
              <span className="animate-ping absolute inline-flex h-3 w-3 rounded-full bg-amber-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-amber-500"></span>
            </div>
            
            <div className="flex items-center gap-2 text-stone-700 dark:text-stone-200 text-xs font-medium tracking-wide">
              <Radio size={15} className="text-amber-600 dark:text-amber-400 animate-pulse" />
              <span>Transmisión pausada temporalmente</span>
            </div>
          </div>

          {/* 7. Footer inferior (Posición exacta) */}
          <div className="w-full mt-6">
            <div className="h-[1px] w-full bg-gradient-to-r from-transparent via-stone-300 dark:via-[#3D6599]/40 to-transparent mb-3"></div>
            <h3 className="text-stone-500 dark:text-[#C7DBEB] font-medium tracking-widest text-[9px] md:text-[10px] uppercase italic opacity-90">
              C.E. La Voz Del Triunfo Pentecostal
            </h3>
          </div>

        </div>
      </div>
    </div>
  );
};

export default RadioMaintenanceModal;