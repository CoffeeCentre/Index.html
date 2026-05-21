import { useState } from 'react'
import { Plus, Star } from 'lucide-react'
import type { Product, Category } from '@/data/products'
import { useCart } from '@/contexts/CartContext'
import { useContactPrefill } from '@/App'
import { Button } from '@/components/ui/button'

interface ProductCardProps {
  product: Product
  onClick?: () => void
  onEnquire?: () => void
}

function ProductVisual({ product }: { product: Product }) {
  const [imgError, setImgError] = useState(false)
  const { category, name, image } = product

  // Use real image if available
  if (image && !imgError) {
    return (
      <div className="aspect-[4/5] bg-white overflow-hidden flex items-center justify-center">
        <img
          src={image}
          alt={name}
          className="w-full h-full object-cover"
          loading="lazy"
          onError={() => setImgError(true)}
        />
      </div>
    )
  }

  // Fall back to SVG illustrations per category
  const isGreen = category === 'green-coffee'
  if (category === 'coffee' || category === 'green-coffee') {
    const bagColor = isGreen ? 'hsl(85 25% 55%)' : 'hsl(25 30% 18%)'
    const accentColor = isGreen ? 'hsl(85 30% 30%)' : 'hsl(28 60% 45%)'
    return (
      <div className="aspect-[4/5] bg-gradient-to-br from-secondary/60 to-muted/40 flex items-center justify-center overflow-hidden relative">
        <svg viewBox="0 0 160 200" className="w-[58%] h-auto drop-shadow-md">
          <path
            d="M 30 35 L 30 180 Q 30 188 38 188 L 122 188 Q 130 188 130 180 L 130 35 Z"
            fill={bagColor}
          />
          <path
            d="M 25 35 L 80 18 L 135 35 L 130 42 L 80 28 L 30 42 Z"
            fill={bagColor}
            opacity="0.85"
          />
          <rect x="45" y="75" width="70" height="80" rx="2" fill={isGreen ? 'hsl(38 33% 92%)' : 'hsl(38 33% 88%)'} />
          <ellipse cx="80" cy="90" rx="6" ry="9" fill={accentColor} />
          <rect x="55" y="106" width="50" height="2.5" fill={accentColor} opacity="0.8" />
          <rect x="60" y="113" width="40" height="1.5" fill={bagColor} opacity="0.5" />
          <rect x="60" y="118" width="40" height="1.5" fill={bagColor} opacity="0.5" />
          <rect x="55" y="142" width="50" height="1" fill={accentColor} opacity="0.6" />
          <text x="80" y="150" textAnchor="middle" fontSize="5" fill={bagColor} fontFamily="Georgia, serif" opacity="0.8">
            {isGreen ? 'GREEN COFFEE' : 'ROASTED'}
          </text>
        </svg>
      </div>
    )
  }

  if (category === 'training') {
    return <TrainingVisual product={product} />
  }

  if (category === 'consulting') {
    return <ConsultingVisual product={product} />
  }

  if (category === 'commercial-equipment') {
    const lower = name.toLowerCase()
    return (
      <div className="aspect-[4/5] bg-gradient-to-br from-primary/10 to-secondary/40 flex items-center justify-center">
        <svg viewBox="0 0 200 200" className="w-[70%] h-auto drop-shadow-md">
          {lower.includes('2-group') && <CommercialEspresso groups={2} />}
          {lower.includes('3-group') && <CommercialEspresso groups={3} />}
          {lower.includes('grinder') && <CommercialGrinder />}
          {lower.includes('roaster') && <DrumRoaster />}
        </svg>
      </div>
    )
  }

  // Product-specific home equipment fallback based on name
  const lower = name.toLowerCase()
  return (
    <div className="aspect-[4/5] bg-gradient-to-br from-secondary/60 to-muted/40 flex items-center justify-center">
      <svg viewBox="0 0 160 200" className="w-[62%] h-auto drop-shadow-md">
        {lower.includes('kettle') && <Kettle dark={lower.includes('black')} />}
        {lower.includes('bundle') && <BrewerBundle />}
        {!lower.includes('kettle') && !lower.includes('bundle') && <HomeGrinder />}
      </svg>
    </div>
  )
}

function Kettle({ dark = true }: { dark?: boolean }) {
  const bodyColor = dark ? 'hsl(0 0% 18%)' : 'hsl(0 0% 92%)'
  const accentColor = dark ? 'hsl(0 0% 28%)' : 'hsl(0 0% 78%)'
  const stroke = dark ? 'hsl(0 0% 8%)' : 'hsl(0 0% 60%)'
  return (
    <g>
      <ellipse cx="80" cy="172" rx="42" ry="6" fill="hsl(0 0% 0%)" opacity="0.15"/>
      {/* Kettle body */}
      <path d="M 48 90 Q 48 165 80 165 Q 112 165 112 90 Z" fill={bodyColor} stroke={stroke} strokeWidth="0.8"/>
      {/* Top rim */}
      <ellipse cx="80" cy="88" rx="32" ry="6" fill={accentColor}/>
      <ellipse cx="80" cy="86" rx="28" ry="4" fill={bodyColor}/>
      {/* Gooseneck spout */}
      <path d="M 108 100 Q 132 88 138 60 Q 138 50 130 48" stroke={bodyColor} strokeWidth="7" fill="none" strokeLinecap="round"/>
      <path d="M 108 100 Q 132 88 138 60 Q 138 50 130 48" stroke={stroke} strokeWidth="0.6" fill="none" strokeLinecap="round"/>
      {/* Handle */}
      <path d="M 48 105 Q 30 115 30 135 Q 30 155 50 150" stroke={dark ? 'hsl(0 0% 10%)' : 'hsl(0 0% 30%)'} strokeWidth="5" fill="none" strokeLinecap="round"/>
      {/* Base / display */}
      <rect x="55" y="160" width="50" height="10" rx="2" fill={dark ? 'hsl(0 0% 10%)' : 'hsl(0 0% 30%)'}/>
      <circle cx="92" cy="138" r="3" fill="hsl(28 60% 50%)"/>
      <rect x="62" y="135" width="20" height="8" rx="1" fill={dark ? 'hsl(0 0% 8%)' : 'hsl(0 0% 35%)'}/>
    </g>
  )
}

