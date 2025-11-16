"use client"

import type React from "react"

import { motion } from "framer-motion"
import { useState } from "react"
import { Mail, Github, Linkedin, Twitter, PhoneOutgoing } from "lucide-react"

export function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  })
  const [submitted, setSubmitted] = useState(false)

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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setSubmitted(true)
    setTimeout(() => {
      setFormData({ name: "", email: "", message: "" })
      setSubmitted(false)
    }, 3000)
  }

  const socialLinks = [
    {
      name: "GitHub",
      icon: Github,
      url: "https://github.com/Nortey-Micheal",
      color: "hover:text-teal",
    },
    {
      name: "LinkedIn",
      icon: Linkedin,
      url: "https://www.linkedin.com/in/nortey-micheal-45726225b/",
      color: "hover:text-teal",
    },
    {
      name: "WhatsApp",
      icon: PhoneOutgoing,
      url: "https://wa.me/+233243634567",
      color: "hover:text-aqua",
    },
    {
      name: "Email",
      icon: Mail,
      url: "mailto:norteymicheal91@gmail.com",
      color: "hover:text-teal",
    },
  ]

  return (
    <section
      id="contact"
      className="min-h-screen flex items-center justify-center py-20 px-6 bg-linear-to-b from-deep via-steel to-deep"
    >
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        className="max-w-2xl mx-auto w-full"
      >
        {/* Section header */}
        <motion.div variants={itemVariants} className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold mb-2">
            <span className="text-aqua">&lt;contact&gt;</span>
          </h2>
          <p className="text-foreground/60">Have a project in mind? Let's build something amazing together.</p>
        </motion.div>

        {/* Contact form */}
        <motion.form
          variants={itemVariants}
          onSubmit={handleSubmit}
          className="space-y-6 bg-card border border-teal/30 rounded-lg p-8 mb-12"
        >
          {/* Name input */}
          <motion.div variants={itemVariants} className="space-y-2">
            <label htmlFor="name" className="text-sm font-medium text-teal">
              Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              placeholder="Your name"
              className="w-full bg-steel/50 border border-teal/30 rounded-lg px-4 py-3 text-foreground placeholder:text-foreground/40 focus:outline-none focus:ring-2 focus:ring-aqua focus:border-transparent transition-all"
            />
          </motion.div>

          {/* Email input */}
          <motion.div variants={itemVariants} className="space-y-2">
            <label htmlFor="email" className="text-sm font-medium text-teal">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              placeholder="your@email.com"
              className="w-full bg-steel/50 border border-teal/30 rounded-lg px-4 py-3 text-foreground placeholder:text-foreground/40 focus:outline-none focus:ring-2 focus:ring-aqua focus:border-transparent transition-all"
            />
          </motion.div>

          {/* Message textarea */}
          <motion.div variants={itemVariants} className="space-y-2">
            <label htmlFor="message" className="text-sm font-medium text-teal">
              Message
            </label>
            <textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              required
              placeholder="Tell me about your project..."
              rows={5}
              className="w-full bg-steel/50 border border-teal/30 rounded-lg px-4 py-3 text-foreground placeholder:text-foreground/40 focus:outline-none focus:ring-2 focus:ring-aqua focus:border-transparent transition-all resize-none"
            />
          </motion.div>

          {/* Submit button */}
          <motion.button
            variants={itemVariants}
            type="submit"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="w-full py-3 rounded-lg bg-foreground text-background font-semibold hover:bg-aqua transition-all duration-300 "
          >
            {submitted ? "Message sent! Thanks!" : "Send Message"}
          </motion.button>

          {/* Closing tag */}
          <motion.div variants={itemVariants} className="text-teal/50 font-mono text-xs text-center">
            {"</form>"}
          </motion.div>
        </motion.form>

        {/* Social links */}
        <motion.div variants={itemVariants} className="flex justify-center gap-6">
          {socialLinks.map((link) => {
            const Icon = link.icon
            return (
              <motion.a
                key={link.name}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.2, rotate: 10 }}
                whileTap={{ scale: 0.9 }}
                className={`p-3 rounded-full border border-teal/30 bg-steel/50 text-teal transition-all duration-300 hover:glow-sm hover:border-aqua ${link.color}`}
                title={link.name}
              >
                <Icon className="w-5 h-5" />
              </motion.a>
            )
          })}
        </motion.div>

        {/* Closing section tag */}
        <motion.div variants={itemVariants} className="text-teal/50 font-mono text-sm text-center mt-12">
          {"</contact>"}
        </motion.div>
      </motion.div>
    </section>
  )
}
