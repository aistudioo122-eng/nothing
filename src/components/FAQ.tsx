import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronDown, HelpCircle } from 'lucide-react';

const faqs = [
  {
    question: 'How far in advance should I order?',
    answer: 'For standard cakes, 24 hours is enough. For custom designs or wedding cakes, we recommend ordering at least 3-5 days in advance.'
  },
  {
    question: 'Do you offer home delivery?',
    answer: 'Yes! We deliver across the city. Delivery charges may apply based on your location. You can select your preferred time slot during checkout.'
  },
  {
    question: 'Can I customize the sweetness level?',
    answer: 'Absolutely. We offer "Less Sugar" and "Sugar-Free" options for most of our cakes. Just mention it in the notes section!'
  },
  {
    question: 'What is your cancellation policy?',
    answer: 'Cancellations made 24 hours before the delivery time are eligible for a full refund. Same-day cancellations may incur a small fee.'
  }
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section id="faq" className="bg-gray-50 py-32 px-8">
      <div className="mx-auto max-w-4xl">
        <div className="mb-20 text-center">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="shimmer-text inline-block border-b-4 border-royal-gold pb-4 font-serif text-5xl md:text-6xl text-chocolate-brown"
          >
            Frequently Asked Questions
          </motion.h2>
          <p className="mt-6 text-gray-500 font-medium">Everything you need to know about our service</p>
        </div>

        <div className="space-y-6">
          {faqs.map((faq, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="overflow-hidden rounded-3xl bg-white shadow-soft"
            >
              <button
                onClick={() => setOpenIndex(openIndex === idx ? null : idx)}
                className="flex w-full items-center justify-between p-8 text-left transition-colors hover:bg-gray-50"
              >
                <div className="flex items-center space-x-4">
                  <HelpCircle className="text-royal-gold" size={24} />
                  <span className="font-serif text-xl font-bold text-chocolate-brown">{faq.question}</span>
                </div>
                <motion.div
                  animate={{ rotate: openIndex === idx ? 180 : 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <ChevronDown className="text-gray-400" size={24} />
                </motion.div>
              </button>
              
              <AnimatePresence>
                {openIndex === idx && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="border-t border-gray-100 p-8 text-lg leading-relaxed text-gray-600">
                      {faq.answer}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
