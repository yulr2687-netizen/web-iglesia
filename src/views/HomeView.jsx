import React, { useState, useEffect, useRef } from 'react';
import { Home, Calendar, MapPin, ArrowRight, ChevronLeft, ChevronRight, Clock, CalendarX, Car } from 'lucide-react';
import RevealOnScroll from '../components/ui/RevealOnScroll';
import { locations, cultos, allEvents } from '../data/mockData';
import fondo from '../img/fondo.jpg';
import general from '../img/general.jpg'
import fundadores from '../img/fundadores.png';

const HomeView = ({ handleNavigation }) => {
  const scrollRef = useRef(null);
  const [activeEventIndex, setActiveEventIndex] = useState(0);
  const [heroImageIndex, setHeroImageIndex] = useState(0);

  const heroImages = [
    fondo,
    general
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setHeroImageIndex((prev) => (prev + 1) % heroImages.length);
    }, 6000);
    return () => clearInterval(interval);
  }, []);

  // LOGICA DE FILTRADO DE EVENTOS (30 DÍAS)
  const validEvents = allEvents.filter(event => {
    const eventDate = new Date(event.date);
    const today = new Date();
    today.setHours(0,0,0,0);
    const thirtyDaysAgo = new Date(today);
    thirtyDaysAgo.setDate(today.getDate() - 30);
    return eventDate >= thirtyDaysAgo;
  });

  useEffect(() => {
    if (validEvents.length === 0) return;
    const interval = setInterval(() => {
      setActiveEventIndex((prev) => (prev + 1) % validEvents.length); 
    }, 5000);
    return () => clearInterval(interval);
  }, [validEvents.length]);

  const scroll = (direction) => {
    if (scrollRef.current) {
      const { current } = scrollRef;
      const scrollAmount = window.innerWidth < 768 ? window.innerWidth - 32 : 320; 
      current.scrollBy({ left: direction === 'left' ? -scrollAmount : scrollAmount, behavior: 'smooth' });
    }
  };

  const getEventStatus = (dateString) => {
    const [year, month, day] = dateString.split('-').map(Number);
    const eventDay = new Date(year, month - 1, day);
    const today = new Date();
    const currentDay = new Date(
      today.getFullYear(),
      today.getMonth(),
      today.getDate()
    );

    if (eventDay < currentDay) return 'past';
    if (eventDay.getTime() === currentDay.getTime()) return 'active';
    return 'future';
  };

  return (
    <>
      {/*INICIO - PRINCIPAL */}
      <header id="inicio" className="relative px-4 py-32 md:py-48 flex flex-col items-center text-center overflow-hidden">
        <div className="absolute inset-0 z-0">
           {heroImages.map((img, idx) => (
             <div key={idx} className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${idx === heroImageIndex ? 'opacity-100' : 'opacity-0'}`}>
                <img 
                  src={img} 
                  alt="La Voz Del Triunfo Pentecostal"
                  draggable="false"
                  onContextMenu={(e) => e.preventDefault()} 
                  className="w-full h-full object-cover select-none" 
                />
                <div className="absolute inset-0 bg-black/70 mix-blend-multiply"></div>
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent opacity-90"></div>
             </div>
           ))}
        </div>
        <div className="relative z-10 max-w-4xl mx-auto space-y-8">
          <RevealOnScroll direction="down" delay={100}>
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 text-white border border-white/20 text-sm font-medium mx-auto hover:bg-white/20 transition-colors backdrop-blur-sm">
              <Home size={14} /> 
              <span>¡Bienvenidos, nos alegra recibirles!</span>
            </div>
          </RevealOnScroll>
          <RevealOnScroll direction="zoom" delay={300}>
            <h1 className="font-serif text-xs md:text-xl font-bold text-white leading-tight drop-shadow-lg">
              Congregación Evangélica
            </h1>
            <h1 className="font-serif text-4xl md:text-5xl font-bold text-white leading-tight drop-shadow-lg">
              <span className="text-[#C7DBEB] inline-block transition-transform duration-500 cursor-default">
                La Voz Del Triunfo Pentecostal
              </span>
            </h1>
          </RevealOnScroll>
          <br/>
          <RevealOnScroll direction="up" delay={500}>
            <p className="text-lg md:text-xl text-stone-200 max-w-2xl mx-auto leading-relaxed drop-shadow-md">
              Un lugar donde la fe cobra vida y el amor de Dios transforma corazones. Te invitamos a ser parte de nuestra familia, para alabar y adorar a Dios, ya sea en nuestros templos o desde casa por Facebook.
            </p>
          </RevealOnScroll>
          <RevealOnScroll direction="up" delay={700}>
            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
              <a href="#servicios" className="flex items-center justify-center gap-2 bg-[#3D6599] hover:bg-[#2d4b73] text-white px-8 py-3 rounded-lg font-semibold text-lg transition-all shadow-xl shadow-[#3D6599]/30 hover:-translate-y-1 hover:shadow-[#3D6599]/50">
                <Calendar size={20} /> Días de Servicios
              </a>
              <a href="#ubicacion" className="flex items-center justify-center gap-2 bg-white/10 hover:bg-white/20 text-white border border-white/30 px-8 py-3 rounded-lg font-semibold text-lg transition-all hover:translate-y-[-4px] shadow-sm hover:shadow-md backdrop-blur-sm">
                <MapPin size={20} /> 
                Cómo Llegar
              </a>
            </div>
          </RevealOnScroll>
        </div>
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce text-white/50"><ArrowRight className="rotate-90" size={32} /></div>
      </header>

      {/* SECCIÓN NOSOTROS */}
      <section id="sobre-nosotros" className="py-20 px-4 md:px-12 max-w-7xl mx-auto">
        <RevealOnScroll className="text-center mb-16">
          <span className="bg-stone-200 dark:bg-stone-800 text-stone-600 dark:text-stone-300 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wide">
            Conócenos
          </span>
          <h2 className="font-serif text-4xl font-bold text-stone-900 dark:text-white mt-4 mb-4">
            Sobre Nosotros
          </h2>
        </RevealOnScroll>
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <RevealOnScroll direction="left" delay={200}>
            <div className="space-y-8 bg-white dark:bg-[#1e1a17] p-8 rounded-2xl shadow-sm border border-stone-100 dark:border-stone-800 hover:shadow-md transition-shadow duration-300">
              <div>
                <h3 className="text-[#3D6599] font-bold text-xl mb-4">
                  Nuestra Historia
                </h3>
                <div className="pl-4 border-l-2 border-[#C7DBEB] dark:border-[#3D6599]/50 space-y-6">
                  <div className="relative">
                    <div className="absolute -left-[21px] top-1 w-3 h-3 bg-[#3D6599] rounded-full border-2 border-white dark:border-[#1e1a17]"></div>
                    <h4 className="font-bold text-stone-900 dark:text-white">
                      1997 - Los Inicios
                    </h4>
                    <p className="text-stone-600 dark:text-stone-400 text-sm mt-2">
                      La congregación evangélica <strong>La Voz del Triunfo Pentecostal</strong> fue fundada el <strong>27 de mayo de 1997</strong> por <strong>Sergio Rondón</strong> y <strong>Ema Moya</strong>. 
                      Comenzando con la visión de llevar el evangelio a la comunidad, ayudando a las familias y a la 
                      juventud a alejarse de los vicios, malos hábitos, el dolor y la angustia.
                    </p>
                  </div>
                  <div className="relative">
                    <div className="absolute -left-[21px] top-1 w-3 h-3 bg-[#3D6599] rounded-full border-2 border-white dark:border-[#1e1a17]"></div>
                    <h4 className="font-bold text-stone-900 dark:text-white">
                      Presente - Visión Actual
                    </h4>
                    <p className="text-stone-600 dark:text-stone-400 text-sm mt-2">
                      Vamos creciendo y hoy nuestra congregación se encuentra ubicada en <strong>La Cascada N.º 778, Machalí</strong>, 
                      expandiendo nuestros programas de ayuda comunitaria y ministerios. Como también continuando con nuestra misión de 
                      servir a la comunidad con fe.
                    </p>
                  </div>
                </div>
              </div>
              <div className="bg-[#C7DBEB]/20 dark:bg-[#3D6599]/10 p-6 rounded-xl border-l-4 border-[#3D6599] transform hover:translate-x-1 transition-transform">
                <h3 className="text-[#3D6599] dark:text-[#C7DBEB] font-bold mb-2">
                  Nuestra Misión
                </h3>
                <p className="text-[#3D6599] dark:text-[#C7DBEB] text-sm leading-relaxed">
                  Predicar la palabra del evangelio para atraer almas al arrepentimiento y guiar a las personas hacia la paz que solo Dios puede 
                  colocar en sus corazones. Buscamos ayudar a la familia y la juventud a superar vicios, malos hábitos, dolor y angustia.
                </p>
              </div>
            </div>
          </RevealOnScroll>
          <RevealOnScroll direction="right" delay={400}>
            <div className="bg-white dark:bg-[#1e1a17] p-4 rounded-2xl shadow-sm border border-stone-100 dark:border-stone-800 text-center hover:shadow-xl transition-all duration-300">
              <div className="rounded-xl overflow-hidden mb-6 h-80 relative group">
                <img 
                  src={fundadores} 
                  alt="Fundadores"
                  draggable="false"
                  onContextMenu={(e) => e.preventDefault()} 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 select-none" 
                />
                <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors"></div>
              </div>
              <h3 className="font-serif text-2xl font-bold text-stone-900 dark:text-white">Nuestros Fundadores</h3>
              <p className="text-stone-500 dark:text-stone-400 font-medium">Sergio Rondón y Ema Moya</p>
              <p className="text-xs text-stone-400 dark:text-stone-500 mt-1 mb-4">Fundadores en 1997</p>
              <br />
              <p className="text-xs text-stone-400 dark:text-stone-500 mt-1 mb-4">
                “Con fe y determinación, construimos los cimientos de esta congregación basados en el amor de Cristo y el servicio a los demás.”
              </p>
            </div>
          </RevealOnScroll>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-12">
          {[{ num: "28", label: "Años sirviendo" }, { num: "80+", label: "Miembros activos" }, { num: "4", label: "Lugares de Reunión" }, { num: "6", label: "Servicios semanales" }].map((stat, idx) => (
            <RevealOnScroll key={idx} direction="up" delay={idx * 100 + 500}>
              <div className="bg-white dark:bg-[#1e1a17] p-6 rounded-xl text-center shadow-sm border border-stone-100 dark:border-stone-800 hover:border-[#C7DBEB] dark:hover:border-[#3D6599]/50 transition-colors cursor-default">
                <div className="text-3xl font-bold text-[#3D6599] dark:text-[#C7DBEB] mb-1">{stat.num}</div>
                <div className="text-sm text-stone-500 dark:text-stone-400">{stat.label}</div>
              </div>
            </RevealOnScroll>
          ))}
        </div>
      </section>

      {/* SECCIÓN SERVICIOS*/}
      <section id="servicios" className="py-20 px-4 max-w-7xl mx-auto">
        <RevealOnScroll className="text-center mb-16">
          <span className="bg-stone-200 dark:bg-stone-800 text-stone-600 dark:text-stone-300 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wide">
            Nuestros Servicios
          </span>
          <h2 className="font-serif text-4xl font-bold text-stone-900 dark:text-white mt-4 mb-4">Horarios de Culto</h2>
          <p className="text-stone-500 dark:text-stone-400 max-w-2xl mx-auto">
            Te invitamos a participar en nuestras reuniones semanales en cada una de nuestras sedes.
          </p>
        </RevealOnScroll>
        <div className="relative group">
          <button 
            onClick={() => scroll('left')}
            className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white/80 dark:bg-stone-800/80 p-2 rounded-full shadow-lg text-[#3D6599] hover:bg-[#3D6599] hover:text-white transition-all lg:hidden -ml-2 border border-stone-100 dark:border-stone-700"
            aria-label="Anterior"
            >
            <ChevronLeft size={24} />
          </button>
          <div 
            ref={scrollRef}
            className="flex overflow-x-auto snap-x snap-mandatory gap-6 pb-8 lg:grid lg:grid-cols-2 lg:overflow-visible no-scrollbar"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
            > 
            {cultos.map((item, idx) => {
              const locationImage = locations.find(l => l.id === item.locationId)?.img || "https://images.unsplash.com/photo-1438232992991-995b7058bbb3?auto=format&fit=crop&q=80&w=400";
               
              return (
                <RevealOnScroll key={idx} direction="up" delay={idx * 50} className="min-w-full md:min-w-[45%] lg:min-w-0 snap-center">
                  <div className="bg-white dark:bg-[#1e1a17] rounded-2xl border border-stone-100 dark:border-stone-800 hover:border-[#C7DBEB] dark:hover:border-[#3D6599] transition-all duration-300 shadow-sm hover:shadow-lg h-full flex flex-row items-center p-5 gap-4">
                    <div className="flex-1 flex flex-col justify-between h-full">
                      <div>
                        <div className="flex items-center gap-3 mb-3">
                          <div className="bg-[#C7DBEB]/30 dark:bg-[#3D6599]/20 text-[#3D6599] dark:text-[#C7DBEB] w-10 h-10 rounded-lg flex items-center justify-center shrink-0">
                            {item.icon}
                          </div>
                          <h3 className="font-serif text-lg font-bold text-stone-900 dark:text-white leading-tight">{item.location}</h3>
                        </div>
                        <ul className="space-y-2 mb-4">
                          {item.days.map((day, dIdx) => (
                            <li key={dIdx} className="flex items-start gap-2 text-xs text-stone-600 dark:text-stone-300">
                              <Clock size={14} className="text-[#3D6599] mt-0.5 flex-shrink-0" />
                              <span>{day}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                      <button 
                        onClick={() => handleNavigation('visitanos', true, `loc-${item.locationId}`)}
                        className="w-full mt-auto py-2 rounded-lg bg-stone-50 dark:bg-stone-800 text-stone-600 dark:text-stone-300 text-xs font-bold hover:bg-[#3D6599] hover:text-white transition-all flex items-center justify-center gap-2 group"
                        >
                        <MapPin size={14} className="text-current" /> Ver Dirección
                      </button>
                    </div>
                    <div className="shrink-0">
                      <img 
                        src={locationImage} 
                        alt={`Sede ${item.location}`} 
                        draggable="false"
                        onContextMenu={(e) => e.preventDefault()}
                        className="w-24 h-24 md:w-32 md:h-32 rounded-xl object-cover shadow-sm select-none"
                      />
                    </div>
                  </div>
                </RevealOnScroll>
              );
            })}
          </div>
          <button 
            onClick={() => scroll('right')}
            className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white/80 dark:bg-stone-800/80 p-2 rounded-full shadow-lg text-[#3D6599] hover:bg-[#3D6599] hover:text-white transition-all lg:hidden -mr-2 border border-stone-100 dark:border-stone-700"
            aria-label="Siguiente"
            >
            <ChevronRight size={24} />
          </button>
        </div>
      </section>

      {/* SECCIÓN EVENTOS */}
      <section id="eventos" className="py-20 px-4 bg-white/50 dark:bg-[#171412]">
        <div className="max-w-7xl mx-auto">
          <RevealOnScroll className="text-center mb-16">
            <span className="bg-stone-200 dark:bg-stone-800 text-stone-600 dark:text-stone-300 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wide">
              EVENTOS
            </span>
            <h2 className="font-serif text-4xl font-bold text-stone-900 dark:text-white mt-4 mb-4">
              Próximos Eventos
            </h2>
          </RevealOnScroll>
          {validEvents.length > 0 ? (
            <div className="grid lg:grid-cols-2 gap-8">
              <RevealOnScroll direction="left" className="h-full">
                <div className="bg-white dark:bg-[#1e1a17] rounded-2xl overflow-hidden border border-stone-100 dark:border-stone-800 shadow-sm flex flex-col md:flex-row lg:flex-col xl:flex-row h-full group hover:shadow-xl transition-shadow duration-300 relative">
                  <div className="absolute top-4 left-4 z-10">
                    {(() => {
                        const status = getEventStatus(validEvents[activeEventIndex].date);
                        if (status === 'past') return <span className="bg-stone-500 text-white text-xs font-bold px-3 py-1 rounded-full shadow-md">Finalizado</span>;
                        if (status === 'active') return <span className="bg-green-600 text-white text-xs font-bold px-3 py-1 rounded-full shadow-md animate-pulse">En Curso / Hoy</span>;
                        return <span className="bg-orange-500 text-white text-xs font-bold px-3 py-1 rounded-full shadow-md">Pronto</span>;
                    })()}
                  </div>
                  <div className="md:w-1/2 lg:w-full xl:w-1/2 h-64 md:h-auto lg:h-64 xl:h-auto relative overflow-hidden">
                    <img 
                      src={validEvents[activeEventIndex].img} 
                      alt={validEvents[activeEventIndex].title}
                      draggable="false"
                      onContextMenu={(e) => e.preventDefault()} 
                      className={`w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 select-none ${getEventStatus(validEvents[activeEventIndex].date) === 'past' ? 'grayscale' : ''}`} 
                    />
                    <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors"></div>
                  </div>
                  <div className="p-8 flex flex-col justify-center flex-1 relative">
                    <div className="flex items-center gap-4 mb-4">
                      <div className="bg-[#C7DBEB]/30 dark:bg-[#3D6599]/20 text-[#3D6599] dark:text-[#C7DBEB] px-3 py-1 rounded text-center">
                        <span className="block font-bold text-lg leading-none">{validEvents[activeEventIndex].day}</span>
                        <span className="text-xs uppercase">{validEvents[activeEventIndex].month}</span>
                      </div>
                      <div className="text-stone-400 text-sm flex items-center gap-1">
                        <Clock size={14} /> 
                        {validEvents[activeEventIndex].time}
                      </div>
                    </div>
                    <h3 className="font-serif text-2xl font-bold text-stone-900 dark:text-white mb-2">
                      {validEvents[activeEventIndex].title}
                    </h3>
                    <div className="flex items-center gap-2 mb-2 text-sm text-[#3D6599] font-medium">
                      <MapPin size={14} /> 
                      {validEvents[activeEventIndex].location}
                    </div>
                    <p className="text-stone-600 dark:text-stone-300 text-sm mb-4">
                      {validEvents[activeEventIndex].desc}
                    </p>
                    <div className="flex gap-2 mt-auto">
                      {validEvents.map((_, i) => (<button key={i} onClick={() => setActiveEventIndex(i)} 
                        className={`w-2 h-2 rounded-full transition-all ${i === activeEventIndex ? 'bg-[#3D6599] w-6' : 'bg-stone-300 dark:bg-stone-700'}`} aria-label={`Ver evento ${i + 1}`}/>))
                      }
                    </div>
                  </div>
                </div>
              </RevealOnScroll>
              <div className="hidden lg:grid sm:grid-cols-2 lg:grid-cols-2 gap-4 content-start">
                {validEvents.filter((_, i) => i !== activeEventIndex).map((event, idx) => {
                  const status = getEventStatus(event.date);
                  return (
                    <RevealOnScroll key={event.id} direction="right" delay={idx * 150}>
                      <div onClick={() => setActiveEventIndex(validEvents.indexOf(event))} className="bg-white dark:bg-[#1e1a17] p-4 rounded-2xl border border-stone-100 dark:border-stone-800 shadow-sm flex flex-col h-full hover:shadow-md transition-all duration-300 hover:-translate-y-1 cursor-pointer group">
                        <div className="relative h-32 rounded-xl overflow-hidden mb-3">
                          <img 
                            src={event.img} 
                            alt={event.title} 
                            className={`w-full h-full object-cover ${status === 'past' ? 'grayscale' : ''}`} 
                          />
                          <div className="absolute top-2 right-2">
                            {status === 'past' && 
                              <span className="bg-stone-500/90 text-white text-[10px] font-bold px-2 py-0.5 rounded shadow-sm">
                                Finalizado
                              </span>
                            }
                            {status === 'future' && 
                              <span className="bg-orange-500/90 text-white text-[10px] font-bold px-2 py-0.5 rounded shadow-sm">
                                Pronto
                              </span>}
                          </div>
                        </div>
                        <div className="flex items-center gap-2 mb-2">
                          <span className="text-[#3D6599] dark:text-[#C7DBEB] text-xs font-bold">
                            {event.day} {event.month}
                          </span>
                        </div>
                        <h4 className="font-serif font-bold text-stone-900 dark:text-white text-sm mb-1 leading-tight group-hover:text-[#3D6599] transition-colors">
                          {event.title}
                        </h4>
                      </div>
                    </RevealOnScroll>
                  );
                })}
              </div>
            </div>
          ) : (
            <RevealOnScroll direction="up">
              <div className="bg-white dark:bg-[#1e1a17] rounded-2xl border border-stone-100 dark:border-stone-800 shadow-sm p-12 text-center max-w-2xl mx-auto flex flex-col items-center">
                <div className="bg-stone-100 dark:bg-stone-800 p-4 rounded-full mb-4 text-stone-400 dark:text-stone-500">
                  <CalendarX size={40} />
                </div>
                <h3 className="text-xl font-bold text-stone-900 dark:text-white mb-2">
                  Sin Eventos Programados
                </h3>
                <p className="text-stone-500 dark:text-stone-400 text-sm">
                  Actualmente no tenemos eventos especiales en el calendario. ¡Vuelve pronto para ver novedades!
                </p>
              </div>
            </RevealOnScroll>
          )}
        </div>
      </section>

      {/* SECCION UBICACIÓN */}
      <section id="ubicacion" className="py-20 px-4 bg-stone-50 dark:bg-[#120f0d]">
        <div className="max-w-7xl mx-auto">
          <RevealOnScroll className="text-center mb-12">
            <span className="bg-stone-200 dark:bg-stone-800 text-stone-600 dark:text-stone-300 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wide">
              UBICACIÓN
            </span>
            <h2 className="font-serif text-4xl font-bold text-stone-900 dark:text-white mt-4 mb-4">
              Nuestra Ubicación Principal
            </h2>
          </RevealOnScroll>
          <div className="grid lg:grid-cols-3 gap-8">
            <RevealOnScroll direction="left" className="lg:col-span-2">
              <div className="bg-stone-200 dark:bg-stone-800 rounded-2xl overflow-hidden min-h-[400px] h-full relative group shadow-inner">
                  <iframe 
                    title="Ubicación Iglesia" 
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3301.0184785326624!2d-70.64416112261145!3d-34.171445223246494!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x966345000ee71d47%3A0x5bd7555c8e3852f4!2sIglesia%20La%20Voz%20Del%20Triunfo%20Pentecostal!5e0!3m2!1ses!2scl!4v1771626631785!5m2!1ses!2scl" 
                    width="100%" 
                    height="100%" 
                    style={{border:0, minHeight: '400px'}} 
                    allowFullScreen="" loading="lazy" 
                    referrerPolicy="no-referrer-when-downgrade" 
                    className="w-full h-full grayscale-[0.2] hover:grayscale-0 transition-all duration-500">
                  </iframe>
              </div>
            </RevealOnScroll>
            <div className="space-y-6">
              <RevealOnScroll direction="right" delay={200}>
                <div className="bg-white dark:bg-[#1e1a17] p-8 rounded-2xl border border-stone-100 dark:border-stone-800 shadow-sm hover:shadow-md transition-shadow">
                  <div className="flex items-center gap-3 mb-4 text-[#3D6599] dark:text-[#C7DBEB]">
                    <MapPin size={24} />
                    <h3 className="font-serif text-xl font-bold text-stone-900 dark:text-white">
                      Dirección
                    </h3>
                  </div>

                  {/* CONTENEDOR TEXTO + BOTONES */}
                  <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-6">

                    {/* TEXTO */}
                    <p className="text-stone-600 dark:text-stone-300 text-sm leading-relaxed">
                      La Cascada N.° 778<br />
                      Machalí, O'Higgins<br />
                      Chile
                    </p>

                    {/* BOTONES */}
                    <div className="flex flex-col gap-3 lg:items-end shrink-0 w-full lg:w-40">
                      <a
                        href="https://www.google.com/maps/search/?api=1&query=La+Voz+Del+Triunfo+Pentecostal"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-full bg-white border border-stone-200 text-stone-600 px-4 py-2 rounded-lg text-xs font-semibold shadow-sm hover:border-green-600 hover:text-green-700 hover:shadow transition-all flex items-center justify-center gap-2 group/btn"
                        >
                        <MapPin className="w-5 h-5 text-green-600 group-hover/btn:scale-110 transition-transform" />
                        <span>Google Maps</span>
                      </a>
                      <a
                        href="https://waze.com/ul?q=La+Voz+Del+Triunfo+Pentecostal"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-full bg-white border border-stone-200 text-stone-600 px-4 py-2 rounded-lg text-xs font-semibold shadow-sm hover:border-blue-400 hover:text-blue-500 hover:shadow transition-all flex items-center justify-center gap-2 group/btn"
                        >
                        <Car className="w-5 h-5 text-blue-500 group-hover/btn:scale-110 transition-transform" />
                        <span>Waze</span>
                      </a>
                    </div>
                  </div>
                </div>
              </RevealOnScroll>
              <RevealOnScroll direction="right" delay={400}>
                <div className="bg-white dark:bg-[#1e1a17] p-8 rounded-2xl border border-stone-100 dark:border-stone-800 shadow-sm hover:shadow-md transition-shadow">
                  <div className="flex items-center gap-3 mb-6 text-[#3D6599] dark:text-[#C7DBEB]">
                    <Clock size={24} />
                    <h3 className="font-serif text-xl font-bold text-stone-900 dark:text-white">Horarios</h3>
                  </div>
                  <div className="space-y-4">{[{ day: "Martes", act: "Servicio de Dorcas", time: "19:30 PM" }, { day: "Jueves", act: "Servicio Semanal", time: "19:30 PM" }, { day: "Domingo", act: "Reunión General", time: "11:00 AM" }].map((item, i) => (<div key={i} className="flex justify-between items-center border-b border-stone-100 dark:border-stone-800 last:border-0 pb-3 last:pb-0"><p className="font-bold text-stone-800 dark:text-stone-200 text-sm">{item.day}</p><span className="bg-stone-100 dark:bg-stone-800 text-stone-600 dark:text-stone-300 text-[10px] font-bold px-2 py-1 rounded">{item.time}</span></div>))}</div>
                </div>
              </RevealOnScroll>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default HomeView;