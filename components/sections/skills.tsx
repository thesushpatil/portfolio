"use client"

import React, { useState, useRef, useEffect } from "react"

interface SkillCategory {
  title: string
  skills: string[]
  Icon: React.ComponentType<{ className?: string }>
  glowColor: "indigo" | "cyan" | "emerald" | "amber" | "violet" | "rose"
}

const TABS = ["All", "Languages", "Backend", "Databases", "Tools", "Core"]

const dotColors: Record<string, string> = {
  indigo:  "bg-indigo-500",
  cyan:    "bg-cyan-400",
  emerald: "bg-emerald-500",
  amber:   "bg-amber-400",
  violet:  "bg-violet-500",
  rose:    "bg-rose-500",
}

const glowStyles: Record<string, string> = {
  indigo:  "hover:border-indigo-500/30 hover:shadow-[0_0_30px_rgba(99,102,241,0.08)]",
  cyan:    "hover:border-cyan-500/30    hover:shadow-[0_0_30px_rgba(6,182,212,0.08)]",
  emerald: "hover:border-emerald-500/30 hover:shadow-[0_0_30px_rgba(16,185,129,0.08)]",
  amber:   "hover:border-amber-500/30   hover:shadow-[0_0_30px_rgba(245,158,11,0.08)]",
  violet:  "hover:border-violet-500/30  hover:shadow-[0_0_30px_rgba(139,92,246,0.08)]",
  rose:    "hover:border-rose-500/30    hover:shadow-[0_0_30px_rgba(244,63,94,0.08)]",
}

export default function Skills({ skillCategories }: { skillCategories: SkillCategory[] }) {
  const [activeTab, setActiveTab] = useState("All")
  const headingRef = useRef<HTMLDivElement>(null)
  const gridRef    = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const els = [headingRef.current, gridRef.current].filter(Boolean)
    const obs = new IntersectionObserver(
      (entries) => entries.forEach((e) => { if (e.isIntersecting) e.target.classList.add("visible") }),
      { threshold: 0.1 }
    )
    els.forEach((el) => el && obs.observe(el))
    return () => obs.disconnect()
  }, [])

  const filtered = activeTab === "All"
    ? skillCategories
    : skillCategories.filter((c) => c.title.toLowerCase().includes(activeTab.toLowerCase()))

  return (
    <section id="skills" className="py-28 px-6 max-w-5xl mx-auto">
      <div ref={headingRef} className="reveal mb-12">
        <span className="section-label">Capabilities</span>
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tighter text-white">
          Technical <span className="gradient-text">Skills.</span>
        </h2>
      </div>

      {/* Filter Tabs */}
      <div className="flex flex-wrap gap-1.5 p-1 bg-[#0f0f1a] border border-white/8 rounded-full max-w-lg mb-10">
        {TABS.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`relative px-4 py-2 text-xs font-semibold rounded-full transition-all duration-200 ${
              activeTab === tab
                ? "text-white bg-indigo-600 shadow-md shadow-indigo-500/20"
                : "text-zinc-500 hover:text-zinc-200"
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Grid */}
      <div
        ref={gridRef}
        className="reveal grid sm:grid-cols-2 lg:grid-cols-3 gap-5"
      >
        {filtered.map((cat, i) => (
          <div
            key={i}
            className={`glass rounded-2xl p-6 transition-all duration-300 ${glowStyles[cat.glowColor] || ""}`}
          >
            <div className="flex items-center gap-3 mb-5">
              <div className="p-2 rounded-lg bg-[#1a1a28] border border-white/8 text-zinc-400 shrink-0">
                <cat.Icon className="w-4 h-4" />
              </div>
              <h3 className="text-sm font-bold text-white">{cat.title}</h3>
            </div>
            <div className="flex flex-wrap gap-2">
              {cat.skills.map((skill) => (
                <span
                  key={skill}
                  className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-[11px] font-mono bg-[#1a1a28] border border-white/8 text-zinc-400 hover:text-white hover:border-white/15 transition-colors cursor-default"
                >
                  <span className={`w-1.5 h-1.5 rounded-full shrink-0 ${dotColors[cat.glowColor] || "bg-zinc-500"}`} />
                  {skill}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
