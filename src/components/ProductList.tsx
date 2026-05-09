import React, { useEffect, useState } from 'react';
import { collection, onSnapshot, query, doc } from 'firebase/firestore';
import { db } from '../firebase';
import { motion, AnimatePresence } from 'motion/react';
import { ShoppingCart, Minus, Plus, X, Calendar, Clock, Sparkles, Search, Filter, Mic } from 'lucide-react';
import { cn } from '../lib/utils';
import confetti from 'canvas-confetti';
import { useSettings } from '../context/SettingsContext';

interface Product {
  id: string;
  name: string;
  image: string;
  basePrice: number;
  description?: string;
}

export default function ProductList() {
  const { settings } = useSettings();
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFlavor, setActiveFlavor] = useState('All');
  const [activeEvent, setActiveEvent] = useState('All');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  
  const [flavors, setFlavors] = useState<string[]>(['All']);
  const [events, setEvents] = useState<string[]>(['All']);
  const [frostingOptions, setFrostingOptions] = useState<string[]>(['Buttercream', 'Whipped Cream', 'Cream Cheese', 'Ganache', 'Fondant']);
  const [toppingOptions, setToppingOptions] = useState<string[]>(['None', 'Sprinkles', 'Fresh Fruits', 'Choco Chips', 'Edible Gold Leaf', 'Nuts']);

  const [orderConfig, setOrderConfig] = useState({
    weight: 1,
    quantity: 1,
    message: '',
    frosting: 'Buttercream',
    topping: 'None',
    deliveryDate: '',
    deliveryTime: '12:00 PM'
  });

  useEffect(() => {
    // Fetch Cakes
    const qCakes = query(collection(db, 'cakes'));
    const unsubCakes = onSnapshot(qCakes, (snapshot) => {
      const prods = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }) as Product);
      setProducts(prods);
      setFilteredProducts(prods);
      setLoading(false);
    }, (error) => {
      console.error('Firestore Error in ProductList:', error);
      setLoading(false);
    });

    // Fetch Categories
    const qCats = query(collection(db, 'categories'));
    const unsubCats = onSnapshot(qCats, (snapshot) => {
      const cats = snapshot.docs.map(doc => doc.data());
      const f = ['All', ...cats.filter(c => c.type === 'flavor').map(c => c.name)];
      const e = ['All', ...cats.filter(c => c.type === 'occasion').map(c => c.name)];
      setFlavors(f);
      setEvents(e);
    });

    // Fetch Options
    const qOpts = query(collection(db, 'options'));
    const unsubOpts = onSnapshot(qOpts, (snapshot) => {
      const opts = snapshot.docs.map(doc => doc.data());
      const f = opts.filter(o => o.type === 'frosting').map(o => o.name);
      const t = ['None', ...opts.filter(o => o.type === 'topping').map(o => o.name)];
      if (f.length > 0) setFrostingOptions(f);
      if (t.length > 0) setToppingOptions(t);
    });

    return () => {
      unsubCakes();
      unsubCats();
      unsubOpts();
    };
  }, []);

  useEffect(() => {
    let result = products;
    if (activeFlavor !== 'All') {
      result = result.filter(p => (p as any).flavor === activeFlavor);
    }
    if (activeEvent !== 'All') {
      result = result.filter(p => (p as any).event === activeEvent);
    }
    if (searchQuery) {
      result = result.filter(p => p.name.toLowerCase().includes(searchQuery.toLowerCase()));
    }
    setFilteredProducts(result);
  }, [searchQuery, activeFlavor, activeEvent, products]);

  const handleOrder = async () => {
    if (!selectedProduct) return;

    const price = Math.round(selectedProduct.basePrice * orderConfig.weight * orderConfig.quantity);
    
    // Trigger Confetti
    confetti({
      particleCount: 150,
      spread: 70,
      origin: { y: 0.6 },
      colors: [settings.primaryColor, settings.secondaryColor, '#FFC0CB']
    });

    const whatsappMsg = `
✨ *ROYAL CAKE ORDER CONFIRMATION* ✨
--------------------------------------------
🎂 *Product:* ${selectedProduct.name}
⚖️ *Weight:* ${orderConfig.weight} kg
🛍️ *Quantity:* ${orderConfig.quantity} Piece(s)
💰 *Total Price:* ${settings.currencySymbol}${price}

*--- CUSTOMIZATION ---*
🧁 *Frosting:* ${orderConfig.frosting}
🍓 *Extra Topping:* ${orderConfig.topping}
✍️ *Msg on Cake:* "${orderConfig.message || 'No custom message'}"

*--- DELIVERY SCHEDULE ---*
📅 *Date:* ${orderConfig.deliveryDate || 'ASAP'}
⏰ *Time:* ${orderConfig.deliveryTime}

--------------------------------------------
👑 *Brand:* ${settings.brandName || 'Royal Bakery'}
🙏 *I've placed this order through your website. Please confirm!*
`.trim();
    const whatsappUrl = `https://wa.me/${settings.whatsappNumber.replace(/\s+/g, '')}?text=${encodeURIComponent(whatsappMsg)}`;
    
    setTimeout(() => {
      window.open(whatsappUrl, '_blank');
      setSelectedProduct(null);
      setOrderConfig({
        weight: 1,
        quantity: 1,
        message: '',
        frosting: 'Buttercream',
        topping: 'None',
        deliveryDate: '',
        deliveryTime: '12:00 PM'
      });
    }, 1000);
  };

  return (
    <section id="products" className="bg-base py-32 px-8">
      <div className="mx-auto max-w-7xl">
        <div className="mb-20 text-center">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="shimmer-text inline-block border-b-4 border-royal-gold pb-4 font-serif text-5xl md:text-6xl text-heading"
          >
            Our Premium Collection
          </motion.h2>
          <p className="mt-6 text-muted font-medium">Handcrafted with the finest ingredients for your special moments</p>
        </div>

        <div className="mb-16 flex flex-col space-y-12">
          {/* Search Bar */}
          <div className="mx-auto w-full max-w-md">
            <div className="relative">
              <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-muted" size={20} />
              <input
                type="text"
                placeholder="Search your favorite cake..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full rounded-full border-2 border-border-color bg-surface py-4 pl-16 pr-16 font-medium text-heading outline-none transition-all focus:border-royal-gold focus:ring-4 focus:ring-royal-gold/10"
              />
              <button 
                className="absolute right-4 top-1/2 -translate-y-1/2 flex h-10 w-10 items-center justify-center rounded-full bg-surface text-royal-gold shadow-sm hover:bg-royal-gold hover:text-white transition-all"
                onClick={() => alert(`Voice search coming soon to ${settings.brandName || 'our shop'}!`)}
              >
                <Mic size={18} />
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-10 lg:grid-cols-2">
            {/* Flavor Slider */}
            <div className="space-y-4">
              <div className="flex items-center space-x-2 text-heading">
                <Sparkles size={18} className="text-royal-gold" />
                <h3 className="text-sm font-bold uppercase tracking-widest">Select Flavor</h3>
              </div>
              <div className="flex w-full overflow-x-auto pb-4 custom-scrollbar">
                <div className="flex space-x-3">
                  {flavors.map((f) => (
                    <button
                      key={f}
                      onClick={() => setActiveFlavor(f)}
                      className={cn(
                        'whitespace-nowrap rounded-full px-6 py-2.5 text-xs font-bold transition-all duration-300',
                        activeFlavor === f
                          ? 'bg-chocolate-brown text-white shadow-premium scale-105'
                          : 'bg-surface text-muted hover:bg-royal-gold hover:text-white'
                      )}
                    >
                      {f}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Event Slider */}
            <div className="space-y-4">
              <div className="flex items-center space-x-2 text-heading">
                <Calendar size={18} className="text-royal-gold" />
                <h3 className="text-sm font-bold uppercase tracking-widest">Special Occasion</h3>
              </div>
              <div className="flex w-full overflow-x-auto pb-4 custom-scrollbar">
                <div className="flex space-x-3">
                  {events.map((e) => (
                    <button
                      key={e}
                      onClick={() => setActiveEvent(e)}
                      className={cn(
                        'whitespace-nowrap rounded-full px-6 py-2.5 text-xs font-bold transition-all duration-300',
                        activeEvent === e
                          ? 'bg-royal-gold text-white shadow-premium scale-105'
                          : 'bg-surface text-muted hover:bg-chocolate-brown hover:text-white'
                      )}
                    >
                      {e}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {loading ? (
          <div className="flex h-48 items-center justify-center text-gray-400">
            <div className="h-8 w-8 animate-spin rounded-full border-4 border-royal-gold border-t-transparent"></div>
          </div>
        ) : filteredProducts.length > 0 ? (
          <div className="grid grid-cols-1 gap-12 sm:grid-cols-2 lg:grid-cols-3">
            {filteredProducts.map((product, idx) => (
              <ProductCard
                key={product.id}
                product={product}
                idx={idx}
                onOrder={() => setSelectedProduct(product)}
              />
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <div className="mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-gray-100 text-gray-400">
              <Filter size={32} />
            </div>
            <h3 className="font-serif text-2xl font-bold text-chocolate-brown">No cakes found</h3>
            <p className="mt-2 text-gray-500">Try searching for something else or change the category.</p>
          </div>
        )}
      </div>

      {/* Order Modal */}
      <AnimatePresence>
        {selectedProduct && (
          <div className="fixed inset-0 z-[2000] flex items-center justify-center bg-black/70 backdrop-blur-md p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="w-full max-w-lg rounded-[2rem] bg-surface p-10 shadow-premium"
            >
              <div className="mb-8 flex items-center justify-between">
                <div>
                  <h3 className="font-serif text-3xl font-bold text-heading">Personalize Order</h3>
                  <p className="text-sm text-royal-gold font-medium mt-1">{selectedProduct.name}</p>
                </div>
                <button onClick={() => setSelectedProduct(null)} className="rounded-full bg-base p-2 text-muted transition-colors hover:bg-red-50 hover:text-red-500">
                  <X size={24} />
                </button>
              </div>

              <div className="max-h-[70vh] overflow-y-auto pr-2 custom-scrollbar space-y-8">
                <div>
                  <label className="mb-3 block text-sm font-bold uppercase tracking-wider text-muted">Select Weight (kg)</label>
                  <div className="grid grid-cols-5 gap-2 rounded-2xl bg-base p-1.5">
                    {[0.5, 1, 2, 3, 5].map((w) => (
                      <button
                        key={w}
                        onClick={() => setOrderConfig({ ...orderConfig, weight: w })}
                        className={cn(
                          'rounded-xl py-3 text-sm font-bold transition-all duration-300',
                          orderConfig.weight === w 
                            ? 'bg-surface text-royal-gold shadow-md scale-105' 
                            : 'text-muted hover:text-royal-gold hover:bg-surface/50'
                        )}
                      >
                        {w}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="mb-3 block text-sm font-bold uppercase tracking-wider text-muted">Frosting Type</label>
                    <select
                      value={orderConfig.frosting}
                      onChange={(e) => setOrderConfig({ ...orderConfig, frosting: e.target.value })}
                      className="w-full rounded-2xl border-2 border-border-color bg-base p-4 font-medium text-heading outline-none focus:border-royal-gold"
                    >
                      {frostingOptions.map(opt => <option key={opt} value={opt}>{opt}</option>)}
                    </select>
                  </div>
                  <div>
                    <label className="mb-3 block text-sm font-bold uppercase tracking-wider text-muted">Extra Topping</label>
                    <select
                      value={orderConfig.topping}
                      onChange={(e) => setOrderConfig({ ...orderConfig, topping: e.target.value })}
                      className="w-full rounded-2xl border-2 border-border-color bg-base p-4 font-medium text-heading outline-none focus:border-royal-gold"
                    >
                      {toppingOptions.map(opt => <option key={opt} value={opt}>{opt}</option>)}
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="mb-3 block text-sm font-bold uppercase tracking-wider text-muted flex items-center gap-2">
                      <Calendar size={16} /> Delivery Date
                    </label>
                    <input
                      type="date"
                      value={orderConfig.deliveryDate}
                      onChange={(e) => setOrderConfig({ ...orderConfig, deliveryDate: e.target.value })}
                      className="w-full rounded-2xl border-2 border-border-color bg-base p-4 font-medium text-heading outline-none focus:border-royal-gold"
                    />
                  </div>
                  <div>
                    <label className="mb-3 block text-sm font-bold uppercase tracking-wider text-muted flex items-center gap-2">
                      <Clock size={16} /> Preferred Time
                    </label>
                    <select
                      value={orderConfig.deliveryTime}
                      onChange={(e) => setOrderConfig({ ...orderConfig, deliveryTime: e.target.value })}
                      className="w-full rounded-2xl border-2 border-border-color bg-base p-4 font-medium text-heading outline-none focus:border-royal-gold"
                    >
                      {['09:00 AM', '12:00 PM', '03:00 PM', '06:00 PM', '09:00 PM'].map(t => <option key={t} value={t}>{t}</option>)}
                    </select>
                  </div>
                </div>

                <div>
                  <label className="mb-3 block text-sm font-bold uppercase tracking-wider text-muted">Quantity</label>
                  <div className="flex items-center justify-between rounded-2xl bg-base p-2">
                    <button
                      onClick={() => setOrderConfig({ ...orderConfig, quantity: Math.max(1, orderConfig.quantity - 1) })}
                      className="flex h-12 w-12 items-center justify-center rounded-xl bg-surface text-heading shadow-sm transition-all hover:bg-royal-gold hover:text-white"
                    >
                      <Minus size={20} />
                    </button>
                    <span className="text-xl font-bold text-heading">{orderConfig.quantity}</span>
                    <button
                      onClick={() => setOrderConfig({ ...orderConfig, quantity: Math.min(10, orderConfig.quantity + 1) })}
                      className="flex h-12 w-12 items-center justify-center rounded-xl bg-surface text-heading shadow-sm transition-all hover:bg-royal-gold hover:text-white"
                    >
                      <Plus size={20} />
                    </button>
                  </div>
                </div>

                <div>
                  <label className="mb-3 block text-sm font-bold uppercase tracking-wider text-muted">Message on cake</label>
                  <textarea
                    value={orderConfig.message}
                    onChange={(e) => setOrderConfig({ ...orderConfig, message: e.target.value })}
                    placeholder="E.g. Happy Birthday Rohit!"
                    className="h-32 w-full rounded-2xl border-2 border-border-color bg-base p-4 text-heading outline-none transition-all focus:border-royal-gold focus:ring-4 focus:ring-royal-gold/10"
                  />
                </div>
              </div>

              <div className="mt-8 flex space-x-4 border-t pt-8">
                <button
                  onClick={() => setSelectedProduct(null)}
                  className="flex-1 rounded-full border-2 border-gray-200 py-4 font-bold text-gray-400 transition-all hover:border-royal-gold hover:text-royal-gold"
                >
                  Cancel
                </button>
                <button
                  onClick={handleOrder}
                  className="shiny-btn flex-1 rounded-full bg-chocolate-brown py-4 font-bold text-white shadow-lg transition-all hover:bg-royal-gold hover:shadow-royal-gold/30 flex items-center justify-center gap-2"
                >
                  <Sparkles size={20} />
                  Proceed to Order
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}

interface ProductCardProps {
  key?: string | number;
  product: Product;
  idx: number;
  onOrder: () => void;
}

function ProductCard({ product, idx, onOrder }: ProductCardProps) {
  const { settings } = useSettings();
  const [weight, setWeight] = useState(1);
  const [qty, setQty] = useState(1);

  const finalPrice = Math.round(product.basePrice * weight * qty);

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: idx * 0.1 }}
      className="group relative overflow-hidden rounded-[2.5rem] bg-surface shadow-soft transition-all duration-500 hover:-translate-y-4 hover:shadow-premium"
    >
      {idx === 0 && (
        <div className="absolute top-6 right-6 z-10 rounded-full bg-royal-gold px-4 py-1.5 text-[10px] font-bold uppercase tracking-widest text-white shadow-lg">
          Trending
        </div>
      )}
      
      <div className="relative h-72 overflow-hidden">
        <img
          src={product.image}
          alt={product.name}
          className="h-full w-full object-cover transition-transform duration-1000 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
      </div>
      
      <div className="p-10">
        <h3 className="mb-4 font-serif text-3xl font-bold text-heading transition-colors group-hover:text-royal-gold">{product.name}</h3>
        
        <div className="mb-8 space-y-5">
          <div>
            <span className="mb-2 block text-[10px] font-bold uppercase tracking-widest text-muted">Select Weight</span>
            <div className="flex space-x-1.5 rounded-2xl bg-base p-1">
              {[0.5, 1, 2, 3, 5].map((w) => (
                <button
                  key={w}
                  onClick={() => setWeight(w)}
                  className={cn(
                    'flex-1 rounded-xl py-2 text-xs font-bold transition-all duration-300',
                    weight === w ? 'bg-surface text-royal-gold shadow-md' : 'text-muted hover:text-royal-gold'
                  )}
                >
                  {w}
                </button>
              ))}
            </div>
          </div>

          <div className="flex items-center justify-between rounded-2xl bg-base p-1.5">
            <button
              onClick={() => setQty(Math.max(1, qty - 1))}
              className="flex h-10 w-10 items-center justify-center rounded-xl bg-surface text-heading shadow-sm transition-all hover:bg-royal-gold hover:text-white"
            >
              <Minus size={16} />
            </button>
            <span className="text-base font-bold text-heading">{qty}</span>
            <button
              onClick={() => setQty(Math.min(10, qty + 1))}
              className="flex h-10 w-10 items-center justify-center rounded-xl bg-surface text-heading shadow-sm transition-all hover:bg-royal-gold hover:text-white"
            >
              <Plus size={16} />
            </button>
          </div>
        </div>

        <div className="flex items-center justify-between border-t border-border-color pt-8">
          <div className="flex flex-col">
            <span className="text-3xl font-bold text-heading">
              {settings.currencySymbol} <span className="text-royal-gold">{finalPrice}</span>
            </span>
            <span className="text-[10px] font-medium text-muted uppercase tracking-wider mt-1">{weight}kg • {qty} Qty</span>
          </div>
          <button
            onClick={onOrder}
            className="shiny-btn flex h-14 w-14 items-center justify-center rounded-2xl bg-chocolate-brown text-white shadow-lg transition-all hover:bg-royal-gold hover:shadow-royal-gold/30"
          >
            <ShoppingCart size={24} />
          </button>
        </div>
      </div>
    </motion.div>
  );
}
