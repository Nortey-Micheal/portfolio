"use client"

import { motion } from "framer-motion"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"

export default function BlogPostPage({
  params,
}: {
  params: { slug: string }
}) {
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
        <motion.div variants={containerVariants} initial="hidden" animate="visible" className="max-w-3xl mx-auto">
          {/* Back link */}
          <motion.div variants={itemVariants} className="mb-8">
            <Link href="/blog" className="flex items-center gap-2 text-teal hover:text-aqua transition-colors">
              <ArrowLeft className="w-4 h-4" />
              Back to Blog
            </Link>
          </motion.div>

          {/* Post header */}
          <motion.header variants={itemVariants} className="mb-12 pb-8 border-b border-teal/30">
            <h1 className="text-5xl font-bold mb-4 text-aqua">Building Scalable Applications with Next.js 15</h1>
            <div className="flex flex-wrap gap-4 text-foreground/60 text-sm">
              <span>Dec 15, 2024</span>
              <span>•</span>
              <span>8 min read</span>
              <span>•</span>
              <span className="px-3 py-1 bg-teal/10 text-teal border border-teal/30 rounded-full">Backend</span>
            </div>
          </motion.header>

          {/* Post content */}
          <motion.article
            variants={itemVariants}
            className="prose prose-invert max-w-none space-y-6 text-foreground/80"
          >
            <p>
              Next.js 15 brings significant improvements for building scalable applications. In this comprehensive
              guide, we'll explore the latest features and best practices.
            </p>

            <h2 className="text-3xl font-bold text-aqua mt-8">Introduction</h2>
            <p>
              Scalability is one of the most important concerns when building modern web applications. With Next.js 15,
              you have powerful tools and patterns at your disposal to create applications that can grow with your user
              base.
            </p>

            <h2 className="text-3xl font-bold text-aqua mt-8">Key Features</h2>
            <ul className="list-disc list-inside space-y-2">
              <li>Improved performance with optimized bundling</li>
              <li>Enhanced server components for better scalability</li>
              <li>Advanced caching mechanisms</li>
              <li>Better developer experience with improved tooling</li>
            </ul>

            <h2 className="text-3xl font-bold text-aqua mt-8">Best Practices</h2>
            <p>
              When building scalable applications, it's crucial to follow established patterns and best practices. This
              ensures your application remains maintainable and performs well as it grows.
            </p>

            <h2 className="text-3xl font-bold text-aqua mt-8">Conclusion</h2>
            <p>
              Next.js 15 provides a solid foundation for building scalable web applications. By leveraging its features
              and following best practices, you can create applications that are both performant and maintainable.
            </p>
          </motion.article>

          {/* Navigation */}
          <motion.div variants={itemVariants} className="mt-16 pt-8 border-t border-teal/30">
            <Link
              href="/blog"
              className="inline-block px-6 py-3 rounded-lg border-2 border-teal text-teal hover:bg-teal/10 transition-all"
            >
              Read More Articles
            </Link>
          </motion.div>
        </motion.div>
      </section>
      <Footer />
    </main>
  )
}
