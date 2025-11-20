"use client"

import { motion } from "framer-motion"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"
import { useEffect, useState } from "react"
import { useGetBlogById } from "@/hooks/useGetBlogById"
import { PortableText } from "next-sanity"

export default function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const [id,setId] = useState<string | null>()
  const {blog} = useGetBlogById(id!)
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

  useEffect(() => {
    const resolveSlug = async() => {
      const slug = (await params).slug
      setId(slug)
    }
    resolveSlug()
  },[])

  useEffect(() => {
    console.log({blog})
  },[blog])

  if (!blog) {
    return (
      <p className="w-full h-screen flex flex-col items-center justify-center">
        Loading Blog ... 
        <span className="text-xs">Please reload if this persists</span>
      </p>
    )
  }

  return (
    <main className="bg-background text-foreground">
      <Navigation />
      <section className="min-h-screen py-20 px-6 pt-32 bg-linear-to-b from-steel/20 to-deep">
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
            <h1 className="text-5xl font-bold mb-4 text-aqua">{blog?.title}</h1>
            <div className="flex flex-wrap gap-4 text-foreground/60 text-sm">
              <span>{new Date(blog?._createdAt!).toDateString()}</span>
              <span>•</span>
              <span>{blog?.readTime || 5} min read</span>
              <span>•</span>
              <span className="px-3 py-1 bg-teal/10 text-teal border border-teal/30 rounded-full">{blog?.tags![0]}</span>
            </div>
          </motion.header>

          {/* Post content */}
          <motion.article
            variants={itemVariants}
            className="prose prose-invert max-w-none space-y-6 text-foreground/80"
          >
            {blog?.content && <PortableText value={blog.content}/>}
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
