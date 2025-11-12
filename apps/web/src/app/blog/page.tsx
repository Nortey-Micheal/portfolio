"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import { Navigation } from "@/components/navigation"
import { Footer } from "@components/footer"
import { ArrowRight } from "lucide-react"

const blogPosts = [
  {
    id: 1,
    title: "Building Scalable Applications with Next.js 15",
    excerpt: "Explore best practices for building production-ready applications using the latest features in Next.js.",
    date: "Dec 15, 2024",
    readTime: "8 min read",
    slug: "nextjs-scalable-apps",
    category: "Backend",
  },
  {
    id: 2,
    title: "The Future of Web Development: AI and Automation",
    excerpt: "Discovering how AI is transforming the way we build and deploy web applications in 2024.",
    date: "Dec 10, 2024",
    readTime: "6 min read",
    slug: "ai-web-development",
    category: "AI/ML",
  },
  {
    id: 3,
    title: "Mastering React Hooks: Advanced Patterns",
    excerpt: "Deep dive into advanced React Hooks patterns and how to optimize performance in complex applications.",
    date: "Dec 5, 2024",
    readTime: "10 min read",
    slug: "react-hooks-advanced",
    category: "Frontend",
  },
  {
    id: 4,
    title: "Building Real-Time Applications with WebSockets",
    excerpt: "A comprehensive guide to implementing real-time features using WebSockets and modern frameworks.",
    date: "Nov 28, 2024",
    readTime: "7 min read",
    slug: "websockets-realtime",
    category: "Backend",
  },
  {
    id: 5,
    title: "Mobile Development Trends in 2025",
    excerpt: "Analyzing the latest trends and technologies shaping mobile app development in the new year.",
    date: "Nov 20, 2024",
    readTime: "5 min read",
    slug: "mobile-trends-2025",
    category: "Mobile",
  },
  {
    id: 6,
    title: "UI/UX Best Practices for Developer Portfolios",
    excerpt: "Tips and strategies for creating a stunning portfolio that showcases your skills effectively.",
    date: "Nov 15, 2024",
    readTime: "6 min read",
    slug: "portfolio-ux",
    category: "Design",
  },
]

export default function BlogPage() {
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
      <section className="min-h-screen py-20 px-6 pt-32 bg-gradient-to-b from-steel/20 to-deep">
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
            {blogPosts.map((post, index) => (
              <motion.article key={post.id} variants={itemVariants} whileHover={{ y: -5 }} className="group">
                <Link href={`/blog/${post.slug}`}>
                  <div className="bg-card border border-teal/30 rounded-lg p-6 h-full hover:border-aqua transition-all duration-300 glow-sm hover:glow-aqua cursor-pointer">
                    {/* Category badge */}
                    <div className="flex items-center justify-between mb-4">
                      <span className="inline-block px-3 py-1 text-xs font-mono bg-teal/10 text-teal border border-teal/30 rounded-full">
                        {post.category}
                      </span>
                      <span className="text-xs text-foreground/40">{post.readTime}</span>
                    </div>

                    {/* Title */}
                    <h2 className="text-xl font-bold mb-3 text-aqua group-hover:text-teal transition-colors">
                      {post.title}
                    </h2>

                    {/* Excerpt */}
                    <p className="text-foreground/70 mb-4 leading-relaxed text-sm">{post.excerpt}</p>

                    {/* Footer */}
                    <div className="flex items-center justify-between pt-4 border-t border-teal/20">
                      <span className="text-xs text-foreground/50">{post.date}</span>
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
