"use client"

import { useRef, useEffect } from "react"
import { motion, useInView } from "framer-motion"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Calendar } from "lucide-react"

const experiences = [
  {
    id: 1,
    company: "Transportrix Technology Pvt Ltd",
    position: "Web Developer Intern",
    period: "May 2024 - July 2024",
    type: "Remote",
    responsibilities: [
      "Developed and optimized dynamic form UIs in React.js, ensuring seamless user interactions and an intuitive experience.",
      "Implemented form validation using libraries like Formik and Yup, enhancing data integrity and user feedback.",
      "Built and integrated authentication mechanisms, including JWT-based authentication and session management, to ensure secure access.",
      "Developed efficient pagination for handling large datasets, improving data retrieval speed and UI responsiveness.",
      "Leveraged caching strategies and memoization to minimize redundant computations, improving application speed and efficiency.",
    ],
  },
  {
    id: 2,
    company: "Evertruth Pvt Ltd",
    position: "Front End Developer Intern",
    period: "Feb 2024 - March 2024",
    type: "Remote",
    responsibilities: [
      "Created a highly interactive and polished website for Evertruth, a B2B start-up specializing in bulk ordering of Seeds, Berries and Dry-fruits, resulting in 20% increase in website traffic within the first month of launch.",
      "Architecture the website in such a way that is responsive for multiple devices with different screen sizes.",
      "Deployed the website using Vercel and managed domain hosting via GoDaddy for smooth user experience.",
    ],
  },
]

export default function Experience() {
  const sectionRef = useRef<HTMLElement>(null)
  const cardsRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(sectionRef, { once: false, amount: 0.2 })

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger)

    if (sectionRef.current && cardsRef.current) {
      const cards = cardsRef.current.querySelectorAll(".experience-card")

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
      id="experience"
      ref={sectionRef}
      className="py-20 md:py-32 bg-gradient-to-b from-black to-gray-900"
      data-scroll-section
    >
      <div className="container mx-auto px-4 md:px-6">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-16 bg-clip-text text-transparent bg-gradient-to-r from-purple-500 to-cyan-500">
          Work Experience
        </h2>

        <div ref={cardsRef} className="space-y-8 max-w-4xl mx-auto">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            className="space-y-8"
          >
            {experiences.map((experience) => (
              <motion.div key={experience.id} variants={cardVariants} className="experience-card">
                <Card className="bg-gray-800/50 border-gray-700 hover:border-purple-500/50 transition-all duration-300 hover:shadow-lg hover:shadow-purple-500/10 overflow-hidden">
                  <CardHeader className="pb-2">
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle className="text-xl text-white group-hover:text-purple-400 transition-colors">
                          {experience.position}
                        </CardTitle>
                        <CardDescription className="text-gray-300 font-medium text-base mt-1">
                          {experience.company}
                        </CardDescription>
                      </div>
                      <Badge variant="outline" className="bg-purple-500/10 text-purple-400 border-purple-500/30">
                        {experience.type}
                      </Badge>
                    </div>
                    <div className="flex items-center text-gray-400 text-sm mt-2">
                      <Calendar className="h-4 w-4 mr-2" />
                      {experience.period}
                    </div>
                  </CardHeader>
                  <CardContent className="pt-2">
                    <ul className="space-y-2 text-gray-300">
                      {experience.responsibilities.map((responsibility, index) => (
                        <li key={index} className="flex items-start">
                          <span className="text-purple-400 mr-2 mt-1">•</span>
                          <span>{responsibility}</span>
                        </li>
                      ))}
                    </ul>
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
