"use client"

import React, { useState, useEffect, useCallback, useRef } from "react"
import {
  Rocket, Building2, Code, Globe, Database,
  Terminal, Zap, Trophy, Award, Users,
} from "lucide-react"

import Navbar from "@/components/sections/navbar"
import Hero from "@/components/sections/hero"
import Experience from "@/components/sections/experience"
import Education from "@/components/sections/education"
import Skills from "@/components/sections/skills"
import Projects from "@/components/sections/projects"
import Achievements from "@/components/sections/achievements"
import Contact from "@/components/sections/contact"
import Footer from "@/components/sections/footer"

/* ── DATA ───────────────────────────────────────────────── */

const NAV_ITEMS = [
  { id: "about",        label: "About" },
  { id: "experience",   label: "Experience" },
  { id: "education",    label: "Education" },
  { id: "skills",       label: "Skills" },
  { id: "projects",     label: "Projects" },
  { id: "achievements", label: "Credentials" },
  { id: "contact",      label: "Contact" },
]

const ROLES = [
  "Full-Stack Developer",
  "ISRO Research Intern",
  "Backend Engineer",
  "ML Pipelines Engineer",
  "Open Source Developer",
]

const STATS = [
  { label: "CGPA",         value: "8.55", suffix: "" },
  { label: "Internships",  value: "2",    suffix: "+" },
  { label: "Projects",     value: "3",    suffix: "+" },
  { label: "Credentials",  value: "4",    suffix: "+" },
]

const EXPERIENCES = [
  {
    company: "Space Applications Centre (ISRO)",
    role: "Research Intern",
    period: "Nov 2025 – Mar 2026",
    location: "Ahmedabad, India · On-site",
    points: [
      "Developed Graphical Telecommand collection from payload block diagrams using JavaScript, reducing manual documentation effort significantly.",
      "Built a robust Python-Flask API to synchronize dynamic UI sequences with SQL databases, ensuring mission-critical data integrity for hardware linkage systems.",
    ],
    tools: ["JavaScript", "Python", "Flask", "SQL", "Payload Systems"],
    Icon: Rocket,
  },
  {
    company: "Infosys Springboard",
    role: "Backend Developer Intern",
    period: "Sep 2025 – Nov 2025",
    location: "Remote",
    points: [
      "Built RESTful APIs for petition creation, polls, filtering, and CRUD operations; integrated endpoints with frontend teams to ensure reliable signature storage across 500+ submissions.",
      "Implemented role-based authentication, token & session management, input validation, and delivered complete API documentation and test suites.",
    ],
    tools: ["Node.js", "Express", "REST APIs", "JWT Auth", "Test Suites"],
    Icon: Building2,
  },
]

const EDUCATION_DATA = [
  {
    institution: "Tatyasaheb Kore Institute of Engineering & Technology",
    degree: "Bachelor of Technology — Computer Science & Engineering",
    grade: "8.55 CGPA",
    period: "Oct 2022 – Jun 2026",
    location: "Warananagar, India",
  },
  {
    institution: "S. M. Lohia College, Kolhapur",
    degree: "HSC (12th Standard)",
    grade: "78.33%",
    period: "2021 – 2022",
    location: "Kolhapur, India",
  },
  {
    institution: "S. M. Lohia High School, Kolhapur",
    degree: "SSC (10th Standard)",
    grade: "93.40%",
    period: "2019 – 2020",
    location: "Kolhapur, India",
  },
]

const SKILL_CATEGORIES = [
  { title: "Programming Languages",       skills: ["Java", "Python", "C++", "SQL"],                             Icon: Code,     glowColor: "indigo"  as const },
  { title: "Web & Backend",               skills: ["Flask", "Django", "Node.js", "REST APIs", "HTML", "CSS"],   Icon: Globe,    glowColor: "cyan"    as const },
  { title: "Databases & Storage",         skills: ["MySQL", "MongoDB", "SQLite"],                               Icon: Database, glowColor: "emerald" as const },
  { title: "Developer Tools",             skills: ["Git", "GitHub", "Linux", "Postman"],                        Icon: Terminal, glowColor: "amber"   as const },
  { title: "Core Engineering Concepts",   skills: ["DSA", "AI/ML", "OS", "Computer Networks"],                  Icon: Zap,      glowColor: "violet"  as const },
]

const PROJECTS = [
  {
    title: "Personal Expenditure Management System",
    description:
      "Full-stack web app for personal finance tracking — budget management, monthly analytics reports, spending charts, and auth-gated user dashboards built with Django & SQLite.",
    tools: ["Django", "JavaScript", "HTML/CSS", "SQLite"],
    link: "https://github.com/thesushpatil",
    year: "2025",
    glowColor: "indigo" as const,
  },
  {
    title: "Deepfake Video Detection System",
    description:
      "End-to-end deepfake detection pipeline with EfficientNetB0 achieving 92% accuracy. Includes a browser extension for real-time classification of manipulated video frames across social media platforms.",
    tools: ["TensorFlow", "OpenCV", "EfficientNetB0", "Python"],
    link: "https://github.com/thesushpatil",
    year: "2026",
    glowColor: "cyan" as const,
  },
]

