import React, { useState, useEffect } from 'react';
import { ArrowUp } from 'lucide-react';

// --- ELEMENTOS DE DISEÑO (LAYOUT) ---
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';

// --- IMPORTS UI GLOBALES ---
import InitialLoader from './components/ui/InitialLoader';
//import NewYearModal from './components/ui/NewYearModal';
import { PrivacyPolicyModal, TermsOfUseModal } from './components/ui/Modals';

// --- CUSTOM HOOKS ---
import useScrollEffect from './hooks/useScrollEffect';

// --- VISTAS ENRUTADAS ---
import HomeView from './views/HomeView';
import LeadershipView from './views/LeadershipView';
import ChoirView from './views/ChoirView';
import VisitUsView from './views/VisitUsView';
import GalleryView from './views/GalleryView';
import ReceptionView from './views/ReceptionView';
import RadioView from './views/RadioView';

// Mapeos de hashes amigables para la URL en español
const urlMap = {
  'liderazgo': 'leadership', 
  'recepcion': 'reception', 
  'coro': 'choir',
  'visitanos': 'visitanos', 
  'galeria': 'gallery', 
  'radio': 'radio', 
  'inicio': 'home'
};
const reverseUrlMap = Object.fromEntries(Object.entries(urlMap).map(([k, v]) => [v, k]));

const App = () => {
  // --- CONFIGURACIÓN DE TEMA OSCURO ---
  const [darkMode, setDarkMode] = useState(() => {
    return localStorage.getItem('theme') === 'dark';
  });
  const alreadyLoaded = localStorage.getItem("iglesia_loaded");
  const [loading, setLoading] = useState(!alreadyLoaded);
  const [showLoader, setShowLoader] = useState(!alreadyLoaded);

  // --- NAVEGACIÓN Y RENDERIZADO DE INTERFAZ ---
  const [activeSection, setActiveSection] = useState('inicio');
  const [currentView, setCurrentView] = useState('home');
  const [scrollTarget, setScrollTarget] = useState(null);
  
  // --- VISIBILIDAD DE MODALES Y BOTONES FLOTANTES ---
  const [isPrivacyModalOpen, setIsPrivacyModalOpen] = useState(false);
  const [isTermsModalOpen, setIsTermsModalOpen] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  // Tracking del scroll de secciones nativas de Home
  useScrollEffect(['inicio', 'sobre-nosotros', 'servicios', 'eventos', 'ubicacion'], setActiveSection, currentView === 'home');

  // Controladores de clases globales del tema
  useEffect(() => {
    const root = document.documentElement;
    if (darkMode) {
      root.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      root.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [darkMode]);

  // Loader inicial inteligente
  useEffect(() => {
    if (alreadyLoaded) return;
    const hideLoading = setTimeout(() => setLoading(false), 3000);
    const removeLoader = setTimeout(() => {
      localStorage.setItem("iglesia_loaded", "true");
      setShowLoader(false);
    }, 3000);
    return () => { clearTimeout(hideLoading); clearTimeout(removeLoader); };
  }, [alreadyLoaded]);

  // Detectores de Scroll para Navbar Fixed y Botón Flotante
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
      setShowScrollTop(window.scrollY > 300);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Persistencia temporal (Retención de estado por 2 min)
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
    if (lastVisit && Date.now() - Number(lastVisit) < 120000) {
      if (lastView && lastView !== 'home') setTimeout(() => setCurrentView(lastView), 0);
      if (lastScroll) setTimeout(() => window.scrollTo({ top: Number(lastScroll), behavior: 'auto' }), 100);
    }
  }, []);

  // Orquestador del enrutamiento por Hashes personalizados
  const handleNavigation = (viewId, isPage = false) => {
    const targetView = urlMap[viewId] || (isPage ? viewId : 'home');
    const spanishName = reverseUrlMap[targetView] || viewId;

    if (targetView === 'home') {
      window.history.pushState({ view: 'home' }, '', '/');
    } else {
      window.history.pushState({ view: targetView }, '', `/${spanishName}`);
    }

    if (currentView !== targetView) setCurrentView(targetView);
    setActiveSection(viewId);

    if (targetView === 'home') {
      if (viewId === 'inicio') window.scrollTo({ top: 0, behavior: 'smooth' });
      else setScrollTarget(viewId);
    } else {
      window.scrollTo(0, 0);
    }
  };

  useEffect(() => {
    const handleRoute = () => {
      const path = window.location.pathname.replace('/', '');

      if (!path) { 
        setCurrentView('home'); 
        return; 
      }

      if (urlMap[path]) {
        setCurrentView(urlMap[path]);
      }
    };

    handleRoute();

    window.addEventListener('popstate', handleRoute);
    
    return () => window.removeEventListener('popstate', handleRoute);
  }, []);

  useEffect(() => {
    if (scrollTarget) {
      const timer = setTimeout(() => {
        document.getElementById(scrollTarget)?.scrollIntoView({ behavior: 'smooth' });
        setScrollTarget(null);
      }, 100);
      return () => clearTimeout(timer);
    }
  }, [currentView, scrollTarget]);

  return (
    <>
      {showLoader && <InitialLoader visible={loading} />}
      
      {!loading && (
        <div className="min-h-screen text-stone-800 dark:text-stone-100 font-sans antialiased selection:bg-[#3D6599]/20 transition-colors duration-500 bg-[#fcfbf9] dark:bg-[#120f0d]">
          
          {/* CABECERA Y NAVEGACIÓN GLOBAL */}
          <Header 
            currentView={currentView}
            activeSection={activeSection}
            handleNavigation={handleNavigation}
            darkMode={darkMode}
            toggleDarkMode={() => setDarkMode(!darkMode)}
            isScrolled={isScrolled}
          />

          {/* VISTAS CENTRALES DINÁMICAS */}
          <main className="w-full">
            {currentView === 'home' && <HomeView handleNavigation={handleNavigation} />}
            {currentView === 'leadership' && <LeadershipView />}
            {currentView === 'reception' && <ReceptionView />}
            {currentView === 'choir' && <ChoirView />}
            {currentView === 'visitanos' && <VisitUsView />}
            {currentView === 'gallery' && <GalleryView />}
            {currentView === 'radio' && <RadioView />}
          </main>
          
          {/* PIE DE PÁGINA GLOBAL */}
          <Footer 
            handleNavigation={handleNavigation}
            setIsTermsModalOpen={setIsTermsModalOpen}
            setIsPrivacyModalOpen={setIsPrivacyModalOpen}
          />
          
          {/* BOTÓN FLOTANTE PARA SUBIR */}
          {showScrollTop && (
            <button
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="fixed z-40 bottom-24 right-4 md:bottom-8 md:right-8 bg-[#3D6599]/80 backdrop-blur-sm text-white p-2 md:p-3 rounded-full shadow-lg hover:bg-[#3D6599] transition-all hover:scale-110 active:scale-95"
            >
              <ArrowUp size={20} className="w-5 h-5 md:w-6 md:h-6" />
            </button>
          )}

          {/* MODALES REUTILIZABLES */}
          <PrivacyPolicyModal isOpen={isPrivacyModalOpen} onClose={() => setIsPrivacyModalOpen(false)} />
          <TermsOfUseModal isOpen={isTermsModalOpen} onClose={() => setIsTermsModalOpen(false)} />
          {/*<NewYearModal />*/}

        </div>
      )}
    </>
  );
};

export default App;