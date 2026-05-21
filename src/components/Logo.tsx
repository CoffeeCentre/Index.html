import { useState } from 'react'

interface LogoProps {
  className?: string
  light?: boolean
}

const LOGO_URL = 'https://cdn.shopify.com/s/files/1/1027/4445/7541/files/COFFEE_CENTRE_LOGO_1.png?v=1777984489&width=600'

export function Logo({ className = '', light = false }: LogoProps) {
  const [imgError, setImgError] = useState(false)
  const color = light ? 'hsl(38 33% 96%)' : 'hsl(145 35% 18%)'
  const accent = light ? 'hsl(28 60% 60%)' : 'hsl(28 60% 45%)'

  // Use real logo image, fall back to SVG mark if it fails to load
  if (!imgError) {
    return (
      <div className={`flex items-center ${className}`}>
        <img
          src={LOGO_URL}
          alt="Coffee Centre London"
          className="h-10 md:h-12 w-auto float-3d"
          style={{ filter: light ? 'brightness(0) invert(1)' : 'none' }}
          onError={() => setImgError(true)}
        />
      </div>
    )
  }

  // SVG fallback
  return (
    <div className={`flex items-center gap-3 ${className}`}>
      <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
        <circle cx="20" cy="20" r="18" stroke={color} strokeWidth="1.5" fill="none"/>
        <ellipse cx="20" cy="20" rx="7" ry="11" stroke={color} strokeWidth="1.5" fill="none" transform="rotate(-22 20 20)"/>
        <path d="M 16 14 Q 20 20 24 26" stroke={color} strokeWidth="1.5" fill="none" transform="rotate(-22 20 20)" strokeLinecap="round"/>
        <circle cx="32" cy="9" r="2" fill={accent}/>
      </svg>
      <div className="leading-tight">
        <div
          className="text-[14px] font-semibold tracking-[0.04em]"
          style={{ color, fontFamily: 'Georgia, serif' }}
        >
          COFFEE CENTRE LONDON
        </div>
        <div
          className="text-[9px] uppercase tracking-[0.28em] font-sans-alt mt-0.5"
          style={{ color: light ? 'hsl(28 60% 70%)' : 'hsl(28 60% 38%)' }}
        >
          Roastery · Equipment · Training
        </div>
      </div>
    </div>
  )
}
