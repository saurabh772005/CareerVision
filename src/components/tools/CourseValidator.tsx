
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Search, ShieldCheck, Star, Clock, IndianRupee, ExternalLink, Activity, X, Link } from 'lucide-react';
import { validateCourseAI } from '../../lib/gemini-service';
import LoadingSpinner from '../ui/LoadingSpinner';

const CourseValidator: React.FC = () => {
  const [courses, setCourses] = useState<any[]>([]);
  const [search, setSearch] = useState('');
  const [customCourse, setCustomCourse] = useState({ name: '', url: '', price: '' });
  const [analyzing, setAnalyzing] = useState<string | null>(null);
  const [analysis, setAnalysis] = useState<any>(null);

  useEffect(() => {
    setCourses([
      { id: '1', name: 'Full Stack MERN Bootcamp', provider: 'EdTech Pro', type: 'bootcamp', rating: 4.8, price: 50000 },
      { id: '2', name: 'Advanced Data Science', provider: 'Course Academy', type: 'degree', rating: 4.5, price: 120000 },
      { id: '3', name: 'UI/UX Design Masterclass', provider: 'Design School', type: 'online-course', rating: 4.9, price: 15000 },
    ]);
  }, []);

  const handleAnalyze = async (course: any) => {
    setAnalyzing(course.id || 'custom');
    try {
      const userProfile = JSON.parse(localStorage.getItem('career_compass_user') || '{"collegeType":"tier3","cgpa":7.5,"skills":"HTML, CSS"}');
      const data = await validateCourseAI(course, userProfile);
      setAnalysis(data);
    } catch (err) {
      console.error(err);
      alert("AI Validation failed. Check API key.");
    } finally {
      setAnalyzing(null);
    }
  };

  const filtered = courses.filter(c => c.name.toLowerCase().includes(search.toLowerCase()));

  return (
    <div className="space-y-12 pb-20">
      {analyzing && (
        <div className="fixed inset-0 z-[90] bg-[#0A0E27]/80 backdrop-blur-sm flex items-center justify-center">
          <LoadingSpinner size="lg" text="Validating Course Fit..." />
        </div>
      )}
      <div className="text-center">
        <h2 className="text-4xl font-bold mb-4">Course Validator</h2>
        <p className="text-[#6B7A8F] max-w-xl mx-auto">Input any course name or link to check if it's worth your time and money.</p>
      </div>

      {/* Custom Input Section */}
      <div className="bg-[#1A1F3A]/60 backdrop-blur-xl border border-[#02C39A]/30 p-8 rounded-[40px] max-w-4xl mx-auto shadow-2xl">
        <h3 className="text-xl font-bold mb-6 flex items-center space-x-2 text-[#02C39A]">
          <Link size={20} />
          <span>Validate Custom Course</span>
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <input
            placeholder="Course Name (e.g. AlmaBetter Pro)"
            className="bg-white/5 border border-white/10 rounded-2xl px-4 py-4 text-sm focus:border-[#02C39A] outline-none"
            value={customCourse.name}
            onChange={e => setCustomCourse({ ...customCourse, name: e.target.value })}
          />
          <input
            placeholder="Course URL (Optional)"
            className="bg-white/5 border border-white/10 rounded-2xl px-4 py-4 text-sm focus:border-[#02C39A] outline-none"
            value={customCourse.url}
            onChange={e => setCustomCourse({ ...customCourse, url: e.target.value })}
          />
          <button
            onClick={() => handleAnalyze({ name: customCourse.name, url: customCourse.url, price: 50000 })}
            disabled={!customCourse.name || analyzing === 'custom'}
            className="bg-[#02C39A] text-[#0A0E27] font-black rounded-2xl py-4 hover:shadow-[0_10px_30px_rgba(2,195,154,0.3)] transition-all disabled:opacity-50 disabled:animate-pulse"
          >
            {analyzing === 'custom' ? 'AI Analyzing...' : 'Validate Now'}
          </button>
        </div>
      </div>

      <div className="relative max-w-2xl mx-auto">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-[#6B7A8F]" size={20} />
        <input
          placeholder="Or search verified catalog..."
          className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-12 pr-4 focus:border-[#02C39A] outline-none"
          value={search}
          onChange={e => setSearch(e.target.value)}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filtered.map((course) => (
          <div key={course.id} className="bg-[#1A1F3A]/60 backdrop-blur-md border border-white/10 rounded-3xl p-6 hover:border-[#02C39A]/40 transition-all flex flex-col">
            <div className="flex items-center justify-between mb-4">
              <span className="text-[10px] font-black uppercase tracking-widest px-2 py-1 bg-[#02C39A]/10 text-[#02C39A] rounded-lg">{course.type}</span>
              <div className="flex items-center space-x-1 text-yellow-400">
                <Star size={12} fill="currentColor" />
                <span className="text-xs font-bold">{course.rating}</span>
              </div>
            </div>

            <h3 className="text-xl font-bold mb-1">{course.name}</h3>
            <p className="text-[#6B7A8F] text-sm mb-6">{course.provider}</p>

            <div className="space-y-3 mb-8 flex-grow">
              <div className="flex items-center justify-between text-sm">
                <span className="text-[#6B7A8F]">Investment:</span>
                <span className="text-white font-bold">₹{course.price.toLocaleString()}</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-[#6B7A8F]">Placement Support:</span>
                <span className="text-teal-400 font-bold">Verified</span>
              </div>
            </div>

            <button
              onClick={() => handleAnalyze(course)}
              disabled={analyzing === course.id}
              className={`w-full py-4 rounded-xl font-bold text-sm transition-all flex items-center justify-center space-x-2 ${analyzing === course.id ? "bg-white/10 animate-pulse text-[#02C39A]" : "bg-white/5 border border-white/10 hover:bg-[#02C39A] hover:text-[#0A0E27]"
                }`}
            >
              <Activity size={16} />
              <span>{analyzing === course.id ? "AI Validating..." : "Validate Fit Score"}</span>
            </button>
          </div>
        ))}
      </div>

      {analysis && (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="fixed inset-0 z-[80] bg-[#0A0E27]/90 backdrop-blur-xl flex items-center justify-center p-6"
        >
          <div className="bg-[#1A1F3A] border border-white/10 w-full max-w-2xl rounded-[40px] p-10 relative overflow-y-auto max-h-[90vh]">
            <button onClick={() => setAnalysis(null)} className="absolute top-6 right-6 p-2 rounded-full hover:bg-white/10">
              <X size={20} />
            </button>



            <div className="text-center mb-8">
              <div className="w-24 h-24 rounded-full bg-gradient-to-br from-[#028090] to-[#02C39A] flex items-center justify-center mx-auto mb-4 shadow-[0_0_30px_rgba(2,195,154,0.4)]">
                <span className="text-3xl font-black text-white">{analysis.fitScore}%</span>
              </div>
              <h4 className="text-2xl font-bold uppercase tracking-tight">AI Validation Result</h4>
              <p className="text-[#6B7A8F] text-sm mt-2">Personalized course-to-profile alignment</p>
            </div>

            <div className="space-y-6">
              <div className="bg-white/5 p-6 rounded-2xl border border-[#02C39A]/20">
                <div className="text-[10px] text-teal-400 font-bold uppercase mb-2 tracking-widest">AI Verdict</div>
                <p className="text-white leading-relaxed text-sm font-medium">{analysis.aiRecommendation}</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 bg-emerald-400/5 rounded-2xl border border-emerald-400/10">
                  <div className="text-[10px] text-emerald-400 font-bold uppercase mb-2">Key Strengths</div>
                  <ul className="text-xs text-[#B8C5D6] space-y-2">
                    {analysis.pros.map((p: string, i: number) => <li key={i}>• {p}</li>)}
                  </ul>
                </div>
                <div className="p-4 bg-red-400/5 rounded-2xl border border-red-400/10">
                  <div className="text-[10px] text-red-400 font-bold uppercase mb-2">Potential Risks</div>
                  <ul className="text-xs text-[#B8C5D6] space-y-2">
                    {analysis.cons.map((c: string, i: number) => <li key={i}>• {c}</li>)}
                  </ul>
                </div>
              </div>

              <div className="p-6 bg-[#02FFC3]/10 rounded-2xl border border-[#02FFC3]/20 flex justify-around">
                <div className="text-center">
                  <div className="text-[10px] text-[#6B7A8F] font-bold uppercase mb-1">ROI Potential</div>
                  <div className="text-xl font-black text-[#02FFC3]">+{analysis.roiEstimate.expectedSalaryIncrease}%</div>
                </div>
                <div className="text-center">
                  <div className="text-[10px] text-[#6B7A8F] font-bold uppercase mb-1">Payback Period</div>
                  <div className="text-xl font-black text-white">{analysis.roiEstimate.breakEvenMonths} Months</div>
                </div>
              </div>

              <button onClick={() => setAnalysis(null)} className="w-full py-4 rounded-2xl bg-[#02C39A] text-[#0A0E27] font-black hover:shadow-[0_10px_30px_rgba(2,195,154,0.3)] transition-all">
                Close Analysis
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default CourseValidator;