function BrewerBundle() {
  return (
    <g>
      {/* Filter coffee brewer (left) */}
      <rect x="22" y="55" width="48" height="110" rx="3" fill="hsl(0 0% 16%)"/>
      <rect x="26" y="62" width="40" height="8" rx="1" fill="hsl(28 60% 45%)"/>
      {/* Carafe */}
      <path d="M 32 95 L 32 145 Q 32 155 42 155 L 50 155 Q 60 155 60 145 L 60 95 Z" fill="hsl(25 30% 22%)"/>
      <rect x="28" y="90" width="36" height="6" rx="1" fill="hsl(0 0% 28%)"/>
      <ellipse cx="46" cy="120" rx="12" ry="4" fill="hsl(25 30% 14%)" opacity="0.6"/>
      {/* Grinder (right) */}
      <rect x="82" y="40" width="40" height="30" rx="2" fill="hsl(0 0% 22%)"/>
      <rect x="86" y="46" width="32" height="18" rx="1" fill="hsl(0 0% 78%)" opacity="0.6"/>
      <rect x="88" y="70" width="28" height="55" fill="hsl(0 0% 18%)"/>
      <circle cx="102" cy="98" r="10" fill="hsl(28 60% 45%)"/>
      <circle cx="102" cy="98" r="4" fill="hsl(0 0% 10%)"/>
      <rect x="90" y="125" width="24" height="22" fill="hsl(0 0% 22%)"/>
      <rect x="80" y="147" width="44" height="5" fill="hsl(0 0% 10%)"/>
      {/* Floor shadow */}
      <ellipse cx="80" cy="172" rx="58" ry="4" fill="hsl(0 0% 0%)" opacity="0.12"/>
    </g>
  )
}

function HomeGrinder() {
  return (
    <g>
      {/* Hopper top */}
      <ellipse cx="80" cy="32" rx="22" ry="5" fill="hsl(0 0% 30%)"/>
      <path d="M 58 32 L 62 56 L 98 56 L 102 32 Z" fill="hsl(0 0% 22%)"/>
      {/* Body */}
      <rect x="58" y="56" width="44" height="50" rx="2" fill="hsl(0 0% 18%)"/>
      <text x="80" y="84" textAnchor="middle" fontSize="6" fill="hsl(28 60% 50%)" fontFamily="Georgia" letterSpacing="1">WILFA</text>
      {/* Dial */}
      <circle cx="80" cy="98" r="6" fill="hsl(28 60% 45%)"/>
      <circle cx="80" cy="98" r="2" fill="hsl(0 0% 10%)"/>
      {/* Catch */}
      <rect x="62" y="108" width="36" height="32" rx="2" fill="hsl(0 0% 22%)"/>
      <rect x="68" y="114" width="24" height="22" rx="1" fill="hsl(25 30% 18%)" opacity="0.5"/>
      {/* Base */}
      <rect x="48" y="142" width="64" height="6" fill="hsl(0 0% 10%)"/>
      {/* Shadow */}
      <ellipse cx="80" cy="172" rx="42" ry="4" fill="hsl(0 0% 0%)" opacity="0.12"/>
    </g>
  )
}

