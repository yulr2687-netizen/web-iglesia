import React, { useState, useEffect, useRef } from 'react';
import { 
  Sun, Moon, MapPin, Calendar, Users, Heart, 
  Menu, X, Facebook, Instagram, Youtube, 
  Phone, Mail, Music, HandHeart, ArrowUp, ChevronLeft, History, Home, Image as ImageIcon, Radio, Film
} from 'lucide-react';

// --- IMPORTS ---
import RevealOnScroll from './components/ui/RevealOnScroll';
import { PrivacyPolicyModal, TermsOfUseModal } from './components/ui/Modals';
import LogoSVG from './components/ui/Logo';
import InitialLoader from './components/ui/InitialLoader';
import DropdownMenu from './components/navigation/DropdownMenu';
import useScrollEffect from './hooks/useScrollEffect';
import useClickOutside from './hooks/useClickOutside';
import NewYearModal from './components/ui/NewYearModal';

// --- VIEWS ---
import HomeView from './views/HomeView';
import LeadershipView from './views/LeadershipView';
import ChoirView from './views/ChoirView';
import VisitUsView from './views/VisitUsView';
import GalleryView from './views/GalleryView';
import ReceptionView from './views/ReceptionView';
//import RadioView from './views/RadioView';
//import MoviesView from './views/MoviesView';

