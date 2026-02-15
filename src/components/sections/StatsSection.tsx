
import React, { useState, useEffect } from 'react';
import { motion, useScroll, useTransform, useInView } from 'framer-motion';
import { STATS } from '../../constants';

const Counter: React.FC<{ value: string; inView: boolean }> = ({ value, inView }) => {
  const [count, setCount] = useState(0);
  const numericValue = parseInt(value.replace(/[^0-9]/g, ''));
  const isPercent = value.includes('%');
  const isPlus = value.includes('+');

  useEffect(() => {
    if (inView) {
      let start = 0;
      const duration = 2000;
      const stepTime = Math.abs(Math.floor(duration / numericValue));
      
      const timer = setInterval(() => {
        start += Math.ceil(numericValue / 50);
        if (start >= numericValue) {
          setCount(numericValue);
          clearInterval(timer);
        } else {
          setCount(start);
        }
      }, 30);
      return () => clearInterval(timer);
    }
  }, [inView, numericValue]);

  return (
    <span className="text-5xl lg:text-7xl font-black">
      {count.toLocaleString()}
      {isPercent ? '%' : isPlus ? '+' : ''}
    </span>
  );
};

const StatsSection: React.FC = () => {
  const ref = React.useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.5 });

  return (
    <section ref={ref} className="py-32 px-6 lg:px-24 bg-[#050816] relative overflow-hidden">
      {/* Decorative Orbs */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-[#028090]/10 blur-[150px] rounded-full" />
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 relative z-10 max-w-7xl mx-auto">
        {STATS.map((stat, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ delay: i * 0.1 }}
            className="text-center"
          >
            <div className={`mb-4 ${stat.color} drop-shadow-[0_0_15px_rgba(2,195,154,0.3)]`}>
              <Counter value={stat.value} inView={isInView} />
            </div>
            <p className="text-[#B8C5D6] uppercase tracking-widest text-xs font-bold">{stat.label}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default StatsSection;