function ConsultingVisual({ product }: { product: Product }) {
  const name = product.name.toLowerCase()

  // Vary the illustration based on the service
  const isSpace = name.includes('space') || name.includes('design') || name.includes('workflow')
  const isEquipment = name.includes('equipment') || name.includes('machinery')
  const isAudit = name.includes('audit')
  const isSupplier = name.includes('supplier') || name.includes('sourcing')
  const isFull = name.includes('full project')

  return (
    <div className="aspect-[4/5] bg-gradient-to-br from-background to-secondary/40 flex items-center justify-center relative overflow-hidden">
      {/* Blueprint grid background */}
      <svg className="absolute inset-0 w-full h-full opacity-[0.08]" viewBox="0 0 200 250" preserveAspectRatio="xMidYMid slice">
        <defs>
          <pattern id={`grid-${product.id}`} x="0" y="0" width="10" height="10" patternUnits="userSpaceOnUse">
            <path d="M 10 0 L 0 0 0 10" fill="none" stroke="hsl(20 18% 10%)" strokeWidth="0.3"/>
          </pattern>
          <pattern id={`grid-${product.id}-major`} x="0" y="0" width="50" height="50" patternUnits="userSpaceOnUse">
            <path d="M 50 0 L 0 0 0 50" fill="none" stroke="hsl(20 18% 10%)" strokeWidth="0.6"/>
          </pattern>
        </defs>
        <rect width="200" height="250" fill={`url(#grid-${product.id})`}/>
        <rect width="200" height="250" fill={`url(#grid-${product.id}-major)`}/>
      </svg>

      <svg viewBox="0 0 180 220" className="w-[80%] h-auto relative z-10">
        {/* Drawing frame */}
        <rect x="8" y="8" width="164" height="204" fill="none" stroke="hsl(20 18% 10%)" strokeWidth="0.8"/>
        <rect x="12" y="12" width="156" height="196" fill="none" stroke="hsl(0 65% 42%)" strokeWidth="0.4"/>

        {/* Title block top */}
        <rect x="12" y="12" width="156" height="14" fill="hsl(20 18% 10%)"/>
        <text x="90" y="22" textAnchor="middle" fontSize="5" fill="hsl(38 33% 96%)" fontFamily="Helvetica, sans-serif" letterSpacing="2">
          PROJECT BRIEF · CCL
        </text>

        {/* Main content per service type */}
        {isSpace && <SpaceDesignDrawing />}
        {isEquipment && <EquipmentSpecDrawing />}
        {isAudit && <AuditDrawing />}
        {isSupplier && <SupplierDrawing />}
        {isFull && <FullProjectDrawing />}
        {!isSpace && !isEquipment && !isAudit && !isSupplier && !isFull && <ConceptDrawing />}

        {/* Bottom title block */}
        <rect x="12" y="180" width="156" height="28" fill="none" stroke="hsl(20 18% 10%)" strokeWidth="0.4"/>
        <line x1="100" y1="180" x2="100" y2="208" stroke="hsl(20 18% 10%)" strokeWidth="0.4"/>
        <line x1="12" y1="194" x2="168" y2="194" stroke="hsl(20 18% 10%)" strokeWidth="0.4"/>

        <text x="16" y="190" fontSize="3.5" fill="hsl(20 18% 10%)" fontFamily="Helvetica, sans-serif" letterSpacing="0.8" opacity="0.6">
          PROJECT
        </text>
        <text x="16" y="204" fontSize="4.5" fill="hsl(20 18% 10%)" fontFamily="Georgia, serif" fontWeight="600" letterSpacing="0.3">
          {(product.name.length > 18 ? product.name.slice(0, 18) + '…' : product.name).toUpperCase()}
        </text>

        <text x="104" y="190" fontSize="3.5" fill="hsl(20 18% 10%)" fontFamily="Helvetica, sans-serif" letterSpacing="0.8" opacity="0.6">
          DURATION
        </text>
        <text x="104" y="204" fontSize="4.5" fill="hsl(0 65% 42%)" fontFamily="Georgia, serif" fontWeight="600" letterSpacing="0.3">
          {product.consultingFormat?.toUpperCase() || 'FLEXIBLE'}
        </text>
      </svg>
    </div>
  )
}

// Concept Development — sketch / brand mark
function ConceptDrawing() {
  return (
    <g>
      <text x="90" y="48" textAnchor="middle" fontSize="6" fill="hsl(20 18% 10%)" fontFamily="Helvetica, sans-serif" letterSpacing="2" opacity="0.5">
        CONCEPT — SHEET 01
      </text>
      {/* Brand mark sketch */}
      <circle cx="90" cy="95" r="22" fill="none" stroke="hsl(20 18% 10%)" strokeWidth="1"/>
      <circle cx="90" cy="95" r="22" fill="none" stroke="hsl(0 65% 42%)" strokeWidth="0.4" strokeDasharray="1 1.5"/>
      <text x="90" y="99" textAnchor="middle" fontSize="14" fill="hsl(20 18% 10%)" fontFamily="Georgia, serif" fontWeight="bold">
        ☕
      </text>
      {/* Brand keywords */}
      <text x="36" y="130" fontSize="5" fill="hsl(20 18% 10%)" fontFamily="Helvetica, sans-serif" letterSpacing="1.5">
        · POSITIONING
      </text>
      <text x="36" y="142" fontSize="5" fill="hsl(20 18% 10%)" fontFamily="Helvetica, sans-serif" letterSpacing="1.5">
        · CUSTOMER JOURNEY
      </text>
      <text x="36" y="154" fontSize="5" fill="hsl(20 18% 10%)" fontFamily="Helvetica, sans-serif" letterSpacing="1.5">
        · MENU & PRICING
      </text>
      <text x="36" y="166" fontSize="5" fill="hsl(0 65% 42%)" fontFamily="Helvetica, sans-serif" letterSpacing="1.5">
        · BRAND STORY
      </text>
    </g>
  )
}

