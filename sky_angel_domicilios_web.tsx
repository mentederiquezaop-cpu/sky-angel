import React, { useState, useEffect } from 'react';
import { 
  ShoppingBag, 
  Search, 
  Plus, 
  Minus, 
  X, 
  ChevronRight, 
  Clock, 
  MapPin, 
  Phone, 
  CheckCircle2, 
  Utensils, 
  ChefHat, 
  Bike, 
  Check, 
  MessageSquare,
  Sparkles,
  Coffee,
  GlassWater,
  Flame,
  Award,
  ArrowRight,
  ShieldCheck,
  CreditCard,
  Wallet,
  DollarSign,
  Send,
  AlertCircle,
  Menu as MenuIcon,
  Wine,
  Heart,
  Share2,
  Printer,
  Navigation,
  Store,
  BellRing
} from 'lucide-react';

// Official Domicilios & Business details
const PHONE_NUMBER = "573218345272";
const PHONE_DISPLAY = "321 834 5272";
const RESTAURANT_ADDRESS = "Cra. 106 #88-45, Chigorodó, Antioquia";
const MAPS_URL = "https://www.google.com/maps/place//data=!4m2!3m1!19sChIJlWUBc3UbUI4Rxuluvqtqd2Q";

// Categories based strictly on Sky Angel's official menu
const CATEGORIES = [
  { id: 'all', name: 'Todo el Menú', icon: '✨' },
  { id: 'promos', name: 'Promos de la Semana 🔥', icon: '🎁' },
  { id: 'cocteles', name: 'Cócteles Sky', icon: '🍹' },
  { id: 'carnes', name: 'Carnes al Carbón', icon: '🥩' },
  { id: 'mariscos', name: 'Camarones & Mariscos', icon: '🦐' },
  { id: 'hamburguesas', name: 'Hamburguesas', icon: '🍔' },
  { id: 'perros_salchipapas', name: 'Perros & Salchipapas', icon: '🌭' },
  { id: 'alitas', name: 'Alitas Crujientes', icon: '🍗' },
  { id: 'almuerzos', name: 'Almuerzos & Especiales', icon: '🍲' },
  { id: 'desayunos', name: 'Desayunos', icon: '🍳' },
  { id: 'cafe', name: 'Bebidas Calientes', icon: '☕' },
  { id: 'jugos', name: 'Jugos & Fríos', icon: '🥤' },
];

