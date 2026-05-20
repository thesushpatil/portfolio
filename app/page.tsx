"use client"

import React, { useState, useEffect, useRef, useCallback, useMemo } from "react"
import {
  Github,
  Linkedin,
  Mail,
  Phone,
  MapPin,
  ExternalLink,
  Award,
  Users,
  Code,
  Send,
  Briefcase,
  GraduationCap,
  ChevronUp,
  Menu,
  X,
  Calendar,
  Terminal,
  Database,
  Globe,
  Zap,
  ChevronDown,
  Trophy,
  Building2,
  Rocket,
  Shield,
  Download,
  Star,
} from "lucide-react"

/* ================================================================
   DATA
   ================================================================ */

const NAV_ITEMS = [
  { id: "about", label: "About" },
  { id: "experience", label: "Experience" },
  { id: "education", label: "Education" },
  { id: "skills", label: "Skills" },
  { id: "projects", label: "Projects" },
  { id: "achievements", label: "Achievements" },
  { id: "contact", label: "Contact" },
]

const ROLES = [
  "Full-Stack Developer",
  "ISRO Research Intern",
  "Backend Engineer",
  "ML Enthusiast",
  "Open Source Contributor",
]

const STATS = [
  { label: "CGPA", value: "8.55", suffix: "" },
  { label: "Internships", value: "2", suffix: "+" },
  { label: "Projects", value: "3", suffix: "+" },
  { label: "Certifications", value: "4", suffix: "+" },
]

const EXPERIENCES = [
  {
    company: "Space Applications Centre (ISRO)",
    role: "Research Intern",
    period: "Nov 2025 – Mar 2026",
    location: "Ahmedabad, India · On-site",
    points: [
      "Developed Graphical Telecommand collection directly from various types of payload block diagrams for specific payload configurations using JavaScript, reducing manual documentation effort significantly.",
      "Built a robust Python-Flask API to synchronize dynamic UI sequences with SQL databases, ensuring mission-critical data integrity for hardware linkage systems.",
    ],
    Icon: Rocket,
    gradient: "from-orange-400 to-amber-500",
    bg: "rgba(251, 146, 60, 0.1)",
    borderColor: "rgba(251, 146, 60, 0.3)",
  },
  {
    company: "Infosys Springboard",
    role: "Backend Developer Intern",
    period: "Sep 2025 – Nov 2025",
    location: "Remote",
    subtitle: "Digital Civic Engagement & Petition Platform",
    points: [
      "Built RESTful APIs for petition creation, polls, filtering, and CRUD operations; integrated endpoints with frontend teams to ensure reliable signature storage across 500+ submissions.",
      "Implemented role-based authentication (users/admins/volunteers), token & session management, input validation, and delivered complete API documentation and test suites.",
    ],
    Icon: Building2,
    gradient: "from-blue-400 to-cyan-500",
    bg: "rgba(56, 189, 248, 0.1)",
    borderColor: "rgba(56, 189, 248, 0.3)",
  },
]

