
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { X, Mail, Lock, User, Compass, ArrowRight } from 'lucide-react';
import Logo from '../ui/Logo';

interface AuthModalProps {
  onClose: () => void;
  onSuccess: (user: any) => void;
}

const AuthModal: React.FC<AuthModalProps> = ({ onClose, onSuccess }) => {
  const [mode, setMode] = useState<'login' | 'signup'>('signup');
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
    type: 'student'
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    // Simulate API call
    setTimeout(() => {
      onSuccess({
        name: form.name || 'Demo User',
        email: form.email,
        uid: Math.random().toString(36).substr(2, 9)
      });
      setLoading(false);
    }, 1500);
  };

  return (
    <div className="fixed inset-0 z-[100] bg-[#0A0E27]/80 backdrop-blur-xl flex items-center justify-center p-6">
      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        className="bg-[#1A1F3A] border border-white/10 w-full max-w-md rounded-[40px] overflow-hidden shadow-[0_0_100px_rgba(2,195,154,0.1)] relative"
      >
        <button onClick={onClose} className="absolute top-6 right-6 p-2 rounded-full hover:bg-white/10 text-[#6B7A8F]">
          <X size={20} />
        </button>

        <div className="p-10">
          <div className="flex flex-col items-center mb-10">
            <Logo showText={false} size="lg" className="mb-4" />
            <h2 className="text-2xl font-bold">{mode === 'signup' ? 'Join CareerVision' : 'Welcome Back'}</h2>
            <p className="text-[#6B7A8F] text-sm text-center mt-2">Data-backed guidance is just a few clicks away.</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            {mode === 'signup' && (
              <div className="relative">
                <User className="absolute left-4 top-1/2 -translate-y-1/2 text-[#6B7A8F]" size={18} />
                <input
                  placeholder="Full Name"
                  required
                  className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-12 pr-4 focus:border-[#02C39A] outline-none"
                  value={form.name}
                  onChange={e => setForm({ ...form, name: e.target.value })}
                />
              </div>
            )}
            <div className="relative">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-[#6B7A8F]" size={18} />
              <input
                type="email"
                placeholder="Email Address"
                required
                className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-12 pr-4 focus:border-[#02C39A] outline-none"
                value={form.email}
                onChange={e => setForm({ ...form, email: e.target.value })}
              />
            </div>
            <div className="relative">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-[#6B7A8F]" size={18} />
              <input
                type="password"
                placeholder="Password"
                required
                className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-12 pr-4 focus:border-[#02C39A] outline-none"
                value={form.password}
                onChange={e => setForm({ ...form, password: e.target.value })}
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className={`w-full py-5 rounded-2xl font-black text-lg shadow-xl transition-all flex items-center justify-center space-x-2 ${loading ? "bg-white/10 animate-pulse" : "bg-[#02C39A] text-[#0A0E27] hover:shadow-[0_10px_30px_rgba(2,195,154,0.3)]"
                }`}
            >
              <span>{loading ? 'Processing...' : (mode === 'signup' ? 'Create Account' : 'Sign In')}</span>
              {!loading && <ArrowRight size={20} />}
            </button>
          </form>

          <div className="mt-8 text-center text-sm">
            <span className="text-[#6B7A8F]">{mode === 'signup' ? 'Already have an account?' : "Don't have an account?"}</span>
            <button
              onClick={() => setMode(mode === 'signup' ? 'login' : 'signup')}
              className="ml-2 text-[#02C39A] font-bold hover:underline"
            >
              {mode === 'signup' ? 'Log In' : 'Sign Up'}
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default AuthModal;
