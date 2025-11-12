"use client"

import { motion, useScroll, useTransform } from "framer-motion"
import Image from "next/image"
import { useRef } from "react"

export function About() {
  const containerRef = useRef(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "end center"],
  })

  const imageY = useTransform(scrollYProgress, [0, 1], [100, -100])
  const textY = useTransform(scrollYProgress, [0, 1], [50, -50])
  const borderOpacity = useTransform(scrollYProgress, [0, 1], [0.3, 0.8])

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.6 },
    },
  }

  return (
    <section
      id="about"
      ref={containerRef}
      className="min-h-screen flex items-center justify-center py-20 px-6 bg-background relative overflow-hidden"
    >
      <motion.div
        style={{ y: useTransform(scrollYProgress, [0, 1], [0, 150]) }}
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
      >
        <div className="absolute inset-0 bg-[linear-linear(90deg,#65d8c0_1px,transparent_1px),linear-linear(#65d8c0_1px,transparent_1px)] bg-[size:100px_100px]" />
      </motion.div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        className="max-w-5xl mx-auto relative z-10"
      >
        {/* Section header */}
        <motion.div variants={itemVariants} className="mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-2">
            <span className="text-aqua">&lt;about-me&gt;</span>
          </h2>
          <motion.div
            style={{ scaleX: scrollYProgress }}
            className="h-1 bg-linear-to-r from-teal to-aqua origin-left"
          />
        </motion.div>

        {/* Content grid */}
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Left: Image with parallax and tilt */}
          <motion.div variants={itemVariants} style={{ y: imageY }} className="relative group">
            <motion.div
              className="relative aspect-square rounded-lg overflow-hidden border-2 border-teal/50 bg-background"
              style={{
                background: "rgba(21, 38, 54, 0.4)",
                backdropFilter: "blur(10px)",
                // borderOpacity,
              }}
              whileHover={{
                rotateY: 5,
                rotateX: -5,
              }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <Image width={500} height={500} src="/developer-portrait-tech.jpg" alt="Nortey Michael" className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-linear-to-t from-background via-transparent to-transparent opacity-50" />

              <motion.div
                className="absolute inset-0 bg-linear-to-br from-teal/20 via-transparent to-aqua/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                animate={{
                  boxShadow: [
                    "inset 0 0 0px rgba(101, 216, 192, 0)",
                    "inset 0 0 20px rgba(101, 216, 192, 0.3)",
                    "inset 0 0 0px rgba(101, 216, 192, 0)",
                  ],
                }}
                transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY }}
              />
            </motion.div>

            {/* Decorative corner accent */}
            <motion.div
              className="absolute -bottom-2 -right-2 w-20 h-20 border-r-2 border-b-2 border-teal/30 rounded-br-lg"
              animate={{ opacity: [0.3, 0.7, 0.3] }}
              transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
            />
          </motion.div>

          {/* Right: About text with parallax */}
          <motion.div variants={containerVariants} style={{ y: textY }} className="space-y-6">
            <motion.p
              variants={itemVariants}
              className="text-lg text-foreground/80 leading-relaxed border-l-2 border-teal/50 pl-6"
            >
              I'm a full-stack developer passionate about creating meaningful digital experiences. With a background in
              both web and mobile development, I bring a unique perspective to solving complex problems.
            </motion.p>

            <motion.p
              variants={itemVariants}
              className="text-lg text-foreground/80 leading-relaxed border-l-2 border-aqua/50 pl-6 hover:border-aqua transition-colors"
            >
              My journey in tech started with a curiosity about how things work. Over the years, I've honed my skills in
              modern frameworks and cloud technologies, always staying at the forefront of innovation.
            </motion.p>

            <motion.p
              variants={itemVariants}
              className="text-lg text-foreground/80 leading-relaxed border-l-2 border-teal/50 pl-6"
            >
              When I'm not coding, you'll find me exploring new technologies, contributing to open source, or sharing
              knowledge with the developer community. I believe in the power of collaboration and continuous learning.
            </motion.p>

            <motion.div variants={itemVariants} className="pt-6 bg-aqua text-deep">
              <motion.a
                href="#contact"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-lg border-2 border-aqua-glow text-teal font-semibold bg-foreground text-background transition-all duration-300 group" 
                whileHover={{ x: 5 }}
              >
                Let's Connect
                <span className="group-hover:translate-x-1 transition-transform">→</span>
              </motion.a>
            </motion.div>
          </motion.div>
        </div>

        {/* Closing tag */}
        <motion.div variants={itemVariants} className="text-teal/50 font-mono text-sm mt-16">
          {"</about-me>"}
        </motion.div>
      </motion.div>
    </section>
  )
}
