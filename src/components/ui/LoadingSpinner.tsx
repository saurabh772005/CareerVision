import React from 'react';
import { motion } from 'framer-motion';

interface LoadingSpinnerProps {
    size?: 'sm' | 'md' | 'lg';
    text?: string;
}

const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({ size = 'md', text = "Analyzing..." }) => {
    const sizeClasses = {
        sm: 'w-8 h-8',
        md: 'w-16 h-16',
        lg: 'w-24 h-24'
    };

    return (
        <div className="flex flex-col items-center justify-center space-y-6">
            <div className="relative">
                {/* Outer Ring */}
                <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ repeat: Infinity, duration: 2, ease: "linear" }}
                    className={`${sizeClasses[size]} border-4 border-white/5 border-t-[#02C39A] rounded-full`}
                />

                {/* Inner Ring (Counter-rotating) */}
                <motion.div
                    animate={{ rotate: -360 }}
                    transition={{ repeat: Infinity, duration: 3, ease: "linear" }}
                    className={`absolute inset-0 m-auto w-[60%] h-[60%] border-4 border-white/5 border-b-[#0047FF] rounded-full`}
                />

                {/* Pulse Core */}
                <motion.div
                    animate={{ scale: [1, 1.2, 1], opacity: [0.5, 1, 0.5] }}
                    transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
                    className="absolute inset-0 m-auto w-[20%] h-[20%] bg-white rounded-full blur-[2px]"
                />
            </div>

            {text && (
                <div className="text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 5 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-[#02C39A] font-bold tracking-widest uppercase text-xs mb-1"
                    >
                        AI Processing
                    </motion.div>
                    <p className="text-[#6B7A8F] text-sm animate-pulse">{text}</p>
                </div>
            )}
        </div>
    );
};

export default LoadingSpinner;
