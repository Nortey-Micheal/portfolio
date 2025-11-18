"use client"

import type React from "react"

import { motion, useMotionTemplate, useMotionValue } from "framer-motion"
import { ExternalLink, Github, ChevronLeft, ChevronRight } from "lucide-react"
import { useState, useEffect, useRef } from "react"
import { Project } from "@/src/sanity/types"
import { urlFor } from "@/src/sanity/image"


function ProjectCard({ project, index, isFocused,isMobile }: { project: Project; index: number, isFocused:boolean, isMobile:boolean }) {
  const [isHovered, setIsHovered] = useState(false)
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)

  const handleMouseMove = (e: React.MouseEvent) => {
    const rect = e.currentTarget.getBoundingClientRect()
    mouseX.set(e.clientX - rect.left)
    mouseY.set(e.clientY - rect.top)
  }

  const imageUrl = project?.image
  ? urlFor(project?.image)
      .height(310)
      .width(550)
      .quality(80)
      .auto("format")
      .url()
  : `https://placehold.co/550/png`;

  const background = useMotionTemplate`
    radial-linear(
      250px circle at ${mouseX}px ${mouseY}px,
      rgba(101, 216, 192, 0.1),
      transparent 80%
    )
  `

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onMouseMove={handleMouseMove}
      className={` group relative h-full ${
      isFocused ? 'border-aqua/60' : 'border-teal/20'} 
      p-${isMobile ? '2' : '3'} ${isMobile ? 'min-h-72' : 'min-h-80'} 
    `}
    >
      {/* Card container */}
      <div className="relative h-full rounded-lg overflow-hidden border border-teal/30 bg-background transition-all duration-300">
        <motion.div style={{ background }} className="absolute inset-0 pointer-events-none" />

        {/* Project image section */}
        <div className="relative h-48 overflow-hidden bg-background">
          <motion.img
            src={imageUrl || "/placeholder.svg"}
            alt={project?.title}
            className="w-full h-full object-cover"
            animate={{ scale: isHovered ? 1.1 : 1 }}
            transition={{ duration: 0.3 }}
          />
          <div className="absolute inset-0 bg-linear-to-t from-background via-transparent to-transparent opacity-70" />

          <motion.div
            animate={{
              boxShadow: isHovered
                ? [
                    "0 0 10px rgba(101, 216, 192, 0.4)",
                    "0 0 20px rgba(101, 216, 192, 0.8)",
                    "0 0 10px rgba(101, 216, 192, 0.4)",
                  ]
                : "0 0 10px rgba(101, 216, 192, 0.2)",
            }}
            transition={{ duration: 1.5, repeat: isHovered ? Number.POSITIVE_INFINITY : 0 }}
            className={`absolute top-4 right-4 px-3 py-1 rounded-full text-xs font-mono border ${
              project?.status === "Live"
                ? "bg-teal/20 text-teal border-teal/50"
                : project?.status === "Beta"
                  ? "bg-aqua/20 text-aqua border-aqua/50"
                  : "bg-foreground/10 text-foreground border-foreground/30"
            }`}
          >
            {project?.status}
          </motion.div>
        </div>

        {/* Project info */}
        <div className="p-6 flex flex-col grow relative z-10">
          <motion.h3
            className="text-xl font-bold text-aqua mb-2 font-mono"
            animate={{ color: isHovered ? "#e0ffff" : "#c0ffff" }}
          >
            {`<project name="${project?.title}" />`}
          </motion.h3>

          <p className="text-foreground/70 text-sm mb-4 grow leading-relaxed">{project?.description}</p>

          {/* Tech stack */}
          <div className="flex flex-wrap gap-2 mb-4">
            {project?.tech?.map((tech) => (
              <motion.span
                key={tech}
                className="px-3 py-1 text-xs rounded-full bg-teal/10 text-teal border border-teal/30 font-mono"
                whileHover={{ scale: 1.05, backgroundColor: "rgba(101, 216, 192, 0.2)" }}
                transition={{ duration: 0.2 }}
              >
                {tech}
              </motion.span>
            ))}
          </div>

          {/* Links */}
          <div className="flex gap-3 pt-4 border-t border-teal/20">
            <motion.a
              href={project?.live}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-sm text-aqua hover:text-teal transition-colors group/link font-mono"
              whileHover={{ x: 4 }}
            >
              <ExternalLink className="w-4 h-4" />
              <span>Demo</span>
            </motion.a>

            <motion.div
              className="w-1 h-5 bg-linear-to-b from-teal to-aqua opacity-50"
              animate={{ opacity: [0.3, 0.7, 0.3] }}
              transition={{ duration: 1.5, repeat: Number.POSITIVE_INFINITY }}
            />

            <motion.a
              href={project?.github}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-sm text-aqua hover:text-teal transition-colors group/link font-mono"
              whileHover={{ x: 4 }}
            >
              <Github className="w-4 h-4" />
              <span>Code</span>
            </motion.a>
          </div>
        </div>

        {/* Border glow on hover */}
        <motion.div
          className="absolute inset-0 rounded-lg pointer-events-none"
          animate={{
            boxShadow: isHovered
              ? "inset 0 0 20px rgba(101, 216, 192, 0.2), 0 0 20px rgba(101, 216, 192, 0.3)"
              : "inset 0 0 10px rgba(101, 216, 192, 0.1), 0 0 10px rgba(101, 216, 192, 0.1)",
          }}
          transition={{ duration: 0.3 }}
        />
      </div>
    </motion.div>
  )
}

