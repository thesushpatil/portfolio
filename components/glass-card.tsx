"use client"

import React, { useRef, useState } from "react"

interface GlassCardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode
  className?: string
  glowColor?: "indigo" | "cyan" | "emerald" | "amber" | "violet" | "rose"
}

export default function GlassCard({
  children,
  className = "",
  glowColor = "indigo",
  ...props
}: GlassCardProps) {
  const cardRef = useRef<HTMLDivElement>(null)
  const [coords, setCoords] = useState({ x: 0, y: 0 })
  const [rotate, setRotate] = useState({ x: 0, y: 0 })
  const [isHovered, setIsHovered] = useState(false)

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return
    const rect = cardRef.current.getBoundingClientRect()
    
    // Calculate rotation coordinates (range -0.5 to 0.5)
    const xVal = e.clientX - rect.left
    const yVal = e.clientY - rect.top
    const xPct = xVal / rect.width - 0.5
    const yPct = yVal / rect.height - 0.5
    
    // Rotate max 8 degrees for clean professional 3D effect
    setRotate({
      x: -yPct * 8,
      y: xPct * 8,
    })
    setCoords({ x: xVal, y: yVal })
  }

  const handleMouseLeave = () => {
    setIsHovered(false)
    setRotate({ x: 0, y: 0 })
  }

  const glowColorMap = {
    indigo: "rgba(99, 102, 241, 0.15)",   // Stripe Indigo
    cyan: "rgba(34, 211, 238, 0.15)",     // Cyan
    emerald: "rgba(16, 185, 129, 0.15)",  // Supabase Emerald
    amber: "rgba(245, 158, 11, 0.15)",    // Gold/Amber
    violet: "rgba(139, 92, 246, 0.15)",   // Linear Violet
    rose: "rgba(239, 68, 68, 0.15)",      // Cal Coral/Red
  }

  const color = glowColorMap[glowColor] || glowColorMap.indigo

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      style={{
        transform: `perspective(1000px) rotateX(${rotate.x}deg) rotateY(${rotate.y}deg)`,
        transformStyle: "preserve-3d",
      }}
      className={`relative overflow-hidden rounded-2xl border border-zinc-900 bg-zinc-950/40 backdrop-blur-2xl p-6 sm:p-8 transition-all duration-300 ease-out hover:border-zinc-800 hover:bg-zinc-950/60 shadow-[0_4px_30px_rgba(0,0,0,0.4)] ${className}`}
      {...props}
    >
      {/* Glow highlight layer */}
      <div
        className="pointer-events-none absolute -translate-x-1/2 -translate-y-1/2 rounded-full blur-[80px] transition-opacity duration-300 will-change-transform"
        style={{
          left: `${coords.x}px`,
          top: `${coords.y}px`,
          width: "250px",
          height: "250px",
          background: color,
          opacity: isHovered ? 1 : 0,
        }}
      />

      {/* Subtle top highlighting gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-white/[0.02] to-transparent pointer-events-none" />

      {/* Content wrapper */}
      <div className="relative z-10" style={{ transform: "translateZ(20px)" }}>
        {children}
      </div>
    </div>
  )
}
