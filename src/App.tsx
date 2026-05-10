import React, { useEffect, useState } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import ProductList from './components/ProductList';
import Footer from './components/Footer';
import Stats from './components/Stats';
import FAQ from './components/FAQ';
import ScrollProgress from './components/ScrollProgress';
import BackToTop from './components/BackToTop';
import FeaturesGrid from './components/FeaturesGrid';
import CustomCursor from './components/CustomCursor';
import Loyalty from './components/Loyalty';
import { motion, AnimatePresence } from 'motion/react';
import { Crown, Sparkles, Star, Zap, Heart } from 'lucide-react';
import { SettingsProvider, useSettings } from './context/SettingsContext';

function AppContent() {
  const [isPreloading, setIsPreloading] = useState(true);
  const { settings, loading: settingsLoading } = useSettings();

  useEffect(() => {
    // Preloader timer - wait for settings to load then add a small buffer for animation
    if (!settingsLoading) {
      const timer = setTimeout(() => {
        setIsPreloading(false);
      }, 4500); // Slightly longer for better animation experience
      return () => clearTimeout(timer);
    }
  }, [settingsLoading]);

  return (
    <>
      <AnimatePresence>
        {isPreloading && (
          <motion.div
            key="preloader"
            initial={{ opacity: 1 }}
            exit={{ 
              opacity: 0,
              scale: 1.1,
              transition: { duration: 1.2, ease: [0.43, 0.13, 0.23, 0.96] }
            }}
            className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-[#0d0a08] overflow-hidden"
          >
            {/* Vibrant colorful orbs */}
            <motion.div 
              animate={{ 
                scale: [1, 1.3, 1],
                opacity: [0.3, 0.6, 0.3],
                x: [0, 100, 0],
                y: [0, -50, 0]
              }}
              transition={{ duration: 15, repeat: Infinity }}
              className="absolute top-[-10%] left-[-10%] h-[60%] w-[60%] rounded-full bg-gradient-to-br from-royal-gold to-pink-500 filter blur-[120px]"
            />
            <motion.div 
              animate={{ 
                scale: [1, 1.5, 1],
                opacity: [0.2, 0.5, 0.2],
                x: [0, -150, 0],
                y: [0, 100, 0]
              }}
              transition={{ duration: 20, repeat: Infinity }}
              className="absolute bottom-[-10%] right-[-10%] h-[70%] w-[70%] rounded-full bg-gradient-to-tr from-purple-600 to-royal-gold filter blur-[150px]"
            />
            <motion.div 
              animate={{ 
                scale: [0.8, 1.2, 0.8],
                opacity: [0.1, 0.4, 0.1],
                x: [100, -100, 100],
              }}
              transition={{ duration: 18, repeat: Infinity }}
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-96 w-96 rounded-full bg-blue-500 filter blur-[100px]"
            />

            {/* Ambient Background Particles */}
            <div className="absolute inset-0 overflow-hidden">
              {[...Array(30)].map((_, i) => (
                <motion.div
                  key={i}
                  initial={{ 
                    x: Math.random() * (typeof window !== 'undefined' ? window.innerWidth : 1000), 
                    y: Math.random() * (typeof window !== 'undefined' ? window.innerHeight : 1000),
                    opacity: 0,
                    scale: 0
                  }}
                  animate={{ 
                    y: [null, Math.random() * -150 - 100],
                    opacity: [0, 0.8, 0],
                    scale: [0, 1, 0],
                  }}
                  transition={{ 
                    duration: Math.random() * 4 + 3, 
                    repeat: Infinity,
                    delay: Math.random() * 5 
                  }}
                  className="absolute h-1.5 w-1.5 rounded-full bg-white shadow-[0_0_10px_white]"
                />
              ))}
            </div>

            <div className="relative flex flex-col items-center z-10">
              <motion.div
                initial={{ scale: 0.5, opacity: 0, rotate: -20 }}
                animate={{ scale: 1, opacity: 1, rotate: 0 }}
                transition={{ duration: 1.5, ease: "backOut" }}
                className="relative h-40 w-40 flex items-center justify-center mb-12"
              >
                {settings.logoUrl ? (
                  <img 
                    src={settings.logoUrl} 
                    alt="Logo" 
                    className="h-24 w-24 object-contain z-10 drop-shadow-[0_0_20px_rgba(255,255,255,0.2)]"
                    referrerPolicy="no-referrer"
                  />
                ) : (
                  <Crown size={80} className="text-royal-gold z-10 drop-shadow-[0_0_20px_rgba(212,175,55,0.8)]" />
                )}
              </motion.div>

              <div className="text-center">
                <motion.div
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.5, duration: 0.8 }}
                  className="flex items-center justify-center space-x-3 text-royal-gold mb-4"
                >
                  <Sparkles size={16} />
                  <span className="text-sm font-black uppercase tracking-[8px]">Premium Experience</span>
                  <Sparkles size={16} />
                </motion.div>

                <motion.h1 
                  initial={{ y: 30, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.7, duration: 1 }}
                  className="font-serif text-6xl md:text-8xl font-bold tracking-[4px] text-white"
                >
                  {settings.brandName.split(' ')[0]} <span className="text-royal-gold italic">{settings.brandName.split(' ').slice(1).join(' ')}</span>
                </motion.h1>
                
                <motion.div className="mt-12 w-64 h-1.5 bg-white/10 rounded-full overflow-hidden mx-auto border border-white/5">
                  <motion.div 
                    initial={{ x: "-100%" }}
                    animate={{ x: "0%" }}
                    transition={{ duration: 4, ease: "linear" }}
                    className="h-full w-full bg-gradient-to-r from-royal-gold via-pink-500 to-blue-500"
                  />
                </motion.div>

                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 1.5, duration: 1 }}
                  className="mt-8 font-sans text-sm font-medium uppercase tracking-[6px] text-white/40"
                >
                  {settings.loadingSubtext || 'Crafting Your Royal Treat...'}
                </motion.p>
              </div>
            </div>

            {/* Decorative Icons spinning in background */}
            <div className="absolute inset-0 pointer-events-none opacity-20">
              <motion.div 
                animate={{ rotate: 360, y: [0, -20, 0] }}
                transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
                className="absolute top-1/4 right-[15%]"
              >
                <Star size={40} className="text-royal-gold" />
              </motion.div>
              <motion.div 
                animate={{ rotate: -360, y: [0, 20, 0] }}
                transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
                className="absolute bottom-1/4 left-[15%]"
              >
                <Heart size={32} className="text-pink-500" />
              </motion.div>
              <motion.div 
                animate={{ rotate: 360, scale: [1, 1.2, 1] }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                className="absolute top-1/3 left-[10%]"
              >
                <Zap size={24} className="text-blue-400" />
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {!isPreloading && (
        <div className="min-h-screen bg-base text-heading selection:bg-royal-gold selection:text-white">
          <CustomCursor />
          <ScrollProgress />
          <Navbar />
          <main>
            <Hero />
            <Stats />
            <About />
            <ProductList />
            <Loyalty />
            <FeaturesGrid />
            <FAQ />
          </main>
          <Footer />
          <BackToTop />
        </div>
      )}
    </>
  );
}

export default function App() {
  return (
    <SettingsProvider>
      <AppContent />
    </SettingsProvider>
  );
}
