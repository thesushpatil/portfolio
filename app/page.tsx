"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Github, Linkedin, Mail, Phone, MapPin, ExternalLink, Award, Users, Code, Send } from "lucide-react"

export default function Portfolio() {
  const [activeSection, setActiveSection] = useState("about")
  const [visibleSections, setVisibleSections] = useState<Set<string>>(new Set())
  const [isLoaded, setIsLoaded] = useState(false)
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)

  useEffect(() => {
    setIsLoaded(true)

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisibleSections((prev) => new Set([...prev, entry.target.id]))
          }
        })
      },
      { threshold: 0.1, rootMargin: "-50px" },
    )

    const sections = ["about", "education", "skills", "projects", "certifications", "activities", "contact"]
    sections.forEach((sectionId) => {
      const element = document.getElementById(sectionId)
      if (element) observer.observe(element)
    })

    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    const handleScroll = () => {
      const sections = ["about", "education", "skills", "projects", "certifications", "activities", "contact"]
      const scrollPosition = window.scrollY + 100

      for (const section of sections) {
        const element = document.getElementById(section)
        if (element) {
          const offsetTop = element.offsetTop
          const offsetHeight = element.offsetHeight

          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(section)
            break
          }
        }
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
    }
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    await new Promise((resolve) => setTimeout(resolve, 1000))

    setFormData({
      name: "",
      email: "",
      subject: "",
      message: "",
    })
    setIsSubmitting(false)
    alert("Thank you for your message! I'll get back to you soon.")
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 bg-gray-900/95 backdrop-blur-sm border-b border-gray-800 z-50">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <div className="font-bold text-xl bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
              Sushant Patil
            </div>
            <div className="hidden md:flex space-x-1">
              {[
                { id: "about", label: "About" },
                { id: "education", label: "Education" },
                { id: "skills", label: "Skills" },
                { id: "projects", label: "Projects" },
                { id: "certifications", label: "Certifications" },
                { id: "activities", label: "Activities" },
                { id: "contact", label: "Contact" },
              ].map((item) => (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className={`px-3 py-2 rounded-md transition-all duration-300 transform hover:scale-105 ${
                    activeSection === item.id
                      ? "bg-blue-600 text-white shadow-lg"
                      : "text-gray-300 hover:text-blue-400 hover:bg-gray-700"
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      </nav>

      {/* Hero/About Section */}
      <section
        id="about"
        className={`pt-20 pb-16 px-4 transition-all duration-1000 ${
          isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
        }`}
      >
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <div
              className={`w-40 h-40 mx-auto mb-6 transition-all duration-1000 delay-300 transform ${
                isLoaded ? "scale-100 rotate-0" : "scale-0 rotate-180"
              } hover:scale-110 hover:shadow-2xl hover:shadow-blue-500/25`}
            >
              <img
                src="/placeholder.svg?height=160&width=160"
                alt="Sushant Patil - Profile Picture"
                className="w-full h-full rounded-full object-cover border-4 border-gradient-to-br from-blue-500 to-purple-600 shadow-xl"
                style={{
                  borderImage: "linear-gradient(135deg, #3b82f6, #8b5cf6) 1",
                }}
              />
            </div>
            <h1
              className={`text-4xl md:text-6xl font-bold mb-4 bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent transition-all duration-1000 delay-500 ${
                isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5"
              }`}
            >
              Sushant Patil
            </h1>
            <h2
              className={`text-xl md:text-2xl text-blue-400 mb-6 transition-all duration-1000 delay-600 ${
                isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5"
              }`}
            >
              Computer Science Student & Full-Stack Developer
            </h2>
            <p
              className={`text-lg text-gray-300 mb-8 max-w-3xl mx-auto leading-relaxed transition-all duration-1000 delay-700 ${
                isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5"
              }`}
            >
              Aspiring computer science professional seeking an opportunity to apply my skills in software development,
              machine learning, and full-stack technologies. Interested in contributing to innovative projects,
              improving technical expertise, and growing within a forward-thinking organization.
            </p>

            {/* Contact Info */}
            <div
              className={`flex flex-wrap justify-center gap-6 mb-8 transition-all duration-1000 delay-900 ${
                isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5"
              }`}
            >
              <div className="flex items-center gap-2 text-gray-300 hover:text-blue-400 transition-colors duration-300">
                <MapPin className="w-4 h-4" />
                <span>Kolhapur, Maharashtra</span>
              </div>
              <a
                href="mailto:sushantpatil6217@gmail.com"
                className="flex items-center gap-2 text-blue-400 hover:text-blue-300 transition-all duration-300 transform hover:scale-105"
              >
                <Mail className="w-4 h-4" />
                <span>sushantpatil6217@gmail.com</span>
              </a>
              <a
                href="tel:+919975806217"
                className="flex items-center gap-2 text-blue-400 hover:text-blue-300 transition-all duration-300 transform hover:scale-105"
              >
                <Phone className="w-4 h-4" />
                <span>+91 9975806217</span>
              </a>
            </div>

            {/* Social Links */}
            <div
              className={`flex justify-center gap-4 transition-all duration-1000 delay-1100 ${
                isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5"
              }`}
            >
              <a
                href="https://linkedin.com/in/thesushpatil"
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 bg-gray-800 rounded-full hover:bg-blue-600 transition-all duration-300 transform hover:scale-110 hover:shadow-lg hover:shadow-blue-500/25"
              >
                <Linkedin className="w-5 h-5" />
              </a>
              <a
                href="https://github.com/thesushpatil"
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 bg-gray-800 rounded-full hover:bg-gray-600 transition-all duration-300 transform hover:scale-110 hover:shadow-lg"
              >
                <Github className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Education Section */}
      <section
        id="education"
        className={`py-16 px-4 transition-all duration-1000 ${
          visibleSections.has("education") ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
        }`}
      >
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold mb-12 text-center bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
            Education
          </h2>
          <div className="space-y-8">
            {[
              {
                institution: "Tatyasaheb Kore Institute Of Engineering & Technology",
                degree: "BTech in Computer Science",
                grade: "CGPA: 8.51",
                period: "2022 – 2026",
                delay: "delay-100",
              },
              {
                institution: "S. M. Lohia College, Kolhapur",
                degree: "HSC",
                grade: "Percentage: 78.33",
                period: "2021 – 2022",
                delay: "delay-300",
              },
              {
                institution: "S. M. Lohia Highschool, Kolhapur",
                degree: "SSC",
                grade: "Percentage: 93.40",
                period: "2019 – 2020",
                delay: "delay-500",
              },
            ].map((edu, index) => (
              <div
                key={index}
                className={`bg-gray-800 p-6 rounded-lg border border-gray-700 hover:border-blue-500 transition-all duration-500 transform hover:scale-105 hover:shadow-xl hover:shadow-blue-500/10 ${
                  visibleSections.has("education")
                    ? `opacity-100 translate-x-0 ${edu.delay}`
                    : "opacity-0 -translate-x-10"
                }`}
              >
                <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                  <div>
                    <h3 className="text-xl font-semibold text-blue-400 mb-2">{edu.institution}</h3>
                    <p className="text-gray-300 mb-1">{edu.degree}</p>
                    <p className="text-green-400 font-medium">{edu.grade}</p>
                  </div>
                  <div className="mt-4 md:mt-0">
                    <span className="bg-gray-700 px-3 py-1 rounded-full text-sm text-gray-300">{edu.period}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section
        id="skills"
        className={`py-16 px-4 bg-gray-800/50 transition-all duration-1000 ${
          visibleSections.has("skills") ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
        }`}
      >
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold mb-12 text-center bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
            Skills
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                title: "Programming Languages",
                skills: ["Python", "Java", "C/C++", "JavaScript", "HTML", "CSS"],
                icon: <Code className="w-6 h-6" />,
                delay: "delay-100",
              },
              {
                title: "Libraries/Frameworks",
                skills: ["Django", "Bootstrap", "Angular", "React", "NumPy", "TensorFlow"],
                icon: <Award className="w-6 h-6" />,
                delay: "delay-300",
              },
              {
                title: "Tools / Platforms",
                skills: ["Git and Github", "Linux", "Postman", "Jupyter Notebook", "Google Colab"],
                icon: <Users className="w-6 h-6" />,
                delay: "delay-500",
              },
              {
                title: "Databases",
                skills: ["MySQL", "PostgreSQL"],
                icon: <ExternalLink className="w-6 h-6" />,
                delay: "delay-700",
              },
            ].map((category, index) => (
              <div
                key={index}
                className={`bg-gray-800 p-6 rounded-lg border border-gray-700 hover:border-blue-500 transition-all duration-500 transform hover:scale-105 hover:shadow-xl hover:shadow-blue-500/10 ${
                  visibleSections.has("skills")
                    ? `opacity-100 translate-y-0 ${category.delay}`
                    : "opacity-0 translate-y-10"
                }`}
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2 bg-blue-600 rounded-lg">{category.icon}</div>
                  <h3 className="text-lg font-semibold text-blue-400">{category.title}</h3>
                </div>
                <div className="flex flex-wrap gap-2">
                  {category.skills.map((skill, skillIndex) => (
                    <span
                      key={skillIndex}
                      className="bg-gray-700 px-3 py-1 rounded-full text-sm text-gray-300 hover:bg-blue-600 hover:text-white transition-all duration-300 transform hover:scale-105"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section
        id="projects"
        className={`py-16 px-4 transition-all duration-1000 ${
          visibleSections.has("projects") ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
        }`}
      >
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold mb-12 text-center bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
            Projects
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                title: "Personal Expenditure Management",
                description:
                  "Personal Budget Management, Expense Tracking, Financial Planning, Savings Identification, Spending Reduction, Data-Driven Decision Making, Goal Achievement.",
                tools: ["Python", "Django", "JavaScript", "HTML"],
                link: "#",
                delay: "delay-100",
              },
              {
                title: "Handwritten Digit Recognition",
                description:
                  "TensorFlow-based deep learning model for MNIST digit recognition, achieving accuracy [0.97%] by applying Dense layers, ReLU, categorical cross-entropy, and the SGD optimizer.",
                tools: ["Python", "TensorFlow", "NumPy"],
                link: "#",
                delay: "delay-300",
              },
              {
                title: "Digital Clock",
                description:
                  "Encompasses various aspects of time, date, timer management and calendar management. Displays real-time current date and time, Generates calendar for user-specified months and years.",
                tools: ["C", "DSA"],
                link: "#",
                delay: "delay-500",
              },
            ].map((project, index) => (
              <div
                key={index}
                className={`bg-gray-800 p-6 rounded-lg border border-gray-700 hover:border-blue-500 transition-all duration-500 transform hover:scale-105 hover:shadow-xl hover:shadow-blue-500/10 group ${
                  visibleSections.has("projects")
                    ? `opacity-100 translate-y-0 ${project.delay}`
                    : "opacity-0 translate-y-10"
                }`}
              >
                <div className="flex items-start justify-between mb-4">
                  <h3 className="text-xl font-semibold text-blue-400 group-hover:text-blue-300 transition-colors duration-300">
                    {project.title}
                  </h3>
                  <a
                    href={project.link}
                    className="p-2 bg-gray-700 rounded-lg hover:bg-blue-600 transition-all duration-300 transform hover:scale-110"
                  >
                    <ExternalLink className="w-4 h-4" />
                  </a>
                </div>
                <p className="text-gray-300 mb-4 text-sm leading-relaxed">{project.description}</p>
                <div className="flex flex-wrap gap-2">
                  {project.tools.map((tool, toolIndex) => (
                    <span
                      key={toolIndex}
                      className="bg-gray-700 px-3 py-1 rounded-full text-xs text-gray-300 hover:bg-blue-600 hover:text-white transition-all duration-300 transform hover:scale-105"
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

      {/* Certifications Section */}
      <section
        id="certifications"
        className={`py-16 px-4 bg-gray-800/50 transition-all duration-1000 ${
          visibleSections.has("certifications") ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
        }`}
      >
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold mb-12 text-center bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
            Certifications
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            {[
              { name: "FrontEnd Developer Certificate", provider: "Meta", year: "2025", delay: "delay-100" },
              { name: "BackEnd Developer Certificate", provider: "Meta", year: "2025", delay: "delay-200" },
              { name: "Angular Developer Certificate", provider: "Infosys", year: "2025", delay: "delay-300" },
              { name: "Python Professional Certificate", provider: "Meta", year: "2025", delay: "delay-400" },
            ].map((cert, index) => (
              <div
                key={index}
                className={`bg-gray-800 p-6 rounded-lg border border-gray-700 hover:border-blue-500 transition-all duration-500 transform hover:scale-105 hover:shadow-xl hover:shadow-blue-500/10 ${
                  visibleSections.has("certifications")
                    ? `opacity-100 translate-x-0 ${cert.delay}`
                    : "opacity-0 -translate-x-10"
                }`}
              >
                <div className="flex items-center gap-3 mb-2">
                  <Award className="w-5 h-5 text-yellow-500" />
                  <h3 className="text-lg font-semibold text-blue-400">{cert.name}</h3>
                </div>
                <div className="flex justify-between items-center">
                  <p className="text-gray-300">{cert.provider}</p>
                  <span className="bg-gray-700 px-3 py-1 rounded-full text-sm text-gray-300">{cert.year}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Activities Section */}
      <section
        id="activities"
        className={`py-16 px-4 transition-all duration-1000 ${
          visibleSections.has("activities") ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
        }`}
      >
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold mb-12 text-center bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
            Participation and Volunteering
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            {[
              { activity: "Smart India Hackathon", year: "2024", delay: "delay-100" },
              { activity: "Build with AI, Google Developer Group", year: "2025", delay: "delay-200" },
              { activity: "Pune FOSS", year: "2025", delay: "delay-300" },
              { activity: "Technical Co-Head, TLUG", year: "2025", delay: "delay-400" },
            ].map((activity, index) => (
              <div
                key={index}
                className={`bg-gray-800 p-6 rounded-lg border border-gray-700 hover:border-blue-500 transition-all duration-500 transform hover:scale-105 hover:shadow-xl hover:shadow-blue-500/10 ${
                  visibleSections.has("activities")
                    ? `opacity-100 translate-x-0 ${activity.delay}`
                    : "opacity-0 translate-x-10"
                }`}
              >
                <div className="flex items-center gap-3 mb-2">
                  <Users className="w-5 h-5 text-green-500" />
                  <h3 className="text-lg font-semibold text-blue-400">{activity.activity}</h3>
                </div>
                <span className="bg-gray-700 px-3 py-1 rounded-full text-sm text-gray-300">{activity.year}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section
        id="contact"
        className={`py-16 px-4 bg-gray-800/50 transition-all duration-1000 ${
          visibleSections.has("contact") ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
        }`}
      >
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold mb-12 text-center bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
            Get In Touch
          </h2>

          <div className="grid md:grid-cols-2 gap-12">
            {/* Contact Info */}
            <div
              className={`space-y-6 transition-all duration-1000 delay-200 ${
                visibleSections.has("contact") ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-10"
              }`}
            >
              <div>
                <h3 className="text-xl font-semibold mb-4 text-blue-400">Let's Connect</h3>
                <p className="text-gray-300 mb-6">
                  I'm always interested in new opportunities and collaborations. Feel free to reach out if you'd like to
                  discuss projects, opportunities, or just say hello!
                </p>
              </div>

              <div className="space-y-4">
                <a
                  href="mailto:sushantpatil6217@gmail.com"
                  className="flex items-center gap-3 text-gray-300 hover:text-blue-400 transition-all duration-300 transform hover:translate-x-2"
                >
                  <Mail className="w-5 h-5" />
                  <span>sushantpatil6217@gmail.com</span>
                </a>
                <a
                  href="tel:+919975806217"
                  className="flex items-center gap-3 text-gray-300 hover:text-blue-400 transition-all duration-300 transform hover:translate-x-2"
                >
                  <Phone className="w-5 h-5" />
                  <span>+91 9975806217</span>
                </a>
                <div className="flex items-center gap-3 text-gray-300">
                  <MapPin className="w-5 h-5" />
                  <span>Kolhapur, Maharashtra</span>
                </div>
              </div>

              <div className="flex gap-4 pt-4">
                <a
                  href="https://linkedin.com/in/thesushpatil"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 bg-gray-700 rounded-full hover:bg-blue-600 transition-all duration-300 transform hover:scale-110 hover:shadow-lg hover:shadow-blue-500/25"
                >
                  <Linkedin className="w-5 h-5" />
                </a>
                <a
                  href="https://github.com/thesushpatil"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 bg-gray-700 rounded-full hover:bg-gray-600 transition-all duration-300 transform hover:scale-110 hover:shadow-lg"
                >
                  <Github className="w-5 h-5" />
                </a>
              </div>
            </div>

            {/* Contact Form */}
            <div
              className={`transition-all duration-1000 delay-400 ${
                visibleSections.has("contact") ? "opacity-100 translate-x-0" : "opacity-0 translate-x-10"
              }`}
            >
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-2">
                    Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 text-white placeholder-gray-400"
                    placeholder="Your Name"
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 text-white placeholder-gray-400"
                    placeholder="your.email@example.com"
                  />
                </div>

                <div>
                  <label htmlFor="subject" className="block text-sm font-medium text-gray-300 mb-2">
                    Subject
                  </label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 text-white placeholder-gray-400"
                    placeholder="What's this about?"
                  />
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-300 mb-2">
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    required
                    rows={5}
                    className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 text-white placeholder-gray-400 resize-none"
                    placeholder="Tell me about your project, opportunity, or just say hello!"
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-blue-800 text-white font-medium py-3 px-6 rounded-lg transition-all duration-300 flex items-center justify-center gap-2 transform hover:scale-105 hover:shadow-lg hover:shadow-blue-500/25"
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
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
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-4 border-t border-gray-800">
        <div className="max-w-6xl mx-auto text-center">
          <p className="text-gray-400">© 2025 Sushant Patil.Lots of ☕ and ❤️</p>
        </div>
      </footer>
    </div>
  )
}
