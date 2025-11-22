"use client"

import { motion } from "framer-motion"
import Link from "next/link"

export function Footer() {
  const currentYear = new Date().getFullYear()

  const footerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.4 },
    },
  }

  return (
    <motion.footer
      variants={footerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      className="border-t border-teal/30 bg-deep py-12 px-6"
    >
      <div className="max-w-5xl mx-auto">
        <div className="grid md:grid-cols-3 gap-8 mb-12">
          {/* Brand */}
          <motion.div variants={itemVariants}>
            <h3 className="text-lg font-bold text-aqua mb-4">Nortey.dev</h3>
            <p className="text-foreground/60 text-sm">
              Building innovative digital experiences with modern technologies.
            </p>
          </motion.div>

          {/* Quick links */}
          <motion.div variants={itemVariants}>
            <h4 className="font-semibold text-teal mb-4">Quick Links</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/#hero" className="text-foreground/60 hover:text-aqua transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/#about" className="text-foreground/60 hover:text-aqua transition-colors">
                  About
                </Link>
              </li>
              <li>
                <Link href="/#projects" className="text-foreground/60 hover:text-aqua transition-colors">
                  Projects
                </Link>
              </li>
              <li>
                <Link href="/blog" className="text-foreground/60 hover:text-aqua transition-colors">
                  Blog
                </Link>
              </li>
            </ul>
          </motion.div>

          {/* Contact */}
          <motion.div variants={itemVariants}>
            <h4 className="font-semibold text-teal mb-4">Get in Touch</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="mailto:norteymicheal91@gmail.com" className="text-foreground/60 hover:text-aqua transition-colors">
                  norteymicheal91@gmail.com
                </a>
              </li>
              <li>
                <a
                  href="hhttps://www.linkedin.com/in/nortey-micheal-45726225b/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-foreground/60 hover:text-aqua transition-colors"
                >
                  LinkedIn
                </a>
              </li>
              <li>
                <a
                  href="https://github.com/Nortey-Micheal"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-foreground/60 hover:text-aqua transition-colors"
                >
                  GitHub
                </a>
              </li>
            </ul>
          </motion.div>
        </div>

        {/* Divider with glow */}
        <motion.div
          variants={itemVariants}
          className="h-px bg-linear-to-r from-transparent via-teal to-transparent mb-8"
        />

        {/* Bottom section */}
        <motion.div
          variants={itemVariants}
          className="flex flex-col md:flex-row justify-between items-center text-sm text-foreground/50"
        >
          <p>&copy; {currentYear} Nortey Michael. All rights reserved.</p>
          <p className="font-mono text-xs mt-4 md:mt-0">
            Crafted with <span className="text-aqua">{"</>"}</span> and <span className="text-teal">passion</span>
          </p>
        </motion.div>
      </div>
    </motion.footer>
  )
}
