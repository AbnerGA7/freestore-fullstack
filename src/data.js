
import bannerImg from './assets/images/banner/city.jpg';


// Tecnología
import airpodsImg from './assets/images/tecnologia/airpods.jpg';
import alexaImg from './assets/images/tecnologia/alexa.jpg';
import watchImg from './assets/images/tecnologia/watch.jpg';

// Belleza
import esikaImg from './assets/images/belleza/esika.jpg';
import cyzoneImg from './assets/images/belleza/cyzone.jpg';
import lbelImg from './assets/images/belleza/lbel.jpg';

// Ropa
import topImg from './assets/images/ropa/top.jpg';
import palazzoImg from './assets/images/ropa/palazzo.jpg';

// Calzado
import urbanasImg from './assets/images/calzado/urbanas.jpg';
import runningImg from './assets/images/calzado/running.jpg';

export const navLinks = [
  { name: "Inicio", href: "#home" },
  { name: "Tecnología", href: "#tech" },
  { name: "Belleza", href: "#beauty" },
  { name: "Ropa", href: "#clothes" },
];

export const techProducts = [
  {
    id: 1,
    title: "AirPods Pro 2",
    price: "S/ Consultar",
    image: airpodsImg,
    desc: "Audio Espacial y Cancelación de Ruido."
  },
  {
    id: 2,
    title: "Alexa Echo Dot 5",
    price: "S/ Consultar",
    image: alexaImg,
    desc: "Control de voz inteligente con reloj LED."
  },
  {
    id: 3,
    title: "S9 Ultra Watch",
    price: "S/ Consultar",
    image: watchImg,
    desc: "Pantalla irrompible y conexión total."
  }
];

export const beautyCatalogs = [
  {
    id: 1,
    title: "ÉSIKA",
    image: esikaImg,
    color: "from-red-500 to-red-700"
  },
  {
    id: 2,
    title: "CYZONE",
    image: cyzoneImg,
    color: "from-pink-500 to-fuchsia-600"
  },
  {
    id: 3,
    title: "L'BEL",
    image: lbelImg,
    color: "from-purple-500 to-indigo-600"
  }
];

export const clothesProducts = [
  {
    id: 1,
    title: "Top Leopardo",
    price: "S/ 40.00",
    image: topImg,
    tag: "TENDENCIA"
  },
  {
    id: 2,
    title: "Pantalón Palazzo",
    price: "S/ 50.00",
    image: palazzoImg,
    tag: "NUEVO"
  }
];

export const footwearProducts = [
  {
    id: 1,
    title: "Zapatillas Urbanas",
    price: "S/ 80.00",
    image: urbanasImg,
  },
  {
    id: 2,
    title: "Deportivas Running",
    price: "S/ 95.00",
    image: runningImg,
  }
];