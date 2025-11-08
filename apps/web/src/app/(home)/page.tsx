import Header from "@/components/ui/ui/header";
import Image from "next/image";

export default function Home() {
  return (
    <>
      <Header/>
      <main
        className=" relative h-screen bg-[url(/images/lap.jpg)] bg-cover bg-center bg-no-repeat"
      >
        {/* Overlay to dim the background */}
        <div className="absolute inset-0 bg-deep-space/70 backdrop-blur-[1px]" />

        {/* Content */}
        <section className="relative z-10 flex flex-col items-center justify-center text-center h-full text-gray-100 px-6">
        {/* Name */}
        <h1 className="text-5xl md:text-7xl font-bold mb-3 text-aqua-glow drop-shadow-[0_0_12px_#00FFF5]">
          Nortey Michael
        </h1>

        {/* Role */}
        <p className="text-xl md:text-2xl mb-6 text-gray-300">
          Software Engineer, Frontend & App Developer
        </p>

        {/* Featured in */}
        <p className="text-gray-400 mb-8">
          As featured in{" "}
          <span className="text-aqua-bg-aqua-glow font-medium">TechCrunch</span>,{" "}
          <span className="text-aqua-bg-aqua-glow font-medium">GitHub</span>,{" "}
          <span className="text-aqua-bg-aqua-glow font-medium">Dev.to</span>
        </p>

        {/* Call to action */}
        <button className="h-10 w-10 rounded-full bg-[url(/images/down.gif)] bg-cover bg-center bg-no-repeat"></button>

        {/* Subtle glow effect */}
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[400px] h-[400px] bg-aqua-glow/20 blur-[120px] rounded-full pointer-events-none" />
      </section>
      </main>
    </>
  );
}
