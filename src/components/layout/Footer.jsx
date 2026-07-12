import React from 'react';
import { MapPin, Mail, Facebook, Youtube, Instagram, Radio } from 'lucide-react';
import LogoSVG from '../ui/Logo';

const Footer = ({ handleNavigation, setIsTermsModalOpen, setIsPrivacyModalOpen }) => {
  return (
    <footer className="bg-stone-50 dark:bg-[#120f0d] pt-16 pb-32 md:pb-8 px-4 border-t border-stone-200 dark:border-stone-800">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12 text-center md:text-left">
        
        {/* Identidad de la Iglesia */}
        <div className="flex flex-col items-center md:items-start">
          <a 
            href="#inicio" 
            className="flex items-center gap-2 mb-4 group cursor-pointer" 
            onClick={(e) => { e.preventDefault(); handleNavigation('inicio'); }}
          >
            <LogoSVG />
            <h3 className="font-serif text-lg font-bold text-stone-900 dark:text-white group-hover:text-[#3D6599] dark:group-hover:text-[#C7DBEB] transition-colors">
              La Voz Del Triunfo P.
            </h3>
          </a>
          <p className="text-stone-500 dark:text-stone-400 text-sm mb-6 leading-relaxed">
            Unidos en la fe, esperanza y amor, comprometidos a servir y transformar vidas.
          </p>
          <div className="flex gap-3 justify-center md:justify-start">
            {[
              { icon: Facebook, href: "https://www.facebook.com/lavoz.del.triunfo.pentecostal" },
              { icon: Youtube, href: "https://www.youtube.com/channel/UC1q9tSZVjIZfeFrNiCw2fSA/" },
              { icon: Instagram, href: "https://www.instagram.com/lavozdeltriunfo.machali/" }
            ].map((item, i) => (
              <a
                key={i}
                href={item.href}
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 rounded-full border border-stone-300 dark:border-stone-700 flex items-center justify-center text-stone-500 dark:text-stone-400 hover:bg-[#3D6599] hover:text-white hover:border-[#3D6599] transition-all hover:scale-110"
              >
                <item.icon size={14} />
              </a>
            ))}
          </div>
        </div>

        {/* Enlaces Rápidos */}
        <div className="flex flex-col items-center md:items-start">
          <h4 className="font-bold text-stone-900 dark:text-white mb-6">Enlaces Rápidos</h4>
          <ul className="space-y-3 text-sm text-stone-600 dark:text-stone-400">
            <li>
              <a href="#inicio" onClick={(e) => { e.preventDefault(); handleNavigation('inicio'); }} className="hover:text-[#3D6599] transition-colors flex items-center gap-2 justify-center md:justify-start">Inicio</a>
            </li>
            <li>
              <a href="#liderazgo" onClick={(e) => { e.preventDefault(); handleNavigation('liderazgo', true); }} className="hover:text-[#3D6599] transition-colors flex items-center gap-2 justify-center md:justify-start">Liderazgo</a>
            </li>
            <li>
              <a href="#visitanos" onClick={(e) => { e.preventDefault(); handleNavigation('visitanos', true); }} className="hover:text-[#3D6599] transition-colors flex items-center gap-2 justify-center md:justify-start">Visítanos</a>
            </li>
            <li>
              <button onClick={() => handleNavigation('radio', true)} className="text-stone-600 dark:text-stone-400 hover:text-[#3D6599] dark:hover:text-[#C7DBEB] transition-colors flex items-center gap-2">
                <Radio size={16} /> Radio Online
              </button>
            </li>
          </ul>
        </div>

        {/* Datos de Contacto */}
        <div className="flex flex-col items-center md:items-start">
          <h4 className="font-bold text-stone-900 dark:text-white mb-6">Contacto</h4>
          <ul className="space-y-4 text-sm text-stone-600 dark:text-stone-400">
            <li className="flex items-center gap-3 justify-center md:justify-start">
              <div className="p-2 bg-[#C7DBEB]/30 dark:bg-stone-800 rounded-full text-[#3D6599]"><MapPin size={16} /></div>
              La Cascada N.° 778, Machalí
            </li>
            <li className="flex items-center gap-3 justify-center md:justify-start">
              <div className="p-2 bg-[#C7DBEB]/30 dark:bg-stone-800 rounded-full text-[#3D6599]"><Mail size={16} /></div>
              celavozdeltriunfo@gmail.com
            </li>
          </ul>
        </div>

        {/* Bloque de Horarios / Servicios */}
        <div className="flex flex-col items-center md:items-start">
          <h4 className="font-bold text-stone-900 dark:text-white mb-6">Servicios</h4>
          <ul className="space-y-4 text-sm text-stone-600 dark:text-stone-400 w-full">
            <li>
              <p className="font-semibold text-stone-800 dark:text-stone-200 mb-1">Templo Central</p>
              <div className="space-y-1 text-stone-500 dark:text-stone-400">
                <div className="flex justify-center md:justify-start gap-2">
                  <span className="w-16 text-left">Martes</span><span>· 19:30 PM</span>
                </div>
                <div className="flex justify-center md:justify-start gap-2">
                  <span className="w-16 text-left">Jueves</span><span>· 19:30 PM</span>
                </div>
                <div className="flex justify-center md:justify-start gap-2">
                  <span className="w-16 text-left">Domingo</span><span>· 11:00 AM</span>
                </div>
              </div>
            </li>
            <li>
              <p className="font-semibold text-stone-800 dark:text-stone-200 mb-1">La Morera</p>
              <div className="space-y-1 text-stone-500 dark:text-stone-400">
                <div className="flex justify-center md:justify-start gap-2">
                  <span className="w-16 text-left">Miércoles</span><span>· 19:30 PM</span>
                </div>
                <div className="flex justify-center md:justify-start gap-2">
                  <span className="w-16 text-left">Sábado</span><span>· 19:30 PM</span>
                </div>
              </div>
            </li>
          </ul>
        </div>
      </div>

      {/* Footer de Créditos */}
      <div className="max-w-7xl mx-auto pt-8 border-t border-stone-200 dark:border-stone-800 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-stone-500 dark:text-stone-500 text-center md:text-left">
        <p>© 2026 C.E. La Voz Del Triunfo Pentecostal. Todos los derechos reservados.</p>
        <div className="flex gap-6">
          <button onClick={() => setIsTermsModalOpen(true)} className="hover:text-[#3D6599] transition-colors">Términos</button>
          <button onClick={() => setIsPrivacyModalOpen(true)} className="hover:text-[#3D6599] transition-colors">Privacidad</button>
        </div>
      </div>
    </footer>
  );
};

export default Footer;