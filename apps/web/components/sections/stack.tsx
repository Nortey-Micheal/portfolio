"use client"

import { motion } from "framer-motion"
import { useState } from "react"

const stackCategories = [
  {
    name: "Frontend",
    skills: [
      { name: "React", icon: "⚛️" },
      { name: "Next.js", icon: "▲" },
      { name: "Tailwind CSS", icon: "🎨" },
      { name: "TypeScript", icon: "📘" },
      { name: "Framer Motion", icon: "✨" },
    ],
  },
  {
    name: "Backend",
    skills: [
      { name: "Node.js", icon: "🟢" },
      { name: "MongoDB", icon: "🍃" },
      { name: "Express", icon: "⚡" },
      { name: "PostgreSQL", icon: "🐘" },
      { name: "REST APIs", icon: "🔌" },
    ],
  },
  {
    name: "Tools",
    skills: [
      { name: "Git", icon: "📚" },
      { name: "VS Code", icon: "💻" },
      { name: "Docker", icon: "🐳" },
      { name: "Vercel", icon: "▲" },
      { name: "AWS", icon: "☁️" },
    ],
  },
]

// Code snippets for background
const codeSnippets = [
  "const app = express();",
  "function* generator() {}",
  "await fetch('/api/data');",
  "interface User { id: string; }",
  "type Props = { children: React.ReactNode }",
  "export default function Component() {}",
  "const [state, setState] = useState(null);",
  "useEffect(() => { return cleanup; }, []);",
]

export function Stack() {
  const [hoveredSkill, setHoveredSkill] = useState<string | null>(null)

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.03,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 },
    },
  }

  return (
    <section
      id="stack"
      className="min-h-screen flex items-center justify-center py-20 px-6 bg-gradient-to-b from-steel/30 to-deep relative overflow-hidden"
    >
      <div className="absolute inset-0 opacity-10 pointer-events-none text-teal/30 font-mono text-xs overflow-hidden">
        {[...Array(20)].map((_, i) => (
          <div key={i} className="whitespace-nowrap">
            {codeSnippets[i % codeSnippets.length]}
          </div>
        ))}
      </div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        className="max-w-6xl mx-auto w-full relative z-10"
      >
        {/* Section header */}
        <motion.div variants={itemVariants} className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-2">
            <span className="text-aqua">&lt;stack&gt;</span>
          </h2>
          <p className="text-foreground/60">Technologies and tools I work with</p>
        </motion.div>

        {/* Carousels for each category */}
        <div className="space-y-12">
          {stackCategories.map((category) => {
            const isReverse = category.name === "Backend"
            const duration = 30

            return (
              <motion.div key={category.name} variants={itemVariants} className="space-y-4">
                <h3 className="text-xl font-bold text-teal flex items-center gap-2">
                  <span className="text-aqua">#</span> {category.name}
                </h3>

                <div className="relative h-24 overflow-hidden rounded-lg bg-teal/5">
                  <motion.div
                    className="flex gap-4 h-full"
                    animate={{
                      x: isReverse ? [0, -1440] : [-1440, 0],
                    }}
                    transition={{
                      duration: duration,
                      repeat: Number.POSITIVE_INFINITY,
                      ease: "linear",
                      repeatType: "loop",
                    }}
                  >
                    {[...Array(6)].map((_, setIdx) =>
                      category.skills.map((skill, idx) => (
                        <div
                          key={`${setIdx}-${idx}`}
                          className="flex-shrink-0 p-4 rounded-lg bg-teal/5 hover:bg-aqua/10 transition-all duration-300 cursor-pointer min-w-max flex items-center gap-3"
                          onMouseEnter={() => setHoveredSkill(skill.name)}
                          onMouseLeave={() => setHoveredSkill(null)}
                        >
                          <span className="text-2xl">{skill.icon}</span>
                          <span className="font-medium text-foreground whitespace-nowrap">{skill.name}</span>
                        </div>
                      )),
                    )}
                  </motion.div>

                  {/* Gradient overlays */}
                  <div className="absolute inset-y-0 left-0 w-12 bg-gradient-to-r from-steel via-steel/50 to-transparent pointer-events-none" />
                  <div className="absolute inset-y-0 right-0 w-12 bg-gradient-to-l from-steel via-steel/50 to-transparent pointer-events-none" />
                </div>
              </motion.div>
            )
          })}
        </div>

        {/* Closing tag */}
        <motion.div variants={itemVariants} className="text-teal/50 font-mono text-sm text-center mt-16">
          {"</stack>"}
        </motion.div>
      </motion.div>
    </section>
  )
}
