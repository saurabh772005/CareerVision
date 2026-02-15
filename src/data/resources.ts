
export interface Resource {
    id: string;
    title: string;
    provider: string; // e.g., "YouTube", "Coursera", "FreeCodeCamp"
    type: 'Video' | 'Course' | 'Article';
    category: string;
    url: string;
    thumbnail: string;
    tags: string[];
}

export const RESOURCES: Resource[] = [
    // DSA
    {
        id: 'dsa-1',
        title: 'Data Structures and Algorithms in Java',
        provider: 'Kunal Kushwaha (YouTube)',
        type: 'Video',
        category: 'DSA',
        url: 'https://www.youtube.com/playlist?list=PL9gnSGHSqcnr_DxHsP7AW9ftq0AtAyYqJ',
        thumbnail: 'https://i.ytimg.com/vi/rZ41y93P2Qo/maxresdefault.jpg',
        tags: ['Java', 'DSA', 'Interview Prep']
    },
    {
        id: 'dsa-2',
        title: 'Striver\'s A2Z DSA Course/Sheet',
        provider: 'takeUforward',
        type: 'Course',
        category: 'DSA',
        url: 'https://takeuforward.org/strivers-a2z-dsa-course/strivers-a2z-dsa-course-sheet-2',
        thumbnail: 'https://takeuforward.org/wp-content/uploads/2022/08/strivers-a2z-dsa-course-sheet-2.jpg',
        tags: ['C++', 'DSA', 'Structured Path']
    },

    // Web Development
    {
        id: 'web-1',
        title: 'Namaste JavaScript',
        provider: 'Akshay Saini (YouTube)',
        type: 'Video',
        category: 'Web Development',
        url: 'https://www.youtube.com/playlist?list=PLlasXeu85E9cQ32gLCvAvr9vNaUccPVNP',
        thumbnail: 'https://i.ytimg.com/vi/pN6jk0uUrD8/maxresdefault.jpg',
        tags: ['JavaScript', 'Frontend', 'Deep Dive']
    },
    {
        id: 'web-2',
        title: 'Full Stack Web Development Course',
        provider: 'FreeCodeCamp',
        type: 'Course',
        category: 'Web Development',
        url: 'https://www.freecodecamp.org/learn/2022/responsive-web-design/',
        thumbnail: 'https://design-style-guide.freecodecamp.org/downloads/fcc_primary_large.jpg',
        tags: ['HTML', 'CSS', 'React', 'Node.js']
    },

    // Data Science
    {
        id: 'ds-1',
        title: 'Machine Learning Specialization',
        provider: 'Andrew Ng (Coursera/YouTube)',
        type: 'Course',
        category: 'Data Science',
        url: 'https://www.youtube.com/playlist?list=PLkDaE6sCZn6FNC6YRfRQc_FbeQrF8BwZI',
        thumbnail: 'https://i.ytimg.com/vi/PPLop4L2eGk/maxresdefault.jpg',
        tags: ['ML', 'AI', 'Python']
    },
    {
        id: 'ds-2',
        title: 'Python for Data Science',
        provider: 'Krish Naik (YouTube)',
        type: 'Video',
        category: 'Data Science',
        url: 'https://www.youtube.com/playlist?list=PLZoTAELRMXVPBTrWtJkn3wWQxZkmTXGwe',
        thumbnail: 'https://i.ytimg.com/vi/6iIZa_1a4oU/maxresdefault.jpg',
        tags: ['Python', 'Pandas', 'NumPy']
    },

    // Cybersecurity
    {
        id: 'cyber-1',
        title: 'Cyber Security Full Course for Beginners',
        provider: 'Edureka (YouTube)',
        type: 'Video',
        category: 'Cybersecurity',
        url: 'https://www.youtube.com/watch?v=nzZkKoREEGo',
        thumbnail: 'https://i.ytimg.com/vi/nzZkKoREEGo/maxresdefault.jpg',
        tags: ['Hacking', 'Security', 'Network']
    },

    // Blockchain
    {
        id: 'web3-1',
        title: 'Solidity & Blockchain Development',
        provider: 'CodeEater (YouTube)',
        type: 'Video',
        category: 'Blockchain',
        url: 'https://www.youtube.com/playlist?list=PLWkguCWKqN9OycZB3c6wZ8l8gJ5x9_k7p',
        thumbnail: 'https://i.ytimg.com/vi/gyMwXuJrbJQ/maxresdefault.jpg',
        tags: ['Solidity', 'Ethereum', 'Smart Contracts']
    },

    // Cloud Computing
    {
        id: 'cloud-1',
        title: 'AWS Certified Cloud Practitioner',
        provider: 'FreeCodeCamp (YouTube)',
        type: 'Video',
        category: 'Cloud',
        url: 'https://www.youtube.com/watch?v=3hLmDS179YE',
        thumbnail: 'https://i.ytimg.com/vi/3hLmDS179YE/maxresdefault.jpg',
        tags: ['AWS', 'Cloud', 'Certification']
    }
];
