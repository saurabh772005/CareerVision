
export interface Mentor {
    id: string;
    name: string;
    role: string;
    company: string;
    experience: string;
    type: 'Alumni' | 'Industry Expert' | 'Counsellor';
    rating: number;
    reviews: number;
    image: string;
    topmateUrl?: string; // Optional real link if needed, or we simulate
    priceCall: number;
    priceMessage: number;
    tags: string[];
}

export const MENTORS: Mentor[] = [
    {
        id: '1',
        name: 'Ananya Gupta',
        role: 'Senior SDE',
        company: 'Google',
        experience: '5+ Years',
        type: 'Alumni',
        rating: 4.9,
        reviews: 124,
        image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=200',
        priceCall: 500,
        priceMessage: 150,
        tags: ['DSA', 'System Design', 'FAANG Prep']
    },
    {
        id: '2',
        name: 'Rahul Sharma',
        role: 'Product Manager',
        company: 'Microsoft',
        experience: '7+ Years',
        type: 'Industry Expert',
        rating: 4.8,
        reviews: 89,
        image: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80&w=200',
        priceCall: 800,
        priceMessage: 250,
        tags: ['Product Management', 'Resume Review', 'Mock Interviews']
    },
    {
        id: '3',
        name: 'Priya Patel',
        role: 'Data Scientist',
        company: 'Amazon',
        experience: '4 Years',
        type: 'Alumni',
        rating: 4.7,
        reviews: 56,
        image: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&q=80&w=200',
        priceCall: 450,
        priceMessage: 100,
        tags: ['Data Science', 'Machine Learning', 'Python']
    },
    {
        id: '4',
        name: 'Dr. Arjun Verma',
        role: 'Career Counsellor',
        company: 'CareerVision',
        experience: '15+ Years',
        type: 'Counsellor',
        rating: 5.0,
        reviews: 312,
        image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=200',
        priceCall: 1200,
        priceMessage: 500,
        tags: ['Stream Selection', 'Study Abroad', 'Profile Building']
    },
    {
        id: '5',
        name: 'Vikram Singh',
        role: 'Blockchain Developer',
        company: 'Polygon',
        experience: '3 Years',
        type: 'Industry Expert',
        rating: 4.6,
        reviews: 42,
        image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=200',
        priceCall: 600,
        priceMessage: 200,
        tags: ['Web3', 'Blockchain', 'Smart Contracts']
    },
    {
        id: '6',
        name: 'Neha Roy',
        role: 'Cybersecurity Analyst',
        company: 'Cisco',
        experience: '6 Years',
        type: 'Industry Expert',
        rating: 4.8,
        reviews: 78,
        image: 'https://images.unsplash.com/photo-1598550874175-4d7112ee750c?auto=format&fit=crop&q=80&w=200',
        priceCall: 750,
        priceMessage: 250,
        tags: ['Network Security', 'Ethical Hacking', 'CISSP']
    }
];
