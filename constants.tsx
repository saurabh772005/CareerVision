
import React from 'react';
import { Feature, Stat, Testimonial } from './types';

export const COLORS = {
  primaryTeal: '#028090',
  primarySeafoam: '#00A896',
  primaryMint: '#02C39A',
  bgDark: '#0A0E27',
  bgDarker: '#050816',
  bgCard: '#1A1F3A',
  accentGold: '#FFD700',
};

export const PRICING_PLANS = [
  {
    id: 'free',
    name: 'Freemius',
    price: '0',
    description: 'Perfect for getting started with clear career paths.',
    features: [
      'Basic AI Career Finder',
      'Generic Roadmap Generation',
      'Basic ROI Simulations',
      'Community Forum Access'
    ],
    cta: 'Stay with Free',
    gradient: 'from-slate-500 to-slate-700'
  },
  {
    id: 'pro',
    name: 'Premium',
    price: '199',
    description: 'The ultimate toolkit for high-growth careers.',
    features: [
      'Everything in Freemius',
      'Advanced Personalized AI Roadmaps',
      '1:1 Mentorship Sessions',
      'Direct Alumni & Teacher Connect',
      'Priority Career Support',
      'Verified Fit Certificates'
    ],
    cta: 'Upgrade to Pro',
    gradient: 'from-[#028090] to-[#02C39A]',
    highlight: true
  }
];

// Data for ROI calculations based on Indian market averages
export const CAREER_BENCHMARKS = {
  salaries: {
    tier1: { CS: 1800000, ECE: 1400000, MECH: 1000000, OTHER: 800000 },
    tier2: { CS: 800000, ECE: 600000, MECH: 500000, OTHER: 400000 },
    tier3: { CS: 450000, ECE: 350000, MECH: 300000, OTHER: 250000 }
  },
  growthRates: {
    CS: 0.15,
    ECE: 0.10,
    MECH: 0.08,
    OTHER: 0.07
  }
};

export const PROBLEM_CARDS: Feature[] = [
  {
    title: "Career Path Paralysis",
    description: "MTech? MS? Job? Government exam? Every option seems equally uncertain.",
    icon: "roads",
    stat: "78% feel confused about post-grad choices",
    gradient: "from-red-500/20 to-transparent"
  },
  {
    title: "Information Overload",
    description: "1000+ courses, 500+ bootcamps. Everyone claiming success. Who's honest?",
    icon: "noise",
    stat: "6 months wasted just researching",
    gradient: "from-orange-500/20 to-transparent"
  },
  {
    title: "Expensive Blind Bets",
    description: "Bootcamps, MS loans - no way to verify if it'll work for YOUR profile.",
    icon: "money",
    stat: "₹12,000 Cr wasted yearly",
    gradient: "from-red-500/20 to-transparent"
  },
  {
    title: "No Personal Guidance",
    description: "Seniors unreachable, counselors generic. You're on your own.",
    icon: "alone",
    stat: "Only 23% have mentor access",
    gradient: "from-purple-500/20 to-transparent"
  }
];

export const FEATURES: Feature[] = [
  {
    title: "Career Finder",
    description: "Get personalized career options based on your profile DNA.",
    icon: "compass",
    gradient: "from-yellow-400 to-orange-500"
  },
  {
    title: "Career Simulator",
    description: "Compare MTech vs MS vs Job with real ROI and success rates.",
    icon: "brainCircuit",
    gradient: "from-teal-400 to-emerald-500"
  },
  {
    title: "Course Validator",
    description: "Get fit scores and verified reviews for popular bootcamps.",
    icon: "shieldCheck",
    gradient: "from-green-400 to-teal-500"
  },
  {
    title: "Roadmap Generator",
    description: "Week-by-week personalized plan to reach your goal.",
    icon: "map",
    gradient: "from-purple-400 to-blue-500"
  },
  {
    title: "Alumni Match",
    description: "Connect with seniors from your specific college tier.",
    icon: "users",
    gradient: "from-blue-400 to-cyan-500"
  },
  {
    title: "Smart Job Finder",
    description: "Jobs matched to your skills with realistic fit scores.",
    icon: "briefcase",
    gradient: "from-blue-400 to-cyan-500"
  },
  {
    title: "Salary Pathfinder",
    description: "Reverse-engineered steps to reach your salary goals.",
    icon: "rocket",
    gradient: "from-red-400 to-pink-500"
  },
  {
    title: "Community Forum",
    description: "Reddit meets career wisdom. Ask anything safely.",
    icon: "messageSquare",
    gradient: "from-cyan-400 to-teal-500"
  }
];

export const STATS: Stat[] = [
  { value: "50,000+", label: "Alumni Profiles", color: "text-teal-400" },
  { value: "500+", label: "Courses Validated", color: "text-green-400" },
  { value: "10,000+", label: "Paths Simulated", color: "text-purple-400" },
  { value: "94%", label: "Success Rate", color: "text-gold-400" }
];

export const TESTIMONIALS: Testimonial[] = [
  {
    name: "Priya Sharma",
    college: "Tier-3 CSE, Now at Paytm",
    quote: "CareerCompass showed me I didn't need that ₹2.5L bootcamp. Saved my money!",
    rating: 5
  },
  {
    name: "Rahul Gupta",
    college: "Tier-2 ECE, MS at USC",
    quote: "The ROI calculator showed MS breaks even faster for my profile. Best decision.",
    rating: 5
  },
  {
    name: "Sneha Patel",
    college: "Tier-3 IT, Now at Flipkart",
    quote: "Connected with an alumni with 7.2 CGPA. Advice worth more than any paid counselor.",
    rating: 5
  }
];
