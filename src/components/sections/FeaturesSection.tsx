
import React from 'react';
import { motion } from 'framer-motion';
import GlassCard from '../ui/GlassCard';
import { FEATURES } from '../../constants';
import * as Icons from 'lucide-react';
import { ActiveTool } from '../../App';

interface FeaturesSectionProps {
  onToolClick: (tool: ActiveTool) => void;
}

const FeaturesSection: React.FC<FeaturesSectionProps> = ({ onToolClick }) => {
  return (
    <section className="py-24 px-6 lg:px-24 bg-[#0A0E27] relative">
      {/* Grid Pattern Background */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]" />
      
      <div className="text-center mb-16">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-4xl lg:text-6xl font-bold mb-6"
        >
          8 Tools. One Platform. <br />
          <span className="bg-gradient-to-r from-teal-400 to-emerald-500 bg-clip-text text-transparent">Infinite Clarity.</span>
        </motion.h2>
        <p className="text-[#B8C5D6] max-w-2xl mx-auto text-lg">
          The most comprehensive career intelligence toolkit ever built for the Indian ecosystem.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto relative z-10">
        {FEATURES.map((feature, i) => {
          // Dynamic icon mapping
          const IconComponent = (Icons as any)[feature.icon.charAt(0).toUpperCase() + feature.icon.slice(1)] || Icons.HelpCircle;
          
          return (
            <GlassCard key={i} delay={i * 0.05} className="flex flex-col h-full cursor-pointer" onClick={() => onToolClick(feature.icon as ActiveTool)}>
              <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${feature.gradient} flex items-center justify-center mb-6 shadow-lg shadow-teal-900/20 group-hover:scale-110 transition-transform`}>
                <Icons.Sparkles size={20} className="text-white" />
              </div>
              <h3 className="text-xl font-bold mb-3 text-white">{feature.title}</h3>
              <p className="text-[#B8C5D6] text-sm leading-relaxed mb-6 flex-grow">{feature.description}</p>
              <button className="flex items-center space-x-2 text-[#02C39A] text-sm font-semibold hover:translate-x-1 transition-transform">
                <span>Explore Tool</span>
                <Icons.ChevronRight size={16} />
              </button>
            </GlassCard>
          );
        })}
      </div>
    </section>
  );
};

export default FeaturesSection;
