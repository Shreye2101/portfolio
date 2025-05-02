"use client"

import { useRef, useEffect } from "react"
import { motion, useInView } from "framer-motion"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Award, Code, Trophy } from "lucide-react"

const achievements = [
  {
    id: 1,
    title: "NIMCET 2023",
    description:
      "Achieved a top rank under 1000 in the National Level Entrance Exam (NIMCET) 2023, demonstrating strong problem-solving skills and proficiency in mathematics, computer science, and logical reasoning.",
    icon: <Trophy className="h-8 w-8 text-yellow-400" />,
  },
  {
    id: 2,
    title: "CUET-PG 2023",
    description:
      "Ranked under 1000 in the CUET-PG 2023 for MCA, demonstrating strong analytical and problem-solving skills.",
    icon: <Award className="h-8 w-8 text-cyan-400" />,
  },
  {
    id: 3,
    title: "Data Structures & Algorithms",
    description:
      "Solved 300+ Data Structures and Algorithms problems across GeeksforGeeks, LeetCode, and Code360, demonstrating strong problem-solving and algorithmic skills.",
    icon: <Code className="h-8 w-8 text-purple-400" />,
  },
  {
    id: 4,
    title: "Flipkart Grid 6.0",
    description:
      "Participated in the Level 1: E-Commerce & Tech Quiz of the Flipkart GRID 6.0 - Software Development Track.",
    icon: <Award className="h-8 w-8 text-blue-400" />,
  },
]

export default function Achievements() {
  const sectionRef = useRef<HTMLElement>(null)
  const cardsRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(sectionRef, { once: false, amount: 0.2 })

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger)

    if (sectionRef.current && cardsRef.current) {
      const cards = cardsRef.current.querySelectorAll(".achievement-card")

      gsap.from(cards, {
        y: 100,
        opacity: 0,
        duration: 0.8,
        stagger: 0.2,
        ease: "power3.out",
        scrollTrigger: {
          trigger: cardsRef.current,
          start: "top 80%",
          end: "bottom 20%",
          toggleActions: "play none none reverse",
        },
      })
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
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  }

  const cardVariants = {
    hidden: { y: 50, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  }

  return (
    <section
      id="achievements"
      ref={sectionRef}
      className="py-20 md:py-32 bg-gradient-to-b from-gray-900 to-black"
      data-scroll-section
    >
      <div className="container mx-auto px-4 md:px-6">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-16 bg-clip-text text-transparent bg-gradient-to-r from-purple-500 to-cyan-500">
          Achievements & Certifications
        </h2>

        <div ref={cardsRef} className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full"
          >
            {achievements.map((achievement) => (
              <motion.div key={achievement.id} variants={cardVariants} className="achievement-card">
                <Card className="h-full bg-gray-800/50 border-gray-700 hover:border-purple-500/50 transition-all duration-300 hover:shadow-lg hover:shadow-purple-500/10 overflow-hidden group">
                  <CardHeader className="pb-2 flex flex-row items-center gap-4">
                    <div className="bg-gray-700/50 p-3 rounded-full">{achievement.icon}</div>
                    <CardTitle className="text-lg text-white group-hover:text-purple-400 transition-colors">
                      {achievement.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="pt-2">
                    <p className="text-gray-300 text-sm">{achievement.description}</p>
                    {achievement.id === 4 && (
                      <div className="mt-4 flex justify-center">
                        <img
                          src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/photo_2025-04-29_01-47-29.jpg-A1tkCh1In5f8Cor3H4aDYp9J7DIL4x.jpeg"
                          alt="Flipkart Grid 6.0 Certificate"
                          className="w-full max-w-[200px] rounded-md border border-gray-700"
                        />
                      </div>
                    )}
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  )
}
