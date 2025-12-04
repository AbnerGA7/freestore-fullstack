import React, { useState, useEffect } from 'react';
import { client, urlFor } from '../sanity';
import { motion, AnimatePresence } from 'framer-motion';
import { useCart } from '../context/CartContext';
import { ShoppingCart, Filter, X, ExternalLink } from 'lucide-react';
import { Link } from 'react-router-dom';

const CategoryPage = ({ category, title, subtitle }) => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const { addToCart } = useCart();
  
  const [genderFilter, setGenderFilter] = useState('all'); 
  const [typeFilter, setTypeFilter] = useState('all');     
  const [showMobileFilters, setShowMobileFilters] = useState(false);

  const isCatalogMode = category === 'catalog';

  useEffect(() => {
    setGenderFilter('all');
    setTypeFilter('all');
    const query = `*[_type == "product" && category == "${category}"]`;
    client.fetch(query).then((data) => {
      setProducts(data);
      setFilteredProducts(data);
    });
  }, [category]);

  useEffect(() => {
    let result = products;
    if (genderFilter !== 'all') result = result.filter(p => p.gender === genderFilter);
    if (typeFilter !== 'all') result = result.filter(p => p.subcategory === typeFilter);
    setFilteredProducts(result);
  }, [genderFilter, typeFilter, products]);

  const subcategories = [...new Set(products.map(p => p.subcategory).filter(Boolean))];

  const Filters = () => (
    <div className="space-y-8">
      {!isCatalogMode && products.some(p => p.gender) && (
        <div>
          <h3 className="text-white font-bold mb-4 uppercase text-sm tracking-wider">Género</h3>
          <div className="space-y-2">
            {['all', 'Hombre', 'Mujer', 'Unisex'].map((g) => (
              <label key={g} className="flex items-center gap-3 cursor-pointer group">
                <div className={`w-5 h-5 rounded-full border flex items-center justify-center ${genderFilter === g ? 'border-brand-primary' : 'border-gray-600'}`}>
                  {genderFilter === g && <div className="w-2.5 h-2.5 bg-brand-primary rounded-full" />}
                </div>
                <input type="radio" name="gender" className="hidden" checked={genderFilter === g} onChange={() => setGenderFilter(g)} />
                <span className={`text-sm ${genderFilter === g ? 'text-white font-bold' : 'text-gray-400 group-hover:text-white'}`}>{g === 'all' ? 'Ver Todo' : g}</span>
              </label>
            ))}
          </div>
        </div>
      )}
      
      {!isCatalogMode && subcategories.length > 0 && (
        <div>
          <h3 className="text-white font-bold mb-4 uppercase text-sm tracking-wider pt-4 border-t border-white/10">Tipo</h3>
          <div className="space-y-2">
            <label className="flex items-center gap-3 cursor-pointer group">
               <input type="radio" name="type" className="hidden" checked={typeFilter === 'all'} onChange={() => setTypeFilter('all')} />
               <span className={`text-sm ${typeFilter === 'all' ? 'text-brand-primary font-bold' : 'text-gray-400 group-hover:text-white'}`}>Todo</span>
            </label>
            {subcategories.map((sub) => (
              <label key={sub} className="flex items-center gap-3 cursor-pointer group">
                <input type="radio" name="type" className="hidden" checked={typeFilter === sub} onChange={() => setTypeFilter(sub)} />
                <span className={`text-sm capitalize ${typeFilter === sub ? 'text-white font-bold' : 'text-gray-400 group-hover:text-white'}`}>{sub}</span>
              </label>
            ))}
          </div>
        </div>
      )}
    </div>
  );

  return (
    <div className="pt-24 px-4 max-w-7xl mx-auto min-h-screen">
      <div className="mb-8 border-b border-white/10 pb-8 flex flex-col md:flex-row justify-between items-end gap-4">
        <div>
          <h1 className="text-4xl md:text-6xl font-extrabold text-white uppercase italic tracking-tighter mb-2">{title}</h1>
          <p className="text-gray-400 max-w-lg">{subtitle}</p>
        </div>
        {!isCatalogMode && (
          <button onClick={() => setShowMobileFilters(true)} className="md:hidden flex items-center gap-2 bg-zinc-800 px-4 py-2 rounded-full text-white text-sm font-bold"><Filter size={16}/> Filtrar</button>
        )}
      </div>

      <div className="flex gap-8 items-start">
        {!isCatalogMode && (
           <aside className="hidden md:block w-64 flex-shrink-0 sticky top-28"><Filters /></aside>
        )}
        
        <main className="flex-1">
          {filteredProducts.length === 0 ? (
            <div className="text-center py-20 bg-zinc-900/50 rounded-xl border border-dashed border-zinc-700 text-gray-500">Cargando o no hay productos...</div>
          ) : (
            // Usamos 'items-start' para que si tienen diferentes alturas, se alineen arriba
            <div className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 pb-20 items-start`}>
              {filteredProducts.map((item) => (
                <motion.div key={item._id} initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="bg-zinc-900 rounded-xl overflow-hidden border border-white/5 hover:border-brand-primary/50 transition-all group relative">
                  
                  {isCatalogMode ? (
                    // --- DISEÑO TIPO CATÁLOGO (ADAPTABLE A LA FOTO) ---
                    // Quitamos 'h-96' y dejamos que la imagen defina la altura
                    <div className="relative w-full"> 
                       <a href={item.catalogUrl || '#'} target="_blank" rel="noreferrer" className="block w-full h-auto">
                          {/* Gradiente para el texto inferior */}
                          <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent z-10 opacity-60 pointer-events-none"></div>
                          
                          {/* IMAGEN: Quitamos 'object-cover' y 'h-full'. Usamos 'h-auto' */}
                          {item.image ? <img src={urlFor(item.image).width(600).url()} alt={item.title} className="w-full h-auto block group-hover:scale-105 transition-transform duration-700" /> : null}
                          
                          {/* Botón Central Ver Revista */}
                          <div className="absolute inset-0 flex items-center justify-center z-20 opacity-0 group-hover:opacity-100 transition-opacity bg-black/30 backdrop-blur-sm">
                             <span className="bg-brand-primary text-white px-6 py-3 rounded-full font-bold shadow-lg flex items-center gap-2 transform scale-110 hover:scale-125 transition-transform">
                                VER REVISTA <ExternalLink size={18}/>
                             </span>
                          </div>

                          <div className="absolute bottom-0 left-0 w-full p-4 z-20 text-center pointer-events-none">
                             <h3 className="text-xl md:text-2xl font-black text-white uppercase tracking-widest drop-shadow-lg">{item.title}</h3>
                          </div>
                       </a>
                    </div>
                  ) : (
                    // --- DISEÑO TIPO PRODUCTO NORMAL (Altura fija y recorte) ---
                    <>
                      <div className="h-72 overflow-hidden relative bg-black">
                        <Link to={item.slug ? `/product/${item.slug.current}` : '#'}>
                            {item.image ? <img src={urlFor(item.image).width(800).url()} alt={item.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" /> : <div className="w-full h-full flex items-center justify-center text-gray-700">Sin Foto</div>}
                        </Link>
                        {item.subcategory && (
                          <div className="absolute top-2 left-2 bg-black/60 backdrop-blur-md text-white text-[10px] font-bold px-2 py-1 rounded border border-white/10 uppercase">{item.subcategory}</div>
                        )}
                        <button onClick={() => addToCart(item)} className="absolute bottom-3 right-3 bg-white text-black p-3 rounded-full shadow-xl translate-y-12 group-hover:translate-y-0 transition-transform duration-300 hover:bg-brand-primary hover:text-white z-10"><ShoppingCart size={20}/></button>
                      </div>
                      <div className="p-4">
                        <Link to={item.slug ? `/product/${item.slug.current}` : '#'}><h3 className="font-bold text-white text-lg leading-tight mb-1 truncate hover:text-brand-primary transition-colors">{item.title}</h3></Link>
                        <div className="flex justify-between items-center">
                          <p className="text-gray-500 text-xs uppercase">{item.gender}</p>
                          <p className="text-brand-primary font-bold text-xl">S/ {item.price}</p>
                        </div>
                      </div>
                    </>
                  )}

                </motion.div>
              ))}
            </div>
          )}
        </main>
      </div>

      <AnimatePresence>
        {showMobileFilters && (
          <>
            <motion.div initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}} onClick={() => setShowMobileFilters(false)} className="fixed inset-0 bg-black/80 z-[60] backdrop-blur-sm md:hidden" />
            <motion.div initial={{y:'100%'}} animate={{y:0}} exit={{y:'100%'}} className="fixed bottom-0 left-0 right-0 bg-zinc-900 z-[70] rounded-t-3xl p-6 md:hidden max-h-[80vh] overflow-y-auto">
              <div className="flex justify-between items-center mb-6"><h2 className="text-xl font-bold text-white">Filtrar</h2><button onClick={() => setShowMobileFilters(false)} className="p-2 bg-white/10 rounded-full text-white"><X size={20}/></button></div>
              <Filters />
              <button onClick={() => setShowMobileFilters(false)} className="w-full bg-brand-primary text-white font-bold py-3 rounded-xl mt-8">Ver Resultados</button>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
};
export default CategoryPage;