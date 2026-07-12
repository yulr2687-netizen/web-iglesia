import React from 'react';
import { X, ShieldCheck, FileText } from 'lucide-react';

export const PrivacyPolicyModal = ({ isOpen, onClose }) => {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-stone-900/40 backdrop-blur-md p-4 transition-all duration-300" onClick={onClose}>
      <div className="bg-white dark:bg-[#1a1816] rounded-[28px] shadow-[0_32px_64px_-16px_rgba(0,0,0,0.2)] dark:shadow-[0_40px_80px_-24px_rgba(0,0,0,0.6)] w-full max-w-3xl max-h-[85vh] flex flex-col overflow-hidden border border-stone-100 dark:border-stone-800/60 animate-in fade-in zoom-in-95 duration-300" onClick={e => e.stopPropagation()}>
        
        {/* Header */}
        <div className="p-6 md:p-7 border-b border-stone-100 dark:border-stone-800/80 flex justify-between items-center sticky top-0 bg-white/90 dark:bg-[#1a1816]/90 backdrop-blur-md z-10">
          <div className="flex items-center gap-3.5">
            <div className="w-10 h-10 rounded-xl bg-[#C7DBEB]/30 dark:bg-[#3D6599]/20 text-[#3D6599] dark:text-[#C7DBEB] flex items-center justify-center flex-shrink-0">
              <ShieldCheck size={20} />
            </div>
            <h3 className="text-xl md:text-2xl font-bold font-serif text-stone-900 dark:text-white tracking-tight">
              Política de Privacidad y Uso de Imagen
            </h3>
          </div>
          <button 
            onClick={onClose}
            className="w-9 h-9 rounded-full flex items-center justify-center text-stone-400 hover:text-stone-900 dark:hover:text-white hover:bg-stone-50 dark:hover:bg-stone-800 transition-colors"
          >
            <X size={18} />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 md:p-8 overflow-y-auto space-y-6 text-stone-600 dark:text-stone-300 text-[14px] md:text-[15px] leading-relaxed custom-scrollbar">
          <p>
            En <strong>Congregación Evangélica La Voz Del Triunfo Pentecostal</strong>, 
            respetamos su privacidad y su derecho a la propia imagen, especialmente en el contexto de nuestras actividades públicas.
          </p>
          <h4 className="font-bold text-[#3D6599] dark:text-[#C7DBEB] text-lg font-serif">
            1. Datos Personales
          </h4>
          <p>
            <strong>Este sitio web no recopila datos personales.</strong> No solicitamos nombres, 
            correos electrónicos ni direcciones a través de formularios. La navegación es informativa y anónima.
          </p>
          <h4 className="font-bold text-[#3D6599] dark:text-[#C7DBEB] text-lg font-serif">
            2. Uso de Fotografías y Video
          </h4>
          <p>
            Durante nuestros cultos y eventos, nuestro equipo de comunicaciones realiza capturas fotográficas y de video con fines de:
          </p>
          <ul className="list-disc pl-5 space-y-2 marker:text-[#3D6599] dark:marker:text-[#C7DBEB]">
            <li>Registro histórico y memoria de la iglesia.</li>
            <li>Difusión de nuestras actividades en redes sociales y sitio web oficial.</li>
          </ul>
          <p>
            Al asistir a nuestras reuniones públicas, usted consiente que su imagen pueda aparecer de forma 
            incidental en planos generales. Sin embargo, respetamos su derecho a la privacidad. Si aparece en alguna fotografía 
            publicada y desea que sea retirada, por favor contáctenos y procederemos a eliminarla inmediatamente.
          </p>
          <h4 className="font-bold text-[#3D6599] dark:text-[#C7DBEB] text-lg font-serif">
            3. Menores de Edad
          </h4>
          <p>
            Cuidamos especialmente la imagen de los niños. Evitamos publicar primeros planos de menores sin el consentimiento de sus padres o tutores.
          </p>
        </div>

        {/* Footer */}
        <div className="p-5 border-t border-stone-100 dark:border-stone-800/80 flex justify-end bg-stone-50/50 dark:bg-stone-900/30 backdrop-blur-sm">
          <button 
            onClick={onClose} 
            className="bg-[#3D6599] text-white px-7 py-2.5 rounded-xl font-bold text-sm shadow-sm shadow-[#3D6599]/10 hover:bg-[#2d4b73] transform active:scale-98 transition-all duration-200"
          >
            Entendido
          </button>
        </div>
      </div>
    </div>
  );
};

