import React from 'react';
import { Music, Home, MapPin, Users, Sun } from 'lucide-react';
import morera from '../img/morera.jpg';
import central from '../img/fondo.jpg';
import iglesia from '../img/logo.png';
import steresa from '../img/steresa.png';
import bautiso from '../img/bautismos.jpg';
import pastor from '../img/pastor.jpg';
import pastora from '../img/pastora.jpg';
import er from '../img/diacono_e.jpg';
import rm from '../img/diacono_r.jpg';
import exe from '../img/diacono_exe.jpg';
import ju from '../img/diacono_j.jpg';
import al from '../img/diacono_a.jpg';
import mo from '../img/diacono_m.jpg';
import rb from '../img/diacono_rb.jpg';
import pr from '../img/pcoro.jpg';
import dr from '../img/coro_d.jpg';
import gr from '../img/coro_g.jpg';
import yb from '../img/coro_y.jpg';
import mm from '../img/coro_m.jpg';
import bt from '../img/coro_b.jpg';
import pb from '../img/coro_p.jpg';
import fb from '../img/coro_f.jpg';
import nb from '../img/coro_n.jpg';
import nbr from '../img/coro_nb.jpg';
import cr from '../img/coro_c.jpg';
import ar from '../img/coro_a.jpg';
import oz from '../img/coro_o.jpg';
import sr from '../img/coro_s.jpg';
import dt from '../img/coro_dt.jpg';
import am from '../img/coro_al.jpg';
import po from '../img/p_orlando.jpg';
//import nf from '../img/nf.jpg';

//FOTOS DE ALBUM
import f1 from "../bau/1.jpg";
import f2 from "../bau/2.jpg";
import f3 from "../bau/3.jpg";
import f4 from "../bau/4.jpg";
import f5 from "../bau/5.jpg";
import f6 from "../bau/6.jpg";
import f7 from "../bau/7.jpg";
import f8 from "../bau/8.jpg";
import f9 from "../bau/9.jpg";
import f10 from "../bau/10.jpg";
import f11 from "../bau/11.jpg";
import f12 from "../bau/12.jpg";
import f13 from "../bau/13.jpg";
import f14 from "../bau/14.jpg";
import f15 from "../bau/15.jpg";
import f16 from "../bau/16.jpg";
import f17 from "../bau/17.jpg";
import f18 from "../bau/18.jpg";
import f19 from "../bau/19.jpg";
import f20 from "../bau/20.jpg";
import f21 from "../bau/21.jpg";
import f22 from "../bau/22.jpg";
import f23 from "../bau/23.jpg";
import f24 from "../bau/24.jpg";
import f25 from "../bau/25.jpg";
import f26 from "../bau/26.jpg";
import f27 from "../bau/27.jpg";
import f28 from "../bau/28.jpg";
import f29 from "../bau/29.jpg";
import f30 from "../bau/30.jpg";
import f31 from "../bau/31.jpg";
import f32 from "../bau/32.jpg";
import f33 from "../bau/33.jpg";
import f34 from "../bau/34.jpg";
import f35 from "../bau/35.jpg";
import f36 from "../bau/36.jpg";
import f37 from "../bau/37.jpg";
import f38 from "../bau/38.jpg";
import f39 from "../bau/39.jpg";
import f40 from "../bau/40.jpg";

//DATOS DE APARTADO PASTORES, DIACONOS y CORO//
export const pastors = [
  { name: "Pastor Isaías Rondón M.", 
    role: "Pastor Actual", 
    img: pastor, 
    desc: "Liderando nuestra congregación desde el año 2010 hasta la actualidad. Es un hombre forjado en las sendas antiguas del Evangelio. Sin recurrir a títulos humanos, sostiene al ministerio en la sana doctrina." 
  },
  { name: "Pastora Oriana Zúñiga L.", 
    role: "Pastora Actual", 
    img: pastora, 
    desc: "Liderando junto al pastor desde 2010. La pastora Oriana ministra a las mujeres de nuestra iglesia. Lidera el ministerio de 'Dorcas', organizando todos los servicios de Dorcas." 
  },
];

//DIACONOS
export const deacons = [
  { name: "Efraín Rondón", 
  role: "Ayudante Pastoral\nDiácono", 
    img: er 
  },
  { name: "Ramón Matus", 
    role: "Diácono", 
    img: rm
  },
  { name: "Juan Vásquez", 
    role: "Diácono", 
    img: ju
  },
  { name: "Ramón Bravo", 
    role: "Diácono", 
    img: rb 
  },
  { name: "Moisés Pardo", 
    role: "Diácono", 
    img: mo 
  },
  { name: "Alberto García", 
    role: "Diácono", 
    img: al
  },
  { name: "Exequiel Madriaga", 
    role: "Diácono", 
    img: exe 
  }
];

