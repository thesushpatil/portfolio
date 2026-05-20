"use client"

import React, { useState, useEffect } from "react"
import { Github, Linkedin, Mail, MapPin, Download, ArrowRight, Star, Briefcase, Code2, Award } from "lucide-react"

interface HeroProps {
  isLoaded: boolean
  currentText: string
  stats: { label: string; value: string; suffix: string }[]
}

export default function Hero({ isLoaded, currentText, stats }: HeroProps) {
  const [imgError, setImgError] = useState(false)

  const statIcons = [Star, Briefcase, Code2, Award]

  return (
    <section
      id="about"
      className="relative z-10 min-h-screen flex items-center"
    >
      {/* Hero background orb */}
      <div
        className="pointer-events-none absolute inset-0 overflow-hidden"
        aria-hidden
      >
        <div
          className="absolute -top-64 left-1/2 -translate-x-1/2 w-[900px] h-[600px] rounded-full opacity-20"
          style={{
            background:
              "radial-gradient(ellipse at center, rgba(99,102,241,0.55) 0%, rgba(139,92,246,0.25) 40%, transparent 70%)",
            filter: "blur(72px)",
          }}
        />
      </div>

      <div className="w-full max-w-6xl mx-auto px-6 pt-28 pb-20">
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-16 items-center">

          {/* ── LEFT COLUMN ── */}
          <div
            className={`lg:col-span-7 text-left transition-all duration-700 ${
              isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
          >
            {/* Availability pill */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-medium mb-8">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              Available for new opportunities
            </div>

            {/* Main name */}
            <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black tracking-tighter leading-[0.88] text-white mb-5">
              Sushant
              <br />
              <span className="gradient-text">Patil.</span>
            </h1>

            {/* Typewriter role line */}
            <div className="flex items-center gap-2 mb-6 h-8">
              <span className="text-zinc-500 font-mono text-sm">//</span>
              <span className="font-mono text-sm sm:text-base text-zinc-300">{currentText}</span>
              <span className="typewriter-cursor" />
            </div>

            {/* Bio */}
            <p className="text-base sm:text-lg text-zinc-400 leading-relaxed max-w-xl mb-8">
              Computer Science Engineer who builds <span className="text-white font-semibold">robust backend systems</span> and <span className="text-white font-semibold">ML pipelines</span>. 
              Previously at{" "}
              <span className="text-amber-400 font-semibold">ISRO</span> and{" "}
              <span className="text-cyan-400 font-semibold">Infosys</span>.
              Passionate about clean architecture, open source, and scalable APIs.
            </p>

            {/* Location */}
            <div className="flex items-center gap-2 text-zinc-500 text-sm mb-8">
              <MapPin className="w-4 h-4 text-zinc-600" />
              <span>Kolhapur, Maharashtra, India</span>
            </div>

            {/* CTAs */}
            <div className="flex flex-wrap items-center gap-3 mb-12">
              <a
                href="mailto:sushantpatil6217@gmail.com"
                className="inline-flex items-center gap-2 px-5 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white text-sm font-semibold rounded-lg transition-all duration-200 shadow-lg shadow-indigo-500/20"
              >
                <Mail className="w-4 h-4" />
                Get in touch
              </a>
              <a
                href="https://github.com/thesushpatil"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#1a1a28] hover:bg-[#22223a] border border-white/10 text-white text-sm font-semibold rounded-lg transition-all duration-200"
                aria-label="GitHub"
              >
                <Github className="w-4 h-4" />
                GitHub
              </a>
              <a
                href="https://linkedin.com/in/thesushpatil"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#1a1a28] hover:bg-[#22223a] border border-white/10 text-white text-sm font-semibold rounded-lg transition-all duration-200"
                aria-label="LinkedIn"
              >
                <Linkedin className="w-4 h-4" />
                LinkedIn
              </a>
            </div>

            {/* Stats grid */}
            <div className="grid grid-cols-4 gap-5 pt-8 border-t border-white/5">
              {stats.map((stat, i) => {
                const Icon = statIcons[i] || Star
                return (
                  <div key={i} className="flex flex-col gap-1">
                    <div className="flex items-baseline gap-0.5">
                      <span className="text-2xl sm:text-3xl font-black text-white tracking-tight">
                        {stat.value}
                      </span>
                      {stat.suffix && (
                        <span className="text-indigo-400 font-bold text-lg">{stat.suffix}</span>
                      )}
                    </div>
                    <span className="text-[10px] text-zinc-500 uppercase tracking-widest font-semibold">
                      {stat.label}
                    </span>
                  </div>
                )
              })}
            </div>
          </div>

          {/* ── RIGHT COLUMN — Photo + Info card ── */}
          <div
            className={`lg:col-span-5 flex flex-col items-center lg:items-end gap-6 transition-all duration-700 delay-200 ${
              isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
          >
            {/* Profile photo */}
            <div className="relative">
              {/* Spinning gradient ring */}
              <div className="avatar-ring w-52 h-52 sm:w-64 sm:h-64">
                <div className="avatar-ring-inner w-full h-full">
                  {!imgError ? (
                    <img
                      src="/sus.jpg"
                      alt="Sushant Patil"
                      className="w-full h-full object-cover rounded-full"
                      onError={() => setImgError(true)}
                    />
                  ) : (
                    /* Fallback initials */
                    <div className="w-full h-full rounded-full bg-gradient-to-br from-indigo-500 to-violet-600 flex items-center justify-center">
                      <span className="text-4xl font-black text-white">SP</span>
                    </div>
                  )}
                </div>
              </div>

              {/* Floating status badge */}
              <div className="absolute -bottom-2 -right-2 px-3 py-1.5 rounded-full bg-[#1a1a28] border border-white/10 text-xs font-mono text-zinc-300 shadow-xl flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                Open to work
              </div>
            </div>

            {/* Quick info card */}
            <div className="w-full glass rounded-2xl p-5 text-sm space-y-3 max-w-xs">
              <div className="flex items-center justify-between">
                <span className="text-zinc-500 font-mono text-xs">student</span>
                <span className="text-white font-semibold">TKIET · B.Tech CSE</span>
              </div>
              <hr className="divider" />
              <div className="flex items-center justify-between">
                <span className="text-zinc-500 font-mono text-xs">cgpa</span>
                <span className="text-emerald-400 font-bold font-mono">8.55 / 10</span>
              </div>
              <hr className="divider" />
              <div className="flex items-center justify-between">
                <span className="text-zinc-500 font-mono text-xs">interned at</span>
                <div className="flex items-center gap-2">
                  <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-amber-500/10 border border-amber-500/20 text-amber-400">ISRO</span>
                  <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-cyan-500/10 border border-cyan-500/20 text-cyan-400">Infosys</span>
                </div>
              </div>
              <hr className="divider" />
              <div className="flex items-center justify-between">
                <span className="text-zinc-500 font-mono text-xs">year</span>
                <span className="text-white font-semibold">2022 – 2026</span>
              </div>
            </div>

            {/* Tech tags */}
            <div className="flex flex-wrap gap-2 justify-center lg:justify-end max-w-xs">
              {["Python", "Flask", "Node.js", "Java", "ML", "REST APIs"].map((t) => (
                <span
                  key={t}
                  className="px-2.5 py-1 rounded-full text-[11px] font-mono font-medium bg-[#1a1a28] border border-white/8 text-zinc-400"
                >
                  {t}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
