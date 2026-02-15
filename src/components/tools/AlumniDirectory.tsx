
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { User, MapPin, Building, Briefcase, MessageSquare, Linkedin, Star, ShieldCheck } from 'lucide-react';

const AlumniDirectory: React.FC = () => {
  const [alumni, setAlumni] = useState<any[]>([]);
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    // Simulated seeded data
    setAlumni([
      { id: '1', name: 'Rohan Verma', company: 'Google', role: 'Software Engineer', tier: 'tier1', branch: 'CS', college: 'NIT Trichy', rating: 4.9, sessions: 42, verified: true },
      { id: '2', name: 'Anjali Das', company: 'Microsoft', role: 'Product Manager', tier: 'tier1', branch: 'ECE', college: 'IIT Delhi', rating: 4.8, sessions: 15, verified: true },
      { id: '3', name: 'Vikram Singh', company: 'Zomato', role: 'Backend Dev', tier: 'tier2', branch: 'IT', college: 'HBTU', rating: 5.0, sessions: 89, verified: true },
      { id: '4', name: 'Simran Kaur', company: 'TCS', role: 'System Analyst', tier: 'tier3', branch: 'CS', college: 'LPU', rating: 4.7, sessions: 5, verified: false },
    ]);
  }, []);

  const filtered = filter === 'all' ? alumni : alumni.filter(a => a.tier === filter);

  return (
    <div className="space-y-12">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <h2 className="text-4xl font-bold mb-4">Connect with Mentors</h2>
          <p className="text-[#6B7A8F]">Find alumni from your college tier who successfully navigated the same path.</p>
        </div>
        <div className="flex space-x-2 bg-white/5 p-1 rounded-2xl border border-white/10">
          {['all', 'tier1', 'tier2', 'tier3'].map((t) => (
            <button 
              key={t}
              onClick={() => setFilter(t)}
              className={`px-4 py-2 rounded-xl text-xs font-bold uppercase transition-all ${filter === t ? 'bg-[#02C39A] text-[#0A0E27]' : 'text-[#6B7A8F] hover:text-white'}`}
            >
              {t}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filtered.map((mentor) => (
          <div key={mentor.id} className="bg-[#1A1F3A]/60 backdrop-blur-md border border-white/10 rounded-[32px] p-8 hover:border-[#02C39A]/40 transition-all group relative overflow-hidden">
             <div className="flex items-start justify-between mb-6">
                <div className="w-16 h-16 rounded-2xl bg-[#028090]/20 flex items-center justify-center text-[#02C39A] relative">
                   <User size={32} />
                   {mentor.verified && (
                     <div className="absolute -bottom-1 -right-1 bg-[#02C39A] rounded-full p-1 border-2 border-[#1A1F3A]">
                        <ShieldCheck size={10} className="text-[#0A0E27]" />
                     </div>
                   )}
                </div>
                <div className="text-right">
                   <div className="flex items-center space-x-1 text-yellow-400 mb-1">
                      <Star size={12} fill="currentColor" />
                      <span className="text-xs font-black">{mentor.rating}</span>
                   </div>
                   <div className="text-[10px] text-[#6B7A8F] font-bold uppercase">{mentor.sessions} Sessions</div>
                </div>
             </div>

             <div className="mb-6">
                <h3 className="text-xl font-bold group-hover:text-[#02C39A] transition-colors">{mentor.name}</h3>
                <div className="flex items-center space-x-2 text-[#6B7A8F] text-sm mt-1">
                   <Briefcase size={14} />
                   <span>{mentor.role} @ {mentor.company}</span>
                </div>
             </div>

             <div className="space-y-3 mb-8">
                <div className="flex items-center space-x-2 text-xs text-[#B8C5D6]">
                   <Building size={14} className="text-[#02C39A]" />
                   <span>{mentor.college} ({mentor.branch})</span>
                </div>
                <div className="flex items-center space-x-2 text-xs text-[#B8C5D6]">
                   <MapPin size={14} className="text-[#02C39A]" />
                   <span className="capitalize">{mentor.tier} Alum</span>
                </div>
             </div>

             <div className="grid grid-cols-2 gap-4">
                <button className="py-3 rounded-xl bg-white/5 border border-white/10 text-[#B8C5D6] text-xs font-bold hover:bg-white/10 transition-all flex items-center justify-center space-x-2">
                   <Linkedin size={14} />
                   <span>LinkedIn</span>
                </button>
                <button className="py-3 rounded-xl bg-[#02C39A] text-[#0A0E27] text-xs font-black hover:shadow-[0_10px_20px_rgba(2,195,154,0.3)] transition-all flex items-center justify-center space-x-2">
                   <MessageSquare size={14} />
                   <span>Request</span>
                </button>
             </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AlumniDirectory;