export const choirInstruments = [
  { 
    category: "Cuerdas", 
    instrument: "Guitarras", 
    count: 8, 
    desc: "La base armónica de nuestras alabanzas.", 
    icon: <Music size={20} />,
    quote: "Cada acorde es una oración que sube al cielo. Nuestra guitarra es solo el instrumento, Él es la música.",
    responsibles: [
      { name: "Hna. Damaris", 
        img: dr 
      },
      { name: "Hna. Genesis", 
        img: gr
      },
      { name: "Hna. Alondra", 
        img: am 
      },
      { name: "Hno. Marcos", 
        img: mm
      },
      { name: "Hno. Pedro", 
        img: pb 
      },
      { name: "Hno. Benjamín", 
        img: bt
      },
      { name: "Hno. Felipe", 
        img: fb
      },
      { name: "Hno. Yerson", 
        img: yb
      }
    ]
  },
  { 
    category: "Cuerdas Pulsadas", 
    instrument: "Mandolinas | Banjos", 
    count: 8, 
    desc: "El sonido clásico y alegre de nuestra tradición.", 
    icon: <Music size={20} />,
    quote: "Con alegría y júbilo, nuestras cuerdas anuncian las grandezas del Señor en cada reunión.",
    responsibles: [
      { name: "Hna. Damaris", 
        img: dr
      },
      { name: "Hna. Genesis", 
        img: gr
      },
      { name: "Hna. Noelia", 
        img: nb
      },
      { name: "Hna. Natalia", 
        img: nbr
      },
      { name: "Hna. Carolina", 
        img: cr
      },
      { name: "Hna. Any", 
        img: ar
      },
      { name: "Hno. Oscar", 
        img: oz
      },
      { name: "Hno. Saúl", 
        img: sr
      }
    ]
  },
  { 
    category: "Aire y Viento", 
    instrument: "Trompetas", 
    count: 2, 
    desc: "Sonido triunfante que anuncia la presencia de Dios.", 
    icon: <Music size={20} />,
    quote: "Como en los muros de Jericó, tocamos para que las barreras caigan y su Gloria descienda.",
    responsibles: [
      { name: "Hno. Yerson", 
        img: yb 
      },
      { name: "P. Isaías", 
        img: pr 
      }
    ]
  },
  { 
    category: "Teclas", 
    instrument: "Acordeón", 
    count: 2, 
    desc: "Melodías profundas que llenan el ambiente.", 
    icon: <Music size={20} />,
    quote: "El respirar del acordeón nos recuerda el Soplo de Vida que Dios nos regala cada mañana.",
    responsibles: [
      { name: "P. Isaías", 
        img: pr
      },
      { name: "Hno. Yerson", 
        img: yb
      }
    ]
  },
  { 
    category: "Percusión", 
    instrument: "Panderos", 
    count: 3, 
    desc: "Danza, ritmo y gozo en cada celebración.", 
    icon: <Music size={20} />,
    quote: "Nuestras manos aplauden y nuestros panderos resuenan, porque el gozo del Señor es nuestra fortaleza.",
    responsibles: [
      { name: "Hna. Any", 
        img: ar 
      },
      { name: "Hna. Domi", 
        img: dt
      },
      { name: "Hna. Carolina", 
        img: cr
      }
    ]
  },
];