// --- APP ---
const App = () => {
  const [darkMode, setDarkMode] = useState(() => {
    const savedTheme = localStorage.getItem('theme');
    return savedTheme === 'dark';
  });
  const [activeSection, setActiveSection] = useState('inicio');
  const [currentView, setCurrentView] = useState('home'); // 'home' | 'leadership' | 'choir' | 'gallery' | 'visitanos'
  const [isPrivacyModalOpen, setIsPrivacyModalOpen] = useState(false);
  const [isTermsModalOpen, setIsTermsModalOpen] = useState(false);
  const [scrollTarget, setScrollTarget] = useState(null);
  const [showMobileNosotrosMenu, setShowMobileNosotrosMenu] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false); // Estado para botón volver arriba
  const [isScrolled, setIsScrolled] = useState(false); // Estado para navbar shrink
  const alreadyLoaded = localStorage.getItem("iglesia_loaded");
  const [loading, setLoading] = useState(!alreadyLoaded);
  const [showLoader, setShowLoader] = useState(!alreadyLoaded);
  const [showMobileServiciosMenu, setShowMobileServiciosMenu] = useState(false);


  useEffect(() => {
    const root = document.documentElement;
    
    if(darkMode) {
      root.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      root.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [darkMode])

  const sectionIds = ['inicio', 'sobre-nosotros', 'servicios', 'eventos', 'ubicacion'];
  useScrollEffect(sectionIds, setActiveSection, currentView === 'home'); 
  const colors = { bgLight: '#fcfbf9', bgDark: '#120f0d' };
  const toggleDarkMode = () => setDarkMode(!darkMode);

  useEffect(() => {
    if (alreadyLoaded) return;

    const hideLoading = setTimeout(() => {
      setLoading(false);
    }, 3000);

    const removeLoader = setTimeout(() => {
      localStorage.setItem("iglesia_loaded", "true");
      setShowLoader(false);
    }, 3000);

    return () => {
      clearTimeout(hideLoading);
      clearTimeout(removeLoader);
    };
  }, [alreadyLoaded]);


  // Manejo de scroll para navbar y botón top
  useEffect(() => {
    const handleScroll = () => {
      // Navbar Shrink logic
      setIsScrolled(window.scrollY > 20);
      
      // Scroll To Top Button logic
      setShowScrollTop(window.scrollY > 300);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Ref para menú móvil "Nosotros" y el botón activador
  const mobileMenuRef = useRef(null);
  const mobileMenuTriggerRef = useRef(null);

  // Cerrar menú móvil si clic fuera
  useClickOutside(mobileMenuRef, () => setShowMobileNosotrosMenu(false), mobileMenuTriggerRef);

  const handleNavigation = (viewId, isPage = false, specificScrollId = null) => {
    const pageMap = {
      'liderazgo': 'leadership',
      'recepcion': 'reception',
      'coro': 'choir',
      'visitanos': 'visitanos',
      'galeria': 'gallery',
      //'radio': 'radio',
      //'peliculas': 'movies',
      'inicio': 'home'
    };

    const targetView = pageMap[viewId] || (isPage ? viewId : 'home');

    if (currentView !== targetView) {
      setCurrentView(targetView);
      if (specificScrollId) {
        setScrollTarget(specificScrollId);
      } else if (!isPage && viewId !== 'inicio') {
         setScrollTarget(viewId);
      } else {
         window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    } else {
        const targetId = specificScrollId || viewId;
        if (targetId === 'inicio') {
          window.scrollTo({ top: 0, behavior: 'smooth' });
        } else {
          const element = document.getElementById(targetId);
          if (element) element.scrollIntoView({ behavior: 'smooth' });
        }
      }
    setActiveSection(viewId);
    setShowMobileNosotrosMenu(false); 
    setShowMobileServiciosMenu(false);
  };

  useEffect(() => {
    if (scrollTarget) {
      setTimeout(() => {
        const element = document.getElementById(scrollTarget);
        if (element) element.scrollIntoView({ behavior: 'smooth' });
        setScrollTarget(null);
      }, 100);
    }
  }, [currentView, scrollTarget]);

  useEffect(() => {
    localStorage.setItem('currentView', currentView);
  }, [currentView]);

  const menuItems = [
    { id: 'nosotros', label: 'Nosotros', isDropdown: true },
    { id: 'servicios', label: 'Servicios', isDropdown: true },
    { id: 'eventos', label: 'Eventos' },
    { id: 'ubicacion', label: 'Ubicacion' },
  ];

  // Guardar vista y scroll en cada cambio
  useEffect(() => {
    const saveState = () => {
      localStorage.setItem('lastView', currentView);
      localStorage.setItem('lastScroll', window.scrollY.toString());
      localStorage.setItem('lastVisit', Date.now().toString());
    };

    window.addEventListener('scroll', saveState);
    window.addEventListener('beforeunload', saveState);

    return () => {
      window.removeEventListener('scroll', saveState);
      window.removeEventListener('beforeunload', saveState);
    };
  }, [currentView]);

  useEffect(() => {
    const lastVisit = localStorage.getItem('lastVisit');
    const lastView = localStorage.getItem('lastView');
    const lastScroll = localStorage.getItem('lastScroll');

    // ⏱️ Tiempo máximo permitido
    const MAX_TIME = 2 * 60 * 1000;

    if (lastVisit && Date.now() - Number(lastVisit) < MAX_TIME) {
      if (lastView && lastView !== 'home') {
        setTimeout(() => {
          setCurrentView(lastView);
        }, 0);
      }

      if (lastScroll) {
        setTimeout(() => {
          window.scrollTo({ top: Number(lastScroll), behavior: 'auto' });
        }, 100);
      }
    } else {
      // Si pasó mucho tiempo → limpiar y volver a Inicio
      localStorage.removeItem('lastView');
      localStorage.removeItem('lastScroll');
      localStorage.removeItem('lastVisit');
    }
  }, []);

  return (
    <>
      {showLoader && <InitialLoader visible={loading} />}
      {!loading && (
        <div
          className="min-h-screen transition-colors duration-700 overflow-x-hidden"
          style={{ backgroundColor: darkMode ? colors.bgDark : colors.bgLight }}
          >

          <div className={`min-h-screen transition-colors duration-700 overflow-x-hidden`} 
            style={{ backgroundColor: darkMode ? colors.bgDark : colors.bgLight }}>
            <div className={`text-stone-800 dark:text-stone-100 font-sans transition-colors duration-500`}>
          
              {/* --- NAVBAR ESCRITORIO FIXED + SHRINK --- */}
              <nav className={`hidden md:flex justify-between items-center px-8 fixed top-0 left-0 w-full z-50 bg-white/90 dark:bg-[#120f0d]/90 backdrop-blur-md border-b dark:border-stone-800 transition-all duration-300 ${isScrolled ? 'py-2 shadow-md bg-white/95' : 'py-4'}`}>
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
                <div className="flex gap-1 p-1 rounded-full bg-stone-100 dark:bg-stone-800 transition-colors duration-500">
                  {menuItems.map((item) => {
                    if (item.isDropdown)
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

                      const isActive = currentView === 'home' && activeSection === item.id;

                      return (
                        <a
                          key={item.id}
                          href={`#${item.id}`}
                          onClick={(e) => {
                            e.preventDefault();
                            handleNavigation(item.id);
                          }}
                          className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${isActive ? 'bg-[#3D6599] text-white' 
                          : 'text-stone-600 hover:bg-stone-200 dark:text-stone-300 dark:hover:bg-stone-700'}`}
                          >
                          {item.label}
                        </a>
                      );
                  })}
                </div>
                <div className="flex items-center gap-4">
                  {currentView !== 'home' && <button onClick={() => handleNavigation('inicio')} className="flex items-center gap-1 text-sm font-medium text-stone-500 hover:text-[#3D6599] transition-colors"><ChevronLeft size={16} /> Volver a Inicio</button>}
                  <button onClick={toggleDarkMode} className="p-2 rounded-full hover:bg-stone-100 dark:hover:bg-stone-800 transition-transform active:scale-90 text-stone-600 dark:text-stone-300">
                    {darkMode ? <Sun size={20} /> : <Moon size={20} />}
                  </button>
                </div>
              </nav>
              
              {/* NAVBAR MÓVIL SUPERIOR (LOGO + DARK MODE) */}
              <nav className="md:hidden flex justify-between items-center px-4 py-3 sticky top-0 z-50 bg-white/90 dark:bg-[#120f0d]/90 backdrop-blur-md border-b dark:border-stone-800">
                <a 
                  href="#inicio" 
                  className="flex items-center gap-2 group cursor-pointer" 
                  onClick={(e) => { e.preventDefault(); handleNavigation('inicio'); }}
                  >
                  <div>
                    <LogoSVG />
                  </div>
                  <h1 className="font-serif text-xs font-bold leading-none">La Voz Del Triunfo Pentecostal</h1>
                </a>
                <button onClick={toggleDarkMode} className="p-2 rounded-full bg-stone-100 dark:bg-stone-800 text-stone-600 dark:text-stone-300 transition-transform active:rotate-45">
                  {darkMode ? <Sun size={18} /> : <Moon size={18} />}
                </button>
              </nav>
              <main>
                {currentView === 'home' && <HomeView handleNavigation={handleNavigation} />}
                {currentView === 'leadership' && <LeadershipView />}
                {currentView === 'reception' && <ReceptionView />}
                {currentView === 'choir' && <ChoirView />}
                {currentView === 'visitanos' && <VisitUsView />}
                {currentView === 'gallery' && <GalleryView />}
                {/*{currentView === 'radio' && <HomeView />}*/}
                {currentView === 'movies' && <MoviesView />}
              </main>
              
              {/* FOOTER */}
              <footer className="bg-stone-50 dark:bg-[#120f0d] pt-16 pb-32 md:pb-8 px-4 border-t border-stone-200 dark:border-stone-800">
                <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12 text-center md:text-left">
                  <div className="flex flex-col items-center md:items-start">
                    <a 
                      href="#inicio" 
                      className="flex items-center gap-2 mb-4 group cursor-pointer" 
                      onClick={(e) => { e.preventDefault(); handleNavigation('inicio'); }}
                      >
                      <div className="p-1.5">
                        <LogoSVG />
                      </div>
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
                        { icon: Youtube, href: "https://www.youtube.com/channel/UC1q9tSZVjIZfeFrNiCw2fSA/null" }
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
                  <div className="flex flex-col items-center md:items-start">
                    <h4 className="font-bold text-stone-900 dark:text-white mb-6">Enlaces Rápidos</h4>
                    <ul className="space-y-3 text-sm text-stone-600 dark:text-stone-400">
                      <li>
                        <a 
                          href="#inicio" 
                          onClick={(e) => { e.preventDefault(); handleNavigation('inicio'); }} 
                          className="hover:text-[#3D6599] transition-colors flex items-center gap-2 hover:translate-x-1 duration-200 justify-center md:justify-start"
                          >
                          Inicio
                        </a>
                      </li>
                      <li>
                        <a 
                          href="#liderazgo" 
                          onClick={(e) => { e.preventDefault(); handleNavigation('liderazgo', true); }} 
                          className="hover:text-[#3D6599] transition-colors flex items-center gap-2 hover:translate-x-1 duration-200 justify-center md:justify-start"
                          >
                          Liderazgo
                        </a>
                      </li>
                      <li>
                        <a 
                          href="#visitanos" 
                          onClick={(e) => { e.preventDefault(); handleNavigation('visitanos', true); }} 
                          className="hover:text-[#3D6599] transition-colors flex items-center gap-2 hover:translate-x-1 duration-200 justify-center md:justify-start"
                          >
                          Visítanos
                        </a>
                      </li>
                      <li>
                        <button 
                          onClick={() => handleNavigation('radio', true)} 
                          className="text-stone-600 dark:text-stone-400 hover:text-[#3D6599] dark:hover:text-[#C7DBEB] transition-colors flex items-center gap-2"
                          >
                          {/*<Radio size={16} /> Radio Online*/}
                        </button>
                      </li>
                      {/*<li>
                        <button 
                          onClick={() => handleNavigation('peliculas', true)} 
                          className="text-stone-600 dark:text-stone-400 hover:text-[#3D6599] dark:hover:text-[#C7DBEB] transition-colors flex items-center gap-2"
                          >
                          <Film size={16} /> Cine Cristiano
                        </button>
                      </li>*/}
                    </ul>
                  </div>
                  <div className="flex flex-col items-center md:items-start">
                    <h4 className="font-bold text-stone-900 dark:text-white mb-6">Contacto</h4>
                    <ul className="space-y-4 text-sm text-stone-600 dark:text-stone-400">
                      <li className="flex items-center gap-3 justify-center md:justify-start">
                        <div className="p-2 bg-[#C7DBEB]/50 dark:bg-stone-800 rounded-full text-[#3D6599]">
                          <MapPin size={16} />
                        </div>
                        La Cascada N.° 778, Machalí
                      </li>
                      <li className="flex items-center gap-3 justify-center md:justify-start">
                      <div className="p-2 bg-[#C7DBEB]/50 dark:bg-stone-800 rounded-full text-[#3D6599]"><Mail size={16} /></div>
                      celavozdeltriunfo@gmail.com
                      </li>
                    </ul>
                  </div>
                  <div className="flex flex-col items-center md:items-start">
                    <h4 className="font-bold text-stone-900 dark:text-white mb-6">Servicios</h4>
                    <ul className="space-y-4 text-sm text-stone-600 dark:text-stone-400 w-full">
                      <li>
                        <p className="font-semibold text-stone-800 dark:text-stone-200 mb-1">Templo Central</p>
                        <div className="space-y-1">
                          <div className="flex justify-center md:justify-start text-center md:text-left">
                            <span className="w-20">Martes</span>
                            <span>· 19:30 PM</span>
                          </div>
                          <div className="flex justify-center md:justify-start text-center md:text-left">
                            <span className="w-20">Jueves</span>
                            <span>· 19:30 PM</span>
                          </div>
                          <div className="flex justify-center md:justify-start text-center md:text-left">
                            <span className="w-20">Domingo</span>
                            <span>· 11:00 AM</span>
                          </div>
                        </div>
                      </li>
                        
                      <li>
                        <p className="font-semibold text-stone-800 dark:text-stone-200 mb-1">La Morera</p>
                        <div className="space-y-1">
                          <div className="flex justify-center md:justify-start text-center md:text-left">
                            <span className="w-20">Miércoles</span>
                            <span>· 19:30 PM</span>
                          </div>
                          <div className="flex justify-center md:justify-start text-center md:text-left">
                            <span className="w-20">Sábado</span>
                            <span>· 19:30 PM</span>
                          </div>
                        </div>
                      </li>
                        
                      <li>
                        <p className="font-semibold text-stone-800 dark:text-stone-200 mb-1">Santa Cristina</p>
                        <div className="flex justify-center md:justify-start text-center md:text-left">
                          <span className="w-20">Viernes</span>
                          <span>· 19:30 PM</span>
                        </div>
                      </li>
                        
                      <li>
                        <p className="font-semibold text-stone-800 dark:text-stone-200 mb-1">Santa Teresa</p>
                        <div className="flex justify-center md:justify-start text-center md:text-left">
                          <span className="w-20">Domingo</span>
                          <span>· 18:00 PM</span>
                        </div>
                      </li>
                    </ul>
                  </div>
                </div>
                <div className="max-w-7xl mx-auto pt-8 border-t border-stone-200 dark:border-stone-800 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-stone-500 dark:text-stone-500">
                  <p>© 2026 C.E. La Voz Del Triunfo Pentecostal. Todos los derechos reservados.</p>
                  <div className="flex gap-6">
                    <button onClick={() => setIsTermsModalOpen(true)} className="hover:text-[#3D6599] transition-colors">
                      Términos
                    </button>
                    <button onClick={() => setIsPrivacyModalOpen(true)} className="hover:text-[#3D6599] transition-colors">
                      Privacidad
                    </button>
                  </div>
                </div>
              </footer>
                    
              {/* MENÚ MÓVIL "NOSOTROS" (POPUP HACIA ARRIBA) */}
              {showMobileNosotrosMenu && (
                <div ref={mobileMenuRef} className="md:hidden fixed bottom-[70px] left-0 right-0 z-50 px-4 animate-in slide-in-from-bottom-5 duration-300">
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
                          onClick={() => handleNavigation(subItem.id, subItem.isPage)}
                          className="flex flex-col items-center justify-center p-3 rounded-xl hover:bg-[#C7DBEB]/30 dark:hover:bg-stone-800 transition-colors"
                          >
                          <subItem.icon size={20} className="text-[#3D6599] mb-1" />
                          <span className="text-xs font-medium text-stone-700 dark:text-stone-300">{subItem.label}</span>
                        </button>
                      ))}
                    </div>
                  </div>
                  {/* Triángulo indicador abajo */}
                  <div className="w-4 h-4 bg-white/90 dark:bg-stone-900/90 rotate-45 mx-auto -mt-2 border-r border-b border-stone-200 dark:border-stone-700"></div>
                </div>
              )}
              {/* MENÚ MÓVIL "SERVICIOS" (POPUP HACIA ARRIBA) */}
              {showMobileServiciosMenu && (
                <div
                  ref={mobileMenuRef}
                  className="md:hidden fixed bottom-[70px] left-0 right-0 z-50 px-4 animate-in slide-in-from-bottom-5 duration-300"
                >
                  <div className="bg-white/90 dark:bg-stone-900/90 backdrop-blur-md rounded-2xl shadow-2xl border border-stone-200 dark:border-stone-700 overflow-hidden">
                    <div className="p-2 grid grid-cols-2 gap-2">
                      
                      {/* Horario Cultos */}
                      <button
                        onClick={() => {
                          handleNavigation('servicios');
                          setShowMobileServiciosMenu(false);
                        }}
                        className="flex flex-col items-center justify-center p-3 rounded-xl hover:bg-[#C7DBEB]/30 dark:hover:bg-stone-800 transition-colors"
                      >
                        <Calendar size={20} className="text-[#3D6599] mb-1" />
                        <span className="text-xs font-medium text-stone-700 dark:text-stone-300">
                          Horario Cultos
                        </span>
                      </button>
                      
                      {/* Radio Online */}
                      <button
                        onClick={() => {
                          handleNavigation('radio', true);
                          setShowMobileServiciosMenu(false);
                        }}
                        className="flex flex-col items-center justify-center p-3 rounded-xl hover:bg-[#C7DBEB]/30 dark:hover:bg-stone-800 transition-colors"
                      >
                        <Radio size={20} className="text-[#3D6599] mb-1" />
                        <span className="text-xs font-medium text-stone-700 dark:text-stone-300">
                          Radio Online
                        </span>
                      </button>
                      
                    </div>
                  </div>
                      
                  {/* Triángulo indicador */}
                  <div className="w-4 h-4 bg-white/90 dark:bg-stone-900/90 rotate-45 mx-auto -mt-2 border-r border-b border-stone-200 dark:border-stone-700"></div>
                </div>
              )}


              {/* BOTÓN VOLVER ARRIBA */}
              {showScrollTop && (
                <button
                  onClick={scrollToTop}
                  className="fixed z-40 bottom-24 right-4 md:bottom-8 md:right-8 bg-[#3D6599]/80 backdrop-blur-sm text-white p-2 md:p-3 rounded-full shadow-lg hover:bg-[#3D6599] transition-all animate-in fade-in zoom-in duration-300 hover:scale-110 active:scale-95"
                  aria-label="Volver arriba"
                  >
                  <ArrowUp size={20} className="w-5 h-5 md:w-6 md:h-6" />
                </button>
              )}

              {/* BARRA DE NAVEGACIÓN MÓVIL */}
              <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white dark:bg-[#120f0d] border-t border-stone-200 dark:border-stone-800 z-50 flex justify-around items-center py-3 px-2 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.1)]">
                {[
                  { id: 'inicio', icon: Home, label: 'Inicio' },
                  { id: 'nosotros', icon: Users, label: 'Nosotros', isTrigger: true },
                  { id: 'servicios', icon: Heart, label: 'Servicios' },
                  { id: 'eventos', icon: Calendar, label: 'Eventos' },
                  { id: 'ubicacion', icon: MapPin, label: 'Ubicación' },
                ].map((item) => {
                  const isActive = item.id === 'nosotros' 
                    ? (showMobileNosotrosMenu || ['leadership', 'reception', 'choir', 'gallery', 'visitanos'].includes(currentView) || (currentView === 'home' && activeSection === 'sobre-nosotros'))
                    : (currentView === 'home' && activeSection === item.id) || (item.id === 'servicios' && currentView === 'radio');
              
                  return (
                    <button 
                      key={item.id}
                      ref={item.id === 'nosotros' ? mobileMenuTriggerRef : null}
                      onClick={(e) => {
                        e.preventDefault();
                      
                        // Cerrar ambos menús por defecto
                        setShowMobileNosotrosMenu(false);
                        setShowMobileServiciosMenu(false);
                      
                        if (item.id === 'nosotros') {
                          setShowMobileNosotrosMenu(true);
                          return;
                        }
                      
                        if (item.id === 'servicios') {
                          setShowMobileServiciosMenu(true);
                          return;
                        }
                      
                        // Navegación normal
                        handleNavigation(item.id);
                      }}
                      className={`flex flex-col items-center gap-1 w-full transition-all duration-300 
                        ${isActive ? 'text-[#3D6599] dark:text-[#C7DBEB] -translate-y-1' : 'text-stone-400 dark:text-stone-500'}`}
                    >

                      <item.icon size={22} strokeWidth={isActive ? 2.5 : 2} className={isActive ? 'animate-pulse' : ''} />
                      <span className="text-[10px] font-medium">{item.label}</span>
                    </button>
                  );
                })}
              </div>
            </div>
            <PrivacyPolicyModal isOpen={isPrivacyModalOpen} onClose={() => setIsPrivacyModalOpen(false)} />
            <TermsOfUseModal isOpen={isTermsModalOpen} onClose={() => setIsTermsModalOpen(false)} />
            <NewYearModal />
          </div>
          <PrivacyPolicyModal
            isOpen={isPrivacyModalOpen}
            onClose={() => setIsPrivacyModalOpen(false)}
          />
          <TermsOfUseModal
            isOpen={isTermsModalOpen}
            onClose={() => setIsTermsModalOpen(false)}
          />
        </div>
      )}
    </>
  );
};

export default App;