// Full Sky Angel Items extracted with exact prices from photos
const MENU_ITEMS = [
  // PROMOS REALES DE LA SEMANA
  { 
    id: 'pr1', 
    name: 'Combo Lunes & Viernes: 6 Alitas + 2 Minis', 
    category: 'promos', 
    price: 22000, 
    description: '6 alitas crujientes con papas + 2 gaseosas mini Postobón (Promo válida Lunes y Viernes).', 
    image: 'https://images.unsplash.com/photo-1567620832903-9fc6debc209f?auto=format&fit=crop&q=80&w=500', 
    promo: true,
    popular: true,
    options: [
      { name: 'Sabor de Gaseosas Mini', choices: ['Postobón Manzana', 'Colombiana', 'Pepsi', 'Sprite'] }
    ]
  },
  { 
    id: 'pr2', 
    name: 'Combo Martes & Jueves: Picada para 2 + 2 Minis', 
    category: 'promos', 
    price: 25000, 
    description: 'Picada completa para 2 personas (res, cerdo, pollo, chicharrón, papas) + 2 gaseosas mini Postobón.', 
    image: 'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&q=80&w=500', 
    promo: true,
    popular: true,
    options: [
      { name: 'Sabor de Gaseosas Mini', choices: ['Postobón Manzana', 'Colombiana', 'Pepsi', 'Sprite'] }
    ]
  },
  { 
    id: 'pr3', 
    name: 'Combo Miércoles: 2 Hamburguesas Especiales + 2 Minis', 
    category: 'promos', 
    price: 25000, 
    description: '2 jugosas Hamburguesas Especiales (carne, tocineta, queso) + 2 gaseosas mini Postobón.', 
    image: 'https://images.unsplash.com/photo-1586190848861-99aa4a171e90?auto=format&fit=crop&q=80&w=500', 
    promo: true,
    popular: true,
    options: [
      { name: 'Sabor de Gaseosas Mini', choices: ['Postobón Manzana', 'Colombiana', 'Pepsi', 'Sprite'] }
    ]
  },
  { 
    id: 'pr4', 
    name: 'Jueves 2x1 en Cócteles (6pm a 10pm)', 
    category: 'promos', 
    price: 20000, 
    description: '¡Llevas 2 cócteles por el precio de 1! Elige tus 2 sabores de la carta.', 
    image: 'https://images.unsplash.com/photo-1551024709-8f23befc6f87?auto=format&fit=crop&q=80&w=500', 
    promo: true,
    popular: true,
    options: [
      { name: 'Primer Cóctel', choices: ['Daiquiri de Fresa', 'Mariposa Blue', 'Laguna Azul', 'Caipiroska', 'Margarita', 'Pink', 'Corazón de Mango'] },
      { name: 'Segundo Cóctel (GRATIS)', choices: ['Daiquiri de Fresa', 'Mariposa Blue', 'Laguna Azul', 'Caipiroska', 'Margarita', 'Pink', 'Corazón de Mango'] }
    ]
  },

  // COCTELES
  { id: 'c1', name: 'Daiquiri', category: 'cocteles', price: 20000, description: 'Ron blanco, zumo de limón y almíbar helado.', image: 'https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?auto=format&fit=crop&q=80&w=500', popular: true, options: [{ name: 'Base de Licor', choices: ['Ron Blanco'] }] },
  { id: 'c2', name: 'Daiquiri de Fresa', category: 'cocteles', price: 20000, description: 'Refrescante daiquiri batido con pulpa de fresa natural.', image: 'https://images.unsplash.com/photo-1556881286-fc6915169721?auto=format&fit=crop&q=80&w=500', popular: true },
  { id: 'c3', name: 'Caipiroska', category: 'cocteles', price: 20000, description: 'Vodka premium, limones macerados y azúcar morena.', image: 'https://images.unsplash.com/photo-1541546006121-5c3755a09184?auto=format&fit=crop&q=80&w=500' },
  { id: 'c4', name: 'Hawaii', category: 'cocteles', price: 23000, description: 'Exótica combinación de Ron Blanco, Vodka y jugos tropicales.', image: 'https://images.unsplash.com/photo-1536935338788-846bb9981813?auto=format&fit=crop&q=80&w=500', popular: true },
  { id: 'c5', name: 'Mariposa Blue', category: 'cocteles', price: 23000, description: 'Vodka, Ron Blanco y Blue Curaçao con toque cítrico centelleante.', image: 'https://images.unsplash.com/photo-1551024709-8f23befc6f87?auto=format&fit=crop&q=80&w=500', popular: true },
  { id: 'c6', name: 'Pink', category: 'cocteles', price: 20000, description: 'Vodka, Ron Dorado y mezcla dulce rosada artesanal.', image: 'https://images.unsplash.com/photo-1560512823-829485b8bf24?auto=format&fit=crop&q=80&w=500' },
  { id: 'c7', name: 'Maitai', category: 'cocteles', price: 20000, description: 'Clásico coctel tropical con Ron Dorado, licor de almendras y jugos.', image: 'https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?auto=format&fit=crop&q=80&w=500' },
  { id: 'c8', name: 'Margarita Blue', category: 'cocteles', price: 20000, description: 'Tequila, triple sec, Blue Curaçao y escarchado de sal.', image: 'https://images.unsplash.com/photo-1556881286-fc6915169721?auto=format&fit=crop&q=80&w=500' },
  { id: 'c9', name: "Planter's Punch", category: 'cocteles', price: 20000, description: 'Ron Dorado especiado con granadina y zumos cítricos.', image: 'https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?auto=format&fit=crop&q=80&w=500' },
  { id: 'c10', name: 'Corazón de Mango', category: 'cocteles', price: 23000, description: 'Vodka con macerado de mango biche y escarchado agridulce.', image: 'https://images.unsplash.com/photo-1536935338788-846bb9981813?auto=format&fit=crop&q=80&w=500', popular: true },
  { id: 'c11', name: 'Laguna Azul', category: 'cocteles', price: 20000, description: 'Vodka, licor de naranjas azules y Sprite helado.', image: 'https://images.unsplash.com/photo-1551024709-8f23befc6f87?auto=format&fit=crop&q=80&w=500' },
  { id: 'c12', name: 'Margarita', category: 'cocteles', price: 20000, description: 'Tequila blanco clásico, triple sec y jugo de limón fresco.', image: 'https://images.unsplash.com/photo-1541546006121-5c3755a09184?auto=format&fit=crop&q=80&w=500' },

  // CARNES
  { 
    id: 'cr1', 
    name: 'Punta de Anca', 
    category: 'carnes', 
    price: 30000, 
    description: 'Jugoso corte a la parrilla servido con acompañamientos tradicionales.', 
    image: 'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&q=80&w=500', 
    popular: true, 
    options: [
      { name: 'Acompañante', choices: ['Papas a la Francesa', 'Patacones Tostados'] },
      { name: 'Término de Carne', choices: ['3/4', 'Bien Asado', 'Término Medio'] }
    ] 
  },
  { 
    id: 'cr2', 
    name: 'Churrasco', 
    category: 'carnes', 
    price: 30000, 
    description: 'Corte magro a las brasas asado a la perfección.', 
    image: 'https://images.unsplash.com/photo-1558030006-450675393462?auto=format&fit=crop&q=80&w=500', 
    popular: true,
    options: [
      { name: 'Acompañante', choices: ['Papas a la Francesa', 'Patacones Tostados'] },
      { name: 'Término de Carne', choices: ['3/4', 'Bien Asado', 'Término Medio'] }
    ]
  },
  { 
    id: 'cr3', 
    name: 'Solomito', 
    category: 'carnes', 
    price: 30000, 
    description: 'Tierno solomito de res suave y jugoso.', 
    image: 'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&q=80&w=500',
    options: [
      { name: 'Acompañante', choices: ['Papas a la Francesa', 'Patacones Tostados'] },
      { name: 'Término de Carne', choices: ['3/4', 'Bien Asado', 'Término Medio'] }
    ]
  },
  { 
    id: 'cr4', 
    name: 'Costillas a la BBQ', 
    category: 'carnes', 
    price: 27000, 
    description: 'Costillitas bañadas en salsa BBQ artesanal ahumada.', 
    image: 'https://images.unsplash.com/photo-1529193591184-b1d58069ecdd?auto=format&fit=crop&q=80&w=500', 
    popular: true,
    options: [
      { name: 'Acompañante', choices: ['Papas a la Francesa', 'Patacones Tostados'] }
    ]
  },
  { 
    id: 'cr5', 
    name: 'Chuzo de Pollo', 
    category: 'carnes', 
    price: 22000, 
    description: 'Brocheta de pollo marinada en especias Sky.', 
    image: 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?auto=format&fit=crop&q=80&w=500',
    options: [
      { name: 'Acompañante', choices: ['Papas a la Francesa', 'Patacones Tostados'] }
    ]
  },
  { 
    id: 'cr6', 
    name: 'Lomo de Cerdo', 
    category: 'carnes', 
    price: 26000, 
    description: 'Jugoso lomo de cerdo sellado a la plancha.', 
    image: 'https://images.unsplash.com/photo-1432139555190-58524dae6a55?auto=format&fit=crop&q=80&w=500',
    options: [
      { name: 'Acompañante', choices: ['Papas a la Francesa', 'Patacones Tostados'] }
    ]
  },
  { 
    id: 'cr7', 
    name: 'Pechuga a la Plancha', 
    category: 'carnes', 
    price: 26000, 
    description: 'Filete de pechuga dorada y sazonada con finas hierbas.', 
    image: 'https://images.unsplash.com/photo-1532550907401-a500c9a57435?auto=format&fit=crop&q=80&w=500',
    options: [
      { name: 'Acompañante', choices: ['Papas a la Francesa', 'Patacones Tostados'] }
    ]
  },
  { 
    id: 'cr8', 
    name: 'Pechuga en Salsa de Champiñón', 
    category: 'carnes', 
    price: 32000, 
    description: 'Pechuga gratinada en salsa cremosa de champiñones frescos.', 
    image: 'https://images.unsplash.com/photo-1604908176997-125f25cc6f3d?auto=format&fit=crop&q=80&w=500', 
    popular: true,
    options: [
      { name: 'Acompañante', choices: ['Papas a la Francesa', 'Patacones Tostados'] }
    ]
  },
  { 
    id: 'cr9', 
    name: 'Pechuga a la Mexicana', 
    category: 'carnes', 
    price: 32000, 
    description: 'Pechuga con toque picante, pico de gallo y queso fundido.', 
    image: 'https://images.unsplash.com/photo-1532550907401-a500c9a57435?auto=format&fit=crop&q=80&w=500',
    options: [
      { name: 'Acompañante', choices: ['Papas a la Francesa', 'Patacones Tostados'] }
    ]
  },
  { 
    id: 'cr10', 
    name: 'Cañón de Cerdo', 
    category: 'carnes', 
    price: 32000, 
    description: 'Corte especial de cerdo jugoso con salsa de la casa.', 
    image: 'https://images.unsplash.com/photo-1432139555190-58524dae6a55?auto=format&fit=crop&q=80&w=500',
    options: [
      { name: 'Acompañante', choices: ['Papas a la Francesa', 'Patacones Tostados'] }
    ]
  },
  { 
    id: 'cr11', 
    name: 'Pechuga Gratinada', 
    category: 'carnes', 
    price: 30000, 
    description: 'Pechuga cubierta de generosa capa de queso mozzarella fundido.', 
    image: 'https://images.unsplash.com/photo-1604908176997-125f25cc6f3d?auto=format&fit=crop&q=80&w=500',
    options: [
      { name: 'Acompañante', choices: ['Papas a la Francesa', 'Patacones Tostados'] }
    ]
  },
  { 
    id: 'cr12', 
    name: 'Solomito Gratinado', 
    category: 'carnes', 
    price: 34000, 
    description: 'Solomito de res tierno bajo capa dorada de queso gratinado.', 
    image: 'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&q=80&w=500', 
    popular: true,
    options: [
      { name: 'Acompañante', choices: ['Papas a la Francesa', 'Patacones Tostados'] },
      { name: 'Término de Carne', choices: ['3/4', 'Bien Asado', 'Término Medio'] }
    ]
  },

  // CAMARONES & MARISCOS
  { id: 'm1', name: 'Mar y Tierra', category: 'mariscos', price: 40000, description: 'Combinación perfecta de filete de res con jugosos camarones.', image: 'https://images.unsplash.com/photo-1551248429-40975aa4de74?auto=format&fit=crop&q=80&w=500', popular: true, options: [{ name: 'Acompañante', choices: ['Papas a la Francesa', 'Patacones Tostados'] }] },
  { id: 'm2', name: 'Camarones al Ajillo', category: 'mariscos', price: 35000, description: 'Camarones seleccionados salteados en mantequilla de ajo y cilantro.', image: 'https://images.unsplash.com/photo-1565680018434-b513d5e5fd47?auto=format&fit=crop&q=80&w=500', popular: true, options: [{ name: 'Acompañante', choices: ['Patacones Tostados', 'Papas a la Francesa'] }] },
  { id: 'm3', name: 'Ceviche de Camarón', category: 'mariscos', price: 25000, description: 'Fresco ceviche en salsa rosada con cebolla morada y galletas.', image: 'https://images.unsplash.com/photo-1535400255456-984241443b29?auto=format&fit=crop&q=80&w=500' },
  { id: 'm4', name: 'Ceviche de Chicharrón', category: 'mariscos', price: 23000, description: 'Crujiente chicharrón picado bañado en limonada agridulce y cebolla.', image: 'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&q=80&w=500' },
  { id: 'm5', name: 'Arroz de Camarón', category: 'mariscos', price: 35000, description: 'Arroz especiado salteado con camarones y vegetales frescos.', image: 'https://images.unsplash.com/photo-1512058564366-18510be2db19?auto=format&fit=crop&q=80&w=500' },
  { id: 'm6', name: 'Tilapia en Salsa de Camarón', category: 'mariscos', price: 42000, description: 'Filete de tilapia frito o a la plancha bañado en cremoso ajillo de camarón.', image: 'https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?auto=format&fit=crop&q=80&w=500', popular: true, options: [{ name: 'Acompañante', choices: ['Patacones Tostados', 'Papas a la Francesa'] }] },

  // HAMBURGUESAS
  { id: 'h1', name: 'Hamburguesa Sencilla', category: 'hamburguesas', price: 14000, description: 'Carne de la casa, queso, lechuga, tomate y salsas.', image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&q=80&w=500' },
  { id: 'h2', name: 'Hamburguesa Especial', category: 'hamburguesas', price: 17000, description: 'Carne jugosa, tocineta crujiente, queso fundido y vegetales.', image: 'https://images.unsplash.com/photo-1586190848861-99aa4a171e90?auto=format&fit=crop&q=80&w=500', popular: true },
  { id: 'h3', name: 'Hamburguesa Doble Carne', category: 'hamburguesas', price: 20000, description: 'Doble porción de carne 100% res con doble queso.', image: 'https://images.unsplash.com/photo-1583847268964-b28dc8f51f92?auto=format&fit=crop&q=80&w=500' },
  { id: 'h4', name: 'Hamburguesa Mixta', category: 'hamburguesas', price: 20000, description: 'Combinación de carne de res y filete de pollo desmechado.', image: 'https://images.unsplash.com/photo-1625813506062-0aeb1d7a094b?auto=format&fit=crop&q=80&w=500' },
  { id: 'h5', name: 'Hamburguesa Sky Junior', category: 'hamburguesas', price: 26000, description: 'Hamburguesa artesanal mediana con papas o patacón.', image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&q=80&w=500', options: [{ name: 'Acompañante', choices: ['Papas a la Francesa', 'Patacones Tostados'] }] },
  { id: 'h6', name: 'Hamburguesa Sky Full', category: 'hamburguesas', price: 35000, description: 'La reina de la casa: doble carne, pollo, tocineta, huevo, queso, ripio y porción a elección.', image: 'https://images.unsplash.com/photo-1586190848861-99aa4a171e90?auto=format&fit=crop&q=80&w=500', popular: true, options: [{ name: 'Acompañante', choices: ['Papas a la Francesa', 'Patacones Tostados'] }] },
  { id: 'h7', name: 'Patacón Burguer', category: 'hamburguesas', price: 20000, description: 'Tapas de patacón tostado sustituyendo el pan con carne y queso.', image: 'https://images.unsplash.com/photo-1576107232684-1279f3908594?auto=format&fit=crop&q=80&w=500' },

  // PERROS & SALCHIPAPAS
  { id: 'p1', name: 'Perro Sencillo', category: 'perros_salchipapas', price: 10000, description: 'Salchicha manguera, ripio de papa, queso y salsas al gusto.', image: 'https://images.unsplash.com/photo-1619740455993-9e612b1af08a?auto=format&fit=crop&q=80&w=500' },
  { id: 'p2', name: 'Perro Súper', category: 'perros_salchipapas', price: 12000, description: 'Salchicha americana, tocineta, ripio de papa y doble queso.', image: 'https://images.unsplash.com/photo-1619740455993-9e612b1af08a?auto=format&fit=crop&q=80&w=500', popular: true },
  { id: 'p3', name: 'Perro Hawaiano', category: 'perros_salchipapas', price: 14000, description: 'Perro caliente especial con dulce de piña casero y tocineta.', image: 'https://images.unsplash.com/photo-1619740455993-9e612b1af08a?auto=format&fit=crop&q=80&w=500' },
  { id: 'sp1', name: 'Salchipapa Sencilla', category: 'perros_salchipapas', price: 12000, description: 'Papas doradas o patacones con salchicha manguera picada.', image: 'https://images.unsplash.com/photo-1576107232684-1279f3908594?auto=format&fit=crop&q=80&w=500', options: [{ name: 'Base', choices: ['Papas a la Francesa', 'Patacón Tostado'] }] },
  { id: 'sp2', name: 'Salchipapa Suiza', category: 'perros_salchipapas', price: 15000, description: 'Papas o patacón con salchicha suiza gratinada en queso mozzarella.', image: 'https://images.unsplash.com/photo-1576107232684-1279f3908594?auto=format&fit=crop&q=80&w=500', options: [{ name: 'Base', choices: ['Papas a la Francesa', 'Patacón Tostado'] }] },
  { id: 'sp3', name: 'Salchipapa Ranchera', category: 'perros_salchipapas', price: 15000, description: 'Papas o patacón con salchicha ranchera, maíz tierno y queso.', image: 'https://images.unsplash.com/photo-1576107232684-1279f3908594?auto=format&fit=crop&q=80&w=500', popular: true, options: [{ name: 'Base', choices: ['Papas a la Francesa', 'Patacón Tostado'] }] },
  { id: 'sp4', name: 'Salchipapa Sky', category: 'perros_salchipapas', price: 32000, description: 'Bandeja gigante con carnes mixtas, tocineta, maíz y gratinado sobre base a elección.', image: 'https://images.unsplash.com/photo-1576107232684-1279f3908594?auto=format&fit=crop&q=80&w=500', popular: true, options: [{ name: 'Base', choices: ['Papas a la Francesa', 'Patacón Tostado', 'Mitad Papas y Mitad Patacón'] }] },
  { id: 'sp5', name: 'Picadas Para 2 Personas', category: 'perros_salchipapas', price: 25000, description: 'Carne de res, cerdo, pollo, chicharrón, patacones y papas.', image: 'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&q=80&w=500' },
  { id: 'sp6', name: 'Picada Familiar', category: 'perros_salchipapas', price: 48000, description: 'Generosa tabla de carnes variadas, chorizos, patacones, arepas y papas.', image: 'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&q=80&w=500', popular: true },

  // ALITAS
  { id: 'a1', name: 'Combo 1 (6 Alitas)', category: 'alitas', price: 20000, description: '6 piezas de alitas crujientes con acompañamiento y salsa a elección.', image: 'https://images.unsplash.com/photo-1567620832903-9fc6debc209f?auto=format&fit=crop&q=80&w=500', options: [{ name: 'Acompañante', choices: ['Papas a la Francesa', 'Patacones Tostados'] }] },
  { id: 'a2', name: 'Combo 2 (8 Alitas)', category: 'alitas', price: 25000, description: '8 alitas apanadas o picantes acompañadas de papas o patacón.', image: 'https://images.unsplash.com/photo-1567620832903-9fc6debc209f?auto=format&fit=crop&q=80&w=500', popular: true, options: [{ name: 'Acompañante', choices: ['Papas a la Francesa', 'Patacones Tostados'] }] },
  { id: 'a3', name: 'Combo 3 (12 Alitas)', category: 'alitas', price: 30000, description: '12 jugosas alitas ideales para compartir con 2 salsas de la casa y tu acompañamiento preferido.', image: 'https://images.unsplash.com/photo-1567620832903-9fc6debc209f?auto=format&fit=crop&q=80&w=500', popular: true, options: [{ name: 'Acompañante', choices: ['Papas a la Francesa', 'Patacones Tostados'] }] },

  // ALMUERZOS & ESPECIALES
  { 
    id: 'alm1', 
    name: 'Bandeja de Res', 
    category: 'almuerzos', 
    price: 20000, 
    description: 'Filete de res a la plancha servido con sopa del día, arroz, ensalada y patacón.', 
    image: 'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&q=80&w=500', 
    popular: true,
    options: [
      { name: 'Sopa del día', choices: ['Frijoles de la casa', 'Sancocho', 'Sopa del día'] },
      { name: 'Tipo de Arroz', choices: ['Arroz Blanco', 'Arroz de Coco'] }
    ]
  },
  { 
    id: 'alm2', 
    name: 'Bandeja de Cerdo', 
    category: 'almuerzos', 
    price: 18000, 
    description: 'Lomo de cerdo dorado con acompañamientos a elección.', 
    image: 'https://images.unsplash.com/photo-1432139555190-58524dae6a55?auto=format&fit=crop&q=80&w=500',
    options: [
      { name: 'Sopa del día', choices: ['Frijoles de la casa', 'Sancocho', 'Sopa del día'] },
      { name: 'Tipo de Arroz', choices: ['Arroz Blanco', 'Arroz de Coco'] }
    ]
  },
  { id: 'alm3', name: 'Bandeja de Carne Molida', category: 'almuerzos', price: 18000, description: 'Carne molida sazonada estilo casero con frijoles o sancocho.', image: 'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&q=80&w=500' },
  { id: 'alm4', name: 'Bandeja de Chorizo', category: 'almuerzos', price: 18000, description: 'Chorizo antioqueño doradito con patacón y ensalada.', image: 'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&q=80&w=500' },
  { id: 'alm5', name: 'Bandeja de Pechuga', category: 'almuerzos', price: 18000, description: 'Pechuga a la plancha con la sopa y el arroz de tu preferencia.', image: 'https://images.unsplash.com/photo-1532550907401-a500c9a57435?auto=format&fit=crop&q=80&w=500' },
  { id: 'alm6', name: 'Bandeja de Chicharrón', category: 'almuerzos', price: 18000, description: 'Crocante chicharrón con guarniciones tradicionales.', image: 'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&q=80&w=500', popular: true },
  { id: 'alm7', name: 'Bandeja de Carne Desmechada', category: 'almuerzos', price: 20000, description: 'Jugosa carne desmechada en su guiso casero.', image: 'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&q=80&w=500' },
  { id: 'alm8', name: 'Bandeja con Pollo Desmechado', category: 'almuerzos', price: 18000, description: 'Pechuga desmechada guisada con vegetales.', image: 'https://images.unsplash.com/photo-1532550907401-a500c9a57435?auto=format&fit=crop&q=80&w=500' },
  { id: 'esp1', name: 'Tilapia Frita / Plancha', category: 'almuerzos', price: 30000, description: 'Tilapia entera o filete servido con patacones y arroz de coco.', image: 'https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?auto=format&fit=crop&q=80&w=500', popular: true },
  { id: 'esp2', name: 'Costicazuela', category: 'almuerzos', price: 30000, description: 'Cazuela sustanciosa de costilla con vegetales y aguacate.', image: 'https://images.unsplash.com/photo-1547592166-23ac45744acd?auto=format&fit=crop&q=80&w=500' },
  { id: 'esp3', name: 'Bandeja Paisa Sky', category: 'almuerzos', price: 28000, description: 'La típica bandeja paisa completa: frijol, arroz, carne, chicharrón, huevo, chorizo, tajada y aguacate.', image: 'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&q=80&w=500', popular: true },
  { id: 'esp4', name: 'Róbalo en Posta', category: 'almuerzos', price: 35000, description: 'Posta de róbalo fresco preparado al estilo marinero.', image: 'https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?auto=format&fit=crop&q=80&w=500' },
  { id: 'esp5', name: 'Sobre Barriga Guisada en Coco', category: 'almuerzos', price: 20000, description: 'Blanda sobrebarriga cocinada a fuego lento en suave reducción de leche de coco.', image: 'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&q=80&w=500', popular: true },

  // DESAYUNOS
  { id: 'des1', name: 'Calentado con Res', category: 'desayunos', price: 18000, description: 'Calentado tradicional acompañado con Chocolate caliente.', image: 'https://images.unsplash.com/photo-1533089860892-a7c6f0a88666?auto=format&fit=crop&q=80&w=500', popular: true },
  { id: 'des2', name: 'Calentado con Cerdo', category: 'desayunos', price: 16000, description: 'Mezcla de arroz y frijoles con lomo de cerdo y Chocolate.', image: 'https://images.unsplash.com/photo-1533089860892-a7c6f0a88666?auto=format&fit=crop&q=80&w=500' },
  { id: 'des3', name: 'Calentado con Pechuga', category: 'desayunos', price: 16000, description: 'Calentado criollo con pechuga asada y Chocolate tintero.', image: 'https://images.unsplash.com/photo-1533089860892-a7c6f0a88666?auto=format&fit=crop&q=80&w=500' },
  { id: 'des4', name: 'Calentado con Chicharrón', category: 'desayunos', price: 16000, description: 'Calentado con chicharrón crujiente y Chocolate caliente.', image: 'https://images.unsplash.com/photo-1533089860892-a7c6f0a88666?auto=format&fit=crop&q=80&w=500', popular: true },
  { id: 'des5', name: 'Calentado con Chorizo', category: 'desayunos', price: 16000, description: 'Calentado paisa con chorizo doradito y Chocolate.', image: 'https://images.unsplash.com/photo-1533089860892-a7c6f0a88666?auto=format&fit=crop&q=80&w=500' },
  { id: 'des6', name: 'Calentado con Huevos Aliñados', category: 'desayunos', price: 14000, description: 'Calentado suave con huevos pericos aliñados y Chocolate.', image: 'https://images.unsplash.com/photo-1525351484163-7529414344d8?auto=format&fit=crop&q=80&w=500' },
  { id: 'des7', name: 'Sándwich con Chocolate', category: 'desayunos', price: 16000, description: 'Sándwich caliente de jamón y queso con taza de chocolate.', image: 'https://images.unsplash.com/photo-1528735602780-2552fd46c7af?auto=format&fit=crop&q=80&w=500' },
  { id: 'des8', name: 'Arepa con Huevo Ranchero Aliñado', category: 'desayunos', price: 14000, description: 'Arepa de maíz con queso y huevos revueltos con salchicha ranchera.', image: 'https://images.unsplash.com/photo-1525351484163-7529414344d8?auto=format&fit=crop&q=80&w=500', popular: true },
  { id: 'des9', name: 'Patacón con Chicharrón y Queso', category: 'desayunos', price: 16000, description: 'Patacón gigante crujiente cargado con chicharrón picado y queso costeño.', image: 'https://images.unsplash.com/photo-1576107232684-1279f3908594?auto=format&fit=crop&q=80&w=500', popular: true },

  // CAFÉ & BEBIDAS CALIENTES
  { id: 'cf1', name: 'Espresso', category: 'cafe', price: 5000, description: 'Tiro concentrado de café arábigo seleccionado.', image: 'https://images.unsplash.com/photo-1510591509098-f4fdc6d0ff04?auto=format&fit=crop&q=80&w=500' },
  { id: 'cf2', name: 'Espresso Doble', category: 'cafe', price: 10000, description: 'Doble extracción intensa de café recién molido.', image: 'https://images.unsplash.com/photo-1510591509098-f4fdc6d0ff04?auto=format&fit=crop&q=80&w=500' },
  { id: 'cf3', name: 'Americano', category: 'cafe', price: 5000, description: 'Espresso suave diluido en agua caliente.', image: 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&q=80&w=500' },
  { id: 'cf4', name: 'Café Clásico', category: 'cafe', price: 3000, description: 'Café tinto tradicional colombiano.', image: 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&q=80&w=500' },
  { id: 'cf5', name: 'Capuchino', category: 'cafe', price: 7000, description: 'Espresso con leche al vapor y capa espesa de espuma con cacao.', image: 'https://images.unsplash.com/photo-1572442388796-11668ba67e53?auto=format&fit=crop&q=80&w=500', popular: true },
  { id: 'cf6', name: 'Café Largo', category: 'cafe', price: 6000, description: 'Café con extra de extracción de notas aromáticas.', image: 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&q=80&w=500' },
  { id: 'cf7', name: 'Cortado', category: 'cafe', price: 6000, description: 'Espresso manchado con una pizca de leche tibia.', image: 'https://images.unsplash.com/photo-1534778101976-62847782c213?auto=format&fit=crop&q=80&w=500' },
  { id: 'cf8', name: 'Café con Leche', category: 'cafe', price: 6000, description: 'El clásico café perico con leche cremosita.', image: 'https://images.unsplash.com/photo-1534778101976-62847782c213?auto=format&fit=crop&q=80&w=500' },
  { id: 'cf9', name: 'Café Crema', category: 'cafe', price: 7000, description: 'Café enriquecido con suave crema de leche batida.', image: 'https://images.unsplash.com/photo-1572442388796-11668ba67e53?auto=format&fit=crop&q=80&w=500' },
  { id: 'cf10', name: 'Ristretto', category: 'cafe', price: 6000, description: 'Extracción súper corta y concentrada del cuerpo del café.', image: 'https://images.unsplash.com/photo-1510591509098-f4fdc6d0ff04?auto=format&fit=crop&q=80&w=500' },
  { id: 'cf11', name: 'Flat White', category: 'cafe', price: 6000, description: 'Doble shot de espresso con microespuma de leche sedosa.', image: 'https://images.unsplash.com/photo-1577968897966-3d4325b36b61?auto=format&fit=crop&q=80&w=500', popular: true },
  { id: 'cf12', name: 'Leche Manchada', category: 'cafe', price: 6000, description: 'Leche caliente espumosa con una leve gota de café.', image: 'https://images.unsplash.com/photo-1534778101976-62847782c213?auto=format&fit=crop&q=80&w=500' },

  // JUGOS & BEBIDAS FRÍAS
  { id: 'j1', name: 'Jugo Natural en Agua', category: 'jugos', price: 8000, description: 'Fruta 100% natural batida al instante en agua (Maracuyá, Mango, Lulo, Fresa).', image: 'https://images.unsplash.com/photo-1613478223719-2ab802602423?auto=format&fit=crop&q=80&w=500' },
  { id: 'j2', name: 'Jugo Natural en Leche', category: 'jugos', price: 10000, description: 'Batido cremoso de fruta en leche entera o deslactosada.', image: 'https://images.unsplash.com/photo-1553530666-ba11a7da3888?auto=format&fit=crop&q=80&w=500' },
  { id: 'j3', name: 'Limonada Cerezada', category: 'jugos', price: 10000, description: 'Limonada refrescante batida con cereza concentrada.', image: 'https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?auto=format&fit=crop&q=80&w=500', popular: true },
  { id: 'j4', name: 'Limonada de Coco', category: 'jugos', price: 10000, description: 'La favorita: crema de coco espesa con zumo de limón verde.', image: 'https://images.unsplash.com/photo-1546171753-97d7676e4602?auto=format&fit=crop&q=80&w=500', popular: true },
  { id: 'j5', name: 'Cerveza Michelada', category: 'jugos', price: 10000, description: 'Zumo de limón natural con sal bordeando el vaso helado.', image: 'https://images.unsplash.com/photo-1535958636474-b021ee887b13?auto=format&fit=crop&q=80&w=500' },
  { id: 'j6', name: 'Granizado', category: 'jugos', price: 14000, description: 'Hielo frapé con sirope frutal intenso (Café, Maracuyá, Fresa).', image: 'https://images.unsplash.com/photo-1572490122747-3968b75cc699?auto=format&fit=crop&q=80&w=500', popular: true }
];

export default function App() {
  // Ensure Tailwind CDN in standalone environments safely
  useEffect(() => {
    if (!document.getElementById('tailwind-cdn')) {
      const script = document.createElement('script');
      script.id = 'tailwind-cdn';
      script.src = 'https://cdn.tailwindcss.com';
      script.async = true;
      document.head.appendChild(script);
    }
  }, []);

  // View modes: 'client' or 'kitchen'
  const [viewRole, setViewRole] = useState('client');

  // Core App States
  const [activeCategory, setActiveCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [cart, setCart] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [productNote, setProductNote] = useState('');
  const [selectedOptions, setSelectedOptions] = useState({});
  const [activeOrder, setActiveOrder] = useState(null);
  const [toastMessage, setToastMessage] = useState(null);
  
  // Kitchen Incoming Orders State
  const [kitchenOrders, setKitchenOrders] = useState([
    {
      id: 'SKY-9482',
      customer: { name: 'Mariana Gómez', phone: '3104558291', address: 'Calle 45 # 12-34', neighborhood: 'El Dorado', orderMode: 'delivery' },
      items: [
        { name: 'Hamburguesa Sky Full', quantity: 1, price: 35000, note: 'Sin cebolla' },
        { name: 'Mariposa Blue', quantity: 2, price: 23000 }
      ],
      total: 85000,
      paymentMethod: 'nequi',
      status: 'preparing',
      time: '14:20'
    }
  ]);

  // Checkout Form State (Order mode: delivery vs pickup/table)
  const [checkoutStep, setCheckoutStep] = useState('cart'); // 'cart', 'details', 'tracking'
  const [orderMode, setOrderMode] = useState('delivery'); // 'delivery', 'pickup', 'table'
  const [customerInfo, setCustomerInfo] = useState({
    name: '',
    phone: '',
    address: '',
    neighborhood: '',
    tableNumber: '',
    notes: '',
    paymentMethod: 'efectivo',
    cashAmount: ''
  });

  const deliveryFee = orderMode === 'delivery' ? 4000 : 0;

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 3200);
  };

  // Filter items based on Category & Search Query
  const filteredItems = MENU_ITEMS.filter(item => {
    const matchesCategory = activeCategory === 'all' || item.category === activeCategory;
    const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          item.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const openProductModal = (product) => {
    setSelectedProduct(product);
    setProductNote('');
    const defaults = {};
    if (product.options) {
      product.options.forEach(opt => {
        defaults[opt.name] = opt.choices[0];
      });
    }
    setSelectedOptions(defaults);
  };

  const handleAddToCart = (product, customizations = {}, note = '') => {
    const cartItemId = `${product.id}-${JSON.stringify(customizations)}-${note}`;
    const existingIndex = cart.findIndex(i => i.cartItemId === cartItemId);

    if (existingIndex > -1) {
      const updatedCart = [...cart];
      updatedCart[existingIndex].quantity += 1;
      setCart(updatedCart);
    } else {
      setCart([...cart, {
        ...product,
        cartItemId,
        customizations,
        note,
        quantity: 1
      }]);
    }

    showToast(`✨ ${product.name} añadido a la orden`);
    setSelectedProduct(null);
  };

  const updateQuantity = (cartItemId, delta) => {
    const updated = cart.map(item => {
      if (item.cartItemId === cartItemId) {
        const newQty = item.quantity + delta;
        return newQty > 0 ? { ...item, quantity: newQty } : null;
      }
      return item;
    }).filter(Boolean);
    setCart(updated);
  };

  const cartSubtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);
  const orderTotal = cartSubtotal > 0 ? cartSubtotal + deliveryFee : 0;

  const handlePlaceOrder = (e) => {
    e.preventDefault();
    if (!customerInfo.name || !customerInfo.phone) {
      alert('Por favor completa tu Nombre y Teléfono.');
      return;
    }
    if (orderMode === 'delivery' && !customerInfo.address) {
      alert('Por favor ingresa la dirección de entrega.');
      return;
    }

    const orderId = `SKY-${Math.floor(1000 + Math.random() * 9000)}`;
    const newOrder = {
      id: orderId,
      items: [...cart],
      subtotal: cartSubtotal,
      deliveryFee,
      total: orderTotal,
      orderMode,
      customer: { ...customerInfo },
      date: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      status: 'received'
    };

    setActiveOrder(newOrder);
    setKitchenOrders(prev => [newOrder, ...prev]);
    setCart([]);
    setCheckoutStep('tracking');
    showToast('🚀 ¡Pedido registrado exitosamente!');
  };

  // Status auto-advancer for interactive preview
  useEffect(() => {
    if (!activeOrder || activeOrder.status === 'delivered') return;

    const timer1 = setTimeout(() => {
      setActiveOrder(prev => prev ? { ...prev, status: 'preparing' } : null);
    }, 8000);

    const timer2 = setTimeout(() => {
      setActiveOrder(prev => prev ? { ...prev, status: 'on_way' } : null);
    }, 18000);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
    };
  }, [activeOrder?.id]);

  // WhatsApp Formatted Order String Generator
  const getWhatsAppLink = () => {
    if (!activeOrder) return '#';
    
    let modeText = activeOrder.orderMode === 'delivery' ? '🛵 DOMICILIO' : activeOrder.orderMode === 'table' ? `🍽️ MESA N° ${activeOrder.customer.tableNumber || '1'}` : '🏬 PARA RECOGER';

    let text = `✨ *NUEVA ORDEN - SKY ANGEL* ✨\n`;
    text += `📌 *MODO:* ${modeText}\n\n`;
    text += `🆔 *Orden N°:* ${activeOrder.id}\n`;
    text += `👤 *Cliente:* ${activeOrder.customer.name}\n`;
    text += `📞 *Teléfono:* ${activeOrder.customer.phone}\n`;

    if (activeOrder.orderMode === 'delivery') {
      text += `📍 *Dirección:* ${activeOrder.customer.address} (${activeOrder.customer.neighborhood || 'Barrio no especificado'})\n`;
    }

    if (activeOrder.customer.notes) {
      text += `📝 *Notas:* ${activeOrder.customer.notes}\n`;
    }

    text += `\n🛒 *DETALLE DEL PEDIDO:*\n`;
    
    activeOrder.items.forEach(item => {
      text += `• ${item.quantity}x ${item.name} ($${(item.price * item.quantity).toLocaleString('es-CO')})\n`;
      if (item.customizations && Object.keys(item.customizations).length > 0) {
        Object.entries(item.customizations).forEach(([k, v]) => {
          text += `   ↳ ${k}: ${v}\n`;
        });
      }
      if (item.note) text += `   ↳ Nota: ${item.note}\n`;
    });

    text += `\n💵 *Subtotal:* $${activeOrder.subtotal.toLocaleString('es-CO')}\n`;
    if (activeOrder.orderMode === 'delivery') {
      text += `🛵 *Domicilio:* $${activeOrder.deliveryFee.toLocaleString('es-CO')}\n`;
    }
    text += `💰 *TOTAL A PAGAR:* *$${activeOrder.total.toLocaleString('es-CO')}*\n\n`;
    text += `💳 *Método de Pago:* ${activeOrder.customer.paymentMethod.toUpperCase()}`;
    
    if (activeOrder.customer.paymentMethod === 'efectivo' && activeOrder.customer.cashAmount) {
      text += ` (Paga con: $${Number(activeOrder.customer.cashAmount).toLocaleString('es-CO')})`;
    }

    return `https://wa.me/${PHONE_NUMBER}?text=${encodeURIComponent(text)}`;
  };

  const printTicket = (order) => {
    window.print();
  };

  return (
    <div className="min-h-screen bg-[#0d0d15] text-slate-100 font-sans selection:bg-pink-500 selection:text-white pb-24">
      
      {/* GLOW BACKGROUND EFFECT */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
        <div className="absolute -top-40 -left-40 w-96 h-96 bg-cyan-500/15 rounded-full blur-[120px]" />
        <div className="absolute top-1/3 -right-40 w-96 h-96 bg-pink-500/15 rounded-full blur-[120px]" />
        <div className="absolute bottom-10 left-1/3 w-96 h-96 bg-purple-600/15 rounded-full blur-[120px]" />
      </div>

      {/* TOAST NOTIFICATION */}
      {toastMessage && (
        <div className="fixed top-6 right-6 z-50 bg-gradient-to-r from-pink-500 via-purple-600 to-cyan-500 text-white px-5 py-3 rounded-2xl shadow-2xl shadow-pink-500/30 flex items-center space-x-3 animate-bounce border border-white/20">
          <Sparkles className="w-5 h-5" />
          <span className="font-semibold text-sm">{toastMessage}</span>
        </div>
      )}

      {/* HEADER WITH NEON LOGO & OPEN STATUS */}
      <header className="sticky top-0 z-40 bg-[#12121e]/90 backdrop-blur-md border-b border-pink-500/20 shadow-lg shadow-black/50">
        <div className="max-w-6xl mx-auto px-4 h-20 flex items-center justify-between">
          
          {/* Logo & Wings */}
          <div className="flex items-center space-x-3 cursor-pointer" onClick={() => setActiveCategory('all')}>
            <div className="relative flex items-center justify-center">
              <div className="w-12 h-12 rounded-full bg-gradient-to-tr from-pink-500 via-purple-500 to-cyan-400 p-0.5 shadow-[0_0_20px_rgba(255,0,127,0.5)] flex items-center justify-center animate-pulse">
                <div className="w-full h-full bg-[#0d0d15] rounded-full flex items-center justify-center">
                  <Wine className="w-6 h-6 text-cyan-300" />
                </div>
              </div>
            </div>
            
            <div>
              <div className="flex items-center space-x-2">
                <h1 className="text-2xl font-black tracking-wider bg-gradient-to-r from-cyan-400 via-pink-400 to-purple-400 bg-clip-text text-transparent uppercase drop-shadow-[0_0_10px_rgba(0,229,255,0.4)]">
                  SKY ÁNGEL
                </h1>
                <span className="hidden sm:inline-flex items-center gap-1 text-[10px] font-bold text-emerald-400 bg-emerald-500/10 border border-emerald-500/30 px-2 py-0.5 rounded-full">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping"></span>
                  ABIERTO (7am - 11pm)
                </span>
              </div>
              <p className="text-[11px] text-pink-400/90 font-medium tracking-widest uppercase flex items-center gap-1.5">
                <span>📍 Chigorodó</span> • Domicilios: {PHONE_DISPLAY}
              </p>
            </div>
          </div>

          {/* Right Actions */}
          <div className="flex items-center space-x-3">
            {/* View Switcher Button */}
            <button
              onClick={() => setViewRole(viewRole === 'client' ? 'kitchen' : 'client')}
              className="hidden sm:flex items-center space-x-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold bg-slate-800/80 hover:bg-slate-700 text-slate-300 border border-slate-700 transition"
              title="Cambiar vista para demo"
            >
              <ChefHat className="w-4 h-4 text-pink-400" />
              <span>{viewRole === 'client' ? 'Vista Cocina' : 'Vista Cliente'}</span>
            </button>

            {/* Direct Phone Call */}
            <a
              href={`tel:${PHONE_NUMBER}`}
              className="hidden md:flex items-center space-x-2 bg-pink-500/10 hover:bg-pink-500/20 text-pink-400 border border-pink-500/30 px-3.5 py-2 rounded-xl text-xs font-semibold transition"
            >
              <Phone className="w-3.5 h-3.5" />
              <span>Llamar</span>
            </a>

            {/* Cart Button */}
            <button
              onClick={() => {
                setIsCartOpen(true);
                if (!activeOrder || checkoutStep !== 'tracking') setCheckoutStep('cart');
              }}
              className="relative bg-gradient-to-r from-pink-500 via-purple-600 to-cyan-500 hover:opacity-95 text-white p-3 rounded-2xl shadow-lg shadow-pink-500/25 transition transform active:scale-95 flex items-center justify-center border border-pink-300/30"
              aria-label="Carrito"
            >
              <ShoppingBag className="w-5 h-5" />
              {cartCount > 0 && (
                <span className="absolute -top-1.5 -right-1.5 bg-cyan-400 text-slate-950 font-black text-xs w-5 h-5 rounded-full flex items-center justify-center border-2 border-slate-950 shadow-md">
                  {cartCount}
                </span>
              )}
            </button>
          </div>

        </div>
      </header>

      {/* KITCHEN DASHBOARD MODE (RECEPCIÓN & RECIPIENTE) */}
      {viewRole === 'kitchen' ? (
        <div className="max-w-6xl mx-auto px-4 py-8 relative z-10 print:p-0">
          <div className="flex flex-wrap items-center justify-between mb-6 bg-slate-900/90 p-5 rounded-3xl border border-pink-500/30 print:hidden">
            <div>
              <h2 className="text-2xl font-bold text-white flex items-center gap-2">
                <ChefHat className="w-7 h-7 text-pink-400" /> Panel Recepción & Cocina - Sky Angel
              </h2>
              <p className="text-xs text-slate-400 mt-1">Monitoreo de pedidos entrantes y generación de comandas de impresión</p>
            </div>
            <div className="flex gap-2">
              <button 
                onClick={() => setViewRole('client')}
                className="bg-cyan-500/20 text-cyan-400 px-4 py-2 rounded-xl text-xs font-bold border border-cyan-500/40"
              >
                Volver a Menú Cliente
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {kitchenOrders.map(ord => (
              <div key={ord.id} className="bg-slate-900/90 rounded-3xl p-6 border border-slate-800 shadow-xl relative overflow-hidden print:bg-white print:text-black">
                <div className="flex justify-between items-start mb-4 border-b border-slate-800 pb-3">
                  <div>
                    <span className="text-xs font-bold text-cyan-400 uppercase tracking-widest">{ord.id}</span>
                    <h3 className="font-bold text-lg text-white">{ord.customer.name}</h3>
                    <p className="text-xs text-slate-400">{ord.customer.address} • {ord.customer.phone}</p>
                  </div>
                  <div className="flex flex-col items-end gap-1">
                    <span className="px-3 py-1 bg-pink-500/20 text-pink-400 rounded-full text-xs font-bold border border-pink-500/30">
                      {ord.orderMode === 'delivery' ? '🛵 Domicilio' : '🏬 En Local / Recoger'}
                    </span>
                    <span className="text-[11px] text-slate-500">{ord.time}</span>
                  </div>
                </div>

                <div className="space-y-2 mb-4">
                  {ord.items.map((it, idx) => (
                    <div key={idx} className="flex justify-between text-xs text-slate-300 bg-slate-950/60 p-2.5 rounded-xl border border-slate-800">
                      <span><strong>{it.quantity}x</strong> {it.name}</span>
                      <span className="font-semibold">${(it.price * it.quantity).toLocaleString('es-CO')}</span>
                    </div>
                  ))}
                </div>

                <div className="flex items-center justify-between pt-3 border-t border-slate-800 text-xs">
                  <span className="text-slate-400">Total: <strong className="text-white text-sm">${ord.total.toLocaleString('es-CO')}</strong></span>
                  <div className="flex gap-2 print:hidden">
                    <button 
                      onClick={() => printTicket(ord)}
                      className="bg-slate-800 text-slate-300 p-2 rounded-xl hover:bg-slate-700"
                      title="Imprimir ticket de comanda"
                    >
                      <Printer className="w-4 h-4" />
                    </button>
                    <button 
                      onClick={() => showToast(`Pedido ${ord.id} despachado`)}
                      className="bg-emerald-500/20 text-emerald-400 px-3 py-1.5 rounded-xl font-bold border border-emerald-500/30 hover:bg-emerald-500/30"
                    >
                      Listo para Envío
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <>
          {/* HERO BANNER - NEON NIGHTLIFE */}
          <section className="relative overflow-hidden border-b border-slate-800/80 py-10 px-4 bg-slate-950/60">
            <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-8 relative z-10">
              
              <div className="max-w-xl space-y-4 text-center md:text-left">
                <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-pink-500/10 border border-pink-500/30 text-pink-400 text-xs font-semibold tracking-wide">
                  <Sparkles className="w-3.5 h-3.5 text-cyan-400" /> Sabor Especial & Cócteles Helados
                </span>
                
                <h2 className="text-3xl md:text-5xl font-black text-white leading-tight tracking-tight">
                  Pide tus favoritos de <br />
                  <span className="bg-gradient-to-r from-cyan-400 via-pink-500 to-purple-400 bg-clip-text text-transparent drop-shadow-[0_0_15px_rgba(255,0,127,0.4)]">
                    Sky Angel
                  </span> a domicilio.
                </h2>
                
                <p className="text-slate-400 text-sm md:text-base leading-relaxed">
                  Carnes al carbón, mariscos, hamburguesas jugosas, alitas, cócteles exclusivos y desayunos con entrega rápida en Chigorodó.
                </p>
                
                {/* Search Bar */}
                <div className="relative pt-2">
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500" />
                  <input
                    type="text"
                    placeholder="Buscar plato, cóctel o bebida (ej. Punta de anca, Daiquiri...)"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full bg-slate-900/90 border border-slate-700/80 rounded-2xl pl-12 pr-10 py-3.5 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-pink-500 focus:ring-1 focus:ring-pink-500 transition shadow-inner"
                  />
                  {searchQuery && (
                    <button 
                      onClick={() => setSearchQuery('')}
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-500 hover:text-white"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  )}
                </div>
              </div>

              {/* Location & Quick Info Card */}
              <div className="w-full md:w-auto flex flex-col gap-3 flex-shrink-0">
                <a 
                  href={MAPS_URL} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="bg-slate-900/80 p-4 rounded-2xl border border-pink-500/30 shadow-xl flex items-center gap-3 backdrop-blur-md hover:border-pink-500 transition"
                >
                  <div className="w-12 h-12 rounded-xl bg-pink-500/20 border border-pink-500/40 flex items-center justify-center text-pink-400 flex-shrink-0">
                    <MapPin className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-white flex items-center gap-1">
                      Ubicación en Chigorodó <Navigation className="w-3 h-3 text-cyan-400" />
                    </h4>
                    <p className="text-[11px] text-slate-400">{RESTAURANT_ADDRESS}</p>
                    <span className="text-[10px] text-cyan-400 font-semibold underline">Ver en Google Maps</span>
                  </div>
                </a>

                <div className="bg-slate-900/80 p-4 rounded-2xl border border-cyan-500/30 shadow-xl flex items-center gap-3 backdrop-blur-md">
                  <div className="w-12 h-12 rounded-xl bg-cyan-500/20 border border-cyan-500/40 flex items-center justify-center text-cyan-400 flex-shrink-0">
                    <Wine className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-white">Coctelería & Parrilla</h4>
                    <p className="text-[11px] text-slate-400">Atención de Lunes a Domingo</p>
                  </div>
                </div>
              </div>

            </div>
          </section>

          {/* MAIN MENU CONTAINER */}
          <main className="max-w-6xl mx-auto px-4 py-8 relative z-10">
            
            {/* CATEGORY SLIDER */}
            <div className="flex items-center space-x-2.5 overflow-x-auto pb-4 scrollbar-none">
              {CATEGORIES.map(category => (
                <button
                  key={category.id}
                  onClick={() => setActiveCategory(category.id)}
                  className={`flex items-center space-x-2 px-4 py-2.5 rounded-2xl text-xs font-bold whitespace-nowrap transition-all duration-200 border ${
                    activeCategory === category.id
                      ? 'bg-gradient-to-r from-pink-500 via-purple-600 to-cyan-500 text-white border-transparent shadow-lg shadow-pink-500/20 scale-105'
                      : 'bg-slate-900/90 text-slate-400 border-slate-800 hover:border-slate-700 hover:text-slate-200'
                  }`}
                >
                  <span>{category.icon}</span>
                  <span>{category.name}</span>
                </button>
              ))}
            </div>

            {/* PRODUCTS GRID */}
            <div className="mt-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-bold text-white flex items-center gap-2">
                  <span className="text-pink-400">●</span>
                  <span>{CATEGORIES.find(c => c.id === activeCategory)?.name || 'Menú'}</span>
                  <span className="text-xs bg-slate-800 text-slate-400 px-2.5 py-1 rounded-full border border-slate-700">
                    {filteredItems.length} opciones
                  </span>
                </h3>
              </div>

              {filteredItems.length === 0 ? (
                <div className="text-center py-16 bg-slate-900/50 rounded-3xl border border-slate-800">
                  <Utensils className="w-12 h-12 text-slate-600 mx-auto mb-3" />
                  <p className="text-slate-400 font-medium text-sm">No se encontraron platos en esta sección.</p>
                  <button 
                    onClick={() => { setActiveCategory('all'); setSearchQuery(''); }}
                    className="mt-3 text-xs text-pink-400 hover:underline"
                  >
                    Ver todo el menú de Sky Angel
                  </button>
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredItems.map(item => (
                    <div 
                      key={item.id}
                      className="bg-slate-900/90 rounded-3xl border border-slate-800/90 overflow-hidden flex flex-col justify-between hover:border-pink-500/50 transition duration-300 group shadow-xl shadow-black/40"
                    >
                      {/* Image Container */}
                      <div className="relative h-44 overflow-hidden bg-slate-800">
                        <img 
                          src={item.image} 
                          alt={item.name} 
                          className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                        />
                        {item.promo && (
                          <div className="absolute top-3 left-3 bg-gradient-to-r from-amber-500 to-red-600 text-white font-extrabold text-[10px] px-2.5 py-1 rounded-full uppercase tracking-wider shadow-lg border border-white/20">
                            🔥 COMBO PROMO
                          </div>
                        )}
                        {item.popular && !item.promo && (
                          <div className="absolute top-3 left-3 bg-gradient-to-r from-pink-500 to-purple-600 text-white font-extrabold text-[10px] px-2.5 py-1 rounded-full uppercase tracking-wider shadow-lg border border-white/20">
                            ⭐ Recomendado Sky
                          </div>
                        )}
                        <div className="absolute bottom-3 right-3 bg-slate-950/80 backdrop-blur-md px-2.5 py-1 rounded-full text-xs text-slate-300 font-bold border border-slate-800">
                          ${item.price.toLocaleString('es-CO')}
                        </div>
                      </div>

                      {/* Item Content */}
                      <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                        <div>
                          <h4 className="font-bold text-base text-white group-hover:text-pink-400 transition leading-snug">
                            {item.name}
                          </h4>
                          <p className="text-slate-400 text-xs mt-1.5 leading-relaxed">
                            {item.description}
                          </p>
                        </div>

                        <div className="pt-3 border-t border-slate-800/80 flex items-center justify-between">
                          <span className="text-base font-black text-cyan-400">
                            ${item.price.toLocaleString('es-CO')}
                          </span>

                          <button
                            onClick={() => openProductModal(item)}
                            className="bg-slate-800 hover:bg-pink-500 hover:text-white text-pink-400 px-4 py-2 rounded-2xl text-xs font-bold transition duration-200 flex items-center gap-1.5 border border-pink-500/30 hover:border-transparent active:scale-95"
                          >
                            <Plus className="w-4 h-4" />
                            <span>Pedir</span>
                          </button>
                        </div>
                      </div>

                    </div>
                  ))}
                </div>
              )}
            </div>
          </main>
        </>
      )}

      {/* PRODUCT CUSTOMIZATION MODAL */}
      {selectedProduct && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-end sm:items-center justify-center p-0 sm:p-4">
          <div className="bg-[#12121e] w-full max-w-lg rounded-t-3xl sm:rounded-3xl border border-pink-500/30 overflow-hidden shadow-2xl max-h-[90vh] flex flex-col animate-in fade-in slide-in-from-bottom-5">
            
            {/* Modal Header */}
            <div className="relative h-44 bg-slate-800 flex-shrink-0">
              <img src={selectedProduct.image} alt={selectedProduct.name} className="w-full h-full object-cover" />
              <button 
                onClick={() => setSelectedProduct(null)}
                className="absolute top-4 right-4 bg-slate-950/70 text-white p-2 rounded-full hover:bg-slate-950 transition border border-white/10"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-6 overflow-y-auto space-y-5 flex-1">
              <div>
                <h3 className="text-xl font-bold text-white">{selectedProduct.name}</h3>
                <p className="text-xs text-slate-400 mt-1">{selectedProduct.description}</p>
                <span className="text-lg font-black text-cyan-400 mt-2 block">
                  ${selectedProduct.price.toLocaleString('es-CO')}
                </span>
              </div>

              {/* Options selection */}
              {selectedProduct.options && selectedProduct.options.map((optGroup, idx) => (
                <div key={idx} className="space-y-2 border-t border-slate-800 pt-4">
                  <label className="text-xs font-semibold text-pink-400 uppercase tracking-wider">
                    {optGroup.name}
                  </label>
                  <div className="grid grid-cols-1 gap-2">
                    {optGroup.choices.map((choice, cIdx) => (
                      <button
                        key={cIdx}
                        onClick={() => setSelectedOptions({ ...selectedOptions, [optGroup.name]: choice })}
                        className={`px-4 py-2.5 rounded-xl text-xs font-medium text-left flex items-center justify-between border transition ${
                          selectedOptions[optGroup.name] === choice
                            ? 'bg-pink-500/20 border-pink-500 text-pink-300'
                            : 'bg-slate-950 border-slate-800 text-slate-400 hover:border-slate-700'
                        }`}
                      >
                        <span>{choice}</span>
                        {selectedOptions[optGroup.name] === choice && <Check className="w-4 h-4 text-pink-400" />}
                      </button>
                    ))}
                  </div>
                </div>
              ))}

              {/* Special Instructions Note */}
              <div className="border-t border-slate-800 pt-4 space-y-2">
                <label className="text-xs font-semibold text-slate-300 uppercase tracking-wider flex items-center gap-1">
                  <MessageSquare className="w-3.5 h-3.5 text-pink-400" />
                  Notas para la Cocina / Preparación
                </label>
                <textarea
                  placeholder="Ej. Sin cebolla, término 3/4, salsa aparte..."
                  value={productNote}
                  onChange={(e) => setProductNote(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-xs text-white placeholder-slate-600 focus:outline-none focus:border-pink-500 h-20 resize-none"
                />
              </div>
            </div>

            {/* Modal Footer */}
            <div className="p-4 border-t border-slate-800 bg-[#12121e] flex-shrink-0">
              <button
                onClick={() => handleAddToCart(selectedProduct, selectedOptions, productNote)}
                className="w-full bg-gradient-to-r from-pink-500 via-purple-600 to-cyan-500 hover:opacity-95 text-white py-3.5 rounded-2xl font-bold text-sm shadow-lg shadow-pink-500/25 flex items-center justify-center space-x-2 transition"
              >
                <ShoppingBag className="w-4 h-4" />
                <span>Agregar al Pedido — ${selectedProduct.price.toLocaleString('es-CO')}</span>
              </button>
            </div>

          </div>
        </div>
      )}

      {/* CART & CHECKOUT DRAWER */}
      {isCartOpen && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex justify-end">
          <div className="bg-[#12121e] w-full max-w-md h-full shadow-2xl flex flex-col border-l border-pink-500/30 animate-in slide-in-from-right duration-300">
            
            {/* Drawer Header */}
            <div className="p-5 border-b border-slate-800 flex items-center justify-between bg-[#12121e]">
              <div className="flex items-center space-x-2">
                <ShoppingBag className="w-5 h-5 text-pink-400" />
                <h3 className="font-bold text-white text-lg">
                  {checkoutStep === 'cart' && 'Tu Pedido Sky Angel'}
                  {checkoutStep === 'details' && 'Datos de Entrega'}
                  {checkoutStep === 'tracking' && 'Estado del Pedido'}
                </h3>
              </div>
              <button 
                onClick={() => setIsCartOpen(false)}
                className="text-slate-400 hover:text-white p-2 rounded-xl bg-slate-800"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Drawer Body */}
            <div className="flex-1 overflow-y-auto p-5 space-y-6">
              
              {/* STEP 1: CART ITEMS */}
              {checkoutStep === 'cart' && (
                <>
                  {cart.length === 0 ? (
                    <div className="text-center py-20 text-slate-500 space-y-3">
                      <ShoppingBag className="w-12 h-12 mx-auto text-slate-700" />
                      <p className="text-sm font-medium">Tu carrito está vacío</p>
                      <button
                        onClick={() => setIsCartOpen(false)}
                        className="text-xs text-pink-400 font-semibold hover:underline"
                      >
                        Explorar el menú
                      </button>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {cart.map((item) => (
                        <div key={item.cartItemId} className="bg-slate-900/80 p-4 rounded-2xl border border-slate-800 flex gap-3">
                          <img src={item.image} alt={item.name} className="w-16 h-16 rounded-xl object-cover" />
                          <div className="flex-1">
                            <h4 className="font-bold text-sm text-white">{item.name}</h4>
                            
                            {item.customizations && Object.entries(item.customizations).map(([k, v]) => (
                              <p key={k} className="text-[11px] text-pink-400">↳ {k}: {v}</p>
                            ))}
                            
                            {item.note && <p className="text-[11px] text-slate-400">↳ Nota: {item.note}</p>}
                            
                            <div className="flex items-center justify-between mt-2">
                              <span className="font-bold text-xs text-cyan-400">
                                ${(item.price * item.quantity).toLocaleString('es-CO')}
                              </span>
                              
                              <div className="flex items-center space-x-2 bg-slate-950 px-2 py-1 rounded-xl border border-slate-800">
                                <button 
                                  onClick={() => updateQuantity(item.cartItemId, -1)}
                                  className="text-slate-400 hover:text-white"
                                >
                                  <Minus className="w-3.5 h-3.5" />
                                </button>
                                <span className="text-xs font-bold text-white px-1">{item.quantity}</span>
                                <button 
                                  onClick={() => updateQuantity(item.cartItemId, 1)}
                                  className="text-slate-400 hover:text-white"
                                >
                                  <Plus className="w-3.5 h-3.5" />
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </>
              )}

              {/* STEP 2: ORDER TYPE & CUSTOMER DETAILS */}
              {checkoutStep === 'details' && (
                <form onSubmit={handlePlaceOrder} className="space-y-4">
                  
                  {/* Mode Selector */}
                  <div>
                    <label className="text-xs font-bold text-slate-300 block mb-2">¿Cómo deseas recibir tu pedido?</label>
                    <div className="grid grid-cols-3 gap-2">
                      {[
                        { id: 'delivery', label: 'Domicilio', icon: Bike },
                        { id: 'pickup', label: 'Para Recoger', icon: Store },
                        { id: 'table', label: 'En Mesa', icon: Utensils }
                      ].map(mode => {
                        const IconComponent = mode.icon;
                        return (
                          <button
                            key={mode.id}
                            type="button"
                            onClick={() => setOrderMode(mode.id)}
                            className={`p-2.5 rounded-xl text-xs font-bold border flex flex-col items-center gap-1 transition ${
                              orderMode === mode.id 
                                ? 'bg-pink-500/20 border-pink-500 text-pink-400' 
                                : 'bg-slate-950 border-slate-800 text-slate-400'
                            }`}
                          >
                            <IconComponent className="w-4 h-4" />
                            <span>{mode.label}</span>
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  <div>
                    <label className="text-xs font-bold text-slate-300 block mb-1">Nombre Completo *</label>
                    <input
                      type="text"
                      required
                      placeholder="Ej. Carlos Mendoza"
                      value={customerInfo.name}
                      onChange={(e) => setCustomerInfo({ ...customerInfo, name: e.target.value })}
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-xs text-white focus:border-pink-500 focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-bold text-slate-300 block mb-1">Teléfono / WhatsApp *</label>
                    <input
                      type="tel"
                      required
                      placeholder="Ej. 310 123 4567"
                      value={customerInfo.phone}
                      onChange={(e) => setCustomerInfo({ ...customerInfo, phone: e.target.value })}
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-xs text-white focus:border-pink-500 focus:outline-none"
                    />
                  </div>

                  {orderMode === 'delivery' && (
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="text-xs font-bold text-slate-300 block mb-1">Dirección *</label>
                        <input
                          type="text"
                          required
                          placeholder="Ej. Carrera 15 # 24-50"
                          value={customerInfo.address}
                          onChange={(e) => setCustomerInfo({ ...customerInfo, address: e.target.value })}
                          className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-xs text-white focus:border-pink-500 focus:outline-none"
                        />
                      </div>
                      <div>
                        <label className="text-xs font-bold text-slate-300 block mb-1">Barrio</label>
                        <input
                          type="text"
                          placeholder="Ej. Centro / El Prado"
                          value={customerInfo.neighborhood}
                          onChange={(e) => setCustomerInfo({ ...customerInfo, neighborhood: e.target.value })}
                          className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-xs text-white focus:border-pink-500 focus:outline-none"
                        />
                      </div>
                    </div>
                  )}

                  {orderMode === 'table' && (
                    <div>
                      <label className="text-xs font-bold text-slate-300 block mb-1">Número de Mesa</label>
                      <input
                        type="text"
                        placeholder="Ej. Mesa 4"
                        value={customerInfo.tableNumber}
                        onChange={(e) => setCustomerInfo({ ...customerInfo, tableNumber: e.target.value })}
                        className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-xs text-white focus:border-pink-500 focus:outline-none"
                      />
                    </div>
                  )}

                  <div>
                    <label className="text-xs font-bold text-slate-300 block mb-1">Método de Pago</label>
                    <div className="grid grid-cols-3 gap-2">
                      {[
                        { id: 'efectivo', label: 'Efectivo', icon: DollarSign },
                        { id: 'nequi', label: 'Nequi', icon: Wallet },
                        { id: 'daviplata', label: 'Daviplata', icon: CreditCard },
                      ].map((pm) => {
                        const IconComp = pm.icon;
                        return (
                          <button
                            key={pm.id}
                            type="button"
                            onClick={() => setCustomerInfo({ ...customerInfo, paymentMethod: pm.id })}
                            className={`p-2.5 rounded-xl text-xs font-bold border flex flex-col items-center gap-1 transition ${
                              customerInfo.paymentMethod === pm.id
                                ? 'bg-pink-500/20 border-pink-500 text-pink-400'
                                : 'bg-slate-950 border-slate-800 text-slate-400'
                            }`}
                          >
                            <IconComp className="w-4 h-4" />
                            <span>{pm.label}</span>
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {customerInfo.paymentMethod === 'efectivo' && (
                    <div>
                      <label className="text-xs font-bold text-slate-300 block mb-1">¿Con cuánto pagas? (Para devueltos)</label>
                      <input
                        type="number"
                        placeholder="Ej. 50000"
                        value={customerInfo.cashAmount}
                        onChange={(e) => setCustomerInfo({ ...customerInfo, cashAmount: e.target.value })}
                        className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-xs text-white focus:border-pink-500 focus:outline-none"
                      />
                    </div>
                  )}

                  <div>
                    <label className="text-xs font-bold text-slate-300 block mb-1">Notas Adicionales</label>
                    <textarea
                      placeholder="Ej. Dejar en portería, servilletas extra..."
                      value={customerInfo.notes}
                      onChange={(e) => setCustomerInfo({ ...customerInfo, notes: e.target.value })}
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-xs text-white placeholder-slate-600 focus:outline-none focus:border-pink-500 h-16 resize-none"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full mt-4 bg-gradient-to-r from-pink-500 via-purple-600 to-cyan-500 text-white py-3.5 rounded-2xl font-bold text-sm shadow-lg shadow-pink-500/30 flex items-center justify-center space-x-2"
                  >
                    <span>Confirmar y Enviar Pedido</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </form>
              )}

              {/* STEP 3: TRACKING & WHATSAPP ACTION */}
              {checkoutStep === 'tracking' && activeOrder && (
                <div className="space-y-6 text-center">
                  <div className="bg-slate-900/80 p-5 rounded-3xl border border-pink-500/30 space-y-3">
                    <span className="text-xs font-bold text-cyan-400 tracking-wider uppercase">Pedido Confirmado</span>
                    <h4 className="text-xl font-extrabold text-white">{activeOrder.id}</h4>
                    <p className="text-xs text-slate-400">¡Tu orden está registrada en la cocina de Sky Angel!</p>
                    
                    {/* Status progress bar */}
                    <div className="pt-4 space-y-3 text-left">
                      <div className="flex items-center space-x-3 text-xs">
                        <div className={`w-3 h-3 rounded-full ${activeOrder.status === 'received' ? 'bg-pink-500 animate-ping' : 'bg-emerald-400'}`} />
                        <span className="text-slate-300">1. Pedido Recibido</span>
                      </div>
                      <div className="flex items-center space-x-3 text-xs">
                        <div className={`w-3 h-3 rounded-full ${activeOrder.status === 'preparing' ? 'bg-pink-500 animate-ping' : activeOrder.status === 'on_way' ? 'bg-emerald-400' : 'bg-slate-700'}`} />
                        <span className={activeOrder.status === 'preparing' || activeOrder.status === 'on_way' ? 'text-slate-300' : 'text-slate-600'}>
                          2. En Cocina / Preparación
                        </span>
                      </div>
                      <div className="flex items-center space-x-3 text-xs">
                        <div className={`w-3 h-3 rounded-full ${activeOrder.status === 'on_way' ? 'bg-pink-500 animate-ping' : 'bg-slate-700'}`} />
                        <span className={activeOrder.status === 'on_way' ? 'text-slate-300' : 'text-slate-600'}>
                          3. {activeOrder.orderMode === 'delivery' ? 'Domiciliario en Camino 🛵' : 'Listo para Recoger 🏬'}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* WhatsApp Action */}
                  <div className="bg-emerald-950/40 p-4 rounded-2xl border border-emerald-500/40 space-y-3">
                    <p className="text-xs text-emerald-300 font-medium">
                      Para atención instantánea y confirmación directa, envía la comanda por WhatsApp al restaurante:
                    </p>
                    <a
                      href={getWhatsAppLink()}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold py-3 px-4 rounded-xl text-xs flex items-center justify-center space-x-2 shadow-lg shadow-emerald-500/20 transition"
                    >
                      <Send className="w-4 h-4" />
                      <span>Enviar Comanda a WhatsApp ({PHONE_DISPLAY})</span>
                    </a>
                  </div>

                  <button
                    onClick={() => {
                      setCheckoutStep('cart');
                      setActiveOrder(null);
                      setIsCartOpen(false);
                    }}
                    className="text-xs text-slate-400 hover:text-white underline"
                  >
                    Hacer otro pedido
                  </button>
                </div>
              )}

            </div>

            {/* Drawer Footer with Totals */}
            {checkoutStep !== 'tracking' && cart.length > 0 && (
              <div className="p-5 border-t border-slate-800 bg-[#12121e] space-y-3">
                <div className="space-y-1.5 text-xs text-slate-400">
                  <div className="flex justify-between">
                    <span>Subtotal</span>
                    <span className="text-white">${cartSubtotal.toLocaleString('es-CO')}</span>
                  </div>
                  {orderMode === 'delivery' && (
                    <div className="flex justify-between">
                      <span>Domicilio en Chigorodó</span>
                      <span className="text-white">${deliveryFee.toLocaleString('es-CO')}</span>
                    </div>
                  )}
                  <div className="flex justify-between text-sm font-bold text-white pt-2 border-t border-slate-800">
                    <span>Total a pagar</span>
                    <span className="text-cyan-400">${orderTotal.toLocaleString('es-CO')}</span>
                  </div>
                </div>

                {checkoutStep === 'cart' && (
                  <button
                    onClick={() => setCheckoutStep('details')}
                    className="w-full bg-gradient-to-r from-pink-500 via-purple-600 to-cyan-500 hover:opacity-95 text-white py-3.5 rounded-2xl font-bold text-sm shadow-lg shadow-pink-500/25 flex items-center justify-center space-x-2 transition"
                  >
                    <span>Continuar a Selección de Entrega</span>
                    <ChevronRight className="w-4 h-4" />
                  </button>
                )}
              </div>
            )}

          </div>
        </div>
      )}

      {/* FOOTER WITH MAPS LINK */}
      <footer className="mt-16 border-t border-slate-800/80 bg-slate-950/80 py-8 px-4 text-center text-slate-500 text-xs relative z-10">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center space-x-2">
            <span className="font-bold text-slate-300">Sky Angel Restaurant</span>
            <span>• Domicilios: {PHONE_DISPLAY}</span>
          </div>
          <a 
            href={MAPS_URL} 
            target="_blank" 
            rel="noopener noreferrer" 
            className="flex items-center gap-1 text-pink-400 hover:underline"
          >
            <MapPin className="w-3.5 h-3.5" />
            <span>{RESTAURANT_ADDRESS}</span>
          </a>
          <p>© {new Date().getFullYear()} Sky Angel - Todos los derechos reservados.</p>
        </div>
      </footer>

    </div>
  );
}