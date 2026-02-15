
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { MENTORS, Mentor } from '../../data/mentors';
import { Star, MessageCircle, Phone, Search, Filter, ShieldCheck, Award, Briefcase } from 'lucide-react';

const MentorshipHub: React.FC = () => {
    const [filter, setFilter] = useState<'All' | 'Alumni' | 'Industry Expert' | 'Counsellor'>('All');
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedMentor, setSelectedMentor] = useState<Mentor | null>(null);

    const filteredMentors = MENTORS.filter(mentor => {
        const matchesFilter = filter === 'All' || mentor.type === filter;
        const matchesSearch = mentor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            mentor.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
            mentor.role.toLowerCase().includes(searchTerm.toLowerCase());
        return matchesFilter && matchesSearch;
    });

    const handleConnect = (type: 'call' | 'message', mentor: Mentor) => {
        alert(`Initiating ${type} with ${mentor.name}. Payment gateway would open here. Price: ₹${type === 'call' ? mentor.priceCall : mentor.priceMessage}`);
    };

    return (
        <div className="max-w-7xl mx-auto py-12 px-4 pb-24">
            <div className="text-center mb-16">
                <h2 className="text-4xl font-black mb-4">Find Your Guide</h2>
                <p className="text-[#6B7A8F] max-w-2xl mx-auto">Connect with alumni, industry veterans, and career pros who have walked the path you want to take.</p>
            </div>

            {/* Filters */}
            <div className="flex flex-col md:flex-row items-center justify-between gap-6 mb-12">
                <div className="flex bg-[#1A1F3A] p-1 rounded-2xl overflow-hidden">
                    {['All', 'Alumni', 'Industry Expert', 'Counsellor'].map((f) => (
                        <button
                            key={f}
                            onClick={() => setFilter(f as any)}
                            className={`px-6 py-3 rounded-xl text-sm font-bold transition-all ${filter === f ? 'bg-[#02C39A] text-[#0A0E27]' : 'text-[#6B7A8F] hover:text-white'}`}
                        >
                            {f}
                        </button>
                    ))}
                </div>
                <div className="relative w-full md:w-auto">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-[#6B7A8F]" size={20} />
                    <input
                        type="text"
                        placeholder="Search by name, role, or company..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full md:w-80 bg-[#1A1F3A] border border-white/10 rounded-2xl py-3 pl-12 pr-4 text-white focus:border-[#02C39A] outline-none"
                    />
                </div>
            </div>

            {/* Mentors Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredMentors.map((mentor) => (
                    <motion.div
                        key={mentor.id}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                        className="bg-[#1A1F3A]/60 backdrop-blur-xl border border-white/10 rounded-3xl p-6 hover:border-[#02C39A]/30 transition-all group"
                    >
                        <div className="flex items-start justify-between mb-6">
                            <div className="flex items-center space-x-4">
                                <img src={mentor.image} alt={mentor.name} className="w-16 h-16 rounded-2xl object-cover border-2 border-white/10" />
                                <div>
                                    <h3 className="text-xl font-bold text-white">{mentor.name}</h3>
                                    <div className="text-xs text-[#02C39A] font-bold uppercase tracking-widest mb-1">{mentor.role}</div>
                                    <div className="flex items-center space-x-2 text-[#6B7A8F] text-xs">
                                        <Briefcase size={12} />
                                        <span>{mentor.company}</span>
                                        <span>•</span>
                                        <span>{mentor.experience}</span>
                                    </div>
                                </div>
                            </div>
                            <div className="flex items-center bg-yellow-400/10 px-2 py-1 rounded-lg">
                                <Star size={14} className="text-yellow-400 mr-1" fill="currentColor" />
                                <span className="text-yellow-400 font-bold text-xs">{mentor.rating}</span>
                                <span className="text-[#6B7A8F] text-[10px] ml-1">({mentor.reviews})</span>
                            </div>
                        </div>

                        <div className="flex flex-wrap gap-2 mb-6">
                            {mentor.tags.map((tag, i) => (
                                <span key={i} className="text-[10px] font-bold text-[#B8C5D6] bg-white/5 px-2 py-1 rounded-lg border border-white/5">
                                    {tag}
                                </span>
                            ))}
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <button
                                onClick={() => handleConnect('message', mentor)}
                                className="flex items-center justify-center space-x-2 py-3 rounded-xl bg-white/5 border border-white/10 hover:bg-[#02C39A] hover:text-[#0A0E27] hover:border-[#02C39A] transition-all group/btn"
                            >
                                <MessageCircle size={18} />
                                <div className="text-left">
                                    <div className="text-[10px] uppercase font-bold text-[#6B7A8F] group-hover/btn:text-[#0A0E27]/60">Chat</div>
                                    <div className="text-sm font-bold">₹{mentor.priceMessage}</div>
                                </div>
                            </button>
                            <button
                                onClick={() => handleConnect('call', mentor)}
                                className="flex items-center justify-center space-x-2 py-3 rounded-xl bg-white/5 border border-white/10 hover:bg-[#02C39A] hover:text-[#0A0E27] hover:border-[#02C39A] transition-all group/btn"
                            >
                                <Phone size={18} />
                                <div className="text-left">
                                    <div className="text-[10px] uppercase font-bold text-[#6B7A8F] group-hover/btn:text-[#0A0E27]/60">Call</div>
                                    <div className="text-sm font-bold">₹{mentor.priceCall}</div>
                                </div>
                            </button>
                        </div>
                    </motion.div>
                ))}
            </div>

            {filteredMentors.length === 0 && (
                <div className="text-center py-20">
                    <p className="text-[#6B7A8F]">No mentors found matching your criteria.</p>
                </div>
            )}
        </div>
    );
};

export default MentorshipHub;
