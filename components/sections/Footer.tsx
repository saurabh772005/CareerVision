
import React from 'react';
import { Compass, Twitter, Linkedin, Github, Instagram, Heart } from 'lucide-react';
import Logo from '../ui/Logo';

const Footer: React.FC = () => {
  return (
    <footer className="bg-[#050816] pt-24 pb-12 px-6 lg:px-24 border-t border-white/5">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-20">
        <div>
          <Logo lightText className="mb-8" />
          <p className="text-[#B8C5D6] mb-8 leading-relaxed">
            Revolutionizing how Indian students make career choices through verified alumni data and AI intelligence.
          </p>
          <div className="flex space-x-4">
            {[Twitter, Linkedin, Github, Instagram].map((Icon, i) => (
              <a key={i} href="#" className="w-10 h-10 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-[#B8C5D6] hover:text-[#02C39A] hover:bg-white/10 transition-all">
                <Icon size={20} />
              </a>
            ))}
          </div>
        </div>

        <div>
          <h4 className="text-white font-bold mb-8">Product</h4>
          <ul className="space-y-4 text-[#B8C5D6]">
            <li><a href="#" className="hover:text-[#02C39A] transition-colors">Career Simulator</a></li>
            <li><a href="#" className="hover:text-[#02C39A] transition-colors">Course Validator</a></li>
            <li><a href="#" className="hover:text-[#02C39A] transition-colors">Roadmap Generator</a></li>
            <li><a href="#" className="hover:text-[#02C39A] transition-colors">Alumni Match</a></li>
          </ul>
        </div>

        <div>
          <h4 className="text-white font-bold mb-8">Company</h4>
          <ul className="space-y-4 text-[#B8C5D6]">
            <li><a href="#" className="hover:text-[#02C39A] transition-colors">About Us</a></li>
            <li><a href="#" className="hover:text-[#02C39A] transition-colors">Our Story</a></li>
            <li><a href="#" className="hover:text-[#02C39A] transition-colors">Success Stories</a></li>
            <li><a href="#" className="hover:text-[#02C39A] transition-colors">Contact</a></li>
          </ul>
        </div>

        <div>
          <h4 className="text-white font-bold mb-8">Newsletter</h4>
          <p className="text-[#B8C5D6] text-sm mb-4">Get the latest career insights delivered weekly.</p>
          <div className="relative">
            <input 
              type="email" 
              placeholder="Enter your email" 
              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#02C39A] transition-colors"
            />
            <button className="absolute right-2 top-2 px-4 py-1 rounded-lg bg-[#02C39A] text-[#0A0E27] text-sm font-bold">
              Join
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto pt-12 border-t border-white/5 flex flex-col md:row items-center justify-between text-[#6B7A8F] text-sm">
        <p>© 2026 CareerCompass. Built with <Heart size={14} className="inline text-red-500 mx-1" /> for Indian Students.</p>
        <div className="flex space-x-6 mt-4 md:mt-0">
          <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
          <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
          <a href="#" className="hover:text-white transition-colors">Cookie Policy</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
