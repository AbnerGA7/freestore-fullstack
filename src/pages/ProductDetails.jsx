import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { client, urlFor } from '../sanity';
import { useCart } from '../context/CartContext';
import { ShoppingCart, ArrowLeft, Ruler } from 'lucide-react';

const ProductDetails = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [mainImage, setMainImage] = useState(null);
  const [selectedSize, setSelectedSize] = useState(null);
  const { addToCart } = useCart();

  useEffect(() => {
    const query = `*[_type == "product" && slug.current == "${slug}"][0]`;
    client.fetch(query).then((data) => {
      setProduct(data);
      setMainImage(data.image);
    });
  }, [slug]);

  if (!product) return <div className="text-white text-center pt-40">Cargando...</div>;

  // --- LÓGICA DE VALIDACIÓN ---
  const handleAddToCart = () => {
    // Si el producto TIENE tallas y el usuario NO ha elegido ninguna:
    if (product.sizes && product.sizes.length > 0 && !selectedSize) {
      alert("⚠️ Por favor selecciona una talla antes de agregar.");
      return; 
    }

    // Creamos el objeto para el carrito
    const productToAdd = {
      ...product,
      // Creamos un ID único combinando ID del producto + Talla (para que puedas agregar M y L por separado)
      _id: selectedSize ? `${product._id}-${selectedSize}` : product._id,
      selectedSize: selectedSize 
    };
    
    addToCart(productToAdd);
  };

  return (
    <div className="pt-28 pb-20 px-4 max-w-7xl mx-auto min-h-screen">
      
      <button onClick={() => navigate(-1)} className="text-gray-400 hover:text-white flex items-center gap-2 mb-8 transition-colors">
        <ArrowLeft size={20} /> Volver
      </button>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        <div className="space-y-4">
          <div className="aspect-square bg-zinc-900 rounded-2xl overflow-hidden border border-white/10">
            {mainImage && <img src={urlFor(mainImage).width(1000).quality(95).url()} alt={product.title} className="w-full h-full object-cover" />}
          </div>
          {product.gallery && (
            <div className="flex gap-4 overflow-x-auto pb-2">
              <button onClick={() => setMainImage(product.image)} className={`w-20 h-20 rounded-lg overflow-hidden flex-shrink-0 border-2 ${mainImage === product.image ? 'border-brand-primary' : 'border-transparent'}`}>
                 <img src={urlFor(product.image).width(200).url()} className="w-full h-full object-cover" />
              </button>
              {product.gallery.map((img, i) => (
                <button key={i} onClick={() => setMainImage(img)} className={`w-20 h-20 rounded-lg overflow-hidden flex-shrink-0 border-2 ${mainImage === img ? 'border-brand-primary' : 'border-transparent'}`}>
                  <img src={urlFor(img).width(200).url()} className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          )}
        </div>

        <div>
          <p className="text-brand-primary font-bold uppercase tracking-wider mb-2">{product.category} {product.subcategory ? `> ${product.subcategory}` : ''}</p>
          <h1 className="text-4xl md:text-5xl font-black text-white mb-4 leading-tight">{product.title}</h1>
          <p className="text-3xl font-bold text-white mb-6">S/ {product.price}</p>
          
          <div className="prose prose-invert text-gray-400 mb-8">
            <p>{product.description}</p>
          </div>

          {/* SELECTOR DE TALLAS (Solo se muestra si Sanity tiene tallas) */}
          {product.sizes && product.sizes.length > 0 && (
            <div className="mb-8 p-4 bg-zinc-900/50 rounded-xl border border-white/5">
              <h3 className="text-white font-bold mb-3 flex items-center gap-2"><Ruler size={18} className="text-brand-primary"/> Selecciona tu Talla:</h3>
              <div className="flex flex-wrap gap-3">
                {product.sizes.map((size) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`px-4 py-2 rounded-lg border font-medium transition-all ${selectedSize === size ? 'bg-brand-primary border-brand-primary text-white shadow-lg shadow-fuchsia-500/30' : 'border-gray-600 text-gray-400 hover:border-white hover:text-white'}`}
                  >
                    {size}
                  </button>
                ))}
              </div>
              {!selectedSize && <p className="text-red-400 text-xs mt-2">* Debes seleccionar una opción</p>}
            </div>
          )}

          <button 
            onClick={handleAddToCart}
            className="w-full md:w-auto bg-white text-black px-10 py-4 rounded-full font-bold text-lg hover:bg-brand-primary hover:text-white transition-all flex items-center justify-center gap-3 shadow-lg shadow-white/10"
          >
            <ShoppingCart />
            {product.sizes && product.sizes.length > 0 && !selectedSize ? 'Elige una talla' : 'AGREGAR AL CARRITO'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;