"use client";

import { motion } from "framer-motion";
import { useEffect, useState, useMemo } from "react";

type Bean = {
  x: number;
  y: number;
  driftX: number;
  driftY: number;
  liftOffset: number;
  rotate: number;
};

export default function Intro({ onFinish }: { onFinish: () => void }) {
  const [start, setStart] = useState(false);
  const [showName, setShowName] = useState(false);
  const [lift, setLift] = useState(false);
  const [scale, setScale] = useState(1);

  useEffect(() => {
    const updateScale = () => {
      const w = window.innerWidth;

      if (w < 480) setScale(0.7);
      else if (w < 768) setScale(0.85);
      else if (w < 1200) setScale(1);
      else setScale(1.1);
    };

    updateScale();
    window.addEventListener("resize", updateScale);
    return () => window.removeEventListener("resize", updateScale);
  }, []);

  const beanCount = useMemo(() => {
    if (typeof window === "undefined") return 120;

    const w = window.innerWidth;

    if (w < 480) return 80;
    if (w < 768) return 110;
    return 130;
  }, []);

  const beans = useMemo<Bean[]>(() => {
    const arr: Bean[] = [];

    for (let i = 0; i < beanCount; i++) {
      const angle = (i / beanCount) * Math.PI * 2;

      const baseRadius = 180 * scale;
      const dist = baseRadius + Math.random() * 220 * scale;

      arr.push({
        x: Math.cos(angle) * dist,
        y: Math.sin(angle) * dist,
        driftX: (Math.random() - 0.5) * 14 * scale,
        driftY: (Math.random() - 0.5) * 8 * scale,
        liftOffset: (-600 - Math.random() * 350) * scale,
        rotate: Math.random() * 360,
      });
    }

    return arr;
  }, [beanCount, scale]);

  useEffect(() => {
    const t1 = setTimeout(() => setStart(true), 600);
    const t2 = setTimeout(() => setShowName(true), 900);
    const t3 = setTimeout(() => setLift(true), 1700);
    const t4 = setTimeout(() => onFinish(), 3000);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
      clearTimeout(t4);
    };
  }, [onFinish]);

  return (
    <div className="absolute inset-0 flex items-center justify-center overflow-hidden bg-[#070605]">

      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,210,160,0.10),transparent_55%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,180,120,0.06),transparent_60%)]" />
      <div className="absolute inset-0 backdrop-blur-[1px]" />

      {/* removed noise.png dependency (no 404 issue) */}
      <div className="absolute inset-0 opacity-[0.03] mix-blend-overlay bg-[linear-gradient(transparent,rgba(255,255,255,0.02))]" />

      {!start && (
        <motion.img
          src="/beans.png"
          initial={{ y: -200, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.7 }}
          style={{ width: `${60 * scale}px` }}
          className="absolute drop-shadow-[0_0_20px_rgba(255,200,150,0.25)]"
        />
      )}

      {start &&
        beans.map((b, i) => (
          <motion.img
            key={i}
            src="/beans.png"
            initial={{ x: 0, y: 0, scale: 0.7, rotate: 0, opacity: 1 }}
            animate={{
              x: b.x + b.driftX,
              y: b.y + b.driftY + (lift ? b.liftOffset : 0),
              scale: 1,
              rotate: b.rotate,
              opacity: 1,
            }}
            transition={{
              duration: lift ? 1.5 : 0.8,
              ease: "easeOut",
              delay: i * 0.0002,
            }}
            style={{
              width: `${18 * scale}px`,
              height: `${18 * scale}px`,
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
            }}
            className="absolute drop-shadow-[0_0_6px_rgba(255,200,150,0.12)]"
          />
        ))}

      <motion.h1
        initial={{ opacity: 0, y: 10 }}
        animate={{
          opacity: showName ? 1 : 0,
          y: showName ? -16 : 10,
        }}
        transition={{ duration: 0.6 }}
        className="absolute font-light tracking-[0.35em] text-[#f5e6d3] text-center"
        style={{
          fontSize: "clamp(18px, 5vw, 40px)",
          textShadow: "0 0 30px rgba(255, 200, 150, 0.12)",
        }}
      >
        BREW BEAN
      </motion.h1>

      <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle,transparent_40%,rgba(0,0,0,0.65))]" />
    </div>
  );
}