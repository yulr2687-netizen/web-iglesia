import { useEffect } from 'react';

const useScrollEffect = (sectionIds, setActiveSection, isHomeView) => {
  useEffect(() => {
    if (!isHomeView) return; 
    const handleScroll = () => {
      const offset = 150; 
      let currentActive = 'inicio';
      sectionIds.forEach(id => {
        const element = document.getElementById(id);
        if (element) {
          const rect = element.getBoundingClientRect();
          if (rect.top <= offset && rect.bottom > offset) {
            currentActive = id;
          }
        }
      });
      setActiveSection(currentActive);
    };
    window.addEventListener('scroll', handleScroll);
    handleScroll(); 
    return () => window.removeEventListener('scroll', handleScroll);
  }, [sectionIds, setActiveSection, isHomeView]);
};

export default useScrollEffect;