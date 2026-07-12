import React, { useRef, useState, useEffect } from 'react';
import { Users, Mail, Facebook } from 'lucide-react';
import RevealOnScroll from '../components/ui/RevealOnScroll';
import { pastors, deacons } from '../data/mockData';

const LeadershipView = () => {
  const deaconScrollRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      if (deaconScrollRef.current) {
        const { scrollLeft, clientWidth } = deaconScrollRef.current;
        if (clientWidth > 0) {
          const index = Math.round(scrollLeft / clientWidth);
          setActiveIndex(index);
        }
      }
    };

    const currentRef = deaconScrollRef.current;
    if (currentRef) {
      currentRef.addEventListener('scroll', handleScroll, { passive: true });
    }

    return () => {
      if (currentRef) {
        currentRef.removeEventListener('scroll', handleScroll);
      }
    };
  }, []);

  const scrollToCard = (index) => {
    if (deaconScrollRef.current) {
      const { clientWidth } = deaconScrollRef.current;
      deaconScrollRef.current.scrollTo({
        left: index * clientWidth,
        behavior: 'smooth',
      });
      setActiveIndex(index);
    }
  };

  return (
    <div className="pt-28 pb-20 px-4 min-h-screen">
      <div className="max-w-4xl mx-auto text-center mb-16">
        <RevealOnScroll direction="down">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#C7DBEB]/30 dark:bg-[#3D6599]/20 text-[#3D6599] dark:text-[#C7DBEB] border border-[#C7DBEB] dark:border-[#3D6599]/30 text-sm font-medium mb-6">
            <Users size={16} />
            <span>Nuestro Equipo</span>
          </div>
          <h1 className="font-serif text-5xl md:text-6xl font-bold text-stone-900 dark:text-white mb-6">
            Liderazgo Pastoral
          </h1>
          <p className="text-lg text-stone-600 dark:text-stone-300 max-w-2xl mx-auto leading-relaxed">
            Conoce a los hombres y mujeres que Dios ha llamado para guiar, servir y amar a nuestra congregación.
          </p>
        </RevealOnScroll>
      </div>
      
      <div className="max-w-7xl mx-auto">
        {/* Pastores */}
        <div className="grid gap-12 mb-24">
          {pastors.map((pastor, idx) => (
            <RevealOnScroll key={pastor.id || `pastor-${idx}`} direction={idx % 2 === 0 ? "left" : "right"}>
              <div className="bg-white dark:bg-[#1e1a17] rounded-3xl p-8 md:p-12 shadow-sm border border-stone-100 dark:border-stone-800 flex flex-col md:flex-row gap-8 items-center hover:shadow-xl transition-all duration-300">
                <div className="w-48 h-48 md:w-64 md:h-64 flex-shrink-0 rounded-2xl overflow-hidden shadow-lg border-4 border-[#C7DBEB] dark:border-[#3D6599]/30">
                  <img 
                    src={pastor.img} 
                    alt={pastor.name}
                    draggable="false"
                    onContextMenu={(e) => e.preventDefault()} 
                    className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-700 select-none" 
                  />
                </div>
                <div className="text-center md:text-left flex-1">
                  <span className="text-[#3D6599] dark:text-[#C7DBEB] font-bold uppercase tracking-wider text-sm mb-2 block">
                    {pastor.role}
                  </span>
                  <h2 className="font-serif text-3xl font-bold text-stone-900 dark:text-white mb-4">
                    {pastor.name}
                  </h2>
                  <p className="text-stone-600 dark:text-stone-300 text-lg leading-relaxed mb-6">
                    {pastor.desc}
                  </p>
                  <div className="flex gap-4 justify-center md:justify-start">
                  </div>
                </div>
              </div>
            </RevealOnScroll>
          ))}
        </div>

        {/* Diáconos */}
        <RevealOnScroll direction="up">
          <div className="text-center mb-12">
            <h2 className="font-serif text-3xl font-bold text-stone-900 dark:text-white mb-4">
              Cuerpo de Diáconos
            </h2>
            <p className="text-stone-500 dark:text-stone-400 max-w-2xl mx-auto">
              Servidores fieles que apoyan la labor pastoral.
            </p>
          </div>
        </RevealOnScroll>
        
        <div className="max-w-7xl mx-auto">
          {/* Lista Horizontal Móvil / Grid en Escritorio */}
          <div
            ref={deaconScrollRef}
            className="flex overflow-x-auto snap-x snap-mandatory gap-6 pb-6 lg:grid lg:grid-cols-4 lg:overflow-visible no-scrollbar px-2 lg:px-0"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            {deacons.map((deacon, idx) => (
              <RevealOnScroll 
                key={deacon.id || `deacon-${idx}`} 
                direction="up" 
                delay={idx * 100} 
                className="min-w-full sm:min-w-[280px] lg:min-w-0 snap-center"
              >
                <div className="bg-white dark:bg-[#1e1a17] rounded-2xl p-6 shadow-sm border border-stone-100 dark:border-stone-800 hover:translate-y-[-5px] transition-all duration-300 h-full flex flex-col items-center text-center gap-5 relative overflow-hidden group/card">
                  <div className="absolute top-0 right-0 w-24 h-24 bg-[#C7DBEB]/20 dark:bg-[#3D6599]/10 rounded-bl-full -mr-4 -mt-4 transition-transform group-hover/card:scale-120 duration-500"></div>
                  <div className="w-36 h-36 sm:w-40 sm:h-40 flex-shrink-0 rounded-full overflow-hidden border-4 border-[#C7DBEB] dark:border-[#3D6599] shadow-md relative z-10">
                    <img 
                      src={deacon.img} 
                      alt={deacon.name}
                      draggable="false"
                      onContextMenu={(e) => e.preventDefault()} 
                      className="w-full h-full object-cover transition-transform duration-500 group-hover/card:scale-110 select-none" 
                    />
                  </div>
                  <div className="flex-1 flex flex-col justify-center items-center relative z-10 w-full">
                    <h4 className="font-serif font-bold text-stone-900 dark:text-white text-lg leading-tight mb-2">
                      {deacon.name}
                    </h4>
                    <p className="whitespace-pre-line text-xs font-semibold tracking-wide uppercase text-[#3D6599] dark:text-[#C7DBEB]">
                      {deacon.role}
                    </p>
                  </div>
                </div>
              </RevealOnScroll>
            ))}
          </div>

          {/* Indicadores de Paginación - Visibles solo en móviles/tablets */}
          <div className="flex justify-center items-center gap-2 mt-4 lg:hidden">
            {deacons.map((_, idx) => (
              <button
                key={`dot-${idx}`}
                onClick={() => scrollToCard(idx)}
                className={`h-2.5 rounded-full transition-all duration-300 ${
                  activeIndex === idx 
                    ? 'w-7 bg-[#3D6599] dark:bg-[#C7DBEB]' 
                    : 'w-2.5 bg-stone-300 dark:bg-stone-700 hover:bg-stone-400'
                }`}
                aria-label={`Ir al diácono ${idx + 1}`}
              />
            ))}
          </div>
        </div>

        <RevealOnScroll delay={300} className="mt-20 text-center">
          <blockquote className="font-serif text-xl md:text-2xl text-stone-500 dark:text-stone-400 italic max-w-3xl mx-auto">
            "Acordaos de vuestros pastores, que os hablaron la palabra de Dios; considerad cuál haya sido el resultado de su conducta, e imitad su fe."
            <footer className="text-sm font-sans font-bold text-[#3D6599] dark:text-[#C7DBEB] mt-4 not-italic">
              — Hebreos 13:7
            </footer>
          </blockquote>
        </RevealOnScroll>
      </div>
    </div>
  );
};

export default LeadershipView;