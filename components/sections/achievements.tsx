"use client"

import React, { useRef, useEffect } from "react"
import { Trophy, Shield } from "lucide-react"

interface CertItem {
  name: string
  provider: string
  year: string
  Icon: React.ComponentType<{ className?: string }>
}

interface LeadershipItem {
  role: string
  org: string
  description: string
  Icon: React.ComponentType<{ className?: string }>
}

const providerColors: Record<string, string> = {
  "NPTEL":  "text-amber-400  bg-amber-500/10  border-amber-500/20",
  "Meta":   "text-blue-400   bg-blue-500/10   border-blue-500/20",
}

export default function Achievements({
  certifications,
  leadership,
}: {
  certifications: CertItem[]
  leadership: LeadershipItem[]
}) {
  const certRef = useRef<HTMLDivElement>(null)
  const leadRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => entries.forEach((e) => { if (e.isIntersecting) e.target.classList.add("visible") }),
      { threshold: 0.1 }
    )
    ;[certRef.current, leadRef.current].forEach((el) => el && obs.observe(el))
    return () => obs.disconnect()
  }, [])

  return (
    <section id="achievements" className="py-28 px-6 max-w-5xl mx-auto">
      <div className="reveal mb-16">
        <span className="section-label">Milestones</span>
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tighter text-white">
          Credentials <span className="gradient-text">&amp; Leadership.</span>
        </h2>
      </div>

      {/* Certifications */}
      <div className="mb-16">
        <div className="flex items-center gap-2 mb-6">
          <Trophy className="w-4 h-4 text-amber-400" />
          <h3 className="text-sm font-bold text-zinc-300 uppercase tracking-wider">Certifications</h3>
        </div>
        <div
          ref={certRef}
          className="reveal grid sm:grid-cols-2 gap-4 max-w-3xl"
        >
          {certifications.map((cert, i) => {
            const color = providerColors[cert.provider] || "text-zinc-400 bg-zinc-800 border-white/10"
            return (
              <div
                key={i}
                className={`glass rounded-2xl p-5 flex items-center gap-4 hover:border-white/15 transition-all delay-${(i % 2) * 100}`}
              >
                <div className={`p-2.5 rounded-xl border ${color} shrink-0`}>
                  <cert.Icon className="w-4 h-4" />
                </div>
                <div className="min-w-0">
                  <p className="text-sm font-bold text-white leading-snug truncate">{cert.name}</p>
                  <div className="flex items-center gap-2 mt-1">
                    <span className={`px-2 py-0.5 rounded text-[9px] font-bold border font-mono ${color}`}>{cert.provider}</span>
                    <span className="text-[10px] text-zinc-600 font-mono">{cert.year}</span>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>

      {/* Leadership */}
      <div>
        <div className="flex items-center gap-2 mb-6">
          <Shield className="w-4 h-4 text-indigo-400" />
          <h3 className="text-sm font-bold text-zinc-300 uppercase tracking-wider">Volunteering &amp; Community</h3>
        </div>
        <div
          ref={leadRef}
          className="reveal grid sm:grid-cols-3 gap-5"
        >
          {leadership.map((item, i) => (
            <div
              key={i}
              className={`glass rounded-2xl p-6 hover:border-indigo-500/30 transition-all duration-300 delay-${(i + 1) * 100}`}
            >
              <div className="p-2.5 rounded-xl bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 w-fit mb-4">
                <item.Icon className="w-4 h-4" />
              </div>
              <h4 className="text-sm font-bold text-white mb-0.5">{item.role}</h4>
              <p className="text-xs text-indigo-400 font-semibold mb-3">{item.org}</p>
              <p className="text-xs text-zinc-400 leading-relaxed">{item.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
