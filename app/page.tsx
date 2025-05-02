import dynamic from "next/dynamic"
import Hero from "@/components/hero"
import About from "@/components/about"
import Experience from "@/components/experience"
import Projects from "@/components/projects"
import Achievements from "@/components/achievements"
import Contact from "@/components/contact"

// Dynamically import scroll components with no SSR
const SmoothScrollWithNoSSR = dynamic(() => import("@/components/smooth-scroll"), { ssr: false })

const ScrollProviderWithNoSSR = dynamic(
  () => import("@/components/scroll-provider").then((mod) => mod.ScrollProvider),
  { ssr: false },
)

export default function Home() {
  return (
    <main className="relative">
      <ScrollProviderWithNoSSR>
        <SmoothScrollWithNoSSR>
          <Hero />
          <About />
          <Experience />
          <Projects />
          <Achievements />
          <Contact />
        </SmoothScrollWithNoSSR>
      </ScrollProviderWithNoSSR>
    </main>
  )
}
