import React, { useEffect, useState, useRef } from 'react';
import { motion, useInView, useSpring, useTransform } from 'motion/react';
import { Cake, Heart, Users, Award, Sparkles } from 'lucide-react';
import { useSettings } from '../context/SettingsContext';

function Counter({ value, duration = 2 }: { value: number | string; duration?: number }) {
  const numericValue = typeof value === 'string' ? parseInt(value, 10) || 0 : value;
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  
  const spring = useSpring(0, { duration: duration * 1000, bounce: 0 });
  const display = useTransform(spring, (current) => Math.floor(current));

  useEffect(() => {
    if (isInView) {
      spring.set(numericValue);
    }
  }, [isInView, numericValue, spring]);

  useEffect(() => {
    const unsub = display.on("change", (latest) => setCount(latest));
    return () => unsub();
  }, [display]);

  return <span ref={ref}>{count.toLocaleString()}</span>;
}

export default function Stats() {
  const { settings } = useSettings();

  const statsList = [
    { label: 'Cakes Delivered', value: settings.deliveredCakes, icon: Cake, suffix: '+' },
    { label: 'Happy Customers', value: settings.happyCustomers, icon: Users, suffix: '+' },
    { label: 'Custom Designs', value: settings.customDesigns, icon: Award, suffix: '+' },
    { label: 'Quality Rating', value: settings.qualityRating, icon: Heart, suffix: '%' },
  ];

  return (
    <section className="relative overflow-hidden bg-[#1a120b] py-32 px-8">
      {/* Premium Background Pattern */}
      <div className="absolute inset-0 opacity-5 pointer-events-none" 
           style={{ backgroundImage: 'radial-gradient(#d4af37 0.5px, transparent 0.5px)', backgroundSize: '24px 24px' }} />
      
      {/* Decorative Glows */}
      <div className="absolute top-0 left-0 h-full w-full pointer-events-none overflow-hidden">
        <div className="absolute top-[-10%] left-[-10%] h-[50%] w-[50%] rounded-full bg-royal-gold/20 blur-[150px]" />
        <div className="absolute bottom-[-10%] right-[-10%] h-[50%] w-[50%] rounded-full bg-royal-gold/20 blur-[150px]" />
      </div>

      <div className="relative mx-auto max-w-7xl">
        <div className="mb-24 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex items-center justify-center space-x-3 text-royal-gold"
          >
            <div className="h-px w-12 bg-royal-gold/30" />
            <Sparkles size={20} className="animate-pulse" />
            <span className="text-xs font-black uppercase tracking-[6px]">Our Legacy</span>
            <Sparkles size={20} className="animate-pulse" />
            <div className="h-px w-12 bg-royal-gold/30" />
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="mt-6 font-serif text-5xl font-bold text-white md:text-7xl lg:text-8xl"
          >
            Crafting <span className="text-royal-gold italic">Excellence</span>
          </motion.h2>
          <p className="mt-8 text-white/40 max-w-2xl mx-auto text-lg font-medium">
            A decade of baking memories, one masterpiece at a time.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
          {statsList.map((stat, idx) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1, type: 'spring', stiffness: 100 }}
              className="group relative overflow-hidden rounded-[2.5rem] border border-white/10 bg-white/5 p-10 text-center backdrop-blur-md transition-all hover:border-royal-gold/50 hover:bg-white/10"
            >
              <div className="mb-8 flex justify-center">
                <div className="relative flex h-20 w-20 items-center justify-center rounded-3xl bg-gradient-to-br from-royal-gold to-chocolate-brown text-white shadow-premium transition-transform group-hover:scale-110 group-hover:rotate-6">
                  <stat.icon size={36} />
                  <div className="absolute -inset-1 animate-pulse rounded-3xl bg-royal-gold/20 blur-lg" />
                </div>
              </div>
              
              <div className="mb-2 text-5xl font-bold text-white md:text-6xl">
                <Counter value={stat.value} />
                <span className="text-royal-gold">{stat.suffix}</span>
              </div>
              
              <div className="text-sm font-bold uppercase tracking-[2px] text-white/50 group-hover:text-royal-gold transition-colors">
                {stat.label}
              </div>

              {/* Hover Glow */}
              <div className="absolute -bottom-10 -right-10 h-32 w-32 rounded-full bg-royal-gold/10 blur-3xl transition-all group-hover:bg-royal-gold/20" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
