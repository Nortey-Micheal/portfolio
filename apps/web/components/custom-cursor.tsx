"use client"

import { motion, useMotionValue } from "framer-motion"
import { useEffect, useState } from "react"

export function CustomCursor() {
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      x.set(e.clientX)
      y.set(e.clientY)
      setIsVisible(true)
    }

    const handleMouseLeave = () => {
      setIsVisible(false)
    }

    window.addEventListener("mousemove", handleMouseMove)
    window.addEventListener("mouseleave", handleMouseLeave)

    return () => {
      window.removeEventListener("mousemove", handleMouseMove)
      window.removeEventListener("mouseleave", handleMouseLeave)
    }
  }, [x, y])

  return (
    <>
      {/* Main cursor dot */}
      <motion.div
        className="fixed z-50 w-2 h-2 bg-aqua rounded-full pointer-events-none"
        style={{
          x,
          y,
          translateX: "-50%",
          translateY: "-50%",
          opacity: isVisible ? 1 : 0,
        }}
        transition={{ duration: 0.1, type: "spring", stiffness: 500, damping: 28 }}
      />

      {/* Spotlight circle */}
      <motion.div
        className="fixed z-40 pointer-events-none"
        style={{
          x,
          y,
          translateX: "-50%",
          translateY: "-50%",
          width: "10px",
          height: "10px",
          borderRadius: "50%",
          border: "3px solid rgba(101, 216, 192, 0.4)",
          opacity: isVisible ? 1 : 0,
          boxShadow: "0 0 20px rgba(101, 216, 192, 0.3), inset 0 0 20px rgba(101, 216, 192, 0.2)",
        }}
        transition={{ duration: 0.2, type: "spring", stiffness: 400, damping: 30 }}
      />

      {/* Larger glow circle */}
      <motion.div
        className="fixed z-30 pointer-events-none"
        style={{
          x,
          y,
          translateX: "-50%",
          translateY: "-50%",
          width: "40px",
          height: "40px",
          borderRadius: "50%",
          border: "2px solid rgba(101, 216, 192, 0.15)",
          opacity: isVisible ? 0.5 : 0,
          background: "radial-gradient(circle, rgba(101, 216, 192, 0.1) 50%, transparent 70%)",
        }}
        transition={{ duration: 0.3, type: "spring", stiffness: 300, damping: 35 }}
      />
    </>
  )
}