export const TermsOfUseModal = ({ isOpen, onClose }) => {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-stone-900/40 backdrop-blur-md p-4 transition-all duration-300" onClick={onClose}>
      <div className="bg-white dark:bg-[#1a1816] rounded-[28px] shadow-[0_32px_64px_-16px_rgba(0,0,0,0.2)] dark:shadow-[0_40px_80px_-24px_rgba(0,0,0,0.6)] w-full max-w-3xl max-h-[85vh] flex flex-col overflow-hidden border border-stone-100 dark:border-stone-800/60 animate-in fade-in zoom-in-95 duration-300" onClick={e => e.stopPropagation()}>
        
        {/* Header */}
        <div className="p-6 md:p-7 border-b border-stone-100 dark:border-stone-800/80 flex justify-between items-center sticky top-0 bg-white/90 dark:bg-[#1a1816]/90 backdrop-blur-md z-10">
          <div className="flex items-center gap-3.5">
            <div className="w-10 h-10 rounded-xl bg-[#C7DBEB]/30 dark:bg-[#3D6599]/20 text-[#3D6599] dark:text-[#C7DBEB] flex items-center justify-center flex-shrink-0">
              <FileText size={19} />
            </div>
            <h3 className="text-xl md:text-2xl font-bold font-serif text-stone-900 dark:text-white tracking-tight">
              Términos de Uso
            </h3>
          </div>
          <button 
            onClick={onClose}
            className="w-9 h-9 rounded-full flex items-center justify-center text-stone-400 hover:text-stone-900 dark:hover:text-white hover:bg-stone-50 dark:hover:bg-stone-800 transition-colors"
          >
            <X size={18} />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 md:p-8 overflow-y-auto space-y-6 text-stone-600 dark:text-stone-300 text-[14px] md:text-[15px] leading-relaxed custom-scrollbar">
          <p>
            Bienvenidos a <strong>Congregación Evangélica La Voz Del Triunfo Pentecostal</strong> .
          </p>
          <h4 className="font-bold text-[#3D6599] dark:text-[#C7DBEB] text-lg font-serif">
            1. Propósito
          </h4>
          <p>
            Este sitio es meramente informativo. Su objetivo es comunicar nuestros horarios, ubicaciones y eventos a la comunidad.
          </p>
          <h4 className="font-bold text-[#3D6599] dark:text-[#C7DBEB] text-lg font-serif">
            2. Contenido
          </h4>
          <p>
            Todas las imágenes y textos presentados son propiedad de la iglesia o se utilizan con fines ilustrativos bajo licencia. 
            Se prohíbe su uso comercial sin autorización.
          </p>
          <h4 className="font-bold text-[#3D6599] dark:text-[#C7DBEB] text-lg font-serif">
            3. Conducta
          </h4>
          <p>
            Esperamos que el uso de nuestros canales de comunicación sea siempre bajo un marco de respeto y valores cristianos.
          </p>
        </div>

        {/* Footer */}
        <div className="p-5 border-t border-stone-100 dark:border-stone-800/80 flex justify-end bg-stone-50/50 dark:bg-stone-900/30 backdrop-blur-sm">
          <button 
            onClick={onClose} 
            className="bg-[#3D6599] text-white px-7 py-2.5 rounded-xl font-bold text-sm shadow-sm shadow-[#3D6599]/10 hover:bg-[#2d4b73] transform active:scale-98 transition-all duration-200"
          >
            Aceptar
          </button>
        </div>
      </div>
    </div>
  );
};