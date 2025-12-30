import React from 'react';
import { MapPin, Phone, Clock, Navigation } from 'lucide-react';
import RevealOnScroll from '../components/ui/RevealOnScroll';
import { locations } from '../data/mockData';

const VisitUsView = () => {
  return (
    <div className="pt-28 pb-20 px-4 min-h-screen">
      <div className="max-w-4xl mx-auto text-center mb-16">
        <RevealOnScroll direction="down">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#C7DBEB]/30 dark:bg-[#3D6599]/20 text-[#3D6599] dark:text-[#C7DBEB] border border-[#C7DBEB] dark:border-[#3D6599]/30 text-sm font-medium mb-6">
            <MapPin size={16} />
            <span>Nuestra Cobertura</span>
          </div>
          <h1 className="font-serif text-5xl md:text-6xl font-bold text-stone-900 dark:text-white mb-6">
            Nuestros Templos
          </h1>
          <p className="text-lg text-stone-600 dark:text-stone-300 max-w-2xl mx-auto leading-relaxed">
            Dios nos ha permitido expandir nuestra visión. Actualmente contamos con 4 lugares de reunión donde puedes congregarte y alabar a Dios junto a nosotros.
          </p>
        </RevealOnScroll>
      </div>

      <div className="max-w-6xl mx-auto space-y-16">
        {locations.map((loc, idx) => (
          <RevealOnScroll key={loc.id} direction={idx % 2 === 0 ? "left" : "right"}>
            <div 
              id={`loc-${loc.id}`} 
              className="bg-white dark:bg-[#1e1a17] rounded-3xl overflow-hidden shadow-lg border border-stone-100 dark:border-stone-800 flex flex-col lg:flex-row h-full scroll-mt-32"
            >
              
              <div className="lg:w-2/5 p-8 md:p-12 flex flex-col justify-center bg-stone-50/50 dark:bg-[#1e1a17] relative z-10">
                <div className="w-full h-40 mb-6 rounded-2xl overflow-hidden shadow-sm">
                  <img 
                    src={loc.img} 
                    alt={loc.name}
                    draggable="false"
                    onContextMenu={(e) => e.preventDefault()} 
                    className="w-full h-full object-cover transition-transform hover:scale-105 duration-700 select-none" 
                  />
                </div>

                <div className="mb-6">
                  <span className="text-xs font-bold text-[#3D6599] dark:text-[#C7DBEB] uppercase tracking-widest mb-2 block">Ubicación #{idx + 1}</span>
                  <h3 className="font-serif text-3xl font-bold text-stone-900 dark:text-white mb-2 leading-tight">{loc.name}</h3>
                  <div className="w-12 h-1 bg-[#3D6599] rounded-full"></div>
                </div>

                <div className="space-y-4 text-sm text-stone-600 dark:text-stone-300 mb-8">
                  <div className="flex items-start gap-3">
                    <div className="bg-[#C7DBEB]/30 p-2 rounded-lg text-[#3D6599]"><MapPin size={18} /></div>
                    <span className="mt-1">{loc.address}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    {/*<div className="bg-[#C7DBEB]/30 p-2 rounded-lg text-[#3D6599]"><Phone size={18} /></div>
                    <span>{loc.phone}</span>*/}
                  </div>
                </div>

                <div className="mt-auto">
                  <h4 className="font-bold text-stone-900 dark:text-white mb-4 flex items-center gap-2 text-sm uppercase tracking-wide">
                    <Clock size={16} className="text-[#3D6599]" /> Horarios de Reunión
                  </h4>
                  <ul className="space-y-3">
                    {loc.schedule.map((sch, i) => (
                      <li key={i} className="flex justify-between items-center text-xs md:text-sm bg-white dark:bg-stone-800/50 p-2 rounded-lg border border-stone-100 dark:border-stone-700">
                        <span className="font-bold text-[#3D6599] dark:text-[#C7DBEB]">{sch.day}</span>
                        <span className="text-stone-500 font-medium">{sch.time}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="lg:w-3/5 h-[350px] lg:h-auto min-h-[400px] relative group">
                <iframe 
                  title={`Mapa de ${loc.name}`}
                  src={loc.mapSrc}
                  width="100%" 
                  height="100%" 
                  style={{border:0}} 
                  allowFullScreen="" 
                  loading="lazy" 
                  className="w-full h-full grayscale-[0.2] group-hover:grayscale-0 transition-all duration-500"
                ></iframe>
                <div className="absolute bottom-6 right-6 flex flex-col gap-2">
                   <a 
                    href={loc.mapSrc.replace("&output=embed", "")} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="bg-white text-stone-900 px-5 py-2.5 rounded-full text-xs font-bold shadow-lg hover:bg-[#3D6599] hover:text-white transition-all flex items-center gap-2 transform hover:-translate-y-1"
                  >
                    <Navigation size={14} /> Ver en Google Maps
                  </a>
                </div>
              </div>

            </div>
          </RevealOnScroll>
        ))}
      </div>
    </div>
  );
};

export default VisitUsView;