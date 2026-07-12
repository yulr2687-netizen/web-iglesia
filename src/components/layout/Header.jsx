import React, { useState, useRef } from 'react';
import { 
  Sun, Moon, Home, Users, Heart, Calendar, MapPin, 
  ChevronLeft, History, Music, Image as ImageIcon, Radio, HandHeart 
} from 'lucide-react';
import LogoSVG from '../ui/Logo';
import DropdownMenu from '../navigation/DropdownMenu';
import useClickOutside from '../../hooks/useClickOutside';

const Header = ({ 
  currentView, 
  activeSection, 
  handleNavigation, 
  darkMode, 
  toggleDarkMode,
  isScrolled 
}) => {
  const [showMobileNosotrosMenu, setShowMobileNosotrosMenu] = useState(false);
  const [showMobileServiciosMenu, setShowMobileServiciosMenu] = useState(false);

  const mobileMenuRef = useRef(null);
  const mobileMenuTriggerRef = useRef(null);

  useClickOutside(mobileMenuRef, () => {
    setShowMobileNosotrosMenu(false);
    setShowMobileServiciosMenu(false);
  }, mobileMenuTriggerRef);

  const menuItems = [
    { id: 'nosotros', label: 'Nosotros', isDropdown: true },
    { id: 'servicios', label: 'Servicios', isDropdown: true },
    { id: 'eventos', label: 'Eventos' },
    { id: 'ubicacion', label: 'Ubicación' },
  ];

  return (
    <>
      {/* --- NAVBAR ESCRITORIO (FIXED) --- */}
      <nav className={`hidden md:flex justify-between items-center px-8 fixed top-0 left-0 w-full z-50 bg-white/70 dark:bg-[#1e1a17]/70 backdrop-blur-xl border-b border-white/20 dark:border-stone-800/50 shadow-sm transition-all duration-300 ${isScrolled ? 'py-2' : 'py-4'}`}>
        <a 
          href="#inicio" 
          className="flex items-center gap-3 group cursor-pointer" 
          onClick={(e) => { e.preventDefault(); handleNavigation('inicio'); }}
        >
          <div className={`transform transition-all duration-300 group-hover:scale-105 ${isScrolled ? 'p-1.5' : 'p-2'}`}>
            <LogoSVG />
          </div>
          <div>
            <h1 className={`font-serif font-bold leading-none text-stone-900 dark:text-stone-100 group-hover:text-[#3D6599] dark:group-hover:text-[#C7DBEB] transition-colors ${isScrolled ? 'text-lg' : 'text-xl'}`}>
              La Voz Del Triunfo Pentecostal
            </h1>
            <p className={`text-stone-500 dark:text-stone-400 tracking-wider transition-all ${isScrolled ? 'text-[10px]' : 'text-xs'}`}>
              Congregación Evangélica
            </p>
          </div>
        </a>

        <div className="flex gap-1 p-1 rounded-full bg-stone-100 dark:bg-stone-800/60 transition-colors duration-500">
          {menuItems.map((item) => {
            if (item.isDropdown) {
              return (
                <DropdownMenu
                  key={item.id}
                  menuId={item.id}
                  label={item.label}
                  activeSection={activeSection}
                  handleNavigation={handleNavigation}
                  currentView={currentView}
                />
              );
            }

            const isActive = currentView === 'home' && activeSection === item.id;
            return (
              <a
                key={item.id}
                href={`#${item.id}`}
                onClick={(e) => { e.preventDefault(); handleNavigation(item.id); }}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${isActive ? 'bg-[#3D6599] text-white' : 'text-stone-600 hover:bg-stone-200 dark:text-stone-300 dark:hover:bg-stone-700'}`}
              >
                {item.label}
              </a>
            );
          })}
        </div>

        <div className="flex items-center gap-4">
          {currentView !== 'home' && (
            <button onClick={() => handleNavigation('inicio')} className="flex items-center gap-1 text-sm font-medium text-stone-500 hover:text-[#3D6599] transition-colors">
              <ChevronLeft size={16} /> Volver a Inicio
            </button>
          )}
          <button onClick={toggleDarkMode} className="p-2 rounded-full hover:bg-stone-100 dark:hover:bg-stone-800 transition-transform active:scale-90 text-stone-600 dark:text-stone-300">
            {darkMode ? <Sun size={20} /> : <Moon size={20} />}
          </button>
        </div>
      </nav>
      
      {/* --- NAVBAR MÓVIL SUPERIOR --- */}
      <nav className="md:hidden flex justify-between items-center px-4 py-3 sticky top-0 z-50 bg-white/70 dark:bg-[#1e1a17]/70 backdrop-blur-xl border-b border-white/20 dark:border-stone-800/50 shadow-sm">
        <a 
          href="#inicio" 
          className="flex items-center gap-2 group cursor-pointer" 
          onClick={(e) => { e.preventDefault(); handleNavigation('inicio'); }}
        >
          <LogoSVG />
          <h1 className="font-serif text-xs font-bold leading-none">La Voz Del Triunfo Pentecostal</h1>
        </a>
        <button onClick={toggleDarkMode} className="p-2 rounded-full bg-stone-100 dark:bg-stone-800 text-stone-600 dark:text-stone-300 transition-transform active:rotate-45">
          {darkMode ? <Sun size={18} /> : <Moon size={18} />}
        </button>
      </nav>

      {/* --- MENÚ POPUP MÓVIL: "NOSOTROS" --- */}
      {showMobileNosotrosMenu && (
        <div ref={mobileMenuRef} className="md:hidden fixed bottom-[70px] w-[calc(100%-2rem)] left-4 z-50 animate-in slide-in-from-bottom-5 duration-300">
          <div className="bg-white/90 dark:bg-stone-900/90 backdrop-blur-md rounded-2xl shadow-2xl border border-stone-200 dark:border-stone-700 overflow-hidden">
            <div className="p-2 grid grid-cols-2 gap-2">
              {[
                { id: 'sobre-nosotros', label: 'Historia', icon: History, isPage: false },
                { id: 'liderazgo', label: 'Liderazgo', icon: Users, isPage: true },
                { id: 'reception', label: 'Recepción', icon: HandHeart, isPage: true },
                { id: 'coro', label: 'Coro', icon: Music, isPage: true },
                { id: 'galeria', label: 'Galería', icon: ImageIcon, isPage: true },
                { id: 'visitanos', label: 'Visítanos', icon: MapPin, isPage: true },
              ].map((subItem) => (
                <button
                  key={subItem.id}
                  onClick={() => {
                    handleNavigation(subItem.id, subItem.isPage);
                    setShowMobileNosotrosMenu(false);
                  }}
                  className="flex flex-col items-center justify-center p-3 rounded-xl hover:bg-[#C7DBEB]/30 dark:hover:bg-stone-800 transition-colors"
                >
                  <subItem.icon size={20} className="text-[#3D6599] mb-1" />
                  <span className="text-xs font-medium text-stone-700 dark:text-stone-300">{subItem.label}</span>
                </button>
              ))}
            </div>
          </div>
          <div className="w-4 h-4 bg-white/90 dark:bg-stone-900/90 rotate-45 mx-auto -mt-2 border-r border-b border-stone-200 dark:border-stone-700"></div>
        </div>
      )}

      {/* --- MENÚ POPUP MÓVIL: "SERVICIOS" --- */}
      {showMobileServiciosMenu && (
        <div ref={mobileMenuRef} className="md:hidden fixed bottom-[70px] w-[calc(100%-2rem)] left-4 z-50 animate-in slide-in-from-bottom-5 duration-300">
          <div className="bg-white/90 dark:bg-stone-900/90 backdrop-blur-md rounded-2xl shadow-2xl border border-stone-200 dark:border-stone-700 overflow-hidden">
            <div className="p-2 grid grid-cols-2 gap-2">
              <button
                onClick={() => { handleNavigation('servicios'); setShowMobileServiciosMenu(false); }}
                className="flex flex-col items-center justify-center p-3 rounded-xl hover:bg-[#C7DBEB]/30 dark:hover:bg-stone-800 transition-colors"
              >
                <Calendar size={20} className="text-[#3D6599] mb-1" />
                <span className="text-xs font-medium text-stone-700 dark:text-stone-300">Horario Cultos</span>
              </button>
              <button
                onClick={() => { handleNavigation('radio', true); setShowMobileServiciosMenu(false); }}
                className="flex flex-col items-center justify-center p-3 rounded-xl hover:bg-[#C7DBEB]/30 dark:hover:bg-stone-800 transition-colors"
              >
                <Radio size={20} className="text-[#3D6599] mb-1" />
                <span className="text-xs font-medium text-stone-700 dark:text-stone-300">Radio Online</span>
              </button>
            </div>
          </div>
          <div className="w-4 h-4 bg-white/90 dark:bg-stone-900/90 rotate-45 mx-auto -mt-2 border-r border-b border-stone-200 dark:border-stone-700"></div>
        </div>
      )}

      {/* --- BARRA DE NAVEGACIÓN MÓVIL INFERIOR (TABBAR) --- */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white dark:bg-[#120f0d] border-t border-stone-200 dark:border-stone-800 z-50 flex justify-around items-center py-3 px-2 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.1)]">
        {[
          { id: 'inicio', icon: Home, label: 'Inicio' },
          { id: 'nosotros', icon: Users, label: 'Nosotros' },
          { id: 'servicios', icon: Heart, label: 'Servicios' },
          { id: 'eventos', icon: Calendar, label: 'Eventos' },
          { id: 'ubicacion', icon: MapPin, label: 'Ubicación' },
        ].map((item) => {
          const isActive = item.id === 'nosotros' 
            ? (showMobileNosotrosMenu || ['leadership', 'reception', 'choir', 'gallery', 'visitanos'].includes(currentView) || (currentView === 'home' && activeSection === 'sobre-nosotros'))
            : item.id === 'servicios'
              ? (showMobileServiciosMenu || currentView === 'radio' || (currentView === 'home' && activeSection === 'servicios'))
              : (currentView === 'home' && activeSection === item.id);
      
          return (
            <button 
              key={item.id}
              ref={item.id === 'nosotros' ? mobileMenuTriggerRef : null}
              onClick={(e) => {
                e.preventDefault();
                if (item.id === 'nosotros') {
                  setShowMobileServiciosMenu(false);
                  setShowMobileNosotrosMenu(!showMobileNosotrosMenu);
                  return;
                }
                if (item.id === 'servicios') {
                  setShowMobileNosotrosMenu(false);
                  setShowMobileServiciosMenu(!showMobileServiciosMenu);
                  return;
                }
                setShowMobileNosotrosMenu(false);
                setShowMobileServiciosMenu(false);
                handleNavigation(item.id);
              }}
              className={`flex flex-col items-center gap-1 w-full transition-all duration-300 ${isActive ? 'text-[#3D6599] dark:text-[#C7DBEB] -translate-y-1' : 'text-stone-400 dark:text-stone-500'}`}
            >
              <item.icon size={22} strokeWidth={isActive ? 2.5 : 2} className={isActive ? 'animate-pulse' : ''} />
              <span className="text-[10px] font-medium">{item.label}</span>
            </button>
          );
        })}
      </div>
    </>
  );
};

export default Header;