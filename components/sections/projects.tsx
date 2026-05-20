"use client"

import React, { useRef, useEffect } from "react"
import { Github, ExternalLink, Star, GitFork } from "lucide-react"

interface ProjectItem {
  title: string
  description: string
  tools: string[]
  link: string
  year: string
  glowColor: "indigo" | "cyan" | "emerald" | "amber" | "violet" | "rose"
}

const glowStyles: Record<string, string> = {
  indigo:  "hover:border-indigo-500/35 hover:shadow-[0_0_40px_rgba(99,102,241,0.1)]",
  cyan:    "hover:border-cyan-500/35    hover:shadow-[0_0_40px_rgba(6,182,212,0.1)]",
  emerald: "hover:border-emerald-500/35 hover:shadow-[0_0_40px_rgba(16,185,129,0.1)]",
  amber:   "hover:border-amber-500/35   hover:shadow-[0_0_40px_rgba(245,158,11,0.1)]",
}

const mockStats: Record<string, { stars: number; forks: number; repo: string }> = {
  "Personal Expenditure Management System": { stars: 12, forks: 4,  repo: "thesushpatil/expense-manager"   },
  "Deepfake Video Detection System":        { stars: 28, forks: 9,  repo: "thesushpatil/deepfake-detector" },
}

export default function Projects({ projects }: { projects: ProjectItem[] }) {
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
    <section id="projects" className="py-28 px-6 max-w-4xl mx-auto">
      <div className="reveal mb-16">
        <span className="section-label">Work</span>
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tighter text-white">
          Selected <span className="gradient-text">Projects.</span>
        </h2>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {projects.map((proj, i) => {
          const stats = mockStats[proj.title] || { stars: 5, forks: 1, repo: "thesushpatil/project" }
          return (
            <div
              key={i}
              ref={(el) => { refs.current[i] = el }}
              className={`reveal delay-${(i + 1) * 100} glass rounded-2xl p-6 sm:p-8 flex flex-col group transition-all duration-300 ${glowStyles[proj.glowColor] || ""}`}
            >
              {/* Repo header */}
              <div className="flex items-center justify-between mb-5 pb-4 border-b border-white/5 font-mono text-[11px] text-zinc-500">
                <span className="text-zinc-400 truncate">{stats.repo}</span>
                <span className="px-2 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-[9px] font-semibold shrink-0 ml-2">
                  Production
                </span>
              </div>

              <h3 className="text-lg font-black text-white mb-3 tracking-tight group-hover:text-zinc-200 transition-colors">
                {proj.title}
              </h3>

              <p className="text-sm text-zinc-400 leading-relaxed mb-6 flex-1">
                {proj.description}
              </p>

              {/* Git stats */}
              <div className="flex items-center gap-4 text-[11px] font-mono text-zinc-500 mb-5">
                <span className="flex items-center gap-1.5">
                  <Star className="w-3.5 h-3.5" /> {stats.stars}
                </span>
                <span className="flex items-center gap-1.5">
                  <GitFork className="w-3.5 h-3.5" /> {stats.forks}
                </span>
                <span>{proj.year}</span>
              </div>

              {/* Tools */}
              <div className="flex flex-wrap gap-1.5 mb-5">
                {proj.tools.map((t) => (
                  <span key={t} className="px-2 py-0.5 rounded text-[10px] font-mono bg-[#1a1a28] border border-white/8 text-zinc-400">
                    {t}
                  </span>
                ))}
              </div>

              {/* Links */}
              <div className="flex items-center justify-between pt-4 border-t border-white/5">
                <a
                  href={proj.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 text-xs font-mono text-zinc-500 hover:text-white transition-colors"
                >
                  <Github className="w-3.5 h-3.5" /> Source Code
                </a>
                <a
                  href={proj.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-1.5 rounded-lg bg-[#1a1a28] border border-white/8 text-zinc-500 hover:text-white hover:border-white/20 transition-all"
                >
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          )
        })}
      </div>
    </section>
  )
}
