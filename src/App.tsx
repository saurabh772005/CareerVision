
import React, { useState, useEffect } from 'react';
import HeroSection from './components/sections/HeroSection';
import ProblemSection from './components/sections/ProblemSection';
import FeaturesSection from './components/sections/FeaturesSection';
import StatsSection from './components/sections/StatsSection';
import Dashboard from './components/sections/Dashboard';
import Footer from './components/sections/Footer';
import { motion, useScroll, useSpring, AnimatePresence } from 'framer-motion';
import { X, Zap } from 'lucide-react';

// Tool Components
import CareerSimulator from './components/tools/CareerSimulator';
import CourseValidator from './components/tools/CourseValidator';
import RoadmapGenerator from './components/tools/RoadmapGenerator';
import AlumniDirectory from './components/tools/AlumniDirectory';
import CareerRecommendation from './components/tools/CareerRecommendation';
import CareerReport from './components/tools/CareerReport';
import MentorshipHub from './components/tools/MentorshipHub';
import ResourceLibrary from './components/tools/ResourceLibrary';
import CareerChatbot from './components/tools/CareerChatbot';
import AuthModal from './components/modals/AuthModal';
import PricingModal from './components/modals/PricingModal';
import Logo from './components/ui/Logo';

export type ActiveTool = 'simulator' | 'validator' | 'roadmap' | 'alumni' | 'recommendation' | 'jobs' | 'report' | 'mentorship' | 'resources' | 'none' | 'pricing';

const App: React.FC = () => {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  const [activeTool, setActiveTool] = useState<ActiveTool>('none');
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [showPricingModal, setShowPricingModal] = useState(false);
  const [user, setUser] = useState<{ name: string; email: string; uid: string; plan?: string } | null>(null);

  // Load user from local storage
  useEffect(() => {
    const savedUser = localStorage.getItem('career_compass_user');
    if (savedUser) setUser(JSON.parse(savedUser));
  }, []);

  const handleToolClick = (tool: ActiveTool) => {
    if (tool === 'pricing') {
      setShowPricingModal(true);
      return;
    }
    if (!user) {
      setShowAuthModal(true);
      return;
    }
    setActiveTool(tool);
    document.body.style.overflow = tool === 'none' ? 'auto' : 'hidden';
  };

  const handleUpgrade = (plan: string) => {
    if (user) {
      const updatedUser = { ...user, plan };
      setUser(updatedUser);
      localStorage.setItem('career_compass_user', JSON.stringify(updatedUser));
    }
    setShowPricingModal(false);
    alert(`Success! You have upgraded to the ${plan} plan.`);
  };

  const handleLogout = () => {
    localStorage.removeItem('career_compass_user');
    setUser(null);
  };

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="relative bg-[#0A0E27] text-white selection:bg-[#02C39A] selection:text-[#0A0E27]">
      {/* Custom Progress Bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-[#02C39A] z-[100] origin-left"
        style={{ scaleX }}
      />

      {/* Navigation */}
      <nav className="fixed top-4 left-1/2 -translate-x-1/2 z-50 flex items-center justify-between w-[92%] max-w-7xl px-8 py-4 bg-white/10 backdrop-blur-2xl border border-white/20 rounded-[2rem] shadow-2xl transition-all">
        <div className="cursor-pointer" onClick={() => { setActiveTool('none'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}>
          <Logo lightText size="md" />
        </div>

        <div className="hidden md:flex items-center space-x-10 text-sm font-semibold text-white/80">
          <button onClick={() => scrollToSection('about')} className="hover:text-white transition-colors">About</button>
          <button onClick={() => scrollToSection('tools')} className="hover:text-white transition-colors">Tools</button>
          <button onClick={() => scrollToSection('impact')} className="hover:text-white transition-colors">Impact</button>
          <button onClick={() => setShowPricingModal(true)} className="text-[#02C39A] hover:text-[#02FFC3] flex items-center space-x-1.5 font-bold">
            <Zap size={14} />
            <span>Pricing</span>
          </button>
        </div>

        <div className="flex items-center space-x-6">
          {user ? (
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/10">
                <div className="w-6 h-6 rounded-full bg-[#007AFF] flex items-center justify-center text-[10px] text-white font-bold">
                  {user.name.charAt(0)}
                </div>
                <span className="text-white text-xs">{user.name.split(' ')[0]}</span>
                {user.plan === 'pro' && <div className="text-[8px] bg-[#02C39A] text-[#0A0E27] px-1.5 rounded-sm font-black uppercase">Pro</div>}
              </div>
              <button
                onClick={handleLogout}
                className="text-xs text-white/50 hover:text-white transition-colors"
              >
                Logout
              </button>
            </div>
          ) : (
            <>
              <button
                onClick={() => setShowAuthModal(true)}
                className="text-sm font-bold text-white/80 hover:text-white transition-all hidden sm:block"
              >
                Create Account
              </button>
              <button
                onClick={() => setShowAuthModal(true)}
                className="px-6 py-2.5 rounded-full bg-[#007AFF] text-white font-bold text-sm hover:bg-[#0056B3] transition-all shadow-lg shadow-blue-500/20"
              >
                Sign In
              </button>
            </>
          )}
        </div>
      </nav>

      {/* Main Content */}
      <main>
        <AnimatePresence mode="wait">
          {user ? (
            <Dashboard key="dashboard" user={user} onToolClick={handleToolClick} />
          ) : (
            <motion.div
              key="landing"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
            >
              <HeroSection onStart={() => setShowAuthModal(true)} />
              <div className="relative z-10">
                <div id="about">
                  <ProblemSection />
                </div>
                <div className="h-40 bg-gradient-to-b from-[#050816] to-[#0A0E27]" />
                <div id="tools">
                  <FeaturesSection onToolClick={handleToolClick} />
                </div>
                <div id="impact">
                  <StatsSection />
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      <Footer />

      {/* Tools Overlays */}
      <AnimatePresence>
        {activeTool !== 'none' && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[60] bg-[#0A0E27] overflow-y-auto"
          >
            <div className="min-h-screen p-6 lg:p-12 relative pt-24">
              <button
                onClick={() => setActiveTool('none')}
                className="fixed top-8 right-8 z-[70] p-3 rounded-full bg-white/5 border border-white/10 text-white hover:bg-white/10 transition-all"
              >
                <X size={24} />
              </button>

              <div className="max-w-7xl mx-auto">
                {activeTool === 'simulator' && <CareerSimulator />}
                {activeTool === 'validator' && <CourseValidator />}
                {activeTool === 'roadmap' && <RoadmapGenerator />}
                {activeTool === 'alumni' && <AlumniDirectory />}
                {activeTool === 'recommendation' && <CareerRecommendation />}
                {activeTool === 'report' && <CareerReport />}
                {activeTool === 'mentorship' && <MentorshipHub />}
                {activeTool === 'resources' && <ResourceLibrary />}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Global Chatbot */}
      {user && <CareerChatbot />}

      {/* Modals */}
      <AnimatePresence>
        {showAuthModal && (
          <AuthModal
            onClose={() => setShowAuthModal(false)}
            onSuccess={(userData) => {
              setUser(userData);
              localStorage.setItem('career_compass_user', JSON.stringify(userData));
              setShowAuthModal(false);
            }}
          />
        )}
        {showPricingModal && (
          <PricingModal
            onClose={() => setShowPricingModal(false)}
            onUpgrade={handleUpgrade}
          />
        )}
      </AnimatePresence>
    </div>
  );
};

export default App;
