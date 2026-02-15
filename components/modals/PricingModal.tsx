
import React from 'react';
import { motion } from 'framer-motion';
import { X, Check, Zap, Sparkles, ShieldCheck } from 'lucide-react';
import { PRICING_PLANS } from '../../constants';

interface PricingModalProps {
  onClose: () => void;
  onUpgrade: (plan: string) => void;
}

const PricingModal: React.FC<PricingModalProps> = ({ onClose, onUpgrade }) => {
  return (
    <div className="fixed inset-0 z-[100] bg-[#0A0E27]/90 backdrop-blur-2xl flex items-center justify-center p-6">
      <motion.div 
        initial={{ opacity: 0, scale: 0.9, y: 30 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        className="bg-[#1A1F3A] border border-white/10 w-full max-w-5xl rounded-[40px] overflow-hidden shadow-2xl relative flex flex-col max-h-[90vh]"
      >
        <button onClick={onClose} className="absolute top-6 right-6 p-2 rounded-full hover:bg-white/10 text-[#6B7A8F] z-20">
          <X size={24} />
        </button>

        <div className="p-12 overflow-y-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-black mb-4">Choose Your Growth Path</h2>
            <p className="text-[#B8C5D6] max-w-2xl mx-auto">Your trial ends soon. Upgrade now to unlock personalized roadmaps and 1:1 mentorship from verified alumni.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {PRICING_PLANS.map((plan) => (
              <div 
                key={plan.id}
                className={`relative p-8 rounded-[32px] border ${plan.highlight ? 'border-[#02C39A] bg-[#02C39A]/5' : 'border-white/10 bg-white/5'} flex flex-col transition-all hover:scale-[1.02]`}
              >
                {plan.highlight && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-[#02C39A] text-[#0A0E27] text-[10px] font-black uppercase tracking-widest">
                    Best for Placement
                  </div>
                )}
                
                <div className="mb-8">
                  <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
                  <div className="flex items-end space-x-2">
                    <span className="text-5xl font-black text-white">₹{plan.price}</span>
                    <span className="text-[#6B7A8F] font-bold mb-1">/ one-time</span>
                  </div>
                  <p className="text-sm text-[#B8C5D6] mt-4 leading-relaxed">{plan.description}</p>
                </div>

                <div className="space-y-4 mb-10 flex-grow">
                  {plan.features.map((feature, idx) => (
                    <div key={idx} className="flex items-start space-x-3">
                      <div className={`mt-0.5 p-0.5 rounded-full ${plan.highlight ? 'bg-[#02C39A] text-[#0A0E27]' : 'bg-white/10 text-white'}`}>
                        <Check size={12} />
                      </div>
                      <span className="text-sm text-[#B8C5D6]">{feature}</span>
                    </div>
                  ))}
                </div>

                <button 
                  onClick={() => onUpgrade(plan.id)}
                  className={`w-full py-5 rounded-2xl font-black text-lg transition-all flex items-center justify-center space-x-2 ${
                    plan.highlight 
                      ? 'bg-[#02C39A] text-[#0A0E27] hover:shadow-[0_10px_30px_rgba(2,195,154,0.4)]' 
                      : 'bg-white/5 border border-white/10 hover:bg-white/10'
                  }`}
                >
                  {plan.highlight ? <Sparkles size={20} /> : <Zap size={20} />}
                  <span>{plan.cta}</span>
                </button>
              </div>
            ))}
          </div>

          <div className="mt-12 text-center">
            <div className="inline-flex items-center space-x-3 px-6 py-3 rounded-2xl bg-white/5 border border-white/5">
              <ShieldCheck className="text-[#02C39A]" size={20} />
              <span className="text-xs font-bold text-[#6B7A8F] uppercase tracking-widest">Secure Payments • 24/7 Priority Support</span>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default PricingModal;
