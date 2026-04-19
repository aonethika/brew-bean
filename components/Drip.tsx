"use client";

import { motion } from "framer-motion";

export default function Drip({ active }: { active: boolean }) {
  return (
    <motion.svg
      viewBox="0 0 1440 320"
      preserveAspectRatio="none"
      className="absolute top-0 left-0 w-full h-[200px] pointer-events-none"
      initial={{ y: -140, opacity: 0 }}
      animate={
        active
          ? { y: 0, opacity: 1 }
          : { y: -140, opacity: 0 }
      }
      transition={{ duration: 1.2, ease: "easeOut" }}
    >
      <defs>
        <linearGradient id="coffeeGradient" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#4a2a1c" />
          <stop offset="50%" stopColor="#2a1414" />
          <stop offset="100%" stopColor="#120806" />
        </linearGradient>
      </defs>

      <path
        d="M0,80 
           C180,160 360,40 540,100 
           C720,160 900,60 1080,120 
           C1260,180 1440,80 1440,80 
           L1440,0 L0,0 Z"
        fill="url(#coffeeGradient)"
      />
    </motion.svg>
  );
}