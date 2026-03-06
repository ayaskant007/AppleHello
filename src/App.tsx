import { motion } from 'motion/react';
import { useState } from 'react';
import { RotateCcw } from 'lucide-react';

export default function App() {
  const [key, setKey] = useState(0);
  const text = "portfolio";
  const letters = text.split("");

  return (
    <div className="relative flex h-screen w-full items-center justify-center bg-[#050505] overflow-hidden">
      {/* Colorful background orbs for the glass to refract/reflect */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none flex items-center justify-center">
        <motion.div 
          className="absolute w-[50vw] h-[50vw] bg-indigo-500/30 rounded-full blur-[120px] mix-blend-screen"
          animate={{ 
            x: [-100, 100, -100], 
            y: [-50, 50, -50],
            scale: [1, 1.2, 1]
          }}
          transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div 
          className="absolute w-[40vw] h-[40vw] bg-fuchsia-500/30 rounded-full blur-[100px] mix-blend-screen"
          animate={{ 
            x: [100, -100, 100], 
            y: [50, -50, 50],
            scale: [1.2, 1, 1.2]
          }}
          transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div 
          className="absolute w-[60vw] h-[60vw] bg-cyan-500/20 rounded-full blur-[120px] mix-blend-screen"
          animate={{ 
            x: [0, 50, -50, 0], 
            y: [100, -50, 50, 100],
          }}
          transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>

      <div className="relative w-full max-w-5xl px-8 flex items-center justify-center">
        <motion.svg 
          key={key} 
          viewBox="0 0 1000 400" 
          className="w-full h-auto"
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 2, ease: "easeOut" }}
        >
          <defs>
            {/* Liquid Glass Filter */}
            <filter id="liquid-glass" x="-20%" y="-20%" width="140%" height="140%">
              {/* Blur the alpha channel of the combined graphic */}
              <feGaussianBlur in="SourceAlpha" stdDeviation="4" result="blur" />
              
              {/* Create a specular lighting effect for the glossy reflection */}
              <feSpecularLighting in="blur" surfaceScale="8" specularConstant="1.2" specularExponent="30" lighting-color="#ffffff" result="specular">
                <fePointLight x="300" y="-200" z="400" />
              </feSpecularLighting>
              
              {/* Mask the specular reflection to the text shape */}
              <feComposite in="specular" in2="SourceAlpha" operator="in" result="specularMasked" />
              
              {/* Create a subtle drop shadow/glow */}
              <feDropShadow in="SourceGraphic" dx="0" dy="15" stdDeviation="20" floodColor="#000000" floodOpacity="0.5" result="shadow" />
              
              {/* Merge shadow, original graphic, and specular highlight */}
              <feMerge>
                <feMergeNode in="shadow" />
                <feMergeNode in="SourceGraphic" />
                <feMergeNode in="specularMasked" />
              </feMerge>
            </filter>

            {/* Glass Gradient Fill */}
            <linearGradient id="glass-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="rgba(255, 255, 255, 0.5)" />
              <stop offset="20%" stopColor="rgba(255, 255, 255, 0.1)" />
              <stop offset="80%" stopColor="rgba(255, 255, 255, 0.05)" />
              <stop offset="100%" stopColor="rgba(255, 255, 255, 0.4)" />
            </linearGradient>
          </defs>

          <g filter="url(#liquid-glass)">
            {/* Stroke Layer - Draws the text */}
            <text
              x="50%"
              y="50%"
              textAnchor="middle"
              dominantBaseline="middle"
              className="font-['Great_Vibes'] text-[220px]"
            >
              {letters.map((letter, i) => (
                <motion.tspan
                  key={`stroke-${i}`}
                  initial={{ 
                    strokeDasharray: 1500, 
                    strokeDashoffset: 1500, 
                    fill: "none", 
                    stroke: "rgba(255,255,255,0.7)", 
                    strokeWidth: 4,
                    strokeLinecap: "round",
                    strokeLinejoin: "round"
                  }}
                  animate={{ strokeDashoffset: 0 }}
                  transition={{ 
                    duration: 2.2, 
                    delay: i * 0.18, 
                    ease: [0.2, 0.6, 0.2, 1] 
                  }}
                >
                  {letter}
                </motion.tspan>
              ))}
            </text>
            
            {/* Fill Layer - Fades in smoothly over the strokes */}
            <text
              x="50%"
              y="50%"
              textAnchor="middle"
              dominantBaseline="middle"
              className="font-['Great_Vibes'] text-[220px]"
              fill="url(#glass-gradient)"
            >
              {letters.map((letter, i) => (
                <motion.tspan
                  key={`fill-${i}`}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ 
                    duration: 1.5, 
                    delay: i * 0.18 + 1.2, 
                    ease: "easeInOut" 
                  }}
                >
                  {letter}
                </motion.tspan>
              ))}
            </text>
          </g>
        </motion.svg>
      </div>

      {/* Replay Button */}
      <button 
        onClick={() => setKey(k => k + 1)}
        className="absolute bottom-12 text-white/30 hover:text-white/90 transition-all duration-500 flex items-center gap-2 text-xs font-sans tracking-[0.2em] uppercase cursor-pointer z-10"
      >
        <RotateCcw size={14} className="transition-transform duration-500 hover:-rotate-180" />
        Replay
      </button>
    </div>
  );
}
