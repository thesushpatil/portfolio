"use client"

import React, { useRef, useEffect } from "react"
import { Calendar, MapPin, Terminal } from "lucide-react"

interface ExperienceItem {
  company: string
  role: string
  period: string
  location: string
  points: string[]
  tools: string[]
  Icon: React.ComponentType<{ className?: string }>
}

const accents: Record<string, { badge: string; icon: string; dot: string; border: string; arrow: string }> = {
  "Space Applications Centre (ISRO)": {
    badge:  "bg-amber-500/10 border-amber-500/25 text-amber-400",
    icon:   "bg-amber-500/10 border-amber-500/20 text-amber-400",
    dot:    "bg-amber-400",
    border: "hover:border-amber-500/30",
    arrow:  "text-amber-400",
  },
  "Infosys Springboard": {
    badge:  "bg-cyan-500/10 border-cyan-500/25 text-cyan-400",
    icon:   "bg-cyan-500/10 border-cyan-500/20 text-cyan-400",
    dot:    "bg-cyan-400",
    border: "hover:border-cyan-500/30",
    arrow:  "text-cyan-400",
  },
}

export default function Experience({ experiences }: { experiences: ExperienceItem[] }) {
  const refs = useRef<(HTMLDivElement | null)[]>([])

  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => entries.forEach((e) => { if (e.isIntersecting) e.target.classList.add("visible") }),
      { threshold: 0.1 }
    )
    refs.current.forEach((el) => el && obs.observe(el))
    return () => obs.disconnect()
  }, [])

  return (
    <section id="experience" className="py-28 px-6 max-w-4xl mx-auto">
      {/* Heading */}
      <div className="reveal mb-16">
        <span className="section-label">History</span>
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tighter text-white">
          Engineering <span className="gradient-text">Experience.</span>
        </h2>
      </div>

      {/* Timeline */}
      <div className="relative">
        {/* Vertical line */}
        <div className="absolute left-5 top-0 bottom-0 w-px bg-gradient-to-b from-indigo-500/60 via-violet-500/30 to-transparent hidden sm:block" />

        <div className="space-y-10">
          {experiences.map((exp, i) => {
            const a = accents[exp.company] || {
              badge:  "bg-indigo-500/10 border-indigo-500/25 text-indigo-400",
              icon:   "bg-indigo-500/10 border-indigo-500/20 text-indigo-400",
              dot:    "bg-indigo-400",
              border: "hover:border-indigo-500/30",
              arrow:  "text-indigo-400",
            }
            return (
              <div
                key={i}
                ref={(el) => { refs.current[i] = el }}
                className={`reveal delay-${(i + 1) * 100} relative sm:pl-16`}
              >
                {/* Timeline dot */}
                <div className={`absolute left-3.5 top-7 w-3 h-3 rounded-full border-2 border-[#08080f] ${a.dot} hidden sm:block`} />

                <div className={`glass rounded-2xl p-6 sm:p-8 ${a.border} transition-all duration-300`}>
                  {/* Header */}
                  <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 mb-6 pb-6 border-b border-white/5">
                    <div className="flex items-start gap-4">
                      <div className={`p-3 rounded-xl border ${a.icon} shrink-0`}>
                        <exp.Icon className="w-5 h-5" />
                      </div>
                      <div>
                        <h3 className="text-lg font-black text-white leading-tight">{exp.company}</h3>
                        <p className="text-sm text-zinc-400 mt-1 font-medium">{exp.role}</p>
                        <span className={`inline-flex items-center gap-1.5 mt-2 px-2.5 py-0.5 rounded-full text-[10px] font-bold border ${a.badge}`}>
                          <span className={`w-1.5 h-1.5 rounded-full ${a.dot}`} />
                          Deployed
                        </span>
                      </div>
                    </div>
                    <div className="text-[11px] text-zinc-500 font-mono space-y-1.5 shrink-0">
                      <div className="flex items-center gap-1.5">
                        <Calendar className="w-3.5 h-3.5" /> {exp.period}
                      </div>
                      <div className="flex items-center gap-1.5">
                        <MapPin className="w-3.5 h-3.5" /> {exp.location}
                      </div>
                    </div>
                  </div>

                  {/* Points */}
                  <div className="space-y-4 mb-6">
                    {exp.points.map((pt, j) => (
                      <div key={j} className="flex gap-3">
                        <span className={`mt-0.5 shrink-0 font-mono text-sm font-bold ${a.arrow}`}>›</span>
                        <p className="text-sm text-zinc-300 leading-relaxed">{pt}</p>
                      </div>
                    ))}
                  </div>

                  {/* Tools */}
                  <div className="flex flex-wrap gap-1.5 pt-5 border-t border-white/5">
                    {exp.tools.map((t) => (
                      <span key={t} className="px-2.5 py-1 rounded-md text-[11px] font-mono bg-[#1a1a28] border border-white/8 text-zinc-400 hover:text-white hover:border-white/15 transition-colors">
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
