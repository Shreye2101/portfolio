"use client"

import { useRef, useEffect } from "react"
import { motion, useInView } from "framer-motion"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Mail, Phone, MapPin, Send } from "lucide-react"

export default function Contact() {
  const sectionRef = useRef<HTMLElement>(null)
  const formRef = useRef<HTMLFormElement>(null)
  const isInView = useInView(sectionRef, { once: false, amount: 0.3 })

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger)

    if (sectionRef.current && formRef.current) {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 70%",
          end: "bottom 20%",
          toggleActions: "play none none reverse",
        },
      })

      tl.from(".contact-title", {
        y: 50,
        opacity: 0,
        duration: 0.8,
        ease: "power3.out",
      }).from(
        formRef.current,
        {
          y: 100,
          opacity: 0,
          duration: 1,
          ease: "power3.out",
        },
        "-=0.4",
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
        delayChildren: 0.2,
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
    <section id="contact" ref={sectionRef} className="py-20 md:py-32 bg-black" data-scroll-section>
      <div className="container mx-auto px-4 md:px-6">
        <h2 className="contact-title text-3xl md:text-4xl font-bold text-center mb-16 bg-clip-text text-transparent bg-gradient-to-r from-purple-500 to-cyan-500">
          Get In Touch
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          {/* Contact Info */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            className="space-y-8"
          >
            <motion.div variants={itemVariants} className="flex items-start space-x-4">
              <div className="bg-purple-500/20 p-3 rounded-full">
                <Mail className="h-6 w-6 text-purple-500" />
              </div>
              <div>
                <h3 className="text-lg font-medium text-white mb-1">Email</h3>
                <p className="text-gray-400">shreyash.jsx@gmail.com</p>
              </div>
            </motion.div>

            <motion.div variants={itemVariants} className="flex items-start space-x-4">
              <div className="bg-cyan-500/20 p-3 rounded-full">
                <Phone className="h-6 w-6 text-cyan-500" />
              </div>
              <div>
                <h3 className="text-lg font-medium text-white mb-1">Phone</h3>
                <p className="text-gray-400">706-028-8428</p>
              </div>
            </motion.div>

            <motion.div variants={itemVariants} className="flex items-start space-x-4">
              <div className="bg-purple-500/20 p-3 rounded-full">
                <MapPin className="h-6 w-6 text-purple-500" />
              </div>
              <div>
                <h3 className="text-lg font-medium text-white mb-1">Location</h3>
                <p className="text-gray-400">Meerut, Uttar Pradesh, India</p>
              </div>
            </motion.div>
          </motion.div>

          {/* Contact Form */}
          <form
            ref={formRef}
            className="space-y-6 bg-gray-800/30 p-6 rounded-lg border border-gray-700"
            onSubmit={(e) => e.preventDefault()}
          >
            <div>
              <Input
                placeholder="Your Name"
                className="bg-gray-800/50 border-gray-700 focus:border-purple-500 text-white"
              />
            </div>
            <div>
              <Input
                type="email"
                placeholder="Your Email"
                className="bg-gray-800/50 border-gray-700 focus:border-purple-500 text-white"
              />
            </div>
            <div>
              <Input
                placeholder="Subject"
                className="bg-gray-800/50 border-gray-700 focus:border-purple-500 text-white"
              />
            </div>
            <div>
              <Textarea
                placeholder="Your Message"
                className="bg-gray-800/50 border-gray-700 focus:border-purple-500 text-white min-h-[120px]"
              />
            </div>
            <Button
              type="submit"
              className="w-full group bg-gradient-to-r from-purple-500 to-cyan-500 hover:from-purple-600 hover:to-cyan-600 text-white px-6 py-3 rounded-full"
            >
              Send Message
              <Send className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </Button>
          </form>
        </div>
      </div>
    </section>
  )
}