//DATOS DE UBICACIÓN//
export const locations = [
  {
    id: 1,
    name: "Templo Central",
    address: "La Cascada N.° 778, Machalí",
    coords: "-34.171143,-70.644043", 
    phone: "+56 9 1234 5678",
    img: central,
    mapSrc: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1650.5151400306079!2d-70.6440430837332!3d-34.17114348707848!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x966345000ee71d47%3A0x5bd7555c8e3852f4!2sIglesia%20La%20Voz%20Del%20Triunfo%20Pentecostal!5e0!3m2!1ses!2scl!4v1766616070308!5m2!1ses!2scl",
    schedule: [
      { day: "Martes", time: "19:30 PM - Servicio de Dorcas" },
      { day: "Jueves", time: "19:30 PM - Servicio Semanal" },
      { day: "Domingo", time: "11:00 AM - Reunión General" }
    ]
  },
  {
    id: 2,
    name: "La Morera",
    address: "Calle Estadio S/N, La Morera", 
    phone: "+56 9",
    img: morera,
    mapSrc: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1652.0044339659444!2d-70.6765809522412!3d-34.094913275971834!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x9663442a0970a649%3A0x31f6186016383e28!2sH-197%2045%2C%20Las%20Moreras%2C%20Codegua%2C%20O'Higgins!5e0!3m2!1ses!2scl!4v1766615807600!5m2!1ses!2scl",
    schedule: [
      { day: "Miércoles", time: "19:30 PM - Servicio Semanal" },
      { day: "Sábado", time: "19:30 PM - Servicio Semanal" }
    ]
  },
  {
    id: 3,
    name: "Santa Cristina",
    address: "Santa Crsitina, Tuniche", 
    phone: "+56 9 1122 3344",
    img: iglesia,
    mapSrc: "https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d6605.078127990384!2d-70.76219366035608!3d-34.132548277920044!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1ses!2scl!4v1766617796500!5m2!1ses!2scl",
    schedule: [
      { day: "Viernes", time: "19:30 PM - Servicio Semanal" }
    ]
  },
  {
    id: 4,
    name: "Santa Teresa",
    address: "Las Brisas con Esperanza, Machalí", 
    phone: "+56 9 5566 7788",
    img: steresa,
    mapSrc: "https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d1650.3669748431416!2d-70.69042151323052!3d-34.17871922032238!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1ses!2scl!4v1766617450888!5m2!1ses!2scl",
    schedule: [
      { day: "Domingo", time: "18:00 PM - Servicio semanal (Tarde)" }
    ]
  }
];

export const cultos = [
  { location: "Templo Central", 
    days: ["Martes 19:30 hrs", "Jueves 19:30 hrs", "Domingo 11:00 hrs"], 
    locationId: 1, icon: <Home className="w-5 h-5" /> 
  },
  { location: "La Morera", 
    days: ["Miércoles 19:30 hrs", "Sábado 19:30 hrs"], 
    locationId: 2, icon: <MapPin className="w-5 h-5" /> 
  },
  { location: "Santa Cristina", 
    days: ["Viernes 19:30 hrs"], 
    locationId: 3, icon: <Users className="w-5 h-5" /> 
  },
  { location: "Santa Teresa", 
    days: ["Domingo 18:00 hrs"], 
    locationId: 4, icon: <Sun className="w-5 h-5" /> 
  },
];

export const allEvents = [
  { id: 1, 
    date: "2025-12-04", 
    day: "04-07", 
    month: "Diciembre", 
    title: "Aniversario Pastoral",
    location: "Templo central",
    time: "11:00 AM", 
    desc: "Agradecemos a Dios por la vida y entrega de nuestros pastores. Celebremos juntos su Aniversario Pastoral.", 
    img: "https://images.unsplash.com/photo-1478147427282-58a87a120781?auto=format&fit=crop&q=80&w=1000" 
  },
  { id: 2, 
    date: "2026-01-10", 
    day: "10", 
    month: "Enero", 
    title: "Bautismos 2026",
    location: "Laguna Cristal", 
    time: "10:00 AM", 
    desc: "Bautismo basado en la palabra, símbolo de fe en Cristo, dejando atrás lo viejo y comenzando una vida nueva en Él.", 
    img: bautiso 
  },
];

//DATOS DE LA GALERIA//
export const galleryAlbums = [
  { id: 1, 
    title: "Bautismos 2026", 
    year: "2026", 
    desc: "Celebrando el renacer espiritual de nuestros hermanos. Momentos de fe y nuevos comienzos.", 
    cover: f3, 
    photos: [f1, f2, f3, f4, f5, f6, f7, f8, f9, f10, f11, f12, f13, f14, f15, f16, f17, f18, f19, f20, f21, f22, f23, f24, 
             f25, f26, f27, f28, f29, f30, f31, f32, f33, f34, f35, f36, f37, f38, f39, f40] } 
];

// --- DATOS RECEPCIÓN ---
export const receptionTeam = [
  { 
    name: "Hno. Orlando Fuentes", 
    role: "Portero Principal", 
    img: po, 
    desc: "Encargado de recibir a cada persona con una sonrisa y seguridad en la entrada del templo." 
  }
  //{ 
  //  name: "Hna. Patricia Suazo", 
  //  role: "Pasillera / Ujier", 
  //  img: "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&q=80&w=400&h=400", 
  //  desc: "Dedicada a guiar a los asistentes a sus asientos y mantener el orden con amor durante el servicio." 
  //}
];

// --- DATOS RADIO ---
export const radioData = {
  stationName: "Radio",
  slogan: "La Voz Del Triunfo Pentecostal"
};

// --- DATOS PELICULAS IDENTIFIERS DE INTERNET ARCHIVE ---
export const christianMovies = [
  {
    id: 1,
    identifier: "jose-el-rey-de-los-suenos_202601",
    duration: 5520
  }
];
