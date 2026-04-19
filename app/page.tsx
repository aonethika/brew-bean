"use client";

import { useState } from "react";
import Intro from "@/components/Intro";
import Menu from "@/components/Menu";

export default function Page() {
  const [phase, setPhase] = useState<"intro" | "menu">("intro");

  return (
    <div className="w-full h-screen relative overflow-hidden bg-[#fdfaf6]">
      {phase === "intro" && (
        <Intro onFinish={() => setPhase("menu")} />
      )}

      {phase === "menu" && (
        <Menu phase={phase} />
      )}
    </div>
  );
}