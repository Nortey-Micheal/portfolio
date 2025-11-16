"use client"

import { motion } from "framer-motion"
import Link from "next/link"

export function Navigation() {
  return (
    <motion.nav
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-teal/30"
    >
      <div className="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">
        <Link href="/" className="text-xl font-bold text-aqua">
          <span className="lg:hidden">{'<'}</span>Nortey<span className="lg:hidden">.Czar {'/>'}</span>
        </Link>
        <div className="hidden lg:flex gap-8 items-center text-sm">
          <Link href="#about" className="hover:text-aqua transition-colors">
            About
          </Link>
          <Link href="#stack" className="hover:text-aqua transition-colors">
            Stack
          </Link>
          <Link href="#projects" className="hover:text-aqua transition-colors">
            Projects
          </Link>
          <Link href="#blog" className="hover:text-aqua transition-colors">
            Blog
          </Link>
          <Link href="#contact" className="hover:text-aqua transition-colors">
            Contact
          </Link>
        </div>
      </div>
    </motion.nav>
  )
}