const CERTIFICATIONS = [
  { name: "Java Programming — Elite Gold",         provider: "NPTEL",  year: "2025", Icon: Trophy },
  { name: "Frontend Developer Professional Cert",  provider: "Meta",   year: "2025", Icon: Award  },
  { name: "Backend Developer Professional Cert",   provider: "Meta",   year: "2025", Icon: Award  },
  { name: "Python Professional Certificate",       provider: "Meta",   year: "2025", Icon: Award  },
]

const LEADERSHIP = [
  {
    role: "Senior Adviser Core Member",
    org: "GDG on Campus (TKIET)",
    description: "Organized tech workshops and community events for 200+ developers.",
    Icon: Users,
  },
  {
    role: "Technical Co-Head",
    org: "T-LUG — Linux User Group",
    description: "Led Linux and open-source software workshops on campus in 2025.",
    Icon: Terminal,
  },
  {
    role: "Participant",
    org: "Smart India Hackathon 2024",
    description: "National Level Hackathon — built innovative solutions to real-world problems.",
    Icon: Rocket,
  },
]

/* ── COMPONENT ──────────────────────────────────────────── */

export default function Portfolio() {
  const [activeSection, setActiveSection]     = useState("about")
  const [isLoaded, setIsLoaded]               = useState(false)
  const [scrollProgress, setScrollProgress]   = useState(0)
  const [currentRoleIndex, setCurrentRoleIndex] = useState(0)
  const [currentText, setCurrentText]         = useState("")
  const [isDeleting, setIsDeleting]           = useState(false)

  /* page load */
  useEffect(() => { setIsLoaded(true) }, [])

  /* scroll spy + progress */
  useEffect(() => {
    const ids = NAV_ITEMS.map((n) => n.id)
    const handleScroll = () => {
      const total = document.documentElement.scrollHeight - window.innerHeight
      setScrollProgress(total > 0 ? (window.scrollY / total) * 100 : 0)
      const pos = window.scrollY + 180
      for (const id of ids) {
        const el = document.getElementById(id)
        if (el && pos >= el.offsetTop && pos < el.offsetTop + el.offsetHeight) {
          setActiveSection(id)
          break
        }
      }
    }
    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  /* section reveal IntersectionObserver */
  useEffect(() => {
    const revealEls = document.querySelectorAll(
      ".reveal, .reveal-left, .reveal-right, .reveal-scale"
    )
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible")
          }
        })
      },
      { threshold: 0.1, rootMargin: "0px 0px -60px 0px" }
    )
    revealEls.forEach((el) => obs.observe(el))
    return () => obs.disconnect()
  }, [isLoaded])

  /* typewriter */
  useEffect(() => {
    const role  = ROLES[currentRoleIndex]
    const speed = isDeleting ? 28 : 58
    const t = setTimeout(() => {
      if (!isDeleting) {
        const next = role.substring(0, currentText.length + 1)
        setCurrentText(next)
        if (next === role) setTimeout(() => setIsDeleting(true), 2400)
      } else {
        const next = role.substring(0, currentText.length - 1)
        setCurrentText(next)
        if (next === "") {
          setIsDeleting(false)
          setCurrentRoleIndex((p) => (p + 1) % ROLES.length)
        }
      }
    }, speed)
    return () => clearTimeout(t)
  }, [currentText, isDeleting, currentRoleIndex])

  const scrollToSection = useCallback((id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" })
  }, [])

  return (
    <div className="min-h-screen relative text-zinc-100 bg-[#08080f]">
      {/* Scroll progress bar */}
      <div className="scroll-progress" style={{ width: `${scrollProgress}%` }} />

      {/* Grid background */}
      <div className="bg-grid" aria-hidden />

      {/* Floating navbar */}
      <Navbar
        activeSection={activeSection}
        scrollToSection={scrollToSection}
        navItems={NAV_ITEMS}
      />

      {/* Hero */}
      <Hero
        isLoaded={isLoaded}
        currentText={currentText}
        stats={STATS}
      />

      {/* All other sections */}
      <main className="relative z-10">
        <Experience experiences={EXPERIENCES} />
        <Education  educationData={EDUCATION_DATA} />
        <Skills     skillCategories={SKILL_CATEGORIES} />
        <Projects   projects={PROJECTS} />
        <Achievements certifications={CERTIFICATIONS} leadership={LEADERSHIP} />
        <Contact />
      </main>

      <Footer />
    </div>
  )
}
