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
import nf from '../img/nf.jpg';


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
    img: nf
  },
  { name: "Ramón Bravo", 
    role: "Diácono", 
    img: nf 
  },
  { name: "Moisés Pardo", 
    role: "Diácono", 
    img: nf 
  },
  { name: "Alberto García", 
    role: "Diácono", 
    img: nf 
  },
  { name: "Exequiel Madriaga", 
    role: "Diácono", 
    img: nf 
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
        img: nf 
      },
      { name: "Hna. Genesis", 
        img: nf
      },
      { name: "Hna. Alondra", 
        img: nf 
      },
      { name: "Hno. Marcos", 
        img: nf
      },
      { name: "Hno. Pedro", 
        img: nf 
      },
      { name: "Hno. Benjamín", 
        img: nf
      },
      { name: "Hno. Felipe", 
        img: nf 
      },
      { name: "Hno. Yerson", 
        img: nf
      }
    ]
  },
  { 
    category: "Cuerdas Pulsadas", 
    instrument: "Mandolinas | Banjos", 
    count: 7, 
    desc: "El sonido clásico y alegre de nuestra tradición.", 
    icon: <Music size={20} />,
    quote: "Con alegría y júbilo, nuestras cuerdas anuncian las grandezas del Señor en cada reunión.",
    responsibles: [
      { name: "Hna. Damaris", 
        img: nf
      },
      { name: "Hna. Genesis", 
        img: nf
      },
      { name: "Hna. Noelia", 
        img: nf
      },
      { name: "Hna. Natalia", 
        img: nf
      },
      { name: "Hna. Carolina", 
        img: nf
      },
      { name: "Hna. Any", 
        img: nf
      },
      { name: "Hno. Oscar", 
        img: nf
      },
      { name: "Hno. Saúl", 
        img: nf
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
        img: nf 
      },
      { name: "P. Isaías", 
        img: nf 
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
        img: nf 
      },
      { name: "Hno. Yerson", 
        img: nf 
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
        img: nf 
      },
      { name: "Hna. Domi", 
        img: nf 
      },
      { name: "Hna. Carolina", 
        img: nf
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
    time: "Por confirmar", 
    desc: "Bautismo basado en la palabra, símbolo de fe en Cristo, dejando atrás lo viejo y comenzando una vida nueva en Él.", 
    img: bautiso 
  },
];

//DATOS DE LA GALERIA//
export const galleryAlbums = [
  
];