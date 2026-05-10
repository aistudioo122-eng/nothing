import React from 'react';
import { motion } from 'motion/react';
import { useSettings } from '../context/SettingsContext';

export default function Hero() {
  const { settings } = useSettings();

  const brandParts = settings.brandName.split(' ');
  const firstName = brandParts[0];
  const restName = brandParts.slice(1).join(' ');

  return (
    <section id="home" className="relative flex min-h-screen items-center justify-center overflow-hidden bg-base px-8 pt-[120px] pb-[50px]">
      {/* Decorative Elements */}
      <div className="absolute top-20 left-10 h-32 w-32 animate-pulse rounded-full bg-royal-gold/5 blur-3xl" />
      <div className="absolute bottom-20 right-10 h-64 w-64 animate-pulse rounded-full bg-soft-pink/10 blur-3xl" />
      
      <div className="z-10 mx-auto flex w-full max-w-7xl flex-col-reverse items-center justify-between md:flex-row">
        <motion.div
          initial={{ opacity: 0, x: -60 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
          className="max-w-[650px] flex-1 pr-0 text-center md:pr-12 md:text-left"
        >
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="mb-4 inline-block rounded-full bg-royal-gold/10 px-6 py-2 text-xs font-bold uppercase tracking-[3px] text-royal-gold"
          >
            {settings.tagline || 'Premium Bakery Experience'}
          </motion.div>
          <h1 className="mb-8 font-serif text-6xl leading-[1.05] text-heading md:text-8xl">
            {firstName} <span className="shimmer-text block drop-shadow-sm">{restName}</span>
          </h1>
          <p className="mb-12 max-w-[90%] text-xl leading-relaxed text-muted md:mx-0 mx-auto">
            Indulge in the art of fine baking. Our handcrafted cakes are a symphony of premium flavors and artistic elegance, designed for your most cherished celebrations.
          </p>
          <div className="flex flex-col space-y-5 sm:flex-row sm:space-y-0 sm:space-x-6 justify-center md:justify-start">
            <motion.a
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              href={`https://wa.me/${settings.whatsappNumber.replace(/\s+/g, '')}`}
              className="shiny-btn rounded-full bg-chocolate-brown px-10 py-4.5 font-bold text-white shadow-premium transition-all hover:bg-royal-gold text-center"
            >
              Order via WhatsApp
            </motion.a>
            <motion.a
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              href="#about"
              className="rounded-full border-2 border-royal-gold bg-transparent px-10 py-4.5 font-bold text-heading transition-all hover:bg-royal-gold/10 text-center"
            >
              Our Story
            </motion.a>
          </div>
        </motion.div>

        <div className="relative flex flex-1 items-center justify-center mb-16 md:mb-0">
          <motion.div
            animate={{
              borderRadius: ['40% 60% 70% 30% / 40% 50% 60% 50%', '70% 30% 50% 50% / 30% 30% 70% 70%', '40% 60% 70% 30% / 40% 50% 60% 50%'],
              rotate: [0, 10, 0],
              scale: [1, 1.05, 1],
            }}
            transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
            className="absolute -z-10 h-[350px] w-[350px] bg-gradient-to-br from-light-gold via-soft-pink to-royal-gold/20 opacity-40 blur-2xl md:h-[550px] md:w-[550px]"
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.8, rotate: -10 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            transition={{ duration: 1.5, ease: [0.22, 1, 0.36, 1] }}
            className="relative"
          >
            <img
              src={settings.heroImageUrl || "https://i.ibb.co/27z855V2/Generated-Image-September-17-2025-9-26-PM.png"}
              alt="Royal Cake"
              className="h-auto w-full max-w-[380px] animate-[float_8s_ease-in-out_infinite] rounded-full border-[12px] border-white shadow-[0_30px_60px_rgba(0,0,0,0.2)] md:max-w-[550px] object-cover aspect-square"
              referrerPolicy="no-referrer"
            />
            <div className="absolute -bottom-6 -right-6 h-24 w-24 animate-bounce rounded-full bg-white p-4 shadow-xl md:h-32 md:w-32">
              <div className="flex h-full w-full items-center justify-center rounded-full border-2 border-dashed border-royal-gold text-center">
                <span className="font-serif text-xs font-bold text-royal-gold md:text-sm">100%<br/>Fresh</span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