export function Projects({ projects }: { projects: Project[] }) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isHovered, setIsHovered] = useState(false)
  const [isLoading, setIsLoading] = useState(true) // add loading state
  const containerRef = useRef<HTMLDivElement>(null)
  const scrollContainerRef = useRef<HTMLDivElement>(null)
  const intervalRef = useRef<NodeJS.Timeout | null>(null)
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768)
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  useEffect(() => {
    if (projects && projects.length > 0) {
      setIsLoading(false)
    }
  }, [projects])

  const startAutoSlide = () => {
    if (intervalRef.current) clearInterval(intervalRef.current)
    if (isHovered || isMobile) return
    
    intervalRef.current = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % projects.length)
    }, 8000)
  }

  useEffect(() => {
    if (!projects || projects.length === 0) return
    startAutoSlide()

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current)
    }
  }, [projects.length, isHovered, isMobile])

  const handlePaginate = (newDirection: number) => {
    setCurrentIndex(
      (prev) => (prev + newDirection + projects.length) % projects.length
    )
    startAutoSlide()
  }

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') handlePaginate(-1)
      if (e.key === 'ArrowRight') handlePaginate(1)
    }

    const handleWheel = (e: WheelEvent) => {
      if (!scrollContainerRef.current?.contains(e.target as Node)) return
      e.preventDefault()
      
      if (Math.abs(e.deltaX) > Math.abs(e.deltaY)) {
        // Horizontal scroll
        if (e.deltaX > 0) handlePaginate(1)
        else handlePaginate(-1)
      } else {
        // Vertical scroll (on mobile, treat as horizontal)
        if (e.deltaY > 0) handlePaginate(1)
        else handlePaginate(-1)
      }
    }

    let touchStartX = 0
    const handleTouchStart = (e: TouchEvent) => {
      touchStartX = e.touches[0].clientX
    }

    const handleTouchEnd = (e: TouchEvent) => {
      const touchEndX = e.changedTouches[0].clientX
      const diff = touchStartX - touchEndX
      
      if (Math.abs(diff) > 50) {
        if (diff > 0) handlePaginate(1)
        else handlePaginate(-1)
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    scrollContainerRef.current?.addEventListener('wheel', handleWheel, { passive: false })
    scrollContainerRef.current?.addEventListener('touchstart', handleTouchStart)
    scrollContainerRef.current?.addEventListener('touchend', handleTouchEnd)

    return () => {
      window.removeEventListener('keydown', handleKeyDown)
      scrollContainerRef.current?.removeEventListener('wheel', handleWheel)
      scrollContainerRef.current?.removeEventListener('touchstart', handleTouchStart)
      scrollContainerRef.current?.removeEventListener('touchend', handleTouchEnd)
    }
  }, [currentIndex, projects.length])

  const getVisibleItems = () => {
    if (!projects || projects.length === 0) return [0, 0, 0]
    
    const items = []
    for (let i = -1; i <= 1; i++) {
      items.push((currentIndex + i + projects.length) % projects.length)
    }
    return items
  }

  const visibleIndices = getVisibleItems()

  if (isLoading) {
    return (
      <section id="projects" className={`flex items-center justify-center px-6 relative overflow-hidden ${
        isMobile ? 'min-h-screen' : 'min-h-screen py-20'
      }`}>
        <div className={`w-full relative z-10 ${isMobile ? 'fixed bottom-0 left-0 right-0 px-6 py-12 bg-linear-to-t from-background via-background to-transparent' : 'max-w-6xl mx-auto'}`}>
          <motion.div 
            variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { duration: 0.6 } } }} 
            className="mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-2">
              <span className="text-teal">&lt;projects&gt;</span>
            </h2>
            <div className="h-1 w-20 bg-linear-to-r from-teal to-aqua" />
          </motion.div>

          <div className="relative w-full">
            <div className={`flex items-center ${isMobile ? 'gap-3 justify-center' : 'gap-4 md:gap-6 justify-center'}`}>
              {!isMobile && <div className="shrink-0 p-2 rounded-full border border-teal/30 bg-teal/10 h-10 w-10" />}
              
              <div className={`flex gap-${isMobile ? '3' : '4'} md:gap-6 flex-1 justify-center`}>
                {[0, 1, 2].map((idx) => (
                  <div
                    key={idx}
                    className={`transition-all duration-300 ${
                      idx === 1 ? `flex-1 ${isMobile ? 'max-w-sm' : 'max-w-xl'}` : `flex-1 ${isMobile ? 'max-w-xs' : 'max-w-xs'}`
                    }`}
                  >
                    <div className={`bg-card rounded-lg border border-teal/20 p-${isMobile ? '6' : '8'} ${isMobile ? 'min-h-72' : 'min-h-80'} animate-pulse`} />
                  </div>
                ))}
              </div>

              {!isMobile && <div className="shrink-0 p-2 rounded-full border border-teal/30 bg-teal/10 h-10 w-10" />}
            </div>

            <div className="flex flex-col items-center gap-4 mt-8">
              <div className="flex justify-center gap-2">
                {[0, 1, 2, 3, 4].map((idx) => (
                  <div key={idx} className={`h-2 rounded-full bg-teal/20 ${idx === 2 ? 'w-8' : 'w-2'} animate-pulse`} />
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section id="projects" className={`flex items-center justify-center px-6 relative overflow-hidden ${
      isMobile ? 'min-h-screen' : 'min-h-screen py-20'
    }`}>
      <motion.div
        variants={{ hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: 0.1 } } }}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.1 }}
        className={`w-full relative z-10 ${isMobile ? 'fixed bottom-0 left-0 right-0 bg-linear-to-t from-background via-background to-transparent' : 'max-w-6xl mx-auto'}`}
      >
        <>
          {/* Header - hidden on mobile */}
          <motion.div 
            variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { duration: 0.6 } } }} 
            className="mb-5 lg:mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-2">
              <span className="text-teal">&lt;projects&gt;</span>
            </h2>
            <div className="h-1 w-20 bg-linear-to-r from-teal to-aqua" />
          </motion.div>
        </>

        <div 
          className="relative w-full"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => {
            setIsHovered(false)
            startAutoSlide()
          }}
          ref={containerRef}
        >
          {/* Items Container - Horizontal chain layout */}
          <div 
            className={`flex items-center ${isMobile ? 'gap-3 justify-center' : 'gap-4 md:gap-6 justify-center'}`}
            ref={scrollContainerRef}
          >
            {/* Navigation Arrows - hidden on mobile */}
            {
              !isMobile && <>
              <button
                onClick={() => handlePaginate(-1)}
                className="shrink-0 p-2 rounded-full border border-teal/30 hover:border-aqua bg-teal/10 hover:bg-aqua/10 transition-all duration-300 group focus:outline-none focus:ring-2 focus:ring-aqua"
                aria-label="Previous project"
              >
                <ChevronLeft className="w-6 h-6 text-aqua group-hover:text-teal transition-colors" />
              </button>
            </>
            }

            <div className={`flex flex-col lg:flex-row h-[500px] lg:h-[700px] overflow-hidden gap-${isMobile ? '3' : '4'} md:gap-6 flex-1 justify-center`}>
              {visibleIndices.map((idx, position) => (
                <motion.div
                  key={idx}
                  layoutId={`card-${idx}`}
                  className={`transition-all duration-300 ${
                    position === 1 ? `flex-1 ${isMobile ? 'max-w-sm' : 'max-w-xl'}` : `flex-1 ${isMobile ? 'max-w-xs' : 'max-w-xs'} opacity-60 hover:opacity-75`
                  }`}
                  onClick={() => {
                    if (position !== 1) {
                      const newIndex = position === 0 ? -1 : 1
                      handlePaginate(newIndex)
                    }
                  }}
                  style={{ cursor: position !== 1 ? 'pointer' : 'default' }}
                >
                  <motion.div
                    animate={{
                      scale: position === 1 ? 1 : 0.85,
                      y: 0,
                    }}
                    transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                  >
                    <ProjectCard 
                      project={projects[idx]} 
                      index={idx} 
                      isFocused={position === 1}
                      isMobile={isMobile}
                    />
                  </motion.div>
                </motion.div>
              ))}
            </div>

            {/* Right Arrow - hidden on mobile */}
            {!isMobile && (
              <button
                onClick={() => handlePaginate(1)}
                className="shrink-0 p-2 rounded-full border border-teal/30 hover:border-aqua bg-teal/10 hover:bg-aqua/10 transition-all duration-300 group focus:outline-none focus:ring-2 focus:ring-aqua"
                aria-label="Next project"
              >
                <ChevronRight className="w-6 h-6 text-aqua group-hover:text-teal transition-colors" />
              </button>
            )}
          </div>

          <div className={`pt-5 w-screen flex justify-center items-center gap-5 ${!isMobile && 'hidden'}`}>
            <button
              onClick={() => handlePaginate(-1)}
              className="shrink-0 p-2 rounded-full border border-teal/30 hover:border-aqua bg-teal/10 hover:bg-aqua/10 transition-all duration-300 group focus:outline-none focus:ring-2 focus:ring-aqua"
              aria-label="Previous project"
            >
              <ChevronLeft className="w-6 h-6 text-aqua group-hover:text-teal transition-colors" />
            </button>
            <button
                onClick={() => handlePaginate(1)}
                className="shrink-0 p-2 rounded-full border border-teal/30 hover:border-aqua bg-teal/10 hover:bg-aqua/10 transition-all duration-300 group focus:outline-none focus:ring-2 focus:ring-aqua"
                aria-label="Next project"
              >
                <ChevronRight className="w-6 h-6 text-aqua group-hover:text-teal transition-colors" />
              </button>
          </div>

          {/* Indicators & Info */}
          <div className="flex flex-col items-center gap-4 mt-8">
            {/* Progress Dots */}
            <div className="flex justify-center gap-2">
              {projects.map((_, idx) => (
                <motion.button
                  key={idx}
                  onClick={() => {
                    setCurrentIndex(idx)
                    startAutoSlide()
                  }}
                  className={`h-2 rounded-full transition-all duration-300 ${
                    idx === currentIndex ? "bg-aqua w-8" : "bg-teal/30 w-2 hover:bg-teal/50"
                  }`}
                  whileHover={{ scale: 1.2 }}
                  whileTap={{ scale: 0.95 }}
                  aria-label={`Go to project ${idx + 1}`}
                  aria-current={idx === currentIndex ? "true" : "false"}
                />
              ))}
            </div>
            
            {/* Project Title & Counter */}
            <div className="text-center">
              <p className="text-aqua font-mono text-sm">{projects[currentIndex]?.title}</p>
              <p className="text-teal/60 font-mono text-xs">
                {currentIndex + 1} / {projects.length}
              </p>
            </div>

            {isHovered && (
              <motion.p 
                initial={{ opacity: 0 }} 
                animate={{ opacity: 1 }} 
                className="text-teal/40 font-mono text-xs"
              >
                ⏸ Paused
              </motion.p>
            )}
          </div>

          {isMobile && (
            <div className="flex flex-col items-center gap-3 mt-6">
              {/* Mobile Indicators */}
              <div className="flex justify-center gap-1.5">
                {projects.map((_, idx) => (
                  <motion.button
                    key={idx}
                    onClick={() => setCurrentIndex(idx)}
                    className={`h-1.5 rounded-full transition-all duration-300 ${
                      idx === currentIndex ? "bg-aqua w-6" : "bg-teal/30 w-1.5"
                    }`}
                    aria-label={`Go to project ${idx + 1}`}
                    aria-current={idx === currentIndex ? "true" : "false"}
                  />
                ))}
              </div>
              
              {/* Mobile Title */}
              <p className="text-aqua font-mono text-xs">{projects[currentIndex]?.title}</p>
            </div>
          )}
        </div>

        {!isMobile && (
          <motion.div 
            variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { duration: 0.6 } } }} 
            className="text-teal/50 font-mono text-sm mt-16"
          >
            {"</projects>"}
          </motion.div>
        )}
      </motion.div>
    </section>
  )
}