// Space Design — floor plan
function SpaceDesignDrawing() {
  return (
    <g>
      <text x="90" y="40" textAnchor="middle" fontSize="6" fill="hsl(20 18% 10%)" fontFamily="Helvetica, sans-serif" letterSpacing="2" opacity="0.5">
        FLOOR PLAN — SHEET 01
      </text>
      {/* Walls */}
      <rect x="28" y="50" width="124" height="118" fill="none" stroke="hsl(20 18% 10%)" strokeWidth="1.5"/>
      {/* Bar counter */}
      <rect x="40" y="62" width="60" height="14" fill="hsl(0 65% 42%)" opacity="0.85"/>
      <text x="70" y="71" textAnchor="middle" fontSize="4" fill="hsl(38 33% 96%)" fontFamily="Helvetica, sans-serif" letterSpacing="0.5">BAR</text>
      {/* Espresso machine area */}
      <rect x="40" y="80" width="20" height="8" fill="none" stroke="hsl(20 18% 10%)" strokeWidth="0.5"/>
      <text x="50" y="86" textAnchor="middle" fontSize="3" fill="hsl(20 18% 10%)" fontFamily="Helvetica, sans-serif">ESP</text>
      <rect x="64" y="80" width="16" height="8" fill="none" stroke="hsl(20 18% 10%)" strokeWidth="0.5"/>
      <text x="72" y="86" textAnchor="middle" fontSize="3" fill="hsl(20 18% 10%)" fontFamily="Helvetica, sans-serif">GR</text>
      {/* Seating */}
      <circle cx="120" cy="100" r="4" fill="none" stroke="hsl(20 18% 10%)" strokeWidth="0.5"/>
      <circle cx="135" cy="100" r="4" fill="none" stroke="hsl(20 18% 10%)" strokeWidth="0.5"/>
      <circle cx="120" cy="120" r="4" fill="none" stroke="hsl(20 18% 10%)" strokeWidth="0.5"/>
      <circle cx="135" cy="120" r="4" fill="none" stroke="hsl(20 18% 10%)" strokeWidth="0.5"/>
      <circle cx="120" cy="140" r="4" fill="none" stroke="hsl(20 18% 10%)" strokeWidth="0.5"/>
      <circle cx="135" cy="140" r="4" fill="none" stroke="hsl(20 18% 10%)" strokeWidth="0.5"/>
      {/* Tables */}
      <rect x="115" y="95" width="25" height="14" fill="none" stroke="hsl(20 18% 10%)" strokeWidth="0.5"/>
      <rect x="115" y="115" width="25" height="14" fill="none" stroke="hsl(20 18% 10%)" strokeWidth="0.5"/>
      <rect x="115" y="135" width="25" height="14" fill="none" stroke="hsl(20 18% 10%)" strokeWidth="0.5"/>
      {/* Door */}
      <path d="M 28 158 A 10 10 0 0 1 38 168" fill="none" stroke="hsl(0 65% 42%)" strokeWidth="0.8"/>
      <line x1="28" y1="168" x2="38" y2="168" stroke="hsl(0 65% 42%)" strokeWidth="1"/>
      {/* Scale */}
      <text x="32" y="174" fontSize="3" fill="hsl(20 18% 10%)" fontFamily="Helvetica, sans-serif" opacity="0.5">SCALE 1:50</text>
    </g>
  )
}

// Equipment Specification — schematic
function EquipmentSpecDrawing() {
  return (
    <g>
      <text x="90" y="40" textAnchor="middle" fontSize="6" fill="hsl(20 18% 10%)" fontFamily="Helvetica, sans-serif" letterSpacing="2" opacity="0.5">
        EQUIPMENT SCHEDULE
      </text>
      {/* Espresso machine icon */}
      <rect x="44" y="56" width="34" height="22" fill="none" stroke="hsl(20 18% 10%)" strokeWidth="1"/>
      <circle cx="54" cy="67" r="2.5" fill="hsl(0 65% 42%)"/>
      <circle cx="68" cy="67" r="2.5" fill="hsl(0 65% 42%)"/>
      <text x="61" y="92" textAnchor="middle" fontSize="4" fill="hsl(20 18% 10%)" fontFamily="Helvetica, sans-serif" letterSpacing="1">2-GROUP ESP</text>
      <text x="61" y="100" textAnchor="middle" fontSize="3.5" fill="hsl(0 65% 42%)" fontFamily="Helvetica, sans-serif" opacity="0.7">SPEC'D</text>

      {/* Grinder */}
      <rect x="100" y="56" width="18" height="14" fill="none" stroke="hsl(20 18% 10%)" strokeWidth="1"/>
      <rect x="102" y="70" width="14" height="20" fill="none" stroke="hsl(20 18% 10%)" strokeWidth="1"/>
      <circle cx="109" cy="80" r="2" fill="hsl(0 65% 42%)"/>
      <text x="109" y="100" textAnchor="middle" fontSize="4" fill="hsl(20 18% 10%)" fontFamily="Helvetica, sans-serif" letterSpacing="1">GRINDER</text>

      {/* Filter / Water */}
      <rect x="130" y="56" width="14" height="34" fill="none" stroke="hsl(20 18% 10%)" strokeWidth="1"/>
      <line x1="132" y1="68" x2="142" y2="68" stroke="hsl(20 18% 10%)" strokeWidth="0.5"/>
      <line x1="132" y1="76" x2="142" y2="76" stroke="hsl(20 18% 10%)" strokeWidth="0.5"/>
      <line x1="132" y1="84" x2="142" y2="84" stroke="hsl(20 18% 10%)" strokeWidth="0.5"/>
      <text x="137" y="100" textAnchor="middle" fontSize="4" fill="hsl(20 18% 10%)" fontFamily="Helvetica, sans-serif" letterSpacing="1">FILTER</text>

      {/* Checklist */}
      <text x="34" y="118" fontSize="5" fill="hsl(20 18% 10%)" fontFamily="Helvetica, sans-serif" letterSpacing="1">✓ MATCHED TO MENU</text>
      <text x="34" y="130" fontSize="5" fill="hsl(20 18% 10%)" fontFamily="Helvetica, sans-serif" letterSpacing="1">✓ VOLUME RATED</text>
      <text x="34" y="142" fontSize="5" fill="hsl(20 18% 10%)" fontFamily="Helvetica, sans-serif" letterSpacing="1">✓ BUDGET ALIGNED</text>
      <text x="34" y="154" fontSize="5" fill="hsl(0 65% 42%)" fontFamily="Helvetica, sans-serif" letterSpacing="1">✓ TRADE PRICING</text>
    </g>
  )
}

