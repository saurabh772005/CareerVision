
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  FileText, 
  TrendingUp, 
  Clock, 
  Zap, 
  ShieldCheck, 
  Target, 
  BrainCircuit, 
  Download, 
  Share2, 
  IndianRupee,
  BarChart4,
  ArrowUpRight,
  ChevronRight,
  AlertTriangle
} from 'lucide-react';
import { generateFullCareerReportAI } from '../../lib/gemini-service';

const CareerReport: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [report, setReport] = useState<any>(null);

  useEffect(() => {
    const fetchReport = async () => {
      const profile = JSON.parse(localStorage.getItem('career_compass_user') || '{}');
      // Mock data in case user profile is thin, but use AI service
      try {
        const data = await generateFullCareerReportAI({
          collegeType: profile.collegeType || 'tier3',
          branch: profile.branch || 'Engineering',
          cgpa: profile.cgpa || 7.5,
          budget: profile.budget || 200000,
          goal: profile.goal || 'Maximizing Salary',
          knowledgeLevel: profile.knowledgeLevel || 'Intermediate'
        });
        setReport(data);
      } catch (err) {
        console.error("Report Generation Error:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchReport();
  }, []);

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center py-32 space-y-8 max-w-4xl mx-auto">
        <div className="relative">
          <motion.div 
            animate={{ rotate: 360 }}
            transition={{ repeat: Infinity, duration: 3, ease: "linear" }}
            className="w-24 h-24 border-b-2 border-teal-400 rounded-full"
          />
          <div className="absolute inset-0 flex items-center justify-center text-teal-400">
             <FileText size={32} />
          </div>
        </div>
        <div className="text-center">
          <h3 className="text-2xl font-bold mb-2">Synthesizing Your Career DNA</h3>
          <p className="text-[#6B7A8F] animate-pulse italic">Aggregating market data, placement stats, and AI projections...</p>
        </div>
      </div>
    );
  }

  if (!report) return null;

  return (
    <div className="max-w-5xl mx-auto py-12 pb-24 px-4 space-y-12 animate-in fade-in duration-1000">
      {/* Report Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between border-b border-white/10 pb-10 gap-8">
        <div>
          <div className="flex items-center space-x-2 text-[#02C39A] mb-3">
             <ShieldCheck size={18} />
             <span className="text-xs font-black uppercase tracking-widest">Verified AI Intelligence</span>
          </div>
          <h1 className="text-5xl font-black tracking-tighter">CAREER STRATEGY REPORT</h1>
          <p className="text-[#6B7A8F] mt-2 font-medium">Issue Date: {new Date().toLocaleDateString()} • ID: CC-{Math.random().toString(36).substr(2, 6).toUpperCase()}</p>
        </div>
        <div className="flex space-x-3">
           <button className="p-3 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition-all text-[#B8C5D6]">
              <Share2 size={20} />
           </button>
           <button className="flex items-center space-x-2 px-6 py-3 rounded-xl bg-[#02C39A] text-[#0A0E27] font-bold hover:shadow-[0_0_20px_rgba(2,195,154,0.3)] transition-all">
              <Download size={18} />
              <span>Export PDF</span>
           </button>
        </div>
      </div>

      {/* Executive Summary */}
      <section className="bg-gradient-to-br from-[#1A1F3A] to-[#0A0E27] border border-white/10 rounded-[40px] p-10">
        <h3 className="text-sm font-black text-[#02C39A] uppercase tracking-[0.3em] mb-6">Executive Summary</h3>
        <p className="text-xl text-white leading-relaxed font-medium">
          {report.executiveSummary}
        </p>
      </section>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
         <div className="bg-white/5 border border-white/10 p-8 rounded-[32px]">
            <div className="text-[#6B7A8F] text-[10px] font-bold uppercase tracking-widest mb-2">Market Outlook</div>
            <div className="text-3xl font-black text-emerald-400">+{report.marketOutlook}%</div>
            <p className="text-[10px] text-[#B8C5D6] mt-1">Growth Forecast 2026</p>
         </div>
         <div className="bg-white/5 border border-white/10 p-8 rounded-[32px]">
            <div className="text-[#6B7A8F] text-[10px] font-bold uppercase tracking-widest mb-2">Technical Debt</div>
            <div className="text-3xl font-black text-red-400">{report.skillGapAnalysis.length} Gaps</div>
            <p className="text-[10px] text-[#B8C5D6] mt-1">Skills to Acquire</p>
         </div>
         <div className="bg-white/5 border border-white/10 p-8 rounded-[32px]">
            <div className="text-[#6B7A8F] text-[10px] font-bold uppercase tracking-widest mb-2">Break-Even</div>
            <div className="text-3xl font-black text-[#02FFC3]">{report.roiAnalysis.breakEvenMonths} Mo</div>
            <p className="text-[10px] text-[#B8C5D6] mt-1">ROI Realization</p>
         </div>
         <div className="bg-white/5 border border-white/10 p-8 rounded-[32px]">
            <div className="text-[#6B7A8F] text-[10px] font-bold uppercase tracking-widest mb-2">Burnout Risk</div>
            <div className="text-3xl font-black text-yellow-400">{report.timeMetrics.burnoutRisk}%</div>
            <p className="text-[10px] text-[#B8C5D6] mt-1">Intensity Level</p>
         </div>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* ROI Projection Chart (Visual Mockup) */}
        <div className="lg:col-span-8 bg-[#1A1F3A]/60 border border-white/10 rounded-[40px] p-10">
          <div className="flex items-center justify-between mb-10">
             <h4 className="text-xl font-bold flex items-center space-x-2">
                <TrendingUp size={20} className="text-[#02C39A]" />
                <span>10-Year Earning Projection</span>
             </h4>
             <div className="flex items-center space-x-4 text-[10px] font-bold">
                <div className="flex items-center space-x-1"><div className="w-2 h-2 rounded-full bg-[#02C39A]" /> <span>Optimistic</span></div>
                <div className="flex items-center space-x-1"><div className="w-2 h-2 rounded-full bg-white/20" /> <span>Conservative</span></div>
             </div>
          </div>

          <div className="h-[300px] flex items-end space-x-4 lg:space-x-8">
             {[
               { yr: 'Yr 1', val: report.roiAnalysis.year1Salary },
               { yr: 'Yr 5', val: report.roiAnalysis.year5Salary },
               { yr: 'Yr 10', val: report.roiAnalysis.year10Salary },
             ].map((d, i) => (
               <div key={i} className="flex-1 flex flex-col items-center group">
                 <div className="w-full relative">
                    <motion.div 
                      initial={{ height: 0 }}
                      animate={{ height: `${(d.val / report.roiAnalysis.year10Salary) * 100}%` }}
                      transition={{ delay: 0.5 + (i * 0.2), duration: 1 }}
                      className="w-full bg-gradient-to-t from-[#028090] to-[#02C39A] rounded-t-2xl relative"
                    >
                       <div className="absolute -top-10 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity bg-[#02C39A] text-[#0A0E27] px-3 py-1 rounded text-[10px] font-black whitespace-nowrap">
                          ₹{(d.val / 100000).toFixed(1)}L
                       </div>
                    </motion.div>
                 </div>
                 <div className="mt-4 text-[10px] font-bold text-[#6B7A8F] uppercase tracking-widest">{d.yr}</div>
               </div>
             ))}
          </div>
        </div>

        {/* Time Commitment Card */}
        <div className="lg:col-span-4 bg-gradient-to-b from-[#1A1F3A] to-transparent border border-white/10 rounded-[40px] p-10 flex flex-col justify-between">
           <div>
              <h4 className="text-xl font-bold mb-8 flex items-center space-x-2">
                <Clock size={20} className="text-teal-400" />
                <span>Time Velocity</span>
              </h4>
              <div className="space-y-8">
                 <div>
                    <div className="flex justify-between text-xs font-bold mb-2">
                       <span className="text-[#6B7A8F]">LEARNING INTENSITY</span>
                       <span className="text-white">{report.timeMetrics.learningHoursRequired} Hrs Total</span>
                    </div>
                    <div className="h-2 w-full bg-white/5 rounded-full overflow-hidden">
                       <div className="h-full bg-teal-400 w-[65%]" />
                    </div>
                 </div>
                 <div>
                    <div className="flex justify-between text-xs font-bold mb-2">
                       <span className="text-[#6B7A8F]">TIME TO MARKET</span>
                       <span className="text-white">{report.timeMetrics.jobReadyWeeks} Weeks</span>
                    </div>
                    <div className="h-2 w-full bg-white/5 rounded-full overflow-hidden">
                       <div className="h-full bg-emerald-400 w-[40%]" />
                    </div>
                 </div>
              </div>
           </div>
           
           <div className="p-6 bg-yellow-400/5 border border-yellow-400/10 rounded-3xl mt-12">
              <div className="flex items-center space-x-2 text-yellow-400 mb-2">
                 <AlertTriangle size={16} />
                 <span className="text-[10px] font-black uppercase tracking-widest">Efficiency Alert</span>
              </div>
              <p className="text-xs text-[#B8C5D6] leading-relaxed">
                 Estimated burnout risk is {report.timeMetrics.burnoutRisk}%. Recommend spreading learning across {Math.ceil(report.timeMetrics.jobReadyWeeks * 1.5)} weeks for better retention.
              </p>
           </div>
        </div>
      </div>

      {/* Strategic Actions */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
         <div className="bg-white/5 border border-white/10 rounded-[40px] p-10">
            <h4 className="text-xl font-bold mb-8 flex items-center space-x-2">
              <Target size={20} className="text-[#02C39A]" />
              <span>Priority Skill Gaps</span>
            </h4>
            <div className="space-y-4">
               {report.skillGapAnalysis.map((gap: any, i: number) => (
                 <div key={i} className="flex items-center justify-between p-4 rounded-2xl bg-white/5 hover:bg-white/10 transition-all border border-white/5 group">
                    <span className="font-bold text-white">{gap.skillName}</span>
                    <span className={`text-[10px] font-black uppercase px-2 py-1 rounded ${
                      gap.priority === 'High' ? 'bg-red-500/10 text-red-400' : 'bg-[#02C39A]/10 text-[#02C39A]'
                    }`}>
                      {gap.priority} Priority
                    </span>
                 </div>
               ))}
            </div>
         </div>

         <div className="bg-white/5 border border-white/10 rounded-[40px] p-10">
            <h4 className="text-xl font-bold mb-8 flex items-center space-x-2">
              <Zap size={20} className="text-yellow-400" />
              <span>Next Strategic Steps</span>
            </h4>
            <div className="space-y-6">
               {report.strategicRecommendations.map((rec: string, i: number) => (
                 <div key={i} className="flex items-start space-x-4">
                    <div className="w-8 h-8 rounded-xl bg-[#02C39A]/10 flex items-center justify-center text-[#02C39A] shrink-0 font-black text-xs">
                      {i + 1}
                    </div>
                    <p className="text-[#B8C5D6] text-sm leading-relaxed">{rec}</p>
                 </div>
               ))}
            </div>
         </div>
      </div>

      <div className="text-center pt-10">
         <div className="inline-flex items-center space-x-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 mb-6">
            <div className="w-2 h-2 rounded-full bg-[#02C39A] animate-pulse" />
            <span className="text-[10px] font-bold text-[#6B7A8F] uppercase tracking-widest">End of Report • CareerCompass Intelligence</span>
         </div>
      </div>
    </div>
  );
};

export default CareerReport;
