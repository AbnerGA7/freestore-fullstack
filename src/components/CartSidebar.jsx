import React, { useState } from 'react';
import { X, Trash2, MessageCircle, MapPin, CreditCard, Train } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useCart } from '../context/CartContext';
import { urlFor } from '../sanity';

const CartSidebar = () => {
  const { cart, removeFromCart, total, isCartOpen, toggleCart } = useCart();
  
  // ESTADOS DEL FORMULARIO
  const [paymentMethod, setPaymentMethod] = useState(''); 
  const [deliveryType, setDeliveryType] = useState('');   
  const [selectedStation, setSelectedStation] = useState(''); // Estado para la estación

  // LISTA DE ESTACIONES DE LA LÍNEA 1
  const stations = [
    "Estación Bayóvar", "Estación Santa Rosa", "Estación San Martín", "Estación San Carlos",
    "Estación Los Postes", "Estación Los Jardines", "Estación Pirámide del Sol", "Estación Caja de Agua",
    "Estación Presbítero Maestro", "Estación El Ángel", "Estación Grau", "Estación Gamarra",
    "Estación Arriola", "Estación La Cultura", "Estación San Borja Sur", "Estación Angamos",
    "Estación Cabitos", "Estación Ayacucho", "Estación Jorge Chávez", "Estación Atocongo",
    "Estación San Juan", "Estación María Auxiliadora", "Estación Villa María", "Estación Pumacahua",
    "Estación Parque Industrial", "Estación Villa El Salvador"
  ];

  const deliveryCost = deliveryType === 'estacion' ? 3.00 : 0;
  const finalTotal = total + deliveryCost;

  // --- FUNCIÓN PARA GENERAR EL MENSAJE DETALLADO ---
  const handleCheckout = () => {
    const phoneNumber = "51999999999"; 
    
    let message = `Hola *FREE'S* 👋, quiero realizar el siguiente pedido:\n\n`;

    cart.forEach((item, index) => {
      message += `🛒 *PRODUCTO ${index + 1}*\n`;
      message += `▪️ Modelo: ${item.title}\n`;
      
      if (item.selectedSize) {
        message += `▪️ Talla: *${item.selectedSize}*\n`;
      } else if (item.subcategory) {
        message += `▪️ Tipo: ${item.subcategory}\n`;
      }

      message += `▪️ Cant: ${item.quantity} | Precio: S/ ${item.price}\n`;
      
      if (item.image) {
        message += `📸 Foto: ${urlFor(item.image).width(300).url()}\n`;
      }
      message += `\n`; 
    });

    message += `➖➖➖➖➖➖➖➖➖➖\n`;
    message += `🔸 Subtotal: S/ ${total.toFixed(2)}\n`;
    if(deliveryType === 'estacion') {
        message += `🔸 Envío (Estación): S/ 3.00\n`;
    }
    message += `💰 *TOTAL FINAL: S/ ${finalTotal.toFixed(2)}*\n`;
    message += `➖➖➖➖➖➖➖➖➖➖\n\n`;
    
    message += `📋 *DATOS DE ENTREGA:*\n`;
    message += `💳 Método de Pago: *${paymentMethod.toUpperCase()}*\n`;
    
    if (deliveryType === 'estacion') {
        message += `📍 Entrega en: *${selectedStation}* (Tren)\n`;
    } else {
        message += `📍 Entrega en: *Delivery a Domicilio* (Coordinar dirección)\n`;
    }
    
    const url = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
    window.open(url, '_blank');
  };

  // Validación para habilitar el botón
  const isFormValid = () => {
    if (!paymentMethod || !deliveryType) return false;
    if (deliveryType === 'estacion' && !selectedStation) return false;
    return true;
  };

  return (
    <AnimatePresence>
      {isCartOpen && (
        <>
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={toggleCart} className="fixed inset-0 bg-black/80 z-[60] backdrop-blur-sm" />
          <motion.div initial={{ x: '100%' }} animate={{ x: 0 }} exit={{ x: '100%' }} transition={{ type: 'spring', damping: 25, stiffness: 200 }} className="fixed right-0 top-0 h-full w-full max-w-md bg-zinc-950 z-[70] shadow-2xl border-l border-white/10 flex flex-col">
            
            <div className="p-5 border-b border-white/10 flex justify-between items-center bg-black">
              <h2 className="text-xl font-bold text-white">Mi Pedido <span className="text-brand-primary">({cart.length})</span></h2>
              <button onClick={toggleCart} className="p-2 hover:bg-white/10 rounded-full text-white"><X /></button>
            </div>

            <div className="flex-1 overflow-y-auto p-5 space-y-4">
              {cart.length === 0 ? (
                <div className="text-center text-gray-500 mt-20 flex flex-col items-center"><MessageCircle size={48} className="mb-4 opacity-50"/><p>Tu carrito está vacío.</p></div>
              ) : (
                cart.map((item) => (
                  <div key={item._id} className="flex gap-4 bg-zinc-900 p-3 rounded-xl border border-white/5">
                    <div className="w-20 h-20 bg-zinc-800 rounded-lg overflow-hidden flex-shrink-0">
                      {item.image && <img src={urlFor(item.image).width(200).url()} alt={item.title} className="w-full h-full object-cover" />}
                    </div>
                    <div className="flex-1 flex flex-col justify-between">
                      <div>
                          <h3 className="font-bold text-white text-sm line-clamp-1">{item.title}</h3>
                          <p className="text-gray-400 text-xs mt-1">
                            {item.selectedSize ? `Talla: ${item.selectedSize}` : (item.subcategory || 'General')}
                          </p>
                      </div>
                      <div className="flex justify-between items-end"><span className="text-brand-primary font-bold">S/ {item.price} x {item.quantity}</span><button onClick={() => removeFromCart(item._id)} className="text-red-500 hover:text-red-400 p-1"><Trash2 size={18}/></button></div>
                    </div>
                  </div>
                ))
              )}
            </div>

            {cart.length > 0 && (
              <div className="p-5 bg-zinc-900 border-t border-white/10 space-y-4">
                
                {/* SELECTOR PAGO */}
                <div>
                  <h3 className="text-white font-bold text-sm mb-2 flex items-center gap-2"><CreditCard size={16}/> Método de Pago</h3>
                  <div className="grid grid-cols-3 gap-2">
                    {['Yape', 'Plin', 'Transferencia'].map((method) => (
                      <button key={method} onClick={() => setPaymentMethod(method)} className={`py-2 px-1 rounded-lg text-[10px] sm:text-xs font-bold border transition-all uppercase ${paymentMethod === method ? 'bg-white text-black border-white' : 'bg-black text-gray-400 border-gray-700 hover:border-gray-500'}`}>
                        {method}
                      </button>
                    ))}
                  </div>
                </div>

                {/* SELECTOR ENTREGA */}
                <div>
                  <h3 className="text-white font-bold text-sm mb-2 flex items-center gap-2"><MapPin size={16}/> Entrega</h3>
                  <div className="grid grid-cols-2 gap-2">
                    <button onClick={() => {setDeliveryType('estacion'); setSelectedStation('')}} className={`py-2 rounded-lg text-xs font-bold border transition-all flex flex-col items-center justify-center gap-1 ${deliveryType === 'estacion' ? 'bg-white text-black border-white' : 'bg-black text-gray-400 border-gray-700 hover:border-gray-500'}`}>
                        <span className="flex items-center gap-1"><Train size={14}/> Estación Tren</span>
                        <span className="text-[10px] opacity-70">+ S/ 3.00</span>
                    </button>
                    <button onClick={() => {setDeliveryType('delivery'); setSelectedStation('')}} className={`py-2 rounded-lg text-xs font-bold border transition-all flex flex-col items-center justify-center gap-1 ${deliveryType === 'delivery' ? 'bg-white text-black border-white' : 'bg-black text-gray-400 border-gray-700 hover:border-gray-500'}`}>
                        <span className="flex items-center gap-1"><MapPin size={14}/> Delivery</span>
                        <span className="text-[10px] opacity-70">Coordina precio</span>
                    </button>
                  </div>

                  {/* SELECTOR DE ESTACIÓN (SOLO APARECE SI ELIGE TREN) */}
                  <AnimatePresence>
                    {deliveryType === 'estacion' && (
                      <motion.div 
                        initial={{ opacity: 0, height: 0 }} 
                        animate={{ opacity: 1, height: 'auto' }} 
                        exit={{ opacity: 0, height: 0 }}
                        className="mt-3 overflow-hidden"
                      >
                        <select 
                          value={selectedStation} 
                          onChange={(e) => setSelectedStation(e.target.value)}
                          className="w-full bg-black text-white text-xs p-3 rounded-lg border border-gray-600 focus:border-brand-primary outline-none appearance-none cursor-pointer hover:border-white transition-colors"
                        >
                          <option value="">-- Selecciona la Estación --</option>
                          {stations.map((s) => (
                            <option key={s} value={s}>{s}</option>
                          ))}
                        </select>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                <div className="pt-4 border-t border-white/10">
                  <div className="flex justify-between text-xl font-bold text-white mb-4">
                    <span>Total Final:</span>
                    <span className="text-brand-primary">S/ {finalTotal.toFixed(2)}</span>
                  </div>
                  <button 
                    onClick={handleCheckout} 
                    disabled={!isFormValid()} 
                    className="w-full bg-green-600 hover:bg-green-500 text-white py-4 rounded-xl font-bold flex items-center justify-center gap-2 transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-lg"
                  >
                    <MessageCircle size={24} /> 
                    {!isFormValid() ? 'Faltan datos...' : 'Enviar Pedido al WhatsApp'}
                  </button>
                </div>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};
export default CartSidebar;