// Site Audit — review marks
function AuditDrawing() {
  return (
    <g>
      <text x="90" y="40" textAnchor="middle" fontSize="6" fill="hsl(20 18% 10%)" fontFamily="Helvetica, sans-serif" letterSpacing="2" opacity="0.5">
        SITE AUDIT REPORT
      </text>
      {/* Clipboard outline */}
      <rect x="55" y="50" width="70" height="100" fill="none" stroke="hsl(20 18% 10%)" strokeWidth="1"/>
      <rect x="70" y="46" width="40" height="8" fill="hsl(20 18% 10%)"/>
      {/* Checklist lines */}
      <g opacity="0.7">
        {[0, 1, 2, 3, 4, 5].map((i) => (
          <g key={i}>
            <rect x="60" y={62 + i * 14} width="6" height="6" fill="none" stroke="hsl(20 18% 10%)" strokeWidth="0.5"/>
            <line x1="61" y1={64 + i * 14} x2="65" y2={68 + i * 14} stroke={i < 4 ? 'hsl(0 65% 42%)' : 'hsl(20 18% 10%)'} strokeWidth="1"/>
            <line x1="65" y1={68 + i * 14} x2="62" y2={66 + i * 14} stroke={i < 4 ? 'hsl(0 65% 42%)' : 'hsl(20 18% 10%)'} strokeWidth="1"/>
            <line x1="70" y1={66 + i * 14} x2="120" y2={66 + i * 14} stroke="hsl(20 18% 10%)" strokeWidth="0.5"/>
            <line x1="70" y1={70 + i * 14} x2="105" y2={70 + i * 14} stroke="hsl(20 18% 10%)" strokeWidth="0.3" opacity="0.5"/>
          </g>
        ))}
      </g>
      {/* Stamp */}
      <g transform="translate(95, 158) rotate(-12)">
        <rect x="-24" y="-7" width="48" height="14" fill="none" stroke="hsl(0 65% 42%)" strokeWidth="1.2"/>
        <text textAnchor="middle" y="3" fontSize="4.5" fill="hsl(0 65% 42%)" fontFamily="Helvetica, sans-serif" letterSpacing="1.2" fontWeight="bold">REVIEWED</text>
      </g>
    </g>
  )
}

// Supplier Sourcing — network map
function SupplierDrawing() {
  return (
    <g>
      <text x="90" y="40" textAnchor="middle" fontSize="6" fill="hsl(20 18% 10%)" fontFamily="Helvetica, sans-serif" letterSpacing="2" opacity="0.5">
        SUPPLIER NETWORK
      </text>
      {/* Central node (you) */}
      <circle cx="90" cy="100" r="10" fill="hsl(0 65% 42%)"/>
      <text x="90" y="103" textAnchor="middle" fontSize="5" fill="hsl(38 33% 96%)" fontFamily="Helvetica, sans-serif" fontWeight="bold">YOU</text>
      {/* Spokes to nodes */}
      <g stroke="hsl(20 18% 10%)" strokeWidth="0.5" strokeDasharray="2 1.5">
        <line x1="90" y1="100" x2="50" y2="65"/>
        <line x1="90" y1="100" x2="130" y2="65"/>
        <line x1="90" y1="100" x2="45" y2="100"/>
        <line x1="90" y1="100" x2="135" y2="100"/>
        <line x1="90" y1="100" x2="55" y2="140"/>
        <line x1="90" y1="100" x2="125" y2="140"/>
      </g>
      {/* Supplier nodes */}
      <g fontFamily="Helvetica, sans-serif" letterSpacing="0.5">
        <circle cx="50" cy="65" r="7" fill="hsl(38 33% 96%)" stroke="hsl(20 18% 10%)" strokeWidth="0.8"/>
        <text x="50" y="67" textAnchor="middle" fontSize="3.5" fill="hsl(20 18% 10%)">ROAST</text>
        <circle cx="130" cy="65" r="7" fill="hsl(38 33% 96%)" stroke="hsl(20 18% 10%)" strokeWidth="0.8"/>
        <text x="130" y="67" textAnchor="middle" fontSize="3.5" fill="hsl(20 18% 10%)">GREEN</text>
        <circle cx="45" cy="100" r="7" fill="hsl(38 33% 96%)" stroke="hsl(20 18% 10%)" strokeWidth="0.8"/>
        <text x="45" y="102" textAnchor="middle" fontSize="3.5" fill="hsl(20 18% 10%)">DAIRY</text>
        <circle cx="135" cy="100" r="7" fill="hsl(38 33% 96%)" stroke="hsl(20 18% 10%)" strokeWidth="0.8"/>
        <text x="135" y="102" textAnchor="middle" fontSize="3.5" fill="hsl(20 18% 10%)">FOOD</text>
        <circle cx="55" cy="140" r="7" fill="hsl(38 33% 96%)" stroke="hsl(20 18% 10%)" strokeWidth="0.8"/>
        <text x="55" y="142" textAnchor="middle" fontSize="3.5" fill="hsl(20 18% 10%)">PACK</text>
        <circle cx="125" cy="140" r="7" fill="hsl(38 33% 96%)" stroke="hsl(20 18% 10%)" strokeWidth="0.8"/>
        <text x="125" y="142" textAnchor="middle" fontSize="3.5" fill="hsl(20 18% 10%)">PAPER</text>
      </g>
    </g>
  )
}

