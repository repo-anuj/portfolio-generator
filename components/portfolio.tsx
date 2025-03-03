"use client"

import type { ResumeData } from "@/lib/types"
import {
  Calendar,
  ExternalLink,
  Github,
  Instagram,
  Linkedin,
  Mail,
  Twitter,
  Phone,
  MapPin,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"
import { useEffect, useRef, useState } from "react"
import Typed from "typed.js"
import { ThemeToggle } from "./theme-toggle"
import Image from "next/image"
import { format } from "date-fns"
import { Badge } from "@/components/ui/badge"
import ProjectCard from "./project-card"
import { cn } from "@/lib/utils" 

interface PortfolioProps {
  data: ResumeData
}

export default function Portfolio({ data }: PortfolioProps) {
  const typedRef = useRef<HTMLSpanElement>(null)
  const [activeSection, setActiveSection] = useState("hero")

  // Initialize Typed.js for animated title
  useEffect(() => {
    if (typedRef.current && data.personal.title) {
      const typed = new Typed(typedRef.current, {
        strings: [
          data.personal.title || "Professional Title",
          data.personal.secondaryTitle || "Secondary Title",
        ].filter(Boolean), // Filter out undefined/null strings
        typeSpeed: 50,
        backSpeed: 30,
        backDelay: 2000,
        loop: true,
        showCursor: true,
        cursorChar: "|",
      })

      return () => {
        typed.destroy()
      }
    }
  }, [data.personal.title, data.personal.secondaryTitle])

  // Handle scroll-based section activation
  useEffect(() => {
    const handleScroll = () => {
      const sections = document.querySelectorAll("section[id]")
      const scrollY = window.scrollY

      sections.forEach((section) => {
        const sectionElement = section as HTMLElement
        const sectionTop = sectionElement.offsetTop - 150 // Increased offset for better detection
        const sectionHeight = sectionElement.offsetHeight

        const sectionId = section.getAttribute("id") || ""
        if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
          setActiveSection(sectionId)
        }
      })
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.1,
      },
    },
  }

  const item = {
    hidden: { opacity: 0, y: 30 },
    show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-950 via-gray-900 to-gray-800 text-gray-100">
      {/* Header/Navbar */}
      <header className="sticky top-0 z-50 backdrop-blur-md bg-gray-950/80 border-b border-gray-800/50 shadow-lg">
        <div className="container flex h-20 items-center justify-between px-6">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="text-2xl font-serif tracking-wide bg-clip-text text-transparent bg-gradient-to-r from-amber-400 to-purple-500"
          >
            {data.personal.name || "Your Name"}
          </motion.div>
          <nav className="hidden md:flex items-center gap-8">
            {[
              { id: "about", label: "About" },
              { id: "projects", label: "Projects" },
              { id: "skills", label: "Skills" },
              { id: "experience", label: "Experience" },
              { id: "education", label: "Education" },
              { id: "contact", label: "Contact" },
            ].map((section, index) => (
              <motion.a
                key={section.id}
                href={`#${section.id}`}
                className={cn(
                  "text-sm font-medium uppercase tracking-wider transition-colors duration-300",
                  activeSection === section.id
                    ? "text-amber-400 border-b-2 border-amber-400"
                    : "text-gray-400 hover:text-amber-300"
                )}
                initial={{ opacity: 0, y: -15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                {section.label}
              </motion.a>
            ))}
          </nav>
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="flex items-center gap-4"
          >
            <ThemeToggle />
            <Button
              size="sm"
              className="bg-gradient-to-r from-amber-500 to-purple-500 hover:from-amber-600 hover:to-purple-600 text-gray-900 font-medium"
            >
              Download CV
            </Button>
          </motion.div>
        </div>
      </header>

      {/* Hero Section */}
      <section id="hero" className="min-h-screen py-24 md:py-32 relative overflow-hidden">
        <div className="absolute inset-0 z-0">
          <svg className="absolute top-0 left-0 w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
            <path
              d="M0,0 L100,0 L100,80 Q50,100 0,80 Z"
              fill="url(#hero-gradient)"
              opacity="0.15"
            />
            <defs>
              <linearGradient id="hero-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#f59e0b" />
                <stop offset="100%" stopColor="#a855f7" />
              </linearGradient>
            </defs>
          </svg>
        </div>

        <div className="container grid md:grid-cols-2 gap-12 items-center relative z-10">
          <motion.div
            className="space-y-8"
            variants={container}
            initial="hidden"
            animate="show"
          >
            <motion.div variants={item}>
              <div className="inline-flex px-4 py-2 rounded-full bg-amber-500/10 text-amber-400 text-sm font-medium mb-4">
                Welcome to My Portfolio
              </div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif tracking-tight">
                Hi, I’m{" "}
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-amber-400 to-purple-500">
                  {data.personal.name || "Your Name"}
                </span>
              </h1>
            </motion.div>
            <motion.h2
              variants={item}
              className="text-2xl md:text-3xl text-gray-300 font-light tracking-wide"
            >
              <span ref={typedRef} />
            </motion.h2>
            <motion.p
              variants={item}
              className="text-gray-400 max-w-xl leading-relaxed"
            >
              {data.personal.summary ||
                "A passionate developer crafting innovative solutions with cutting-edge technology."}
            </motion.p>
            <motion.div
              variants={item}
              className="flex gap-4"
            >
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button
                  asChild
                  className="bg-gradient-to-r from-amber-500 to-purple-500 hover:from-amber-600 hover:to-purple-600 text-gray-900"
                >
                  <a href="#contact">Get in Touch</a>
                </Button>
              </motion.div>
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button variant="outline" asChild>
                  <a href="#experience">View My Work</a>
                </Button>
              </motion.div>
            </motion.div>
          </motion.div>
          <motion.div
            variants={container}
            initial="hidden"
            animate="show"
            className="flex justify-center"
          >
            <motion.div
              variants={item}
              className="relative w-64 h-64 md:w-80 md:h-80 rounded-2xl bg-gradient-to-br from-amber-500/10 to-purple-500/10 border-2 border-amber-500/20 overflow-hidden shadow-2xl"
            >
              <Image
                src={data.personal.image || "/placeholder.svg"}
                alt={data.personal.name || "Profile"}
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-gray-900/60 via-transparent to-transparent" />
              <motion.div
                className="absolute -top-6 -right-6 w-20 h-20 rounded-full bg-amber-500/20 flex items-center justify-center animate-bounce-slow"
                animate={{ rotate: 360 }}
                transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
              >
                <span className="text-2xl">👨‍💻</span>
              </motion.div>
              <motion.div
                className="absolute -bottom-6 -left-6 w-16 h-16 rounded-full bg-purple-500/20 flex items-center justify-center animate-pulse"
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <span className="text-xl">🚀</span>
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-24 relative">
        <div className="absolute inset-0 z-0">
          <svg
            className="absolute bottom-0 right-0 w-1/3 h-1/3"
            viewBox="0 0 200 200"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fill="url(#about-gradient)"
              d="M42.8,-65.2C54.9,-56.3,63.7,-43.2,70.1,-28.7C76.5,-14.2,80.5,1.8,77.2,16.2C73.9,30.6,63.3,43.5,50.5,53.9C37.7,64.3,22.7,72.2,5.9,77.1C-10.9,82,-29.5,83.9,-42.3,75.9C-55.1,67.9,-62.1,50,-68.1,32.8C-74.1,15.6,-79.1,-0.9,-76.3,-16.2C-73.6,-31.5,-63.1,-45.6,-49.8,-54.5C-36.5,-63.4,-20.4,-67.1,-3.9,-67.3C12.6,-67.5,30.7,-74.1,42.8,-65.2Z"
              transform="translate(100 100)"
              opacity="0.1"
            />
            <defs>
              <linearGradient id="about-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#f59e0b" />
                <stop offset="100%" stopColor="#a855f7" />
              </linearGradient>
            </defs>
          </svg>
        </div>

        <div className="container relative z-10">
          <motion.div
            className="text-center mb-16"
            variants={container}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
          >
            <motion.div variants={item}>
              <div className="inline-flex px-4 py-2 rounded-full bg-amber-500/10 text-amber-400 text-sm font-medium mb-4">
                About Me
              </div>
              <h2 className="text-4xl font-serif tracking-tight">Get to Know Me Better</h2>
            </motion.div>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-12">
            <motion.div
              variants={item}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
              className="space-y-6"
            >
              <p className="text-gray-400 leading-relaxed">
                {data.personal.summary ||
                  "A passionate developer with a knack for creating innovative solutions using modern technologies."}
              </p>
              <p className="text-gray-400">
                Based in{" "}
                <span className="font-medium text-gray-200">{data.personal.location || "Your Location"}</span>
              </p>
              <div className="flex gap-3 pt-4">
                {[
                  { icon: Linkedin, link: data.personal.socialLinks?.linkedin, label: "LinkedIn" },
                  { icon: Github, link: data.personal.socialLinks?.github, label: "GitHub" },
                  { icon: Twitter, link: data.personal.socialLinks?.twitter, label: "Twitter" },
                  { icon: Instagram, link: data.personal.socialLinks?.instagram, label: "Instagram" },
                  { icon: Mail, link: data.personal.email && `mailto:${data.personal.email}`, label: "Email" },
                ]
                  .filter((social) => social.link)
                  .map((social, i) => (
                    <motion.div
                      key={i}
                      variants={item}
                      whileHover={{ scale: 1.1, rotate: 5 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <Button
                        variant="outline"
                        size="icon"
                        className="rounded-full bg-gray-800/50 hover:bg-amber-500/20 border-gray-700/50"
                        asChild
                      >
                        <a
                          href={social.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          aria-label={social.label}
                        >
                          <social.icon className="h-5 w-5 text-gray-300 hover:text-amber-400" />
                        </a>
                      </Button>
                    </motion.div>
                  ))}
              </div>
            </motion.div>

            <motion.div
              variants={container}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
              className="grid grid-cols-2 gap-6"
            >
              {[
                { title: "Experience", value: data.experience?.length || 0, unit: "Years" },
                { title: "Education", value: data.education?.length || 0, unit: "Degrees" },
                { title: "Projects", value: data.projects?.length || 0, unit: "Projects" },
                { title: "Skills", value: data.skills?.length || 0, unit: "Skills" },
              ].map((stat, index) => (
                <motion.div
                  key={index}
                  variants={item}
                  className="p-6 rounded-xl bg-gradient-to-br from-amber-500/10 to-purple-500/10 border border-amber-500/20 shadow-md hover:shadow-lg transition-shadow"
                >
                  <h3 className="text-sm font-medium text-gray-400 mb-2">{stat.title}</h3>
                  <p className="text-3xl font-serif bg-clip-text text-transparent bg-gradient-to-r from-amber-400 to-purple-500">
                    {stat.value} {stat.unit}
                  </p>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="py-24 bg-gray-900/50">
        <div className="container">
          <motion.div
            className="text-center mb-16"
            variants={container}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
          >
            <motion.h2
              variants={item}
              className="text-4xl font-bold tracking-tight"
            >
              Projects
            </motion.h2>
            <motion.p
              variants={item}
              className="text-gray-400 mt-4 max-w-xl mx-auto"
            >
              Some of my recent work and contributions
            </motion.p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {data.projects?.map((project, index) => (
              <ProjectCard key={index} {...project} index={index} />
            ))}
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className="py-24 bg-gradient-to-b from-gray-950 to-gray-900">
        <div className="container">
          <motion.div
            className="text-center mb-16"
            variants={container}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
          >
            <motion.h2
              variants={item}
              className="text-4xl font-bold tracking-tight"
            >
              Skills
            </motion.h2>
            <motion.p
              variants={item}
              className="text-gray-400 mt-4 max-w-xl mx-auto"
            >
              Technologies and tools I master
            </motion.p>
          </motion.div>

          <motion.div
            className="flex flex-wrap justify-center gap-4"
            variants={container}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
          >
            {data.skills?.map((skill, index) => (
              <motion.div
                key={index}
                variants={item}
                whileHover={{ scale: 1.1, boxShadow: "0 0 15px rgba(255, 193, 7, 0.3)" }}
                whileTap={{ scale: 0.95 }}
              >
                <Badge className="px-4 py-2 text-lg bg-amber-500/10 text-amber-400 border border-amber-500/20 hover:bg-amber-500/20 transition-all duration-300">
                  {skill}
                </Badge>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Experience Section */}
      {data.experience && data.experience.length > 0 && (
        <section id="experience" className="py-24 bg-gray-900/50 relative">
          <div className="absolute inset-0 z-0">
            <svg
              className="absolute top-0 left-0 w-1/4 h-1/4"
              viewBox="0 0 200 200"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill="url(#exp-gradient)"
                d="M39.9,-65.7C51.1,-58.5,59.2,-46.3,63.5,-33.4C67.8,-20.6,68.2,-7.1,67.4,6.5C66.5,20.1,64.3,33.8,56.8,43.9C49.3,54,36.5,60.5,23.1,65.2C9.7,69.9,-4.3,72.8,-17.9,70.1C-31.5,67.4,-44.7,59.1,-54.4,47.7C-64.1,36.3,-70.3,21.8,-72.8,6.3C-75.3,-9.2,-74.1,-25.7,-66.4,-38.1C-58.7,-50.5,-44.5,-58.8,-30.8,-64.5C-17.1,-70.2,-3.9,-73.3,8.1,-71.7C20.1,-70.1,28.7,-72.9,39.9,-65.7Z"
                transform="translate(100 100)"
                opacity="0.1"
              />
              <defs>
                <linearGradient id="exp-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#f59e0b" />
                  <stop offset="100%" stopColor="#a855f7" />
                </linearGradient>
              </defs>
            </svg>
          </div>

          <div className="container relative z-10">
            <motion.div
              className="text-center mb-16"
              variants={container}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
            >
              <motion.div variants={item}>
                <div className="inline-flex px-4 py-2 rounded-full bg-amber-500/10 text-amber-400 text-sm font-medium mb-4">
                  My Experience
                </div>
                <h2 className="text-4xl font-serif tracking-tight">Professional Journey</h2>
              </motion.div>
            </motion.div>

            <div className="space-y-8">
              {data.experience.map((exp, index) => (
                <motion.div
                  key={index}
                  className="bg-gray-950/50 p-6 rounded-xl border border-amber-500/20 shadow-md hover:shadow-lg hover:-translate-y-2 transition-all duration-300"
                  variants={item}
                  initial="hidden"
                  whileInView="show"
                  viewport={{ once: true }}
                  custom={index}
                >
                  <div className="flex flex-col md:flex-row md:items-center justify-between mb-4 gap-4">
                    <div>
                      <h3 className="text-xl font-serif bg-clip-text text-transparent bg-gradient-to-r from-amber-400 to-purple-500">
                        {exp.title || "Job Title"}
                      </h3>
                      <div className="flex items-center gap-2 text-gray-400">
                        <p>{exp.company || "Company Name"}</p>
                        {exp.link && (
                          <a
                            href={exp.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-amber-400 hover:text-amber-300 transition-colors"
                          >
                            <ExternalLink className="h-4 w-4" />
                          </a>
                        )}
                      </div>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-500 px-3 py-1 rounded-full bg-amber-500/10">
                      <Calendar className="h-4 w-4 text-amber-400" />
                      <span>
                        {exp.startDate
                          ? format(new Date(exp.startDate), "MMMM yyyy")
                          : "Start Date"}{" "}
                        -{" "}
                        {exp.endDate
                          ? format(new Date(exp.endDate), "MMMM yyyy")
                          : "Present"}
                      </span>
                    </div>
                  </div>
                  <p className="text-gray-400 text-sm leading-relaxed">
                    {exp.description ||
                      "Description of your responsibilities and achievements in this role."}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Education Section */}
      <section id="education" className="py-24 relative">
        <div className="absolute inset-0 z-0">
          <svg
            className="absolute bottom-0 right-0 w-1/3 h-1/3"
            viewBox="0 0 200 200"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fill="url(#edu-gradient)"
              d="M45.3,-75.3C58.3,-67.3,68.3,-53.9,76.5,-39.1C84.7,-24.3,91.2,-8.2,88.8,6.9C86.5,21.9,75.3,35.9,63.3,47.9C51.3,59.9,38.5,69.9,23.8,75.8C9.2,81.7,-7.3,83.5,-22.6,79.5C-37.9,75.5,-51.9,65.7,-62.7,52.9C-73.5,40.1,-81.1,24.3,-83.1,7.6C-85.1,-9.1,-81.5,-26.7,-72.6,-40.8C-63.7,-54.9,-49.5,-65.5,-35,-73.2C-20.5,-80.9,-5.7,-85.7,8.5,-83.8C22.7,-81.9,32.3,-83.3,45.3,-75.3Z"
              transform="translate(100 100)"
              opacity="0.1"
            />
            <defs>
              <linearGradient id="edu-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#f59e0b" />
                <stop offset="100%" stopColor="#a855f7" />
              </linearGradient>
            </defs>
          </svg>
        </div>

        <div className="container relative z-10">
          <motion.div
            className="text-center mb-16"
            variants={container}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
          >
            <motion.div variants={item}>
              <div className="inline-flex px-4 py-2 rounded-full bg-amber-500/10 text-amber-400 text-sm font-medium mb-4">
                My Education
              </div>
              <h2 className="text-4xl font-serif tracking-tight">Academic Background</h2>
            </motion.div>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8">
            {data.education && data.education.length > 0 ? (
              data.education.map((edu, index) => (
                <motion.div
                  key={index}
                  className="p-6 rounded-xl bg-gradient-to-br from-amber-500/10 to-purple-500/10 border border-amber-500/20 shadow-md hover:shadow-lg hover:-translate-y-2 transition-all duration-300"
                  variants={item}
                  initial="hidden"
                  whileInView="show"
                  viewport={{ once: true }}
                  custom={index}
                >
                  <h3 className="text-xl font-serif bg-clip-text text-transparent bg-gradient-to-r from-amber-400 to-purple-500">
                    {edu.degree || "Degree"}
                  </h3>
                  <p className="text-gray-400 mb-2">{edu.institution || "Institution"}</p>
                  <div className="flex items-center gap-2 text-sm text-gray-500 px-3 py-1 rounded-full bg-amber-500/10">
                    <Calendar className="h-4 w-4 text-amber-400" />
                    <span>
                      {edu.startDate
                        ? format(new Date(edu.startDate), "MMMM yyyy")
                        : "Start Date"}{" "}
                      -{" "}
                      {edu.endDate
                        ? format(new Date(edu.endDate), "MMMM yyyy")
                        : "Present"}
                    </span>
                  </div>
                  {edu.description && <p className="text-gray-400 text-sm">{edu.description}</p>}
                </motion.div>
              ))
            ) : (
              <motion.div
                className="p-6 rounded-xl border text-center md:col-span-2"
                variants={item}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true }}
              >
                <p className="text-gray-400">No education data available.</p>
              </motion.div>
            )}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-24 bg-gray-900/50">
        <div className="container">
          <motion.div
            className="text-center mb-16"
            variants={container}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
          >
            <motion.h2
              variants={item}
              className="text-4xl font-bold tracking-tight"
            >
              Contact
            </motion.h2>
            <motion.p
              variants={item}
              className="text-gray-400 mt-4 max-w-xl mx-auto"
            >
              Let’s connect and create something amazing together!
            </motion.p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-12 max-w-4xl mx-auto">
            <motion.div
              variants={item}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
              className="space-y-8"
            >
              <p className="text-gray-400 leading-relaxed">
                I’m excited to discuss new projects, ideas, or opportunities. Feel free to reach out!
              </p>
              <div className="space-y-6">
                {[
                  {
                    icon: Mail,
                    label: "Email",
                    value: data.personal.email,
                    link: data.personal.email && `mailto:${data.personal.email}`,
                  },
                  {
                    icon: Phone,
                    label: "Phone",
                    value: data.personal.phone,
                    link: data.personal.phone && `tel:${data.personal.phone}`,
                  },
                  { icon: MapPin, label: "Location", value: data.personal.location },
                ]
                  .filter((item) => item.value)
                  .map((item, i) => (
                    <motion.div
                      key={i}
                      variants={item}
                      className="flex items-center gap-4"
                    >
                      <div className="p-3 rounded-full bg-amber-500/10">
                        <item.icon className="w-6 h-6 text-amber-400" />
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">{item.label}</p>
                        {item.link ? (
                          <a
                            href={item.link}
                            className="font-medium text-gray-200 hover:text-amber-400 transition-colors"
                          >
                            {item.value}
                          </a>
                        ) : (
                          <p className="font-medium text-gray-200">{item.value}</p>
                        )}
                      </div>
                    </motion.div>
                  ))}
              </div>
            </motion.div>

            <motion.div
              variants={item}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
              className="space-y-6 bg-gray-950/50 p-6 rounded-xl border border-amber-500/20 shadow-md"
            >
              <div className="space-y-4">
                {["name", "email"].map((field) => (
                  <div key={field} className="space-y-2">
                    <label htmlFor={field} className="block text-sm text-gray-500 capitalize">
                      {field}
                    </label>
                    <input
                      type={field === "email" ? "email" : "text"}
                      id={field}
                      className="w-full px-4 py-2 rounded-md border border-gray-700 bg-gray-900/50 text-gray-200 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-amber-500/50 transition-all"
                      placeholder={`Your ${field}`}
                      required
                    />
                  </div>
                ))}
                <div className="space-y-2">
                  <label htmlFor="message" className="block text-sm text-gray-500">
                    Message
                  </label>
                  <textarea
                    id="message"
                    rows={5}
                    className="w-full px-4 py-2 rounded-md border border-gray-700 bg-gray-900/50 text-gray-200 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-amber-500/50 resize-none transition-all"
                    placeholder="Your message"
                    required
                  />
                </div>
                <Button className="w-full bg-amber-500 hover:bg-amber-600 text-gray-900 font-medium py-2 transition-all">
                  Send Message
                </Button>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  )
}

