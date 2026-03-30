import React from 'react';

export function LavaEffect() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-[1] opacity-70 mix-blend-screen">
      <style>
        {`
          @keyframes pulse-glow {
            0%, 100% { filter: drop-shadow(0 0 8px #ff4500) drop-shadow(0 0 16px #ff6a00); stroke-opacity: 0.5; }
            50% { filter: drop-shadow(0 0 16px #ff6a00) drop-shadow(0 0 32px #ff8c00); stroke-opacity: 1; }
          }
          @keyframes lava-flow {
            0% { stroke-dashoffset: 1500; }
            100% { stroke-dashoffset: 0; }
          }
          .lava-crack {
            fill: none;
            stroke-linecap: round;
            stroke-linejoin: round;
            animation: pulse-glow 6s ease-in-out infinite alternate, lava-flow 40s linear infinite;
          }
          .crack-1 { stroke: #ff4500; stroke-width: 4; stroke-dasharray: 100 200; animation-duration: 7s, 30s; }
          .crack-2 { stroke: #ff6a00; stroke-width: 6; stroke-dasharray: 150 250; animation-duration: 9s, 45s; animation-delay: -5s; }
          .crack-3 { stroke: #ff8c00; stroke-width: 3; stroke-dasharray: 80 150; animation-duration: 6s, 25s; animation-delay: -2s; }
          .crack-4 { stroke: #ffb347; stroke-width: 7; stroke-dasharray: 200 300; animation-duration: 11s, 50s; animation-delay: -8s; }
        `}
      </style>
      
      <svg 
        className="absolute inset-0 w-full h-full" 
        xmlns="http://www.w3.org/2000/svg" 
        preserveAspectRatio="none"
        viewBox="0 0 1000 1000"
      >
        <defs>
          <filter id="lava-glow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="8" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
        </defs>

        <g filter="url(#lava-glow)" opacity="0.9">
          {/* Crack paths representing glowing lava in the ground */}
          <path className="lava-crack crack-1" d="M -100,150 Q 150,180 200,300 T 400,450 T 600,350 T 800,550 T 1100,450" />
          <path className="lava-crack crack-2" d="M -50,550 Q 200,600 300,750 T 500,850 T 700,700 T 900,800 T 1100,850" />
          <path className="lava-crack crack-3" d="M 250,-100 Q 300,150 200,300 T 300,550 T 150,750 T 250,1100" />
          <path className="lava-crack crack-4" d="M 850,-50 Q 800,200 900,400 T 800,650 T 950,850 T 850,1100" />
          
          {/* Connecting branches */}
          <path className="lava-crack crack-1" d="M 200,300 Q 250,450 150,750" />
          <path className="lava-crack crack-3" d="M 600,350 Q 700,450 800,650" />
          <path className="lava-crack crack-2" d="M 400,450 Q 450,600 500,850" />
          <path className="lava-crack crack-4" d="M 300,750 Q 450,650 700,700" />
        </g>
      </svg>
    </div>
  );
}
