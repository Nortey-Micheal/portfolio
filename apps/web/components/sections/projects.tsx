"use client"

import type React from "react"

import { motion, useMotionTemplate, useMotionValue } from "framer-motion"
import { ExternalLink, Github, ChevronLeft, ChevronRight } from "lucide-react"
import { useState, useEffect } from "react"

const projects = [
  {
    name: "TutorLink",
    description:
      "A comprehensive tutoring platform connecting students with qualified educators. Features real-time messaging, video calls, and progress tracking.",
    tech: ["React", "Node.js", "MongoDB", "Socket.io"],
    live: "https://example.com",
    github: "https://github.com",
    image: "/placeholder.svg?key=proj1",
    status: "Live",
  },
  {
    name: "TaskFlow",
    description:
      "Collaborative project management tool with real-time updates, team workspaces, and intelligent task automation using AI insights.",
    tech: ["Next.js", "PostgreSQL", "Tailwind CSS", "Vercel"],
    live: "https://example.com",
    github: "https://github.com",
    image: "/placeholder.svg?key=proj2",
    status: "Live",
  },
  {
    name: "Code Analytics",
    description:
      "Developer analytics dashboard providing insights into repository health, code quality metrics, and team productivity trends.",
    tech: ["Next.js", "GraphQL", "PostgreSQL", "D3.js"],
    live: "https://example.com",
    github: "https://github.com",
    image: "/placeholder.svg?key=proj3",
    status: "Maintained",
  },
  {
    name: "MindNote",
    description:
      "Intelligent note-taking app with markdown support, AI-powered tagging, and secure cloud sync across all devices.",
    tech: ["React Native", "Firebase", "TypeScript", "AWS"],
    live: "https://example.com",
    github: "https://github.com",
    image: "/placeholder.svg?key=proj4",
    status: "Beta",
  },
]

function ProjectCard({ project, index }: { project: (typeof projects)[0]; index: number }) {
  const [isHovered, setIsHovered] = useState(false)
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)

  const handleMouseMove = (e: React.MouseEvent) => {
    const rect = e.currentTarget.getBoundingClientRect()
    mouseX.set(e.clientX - rect.left)
    mouseY.set(e.clientY - rect.top)
  }

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
      className="group relative h-full"
    >
      {/* Card container */}
      <div className="relative h-full rounded-lg overflow-hidden border border-teal/30 bg-background transition-all duration-300">
        <motion.div style={{ background }} className="absolute inset-0 pointer-events-none" />

        {/* Project image section */}
        <div className="relative h-48 overflow-hidden bg-background">
          <motion.img
            src={project.image || "/placeholder.svg"}
            alt={project.name}
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
              project.status === "Live"
                ? "bg-teal/20 text-teal border-teal/50"
                : project.status === "Beta"
                  ? "bg-aqua/20 text-aqua border-aqua/50"
                  : "bg-foreground/10 text-foreground border-foreground/30"
            }`}
          >
            {project.status}
          </motion.div>
        </div>

        {/* Project info */}
        <div className="p-6 flex flex-col grow relative z-10">
          <motion.h3
            className="text-xl font-bold text-aqua mb-2 font-mono"
            animate={{ color: isHovered ? "#e0ffff" : "#c0ffff" }}
          >
            {`<project name="${project.name}" />`}
          </motion.h3>

          <p className="text-foreground/70 text-sm mb-4 grow leading-relaxed">{project.description}</p>

          {/* Tech stack */}
          <div className="flex flex-wrap gap-2 mb-4">
            {project.tech.map((tech) => (
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
              href={project.live}
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
              href={project.github}
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

export function Projects() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [direction, setDirection] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % projects.length)
      setDirection(1)
    }, 8000) // Faster than stacks - 8s vs 20s
    return () => clearInterval(interval)
  }, [])

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 },
    },
  }

  const slideVariants = {
    enter: (dir: number) => ({
      x: dir > 0 ? 1000 : -1000,
      opacity: 0,
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1,
    },
    exit: (dir: number) => ({
      zIndex: 0,
      x: dir < 0 ? 1000 : -1000,
      opacity: 0,
    }),
  }

  const paginate = (newDirection: number) => {
    setDirection(newDirection)
    setCurrentIndex((prev) => (prev + newDirection + projects.length) % projects.length)
  }

  return (
    <section
      id="projects"
      className="min-h-screen flex items-center justify-center py-20 px-6 bg-background relative overflow-hidden"
    >
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.1 }}
        className="max-w-5xl mx-auto w-full relative z-10"
      >
        {/* Section header */}
        <motion.div variants={itemVariants} className="mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-2">
            <span className="text-teal">&lt;projects&gt;</span>
          </h2>
          <div className="h-1 w-20 bg-linear-to-r from-teal to-aqua" />
        </motion.div>

        {/* Projects carousel */}
        <div className="relative w-full lg:w-1/2 lg:mx-auto">
          <motion.div
            key={currentIndex}
            custom={direction}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{
              x: { type: "spring", stiffness: 300, damping: 30 },
              opacity: { duration: 0.2 },
            }}
            className="w-full"
          >
            <ProjectCard project={projects[currentIndex]} index={currentIndex} />
          </motion.div>

          {/* Navigation buttons */}
          <button
            onClick={() => paginate(-1)}
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-12 md:-translate-x-16 z-20 p-2 rounded-full border border-teal/30 hover:border-aqua bg-teal/10 hover:bg-aqua/10 transition-all duration-300 group"
          >
            <ChevronLeft className="w-6 h-6 text-aqua group-hover:text-teal transition-colors" />
          </button>

          <button
            onClick={() => paginate(1)}
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-12 md:translate-x-16 z-20 p-2 rounded-full border border-teal/30 hover:border-aqua bg-teal/10 hover:bg-aqua/10 transition-all duration-300 group"
          >
            <ChevronRight className="w-6 h-6 text-aqua group-hover:text-teal transition-colors" />
          </button>

          <div className="flex flex-col items-center gap-4 mt-8">
            <div className="flex justify-center gap-2">
              {projects.map((project, idx) => (
                <motion.button
                  key={idx}
                  onClick={() => {
                    setDirection(idx > currentIndex ? 1 : -1)
                    setCurrentIndex(idx)
                  }}
                  className={`h-2 rounded-full transition-all duration-300 ${
                    idx === currentIndex ? "bg-aqua w-8" : "bg-teal/30 w-2 hover:bg-teal/50"
                  }`}
                  whileHover={{ scale: 1.2 }}
                  aria-label={`Go to project ${idx + 1}: ${project.name}`}
                />
              ))}
            </div>
            {/* Project name and counter display */}
            <div className="text-center">
              <p className="text-aqua font-mono text-sm">{projects[currentIndex].name}</p>
              <p className="text-teal/60 font-mono text-xs">
                {currentIndex + 1} / {projects.length}
              </p>
            </div>
          </div>
        </div>

        {/* Closing tag */}
        <motion.div variants={itemVariants} className="text-teal/50 font-mono text-sm mt-16">
          {"</projects>"}
        </motion.div>
      </motion.div>
    </section>
  )
}
