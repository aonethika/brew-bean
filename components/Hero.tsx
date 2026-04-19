"use client";

export default function Hero() {
  return (
    <div className="h-screen flex items-center justify-center bg-[#0F0B09] text-white relative overflow-hidden">
      
      <div className="text-center z-10">
        <h1 className="text-5xl font-light tracking-wide">
          Crafted Coffee Experience
        </h1>

        <p className="mt-4 text-gray-400">
          Where every cup tells a story
        </p>

        <button className="mt-8 px-6 py-3 bg-[#D6C7A1] text-black rounded-full hover:scale-105 transition">
          Explore Menu
        </button>
      </div>

      {/* subtle glow background */}
      <div className="absolute w-[400px] h-[400px] bg-[#3C2A21] blur-[120px] opacity-40 rounded-full"></div>
    </div>
  );
}