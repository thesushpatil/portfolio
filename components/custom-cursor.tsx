"use client"

import React, { useEffect, useState, useRef } from "react"

export default function CustomCursor() {
  const [position, setPosition] = useState({ x: 0, y: 0 })
  const [trail, setTrail] = useState({ x: 0, y: 0 })
  const [hovered, setHovered] = useState(false)
  const [clicked, setClicked] = useState(false)
  const [hidden, setHidden] = useState(true)

  const trailRef = useRef({ x: 0, y: 0 })

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY })
      setHidden(false)
    }

    const handleMouseEnter = () => setHidden(false)
    const handleMouseLeave = () => setHidden(true)

    const handleMouseDown = () => setClicked(true)
    const handleMouseUp = () => setClicked(false)

    const handleLinkHoverStart = () => setHovered(true)
    const handleLinkHoverEnd = () => setHovered(false)

    window.addEventListener("mousemove", handleMouseMove)
    document.addEventListener("mouseenter", handleMouseEnter)
    document.addEventListener("mouseleave", handleMouseLeave)
    window.addEventListener("mousedown", handleMouseDown)
    window.addEventListener("mouseup", handleMouseUp)

    // Find and attach listeners to interactive elements
    const updateHoverListeners = () => {
      const interactives = document.querySelectorAll(
        "a, button, input, textarea, select, [role='button'], .skill-tag, .interactive-item"
      )
      interactives.forEach((el) => {
        el.addEventListener("mouseenter", handleLinkHoverStart)
        el.addEventListener("mouseleave", handleLinkHoverEnd)
      })
    }

    // Set up MutationObserver to attach to dynamically rendered/modified elements
    const observer = new MutationObserver(updateHoverListeners)
    observer.observe(document.body, { childList: true, subtree: true })

    updateHoverListeners()

    return () => {
      window.removeEventListener("mousemove", handleMouseMove)
      document.removeEventListener("mouseenter", handleMouseEnter)
      document.removeEventListener("mouseleave", handleMouseLeave)
      window.removeEventListener("mousedown", handleMouseDown)
      window.removeEventListener("mouseup", handleMouseUp)
      observer.disconnect()
    }
  }, [])

  // Trail smooth interpolation (lerp)
  useEffect(() => {
    let animationFrameId: number

    const updateTrail = () => {
      trailRef.current.x += (position.x - trailRef.current.x) * 0.16
      trailRef.current.y += (position.y - trailRef.current.y) * 0.16
      setTrail({ x: trailRef.current.x, y: trailRef.current.y })
      animationFrameId = requestAnimationFrame(updateTrail)
    }

    animationFrameId = requestAnimationFrame(updateTrail)
    return () => cancelAnimationFrame(animationFrameId)
  }, [position])

  if (hidden) return null

  return (
    <>
      {/* Outer Ring */}
      <div
        className={`fixed pointer-events-none z-[9999] -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/70 transition-transform duration-200 ease-out mix-blend-difference hidden md:block ${
          hovered ? "w-12 h-12 bg-white/10 scale-100" : "w-6 h-6 scale-100"
        } ${clicked ? "scale-75 border-white/40" : ""}`}
        style={{
          left: `${trail.x}px`,
          top: `${trail.y}px`,
        }}
      />
      {/* Inner Dot */}
      <div
        className={`fixed pointer-events-none z-[9999] -translate-x-1/2 -translate-y-1/2 rounded-full bg-white transition-transform duration-100 ease-out mix-blend-difference hidden md:block ${
          hovered ? "w-2 h-2 scale-0" : "w-1 h-1 scale-100"
        }`}
        style={{
          left: `${position.x}px`,
          top: `${position.y}px`,
        }}
      />
    </>
  )
}
