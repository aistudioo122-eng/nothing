import React, { createContext, useContext, useEffect, useState } from 'react';
import { doc, onSnapshot } from 'firebase/firestore';
import { db } from '../firebase';

export interface GlobalSettings {
  brandName: string;
  tagline: string;
  loadingSubtext: string;
  logoUrl?: string;
  heroImageUrl?: string;
  aboutHeading: string;
  aboutDescription1: string;
  aboutDescription2: string;
  aboutDescription3: string;
  aboutImageUrl?: string;
  whatsappNumber: string;
  shopStatus: 'open' | 'closed';
  address: string;
  email: string;
  phone: string;
  instagramUrl?: string;
  facebookUrl?: string;
  deliveredCakes: number;
  happyCustomers: number;
  customDesigns: number;
  qualityRating: number;
  currencySymbol: string;
  primaryColor: string;
  secondaryColor: string;
}

interface SettingsContextType {
  settings: GlobalSettings;
  loading: boolean;
}

const defaultSettings: GlobalSettings = {
  brandName: '',
  tagline: 'Baking Excellence',
  loadingSubtext: 'A Visual Masterpiece',
  aboutHeading: 'Crafting Memories Since 2020',
  aboutDescription1: 'Welcome to our bakery, where baking is an art and every cake is a masterpiece.',
  aboutDescription2: 'We believe that a cake isn\'t just a dessert; it\'s the centerpiece of your celebration.',
  aboutDescription3: 'Our mission is simple: To make your special moments taste Royal.',
  aboutImageUrl: 'https://images.unsplash.com/photo-1556910103-1c02745a30bf?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
  whatsappNumber: '+91 00000 00000',
  shopStatus: 'open',
  address: 'Update Address in Admin Panel',
  email: 'admin@example.com',
  phone: '+91 00000 00000',
  deliveredCakes: 5000,
  happyCustomers: 3000,
  customDesigns: 1000,
  qualityRating: 100,
  currencySymbol: 'NPR',
  primaryColor: '#d4af37',
  secondaryColor: '#5d4037',
};

const SettingsContext = createContext<SettingsContextType>({
  settings: defaultSettings,
  loading: true,
});

export const useSettings = () => useContext(SettingsContext);

export const SettingsProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [settings, setSettings] = useState<GlobalSettings>(defaultSettings);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsub = onSnapshot(doc(db, 'settings', 'global'), (docSnap) => {
      if (docSnap.exists()) {
        const data = docSnap.data();
        const newSettings = { ...defaultSettings, ...data } as GlobalSettings;
        setSettings(newSettings);
        
        // Dynamic Branding: Inject CSS variables
        document.documentElement.style.setProperty('--primary-brand', newSettings.primaryColor);
        document.documentElement.style.setProperty('--secondary-brand', newSettings.secondaryColor);
        
        // Derived Colors for glows/shimmers (opacity adjustments)
        document.documentElement.style.setProperty('--primary-brand-rgb', hexToRgb(newSettings.primaryColor));
      }
      setLoading(false);
    }, (error) => {
      console.error("Error fetching settings:", error);
      setLoading(false);
    });

    return () => unsub();
  }, []);

  // Helper to convert hex to RGB for alpha support in Tailwind
  function hexToRgb(hex: string) {
    hex = hex.replace('#', '');
    if (hex.length === 3) hex = hex.split('').map(x => x + x).join('');
    const r = parseInt(hex.substring(0, 2), 16);
    const g = parseInt(hex.substring(2, 4), 16);
    const b = parseInt(hex.substring(4, 6), 16);
    return `${r}, ${g}, ${b}`;
  }

  return (
    <SettingsContext.Provider value={{ settings, loading }}>
      <div style={{ 
        '--color-primary': settings.primaryColor,
        '--color-secondary': settings.secondaryColor,
      } as React.CSSProperties}>
        {children}
      </div>
    </SettingsContext.Provider>
  );
};
