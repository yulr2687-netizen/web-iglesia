import React, { useState } from 'react';
import { Music, Clock, MapPin, ChevronDown, Users, Quote, CheckCircle2, Mic2 } from 'lucide-react';
import RevealOnScroll from '../components/ui/RevealOnScroll';
import { choirInstruments } from '../data/mockData';
import pcoro from '../img/pcoro.jpg';

const ChoirView = () => {
  const [expandedIndex, setExpandedIndex] = useState(null);
  const toggleInstrument = (index) => {
    if (expandedIndex === index) {
      setExpandedIndex(null);
    } else {
      setExpandedIndex(index);
    }
  };

  return (
    <div className="pt-28 pb-20 px-4 min-h-screen">
      <div className="max-w-4xl mx-auto text-center mb-16 relative">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-12 w-32 h-32 bg-[#3D6599]/10 blur-3xl rounded-full pointer-events-none"></div>
        <RevealOnScroll direction="down">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#C7DBEB]/30 dark:bg-[#3D6599]/20 text-[#3D6599] dark:text-[#C7DBEB] border border-[#C7DBEB] dark:border-[#3D6599]/30 text-sm font-medium mb-6">
            <Music size={16} />
            <span>Ministerio de Alabanza</span>
          </div>
          <h1 className="font-serif text-5xl md:text-6xl font-bold text-stone-900 dark:text-white mb-6">Nuestro Coro</h1>
          <p className="text-lg text-stone-600 dark:text-stone-300 max-w-2xl mx-auto leading-relaxed">"Cantad alegres a Dios, habitantes de toda la tierra." — Salmo 100:1<br/>Un grupo apasionado de adoradores unidos por el propósito de exaltar el nombre de Cristo a través de la música.</p>
        </RevealOnScroll>
      </div>

      <div className="max-w-7xl mx-auto">
        <RevealOnScroll delay={100}>
          <div className="bg-white dark:bg-[#1e1a17] rounded-3xl overflow-hidden shadow-lg border border-stone-100 dark:border-stone-800 mb-20 flex flex-col md:flex-row">
            <div className="md:w-1/2 h-80 md:h-auto relative">
              <img 
                src={pcoro} 
                alt="La Voz Del Triunfo Pentecostal"
                draggable="false"
                onContextMenu={(e) => e.preventDefault()} 
                className="w-full h-full object-cover " />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-8">
                <div>
                  <span className="text-[#C7DBEB] font-bold uppercase tracking-wider text-xs">Guía Coro</span>
                  <h3 className="text-white font-serif text-3xl font-bold">P. Isaías Rondón</h3>
                </div>
              </div>
            </div>
            <div className="p-8 md:p-12 flex flex-col justify-center">
              <h3 className="font-serif text-2xl font-bold text-stone-900 dark:text-white mb-4">Una visión de Adoración</h3>
              <p className="text-stone-600 dark:text-stone-300 leading-relaxed mb-6">Bajo la dirección del Pastor Isaías, nuestro coro ha crecido no solo en técnica vocal, sino en sensibilidad espiritual. Creemos que la adoración no es solo cantar, es una ofrenda de vida.</p>
              <div className="space-y-3">
                {/*<div className="flex items-center gap-3 text-stone-700 dark:text-stone-300 font-medium bg-stone-50 dark:bg-stone-800 p-3 rounded-lg border border-stone-100 dark:border-stone-700"><Clock className="text-[#3D6599] dark:text-[#C7DBEB]" size={20} /><span>Ensayos: Sábados 4:00 PM</span></div>
                <div className="flex items-center gap-3 text-stone-700 dark:text-stone-300 font-medium bg-stone-50 dark:bg-stone-800 p-3 rounded-lg border border-stone-100 dark:border-stone-700"><MapPin className="text-[#3D6599] dark:text-[#C7DBEB]" size={20} /><span>Auditorio Principal</span></div>*/}
              </div>
            </div>
          </div>
        </RevealOnScroll>

        <div className="mb-20">
          <RevealOnScroll className="text-center mb-10">
            <h2 className="font-serif text-3xl font-bold text-stone-900 dark:text-white">Nuestros Instrumentos</h2>
            <p className="text-stone-500 dark:text-stone-400 text-sm mt-2">Haz clic en cada sección para conocer a los responsables.</p>
          </RevealOnScroll>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 items-start">
            {choirInstruments.map((item, idx) => {
              const isExpanded = expandedIndex === idx;
              return (
                <RevealOnScroll key={idx} direction="up" delay={idx * 100}>
                  <div onClick={() => toggleInstrument(idx)} className={`bg-white dark:bg-[#1e1a17] rounded-2xl border transition-all duration-500 overflow-hidden cursor-pointer group ${isExpanded ? 'border-[#3D6599] shadow-xl ring-2 ring-[#3D6599]/20 col-span-1 md:col-span-2 lg:col-span-3' : 'border-stone-100 dark:border-stone-800 shadow-sm hover:border-[#C7DBEB] dark:hover:border-[#3D6599] hover:shadow-md'}`}>
                    <div className="p-6 flex items-start justify-between">
                      <div className="flex items-center gap-4">
                        <div className={`w-12 h-12 rounded-full flex items-center justify-center transition-colors duration-300 ${isExpanded ? 'bg-[#3D6599] text-white' : 'bg-[#C7DBEB]/30 dark:bg-[#3D6599]/20 text-[#3D6599] dark:text-[#C7DBEB]'}`}>{item.icon}</div>
                        <div>
                          <span className="text-xs font-bold text-[#3D6599] dark:text-[#C7DBEB] uppercase tracking-wider block mb-1">{item.category}</span>
                          <h4 className="font-bold text-xl text-stone-900 dark:text-white leading-tight">{item.instrument}</h4>
                        </div>
                      </div>
                      <ChevronDown className={`text-stone-400 transition-transform duration-500 ${isExpanded ? 'rotate-180 text-[#3D6599]' : 'group-hover:translate-y-1'}`} />
                    </div>
                    <div className={`transition-all duration-500 ease-in-out overflow-hidden ${isExpanded ? 'max-h-[800px] opacity-100' : 'max-h-0 opacity-0'}`}>
                      <div className="p-6 pt-0 border-t border-dashed border-stone-200 dark:border-stone-800 mt-2 flex flex-col md:flex-row gap-8">
                        <div className="md:w-1/3 flex-shrink-0 flex flex-col gap-4">
                          <div className="flex items-center gap-2 mb-1"><Users size={14} className="text-[#3D6599]" />
                            <h5 className="text-xs font-bold text-stone-500 dark:text-stone-400 uppercase tracking-wider">Responsables</h5>
                          </div>
                          <div className={`grid gap-4 ${item.responsibles.length > 1 ? 'grid-cols-2' : 'grid-cols-1'}`}>
                            {item.responsibles.map((resp, rIdx) => (<div key={rIdx} className="group/photo">
                            <div className="rounded-xl overflow-hidden aspect-square shadow-md border border-stone-100 dark:border-stone-700 relative w-full max-w-[90px] sm:max-w-[110px] md:max-w-[130px] lg:max-w-[150px] mx-auto">
                              <img 
                                src={resp.img} 
                                alt={resp.name}
                                draggable="false"
                                onContextMenu={(e) => e.preventDefault()} 
                                className="w-full h-full object-cover transition-transform duration-500 group-hover/photo:scale-110" 
                              />
                              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover/photo:opacity-100 transition-opacity duration-300"></div>
                            </div>
                            <p className="text-xs font-bold text-center mt-2 text-stone-700 dark:text-stone-200">{resp.name}</p></div>))}
                          </div>
                        </div>
                        <div className="md:w-2/3 flex flex-col justify-center border-l border-stone-100 dark:border-stone-800 pl-0 md:pl-8">
                          <div className="mb-6 relative"><Quote className="absolute -top-3 -left-3 text-[#C7DBEB] dark:text-[#3D6599]/30 transform -scale-x-100" size={48} />
                           <p className="relative z-10 text-xl italic text-stone-700 dark:text-stone-300 font-serif leading-relaxed">"{item.quote}"</p>
                          </div>
                          <div className="flex flex-wrap gap-3 mt-auto">
                            <span className="text-xs font-bold text-stone-500 dark:text-stone-400 bg-stone-100 dark:bg-stone-800 px-4 py-2 rounded-full flex items-center gap-2"><Users size={14} className="text-[#3D6599]" /> {item.count} Músicos Activos</span>
                            {/*<span className="text-xs font-bold text-stone-500 dark:text-stone-400 bg-stone-100 dark:bg-stone-800 px-4 py-2 rounded-full flex items-center gap-2"><CheckCircle2 size={14} className="text-green-500" /> Ensayo Semanal</span>*/}
                          </div>
                        </div>
                      </div>
                    </div>
                    {!isExpanded && (<div className="px-6 pb-6 pt-2"><p className="text-stone-500 dark:text-stone-400 text-sm line-clamp-2">{item.desc}</p></div>)}
                  </div>
                </RevealOnScroll>
              );
            })}
          </div>
        </div>

        {/*<RevealOnScroll direction="zoom" delay={200}>
          <div className="bg-[#3D6599] rounded-2xl p-12 text-center text-white shadow-xl relative overflow-hidden">
             <div className="absolute top-0 left-0 w-64 h-64 bg-white/10 rounded-full -translate-x-1/2 -translate-y-1/2"></div>
             <div className="absolute bottom-0 right-0 w-64 h-64 bg-black/10 rounded-full translate-x-1/2 translate-y-1/2"></div>
             <div className="relative z-10">
               <Mic2 size={48} className="mx-auto mb-6 opacity-80" />
               <h2 className="font-serif text-3xl md:text-4xl font-bold mb-4">¿Tocas algún instrumento?</h2>
               <p className="text-[#C7DBEB] max-w-xl mx-auto mb-8 text-lg">Si tienes pasión por la música y un corazón para adorar, ¡queremos conocerte!</p>
               <button className="bg-white text-[#3D6599] px-8 py-3 rounded-lg font-bold hover:bg-[#C7DBEB] transition-colors shadow-lg hover:shadow-xl hover:scale-105 transform duration-200">Contactar a la Directora</button>
             </div>
          </div>
        </RevealOnScroll>*/}
      </div>
    </div>
  );
};

export default ChoirView;