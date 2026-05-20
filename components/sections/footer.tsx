"use client"

import React from "react"
import { Github, Linkedin, Mail, ArrowUp } from "lucide-react"

export default function Footer() {
  const scrollTop = () => window.scrollTo({ top: 0, behavior: "smooth" })

  return (
    <footer className="relative z-10 mt-16 border-t border-white/5 bg-[#0f0f1a]/60 backdrop-blur-xl">
      <div className="max-w-5xl mx-auto px-6 py-10 flex flex-col sm:flex-row items-center justify-between gap-6">
        {/* Status */}
        <div className="flex items-center gap-2 text-[11px] font-mono text-zinc-500">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
          All systems operational
        </div>

        {/* Copyright */}
        <p className="text-[11px] font-mono text-zinc-600 order-3 sm:order-2">
          © {new Date().getFullYear()} Sushant Patil — Built for performance.
        </p>

        {/* Social + back to top */}
        <div className="flex items-center gap-3 order-2 sm:order-3">
          {[
            { icon: Github,   href: "https://github.com/thesushpatil",      label: "GitHub"   },
            { icon: Linkedin, href: "https://linkedin.com/in/thesushpatil", label: "LinkedIn" },
            { icon: Mail,     href: "mailto:sushantpatil6217@gmail.com",     label: "Email"    },
          ].map(({ icon: Icon, href, label }) => (
            <a
              key={label}
              href={href}
              target={href.startsWith("http") ? "_blank" : undefined}
              rel="noopener noreferrer"
              aria-label={label}
              className="p-2 text-zinc-600 hover:text-white transition-colors"
            >
              <Icon className="w-4 h-4" />
            </a>
          ))}

          <button
            onClick={scrollTop}
            aria-label="Back to top"
            className="ml-2 p-2 rounded-lg bg-[#1a1a28] border border-white/8 text-zinc-500 hover:text-white hover:border-white/20 transition-all"
          >
            <ArrowUp className="w-4 h-4" />
          </button>
        </div>
      </div>
    </footer>
  )
}
