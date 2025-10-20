'use client';

import React from 'react';
import { motion, Transition } from 'framer-motion';

const TITLE_TEXT = "Daily Dose of Wisdom";

const container = {
    hidden: { opacity: 0 },
    visible: (i = 1) => ({
        opacity: 1,
        transition: { 
            staggerChildren: 0.04,
            delayChildren: 0.5 
        } as Transition,
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
            style={{ overflow: "hidden" }} 
            variants={container}
            initial="hidden"
            animate="visible"
            className="text-5xl md:text-6xl font-extrabold text-white text-center mb-6"
        >
            {TITLE_TEXT.split("").map((letter, index) => (
                <motion.span 
                    key={index} 
                    variants={child} 
                    className="inline-block"
                >
                    {letter === " " ? "\u00A0" : letter} 
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