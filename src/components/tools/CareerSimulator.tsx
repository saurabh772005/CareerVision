
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronRight, ArrowLeft, BrainCircuit, Sparkles, TrendingUp, ShieldCheck, Map, Clock, IndianRupee, BarChart3 } from 'lucide-react';
import { simulateCareerPath } from '../../lib/gemini-service';
import { CAREER_BENCHMARKS } from '../../constants';
import LoadingSpinner from '../ui/LoadingSpinner';

const CareerSimulator: React.FC = () => {
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [profile, setProfile] = useState({
    collegeType: 'tier3',
    branch: 'Computer Science',
    cgpa: 7.5,
    skills: '',
    goal: 'high-salary',
    timeline: 12,
    budget: 200000
  });
  const [results, setResults] = useState<any>(null);

  const calculateROI = (path: any) => {
    const cost = profile.budget;
    const initialSal = path.projectedInitialSalary;
    const year5Sal = path.year5Salary;
    // Total 5 year earnings (simplistic linear growth)
    const totalEarnings = (initialSal + year5Sal) / 2 * 5;
    const roi = ((totalEarnings - cost) / cost) * 100;
    return {
      roi: Math.round(roi),
      payback: Math.round((cost / initialSal) * 12)
    };
  };

  const handleSubmit = async () => {
    setLoading(true);
    try {
      const data = await simulateCareerPath(profile);
      setResults(data);
    } catch (err: any) {
      console.error("Simulator Error:", err);
      alert("Failed to run simulation. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const nextStep = () => setStep(s => s + 1);
  const prevStep = () => setStep(s => s - 1);

  if (results) {
    return (
      <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-3xl font-bold mb-2">ROI Simulation Complete</h2>
            <p className="text-[#B8C5D6]">Based on ₹{profile.budget.toLocaleString()} investment for {profile.branch} graduates.</p>
          </div>
          <button onClick={() => setResults(null)} className="flex items-center space-x-2 text-[#02C39A] hover:underline">
            <ArrowLeft size={16} />
            <span>Restart Simulation</span>
          </button>
        </div>

        <div className="bg-[#02C39A]/10 border border-[#02C39A]/20 p-6 rounded-3xl">
          <div className="flex items-start space-x-4">
            <BrainCircuit className="text-[#02C39A] shrink-0" size={24} />
            <div>
              <h4 className="text-[#02C39A] font-bold uppercase tracking-widest text-xs mb-2">AI Summary</h4>
              <p className="text-white text-lg leading-relaxed font-medium">{results.overallRecommendation}</p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pb-20">
          {results.rankedPaths.map((path: any, i: number) => {
            const roiData = calculateROI(path);
            return (
              <div key={i} className="bg-white/5 border border-white/10 rounded-3xl p-8 hover:border-[#02C39A]/40 transition-all group relative overflow-hidden flex flex-col">
                <div className="absolute top-0 right-0 p-4 bg-[#02C39A]/10 text-[#02C39A] font-bold rounded-bl-3xl">
                  {path.fitScore}% Fit
                </div>

                <h3 className="text-2xl font-bold mb-4 uppercase tracking-tight">{path.pathId.split('-').join(' ')}</h3>

                <div className="space-y-6 flex-grow">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-white/5 rounded-2xl p-4">
                      <div className="text-[10px] text-[#6B7A8F] font-bold uppercase mb-1">Projected ROI</div>
                      <div className="text-xl font-bold text-[#02FFC3]">{roiData.roi}%</div>
                    </div>
                    <div className="bg-white/5 rounded-2xl p-4">
                      <div className="text-[10px] text-[#6B7A8F] font-bold uppercase mb-1">Payback</div>
                      <div className="text-xl font-bold text-white">{roiData.payback} mo</div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <div className="flex justify-between text-xs mb-1">
                        <span className="text-[#6B7A8F]">Initial Salary</span>
                        <span className="text-white font-bold">₹{(path.projectedInitialSalary / 100000).toFixed(1)}L</span>
                      </div>
                      <div className="w-full h-1 bg-white/10 rounded-full">
                        <div className="h-full bg-teal-400 rounded-full" style={{ width: `${Math.min(path.projectedInitialSalary / 2000000 * 100, 100)}%` }} />
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between text-xs mb-1">
                        <span className="text-[#6B7A8F]">Year 5 Projection</span>
                        <span className="text-white font-bold">₹{(path.year5Salary / 100000).toFixed(1)}L</span>
                      </div>
                      <div className="w-full h-1 bg-white/10 rounded-full">
                        <div className="h-full bg-emerald-400 rounded-full" style={{ width: `${Math.min(path.year5Salary / 5000000 * 100, 100)}%` }} />
                      </div>
                    </div>
                  </div>

                  <div className="p-4 bg-teal-400/5 border border-teal-400/10 rounded-2xl">
                    <p className="text-xs text-[#B8C5D6] leading-relaxed italic">"{path.personalizedAdvice}"</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto py-12">
      <div className="text-center mb-12">
        <h2 className="text-4xl font-black mb-4 tracking-tight">Career Path & ROI Simulator</h2>
        <div className="flex items-center justify-center space-x-4">
          {[1, 2, 3].map(i => (
            <div key={i} className={`w-12 h-1 rounded-full transition-all duration-500 ${step >= i ? 'bg-[#02C39A]' : 'bg-white/10'}`} />
          ))}
        </div>
      </div>

      <div className="bg-[#1A1F3A]/60 backdrop-blur-xl border border-white/10 p-8 lg:p-12 rounded-[40px] shadow-2xl relative overflow-hidden">
        {loading ? (
          <div className="flex flex-col items-center justify-center py-20 space-y-8">
            <LoadingSpinner size="lg" text="Analyzing Profile & Calculating ROI..." />
          </div>
        ) : (
          <>
            {step === 1 && (
              <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-6">
                <div>
                  <label className="block text-xs font-bold text-[#6B7A8F] uppercase tracking-widest mb-3">Academic Tier</label>
                  <select
                    value={profile.collegeType}
                    onChange={e => setProfile({ ...profile, collegeType: e.target.value })}
                    className="w-full bg-white/5 border border-white/10 p-4 rounded-2xl focus:border-[#02C39A] outline-none text-white appearance-none"
                  >
                    <option value="tier1">Tier 1 (IIT/NIT/BITS)</option>
                    <option value="tier2">Tier 2 (Reputed Private/Govt)</option>
                    <option value="tier3">Tier 3 (Local College)</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-bold text-[#6B7A8F] uppercase tracking-widest mb-3">Engineering Branch</label>
                  <input
                    placeholder="e.g. CS, IT, ECE, Mechanical"
                    value={profile.branch}
                    onChange={e => setProfile({ ...profile, branch: e.target.value })}
                    className="w-full bg-white/5 border border-white/10 p-4 rounded-2xl focus:border-[#02C39A] outline-none text-white placeholder:text-white/20"
                  />
                </div>
                <button onClick={nextStep} className="w-full py-5 rounded-2xl bg-[#02C39A] text-[#0A0E27] font-bold text-lg hover:shadow-[0_10px_30px_rgba(2,195,154,0.3)] transition-all">
                  Next Step
                </button>
              </motion.div>
            )}

            {step === 2 && (
              <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-6">
                <div>
                  <label className="block text-xs font-bold text-[#6B7A8F] uppercase tracking-widest mb-3">Investment Budget (INR)</label>
                  <div className="relative">
                    <IndianRupee className="absolute left-4 top-1/2 -translate-y-1/2 text-[#6B7A8F]" size={18} />
                    <input
                      type="number"
                      value={profile.budget}
                      onChange={e => setProfile({ ...profile, budget: parseInt(e.target.value) })}
                      className="w-full bg-white/5 border border-white/10 py-4 pl-12 pr-4 rounded-2xl focus:border-[#02C39A] outline-none text-white"
                    />
                  </div>
                  <p className="text-[10px] text-[#6B7A8F] mt-2">Total budget for courses, MS, or MTech prep.</p>
                </div>
                <div>
                  <label className="block text-xs font-bold text-[#6B7A8F] uppercase tracking-widest mb-3">Current Skills</label>
                  <textarea
                    placeholder="Python, SQL, Soft Skills, etc."
                    rows={3}
                    value={profile.skills}
                    onChange={e => setProfile({ ...profile, skills: e.target.value })}
                    className="w-full bg-white/5 border border-white/10 p-4 rounded-2xl focus:border-[#02C39A] outline-none text-white"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <button onClick={prevStep} className="py-5 rounded-2xl bg-white/5 border border-white/10 font-bold hover:bg-white/10 transition-all">
                    Back
                  </button>
                  <button onClick={nextStep} className="py-5 rounded-2xl bg-[#02C39A] text-[#0A0E27] font-bold hover:shadow-[0_10px_30px_rgba(2,195,154,0.3)] transition-all">
                    Final Check
                  </button>
                </div>
              </motion.div>
            )}

            {step === 3 && (
              <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-6">
                <div>
                  <label className="block text-xs font-bold text-[#6B7A8F] uppercase tracking-widest mb-3">Ultimate Objective</label>
                  <select
                    value={profile.goal}
                    onChange={e => setProfile({ ...profile, goal: e.target.value })}
                    className="w-full bg-white/5 border border-white/10 p-4 rounded-2xl focus:border-[#02C39A] outline-none text-white appearance-none"
                  >
                    <option value="high-salary">Maximize 5-Year Earning (Highest ROI)</option>
                    <option value="job-security">Stable Govt/PSU Career</option>
                    <option value="abroad">Global Career (MS Abroad)</option>
                  </select>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <button onClick={prevStep} className="py-5 rounded-2xl bg-white/5 border border-white/10 font-bold hover:bg-white/10 transition-all">
                    Back
                  </button>
                  <button onClick={handleSubmit} className="py-5 rounded-2xl bg-gradient-to-r from-[#028090] to-[#02C39A] text-white font-black hover:shadow-[0_10px_30px_rgba(2,195,154,0.3)] transition-all flex items-center justify-center space-x-2">
                    <BarChart3 size={20} />
                    <span>Run ROI Simulation</span>
                  </button>
                </div>
              </motion.div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default CareerSimulator;
