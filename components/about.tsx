"use client"

import { useRef, useEffect } from "react"
import Image from "next/image"
import { motion, useInView } from "framer-motion"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { Button } from "@/components/ui/button"
import { Download, Linkedin, Github, Instagram } from "lucide-react"

export default function About() {
  const sectionRef = useRef<HTMLElement>(null)
  const imageRef = useRef<HTMLDivElement>(null)
  const bioRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(sectionRef, { once: false, amount: 0.3 })

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger)

    if (sectionRef.current && imageRef.current && bioRef.current) {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 70%",
          end: "bottom 20%",
          toggleActions: "play none none reverse",
        },
      })

      tl.from(imageRef.current, {
        x: -100,
        opacity: 0,
        duration: 1,
        ease: "power3.out",
      }).from(
        bioRef.current,
        {
          x: 100,
          opacity: 0,
          duration: 1,
          ease: "power3.out",
        },
        "-=0.7",
      )
    }

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill())
    }
  }, [])

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3,
      },
    },
  }

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.5, ease: "easeOut" },
    },
  }

  return (
    <section
      id="about"
      ref={sectionRef}
      className="py-20 md:py-32 bg-gradient-to-b from-black to-gray-900"
      data-scroll-section
    >
      <div className="container mx-auto px-4 md:px-6">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-16 bg-clip-text text-transparent bg-gradient-to-r from-purple-500 to-cyan-500">
          About Me
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
          {/* Profile Image */}
          <div
            ref={imageRef}
            className="relative mx-auto md:mx-0 w-64 h-64 md:w-80 md:h-80 rounded-full overflow-hidden border-4 border-purple-500 shadow-lg shadow-purple-500/20"
          >
            <Image
              src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/mypic.jpg-V19GC5VrGVSMp17iGDBhXxhR5MgIRT.jpeg"
              alt="Shreyash Srivastava"
              fill
              className="object-cover"
              sizes="(max-width: 768px) 16rem, 20rem"
              priority
            />
          </div>

          {/* Bio */}
          <div ref={bioRef} className="space-y-6">
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate={isInView ? "visible" : "hidden"}
              className="space-y-4"
            >
              <motion.h3 variants={itemVariants} className="text-2xl font-semibold text-white">
                Shreyash Srivastava
              </motion.h3>

              <motion.p variants={itemVariants} className="text-gray-300">
                I'm a Full Stack Developer with expertise in React.js, Node.js, and modern web technologies. Currently
                pursuing my Master of Computer Application at JSS Academy of Technical Education, Noida.
              </motion.p>

              <motion.p variants={itemVariants} className="text-gray-300">
                With experience in developing dynamic web applications, I specialize in creating responsive UIs,
                implementing secure authentication, and optimizing application performance.
              </motion.p>

              <motion.div variants={itemVariants} className="pt-4">
                <Button
                  className="group bg-gradient-to-r from-purple-500 to-cyan-500 hover:from-purple-600 hover:to-cyan-600 text-white px-6 py-3 rounded-full"
                  asChild
                >
                  <a
                    href="https://drive.google.com/file/d/1bSgiWvr_at7NAulMpsq5KWI2Akr3RxNM/view?usp=sharing"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Download Resume
                    <Download className="ml-2 h-4 w-4 group-hover:translate-y-1 transition-transform" />
                  </a>
                </Button>
              </motion.div>

              <motion.div variants={itemVariants} className="flex space-x-4 pt-4">
                <a
                  href="https://www.linkedin.com/in/Shreye2101"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-white/10 p-3 rounded-full hover:bg-white/20 transition-colors duration-300"
                >
                  <Linkedin className="h-5 w-5 text-cyan-400" />
                </a>
                <a
                  href="https://www.github.com/Shreye2101"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-white/10 p-3 rounded-full hover:bg-white/20 transition-colors duration-300"
                >
                  <Github className="h-5 w-5 text-purple-400" />
                </a>
                <a
                  href="https://instagram.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-white/10 p-3 rounded-full hover:bg-white/20 transition-colors duration-300"
                >
                  <Instagram className="h-5 w-5 text-pink-400" />
                </a>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  )
}
