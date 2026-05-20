"use client"

import React, { useState } from "react"

interface NavbarProps {
  activeSection: string
  scrollToSection: (id: string) => void
  navItems: { id: string; label: string }[]
}

export default function Navbar({ activeSection, scrollToSection, navItems }: NavbarProps) {
  const [hoveredTab, setHoveredTab] = useState<string | null>(null)

  return (
    <nav className="fixed top-5 left-1/2 -translate-x-1/2 z-50 w-[92%] max-w-4xl rounded-full border border-zinc-900 bg-black/65 backdrop-blur-2xl shadow-[0_10px_35px_rgba(0,0,0,0.8)] transition-all duration-300">
      <div className="h-12 px-4 sm:px-6 flex items-center justify-between">
        {/* Logo */}
        <button
          onClick={() => scrollToSection("about")}
          className="font-mono text-xs tracking-tight text-white hover:opacity-80 transition-opacity font-bold flex items-center gap-1 shrink-0"
        >
          <span className="text-zinc-500 font-medium">sushantpatil</span>
          <span className="text-zinc-700">/</span>
          <span className="bg-gradient-to-r from-orange-400 to-amber-300 bg-clip-text text-transparent">portfolio</span>
        </button>

        {/* Navigation Items with Sliding Hover Pill */}
        <div className="hidden md:flex items-center gap-0.5 relative">
          {navItems.map((item) => {
            const isActive = activeSection === item.id
            return (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                onMouseEnter={() => setHoveredTab(item.id)}
                onMouseLeave={() => setHoveredTab(null)}
                className={`relative px-3 py-1.5 text-[11px] font-semibold tracking-tight rounded-full transition-colors duration-200 z-10 ${
                  isActive ? "text-white" : "text-zinc-400 hover:text-zinc-100"
                }`}
              >
                {/* Active Sliding Background (Linear Style) */}
                {isActive && (
                  <span className="absolute inset-0 bg-zinc-900 border border-zinc-800 rounded-full -z-10 shadow-inner" />
                )}
                {/* Hover Background (Stripe Style) */}
                {hoveredTab === item.id && !isActive && (
                  <span className="absolute inset-0 bg-zinc-900/40 rounded-full -z-10 transition-all duration-150" />
                )}
                {item.label}
              </button>
            )
          })}
        </div>

        {/* Mobile current section indicator */}
        <div className="md:hidden flex items-center shrink-0">
          <span className="text-[10px] font-mono font-bold text-zinc-300 uppercase px-2.5 py-0.5 bg-zinc-900/60 border border-zinc-800 rounded-full">
            {activeSection}
          </span>
        </div>
      </div>
    </nav>
  )
}
