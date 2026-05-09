import React from 'react';
import { motion } from 'motion/react';
import { 
  Truck, ShieldCheck, Clock, Heart, 
  Sparkles, Gift, Zap, Star, 
  Coffee, Utensils, Camera, MapPin,
  Smartphone, Globe, CreditCard, Headphones
} from 'lucide-react';
import { useSettings } from '../context/SettingsContext';

const features = [
  { icon: Truck, title: 'Express Delivery', desc: 'Get your cake in under 2 hours across the city.' },
  { icon: ShieldCheck, title: 'Quality Assured', desc: 'We use only premium, organic ingredients.' },
  { icon: Clock, title: '24/7 Support', desc: 'Our team is always here to help with your orders.' },
  { icon: Heart, title: 'Made with Love', desc: 'Every cake is handcrafted by our master chefs.' },
  { icon: Sparkles, title: 'Custom Designs', desc: 'If you can dream it, we can bake it.' },
  { icon: Gift, title: 'Gift Packaging', desc: 'Premium packaging for your special moments.' },
  { icon: Zap, title: 'Instant Booking', desc: 'Fastest checkout experience on the web.' },
  { icon: Star, title: 'Top Rated', desc: 'Over 10,000+ 5-star reviews from happy customers.' },
  { icon: Coffee, title: 'Cafe Experience', desc: 'Visit our physical stores for a cozy vibe.' },
  { icon: Utensils, title: 'Hygiene First', desc: 'Strict adherence to international safety standards.' },
  { icon: Camera, title: 'Insta-Worthy', desc: 'Our cakes look as good as they taste.' },
  { icon: MapPin, title: 'Live Tracking', desc: 'Track your delivery in real-time on our map.' },
  { icon: Smartphone, title: 'Mobile Ready', desc: 'Order from any device, anywhere, anytime.' },
  { icon: Globe, title: 'Eco-Friendly', desc: 'Sustainable packaging for a greener planet.' },
  { icon: CreditCard, title: 'Secure Payments', desc: 'Multiple safe payment options available.' },
  { icon: Headphones, title: 'Expert Advice', desc: 'Free consultation for wedding & event cakes.' },
];

export default function FeaturesGrid() {
  const { settings } = useSettings();

  return (
    <section id="features" className="bg-white py-32 px-8 overflow-hidden">
      <div className="mx-auto max-w-7xl">
        <div className="mb-20 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex items-center justify-center space-x-2 text-royal-gold"
          >
            <Sparkles size={20} />
            <span className="text-sm font-bold uppercase tracking-[4px]">The {settings.brandName.split(' ')[0]} Experience</span>
            <Sparkles size={20} />
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="mt-4 font-serif text-5xl font-bold text-chocolate-brown md:text-6xl"
          >
            100+ Reasons to <span className="text-royal-gold italic">Choose Us</span>
          </motion.h2>
          <p className="mt-6 text-gray-500 max-w-2xl mx-auto">
            We don't just bake cakes; we create experiences that last a lifetime. 
            Discover why {settings.brandName} is the preferred choice for celebrations.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {features.map((feature, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.05 }}
              whileHover={{ y: -10 }}
              className="group relative rounded-3xl border border-gray-100 bg-gray-50/50 p-8 transition-all hover:bg-white hover:shadow-premium"
            >
              <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-white text-royal-gold shadow-soft transition-transform group-hover:scale-110 group-hover:rotate-3">
                <feature.icon size={28} />
              </div>
              <h3 className="mb-3 font-serif text-xl font-bold text-chocolate-brown">{feature.title}</h3>
              <p className="text-sm leading-relaxed text-gray-500">{feature.desc}</p>
              
              {/* Decorative corner */}
              <div className="absolute -bottom-2 -right-2 h-10 w-10 rounded-tl-3xl bg-royal-gold/5 transition-all group-hover:bg-royal-gold/10" />
            </motion.div>
          ))}
        </div>
        
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="mt-20 rounded-[3rem] bg-chocolate-brown p-12 text-center text-white md:p-20"
        >
          <h3 className="font-serif text-3xl font-bold md:text-5xl">Ready for a <span className="text-royal-gold italic">Royal Celebration?</span></h3>
          <p className="mt-6 text-lg text-white/60 max-w-xl mx-auto">
            Join thousands of happy customers who trust us with their most precious moments.
          </p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="shiny-btn mt-10 rounded-full bg-royal-gold px-12 py-5 text-lg font-bold text-chocolate-brown shadow-premium"
          >
            Order Your Masterpiece Now
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
}
