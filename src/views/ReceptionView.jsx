import React from 'react';
import { DoorOpen } from 'lucide-react'; // Icono específico
import RevealOnScroll from '../components/ui/RevealOnScroll';
import { receptionTeam } from '../data/mockData'; // Importamos los datos

const ReceptionView = () => {
  return (
    <div className="pt-28 pb-20 px-4 min-h-screen">
      <div className="max-w-4xl mx-auto text-center mb-16">
        <RevealOnScroll direction="down">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#C7DBEB]/30 dark:bg-[#3D6599]/20 text-[#3D6599] dark:text-[#C7DBEB] border border-[#C7DBEB] dark:border-[#3D6599]/30 text-sm font-medium mb-6">
            <DoorOpen size={16} />
            <span>Ministerio de Bienvenida</span>
          </div>
          <h1 className="font-serif text-5xl md:text-6xl font-bold text-stone-900 dark:text-white mb-6">Nuestra Recepción</h1>
          <p className="text-lg text-stone-600 dark:text-stone-300 max-w-2xl mx-auto leading-relaxed">
            Los primeros rostros que ves al llegar, encargados de hacerte sentir en casa con amor y seguridad.
          </p>
        </RevealOnScroll>
      </div>

      <div className="max-w-5xl mx-auto">
  <div
    className={
      receptionTeam.length === 1
        ? "flex justify-center"
        : "grid grid-cols-1 md:grid-cols-2 gap-8"
    }>
           {receptionTeam.map((member, idx) => (
             <RevealOnScroll key={idx} direction={idx % 2 === 0 ? "left" : "right"} delay={idx * 150}>
               <div className={`bg-white dark:bg-[#1e1a17] rounded-3xl p-8 shadow-lg border border-stone-100 dark:border-stone-800 flex flex-col lg:flex-row items-center gap-8 hover:shadow-2xl transition-all duration-300 h-full ${receptionTeam.length === 1 ? "md:col-span-2 mx-auto max-w-3xl" : ""}`}>
                  <div className="w-40 h-40 lg:w-48 lg:h-48 flex-shrink-0 rounded-2xl overflow-hidden shadow-md border-4 border-[#C7DBEB] dark:border-[#3D6599]/30">
                    <img src={member.img} alt={member.name} className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-700" />
                  </div>
                  <div className="text-center lg:text-left flex-1">
                    <span className="text-[#3D6599] dark:text-[#C7DBEB] font-bold uppercase tracking-wider text-sm mb-2 block">{member.role}</span>
                    <h3 className="font-serif text-2xl font-bold text-stone-900 dark:text-white mb-4">{member.name}</h3>
                    <p className="text-stone-600 dark:text-stone-300 text-base leading-relaxed">{member.desc}</p>
                  </div>
               </div>
             </RevealOnScroll>
           ))}
        </div>
      </div>
      <RevealOnScroll delay={300} className="mt-20 text-center">
        <blockquote className="font-serif text-xl md:text-2xl text-stone-500 dark:text-stone-400 italic max-w-3xl mx-auto">
          "Por tanto, recibíos los unos a los otros, como también Cristo nos recibió, para gloria de Dios."
          <footer className="text-sm font-sans font-bold text-[#3D6599] dark:text-[#C7DBEB] mt-4 not-italic">
            — Romanos 15:7
          </footer>
        </blockquote>
      </RevealOnScroll>
    </div>
  );
};

export default ReceptionView;