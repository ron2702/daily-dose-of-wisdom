'use client';

import React from 'react';
import { motion, Transition } from 'framer-motion';

const TITLE_TEXT = "Daily Dose of Wisdom";

const words = TITLE_TEXT.split(" ");
const container = {
    hidden: { opacity: 0 },
    visible: (i = 1) => ({
        opacity: 1,
        transition: { 
            staggerChildren: 0.1,
            delayChildren: 0.3 
        },
    }),
};

const child = {
    visible: {
        opacity: 1,
        y: 0,
        transition: {
            type: "spring",
            damping: 12,
            stiffness: 100,
        } as Transition, 
    },
    hidden: {
        opacity: 0,
        y: 20,
        transition: {
            type: "spring",
            damping: 12,
            stiffness: 100,
        } as Transition,
    },
};

export const AnimatedTitle: React.FC = () => {
    return (
        <motion.h1
            variants={container}
            initial="hidden"
            animate="visible"
            className="text-5xl md:text-6xl font-extrabold text-white text-center mb-6"
        >
            {words.map((word, index) => (
                <motion.span 
                    key={index} 
                    variants={child} 
                    className="inline-block"
                >
                    {word}
                    {index < words.length - 1 && "\u00A0"}
                </motion.span>
            ))}
          
            <span
                className="inline-block text-yellow-400 align-middle ml-3 animate-pulse"
            >
                💡
            </span>
        </motion.h1>
    );
};