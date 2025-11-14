"use client"
import { Hero } from "@components/sections/hero"
import { About } from "@components/sections/about"
import { Stack } from "@components/sections/stack"
import { Projects } from "@components/sections/projects"
import { Contact } from "@components/sections/contact"
import { Footer } from "@components/footer"
import { Navigation } from "@components/navigation"
import { ParticleBackground } from "@components/particle-background"
import { CustomCursor } from "@components/custom-cursor"
import { ConsoleSidebar } from "@components/console-sidebar"

export default function Home() {
  return (
    <main className="bg-background text-foreground overflow-hidden relative">
      {/* Custom cursor with spotlight effect */}
      <CustomCursor />

      {/* Particle background effect */}
      <ParticleBackground />

      {/* Console sidebar navigation */}
      <ConsoleSidebar />

      {/* Main content sections */}
      <Navigation />
      <Hero />
      <div className="relative overflow-hidden">
        {/* Background image */}
        <div className="absolute inset-0 bg-[url('/images/code.png')] lg:bg-cover bg-cente bg-no-repeat bg-size-[300%_100%]"></div>

        {/* Dimming overlay */}
        <div className="absolute inset-0 bg-background/85"></div> {/* adjust opacity as needed */}

        {/* Content */}
        <div className="relative z-10">
          <About />
          <Stack />
        </div>
      </div>

      <Projects />
      <Contact />
      <Footer />
    </main>
  )
}
