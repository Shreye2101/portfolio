"use client"

import { useRef, useEffect } from "react"
import { Canvas } from "@react-three/fiber"
import { OrbitControls, Environment } from "@react-three/drei"
import { motion } from "framer-motion"
import { gsap } from "gsap"
import { Button } from "@/components/ui/button"
import { ArrowDown, Code } from "lucide-react"
import type * as THREE from "three"

function ParticleField() {
  const particlesRef = useRef<THREE.Points>(null)
  const count = 2000

  // Create particles
  const particles = new Float32Array(count * 3)
  for (let i = 0; i < count; i++) {
    const i3 = i * 3
    particles[i3] = (Math.random() - 0.5) * 10
    particles[i3 + 1] = (Math.random() - 0.5) * 10
    particles[i3 + 2] = (Math.random() - 0.5) * 10
  }

  useEffect(() => {
    if (!particlesRef.current) return

    // Animate particles
    gsap.to(particlesRef.current.rotation, {
      y: Math.PI * 2,
      duration: 20,
      repeat: -1,
      ease: "none",
    })
  }, [])

  return (
    <points ref={particlesRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" count={count} itemSize={3} array={particles} />
      </bufferGeometry>
      <pointsMaterial size={0.05} color="#ffffff" sizeAttenuation transparent opacity={0.8} />
    </points>
  )
}

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const tl = gsap.timeline()

    tl.from(".hero-title", {
      y: 100,
      opacity: 0,
      duration: 1,
      ease: "power4.out",
    })
      .from(
        ".hero-subtitle",
        {
          y: 50,
          opacity: 0,
          duration: 0.8,
          ease: "power3.out",
        },
        "-=0.6",
      )
      .from(
        ".hero-cta",
        {
          y: 30,
          opacity: 0,
          duration: 0.6,
          ease: "power2.out",
        },
        "-=0.4",
      )
  }, [])

  const scrollToAbout = () => {
    const aboutSection = document.getElementById("about")
    if (aboutSection) {
      aboutSection.scrollIntoView({ behavior: "smooth" })
    }
  }

  return (
    <section ref={containerRef} className="relative h-screen w-full overflow-hidden">
      {/* 3D Background */}
      <div className="absolute inset-0 z-0">
        <Canvas camera={{ position: [0, 0, 5], fov: 45 }}>
          <ambientLight intensity={0.5} />
          <directionalLight position={[10, 10, 5]} intensity={1} />
          <ParticleField />
          <Environment preset="night" />
          <OrbitControls enableZoom={false} enablePan={false} enableRotate={false} autoRotate autoRotateSpeed={0.5} />
        </Canvas>
      </div>

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center justify-center h-full text-center px-4">
        <motion.h1
          className="hero-title text-5xl md:text-7xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-500 to-cyan-500"
          initial={{ opacity: 0, y: 100 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
        >
          Shreyash Srivastava
        </motion.h1>

        <motion.div className="space-y-2">
          <motion.h2
            className="hero-subtitle mt-4 text-xl md:text-2xl text-gray-300"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.4 }}
          >
            Full Stack Developer
          </motion.h2>
          <motion.div
            className="flex items-center justify-center gap-2"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: "easeOut", delay: 0.6 }}
          >
            <a
              href="https://www.geeksforgeeks.org/user/shreye_2101/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-gray-400 hover:text-cyan-400 transition-colors flex items-center"
            >
              <Code className="h-4 w-4 mr-1" /> GeeksForGeeks Profile
            </a>
          </motion.div>
        </motion.div>

        <motion.div
          className="hero-cta mt-8"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut", delay: 0.8 }}
        >
          <Button
            onClick={scrollToAbout}
            className="group bg-gradient-to-r from-purple-500 to-cyan-500 hover:from-purple-600 hover:to-cyan-600 text-white px-6 py-3 rounded-full"
          >
            Explore My Work
            <ArrowDown className="ml-2 h-4 w-4 group-hover:translate-y-1 transition-transform" />
          </Button>
        </motion.div>
      </div>
    </section>
  )
}
