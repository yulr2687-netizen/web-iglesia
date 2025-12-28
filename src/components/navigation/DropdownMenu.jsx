import React, { useState, useRef } from 'react';
import { ChevronDown } from 'lucide-react';
import useClickOutside from '../../hooks/useClickOutside';

const DropdownMenu = ({ activeSection, handleNavigation, currentView }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  const subMenuItems = [
    { id: 'sobre-nosotros', label: 'Nuestra Historia', type: 'section' }, 
    { id: 'liderazgo', label: 'Liderazgo', type: 'page' },
    { id: 'coro', label: 'Coro', type: 'page' },
    { id: 'galeria', label: 'Galería', type: 'page' },
    { id: 'visitanos', label: 'Visítanos', type: 'page' },
  ];

  useClickOutside(dropdownRef, () => setIsOpen(false));

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const isActive = subMenuItems.some(item => 
    (currentView === 'home' && activeSection === (item.target || item.id)) || 
    (currentView === 'leadership' && item.id === 'liderazgo') ||
    (currentView === 'choir' && item.id === 'coro') ||
    (currentView === 'gallery' && item.id === 'galeria') ||
    (currentView === 'visitanos' && item.id === 'visitanos')
  );

  return (
    <div className="relative" ref={dropdownRef}>
      <button 
        onClick={toggleDropdown}
        className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 relative flex items-center gap-1 ${isActive ? 'bg-[#3D6599] text-white shadow-md shadow-[#3D6599]/30' : 'text-stone-600 dark:text-stone-300 hover:text-[#3D6599] dark:hover:text-[#C7DBEB] hover:bg-stone-200 dark:hover:bg-stone-700/50'}`} 
        aria-expanded={isOpen}
      >
        Nosotros <ChevronDown size={16} className={`ml-1 transition-transform duration-300 ${isOpen ? 'rotate-180' : 'rotate-0'}`} />
      </button>
      
      {isOpen && (
        <div className="absolute left-1/2 -translate-x-1/2 mt-2 w-48 bg-white dark:bg-stone-800 rounded-lg shadow-xl ring-1 ring-black ring-opacity-5 z-50 animate-in fade-in slide-in-from-top-2 duration-200">
          <div className="py-1">
            {subMenuItems.map((item) => (
              <a 
                key={item.id} 
                href={`#${item.target || item.id}`} 
                onClick={(e) => { 
                  e.preventDefault(); 
                  handleNavigation(item.target || item.id, item.type === 'page'); 
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