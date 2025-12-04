import React from 'react';
import { MapPin, Truck, Train, Clock, AlertCircle } from 'lucide-react';

const DeliveryPage = () => {
  return (
    <div className="pt-24 px-4 max-w-5xl mx-auto min-h-screen text-white">
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-extrabold uppercase italic tracking-tighter mb-4 text-brand-primary">
          Envíos y Entregas
        </h1>
        <p className="text-gray-400 text-lg">Elige la opción que mejor se adapte a ti.</p>
      </div>

      {/* Usamos 'items-stretch' para obligar a que tengan la misma altura */}
      <div className="grid md:grid-cols-2 gap-8 mb-12 items-stretch">
        
        {/* --- OPCIÓN 1: ESTACIÓN DEL TREN  --- */}
        <div className="relative group rounded-2xl overflow-hidden border border-brand-primary/50 h-full flex flex-col justify-end font-sans">
          {/* Imagen de fondo */}
          <div className="absolute inset-0">
            <img 
              src="https://diariocorreo.pe/resizer/BdzHvpwWFxthZ8XEwsDUjSJJ5LI=/604x403/smart/filters:format(jpeg):quality(75)/arc-anglerfish-arc2-prod-elcomercio.s3.amazonaws.com/public/X2PNZGIKAFCYFESNLTJCKPC64I.jpg" 
              alt="Estación del Tren" 
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
            />
            
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/70 to-transparent"></div>
          </div>

          <div className="relative z-10 p-8">
            <div className="flex items-center gap-3 mb-2 text-brand-primary">
               <Train size={32} />
               <h2 className="text-2xl font-bold text-white">Estaciones del Tren</h2>
            </div>
            <p className="text-gray-300 mb-4 text-sm">Entrega rápida en cualquier estación de la Línea 1.</p>
            <div className="flex justify-between items-center border-t border-white/20 pt-4">
               <span className="flex items-center gap-2 text-xs text-gray-400"><Clock size={14}/> Previa coordinación</span>
               <span className="text-xl font-bold text-white">S/ 3.00</span>
            </div>
          </div>
        </div>

        {/* --- OPCIÓN 2: DELIVERY --- */}
        
        <div className="bg-zinc-900 border border-white/10 p-8 rounded-2xl flex flex-col justify-center relative overflow-hidden hover:border-white/30 transition-colors h-full font-sans">
          <div className="absolute top-0 right-0 p-4 opacity-10"><Truck size={100} /></div>
          <div className="w-16 h-16 bg-white/10 rounded-full flex items-center justify-center mb-6 text-white">
            <Truck size={32} />
          </div>
          <h2 className="text-2xl font-bold mb-2">Delivery a Domicilio</h2>
          <p className="text-gray-400 mb-6">Recibe tu pedido en la puerta de tu casa u oficina.</p>
          <ul className="space-y-3 text-sm text-gray-300">
            <li className="flex items-center gap-2"><Clock size={16} className="text-brand-primary"/> Tiempo: 24 - 48 horas</li>
            <li className="flex items-center gap-2"><MapPin size={16} className="text-brand-primary"/> Todo Lima Metropolitana</li>
          </ul>
          <div className="mt-8 pt-6 border-t border-white/10 flex justify-between items-center mt-auto">
            <span className="text-sm text-gray-500">Costo variable</span>
            <span className="text-lg font-bold text-white">Según Distrito</span>
          </div>
        </div>
      </div>

      <div className="bg-zinc-800 p-6 rounded-xl flex items-start gap-4 border-l-4 border-yellow-500 font-sans">
        <div className="min-w-fit mt-1 text-yellow-500">
            <AlertCircle size={24} />
        </div>
        <div>
            <h3 className="font-bold text-lg text-white">Importante sobre los pagos</h3>
            <p className="text-gray-400 text-sm mt-1">Para confirmar cualquier pedido, se requiere el pago adelantado o coordinar el 50%. Aceptamos Yape, Plin y Transferencias BCP.</p>
        </div>
      </div>
    </div>
  );
};

export default DeliveryPage;