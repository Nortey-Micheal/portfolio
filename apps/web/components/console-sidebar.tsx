"use client"

import { motion, AnimatePresence } from "framer-motion"
import { Menu, X, Home, FileText, Code2, Mail, Github, Linkedin, PhoneOutgoing } from "lucide-react"
import { useState, useEffect } from "react"
import Link from "next/link"

export function ConsoleSidebar() {
  const [isOpen, setIsOpen] = useState(false)
  const [showLabel, setShowLabel] = useState(false)

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault()
        setIsOpen(!isOpen)
      }
    }

    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [isOpen])

  const links = [
    { icon: Home, label: "Home", href: "#" },
    { icon: Code2, label: "Projects", href: "#projects" },
    { icon: FileText, label: "Blog", href: "/blog" },
    { icon: Mail, label: "Contact", href: "#contact" },
  ]

  const social = [
    { 
      icon: Github, 
      label: "GitHub", 
      href: "https://github.com/Nortey-Micheal" 
    },
    { 
      icon: Linkedin, 
      label: "LinkedIn", 
      href: "https://www.linkedin.com/in/nortey-micheal-45726225b/" },
    {
      name: "WhatsApp",
      icon: PhoneOutgoing,
      href: "https://wa.me/+233243634567",
      color: "hover:text-aqua",
    },
    {
      name: "Email",
      icon: Mail,
      href: "mailto:norteymicheal91@gmail.com",
      color: "hover:text-teal",
    },
  ]

  return (
    <>
      {/* Toggle button - always visible */}
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        onMouseEnter={() => setShowLabel(true)}
        onMouseLeave={() => setShowLabel(false)}
        className="fixed bottom-6 right-6 z-40 p-3 rounded-lg border border-teal/40 hover:border-teal/60 transition-all duration-300 group"
        style={{
          background: "rgba(21, 38, 54, 0.4)",
          backdropFilter: "blur(10px)",
          boxShadow: "0 0 20px rgba(101, 216, 192, 0.15)",
        }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
      >
        <AnimatePresence mode="wait">
          {isOpen ? (
            <motion.div
              key="close"
              initial={{ rotate: -90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 90, opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <X className="w-5 h-5 text-teal" />
            </motion.div>
          ) : (
            <motion.div
              key="open"
              initial={{ rotate: 90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: -90, opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <Menu className="w-5 h-5 text-teal" />
            </motion.div>
          )}
        </AnimatePresence>

        {/* Label tooltip */}
        <AnimatePresence>
          {showLabel && !isOpen && (
            <motion.span
              initial={{ opacity: 0, x: 10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 10 }}
              className="absolute right-full mr-3 px-3 py-1 rounded text-xs bg-teal text-background whitespace-nowrap font-mono"
            >
              Cmd+K
            </motion.span>
          )}
        </AnimatePresence>
      </motion.button>

      {/* Sidebar drawer */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 bg-black/40 backdrop-blur-sm z-30"
            />

            {/* Sidebar panel */}
            <motion.div
              initial={{ x: 320 }}
              animate={{ x: 0 }}
              exit={{ x: 320 }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed right-0 top-0 h-screen w-80 bg-background border-l border-teal/40 z-40 flex flex-col overflow-hidden"
              style={{
                background: "rgba(21, 38, 54, 0.4)",
                backdropFilter: "blur(10px)",
              }}
            >
              {/* Header */}
              <div className="border-b border-teal/20 p-6">
                <div className="font-mono text-teal text-sm mb-2">
                  <span className="text-aqua">&gt;</span> console.log('nav')
                </div>
                <div className="h-0.5 w-8 bg-linear-to-r from-teal to-aqua" />
              </div>

              {/* Navigation links */}
              <nav className="flex-1 px-4 py-6 space-y-2 overflow-y-auto">
                {links.map((link, i) => {
                  const Icon = link.icon
                  return (
                    <motion.div
                      key={link.href}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.05 }}
                    >
                      <Link
                        href={link.href}
                        onClick={() => setIsOpen(false)}
                        className="flex items-center gap-3 px-4 py-3 rounded-lg text-foreground hover:text-aqua hover:bg-teal/10 transition-all duration-200 group"
                      >
                        <Icon className="w-4 h-4 group-hover:text-teal transition-colors" />
                        <span className="font-mono text-sm">{link.label}</span>
                        <span className="ml-auto text-xs text-teal/50 group-hover:text-teal/80 transition-colors">
                          ↵
                        </span>
                      </Link>
                    </motion.div>
                  )
                })}
              </nav>

              {/* Social links */}
              <div className="border-t border-teal/20 p-4">
                <div className="text-xs font-mono text-teal/60 mb-4">
                  <span className="text-aqua">&gt;</span> socials
                </div>
                <div className="flex gap-2">
                  {social.map((link) => {
                    const Icon = link.icon
                    return (
                      <motion.a
                        key={link.href}
                        href={link.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-3 rounded-lg border border-teal/30 text-teal hover:text-aqua hover:border-aqua hover:bg-aqua/5 transition-all duration-300"
                        whileHover={{ scale: 1.1, y: -2 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <Icon className="w-4 h-4" />
                      </motion.a>
                    )
                  })}
                </div>
              </div>

              {/* Footer */}
              <div className="border-t border-teal/20 px-6 py-4 text-xs font-mono text-teal/50">
                <div className="flex items-center justify-between">
                  <span>version 1.0</span>
                  <span className="text-xs">Esc to close</span>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  )
}
