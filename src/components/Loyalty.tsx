import React from 'react';
import { motion } from 'motion/react';
import { Gift, Star, Zap, Trophy, Sparkles } from 'lucide-react';
import { useSettings } from '../context/SettingsContext';

const tiers = [
  { name: 'Silver', points: '0 - 500', color: 'bg-gray-300', icon: Star, benefits: ['5% Discount', 'Birthday Treat'] },
  { name: 'Gold', points: '501 - 2000', color: 'bg-royal-gold', icon: Trophy, benefits: ['10% Discount', 'Priority Delivery', 'Free Toppings'] },
  { name: 'Platinum', points: '2000+', color: 'bg-chocolate-brown', icon: Sparkles, benefits: ['15% Discount', 'Personal Chef', 'VIP Support', 'Free Delivery'] },
];

export default function Loyalty() {
  const { settings } = useSettings();

  return (
    <section className="bg-cream-white py-32 px-8">
      <div className="mx-auto max-w-7xl">
        <div className="mb-20 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex items-center justify-center space-x-2 text-royal-gold"
          >
            <Star size={20} />
            <span className="text-sm font-bold uppercase tracking-[4px]">{settings.brandName.split(' ')[0]} Rewards</span>
            <Star size={20} />
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="mt-4 font-serif text-5xl font-bold text-chocolate-brown md:text-6xl"
          >
            Join the <span className="text-royal-gold italic">Elite Circle</span>
          </motion.h2>
          <p className="mt-6 text-gray-500 max-w-2xl mx-auto">
            Earn points with every bite and unlock exclusive privileges, discounts, and royal treats.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          {tiers.map((tier, idx) => (
            <motion.div
              key={tier.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              whileHover={{ y: -10 }}
              className="relative rounded-[3rem] bg-white p-10 shadow-soft transition-all hover:shadow-premium border border-gray-100"
            >
              <div className={`mb-8 flex h-16 w-16 items-center justify-center rounded-2xl ${tier.color} text-white shadow-lg`}>
                <tier.icon size={32} />
              </div>
              <h3 className="mb-2 font-serif text-2xl font-bold text-chocolate-brown">{tier.name} Tier</h3>
              <p className="mb-8 text-sm font-bold text-royal-gold uppercase tracking-widest">{tier.points} Points</p>
              
              <ul className="space-y-4">
                {tier.benefits.map((benefit, bIdx) => (
                  <li key={bIdx} className="flex items-center space-x-3 text-gray-600">
                    <div className="h-1.5 w-1.5 rounded-full bg-royal-gold" />
                    <span className="text-sm font-medium">{benefit}</span>
                  </li>
                ))}
              </ul>

              <button className="shiny-btn mt-10 w-full rounded-full bg-gray-50 py-4 text-sm font-bold text-chocolate-brown transition-all hover:bg-royal-gold hover:text-white">
                Learn More
              </button>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-20 flex flex-col items-center justify-between rounded-[3rem] bg-chocolate-brown p-12 text-white md:flex-row md:p-16"
        >
          <div className="mb-8 md:mb-0">
            <h3 className="font-serif text-3xl font-bold">Start Earning Today</h3>
            <p className="mt-2 text-white/60">Get 100 bonus points on your first order!</p>
          </div>
          <button className="shiny-btn rounded-full bg-royal-gold px-12 py-5 text-lg font-bold text-chocolate-brown shadow-premium">
            Create Account
          </button>
        </motion.div>
      </div>
    </section>
  );
}
