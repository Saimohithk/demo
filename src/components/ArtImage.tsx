import React from 'react';

interface ArtImageProps {
  type: string;
  alt: string;
  className?: string;
  priority?: boolean;
}

export const ArtImage: React.FC<ArtImageProps> = ({ type, alt, className = '' }) => {
  return (
    <div className={`relative overflow-hidden w-full h-full select-none ${className}`}>
      {renderVisualArtwork(type, alt)}
      {/* Editorial film grain & vignette overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-black/30 pointer-events-none mix-blend-multiply" />
      <div className="absolute inset-0 bg-grain pointer-events-none opacity-40" />
      <div className="absolute inset-0 ring-1 ring-inset ring-white/10 pointer-events-none rounded-[inherit]" />
    </div>
  );
};

function renderVisualArtwork(type: string, alt: string) {
  switch (type) {
    case 'espresso':
      return (
        <svg viewBox="0 0 600 750" className="w-full h-full object-cover" preserveAspectRatio="xMidYMid slice" role="img" aria-label={alt}>
          <defs>
            <radialGradient id="esp-glow" cx="50%" cy="40%" r="55%">
              <stop offset="0%" stopColor="#C58B52" stopOpacity="0.8" />
              <stop offset="45%" stopColor="#6F4935" stopOpacity="0.9" />
              <stop offset="85%" stopColor="#1E1915" />
              <stop offset="100%" stopColor="#120E0C" />
            </radialGradient>
            <linearGradient id="crema-stream" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="#8A5A3B" />
              <stop offset="35%" stopColor="#E2A66C" />
              <stop offset="65%" stopColor="#F5D0A1" />
              <stop offset="100%" stopColor="#7B492B" />
            </linearGradient>
            <radialGradient id="cup-rim" cx="50%" cy="30%" r="60%">
              <stop offset="0%" stopColor="#3A332C" />
              <stop offset="100%" stopColor="#171411" />
            </radialGradient>
            <filter id="soft-blur">
              <feGaussianBlur stdDeviation="3" />
            </filter>
          </defs>
          <rect width="600" height="750" fill="url(#esp-glow)" />
          {/* Naked Portafilter Body */}
          <path d="M180,60 L420,60 L400,160 L200,160 Z" fill="#25211D" />
          <path d="M190,70 L410,70 L395,150 L205,150 Z" fill="#3D342C" />
          {/* Polished Brass/Steel Portafilter Rim */}
          <ellipse cx="300" cy="155" rx="105" ry="24" fill="#6A5947" stroke="#C58B52" strokeWidth="2.5" />
          <ellipse cx="300" cy="155" rx="94" ry="18" fill="#1C1814" />
          {/* Perforated basket bottom */}
          <ellipse cx="300" cy="155" rx="80" ry="14" fill="#0E0C0A" />
          
          {/* Espresso Extraction Streams Merging */}
          <path d="M260,165 Q295,220 298,380 Q301,220 340,165" fill="#4A2F1F" opacity="0.6" />
          <path d="M280,165 Q298,240 299,440 L301,440 Q302,240 320,165 Z" fill="url(#crema-stream)" />
          {/* Rich Crema Cone Stream */}
          <path d="M292,168 Q299,300 298,450 L302,450 Q301,300 308,168 Z" fill="#F0C592" />
          
          {/* Ceramic Cup in Depth */}
          <ellipse cx="300" cy="540" rx="180" ry="46" fill="#0C0A09" />
          <path d="M140,530 C140,660 190,710 300,710 C410,710 460,660 460,530 Z" fill="url(#cup-rim)" stroke="#4A3F35" strokeWidth="3" />
          {/* Cup Interior Liquid / Crema Pool */}
          <ellipse cx="300" cy="530" rx="150" ry="34" fill="#422513" />
          <ellipse cx="300" cy="530" rx="142" ry="30" fill="#754425" />
          {/* Swirling Crema in Cup */}
          <ellipse cx="295" cy="528" rx="120" ry="24" fill="#B77A44" opacity="0.8" />
          <ellipse cx="290" cy="526" rx="90" ry="16" fill="#DEAB77" opacity="0.9" />
          <circle cx="300" cy="450" r="14" fill="#FCEBD6" filter="url(#soft-blur)" opacity="0.85" />
          {/* Golden Splash droplets */}
          <circle cx="288" cy="485" r="3" fill="#FFE5C4" />
          <circle cx="314" cy="478" r="4.5" fill="#F2BF8A" />
          <circle cx="325" cy="495" r="2.5" fill="#FFE5C4" />
          <circle cx="270" cy="502" r="3.5" fill="#DEA56F" />
        </svg>
      );

    case 'crema':
      return (
        <svg viewBox="0 0 600 600" className="w-full h-full object-cover" preserveAspectRatio="xMidYMid slice" role="img" aria-label={alt}>
          <defs>
            <radialGradient id="crema-bg" cx="40%" cy="35%" r="65%">
              <stop offset="0%" stopColor="#2E241D" />
              <stop offset="60%" stopColor="#171411" />
              <stop offset="100%" stopColor="#0B0908" />
            </radialGradient>
            <radialGradient id="ceramic-rim" cx="50%" cy="50%" r="50%">
              <stop offset="85%" stopColor="#2F2923" />
              <stop offset="92%" stopColor="#584A3E" />
              <stop offset="96%" stopColor="#8C7969" />
              <stop offset="100%" stopColor="#1E1915" />
            </radialGradient>
          </defs>
          <rect width="600" height="600" fill="url(#crema-bg)" />
          {/* Rustic dark wood table grain lines */}
          <path d="M0,80 Q300,100 600,75" stroke="#231C17" strokeWidth="1.5" fill="none" opacity="0.7" />
          <path d="M0,220 Q300,240 600,215" stroke="#231C17" strokeWidth="2" fill="none" opacity="0.7" />
          <path d="M0,450 Q300,430 600,460" stroke="#231C17" strokeWidth="1.8" fill="none" opacity="0.6" />
          
          {/* Artisan Ceramic Cup Overhead (Round) */}
          <circle cx="300" cy="300" r="230" fill="url(#ceramic-rim)" />
          <circle cx="300" cy="300" r="200" fill="#2E1B10" />
          {/* Crema Surface */}
          <circle cx="300" cy="300" r="192" fill="#5E381E" />
          <circle cx="300" cy="300" r="176" fill="#88512C" opacity="0.85" />
          
          {/* Microfoam Latte Art - Rosetta & Heart Swirls */}
          <path d="M300,140 C240,190 230,280 300,430 C370,280 360,190 300,140 Z" fill="#F6ECD9" opacity="0.95" />
          <path d="M300,180 C260,210 255,270 300,380 C345,270 340,210 300,180 Z" fill="#FDF7EE" />
          {/* Rosetta Leaves */}
          <path d="M260,230 Q220,250 240,280 Q270,270 280,250 Z" fill="#F4EBDD" />
          <path d="M340,230 Q380,250 360,280 Q330,270 320,250 Z" fill="#F4EBDD" />
          <path d="M255,290 Q215,310 235,340 Q265,330 275,310 Z" fill="#F4EBDD" />
          <path d="M345,290 Q385,310 365,340 Q335,330 325,310 Z" fill="#F4EBDD" />
          {/* Central Stem Line */}
          <path d="M300,135 Q299,300 300,455" stroke="#C58B52" strokeWidth="3" strokeLinecap="round" />
          {/* Crema Edge Foam Ring */}
          <circle cx="300" cy="300" r="185" stroke="#C7925C" strokeWidth="8" fill="none" strokeDasharray="18,6,32,10" opacity="0.5" />
          {/* Single fallen coffee bean beside cup */}
          <ellipse cx="505" cy="480" rx="22" ry="14" fill="#382417" transform="rotate(-30 505 480)" />
          <path d="M490,474 Q505,480 520,486" stroke="#1D120B" strokeWidth="2.5" fill="none" />
        </svg>
      );

    case 'barista':
      return (
        <svg viewBox="0 0 600 800" className="w-full h-full object-cover" preserveAspectRatio="xMidYMid slice" role="img" aria-label={alt}>
          <defs>
            <linearGradient id="sun-beam" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#C58B52" stopOpacity="0.35" />
              <stop offset="60%" stopColor="#74765A" stopOpacity="0.1" />
              <stop offset="100%" stopColor="#171411" stopOpacity="0" />
            </linearGradient>
            <linearGradient id="kettle-metal" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="#1E1916" />
              <stop offset="40%" stopColor="#3C342C" />
              <stop offset="70%" stopColor="#2A241F" />
              <stop offset="100%" stopColor="#120F0D" />
            </linearGradient>
          </defs>
          <rect width="600" height="800" fill="#171411" />
          {/* Sunbeam Angle */}
          <polygon points="50,0 280,0 600,700 300,800" fill="url(#sun-beam)" />
          
          {/* Barista Linen Apron Silhouette */}
          <path d="M120,380 C150,220 280,180 380,240 C430,270 480,450 500,800 L80,800 Z" fill="#201C18" />
          <path d="M210,210 L225,360 L330,360 L345,210 Z" fill="#2E2822" stroke="#483F35" strokeWidth="1" />
          
          {/* Matte Black Gooseneck Kettle */}
          <path d="M70,220 C100,210 200,210 230,240 L240,380 C240,430 80,440 60,370 Z" fill="url(#kettle-metal)" stroke="#4A3F33" strokeWidth="2" />
          {/* Gooseneck Spout */}
          <path d="M230,260 Q340,240 330,360" stroke="#2E2721" strokeWidth="12" fill="none" strokeLinecap="round" />
          <path d="M230,260 Q340,240 330,360" stroke="#5E4E3F" strokeWidth="4" fill="none" strokeLinecap="round" />
          {/* Water Stream */}
          <line x1="330" y1="365" x2="332" y2="520" stroke="#F4EBDD" strokeWidth="2.5" opacity="0.85" />
          <line x1="330" y1="365" x2="332" y2="520" stroke="#FFE9C7" strokeWidth="1" opacity="0.95" />
          
          {/* Ceramic Origami / V60 Dripper */}
          <polygon points="260,520 404,520 360,610 304,610" fill="#D9C7B2" stroke="#F4EBDD" strokeWidth="2" />
          {/* Coffee Grounds Bed Blooming */}
          <ellipse cx="332" cy="530" rx="55" ry="14" fill="#3D2415" />
          <ellipse cx="332" cy="530" rx="35" ry="9" fill="#6A3F24" />
          <circle cx="332" cy="528" r="6" fill="#F4EBDD" opacity="0.6" />
          
          {/* Glass Server below */}
          <path d="M290,620 L374,620 L394,730 C394,760 270,760 270,730 Z" fill="#26211C" opacity="0.7" stroke="#7A6A58" strokeWidth="2" />
          {/* Amber Brew Level */}
          <path d="M276,700 L388,700 L390,730 C390,755 274,755 274,730 Z" fill="#753C19" opacity="0.85" />
          
          {/* Delicate Steam Wisps */}
          <path d="M330,480 Q320,440 340,400 T330,340" stroke="#F4EBDD" strokeWidth="2" fill="none" opacity="0.25" strokeLinecap="round" />
          <path d="M350,500 Q370,450 350,410 T370,360" stroke="#F4EBDD" strokeWidth="1.5" fill="none" opacity="0.2" strokeLinecap="round" />
        </svg>
      );

    case 'pastry':
      return (
        <svg viewBox="0 0 600 600" className="w-full h-full object-cover" preserveAspectRatio="xMidYMid slice" role="img" aria-label={alt}>
          <defs>
            <radialGradient id="pastry-light" cx="35%" cy="30%" r="70%">
              <stop offset="0%" stopColor="#30261E" />
              <stop offset="60%" stopColor="#1A1512" />
              <stop offset="100%" stopColor="#0E0C0A" />
            </radialGradient>
            <linearGradient id="crust-gold" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#E5B26E" />
              <stop offset="35%" stopColor="#C5843C" />
              <stop offset="70%" stopColor="#8A4E1B" />
              <stop offset="100%" stopColor="#4A2609" />
            </linearGradient>
            <linearGradient id="pistachio-cream" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="#5E6342" />
              <stop offset="50%" stopColor="#868B5C" />
              <stop offset="100%" stopColor="#6C7047" />
            </linearGradient>
          </defs>
          <rect width="600" height="600" fill="url(#pastry-light)" />
          {/* Dark Ceramic Slate Platter */}
          <ellipse cx="300" cy="380" rx="240" ry="110" fill="#201C18" stroke="#3D352C" strokeWidth="3" />
          
          {/* Croissant Crescent Body with Flaky Lamination Curves */}
          {/* Base shape */}
          <path d="M120,380 C140,240 280,190 420,270 C470,300 490,360 480,390 C460,420 380,410 320,410 C240,410 160,420 120,380 Z" fill="url(#crust-gold)" />
          {/* Laminated layered ridges */}
          <path d="M170,350 Q240,240 330,230 Q410,240 450,330" fill="none" stroke="#F1CA8C" strokeWidth="8" strokeLinecap="round" />
          <path d="M190,365 Q260,270 340,260 Q400,270 435,350" fill="none" stroke="#5E2F0A" strokeWidth="5" strokeLinecap="round" />
          <path d="M220,380 Q280,300 350,295 Q395,305 415,365" fill="none" stroke="#DCA259" strokeWidth="9" strokeLinecap="round" />
          <path d="M245,395 Q295,335 345,330 Q380,340 395,385" fill="none" stroke="#482207" strokeWidth="6" strokeLinecap="round" />
          
          {/* Pistachio Praline Drizzle */}
          <path d="M230,310 Q280,260 380,320 T440,360" fill="none" stroke="url(#pistachio-cream)" strokeWidth="10" strokeLinecap="round" />
          <path d="M200,340 Q290,290 360,350" fill="none" stroke="url(#pistachio-cream)" strokeWidth="6" strokeLinecap="round" />
          
          {/* Crushed Emerald Pistachio Nuts & Flaky Crumbs */}
          <circle cx="270" cy="280" r="5" fill="#9BA16A" />
          <circle cx="285" cy="275" r="4" fill="#686C45" />
          <circle cx="330" cy="270" r="6" fill="#A8AE74" />
          <circle cx="360" cy="305" r="5" fill="#888E5B" />
          <circle cx="380" cy="325" r="4" fill="#666A42" />
          <circle cx="395" cy="340" r="6" fill="#9BA16A" />
          
          {/* Golden Pastry Flakes scattered on ceramic */}
          <polygon points="170,410 185,415 178,422" fill="#E2AE68" />
          <polygon points="210,430 220,432 216,438" fill="#C5873E" />
          <polygon points="410,420 425,418 418,427" fill="#E2AE68" />
          <polygon points="440,405 450,408 444,414" fill="#A86A2B" />
          <circle cx="250" cy="425" r="3" fill="#8A905E" />
        </svg>
      );

    case 'interior':
      return (
        <svg viewBox="0 0 600 800" className="w-full h-full object-cover" preserveAspectRatio="xMidYMid slice" role="img" aria-label={alt}>
          <defs>
            <linearGradient id="warm-ray" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#C58B52" stopOpacity="0.5" />
              <stop offset="50%" stopColor="#E0B788" stopOpacity="0.15" />
              <stop offset="100%" stopColor="#171411" stopOpacity="0" />
            </linearGradient>
            <linearGradient id="wood-counter" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="#3C2A1E" />
              <stop offset="50%" stopColor="#563B2A" />
              <stop offset="100%" stopColor="#2A1C14" />
            </linearGradient>
          </defs>
          <rect width="600" height="800" fill="#14110E" />
          
          {/* Arched Parisian Window */}
          <path d="M120,60 C120,0 380,0 380,60 L380,420 L120,420 Z" fill="#24201A" stroke="#42392F" strokeWidth="4" />
          <line x1="250" y1="10" x2="250" y2="420" stroke="#42392F" strokeWidth="3" />
          <line x1="120" y1="180" x2="380" y2="180" stroke="#42392F" strokeWidth="3" />
          <line x1="120" y1="300" x2="380" y2="300" stroke="#42392F" strokeWidth="3" />
          
          {/* Sunlight Angle streaming from window */}
          <polygon points="120,100 380,60 600,650 0,650" fill="url(#warm-ray)" />
          
          {/* Architectural Concrete Wall & Smoked Oak Paneling */}
          <rect x="0" y="420" width="600" height="380" fill="#1A1613" />
          <rect x="40" y="460" width="520" height="20" fill="#31271F" />
          
          {/* Long Minimalist Espresso Bar Counter */}
          <polygon points="0,560 600,520 600,800 0,800" fill="url(#wood-counter)" />
          <polygon points="0,560 600,520 600,540 0,580" fill="#6B4B36" />
          
          {/* Silhouette of Custom Brass/Matte Espresso Machine */}
          <rect x="220" y="450" width="160" height="80" rx="8" fill="#25201A" stroke="#C58B52" strokeWidth="1.5" />
          <rect x="235" y="460" width="40" height="25" fill="#3D3228" />
          <rect x="290" y="460" width="40" height="25" fill="#3D3228" />
          <circle cx="255" cy="500" r="10" fill="#6F4935" />
          <circle cx="310" cy="500" r="10" fill="#6F4935" />
          {/* Brass hanging pendant light */}
          <line x1="450" y1="0" x2="450" y2="280" stroke="#C58B52" strokeWidth="2" />
          <polygon points="415,310 485,310 460,280 440,280" fill="#C58B52" />
          <circle cx="450" cy="320" r="8" fill="#FDF3E3" />
          <circle cx="450" cy="320" r="30" fill="#C58B52" opacity="0.25" />
        </svg>
      );

    case 'beans':
      return (
        <svg viewBox="0 0 600 600" className="w-full h-full object-cover" preserveAspectRatio="xMidYMid slice" role="img" aria-label={alt}>
          <defs>
            <radialGradient id="beans-lighting" cx="45%" cy="40%" r="60%">
              <stop offset="0%" stopColor="#2A211A" />
              <stop offset="70%" stopColor="#15120F" />
              <stop offset="100%" stopColor="#0B0907" />
            </radialGradient>
          </defs>
          <rect width="600" height="600" fill="url(#beans-lighting)" />
          {/* Volcanic Slate texture background */}
          <path d="M40,120 L560,90 L520,540 L80,520 Z" fill="#1C1814" stroke="#2B2520" strokeWidth="1.5" />
          
          {/* Scattered Single Origin Beans in sharp focus */}
          {[
            { cx: 240, cy: 220, rx: 32, ry: 20, rot: 25 },
            { cx: 320, cy: 190, rx: 35, ry: 22, rot: -40 },
            { cx: 280, cy: 280, rx: 36, ry: 23, rot: 15 },
            { cx: 380, cy: 260, rx: 34, ry: 21, rot: 60 },
            { cx: 200, cy: 310, rx: 33, ry: 20, rot: -15 },
            { cx: 330, cy: 350, rx: 36, ry: 22, rot: 45 },
            { cx: 250, cy: 400, rx: 34, ry: 21, rot: -30 },
            { cx: 400, cy: 370, rx: 32, ry: 19, rot: 10 },
            { cx: 160, cy: 240, rx: 30, ry: 18, rot: 50 },
            { cx: 430, cy: 210, rx: 31, ry: 19, rot: -20 },
          ].map((b, i) => (
            <g key={i} transform={`rotate(${b.rot} ${b.cx} ${b.cy})`}>
              <ellipse cx={b.cx} cy={b.cy} rx={b.rx} ry={b.ry} fill="#462C1D" stroke="#23150D" strokeWidth="2" />
              <path
                d={`M${b.cx - b.rx + 6},${b.cy} Q${b.cx},${b.cy - 4} ${b.cx + b.rx - 6},${b.cy}`}
                stroke="#1B1009"
                strokeWidth="3.5"
                fill="none"
              />
              <ellipse cx={b.cx - 6} cy={b.cy - 5} rx={b.rx * 0.4} ry={b.ry * 0.3} fill="#7A4C32" opacity="0.6" />
            </g>
          ))}
          {/* Brass Cupping Spoon Tip */}
          <path d="M480,480 Q430,410 400,430 Q440,510 480,480" fill="#C58B52" stroke="#8E5E30" strokeWidth="2" />
        </svg>
      );

    case 'cups':
      return (
        <svg viewBox="0 0 600 700" className="w-full h-full object-cover" preserveAspectRatio="xMidYMid slice" role="img" aria-label={alt}>
          <defs>
            <radialGradient id="brass-tray" cx="50%" cy="60%" r="55%">
              <stop offset="0%" stopColor="#4A3B29" />
              <stop offset="70%" stopColor="#2D2318" />
              <stop offset="100%" stopColor="#14100C" />
            </radialGradient>
          </defs>
          <rect width="600" height="700" fill="#14110E" />
          {/* Brushed Brass Warming Tray */}
          <ellipse cx="300" cy="560" rx="260" ry="90" fill="url(#brass-tray)" stroke="#C58B52" strokeWidth="2" />
          
          {/* Ceramic Cup Stack 1 (Warm Cream Glaze) */}
          <ellipse cx="230" cy="460" rx="80" ry="24" fill="#3D352B" />
          <path d="M150,455 C150,530 180,560 230,560 C280,560 310,530 310,455 Z" fill="#E8DEC8" stroke="#5B4F41" strokeWidth="2" />
          <ellipse cx="230" cy="455" rx="72" ry="20" fill="#4B3A2C" />
          
          {/* Ceramic Cup Stack 2 (Charcoal Matte Glaze) */}
          <ellipse cx="370" cy="420" rx="85" ry="25" fill="#1A1816" />
          <path d="M285,415 C285,495 320,530 370,530 C420,530 455,495 455,415 Z" fill="#2E2824" stroke="#483F38" strokeWidth="2" />
          <ellipse cx="370" cy="415" rx="76" ry="21" fill="#171411" />
          
          {/* Little Espresso Cup perched on top */}
          <path d="M200,340 C200,395 220,415 250,415 C280,415 300,395 300,340 Z" fill="#D3C5AE" stroke="#685B49" strokeWidth="2" />
          <ellipse cx="250" cy="340" rx="46" ry="14" fill="#382C22" />
        </svg>
      );

    case 'flatwhite':
      return (
        <svg viewBox="0 0 600 600" className="w-full h-full object-cover" preserveAspectRatio="xMidYMid slice" role="img" aria-label={alt}>
          <rect width="600" height="600" fill="#1A1612" />
          <circle cx="300" cy="300" r="210" fill="#2F2923" stroke="#483D33" strokeWidth="3" />
          <circle cx="300" cy="300" r="180" fill="#4B2C1A" />
          <circle cx="300" cy="300" r="170" fill="#693F26" />
          {/* Flat white dot / heart latte art */}
          <circle cx="300" cy="300" r="120" fill="#F4EBDD" />
          <path d="M300,210 C270,180 230,220 300,340 C370,220 330,180 300,210 Z" fill="#FFF8EE" />
          <circle cx="300" cy="270" r="16" fill="#C58B52" opacity="0.6" />
        </svg>
      );

    case 'coldbrew':
      return (
        <svg viewBox="0 0 600 600" className="w-full h-full object-cover" preserveAspectRatio="xMidYMid slice" role="img" aria-label={alt}>
          <rect width="600" height="600" fill="#14110E" />
          {/* Tumbler Glass with Clear Cut Ice and Deep Amber Cold Brew */}
          <polygon points="210,120 390,120 370,510 230,510" fill="#26201B" stroke="#6E5E4E" strokeWidth="2.5" />
          {/* Liquid */}
          <polygon points="220,220 380,220 366,495 234,495" fill="#4F2610" opacity="0.9" />
          {/* Giant Hand-Carved Ice Cube */}
          <polygon points="260,250 340,230 330,340 250,360" fill="#F4EBDD" opacity="0.3" stroke="#FFF" strokeWidth="1" />
          <polygon points="340,230 360,270 350,370 330,340" fill="#DCD3C4" opacity="0.2" />
          {/* Condensation beads on glass */}
          <circle cx="240" cy="280" r="2" fill="#F4EBDD" opacity="0.7" />
          <circle cx="250" cy="390" r="3" fill="#F4EBDD" opacity="0.6" />
          <circle cx="360" cy="320" r="2.5" fill="#F4EBDD" opacity="0.7" />
        </svg>
      );

    case 'brownbutter':
      return (
        <svg viewBox="0 0 600 600" className="w-full h-full object-cover" preserveAspectRatio="xMidYMid slice" role="img" aria-label={alt}>
          <rect width="600" height="600" fill="#191512" />
          <circle cx="300" cy="300" r="210" fill="#3D3025" stroke="#5E4C3C" strokeWidth="3" />
          <circle cx="300" cy="300" r="185" fill="#5E361C" />
          {/* Caramel brown butter microfoam */}
          <circle cx="300" cy="300" r="160" fill="#DEC29B" />
          {/* Torched sugar / brown butter spiral swirl */}
          <path d="M300,300 M240,300 A60,60 0 1,0 360,300 A40,40 0 1,0 280,300 A20,20 0 1,0 320,300" fill="none" stroke="#874719" strokeWidth="6" strokeLinecap="round" />
          {/* Cinnamon & Nutmeg dust specks */}
          {[18, 36, 54, 72, 90, 120, 160, 200, 240, 280, 310].map((deg, idx) => (
            <circle
              key={idx}
              cx={300 + 70 * Math.cos((deg * Math.PI) / 180)}
              cy={300 + 70 * Math.sin((deg * Math.PI) / 180)}
              r="2.5"
              fill="#522709"
            />
          ))}
        </svg>
      );

    default:
      return (
        <div className="w-full h-full flex flex-col items-center justify-center bg-[#211C18] text-[#F4EBDD] p-6 text-center">
          <div className="w-12 h-12 rounded-full border border-[#C58B52]/40 flex items-center justify-center mb-3">
            <span className="font-serif text-lg text-[#C58B52]">AO</span>
          </div>
          <span className="font-serif text-lg tracking-wide">{alt}</span>
          <span className="text-xs text-[#F4EBDD]/50 mt-1 uppercase tracking-widest font-sans">Atelier Specialty</span>
        </div>
      );
  }
}