// Full Project — timeline
function FullProjectDrawing() {
  return (
    <g>
      <text x="90" y="40" textAnchor="middle" fontSize="6" fill="hsl(20 18% 10%)" fontFamily="Helvetica, sans-serif" letterSpacing="2" opacity="0.5">
        PROJECT TIMELINE
      </text>
      {/* Timeline track */}
      <line x1="30" y1="100" x2="150" y2="100" stroke="hsl(20 18% 10%)" strokeWidth="1.5"/>
      {/* Milestones */}
      <g fontFamily="Helvetica, sans-serif">
        <circle cx="30" cy="100" r="4" fill="hsl(0 65% 42%)"/>
        <text x="30" y="86" textAnchor="middle" fontSize="3.5" fill="hsl(20 18% 10%)" letterSpacing="0.5">CONCEPT</text>
        <text x="30" y="115" textAnchor="middle" fontSize="3" fill="hsl(20 18% 10%)" opacity="0.5">M1</text>

        <circle cx="60" cy="100" r="4" fill="hsl(0 65% 42%)"/>
        <text x="60" y="86" textAnchor="middle" fontSize="3.5" fill="hsl(20 18% 10%)" letterSpacing="0.5">DESIGN</text>
        <text x="60" y="115" textAnchor="middle" fontSize="3" fill="hsl(20 18% 10%)" opacity="0.5">M2</text>

        <circle cx="90" cy="100" r="4" fill="hsl(0 65% 42%)"/>
        <text x="90" y="86" textAnchor="middle" fontSize="3.5" fill="hsl(20 18% 10%)" letterSpacing="0.5">EQUIP</text>
        <text x="90" y="115" textAnchor="middle" fontSize="3" fill="hsl(20 18% 10%)" opacity="0.5">M4</text>

        <circle cx="120" cy="100" r="4" fill="hsl(0 65% 42%)"/>
        <text x="120" y="86" textAnchor="middle" fontSize="3.5" fill="hsl(20 18% 10%)" letterSpacing="0.5">FIT-OUT</text>
        <text x="120" y="115" textAnchor="middle" fontSize="3" fill="hsl(20 18% 10%)" opacity="0.5">M6</text>

        <circle cx="150" cy="100" r="5" fill="hsl(20 18% 10%)" stroke="hsl(0 65% 42%)" strokeWidth="1"/>
        <text x="150" y="86" textAnchor="middle" fontSize="4" fill="hsl(0 65% 42%)" fontWeight="bold" letterSpacing="0.5">OPEN</text>
        <text x="150" y="115" textAnchor="middle" fontSize="3" fill="hsl(0 65% 42%)" opacity="0.7">M8</text>
      </g>
      <text x="90" y="142" textAnchor="middle" fontSize="4" fill="hsl(20 18% 10%)" fontFamily="Helvetica, sans-serif" letterSpacing="1" opacity="0.5">ONE TEAM · END-TO-END</text>
    </g>
  )
}

function TrainingVisual({ product }: { product: Product }) {
  const body = product.courseBody || 'SCA'
  const level = product.courseLevel || 'Foundation'
  const duration = product.duration || '1 day'

  // Body-specific seal colour
  const sealColor = body === 'CQI' ? 'hsl(20 18% 10%)' : body === 'Custom' ? 'hsl(28 60% 45%)' : 'hsl(0 65% 42%)'

  return (
    <div className="aspect-[4/5] bg-gradient-to-br from-background to-secondary/50 flex items-center justify-center relative overflow-hidden">
      {/* Decorative background pattern */}
      <svg className="absolute inset-0 w-full h-full opacity-[0.04]" viewBox="0 0 200 250" preserveAspectRatio="xMidYMid slice">
        <defs>
          <pattern id={`coffee-pattern-${product.id}`} x="0" y="0" width="40" height="40" patternUnits="userSpaceOnUse">
            <ellipse cx="20" cy="20" rx="6" ry="9" fill="hsl(20 18% 10%)" transform="rotate(25 20 20)"/>
          </pattern>
        </defs>
        <rect width="200" height="250" fill={`url(#coffee-pattern-${product.id})`}/>
      </svg>

      {/* Certificate */}
      <svg viewBox="0 0 180 220" className="w-[75%] h-auto drop-shadow-lg relative z-10">
        {/* Outer paper */}
        <rect x="10" y="15" width="160" height="190" fill="hsl(38 33% 97%)" stroke="hsl(20 18% 10%)" strokeWidth="1.5"/>
        {/* Inner accent border */}
        <rect x="16" y="21" width="148" height="178" fill="none" stroke={sealColor} strokeWidth="0.5" strokeDasharray="2 1.5"/>

        {/* Top label */}
        <text x="90" y="38" textAnchor="middle" fontSize="6" fill="hsl(20 18% 10%)" fontFamily="Helvetica, sans-serif" letterSpacing="3" opacity="0.6">
          CERTIFICATE OF COMPLETION
        </text>
        <line x1="50" y1="46" x2="130" y2="46" stroke={sealColor} strokeWidth="0.5"/>

        {/* Body badge (SCA/CQI/Custom seal) */}
        <g transform="translate(90, 85)">
          <circle r="26" fill="none" stroke={sealColor} strokeWidth="1.5"/>
          <circle r="20" fill={sealColor}/>
          <text y="3" textAnchor="middle" fontSize={body === 'Custom' ? 5.5 : 11} fill="hsl(38 33% 97%)" fontFamily="Georgia, serif" fontWeight="bold" letterSpacing={body === 'Custom' ? 0.5 : 2}>
            {body === 'Custom' ? 'BESPOKE' : body}
          </text>
        </g>

        {/* Stars / accent dots */}
        <g fill={sealColor} opacity="0.6">
          <circle cx="55" cy="85" r="1.5"/>
          <circle cx="62" cy="80" r="1"/>
          <circle cx="125" cy="85" r="1.5"/>
          <circle cx="118" cy="80" r="1"/>
        </g>

        {/* Level */}
        <text x="90" y="135" textAnchor="middle" fontSize="9.5" fill="hsl(20 18% 10%)" fontFamily="Georgia, serif" fontWeight="600" letterSpacing="0.5">
          {level.toUpperCase()}
        </text>

        {/* Duration */}
        <text x="90" y="152" textAnchor="middle" fontSize="5" fill="hsl(20 18% 10%)" fontFamily="Helvetica, sans-serif" letterSpacing="2" opacity="0.7">
          {duration.toUpperCase()}
        </text>

        {/* Signature lines */}
        <line x1="40" y1="178" x2="80" y2="178" stroke="hsl(20 18% 10%)" strokeWidth="0.4"/>
        <text x="60" y="186" textAnchor="middle" fontSize="3.5" fill="hsl(20 18% 10%)" fontFamily="Helvetica, sans-serif" letterSpacing="1" opacity="0.5">
          TUTOR
        </text>
        <line x1="100" y1="178" x2="140" y2="178" stroke="hsl(20 18% 10%)" strokeWidth="0.4"/>
        <text x="120" y="186" textAnchor="middle" fontSize="3.5" fill="hsl(20 18% 10%)" fontFamily="Helvetica, sans-serif" letterSpacing="1" opacity="0.5">
          DATE
        </text>
      </svg>
    </div>
  )
}

