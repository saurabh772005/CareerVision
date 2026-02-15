
import React from 'react';
import { motion } from 'framer-motion';
import { Users, TrendingUp, Sparkles, Play, BarChart3 } from 'lucide-react';

interface HeroSectionProps {
  onStart: () => void;
}

const PARTNER_LOGOS = [
  "coursera", "Google", "udemy", "Microsoft", "IBM"
];

const HeroSection: React.FC<HeroSectionProps> = ({ onStart }) => {
  return (
    <section className="relative min-h-screen w-full flex flex-col lg:flex-row items-center justify-between px-6 lg:px-24 pt-32 pb-20 overflow-hidden bg-[#0A0E27]">
      {/* Background Decorative Elements */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
        <div className="absolute top-[-10%] left-[-5%] w-[40%] h-[40%] bg-[#0047FF]/10 blur-[150px] rounded-full" />
        <div className="absolute bottom-[-10%] right-[-5%] w-[40%] h-[40%] bg-[#02C39A]/10 blur-[150px] rounded-full" />
      </div>

      {/* Left Content */}
      <div className="relative z-20 w-full lg:w-1/2 flex flex-col items-center lg:items-start text-center lg:text-left">
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          className="inline-flex items-center space-x-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 mb-8"
        >
          <div className="w-5 h-5 rounded-full bg-[#007AFF]/20 flex items-center justify-center">
            <Users size={12} className="text-[#007AFF]" />
          </div>
          <span className="text-xs font-semibold text-[#B8C5D6] tracking-tight">Trusted by 20,000+ Happy Learners</span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-5xl lg:text-7xl font-bold tracking-tight mb-6 leading-[1.1]"
        >
          Elevate Your <br />
          Career Choice <br />
          <span className="text-[#007AFF]">
            With AI Logic
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-lg text-[#B8C5D6] max-w-lg mb-10 leading-relaxed font-light"
        >
          Stop guessing your future. CareerVision uses verified placement data and predictive AI to map your most profitable career path.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="flex flex-col sm:flex-row items-center gap-4 mb-16"
        >
          <button
            onClick={onStart}
            className="w-full sm:w-auto bg-[#007AFF] hover:bg-[#0056B3] text-white px-10 py-5 rounded-2xl font-black text-lg transition-all active:scale-95 shadow-xl shadow-blue-500/20 flex items-center justify-center space-x-2"
          >
            <Sparkles size={20} />
            <span>Start Free Trial</span>
          </button>

          <button
            onClick={onStart}
            className="w-full sm:w-auto bg-white/5 hover:bg-white/10 text-white px-10 py-5 rounded-2xl font-bold text-lg transition-all active:scale-95 border border-white/10 flex items-center justify-center space-x-2"
          >
            <Play size={18} fill="currentColor" />
            <span>Watch Demo</span>
          </button>
        </motion.div>

        {/* Partner Logos */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="flex flex-wrap items-center justify-center lg:justify-start gap-8 opacity-40 grayscale hover:grayscale-0 hover:opacity-100 transition-all duration-500"
        >
          {PARTNER_LOGOS.map((logo, i) => (
            <span key={i} className="text-xl font-black tracking-tighter text-[#B8C5D6] uppercase italic select-none">
              {logo}
            </span>
          ))}
        </motion.div>
      </div>

      {/* Right Content: The Visual Composition inspired by the image */}
      <div className="relative w-full lg:w-1/2 flex items-center justify-center h-[600px] lg:h-[750px] mt-16 lg:mt-0">

        {/* Background Layer: Concentric Rings & Glow */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          {/* Main Orange Circle Backdrop */}
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="relative w-[380px] h-[380px] lg:w-[480px] lg:h-[480px] rounded-full bg-gradient-to-br from-[#FFB800] via-[#FFD700] to-[#E5A000] flex items-center justify-center shadow-[0_0_100px_rgba(255,184,0,0.15)]"
          >
            {/* Dark Overlay Rings */}
            <div className="absolute inset-0 border-[1.5px] border-black/10 rounded-full scale-[1.15]" />
            <div className="absolute inset-0 border-[1.5px] border-black/10 rounded-full scale-[1.3]" />
            <div className="absolute inset-0 border-[1.5px] border-black/10 rounded-full scale-[1.45]" />
          </motion.div>
        </div>

        {/* Floating Decorative Spheres */}
        <motion.div
          animate={{ y: [0, -30, 0], x: [0, 10, 0] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-[18%] right-[15%] w-8 h-8 bg-orange-400 rounded-full shadow-[0_10px_20px_rgba(251,146,60,0.4)]"
        />
        <motion.div
          animate={{ y: [0, 20, 0], x: [0, -15, 0] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut", delay: 1 }}
          className="absolute top-[10%] right-[25%] w-4 h-4 bg-orange-300 rounded-full opacity-60"
        />

        {/* Central Character: Student Figure */}
        <motion.div
          initial={{ y: 60, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
          className="relative z-10 w-[450px] h-[600px] lg:w-[550px] lg:h-[700px] flex items-end justify-center overflow-hidden"
        >
          <img
            src="https://images.unsplash.com/photo-1523240795612-9a054b0db644?q=80&w=800&auto=format&fit=crop"
            alt="Career Success Student"
            className="w-full h-full object-contain pointer-events-none transform translate-y-10 filter drop-shadow-[0_20px_50px_rgba(0,0,0,0.6)]"
          />
        </motion.div>

        {/* Floating UI Card: Stats (Top Left) */}
        <motion.div
          initial={{ opacity: 0, x: -30, y: 0 }}
          // Fix: Combined duplicate 'animate' and 'transition' props into single objects to prevent JSX attribute name collisions.
          animate={{
            opacity: 1,
            x: 0,
            y: [0, -15, 0],
          }}
          transition={{
            opacity: { delay: 0.8, duration: 0.8 },
            x: { delay: 0.8, duration: 0.8 },
            y: { duration: 4, repeat: Infinity, ease: "easeInOut", delay: 0.8 }
          }}
          className="absolute top-[22%] left-[5%] lg:left-[10%] z-20 bg-[#1A1F3A]/90 backdrop-blur-2xl border border-white/10 p-5 rounded-2xl shadow-2xl flex items-center space-x-4 min-w-[210px]"
        >
          <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center p-0.5">
            <div className="w-full h-full rounded-full bg-gradient-to-tr from-orange-400 to-orange-600 flex items-center justify-center text-white">
              <Users size={20} />
            </div>
          </div>
          <div>
            <div className="text-2xl font-black text-white leading-tight">175K</div>
            <div className="text-[10px] font-bold text-[#B8C5D6] uppercase tracking-wider">Assisted Students</div>
          </div>
        </motion.div>

        {/* Floating UI Card: Learning Chart (Bottom Left) */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          // Fix: Combined duplicate 'animate' and 'transition' props. Using keyframes for 'y' allows for both the entrance and continuous floating behavior.
          animate={{
            opacity: 1,
            y: [30, 0, 15, 0],
          }}
          transition={{
            opacity: { delay: 1, duration: 0.8 },
            y: { duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }
          }}
          className="absolute bottom-[20%] left-[2%] lg:left-[5%] z-20 bg-[#1A1F3A]/95 backdrop-blur-2xl border border-white/10 p-6 rounded-[2.5rem] shadow-[0_30px_60px_rgba(0,0,0,0.5)] min-w-[320px]"
        >
          <div className="text-sm font-bold text-white mb-6 flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <BarChart3 size={18} className="text-[#02C39A]" />
              <span className="tracking-tight">Learning Chart</span>
            </div>
            <div className="flex space-x-1">
              <div className="w-1.5 h-1.5 rounded-full bg-white/20" />
              <div className="w-1.5 h-1.5 rounded-full bg-white/20" />
            </div>
          </div>

          {/* Chart Content */}
          <div className="relative h-32 flex items-end justify-between px-2">
            {/* Dotted Grid Background */}
            <div className="absolute inset-0 border-b border-white/5 flex flex-col justify-between">
              <div className="w-full border-t border-white/5 border-dashed" />
              <div className="w-full border-t border-white/5 border-dashed" />
              <div className="w-full border-t border-white/5 border-dashed" />
            </div>

            {/* Animated Bars */}
            {[
              { h: '45%', color: 'bg-[#FF6B6B]', delay: 1.2 },
              { h: '75%', color: 'bg-[#4DABF7]', delay: 1.3 },
              { h: '35%', color: 'bg-[#02C39A]', delay: 1.4 },
              { h: '85%', color: 'bg-[#FF922B]', delay: 1.5 },
              { h: '60%', color: 'bg-[#845EF7]', delay: 1.6 },
            ].map((bar, i) => (
              <motion.div
                key={i}
                initial={{ height: 0 }}
                animate={{ height: bar.h }}
                transition={{ delay: bar.delay, duration: 1, ease: "easeOut" }}
                className={`w-4 lg:w-6 rounded-t-full rounded-b-full ${bar.color} shadow-lg shadow-black/20`}
              />
            ))}
          </div>

          <div className="flex justify-between mt-4 px-1">
            <span className="text-[9px] font-bold text-white/30 tracking-widest uppercase">7K</span>
            <span className="text-[9px] font-bold text-white/30 tracking-widest uppercase">15K</span>
            <span className="text-[9px] font-bold text-white/30 tracking-widest uppercase">23K</span>
          </div>
        </motion.div>

        {/* Subtle Decorative Elements */}
        <div className="absolute inset-0 pointer-events-none opacity-20">
          <div className="absolute top-[20%] left-[20%] w-[300px] h-[300px] border border-white/10 rounded-full animate-ping [animation-duration:10s]" />
          <div className="absolute bottom-[20%] right-[20%] w-[400px] h-[400px] border border-white/10 rounded-full animate-ping [animation-duration:15s]" />
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
