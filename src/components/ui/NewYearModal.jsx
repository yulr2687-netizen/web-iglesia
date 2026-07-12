import React, { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import Logo from '../../assets/img/flogo.png';

const NewYearModal = () => {
  const [isOpen, setIsOpen] = useState(true);
  const [isVisible, setIsVisible] = useState(false);
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  const [status, setStatus] = useState('countdown');
  const [typedText, setTypedText] = useState("");
  
  // Fechas exactas de control
  const anniversaryDate = new Date("2026-05-27T00:00:00").getTime();
  const endDate = new Date("2026-06-01T00:00:00").getTime(); // El 1 de junio desaparece

  // Lógica principal de tiempo y visibilidad
  useEffect(() => {
    const now = new Date().getTime();
    
    if (now >= endDate) {
      setIsOpen(false);
      return;
    }

    const timer = setTimeout(() => setIsVisible(true), 200);
    
    const calculateTime = () => {
      const currentTime = new Date().getTime();
      
      if (currentTime >= endDate) {
        setIsOpen(false);
        return;
      }
      
      if (currentTime >= anniversaryDate) {
        setStatus('anniversary');
      } else {
        setStatus('countdown');
        const difference = anniversaryDate - currentTime;
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60),
        });
      }
    };

    const interval = setInterval(calculateTime, 1000);
    calculateTime();

    return () => {
      clearTimeout(timer);
      clearInterval(interval);
    };
  }, []);

  // Efecto de Máquina de Escribir (Solo se activa en el aniversario)
  useEffect(() => {
    if (status === 'anniversary') {
      
      const message = "28 años de gracia, fe y restauración. Una historia escrita por Dios, recordando cada momento vivido desde nuestra fundación hasta ahora. El legado continúa vivo en cada corazón...";
      let i = 0;
      const typing = setInterval(() => {
        setTypedText(message.slice(0, i));
        i++;
        if (i > message.length) clearInterval(typing);
      }, 60);
      
      return () => clearInterval(typing);
    }
  }, [status]);

  if (!isOpen) return null;

  const handleClose = () => {
    setIsVisible(false);
    setTimeout(() => setIsOpen(false), 600);
  };

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 pointer-events-none">
      
      {/* Fondo borroso (Backdrop adaptado a tema claro/oscuro) */}
      <div
        className={`absolute inset-0 bg-white/40 dark:bg-black/60 backdrop-blur-sm transition-opacity duration-700 pointer-events-auto ${isVisible ? "opacity-100" : "opacity-0"}`}
        onClick={handleClose}
      />

      {/* Contenedor Principal (Adaptado a tema claro/oscuro) */}
      <div className={`relative w-full max-w-md bg-white dark:bg-[#0a0908] rounded-3xl shadow-2xl overflow-hidden border border-stone-200 dark:border-white/10 transition-all duration-700 ease-out pointer-events-auto
        ${isVisible ? "opacity-100 scale-100 translate-y-0" : "opacity-0 scale-95 translate-y-8"}`}>
        
        {/* Iluminación sutil en las esquinas */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
            <div className="absolute -top-16 -right-16 w-48 h-48 bg-[#3D6599]/20 blur-[50px] rounded-full"></div>
            <div className="absolute -bottom-16 -left-16 w-48 h-48 bg-yellow-500/10 blur-[50px] rounded-full"></div>
        </div>

        {/* Botón de Cerrar */}
        <button onClick={handleClose} className="absolute top-4 right-4 p-2 text-stone-400 dark:text-white/30 hover:text-stone-700 dark:hover:text-white transition-colors z-50">
          <X size={20} />
        </button>

        <div className="relative z-10 p-8 md:p-10 flex flex-col items-center text-center">
          
          {/* Logo */}
          <div className="mb-6 relative flex items-center justify-center">
            {/* Halo giratorio */}
            <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-yellow-500/40 via-transparent to-[#3D6599]/40 animate-[spin_4s_linear_infinite] blur-sm scale-110"></div>
            
            <div className="relative bg-stone-100 dark:bg-[#151210] p-4 rounded-full border border-stone-200 dark:border-white/5 shadow-inner">
              <img src={Logo} alt="Logo" className="w-16 h-16 object-contain" />
            </div>
          </div>

          {status === 'countdown' ? (
            <>
              {/* VISTA DE ESPERA */}
              <h2 className="font-serif text-3xl md:text-4xl font-bold text-stone-800 dark:text-white leading-tight mb-2">
                Camino al <span className="text-yellow-600 dark:text-yellow-500/90 font-normal italic">Aniversario</span>
              </h2>
              <p className="text-stone-500 dark:text-stone-400 text-sm max-w-[260px] mx-auto mb-8 leading-relaxed">
                Preparándonos para celebrar 28 años de fidelidad y propósito.
              </p>

              {/* Contador */}
              <div className="flex justify-center gap-6 w-full mb-4">
                {[
                  { label: 'DÍAS', val: timeLeft.days },
                  { label: 'HRS', val: timeLeft.hours },
                  { label: 'MIN', val: timeLeft.minutes },
                  { label: 'SEG', val: timeLeft.seconds }
                ].map((item, i) => (
                  <div key={i} className="flex flex-col items-center">
                    <div className="text-2xl md:text-3xl font-serif font-bold text-stone-800 dark:text-white mb-1">
                      {item.val < 10 ? `0${item.val}` : item.val}
                    </div>
                    <span className="text-[9px] uppercase tracking-widest text-stone-400 dark:text-stone-500">{item.label}</span>
                  </div>
                ))}
              </div>
            </>
          ) : (
            <>
              {/* VISTA DE CELEBRACIÓN (Día 27 al 31) */}
              <h2 className="font-serif text-3xl md:text-4xl font-bold text-stone-800 dark:text-white leading-tight mb-6">
                Feliz <span className="text-yellow-600 dark:text-yellow-500/90 font-normal italic">28°</span> Aniversario
              </h2>
              
              {/* Contenedor más amplio para el mensaje nuevo */}
              <div className="min-h-[120px] flex items-start justify-center mb-2">
                <p className="text-stone-600 dark:text-stone-300 text-sm leading-relaxed max-w-[300px]">
                  {typedText}
                  <span className="animate-pulse inline-block w-1 h-4 ml-1 bg-yellow-500 align-middle"></span>
                </p>
              </div>
            </>
          )}

          {/* NUEVA UBICACIÓN: Letra fina, cursiva y en la parte inferior */}
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

export default NewYearModal;