function CommercialEspresso({ groups }: { groups: number }) {
  const width = groups === 2 ? 130 : 165
  const startX = (200 - width) / 2
  return (
    <g>
      <rect x={startX} y="40" width={width} height="80" rx="6" fill="hsl(145 25% 18%)" />
      <rect x={startX + 6} y="48" width={width - 12} height="22" rx="2" fill="hsl(28 60% 45%)" opacity="0.9"/>
      {Array.from({ length: groups }).map((_, i) => {
        const cx = startX + (width / (groups + 1)) * (i + 1)
        return (
          <g key={i}>
            <circle cx={cx} cy="100" r="10" fill="hsl(28 60% 45%)" />
            <circle cx={cx} cy="100" r="6" fill="hsl(25 30% 14%)" />
            <rect x={cx - 6} y="120" width="12" height="22" fill="hsl(145 25% 14%)" />
            <rect x={cx - 9} y="142" width="18" height="3" fill="hsl(145 25% 10%)" />
          </g>
        )
      })}
      <rect x={startX} y="150" width={width} height="6" fill="hsl(145 25% 10%)" />
    </g>
  )
}
function CommercialGrinder() {
  return (
    <g>
      <rect x="70" y="35" width="60" height="40" rx="4" fill="hsl(145 25% 22%)" />
      <rect x="75" y="75" width="50" height="75" fill="hsl(145 25% 18%)" />
      <circle cx="100" cy="135" r="6" fill="hsl(28 60% 45%)"/>
      <rect x="82" y="150" width="36" height="20" fill="hsl(145 25% 22%)" />
      <rect x="60" y="170" width="80" height="6" fill="hsl(145 25% 10%)" />
    </g>
  )
}
function DrumRoaster() {
  return (
    <g>
      <rect x="30" y="50" width="140" height="100" rx="4" fill="hsl(145 25% 18%)" />
      <circle cx="80" cy="100" r="32" fill="hsl(25 30% 14%)" />
      <circle cx="80" cy="100" r="26" fill="none" stroke="hsl(28 60% 45%)" strokeWidth="1.5"/>
      <circle cx="80" cy="100" r="6" fill="hsl(28 60% 45%)"/>
      <rect x="125" y="70" width="35" height="60" rx="2" fill="hsl(145 25% 14%)" />
      <rect x="20" y="150" width="160" height="8" fill="hsl(145 25% 10%)" />
    </g>
  )
}

