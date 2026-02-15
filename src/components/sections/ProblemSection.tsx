
import React from 'react';
import { motion } from 'framer-motion';
import GlassCard from '../ui/GlassCard';
import { PROBLEM_CARDS } from '../../constants';
import { AlertCircle, TrendingDown, Clock, HelpCircle } from 'lucide-react';

const icons: Record<string, React.ReactNode> = {
  roads: <HelpCircle className="text-red-400" size={32} />,
  noise: <Clock className="text-orange-400" size={32} />,
  money: <TrendingDown className="text-red-400" size={32} />,
  alone: <AlertCircle className="text-purple-400" size={32} />,
};

const ProblemSection: React.FC = () => {
  return (
    <section className="py-24 px-6 lg:px-24 bg-[#050816] relative overflow-hidden">
      <div className="absolute top-0 right-0 w-[30%] h-[30%] bg-red-500/5 blur-[120px] rounded-full pointer-events-none" />
      
      <div className="text-center mb-16 relative z-10">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-4xl lg:text-6xl font-bold mb-6"
        >
          Every Student Faces <br />
          <span className="text-[#02C39A]">These Hardships.</span>
        </motion.h2>
        <motion.div 
          initial={{ width: 0 }}
          whileInView={{ width: "100px" }}
          transition={{ duration: 1, delay: 0.5 }}
          className="h-1 bg-[#02C39A] mx-auto rounded-full"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto">
        {PROBLEM_CARDS.map((problem, i) => (
          <GlassCard key={i} delay={i * 0.1} className={`bg-gradient-to-br ${problem.gradient}`}>
            <div className="flex items-start space-x-6">
              <div className="p-4 rounded-2xl bg-white/5 border border-white/10">
                {icons[problem.icon]}
              </div>
              <div>
                <h3 className="text-2xl font-bold mb-3 text-white">{problem.title}</h3>
                <p className="text-[#B8C5D6] mb-6 leading-relaxed">{problem.description}</p>
                <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-red-500/10 border border-red-500/20">
                  <span className="text-xs font-bold text-red-400">{problem.stat}</span>
                </div>
              </div>
            </div>
          </GlassCard>
        ))}
      </div>
    </section>
  );
};

export default ProblemSection;
