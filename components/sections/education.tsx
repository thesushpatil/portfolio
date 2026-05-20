"use client"

import React, { useRef, useEffect } from "react"
import { GraduationCap, Calendar, MapPin } from "lucide-react"

interface EduItem {
  institution: string
  degree: string
  grade: string
  period: string
  location: string
}

const gradeColor = (g: string) => {
  const num = parseFloat(g)
  if (num >= 9)  return "text-emerald-400 bg-emerald-500/10 border-emerald-500/20"
  if (num >= 8)  return "text-indigo-400 bg-indigo-500/10 border-indigo-500/20"
  if (num >= 70) return "text-amber-400 bg-amber-500/10 border-amber-500/20"
  return "text-zinc-400 bg-zinc-800 border-white/10"
}

export default function Education({ educationData }: { educationData: EduItem[] }) {
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
    <section id="education" className="py-28 px-6 max-w-4xl mx-auto">
      <div className="reveal mb-16">
        <span className="section-label">Qualifications</span>
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tighter text-white">
          Education <span className="gradient-text">Timeline.</span>
        </h2>
      </div>

      <div className="space-y-5">
        {educationData.map((edu, i) => (
          <div
            key={i}
            ref={(el) => { refs.current[i] = el }}
            className={`reveal delay-${(i + 1) * 100} glass rounded-2xl p-6 sm:p-8 hover:border-white/15 transition-all duration-300`}
          >
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div className="flex items-start gap-4">
                <div className="p-3 rounded-xl bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 shrink-0">
                  <GraduationCap className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-base sm:text-lg font-black text-white leading-snug">{edu.institution}</h3>
                  <p className="text-sm text-zinc-400 mt-1">{edu.degree}</p>
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-[11px] font-bold border mt-2.5 font-mono ${gradeColor(edu.grade)}`}>
                    {edu.grade}
                  </span>
                </div>
              </div>
              <div className="text-[11px] text-zinc-500 font-mono space-y-1.5 shrink-0 sm:text-right">
                <div className="flex items-center gap-1.5 sm:justify-end">
                  <Calendar className="w-3.5 h-3.5" /> {edu.period}
                </div>
                <div className="flex items-center gap-1.5 sm:justify-end">
                  <MapPin className="w-3.5 h-3.5" /> {edu.location}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