export function ProductCard({ product, onClick, onEnquire }: ProductCardProps) {
  const { add } = useCart()
  const { setPrefill } = useContactPrefill()
  const displayPrice = product.salePrice ?? product.price
  const isEnquireOnly =
    product.price === 0 ||
    product.category === 'consulting' ||
    product.badge === 'Enquire' ||
    product.badge === 'Coming Soon'

  const handleEnquireClick = () => {
    const interestMap: Partial<Record<Category, string>> = {
      'training': 'Training',
      'consulting': 'Consulting',
      'commercial-equipment': 'Commercial equipment',
      'home-equipment': 'Home equipment',
      'green-coffee': 'Green coffee',
      'coffee': 'Retail coffee',
    }
    setPrefill({
      interest: interestMap[product.category],
      subject: product.name,
    })
    onEnquire?.()
  }

  return (
    <article
      className={`product-card group bg-card border border-border/60 overflow-hidden flex flex-col ${onClick ? 'cursor-pointer' : ''}`}
      onClick={onClick}
    >
      <div className="relative">
        <ProductVisual product={product} />
        {product.badge && (
          <span className={`absolute top-3 left-3 text-[10px] uppercase font-sans-alt tracking-[0.15em] px-2.5 py-1 ${
            product.soldOut
              ? 'bg-foreground/80 text-background'
              : product.badge === 'Sale'
              ? 'bg-destructive text-destructive-foreground'
              : 'bg-copper text-accent-foreground'
          }`}>
            {product.badge}
          </span>
        )}
        {!product.soldOut && !isEnquireOnly && (
          <Button
            size="icon"
            onClick={(e) => {
              e.stopPropagation()
              add(product)
            }}
            className="absolute bottom-3 right-3 bg-primary text-primary-foreground hover:bg-copper rounded-full w-10 h-10 opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-300"
            aria-label="Add to cart"
          >
            <Plus className="w-4 h-4" />
          </Button>
        )}
      </div>

      <div className="p-4 flex-1 flex flex-col">
        {/* Training: course level + duration as eyebrow */}
        {product.category === 'training' && (product.courseLevel || product.duration) && (
          <div className="text-[10px] uppercase font-sans-alt tracking-[0.18em] text-copper mb-1.5">
            {product.courseBody && `${product.courseBody} · `}
            {product.courseLevel}
            {product.courseLevel && product.duration && ' · '}
            {product.duration}
          </div>
        )}
        {/* Consulting: format as eyebrow */}
        {product.category === 'consulting' && product.consultingFormat && (
          <div className="text-[10px] uppercase font-sans-alt tracking-[0.18em] text-copper mb-1.5">
            Consulting · {product.consultingFormat}
          </div>
        )}
        {/* Non-training/consulting: existing origin/roast eyebrow */}
        {product.category !== 'training' && product.category !== 'consulting' && (product.origin || product.roast) && (
          <div className="text-[10px] uppercase font-sans-alt tracking-[0.18em] text-copper mb-1.5">
            {product.origin || product.roast}
            {product.origin && product.roast && ` · ${product.roast} Roast`}
          </div>
        )}
        <h3 className="text-[15px] font-semibold text-foreground leading-snug">{product.name}</h3>

        {/* Tutor info for training */}
        {product.tutor && (
          <p className="text-[11px] text-copper mt-1 font-sans-alt uppercase tracking-[0.14em]">
            ★ {product.tutor}
          </p>
        )}

        {product.notes && (
          <p className="text-xs text-muted-foreground mt-1.5 italic">
            {product.notes.join(' · ')}
          </p>
        )}

        {/* Consulting scope - shown as bullet list */}
        {product.consultingScope && (
          <ul className="mt-2 space-y-0.5">
            {product.consultingScope.slice(0, 3).map((s, i) => (
              <li key={i} className="text-xs text-muted-foreground flex items-start gap-1.5">
                <span className="text-copper">→</span>
                <span>{s}</span>
              </li>
            ))}
          </ul>
        )}

        {/* Location for training */}
        {product.location && (
          <p className="text-[11px] text-muted-foreground mt-1.5 font-sans-alt uppercase tracking-[0.12em]">
            ◆ {product.location}
          </p>
        )}

        {product.rating && (
          <div className="flex items-center gap-1 mt-2">
            <Star className="w-3 h-3 fill-copper text-copper" />
            <span className="text-xs text-muted-foreground">{product.rating}</span>
          </div>
        )}

        <div className="mt-auto pt-3 flex items-baseline justify-between">
          <div className="flex items-baseline gap-2">
            {product.price === 0 ? (
              <span className="text-lg font-semibold text-foreground">POA</span>
            ) : (
              <>
                {product.priceFrom && (
                  <span className="text-[10px] font-sans-alt uppercase tracking-[0.16em] text-muted-foreground">from</span>
                )}
                <span className={`text-lg font-semibold ${product.salePrice ? 'text-destructive' : 'text-foreground'}`}>
                  £{displayPrice.toFixed(product.priceFrom ? 0 : 2)}
                </span>
                {product.salePrice && (
                  <span className="text-sm text-muted-foreground line-through">£{product.price.toFixed(2)}</span>
                )}
                {product.unit && (
                  <span className="text-xs text-muted-foreground font-sans-alt uppercase tracking-wider">/ {product.unit}</span>
                )}
              </>
            )}
          </div>
          {product.soldOut ? (
            <span className="text-[11px] font-sans-alt uppercase tracking-[0.16em] text-muted-foreground">
              Sold Out
            </span>
          ) : isEnquireOnly ? (
            <button
              onClick={(e) => {
                e.stopPropagation()
                handleEnquireClick()
              }}
              className="text-[11px] font-sans-alt uppercase tracking-[0.16em] text-copper hover:text-foreground transition-colors border-b border-copper hover:border-foreground pb-0.5"
            >
              Enquire
            </button>
          ) : (
            <button
              onClick={(e) => {
                e.stopPropagation()
                add(product)
              }}
              className="text-[11px] font-sans-alt uppercase tracking-[0.16em] text-foreground hover:text-copper transition-colors border-b border-foreground/30 hover:border-copper pb-0.5"
            >
              {product.category === 'training' ? 'Book' : 'Add'}
            </button>
          )}
        </div>
      </div>
    </article>
  )
}
