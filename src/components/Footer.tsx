import React from 'react';
import { Facebook, Instagram, Twitter, Mail, Phone, MapPin, Heart } from 'lucide-react';
import { useSettings } from '../context/SettingsContext';

export default function Footer() {
  const { settings } = useSettings();

  return (
    <footer className="bg-chocolate-brown py-32 px-8 text-white">
      <div className="mx-auto max-w-7xl">
        <div className="grid grid-cols-1 gap-20 md:grid-cols-4">
          <div className="space-y-8">
            <h3 className="font-serif text-4xl font-bold text-royal-gold">{settings.brandName}</h3>
            <p className="text-lg leading-relaxed text-white/60 italic">
              {settings.tagline || 'Crafting sweet memories since 2015. Every cake is a masterpiece, every bite is a celebration.'}
            </p>
            <div className="flex space-x-6">
              {settings.facebookUrl && (
                <a href={settings.facebookUrl} target="_blank" rel="noopener noreferrer" className="text-white/60 transition-colors hover:text-royal-gold">
                  <Facebook size={24} />
                </a>
              )}
              {settings.instagramUrl && (
                <a href={settings.instagramUrl} target="_blank" rel="noopener noreferrer" className="text-white/60 transition-colors hover:text-royal-gold">
                  <Instagram size={24} />
                </a>
              )}
              <a href="#" className="text-white/60 transition-colors hover:text-royal-gold"><Twitter size={24} /></a>
            </div>
          </div>

          <div className="space-y-8">
            <h4 className="text-xl font-bold uppercase tracking-widest text-royal-gold">Quick Links</h4>
            <ul className="space-y-4 text-lg text-white/60">
              <li><a href="#home" className="transition-colors hover:text-royal-gold">Home</a></li>
              <li><a href="#about" className="transition-colors hover:text-royal-gold">About Us</a></li>
              <li><a href="#products" className="transition-colors hover:text-royal-gold">Our Menu</a></li>
              <li><a href="#contact" className="transition-colors hover:text-royal-gold">Contact</a></li>
            </ul>
          </div>

          <div className="space-y-8" id="contact">
            <h4 className="text-xl font-bold uppercase tracking-widest text-royal-gold">Contact Us</h4>
            <ul className="space-y-6 text-lg text-white/60">
              <li className="flex items-center space-x-4">
                <Phone className="text-royal-gold" size={24} />
                <span>{settings.phone}</span>
              </li>
              <li className="flex items-center space-x-4">
                <Mail className="text-royal-gold" size={24} />
                <span>{settings.email}</span>
              </li>
              <li className="flex items-center space-x-4">
                <MapPin className="text-royal-gold" size={24} />
                <span>{settings.address}</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-32 flex flex-col items-center justify-between border-t border-white/10 pt-12 text-center md:flex-row md:text-left">
          <p className="text-lg text-white/40">
            &copy; {new Date().getFullYear()} {settings.brandName}. All rights reserved.
          </p>
          <p className="mt-6 flex items-center space-x-2 text-lg text-white/40 md:mt-0">
            <span>Made with</span>
            <Heart size={20} className="fill-red-500 text-red-500" />
            <span>for sweet lovers</span>
          </p>
        </div>
      </div>
    </footer>
  );
}
