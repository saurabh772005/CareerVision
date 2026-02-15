
import React from 'react';
import { motion } from 'framer-motion';

interface GlassCardProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  // Added onClick prop to handle click events
  onClick?: () => void;
}

const GlassCard: React.FC<GlassCardProps> = ({ children, className = "", delay = 0, onClick }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay }}
      viewport={{ once: true }}
      whileHover={{ y: -5, transition: { duration: 0.2 } }}
      // Pass the onClick prop to the motion.div
      onClick={onClick}
      className={`relative group overflow-hidden rounded-3xl bg-[#1A1F3A]/60 backdrop-blur-xl border border-white/10 p-8 shadow-2xl transition-all hover:border-[#02C39A]/40 ${className}`}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
      <div className="relative z-10">
        {children}
      </div>
    </motion.div>
  );
};

export default GlassCard;
