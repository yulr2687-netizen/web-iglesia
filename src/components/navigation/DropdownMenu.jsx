import React, { useState, useRef } from 'react';
import { ChevronDown } from 'lucide-react';
import useClickOutside from '../../hooks/useClickOutside';

  const DropdownMenu = ({ menuId, label, activeSection, handleNavigation, currentView }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  // DropdownMenu.jsx

const menus = {
  nosotros: [
    { id: 'sobre-nosotros', label: 'Nuestra Historia', type: 'section' },
    { id: 'leadership', label: 'Liderazgo', type: 'page' }, // Cambiado de 'liderazgo' a 'leadership'
    { id: 'reception', label: 'Recepción', type: 'page' },
    { id: 'choir', label: 'Coro', type: 'page' },           // Cambiado de 'coro' a 'choir'
    { id: 'gallery', label: 'Galería', type: 'page' },     // Cambiado de 'galeria' a 'gallery'
    { id: 'visitanos', label: 'Visítanos', type: 'page' },
  ],
  servicios: [
    { id: 'servicios', label: 'Horario Cultos', type: 'section' },
    //{ id: 'radio', label: 'Radio Online', type: 'page' },
  ],
};

  const subMenuItems = menus[menuId] || [];

  useClickOutside(dropdownRef, () => setIsOpen(false));

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const isActive = subMenuItems.some(item => {
  // Verificamos si es una sección de la Home
  const isActiveSection = item.type === 'section' && currentView === 'home' && activeSection === item.id;
  
  // Verificamos si es una página independiente
  const isActivePage = item.type === 'page' && currentView === item.id;

  return isActiveSection || isActivePage;
});



  return (
    <div className="relative" ref={dropdownRef}>
    <button 
      onClick={toggleDropdown}
      className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 relative flex items-center gap-1 
        ${isActive 
          ? 'bg-[#3D6599] text-white shadow-md shadow-[#3D6599]/30' // Estilo Activo
          : 'text-stone-600 dark:text-stone-300 hover:text-[#3D6599] ...' // Estilo Inactivo
        }`} 
      aria-expanded={isOpen}
    >
      {label} 
      <ChevronDown size={16} className={`ml-1 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} />
    </button>
      
      {isOpen && (
        <div className="absolute left-1/2 -translate-x-1/2 mt-2 w-48 bg-white dark:bg-stone-800 rounded-lg shadow-xl ring-1 ring-black ring-opacity-5 z-50 animate-in fade-in slide-in-from-top-2 duration-200">
          <div className="py-1">
            {subMenuItems.map((item) => (
              <a 
  key={item.id} 
  href={`#${item.id}`} 
  onClick={(e) => { 
    e.preventDefault(); 
    // Ahora item.id ya es 'leadership', 'choir', etc.
    handleNavigation(item.id, item.type === 'page'); 
    setIsOpen(false); 
  }}
                className={`block px-4 py-2 text-sm text-stone-700 dark:text-stone-300 hover:bg-[#C7DBEB]/30 dark:hover:bg-stone-700 hover:text-[#3D6599] dark:hover:text-[#C7DBEB] transition-colors ${((currentView === 'home' && activeSection === (item.target || item.id)) || (currentView === 'leadership' && item.id === 'liderazgo') || (currentView === 'choir' && item.id === 'coro') || (currentView === 'gallery' && item.id === 'galeria') || (currentView === 'visitanos' && item.id === 'visitanos')) ? 'bg-[#C7DBEB]/50 dark:bg-stone-700 font-semibold text-[#3D6599]' : ''}`}
              >
                {item.label}
              </a>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default DropdownMenu;