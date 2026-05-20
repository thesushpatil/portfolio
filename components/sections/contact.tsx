"use client"

import React, { useState, useRef, useEffect } from "react"
import { Mail, Phone, Github, Linkedin, MapPin, Send, CheckCircle2, ArrowUpRight } from "lucide-react"

export default function Contact() {
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const sectionRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = sectionRef.current
    if (!el) return
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) el.classList.add("visible") },
      { threshold: 0.12 }
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    await new Promise((r) => setTimeout(r, 1400))
    setIsSubmitting(false)
    setSubmitted(true)
  }

  const socials = [
    { label: "GitHub", icon: Github, href: "https://github.com/thesushpatil", color: "hover:text-white" },
    { label: "LinkedIn", icon: Linkedin, href: "https://linkedin.com/in/thesushpatil", color: "hover:text-blue-400" },
    { label: "Email", icon: Mail, href: "mailto:sushantpatil6217@gmail.com", color: "hover:text-indigo-400" },
  ]

  return (
    <section id="contact" className="py-28 px-6 max-w-5xl mx-auto">
      {/* Section heading */}
      <div ref={sectionRef} className="reveal mb-16">
        <span className="section-label">Connect</span>
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tighter text-white">
          Let&apos;s work <span className="gradient-text">together.</span>
        </h2>
        <p className="text-zinc-400 mt-4 max-w-md text-sm sm:text-base leading-relaxed">
          Open to backend engineering roles, ML projects, open source collaboration, or just a good conversation about tech.
        </p>
      </div>

      <div className="grid lg:grid-cols-12 gap-10 items-start">

        {/* Left — Info + Socials */}
        <div className="lg:col-span-5 space-y-8">
          {/* Contact links */}
          <div className="space-y-4">
            <a
              href="mailto:sushantpatil6217@gmail.com"
              className="flex items-center gap-4 p-4 glass rounded-xl hover:border-indigo-500/30 transition-all group"
            >
              <div className="p-2.5 rounded-lg bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 group-hover:bg-indigo-500/20 transition-colors">
                <Mail className="w-4 h-4" />
              </div>
              <div>
                <p className="text-[10px] text-zinc-500 uppercase tracking-wider font-mono mb-0.5">Email</p>
                <p className="text-sm text-zinc-200 font-medium">sushantpatil6217@gmail.com</p>
              </div>
              <ArrowUpRight className="w-4 h-4 text-zinc-600 ml-auto group-hover:text-indigo-400 transition-colors" />
            </a>

            <a
              href="tel:+919975806217"
              className="flex items-center gap-4 p-4 glass rounded-xl hover:border-emerald-500/30 transition-all group"
            >
              <div className="p-2.5 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 group-hover:bg-emerald-500/20 transition-colors">
                <Phone className="w-4 h-4" />
              </div>
              <div>
                <p className="text-[10px] text-zinc-500 uppercase tracking-wider font-mono mb-0.5">Phone</p>
                <p className="text-sm text-zinc-200 font-medium">+91 9975806217</p>
              </div>
              <ArrowUpRight className="w-4 h-4 text-zinc-600 ml-auto group-hover:text-emerald-400 transition-colors" />
            </a>

            <div className="flex items-center gap-4 p-4 glass rounded-xl">
              <div className="p-2.5 rounded-lg bg-zinc-800 border border-white/8 text-zinc-400">
                <MapPin className="w-4 h-4" />
              </div>
              <div>
                <p className="text-[10px] text-zinc-500 uppercase tracking-wider font-mono mb-0.5">Location</p>
                <p className="text-sm text-zinc-200 font-medium">Kolhapur, Maharashtra, India</p>
              </div>
            </div>
          </div>

          {/* Social icons */}
          <div>
            <p className="text-[10px] text-zinc-500 uppercase tracking-wider font-mono mb-3">Find me on</p>
            <div className="flex items-center gap-3">
              {socials.map(({ label, icon: Icon, href, color }) => (
                <a
                  key={label}
                  href={href}
                  target={href.startsWith("http") ? "_blank" : undefined}
                  rel="noopener noreferrer"
                  aria-label={label}
                  className={`p-3 glass rounded-xl text-zinc-500 ${color} transition-all hover:scale-105 hover:border-white/20`}
                >
                  <Icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Right — Contact form */}
        <div className="lg:col-span-7">
          <div className="glass rounded-2xl p-6 sm:p-8">
            {!submitted ? (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[10px] text-zinc-500 uppercase tracking-wider font-mono mb-2">Name</label>
                    <input
                      type="text"
                      required
                      value={form.name}
                      onChange={(e) => setForm({ ...form, name: e.target.value })}
                      placeholder="Your full name"
                      className="form-input"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] text-zinc-500 uppercase tracking-wider font-mono mb-2">Email</label>
                    <input
                      type="email"
                      required
                      value={form.email}
                      onChange={(e) => setForm({ ...form, email: e.target.value })}
                      placeholder="you@example.com"
                      className="form-input"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[10px] text-zinc-500 uppercase tracking-wider font-mono mb-2">Subject</label>
                  <input
                    type="text"
                    required
                    value={form.subject}
                    onChange={(e) => setForm({ ...form, subject: e.target.value })}
                    placeholder="What's this about?"
                    className="form-input"
                  />
                </div>

                <div>
                  <label className="block text-[10px] text-zinc-500 uppercase tracking-wider font-mono mb-2">Message</label>
                  <textarea
                    required
                    rows={5}
                    value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                    placeholder="Tell me about your project or opportunity..."
                    className="form-input resize-none"
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full flex items-center justify-center gap-2 py-3 px-6 rounded-xl bg-indigo-600 hover:bg-indigo-500 disabled:bg-indigo-600/50 disabled:cursor-not-allowed text-white font-semibold text-sm transition-all duration-200 shadow-lg shadow-indigo-500/20"
                >
                  {isSubmitting ? (
                    <>
                      <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      Sending...
                    </>
                  ) : (
                    <>
                      <Send className="w-4 h-4" />
                      Send Message
                    </>
                  )}
                </button>
              </form>
            ) : (
              <div className="text-center py-12">
                <div className="w-16 h-16 rounded-full bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center mx-auto mb-4">
                  <CheckCircle2 className="w-8 h-8 text-emerald-500" />
                </div>
                <h3 className="text-xl font-bold text-white mb-2">Message sent!</h3>
                <p className="text-zinc-400 text-sm max-w-xs mx-auto mb-6">
                  Thanks for reaching out. I'll get back to you within 24 hours.
                </p>
                <button
                  onClick={() => { setSubmitted(false); setForm({ name: "", email: "", subject: "", message: "" }) }}
                  className="text-xs text-zinc-500 hover:text-white underline underline-offset-4 transition-colors"
                >
                  Send another message
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
