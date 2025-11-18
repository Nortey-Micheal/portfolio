"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import { Navigation } from "@/components/navigation"
import { Footer } from "@components/footer"
import { ArrowRight } from "lucide-react"
import { useEffect, useState } from "react"
import { Blog } from "@/src/sanity/types"
import { useBlogs } from "@/hooks/useBlogs"

export default function BlogPage() {
  const {blogs} = useBlogs()
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

  return (
    <main className="bg-background text-foreground">
      <Navigation />
      <section className="min-h-screen py-20 px-6 pt-32 bg-linear-to-b from-steel/20 to-deep">
        <motion.div variants={containerVariants} initial="hidden" animate="visible" className="max-w-5xl mx-auto">
          {/* Page header */}
          <motion.div variants={itemVariants} className="mb-16">
            <h1 className="text-5xl md:text-6xl font-bold mb-4">
              <span className="text-teal">&lt;</span>
              <span className="text-aqua">blog</span>
              <span className="text-teal">&gt;</span>
            </h1>
            <p className="text-lg text-foreground/60 max-w-2xl">
              Insights, stories, and learnings from my journey in software development.
            </p>
          </motion.div>

          {/* Blog posts grid */}
          <div className="grid md:grid-cols-2 gap-8">
            {blogs.map((post, index) => (
              <motion.article key={post._id} variants={itemVariants} whileHover={{ y: -5 }} className="group">
                <Link href={`/blog/${post._id}`}>
                  <div className="bg-card border border-teal/30 rounded-lg p-6 h-full hover:border-aqua transition-all duration-300 glow-sm hover:glow-aqua cursor-pointer">
                    {/* Category badge */}
                    <div className="flex items-center justify-between mb-4">
                      <span className="inline-block px-3 py-1 text-xs font-mono bg-teal/10 text-teal border border-teal/30 rounded-full">
                        {/* {post} */}
                      </span>
                      <span className="text-xs text-foreground/40">{}</span>
                    </div>

                    {/* Title */}
                    <h2 className="text-xl font-bold mb-3 text-aqua group-hover:text-teal transition-colors">
                      {post.title}
                    </h2>

                    {/* Excerpt */}
                    <p className="text-foreground/70 mb-4 leading-relaxed text-sm">{post.excerpt}</p>

                    {/* Footer */}
                    <div className="flex items-center justify-between pt-4 border-t border-teal/20">
                      <span className="text-xs text-foreground/50">{new Date(post._createdAt).toDateString()}</span>
                      <ArrowRight className="w-4 h-4 text-teal group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                </Link>
              </motion.article>
            ))}
          </div>

          {/* Closing tag */}
          <motion.div variants={itemVariants} className="text-teal/50 font-mono text-sm mt-16">
            {"</blog>"}
          </motion.div>
        </motion.div>
      </section>
      <Footer />
    </main>
  )
}
