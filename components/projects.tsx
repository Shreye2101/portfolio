"use client"

import { useRef, useEffect } from "react"
import { motion, useInView } from "framer-motion"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ExternalLink, Github, MessageSquare, ShoppingCart, BarChart2, Leaf } from "lucide-react"

const projects = [
  {
    id: 1,
    title: "Real-Time Chat Application",
    description:
      "A high-performance webapp using Node.js and Express.js with WebSockets for instant, bidirectional messaging.",
    technologies: ["Node.js", "Express.js", "WebSockets", "MongoDB", "RESTAPIs"],
    icon: <MessageSquare className="h-10 w-10 text-cyan-400" />,
    github: "https://github.com/Shreye2101",
    demo: "#",
    details: [
      "Engineered a high-performance webapp using Node.js and Express.js, enabling seamless and responsive communication.",
      "Integrated WebSockets (Socket.io) to power instant, bidirectional messaging, delivering a truly real-time chat experience.",
      "Designed and Developed RESTful APIs for user authentication, chat messaging, and room management.",
      "Leveraged MongoDB to efficiently store data and restore chat history, user data and messages logs with optimized indexing.",
    ],
  },
  {
    id: 2,
    title: "Ecommerce Web Application",
    description:
      "A responsive web app integrated with DummyJSON API for product data and Razorpay for secure payments.",
    technologies: ["MongoDB", "React.js", "Node.js", "Express.js", "JWT"],
    icon: <ShoppingCart className="h-10 w-10 text-purple-400" />,
    github: "https://github.com/Shreye2101",
    demo: "https://shopeaseshreyash.vercel.app/",
    details: [
      "Built and Deployed a responsive web app, integrated with DummyJSON API for product data and Razorpay for secure payments.",
      "Implemented JWT based authentication and password hashing using bcrypt, reducing security vulnerabilities by 20%.",
      "Optimized cross-device compatibility, achieving a 25% faster load time on mobile devices.",
    ],
  },
  {
    id: 3,
    title: "Sorting Algorithm Visualizer",
    description:
      "An interactive web-based tool to visualize sorting algorithms like Bubble Sort, Merge Sort, Selection Sort, and Insertion Sort.",
    technologies: ["HTML", "CSS", "JavaScript", "React.js", "DSA", "Git"],
    icon: <BarChart2 className="h-10 w-10 text-green-400" />,
    github: "https://github.com/Shreye2101",
    demo: "https://66eeecd49ba64e87bc9465f4--radiant-narwhal-a6fd91.netlify.app/",
    details: [
      "Built an interactive web-based tool to visualize sorting algorithms, helping users understand algorithmic concepts through animations.",
      "Engineered an intuitive user interface using React.js, enabling users to select and compare sorting algorithms.",
      "Improved user comprehension of algorithmic processes by 40% through visual demonstrations.",
    ],
  },
  {
    id: 4,
    title: "EverTruth - B2B Website",
    description:
      "A highly interactive website for EverTruth, a B2B start-up specializing in bulk ordering of seeds, berries, and dry fruits.",
    technologies: ["React.js", "Next.js", "Vercel", "GoDaddy", "Responsive Design"],
    icon: <Leaf className="h-10 w-10 text-yellow-400" />,
    github: "https://github.com/Shreye2101/EverTruth1",
    demo: "https://v0-evertruth-portfolio-website.vercel.app/",
    details: [
      "Created a highly interactive and polished website for EverTruth, resulting in a 20% increase in website traffic.",
      "Crafted a user-friendly front-end layout aligned with the company's branding, improving user navigation.",
      "Increased average session duration by 15% through intuitive design and smooth user experience.",
      "Deployed the website using Vercel and managed domain hosting via GoDaddy, ensuring 99.9% uptime.",
    ],
  },
]

export default function Projects() {
  const sectionRef = useRef<HTMLElement>(null)
  const cardsRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(sectionRef, { once: false, amount: 0.2 })

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger)

    if (sectionRef.current && cardsRef.current) {
      const cards = cardsRef.current.querySelectorAll(".project-card")

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
      id="projects"
      ref={sectionRef}
      className="py-20 md:py-32 bg-gradient-to-b from-gray-900 to-black"
      data-scroll-section
    >
      <div className="container mx-auto px-4 md:px-6">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-16 bg-clip-text text-transparent bg-gradient-to-r from-purple-500 to-cyan-500">
          Featured Projects
        </h2>

        <div ref={cardsRef} className="grid grid-cols-1 gap-8">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full"
          >
            {projects.map((project) => (
              <motion.div key={project.id} variants={cardVariants} className="project-card">
                <Card className="h-full bg-gray-800/50 border-gray-700 hover:border-purple-500/50 transition-all duration-300 hover:shadow-lg hover:shadow-purple-500/10 overflow-hidden group">
                  <CardHeader className="pb-2">
                    <div className="mb-2">{project.icon}</div>
                    <CardTitle className="text-xl text-white group-hover:text-purple-400 transition-colors">
                      {project.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="pb-4">
                    <CardDescription className="text-gray-400 mb-4">{project.description}</CardDescription>
                    <div className="space-y-2">
                      <div className="flex flex-wrap gap-2 mb-3">
                        {project.technologies.map((tech, index) => (
                          <span key={index} className="text-xs bg-gray-700 text-gray-300 px-2 py-1 rounded-full">
                            {tech}
                          </span>
                        ))}
                      </div>
                      <ul className="text-xs text-gray-400 space-y-1 list-disc pl-4">
                        {project.details.slice(0, 2).map((detail, index) => (
                          <li key={index}>{detail}</li>
                        ))}
                      </ul>
                    </div>
                  </CardContent>
                  <CardFooter className="pt-0 flex justify-between">
                    <Button variant="ghost" size="sm" className="text-gray-400 hover:text-white" asChild>
                      <a href={project.github} target="_blank" rel="noopener noreferrer">
                        <Github className="mr-2 h-4 w-4" />
                        Code
                      </a>
                    </Button>
                    <Button variant="ghost" size="sm" className="text-gray-400 hover:text-white" asChild>
                      <a href={project.demo} target="_blank" rel="noopener noreferrer">
                        <ExternalLink className="mr-2 h-4 w-4" />
                        Demo
                      </a>
                    </Button>
                  </CardFooter>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  )
}
