
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { RESOURCES, Resource } from '../../data/resources';
import { PlayCircle, Book, FileText, ExternalLink, Search, Filter } from 'lucide-react';

const ResourceLibrary: React.FC = () => {
    const [categoryFilter, setCategoryFilter] = useState('All');
    const [searchTerm, setSearchTerm] = useState('');

    const categories = ['All', ...Array.from(new Set(RESOURCES.map(r => r.category)))];

    const filteredResources = RESOURCES.filter(resource => {
        const matchesCategory = categoryFilter === 'All' || resource.category === categoryFilter;
        const matchesSearch = resource.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            resource.provider.toLowerCase().includes(searchTerm.toLowerCase()) ||
            resource.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
        return matchesCategory && matchesSearch;
    });

    return (
        <div className="max-w-7xl mx-auto py-12 px-4 pb-24">
            <div className="text-center mb-16">
                <h2 className="text-4xl font-black mb-4">Free Resource Library</h2>
                <p className="text-[#6B7A8F] max-w-2xl mx-auto">Curated collection of the best free learning materials from across the web. No paywalls, just knowledge.</p>
            </div>

            {/* Search and Filters */}
            <div className="space-y-8 mb-12">
                <div className="max-w-md mx-auto relative">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-[#6B7A8F]" size={20} />
                    <input
                        type="text"
                        placeholder="Search for Python, DSA, Web Dev..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full bg-[#1A1F3A] border border-white/10 rounded-2xl py-4 pl-12 pr-4 text-white focus:border-[#02C39A] outline-none"
                    />
                </div>

                <div className="flex flex-wrap justify-center gap-2">
                    {categories.map((cat) => (
                        <button
                            key={cat}
                            onClick={() => setCategoryFilter(cat)}
                            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all border ${categoryFilter === cat
                                    ? 'bg-[#02C39A] text-[#0A0E27] border-[#02C39A]'
                                    : 'bg-white/5 border-white/5 text-[#B8C5D6] hover:border-white/20'
                                }`}
                        >
                            {cat}
                        </button>
                    ))}
                </div>
            </div>

            {/* Resources Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredResources.map((resource) => (
                    <motion.a
                        href={resource.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        key={resource.id}
                        initial={{ opacity: 0, scale: 0.95 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        whileHover={{ y: -5 }}
                        transition={{ duration: 0.3 }}
                        className="bg-[#1A1F3A]/60 backdrop-blur-xl border border-white/10 rounded-3xl overflow-hidden hover:border-[#02C39A]/40 transition-all group flex flex-col h-full"
                    >
                        <div className="h-40 overflow-hidden relative">
                            <img src={resource.thumbnail} alt={resource.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                            <div className="absolute inset-0 bg-gradient-to-t from-[#1A1F3A] to-transparent" />
                            <div className="absolute bottom-4 left-4 bg-black/50 backdrop-blur-md px-2 py-1 rounded-lg text-[10px] font-bold text-white flex items-center space-x-1 border border-white/10">
                                {resource.type === 'Video' ? <PlayCircle size={12} className="text-red-400" /> : resource.type === 'Course' ? <Book size={12} className="text-blue-400" /> : <FileText size={12} className="text-green-400" />}
                                <span>{resource.type}</span>
                            </div>
                        </div>

                        <div className="p-6 flex flex-col flex-grow">
                            <div className="text-[10px] text-[#02C39A] font-bold uppercase tracking-widest mb-2">{resource.category}</div>
                            <h3 className="text-lg font-bold text-white mb-2 leading-tight group-hover:text-[#02C39A] transition-colors">{resource.title}</h3>
                            <p className="text-xs text-[#6B7A8F] mb-4">by {resource.provider}</p>

                            <div className="mt-auto pt-4 border-t border-white/5 flex items-center justify-between">
                                <div className="flex flex-wrap gap-1">
                                    {resource.tags.slice(0, 2).map((tag, i) => (
                                        <span key={i} className="text-[9px] text-[#B8C5D6] bg-white/5 px-2 py-1 rounded font-medium">{tag}</span>
                                    ))}
                                </div>
                                <ExternalLink size={16} className="text-[#6B7A8F] group-hover:text-white transition-colors" />
                            </div>
                        </div>
                    </motion.a>
                ))}
            </div>

            {filteredResources.length === 0 && (
                <div className="text-center py-20">
                    <p className="text-[#6B7A8F]">No resources found for "{searchTerm}" in {categoryFilter}.</p>
                </div>
            )}
        </div>
    );
};

export default ResourceLibrary;
