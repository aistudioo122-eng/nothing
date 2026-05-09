import React, { useState, useEffect } from 'react';
import { Crown, Menu, X, ShoppingCart } from 'lucide-react';
import ThemeToggle from './ThemeToggle';
import { motion, AnimatePresence } from 'motion/react';
import { cn } from '../lib/utils';
import { useSettings } from '../context/SettingsContext';

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { settings } = useSettings();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', href: '#home' },
    { name: 'About', href: '#about' },
    { name: 'Cakes', href: '#products' },
    { name: 'Contact', href: '#contact' },
  ];

  const brandParts = settings.brandName.split(' ');
  const firstName = brandParts[0];
  const restName = brandParts.slice(1).join(' ');

  return (
    <header
      className={cn(
        'fixed top-0 z-[1000] w-full transition-all duration-400 px-6 py-4',
        isScrolled ? 'glass-bg shadow-sm' : 'bg-transparent'
      )}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between">
        <a href="#" className="flex items-center font-serif text-3xl font-bold text-heading">
          {settings.logoUrl ? (
            <img 
              src={settings.logoUrl} 
              alt={settings.brandName} 
              className="mr-3 h-10 w-10 object-contain hover:scale-110 transition-transform"
              referrerPolicy="no-referrer"
            />
          ) : (
            <Crown className="mr-2 h-8 w-8 animate-bounce text-royal-gold" />
          )}
          {firstName} <span className="text-royal-gold drop-shadow-md ml-1.5">{restName}</span>
        </a>

        {/* Desktop Nav */}
        <nav className="hidden md:block">
          <ul className="flex space-x-10">
            {navLinks.map((link) => (
              <li key={link.name}>
                <a
                  href={link.href}
                  className="text-lg font-medium text-heading transition-colors hover:text-royal-gold"
                >
                  {link.name}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center space-x-6">
          <ThemeToggle />

          <div className="relative cursor-pointer group">
            <ShoppingCart className="h-7 w-7 text-heading transition-colors group-hover:text-royal-gold" />
            <span className="absolute -top-2 -right-2 flex h-5 w-5 items-center justify-center rounded-full bg-royal-gold text-[10px] font-bold text-white shadow-sm group-hover:scale-110 transition-transform">
              0
            </span>
          </div>

          <a
            href="#products"
            className="hidden rounded-full bg-gradient-to-br from-royal-gold to-[#b89122] px-8 py-3 font-bold text-white shadow-[0_4px_15px_rgba(212,175,55,0.4)] transition-all hover:-translate-y-1 hover:shadow-[0_8px_25px_rgba(212,175,55,0.6)] sm:block"
          >
            Order Now
          </a>

          <button
            className="text-2xl text-heading md:hidden"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X /> : <Menu />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed top-[80px] right-0 h-screen w-4/5 bg-surface p-12 shadow-[-10px_0_30px_rgba(0,0,0,0.1)] md:hidden"
          >
            <ul className="flex flex-col space-y-8">
              {navLinks.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="text-2xl font-medium text-heading transition-colors hover:text-royal-gold"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
