"use client"

import { motion } from "framer-motion"
import { ArrowDown, Terminal } from "lucide-react"
import { useEffect, useState } from "react"

export function Hero() {
  const [displayText, setDisplayText] = useState("")
  const fullText = "> Initializing Portfolio...\n> Loading: Nortey Michael [Full Stack Developer]\n> Status: Online ✓"

  useEffect(() => {
    let index = 0
    const interval = setInterval(() => {
      if (index < fullText.length) {
        setDisplayText(fullText.slice(0, index + 1))
        index++
      } else {
        clearInterval(interval)
      }
    }, 50)
    return () => clearInterval(interval)
  }, [])

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: "easeOut" },
    },
  }

  return (
    <section className="min-h-screen flex items-center justify-center pt-20 px-6 relative overflow-hidden bg-background code-matrix">
      <div className="absolute inset-0 opacity-5 pointer-events-none" />

      {/* Floating particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-teal rounded-full"
            initial={{
              x: Math.random() * window.innerWidth,
              y: Math.random() * window.innerHeight,
              opacity: Math.random() * 0.5,
            }}
            animate={{
              y: [0, -100],
              opacity: [0, 1, 0],
            }}
            transition={{
              duration: Math.random() * 3 + 4,
              repeat: Number.POSITIVE_INFINITY,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="max-w-4xl mx-auto z-10 relative w-full"
      >
        {/* Terminal window frame */}
        <motion.div
          // variants={itemVariants}
          className="relative border border-teal/40 rounded-lg overflow-hidden backdrop-blur-md"
          style={{
            background: "rgba(21, 38, 54, 0.4)",
          }}
        >
          {/* Terminal header */}
          <div className="bg-background/80 border-b border-teal/30 px-4 py-3 flex items-center gap-2">
            <Terminal className="w-4 h-4 text-teal" />
            <span className="text-sm font-mono text-teal">portfolio.dev</span>
            <div className="ml-auto flex gap-2">
              <div className="w-3 h-3 rounded-full bg-yellow-500/60" />
              <div className="w-3 h-3 rounded-full bg-orange-500/60" />
              <div className="w-3 h-3 rounded-full bg-red-500/60" />
            </div>
          </div>

          {/* Terminal content */}
          <div className="p-8 min-h-96 flex flex-col justify-center bg-linear-to-b from-background via-background to-background/95">
            {/* Typing animation text */}
            <div className="font-mono text-sm text-teal space-y-2 mb-8 leading-relaxed">
              {displayText.split("\n").map((line, i) => (
                <div key={i} className="flex items-start">
                  <span className="text-aqua mr-2">$</span>
                  <span>{line}</span>
                  {i === displayText.split("\n").length - 1 && displayText.length < fullText.length && (
                    <span className="cursor-blink text-aqua ml-1">_</span>
                  )}
                </div>
              ))}
            </div>

            {/* Main title - appears after typing completes */}
            {displayText.length >= fullText.length && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="space-y-6"
              >
                <h1 className="text-5xl md:text-7xl font-bold text-aqua leading-tight">
                  I Build <span className="font-[Sansita] italic ">Digital Experiences</span>
                </h1>

                <p className="text-lg md:text-xl text-foreground/80 max-w-2xl leading-relaxed">
                  Full-stack developer crafting immersive web applications with modern technologies. Specializing in
                  React, Next.js, and cloud-native architectures.
                </p>

                {/* CTA Buttons */}
                <div className="flex flex-col sm:flex-row gap-4 pt-6">
                  <motion.a
                    href="#projects"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="px-8 py-4 rounded-lg bg-aqua text-backgroun font-semibold hover:glow-aqua transition-al duration-300 border border-teal inline-block text-center"
                  >
                    Run Project <span className="text-xs ml-2">&gt;</span>
                  </motion.a>
                  <motion.a
                    href="#contact"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="px-8 py-4 rounded-lg border-2 border-teal text-teal font-semibold hover:bg-teal/10 transition-all duration-300 inline-block text-center"
                  >
                    Connect <span className="text-xs ml-2">--help</span>
                  </motion.a>
                </div>
              </motion.div>
            )}
          </div>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          animate={{ y: [0, 12, 0] }}
          transition={{ duration: 2.5, repeat: Number.POSITIVE_INFINITY }}
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-teal"
        >
          <ArrowDown className="w-6 h-6" />
        </motion.div>
      </motion.div>
    </section>
  )
}
