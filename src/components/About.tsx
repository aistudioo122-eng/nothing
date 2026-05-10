import React from 'react';
import { motion } from 'motion/react';
import { useSettings } from '../context/SettingsContext';

export default function About() {
  const { settings } = useSettings();

  return (
    <section id="about" className="mx-auto max-w-7xl px-8 py-24">
      <div className="mb-16 text-center">
        <h2 className="inline-block border-b-4 border-royal-gold pb-4 font-serif text-5xl text-heading">
          Our Story
        </h2>
      </div>
      <div className="flex flex-wrap items-center gap-16">
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="relative min-w-[350px] flex-1"
        >
          <img
            src={settings.aboutImageUrl}
            alt="Bakery Story"
            className="w-full rounded-2xl shadow-soft h-[500px] object-cover"
            referrerPolicy="no-referrer"
          />
          <div className="absolute -top-5 -left-5 -z-10 h-full w-full rounded-2xl border-2 border-royal-gold" />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="min-w-[350px] flex-1"
        >
          <h3 className="mb-6 font-serif text-3xl font-bold text-heading">{settings.aboutHeading}</h3>
          <p className="mb-6 text-lg text-muted">
            {settings.aboutDescription1}
          </p>
          <p className="mb-6 text-lg text-muted">
            {settings.aboutDescription2}
          </p>
          <p className="mb-8 text-lg italic text-muted">
            {settings.aboutDescription3}
          </p>
          <a
            href="#contact"
            className="rounded-full border-2 border-royal-gold bg-transparent px-8 py-3.5 font-semibold text-heading transition-all hover:-translate-y-1 hover:bg-royal-gold/10"
          >
            Contact Us
          </a>
        </motion.div>
      </div>
    </section>
  );
}
