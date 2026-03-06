import { motion } from 'motion/react';
import { useState } from 'react';

export default function App() {
  const [key, setKey] = useState(0);
  const text = "portfolio";
  const letters = text.split("");

  return (
    <div 
      className="flex h-screen w-full items-center justify-center bg-black overflow-hidden cursor-pointer selection:bg-transparent"
      onClick={() => setKey(k => k + 1)}
    >
      <div className="relative w-full max-w-6xl px-8 flex items-center justify-center">
        <motion.svg 
          key={key} 
          viewBox="0 0 1200 400" 
          className="w-full h-auto"
        >
          {/* Stroke Layer - Draws the text with Apple's signature cubic-bezier ease */}
          <text
            x="50%"
            y="50%"
            textAnchor="middle"
            dominantBaseline="middle"
            className="font-['Sacramento'] text-[260px]"
          >
            {letters.map((letter, i) => (
              <motion.tspan
                key={`stroke-${i}`}
                initial={{ 
                  strokeDasharray: 1200, 
                  strokeDashoffset: 1200, 
                  fill: "transparent", 
                  stroke: "#ffffff", 
                  strokeWidth: 4,
                  strokeLinecap: "round",
                  strokeLinejoin: "round"
                }}
                animate={{ strokeDashoffset: 0 }}
                transition={{ 
                  duration: 1.4, 
                  delay: i * 0.12, 
                  ease: [0.4, 0, 0.2, 1] // Apple's classic smooth ease-in-out
                }}
              >
                {letter}
              </motion.tspan>
            ))}
          </text>
          
          {/* Fill Layer - Seamlessly fills in the hollow stroke to create a solid line */}
          <text
            x="50%"
            y="50%"
            textAnchor="middle"
            dominantBaseline="middle"
            className="font-['Sacramento'] text-[260px]"
          >
            {letters.map((letter, i) => (
              <motion.tspan
                key={`fill-${i}`}
                initial={{ fill: "rgba(255,255,255,0)" }}
                animate={{ fill: "rgba(255,255,255,1)" }}
                transition={{ 
                  duration: 0.6, 
                  delay: i * 0.12 + 0.9, // Fades in exactly as the stroke completes
                  ease: "easeOut" 
                }}
              >
                {letter}
              </motion.tspan>
            ))}
          </text>
        </motion.svg>
      </div>

      <div className="absolute bottom-10 text-[#444444] text-xs font-sans tracking-[0.3em] uppercase pointer-events-none">
        Click anywhere to replay
      </div>
    </div>
  );
}
