"use client";

import { motion } from "framer-motion";
import { useEffect, useState, useMemo } from "react";

type Bean = {
  x: number;
  y: number;
  driftX: number;
  driftY: number;
  liftOffset: number;
};

export default function Intro({ onFinish }: { onFinish: () => void }) {
  const [start, setStart] = useState(false);
  const [showName, setShowName] = useState(false);
  const [lift, setLift] = useState(false);
  const [scale, setScale] = useState(1);

  useEffect(() => {
    const updateScale = () => {
      const w = window.innerWidth;

      if (w < 480) setScale(0.6);
      else if (w < 768) setScale(0.8);
      else if (w < 1200) setScale(1);
      else setScale(1.1);
    };

    updateScale();
    window.addEventListener("resize", updateScale);
    return () => window.removeEventListener("resize", updateScale);
  }, []);

  const beanCount = useMemo(() => {
    if (typeof window === "undefined") return 1000;
    return window.innerWidth < 480 ? 200 : window.innerWidth < 768 ? 300 : 300;
  }, []);

  const beans = useMemo<Bean[]>(() => {
    const arr: Bean[] = [];

    for (let i = 0; i < beanCount; i++) {
      const angle = (i / beanCount) * Math.PI * 2;

      const baseRadius = 200 * scale;
      const dist = baseRadius + Math.random() * 240 * scale;

      arr.push({
        x: Math.cos(angle) * dist,
        y: Math.sin(angle) * dist,
        driftX: (Math.random() - 0.5) * 16 * scale,
        driftY: (Math.random() - 0.5) * 8 * scale,
        liftOffset: (-700 - Math.random() * 400) * scale,
      });
    }

    return arr;
  }, [beanCount, scale]);

  useEffect(() => {
    const t1 = setTimeout(() => setStart(true), 600);
    const t2 = setTimeout(() => setShowName(true), 950);
    const t3 = setTimeout(() => setLift(true), 1800);
    const t4 = setTimeout(() => onFinish(), 3200);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
      clearTimeout(t4);
    };
  }, [onFinish]);

  return (
    <div className="absolute inset-0 flex items-center justify-center overflow-hidden bg-[#070605]">

      {/* CINEMATIC LIGHT LAYERS */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,210,160,0.10),transparent_55%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,180,120,0.06),transparent_60%)]" />
      <div className="absolute inset-0 backdrop-blur-[1px]" />

      {/* SUBTLE GRAIN (premium feel) */}
      <div className="absolute inset-0 opacity-[0.04] mix-blend-overlay bg-[url('/noise.png')]" />

      {/* INITIAL BEAN */}
      {!start && (
        <motion.img
          src="/beans.png"
          initial={{ y: -200, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          style={{ width: `${52 * scale}px` }}
          className="absolute will-change-transform drop-shadow-[0_0_25px_rgba(255,200,150,0.25)]"
        />
      )}

      {/* BEAN EXPLOSION */}
      {start &&
        beans.map((b, i) => (
          <motion.img
            key={i}
            src="/beans.png"
            initial={{ x: 0, y: 0, scale: 0.7, opacity: 1 }}
            animate={
              lift
                ? {
                    x: b.x + b.driftX,
                    y: b.y + b.driftY + b.liftOffset,
                    scale: 1,
                    opacity: 1,
                  }
                : {
                    x: b.x + b.driftX,
                    y: b.y + b.driftY,
                    scale: 1,
                    opacity: 1,
                  }
            }
            transition={{
              duration: lift ? 1.8 : 0.9,
              ease: "easeOut",
              delay: i * 0.00025,
            }}
            style={{
              width: `${12 * scale}px`,
              height: `${12 * scale}px`,
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
            }}
            className="absolute will-change-transform drop-shadow-[0_0_12px_rgba(255,200,150,0.18)]"
          />
        ))}

      {/* TITLE */}
      <motion.h1
        initial={{ opacity: 0, y: 10 }}
        animate={{
          opacity: showName ? 1 : 0,
          y: showName ? -16 : 10,
        }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="absolute font-light tracking-[0.35em] text-[#f5e6d3] text-center"
        style={{
          fontSize: `${44 * scale}px`,
          textShadow: "0 0 30px rgba(255, 200, 150, 0.12)",
        }}
      >
        BREW BEAN
      </motion.h1>

      {/* SOFT VIGNETTE */}
      <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle,transparent_40%,rgba(0,0,0,0.65))]" />
    </div>
  );
}