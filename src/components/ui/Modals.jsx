import React from 'react';
import { X } from 'lucide-react';

export const PrivacyPolicyModal = ({ isOpen, onClose }) => {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/70 p-4" onClick={onClose}>
      <div className="bg-white dark:bg-stone-900 rounded-2xl shadow-2xl w-full max-w-4xl max-h-[90vh] flex flex-col overflow-hidden animate-in fade-in zoom-in duration-300" onClick={e => e.stopPropagation()}>
        <div className="p-6 border-b dark:border-stone-800 flex justify-between items-center sticky top-0 bg-white dark:bg-stone-900 z-10">
          <h3 className="text-2xl font-bold font-serif text-stone-900 dark:text-white flex items-center gap-2">
            Política de Privacidad y Uso de Imagen
          </h3>
          <button onClick={onClose}><X className="text-stone-500 hover:text-stone-900 dark:hover:text-white" /></button>
        </div>
        <div className="p-8 overflow-y-auto space-y-6 text-stone-700 dark:text-stone-300 text-sm leading-relaxed">
          <p>
            En <strong>Congregación Evangélica La Voz Del Triunfo Pentecostal</strong>, 
            respetamos su privacidad y su derecho a la propia imagen, especialmente en el contexto de nuestras actividades públicas.
          </p>
          <h4 className="font-bold text-[#3D6599] dark:text-[#C7DBEB] text-lg">
            1. Datos Personales
          </h4>
          <p>
            <strong>Este sitio web no recopila datos personales.</strong> No solicitamos nombres, 
            correos electrónicos ni direcciones a través de formularios. La navegación es informativa y anónima.
          </p>
          <h4 className="font-bold text-[#3D6599] dark:text-[#C7DBEB] text-lg">
            2. Uso de Fotografías y Video
          </h4>
          <p>
            Durante nuestros cultos y eventos, nuestro equipo de comunicaciones realiza capturas fotográficas y de video con fines de:
          </p>
          <ul className="list-disc pl-5 space-y-1">
            <li>Registro histórico y memoria de la iglesia.</li>
            <li>Difusión de nuestras actividades en redes sociales y sitio web oficial.</li>
          </ul>
          <p>
            Al asistir a nuestras reuniones públicas, usted consiente que su imagen pueda aparecer de forma 
            incidental en planos generales. Sin embargo, respetamos su derecho a la privacidad. Si aparece en alguna fotografía 
            publicada y desea que sea retirada, por favor contáctenos y procederemos a eliminarla inmediatamente.
          </p>
          <h4 className="font-bold text-[#3D6599] dark:text-[#C7DBEB] text-lg">
            3. Menores de Edad
          </h4>
          <p>
            Cuidamos especialmente la imagen de los niños. Evitamos publicar primeros planos de menores sin el consentimiento de sus padres o tutores.
          </p>
        </div>
        <div className="p-4 border-t dark:border-stone-800 flex justify-end bg-stone-50 dark:bg-stone-900">
          <button onClick={onClose} className="bg-[#3D6599] text-white px-6 py-2 rounded-lg font-bold hover:bg-[#2d4b73] transition-colors">
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
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/70 p-4" onClick={onClose}>
      <div className="bg-white dark:bg-stone-900 rounded-2xl shadow-2xl w-full max-w-4xl max-h-[90vh] flex flex-col overflow-hidden animate-in fade-in zoom-in duration-300" onClick={e => e.stopPropagation()}>
        <div className="p-6 border-b dark:border-stone-800 flex justify-between items-center sticky top-0 bg-white dark:bg-stone-900 z-10">
          <h3 className="text-2xl font-bold font-serif text-stone-900 dark:text-white flex items-center gap-2">
            Términos de Uso</h3>
          <button onClick={onClose}><X className="text-stone-500 hover:text-stone-900 dark:hover:text-white" /></button>
        </div>
        <div className="p-8 overflow-y-auto space-y-6 text-stone-700 dark:text-stone-300 text-sm leading-relaxed">
          <p>
            Bienvenidos a <strong>Congregación Evangélica La Voz Del Triunfo Pentecostal</strong> .
          </p>
          <h4 className="font-bold text-[#3D6599] dark:text-[#C7DBEB] text-lg">
            1. Propósito
          </h4>
          <p>
            Este sitio es meramente informativo. Su objetivo es comunicar nuestros horarios, ubicaciones y eventos a la comunidad.
          </p>
          <h4 className='font-bold text-[#3D6599] dark:text-[#C7DBEB] text-lg'>
            2. Contenido
          </h4>
          <p>
            Todas las imágenes y textos presentados son propiedad de la iglesia o se utilizan con fines ilustrativos bajo licencia. 
            Se prohíbe su uso comercial sin autorización.
          </p>
          <h4 className='font-bold text-[#3D6599] dark:text-[#C7DBEB] text-lg'>
            3. Conducta
          </h4>
          <p>
            Esperamos que el uso de nuestros canales de comunicación sea siempre bajo un marco de respeto y valores cristianos.
          </p>
        </div>
        <div className="p-4 border-t dark:border-stone-800 flex justify-end bg-stone-50 dark:bg-stone-900">
          <button onClick={onClose} className="bg-[#3D6599] text-white px-6 py-2 rounded-lg font-bold hover:bg-[#2d4b73] transition-colors">
            Aceptar
          </button>
        </div>
      </div>
    </div>
  );
};