const EDUCATION_DATA = [
  {
    institution: "Tatyasaheb Kore Institute of Engineering and Technology",
    degree: "Bachelor of Technology — Computer Science & Engineering",
    grade: "CGPA: 8.55",
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
  {
    title: "Programming Languages",
    skills: ["Java", "Python", "C++", "SQL"],
    Icon: Code,
    gradient: "from-violet-500 to-purple-600",
  },
  {
    title: "Web & Backend",
    skills: ["Flask", "Django", "Node.js", "REST APIs", "HTML", "CSS"],
    Icon: Globe,
    gradient: "from-blue-500 to-cyan-500",
  },
  {
    title: "Databases",
    skills: ["MySQL", "MongoDB", "SQLite"],
    Icon: Database,
    gradient: "from-emerald-400 to-green-500",
  },
  {
    title: "Tools & Platforms",
    skills: ["Git", "GitHub", "Linux", "Postman"],
    Icon: Terminal,
    gradient: "from-orange-400 to-amber-500",
  },
  {
    title: "Core Competencies",
    skills: ["DSA", "AI", "Operating Systems", "Computer Networks", "Problem Solving"],
    Icon: Zap,
    gradient: "from-pink-500 to-rose-500",
  },
]

const PROJECTS = [
  {
    title: "Personal Expenditure Management System",
    description:
      "Full-stack web application for personal expense management with budget & savings tracking. Generated monthly reports of user expenditure patterns. Implemented user authentication and an analytics dashboard to help users analyze spending habits.",
    tools: ["Django", "JavaScript", "HTML", "SQLite"],
    link: "https://github.com/thesushpatil",
    year: "2025",
    gradient: "from-violet-500 to-indigo-500",
  },
  {
    title: "Deepfake Video Detection System",
    description:
      "End-to-end deepfake detection pipeline — preprocessing, feature extraction, training & evaluation — using EfficientNetB0, achieving 92% accuracy. Designed a browser extension for high-precision classification of manipulated video frames across social media platforms.",
    tools: ["TensorFlow", "OpenCV", "EfficientNetB0"],
    link: "https://github.com/thesushpatil",
    year: "2026",
    gradient: "from-cyan-500 to-blue-500",
  },
]

const CERTIFICATIONS = [
  { name: "Java Programming Certificate (Elite Gold)", provider: "NPTEL", year: "2025", Icon: Trophy },
  { name: "Frontend Developer Professional Certificate", provider: "Meta", year: "2025", Icon: Award },
  { name: "Backend Developer Professional Certificate", provider: "Meta", year: "2025", Icon: Award },
  { name: "Python Professional Certificate", provider: "Meta", year: "2025", Icon: Award },
]

const LEADERSHIP = [
  {
    role: "Senior Adviser Core Member",
    org: "GDG on Campus (TKIET)",
    description: "Contributed to organizing tech workshops and community events for 200+ developers.",
    Icon: Users,
  },
  {
    role: "Technical Co-Head",
    org: "T-LUG (TKIET Linux User Group)",
    description: "Led Linux and open-source software initiatives and workshops on campus, 2025.",
    Icon: Terminal,
  },
  {
    role: "Participant",
    org: "Smart India Hackathon 2024",
    description: "National Level Hackathon — collaborated on innovative solutions to real-world problems.",
    Icon: Rocket,
  },
]

/* ================================================================
   PARTICLES DATA (generated once)
   ================================================================ */
const PARTICLES = Array.from({ length: 40 }, (_, i) => ({
  id: i,
  size: Math.random() * 3 + 1,
  x: Math.random() * 100,
  duration: Math.random() * 25 + 15,
  delay: Math.random() * 25,
  type: i % 3 === 0 ? "particle-cyan" : i % 2 === 0 ? "particle-purple" : "particle-blue",
}))

/* ================================================================
   COMPONENT
   ================================================================ */
export default function Portfolio() {
  // ---- State ----
  const [activeSection, setActiveSection] = useState("about")
  const [visibleSections, setVisibleSections] = useState<Set<string>>(new Set())
  const [isLoaded, setIsLoaded] = useState(false)
  const [scrollProgress, setScrollProgress] = useState(0)
  const [showBackToTop, setShowBackToTop] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [currentRoleIndex, setCurrentRoleIndex] = useState(0)
  const [currentText, setCurrentText] = useState("")
  const [isDeleting, setIsDeleting] = useState(false)
  const [formData, setFormData] = useState({ name: "", email: "", subject: "", message: "" })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [formSent, setFormSent] = useState(false)

  // ---- Refs ----
  const heroRef = useRef<HTMLDivElement>(null)

  /* ---------- Load animation ---------- */
  useEffect(() => {
    const timer = setTimeout(() => setIsLoaded(true), 100)
    return () => clearTimeout(timer)
  }, [])

  /* ---------- Intersection Observer ---------- */
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisibleSections((prev) => new Set([...prev, entry.target.id]))
          }
        })
      },
      { threshold: 0.08, rootMargin: "-30px" },
    )

    const sectionIds = ["about", "experience", "education", "skills", "projects", "achievements", "contact"]
    sectionIds.forEach((id) => {
      const el = document.getElementById(id)
      if (el) observer.observe(el)
    })

    return () => observer.disconnect()
  }, [])

  /* ---------- Scroll tracking ---------- */
  useEffect(() => {
    const handleScroll = () => {
      // Progress
      const total = document.documentElement.scrollHeight - window.innerHeight
      setScrollProgress(total > 0 ? (window.scrollY / total) * 100 : 0)

      // Back to top
      setShowBackToTop(window.scrollY > 500)

      // Active section
      const sectionIds = ["about", "experience", "education", "skills", "projects", "achievements", "contact"]
      const scrollPos = window.scrollY + 120
      for (const id of sectionIds) {
        const el = document.getElementById(id)
        if (el && scrollPos >= el.offsetTop && scrollPos < el.offsetTop + el.offsetHeight) {
          setActiveSection(id)
          break
        }
      }
    }

    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  /* ---------- Typewriter effect ---------- */
  useEffect(() => {
    const role = ROLES[currentRoleIndex]
    const speed = isDeleting ? 40 : 80
    const timeout = setTimeout(() => {
      if (!isDeleting) {
        const next = role.substring(0, currentText.length + 1)
        setCurrentText(next)
        if (next === role) {
          setTimeout(() => setIsDeleting(true), 2200)
        }
      } else {
        const next = role.substring(0, currentText.length - 1)
        setCurrentText(next)
        if (next === "") {
          setIsDeleting(false)
          setCurrentRoleIndex((prev) => (prev + 1) % ROLES.length)
        }
      }
    }, speed)

    return () => clearTimeout(timeout)
  }, [currentText, isDeleting, currentRoleIndex])

  /* ---------- Body scroll lock for mobile menu ---------- */
  useEffect(() => {
    document.body.style.overflow = mobileMenuOpen ? "hidden" : ""
    return () => {
      document.body.style.overflow = ""
    }
  }, [mobileMenuOpen])

  /* ---------- Helpers ---------- */
  const scrollToSection = useCallback((id: string) => {
    const el = document.getElementById(id)
    if (el) el.scrollIntoView({ behavior: "smooth" })
    setMobileMenuOpen(false)
  }, [])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    await new Promise((r) => setTimeout(r, 1200))
    setFormData({ name: "", email: "", subject: "", message: "" })
    setIsSubmitting(false)
    setFormSent(true)
    setTimeout(() => setFormSent(false), 4000)
  }

  const sectionClass = (id: string, extra = "") =>
    `${visibleSections.has(id) ? "section-visible" : "section-hidden"} ${extra}`

  /* ================================================================
     RENDER
     ================================================================ */
  return (
    <div className="min-h-screen relative">
      {/* Scroll Progress Bar */}
      <div className="scroll-progress" style={{ width: `${scrollProgress}%` }} />

      {/* Background Effects */}
      <div className="bg-mesh">
        <div className="bg-mesh-orb bg-mesh-orb-1" />
        <div className="bg-mesh-orb bg-mesh-orb-2" />
        <div className="bg-mesh-orb bg-mesh-orb-3" />
      </div>
      <div className="grid-pattern" />

      {/* Particles */}
      {PARTICLES.map((p) => (
        <div
          key={p.id}
          className={`particle ${p.type}`}
          style={{
            width: p.size,
            height: p.size,
            left: `${p.x}%`,
            animationDuration: `${p.duration}s`,
            animationDelay: `${p.delay}s`,
          }}
        />
      ))}

      {/* ====================== NAVIGATION ====================== */}
      <nav className="glass-nav fixed top-0 left-0 right-0 z-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <button
              onClick={() => scrollToSection("about")}
              className="font-bold text-lg tracking-tight gradient-text-static hover:opacity-80 transition-opacity"
            >
              {"<SP />"}
            </button>

            {/* Desktop Nav */}
            <div className="hidden md:flex items-center gap-1">
              {NAV_ITEMS.map((item) => (
                <button
                  key={item.id}
                  id={`nav-${item.id}`}
                  onClick={() => scrollToSection(item.id)}
                  className={`nav-link ${activeSection === item.id ? "active" : ""}`}
                >
                  {item.label}
                </button>
              ))}
            </div>

            {/* Mobile Hamburger */}
            <button
              id="mobile-menu-toggle"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 rounded-lg text-gray-400 hover:text-white hover:bg-white/5 transition-all"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <div className={`mobile-menu ${mobileMenuOpen ? "open" : ""}`}>
        <button
          onClick={() => setMobileMenuOpen(false)}
          className="absolute top-4 right-4 p-2 text-gray-400 hover:text-white"
          aria-label="Close menu"
        >
          <X className="w-7 h-7" />
        </button>
        {NAV_ITEMS.map((item) => (
          <button
            key={item.id}
            onClick={() => scrollToSection(item.id)}
            className="mobile-menu-link"
          >
            {item.label}
          </button>
        ))}
      </div>

      {/* ====================== HERO / ABOUT ====================== */}
      <section
        id="about"
        ref={heroRef}
        className="relative z-10 pt-24 pb-20 px-4 sm:px-6 min-h-screen flex items-center"
      >
        <div className="max-w-6xl mx-auto w-full">
          <div className="text-center">
            {/* Profile Image */}
            <div
              className={`mx-auto mb-8 transition-all duration-1000 ${
                isLoaded ? "opacity-100 scale-100" : "opacity-0 scale-75"
              }`}
              style={{ transitionDelay: "200ms" }}
            >
              <div className="profile-ring w-36 h-36 sm:w-44 sm:h-44 mx-auto">
                <img
                  src="/sus.jpg"
                  alt="Sushant Patil"
                  className="w-full h-full rounded-full object-cover"
                  loading="eager"
                />
              </div>
            </div>

            {/* Name */}
            <h1
              className={`text-4xl sm:text-5xl md:text-7xl font-extrabold mb-4 tracking-tight transition-all duration-1000 ${
                isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
              }`}
              style={{ transitionDelay: "400ms" }}
            >
              <span className="gradient-text">Sushant Patil</span>
            </h1>

            {/* Typewriter Role */}
            <div
              className={`h-10 mb-6 transition-all duration-1000 ${
                isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
              }`}
              style={{ transitionDelay: "600ms" }}
            >
              <span className="text-lg sm:text-xl md:text-2xl font-medium text-indigo-300">
                {currentText}
              </span>
              <span className="typewriter-cursor" />
            </div>

            {/* Bio */}
            <p
              className={`text-base sm:text-lg text-slate-400 max-w-2xl mx-auto mb-10 leading-relaxed transition-all duration-1000 ${
                isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
              }`}
              style={{ transitionDelay: "750ms" }}
            >
              Computer Science Engineer with hands-on experience at{" "}
              <span className="text-amber-400 font-medium">ISRO</span> and{" "}
              <span className="text-cyan-400 font-medium">Infosys</span>. Passionate about building
              scalable backend systems, machine learning pipelines, and modern web applications.
            </p>

            {/* Contact Quick Links */}
            <div
              className={`flex flex-wrap justify-center gap-4 sm:gap-6 mb-10 text-sm transition-all duration-1000 ${
                isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
              }`}
              style={{ transitionDelay: "900ms" }}
            >
              <span className="flex items-center gap-2 text-slate-400">
                <MapPin className="w-4 h-4 text-indigo-400" />
                Kolhapur, Maharashtra
              </span>
              <a
                href="mailto:sushantpatil6217@gmail.com"
                className="flex items-center gap-2 text-slate-400 hover:text-indigo-300 transition-colors"
              >
                <Mail className="w-4 h-4 text-indigo-400" />
                sushantpatil6217@gmail.com
              </a>
              <a
                href="tel:+919975806217"
                className="flex items-center gap-2 text-slate-400 hover:text-indigo-300 transition-colors"
              >
                <Phone className="w-4 h-4 text-indigo-400" />
                +91 9975806217
              </a>
            </div>

            {/* Social Icons */}
            <div
              className={`flex justify-center gap-4 mb-14 transition-all duration-1000 ${
                isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
              }`}
              style={{ transitionDelay: "1050ms" }}
            >
              <a
                href="https://linkedin.com/in/thesushpatil"
                target="_blank"
                rel="noopener noreferrer"
                className="social-icon linkedin"
                aria-label="LinkedIn"
              >
                <Linkedin className="w-5 h-5" />
              </a>
              <a
                href="https://github.com/thesushpatil"
                target="_blank"
                rel="noopener noreferrer"
                className="social-icon github"
                aria-label="GitHub"
              >
                <Github className="w-5 h-5" />
              </a>
              <a
                href="mailto:sushantpatil6217@gmail.com"
                className="social-icon email"
                aria-label="Email"
              >
                <Mail className="w-5 h-5" />
              </a>
            </div>

            {/* Stats Row */}
            <div
              className={`grid grid-cols-2 sm:grid-cols-4 gap-4 max-w-2xl mx-auto mb-12 transition-all duration-1000 ${
                isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
              }`}
              style={{ transitionDelay: "1200ms" }}
            >
              {STATS.map((stat, i) => (
                <div key={i} className="stat-card">
                  <div className="text-2xl sm:text-3xl font-bold gradient-text-static">
                    {stat.value}
                    {stat.suffix}
                  </div>
                  <div className="text-xs sm:text-sm text-slate-500 mt-1">{stat.label}</div>
                </div>
              ))}
            </div>

            {/* Scroll Indicator */}
            <div
              className={`transition-all duration-1000 ${
                isLoaded ? "opacity-100" : "opacity-0"
              }`}
              style={{ transitionDelay: "1500ms" }}
            >
              <button
                onClick={() => scrollToSection("experience")}
                className="text-slate-500 hover:text-indigo-400 transition-colors"
                aria-label="Scroll down"
              >
                <ChevronDown className="w-6 h-6 mx-auto" style={{ animation: "scroll-bounce 2s ease-in-out infinite" }} />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ====================== EXPERIENCE ====================== */}
      <section id="experience" className={`relative z-10 py-20 px-4 sm:px-6 ${sectionClass("experience")}`}>
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl sm:text-4xl font-bold text-center mb-16">
            <span className="section-heading gradient-text-static">Experience</span>
          </h2>

          <div className="relative pl-12 sm:pl-14">
            {/* Timeline line */}
            <div className="timeline-line" />

            <div className="space-y-12">
              {EXPERIENCES.map((exp, i) => (
                <div key={i} className="relative" style={{ animationDelay: `${i * 200}ms` }}>
                  {/* Timeline dot */}
                  <div className="timeline-dot" style={{ top: "28px" }} />

                  <div
                    className="glass-card p-6 sm:p-8"
                    style={{
                      background: exp.bg,
                      borderColor: exp.borderColor,
                    }}
                  >
                    <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3 mb-4">
                      <div className="flex items-start gap-3">
                        <div
                          className={`p-2.5 rounded-xl bg-gradient-to-br ${exp.gradient} shrink-0`}
                        >
                          <exp.Icon className="w-5 h-5 text-white" />
                        </div>
                        <div>
                          <h3 className="text-lg sm:text-xl font-bold text-white">{exp.company}</h3>
                          <p className="text-indigo-300 font-medium text-sm sm:text-base">{exp.role}</p>
                          {exp.subtitle && (
                            <p className="text-slate-500 text-sm italic mt-0.5">{exp.subtitle}</p>
                          )}
                        </div>
                      </div>
                      <div className="flex flex-col items-start sm:items-end gap-1 text-sm text-slate-400 shrink-0">
                        <span className="flex items-center gap-1.5">
                          <Calendar className="w-3.5 h-3.5" />
                          {exp.period}
                        </span>
                        <span className="flex items-center gap-1.5">
                          <MapPin className="w-3.5 h-3.5" />
                          {exp.location}
                        </span>
                      </div>
                    </div>

                    <ul className="space-y-3 ml-1">
                      {exp.points.map((point, j) => (
                        <li key={j} className="flex items-start gap-3 text-slate-300 text-sm sm:text-base leading-relaxed">
                          <span className="mt-2 w-1.5 h-1.5 rounded-full bg-indigo-400 shrink-0" />
                          {point}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ====================== EDUCATION ====================== */}
      <section id="education" className={`relative z-10 py-20 px-4 sm:px-6 ${sectionClass("education")}`}>
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl sm:text-4xl font-bold text-center mb-16">
            <span className="section-heading gradient-text-static">Education</span>
          </h2>

          <div className="relative pl-12 sm:pl-14">
            <div className="timeline-line" />

            <div className="space-y-10">
              {EDUCATION_DATA.map((edu, i) => (
                <div key={i} className="relative">
                  <div className="timeline-dot" style={{ top: "28px" }} />

                  <div className="glass-card p-6 sm:p-8">
                    <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3">
                      <div className="flex items-start gap-3">
                        <div className="p-2.5 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 shrink-0">
                          <GraduationCap className="w-5 h-5 text-white" />
                        </div>
                        <div>
                          <h3 className="text-lg font-bold text-white">{edu.institution}</h3>
                          <p className="text-indigo-300 text-sm sm:text-base">{edu.degree}</p>
                          <p className="text-emerald-400 font-semibold text-sm mt-1">{edu.grade}</p>
                        </div>
                      </div>
                      <div className="flex flex-col items-start sm:items-end gap-1 text-sm text-slate-400 shrink-0">
                        <span className="flex items-center gap-1.5">
                          <Calendar className="w-3.5 h-3.5" />
                          {edu.period}
                        </span>
                        <span className="flex items-center gap-1.5">
                          <MapPin className="w-3.5 h-3.5" />
                          {edu.location}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ====================== SKILLS ====================== */}
      <section id="skills" className={`relative z-10 py-20 px-4 sm:px-6 ${sectionClass("skills")}`}>
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl sm:text-4xl font-bold text-center mb-16">
            <span className="section-heading gradient-text-static">Technical Skills</span>
          </h2>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {SKILL_CATEGORIES.map((cat, i) => (
              <div
                key={i}
                className={`glass-card p-6 ${visibleSections.has("skills") ? "section-visible stagger-" + (i + 1) : "section-hidden"}`}
              >
                <div className="flex items-center gap-3 mb-5">
                  <div className={`p-2.5 rounded-xl bg-gradient-to-br ${cat.gradient}`}>
                    <cat.Icon className="w-5 h-5 text-white" />
                  </div>
                  <h3 className="text-lg font-semibold text-white">{cat.title}</h3>
                </div>
                <div className="flex flex-wrap gap-2">
                  {cat.skills.map((skill, j) => (
                    <span key={j} className="skill-tag">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ====================== PROJECTS ====================== */}
      <section id="projects" className={`relative z-10 py-20 px-4 sm:px-6 ${sectionClass("projects")}`}>
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl sm:text-4xl font-bold text-center mb-16">
            <span className="section-heading gradient-text-static">Projects</span>
          </h2>

          <div className="grid md:grid-cols-2 gap-8">
            {PROJECTS.map((proj, i) => (
              <div
                key={i}
                className={`glass-card p-6 sm:p-8 group ${
                  visibleSections.has("projects") ? "section-visible stagger-" + (i + 1) : "section-hidden"
                }`}
              >
                {/* Header */}
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className={`p-2 rounded-lg bg-gradient-to-br ${proj.gradient}`}>
                      <Code className="w-4 h-4 text-white" />
                    </div>
                    <span className="text-xs text-slate-500 font-mono">{proj.year}</span>
                  </div>
                  <a
                    href={proj.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 rounded-lg text-slate-500 hover:text-white hover:bg-white/10 transition-all group-hover:text-indigo-400"
                    aria-label={`View ${proj.title} on GitHub`}
                  >
                    <ExternalLink className="w-4 h-4" />
                  </a>
                </div>

                <h3 className="text-lg sm:text-xl font-bold text-white mb-3 group-hover:text-indigo-300 transition-colors">
                  {proj.title}
                </h3>

                <p className="text-slate-400 text-sm leading-relaxed mb-5">{proj.description}</p>

                <div className="flex flex-wrap gap-2">
                  {proj.tools.map((tool, j) => (
                    <span
                      key={j}
                      className="px-3 py-1 rounded-full text-xs font-medium bg-white/5 text-slate-400 border border-white/10"
                    >
                      {tool}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ====================== ACHIEVEMENTS ====================== */}
      <section id="achievements" className={`relative z-10 py-20 px-4 sm:px-6 ${sectionClass("achievements")}`}>
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl sm:text-4xl font-bold text-center mb-16">
            <span className="section-heading gradient-text-static">Achievements & Leadership</span>
          </h2>

          {/* Certifications */}
          <div className="mb-16">
            <h3 className="text-xl font-semibold text-indigo-300 mb-8 flex items-center gap-2 justify-center">
              <Trophy className="w-5 h-5 text-amber-400" />
              Certifications
            </h3>
            <div className="grid sm:grid-cols-2 gap-5 max-w-4xl mx-auto">
              {CERTIFICATIONS.map((cert, i) => (
                <div
                  key={i}
                  className={`glass-card p-5 flex items-center gap-4 ${
                    visibleSections.has("achievements") ? "section-visible stagger-" + (i + 1) : "section-hidden"
                  }`}
                >
                  <div className="p-2.5 rounded-xl bg-gradient-to-br from-amber-500 to-orange-500 shrink-0">
                    <cert.Icon className="w-5 h-5 text-white" />
                  </div>
                  <div className="min-w-0">
                    <h4 className="text-sm sm:text-base font-semibold text-white leading-snug">{cert.name}</h4>
                    <div className="flex items-center gap-2 mt-1 text-xs text-slate-400">
                      <span>{cert.provider}</span>
                      <span className="w-1 h-1 rounded-full bg-slate-600" />
                      <span>{cert.year}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Leadership */}
          <div>
            <h3 className="text-xl font-semibold text-indigo-300 mb-8 flex items-center gap-2 justify-center">
              <Shield className="w-5 h-5 text-emerald-400" />
              Leadership & Volunteering
            </h3>
            <div className="grid sm:grid-cols-3 gap-5 max-w-5xl mx-auto">
              {LEADERSHIP.map((item, i) => (
                <div
                  key={i}
                  className={`glass-card p-6 text-center ${
                    visibleSections.has("achievements") ? "section-visible stagger-" + (i + 3) : "section-hidden"
                  }`}
                >
                  <div className="mx-auto mb-4 w-12 h-12 rounded-xl bg-gradient-to-br from-emerald-500 to-green-600 flex items-center justify-center">
                    <item.Icon className="w-5 h-5 text-white" />
                  </div>
                  <h4 className="text-base font-bold text-white mb-1">{item.role}</h4>
                  <p className="text-indigo-300 text-sm font-medium mb-3">{item.org}</p>
                  <p className="text-slate-400 text-sm leading-relaxed">{item.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ====================== CONTACT ====================== */}
      <section id="contact" className={`relative z-10 py-20 px-4 sm:px-6 ${sectionClass("contact")}`}>
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl sm:text-4xl font-bold text-center mb-16">
            <span className="section-heading gradient-text-static">Get In Touch</span>
          </h2>

          <div className="grid md:grid-cols-5 gap-10">
            {/* Left: Contact Info */}
            <div className="md:col-span-2 space-y-6">
              <div>
                <h3 className="text-xl font-semibold text-white mb-3">Let&apos;s Connect</h3>
                <p className="text-slate-400 text-sm leading-relaxed">
                  I&apos;m always interested in new opportunities, collaborations, and exciting projects. Feel free to reach
                  out — I&apos;d love to hear from you!
                </p>
              </div>

              <div className="space-y-4">
                <a
                  href="mailto:sushantpatil6217@gmail.com"
                  className="flex items-center gap-3 text-slate-400 hover:text-indigo-300 transition-all group"
                >
                  <div className="p-2 rounded-lg bg-white/5 group-hover:bg-indigo-500/20 transition-colors">
                    <Mail className="w-4 h-4" />
                  </div>
                  <span className="text-sm">sushantpatil6217@gmail.com</span>
                </a>
                <a
                  href="tel:+919975806217"
                  className="flex items-center gap-3 text-slate-400 hover:text-indigo-300 transition-all group"
                >
                  <div className="p-2 rounded-lg bg-white/5 group-hover:bg-indigo-500/20 transition-colors">
                    <Phone className="w-4 h-4" />
                  </div>
                  <span className="text-sm">+91 9975806217</span>
                </a>
                <div className="flex items-center gap-3 text-slate-400">
                  <div className="p-2 rounded-lg bg-white/5">
                    <MapPin className="w-4 h-4" />
                  </div>
                  <span className="text-sm">Kolhapur, Maharashtra, India</span>
                </div>
              </div>

              <div className="flex gap-3 pt-4">
                <a
                  href="https://linkedin.com/in/thesushpatil"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="social-icon linkedin"
                  aria-label="LinkedIn"
                >
                  <Linkedin className="w-5 h-5" />
                </a>
                <a
                  href="https://github.com/thesushpatil"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="social-icon github"
                  aria-label="GitHub"
                >
                  <Github className="w-5 h-5" />
                </a>
              </div>
            </div>

            {/* Right: Contact Form */}
            <div className="md:col-span-3">
              <form onSubmit={handleSubmit} className="glass-card p-6 sm:p-8 space-y-5">
                <div className="grid sm:grid-cols-2 gap-5">
                  <div>
                    <label htmlFor="contact-name" className="block text-sm font-medium text-slate-300 mb-2">
                      Name
                    </label>
                    <input
                      type="text"
                      id="contact-name"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                      className="form-input"
                      placeholder="Your name"
                    />
                  </div>
                  <div>
                    <label htmlFor="contact-email" className="block text-sm font-medium text-slate-300 mb-2">
                      Email
                    </label>
                    <input
                      type="email"
                      id="contact-email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      className="form-input"
                      placeholder="you@email.com"
                    />
                  </div>
                </div>
                <div>
                  <label htmlFor="contact-subject" className="block text-sm font-medium text-slate-300 mb-2">
                    Subject
                  </label>
                  <input
                    type="text"
                    id="contact-subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleInputChange}
                    required
                    className="form-input"
                    placeholder="What's this about?"
                  />
                </div>
                <div>
                  <label htmlFor="contact-message" className="block text-sm font-medium text-slate-300 mb-2">
                    Message
                  </label>
                  <textarea
                    id="contact-message"
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    required
                    rows={5}
                    className="form-input resize-none"
                    placeholder="Tell me about your project, opportunity, or just say hello!"
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="btn-primary w-full disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? (
                    <>
                      <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      <span>Sending...</span>
                    </>
                  ) : formSent ? (
                    <>
                      <Star className="w-4 h-4" />
                      <span>Message Sent!</span>
                    </>
                  ) : (
                    <>
                      <Send className="w-4 h-4" />
                      <span>Send Message</span>
                    </>
                  )}
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* ====================== FOOTER ====================== */}
      <footer className="relative z-10 py-10 px-4 border-t border-white/5">
        <div className="max-w-6xl mx-auto text-center">
          <div className="flex justify-center gap-3 mb-4">
            <a
              href="https://linkedin.com/in/thesushpatil"
              target="_blank"
              rel="noopener noreferrer"
              className="text-slate-500 hover:text-indigo-400 transition-colors"
              aria-label="LinkedIn"
            >
              <Linkedin className="w-4 h-4" />
            </a>
            <a
              href="https://github.com/thesushpatil"
              target="_blank"
              rel="noopener noreferrer"
              className="text-slate-500 hover:text-indigo-400 transition-colors"
              aria-label="GitHub"
            >
              <Github className="w-4 h-4" />
            </a>
            <a
              href="mailto:sushantpatil6217@gmail.com"
              className="text-slate-500 hover:text-indigo-400 transition-colors"
              aria-label="Email"
            >
              <Mail className="w-4 h-4" />
            </a>
          </div>
          <p className="text-slate-600 text-sm">
            © {new Date().getFullYear()} Sushant Patil · Built with lots of ☕ and 💜
          </p>
        </div>
      </footer>

      {/* ====================== BACK TO TOP ====================== */}
      <button
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        className={`back-to-top ${showBackToTop ? "visible" : ""}`}
        aria-label="Back to top"
      >
        <ChevronUp className="w-5 h-5" />
      </button>
    </div>
  )
}
