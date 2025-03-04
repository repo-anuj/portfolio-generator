"use client"

import { useState, useEffect, useRef } from "react"
import { motion } from "framer-motion"
import Link from "next/link"
import Image from "next/image"
import Typed from "typed.js"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ThemeToggle } from "@/components/theme-toggle"
import {
  Instagram,
  Linkedin,
  Github,
  Twitter,
  ExternalLink,
  Home,
  User2,
  Briefcase,
  GraduationCap,
  Code,
  ArrowRight,
  Brain,
  Menu,
  X,
} from "lucide-react"
import type { ResumeData } from "@/lib/types"

export default function PortfolioThemeBrice({ data }: { data: ResumeData }) {
  const [activeSection, setActiveSection] = useState("home")
  const [mounted, setMounted] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const typedRef = useRef<HTMLSpanElement>(null)

  useEffect(() => {
    setMounted(true)

    // Typed.js for typing effect
    if (typedRef.current) {
      const typed = new Typed(typedRef.current, {
        strings: ["design", "develop", "create"],
        typeSpeed: 100,
        backSpeed: 50,
        backDelay: 1500,
        loop: true,
      })
      return () => typed.destroy()
    }

    // Scroll handling
    const handleScroll = () => {
      const sections = ["home", "about", "experience", "education", "projects", "skills"]
      const scrollPosition = window.scrollY + 100

      for (const section of sections) {
        const element = document.getElementById(section)
        if (element) {
          const offsetTop = element.offsetTop
          const offsetHeight = element.offsetHeight
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(section)
            break
          }
        }
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  if (!mounted) return null

  const toggleMobileMenu = () => setMobileMenuOpen(!mobileMenuOpen)

  const getSocialIcon = (platform: string) => {
    switch (platform.toLowerCase()) {
      case "github": return <Github className="h-5 w-5" />
      case "linkedin": return <Linkedin className="h-5 w-5" />
      case "twitter": return <Twitter className="h-5 w-5" />
      case "instagram": return <Instagram className="h-5 w-5" />
      default: return <ExternalLink className="h-5 w-5" />
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900 dark:bg-gray-900 dark:text-gray-100 transition-colors duration-300">
      {/* Theme Toggle Bar */}
      <div className="sticky top-0 left-0 right-0 z-50 flex items-center justify-between bg-white/80 dark:bg-gray-800/80 px-4 py-2 backdrop-blur-md border-b border-gray-200 dark:border-gray-700 md:px-8">
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon" className="md:hidden" onClick={toggleMobileMenu}>
            {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
          <span className="font-bold text-blue-600 dark:text-blue-400">{data.personal.name}</span>
        </div>
        <ThemeToggle />
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <motion.div
          initial={{ opacity: 0, x: -100 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -100 }}
          className="fixed inset-0 z-40 bg-white dark:bg-gray-800 pt-16"
        >
          <div className="flex flex-col p-8 space-y-6">
            <div className="mb-8">
              {data.personal.image ? (
                <Image
                  src={data.personal.image || "/placeholder.svg"}
                  alt={data.personal.name || "Profile"}
                  width={100}
                  height={100}
                  className="rounded-full mx-auto"
                />
              ) : (
                <div className="h-24 w-24 rounded-full bg-gray-200 dark:bg-gray-700 mx-auto" />
              )}
            </div>
            {["home", "about", "experience", "education", "projects", "skills"].map((section) => (
              <Link
                key={section}
                href={`#${section}`}
                className={cn(
                  "flex items-center gap-3 text-lg font-medium transition-colors hover:text-blue-600 dark:hover:text-blue-400",
                  activeSection === section ? "text-blue-600 dark:text-blue-400" : "text-gray-600 dark:text-gray-400"
                )}
                onClick={() => {
                  setActiveSection(section)
                  setMobileMenuOpen(false)
                }}
                scroll={true} // Smooth scroll enabled
              >
                {section === "home" && <Home className="h-5 w-5" />}
                {section === "about" && <User2 className="h-5 w-5" />}
                {section === "experience" && <Briefcase className="h-5 w-5" />}
                {section === "education" && <GraduationCap className="h-5 w-5" />}
                {section === "projects" && <Code className="h-5 w-5" />}
                {section === "skills" && <Brain className="h-5 w-5" />}
                {section.charAt(0).toUpperCase() + section.slice(1)}
              </Link>
            ))}
            <div className="mt-auto pt-8">
              <div className="flex gap-4">
                {data.personal.socialLinks &&
                  Object.entries(data.personal.socialLinks).map(([platform, url]) =>
                    url && (
                      <Link key={platform} href={url} className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400" target="_blank">
                        {getSocialIcon(platform)}
                      </Link>
                    )
                  )}
              </div>
            </div>
          </div>
        </motion.div>
      )}

      {/* Sidebar Navigation (Desktop) */}
      <nav className="fixed left-0 top-[73px] hidden h-full w-[300px] border-r border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 p-6 pt-20 md:block">
        <div className="flex h-full flex-col">
          <div className="mb-6">
            {data.personal.image ? (
              <Image
                src={data.personal.image || "/placeholder.svg"}
                alt={data.personal.name || "Profile"}
                width={160}
                height={160}
                className="rounded-full shadow-md"
              />
            ) : (
              <div className="h-40 w-40 rounded-full bg-gray-200 dark:bg-gray-700 shadow-md" />
            )}
          </div>
          <div className="space-y-6">
            {["home", "about", "experience", "education", "projects", "skills"].map((section) => (
              <Link
                key={section}
                href={`#${section}`}
                className={cn(
                  "flex items-center gap-3 text-lg font-medium transition-colors duration-200 hover:text-blue-600 dark:hover:text-blue-400",
                  activeSection === section ? "text-blue-600 dark:text-blue-400" : "text-gray-600 dark:text-gray-400"
                )}
                onClick={() => setActiveSection(section)}
                scroll={true}
              >
                {section === "home" && <Home className="h-5 w-5" />}
                {section === "about" && <User2 className="h-5 w-5" />}
                {section === "experience" && <Briefcase className="h-5 w-5" />}
                {section === "education" && <GraduationCap className="h-5 w-5" />}
                {section === "projects" && <Code className="h-5 w-5" />}
                {section === "skills" && <Brain className="h-5 w-5" />}
                {section.charAt(0).toUpperCase() + section.slice(1)}
              </Link>
            ))}
          </div>
          <div className="mt-auto">
            <div className="flex gap-4">
              {data.personal.socialLinks &&
                Object.entries(data.personal.socialLinks).map(([platform, url]) =>
                  url && (
                    <Link key={platform} href={url} className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors" target="_blank">
                      {getSocialIcon(platform)}
                    </Link>
                  )
                )}
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="md:ml-[300px] pt-16 scroll-smooth">
        {/* Hero Section */}
        <section
          id="home"
          className="relative min-h-[calc(100vh-4rem)] bg-gradient-to-br from-gray-100 to-blue-100 dark:from-gray-800 dark:to-blue-900 px-6 py-16 md:px-12 md:py-24"
        >
          <div className="absolute right-8 top-8 hidden md:block">
            <Button className="bg-blue-600 dark:bg-blue-500 px-6 py-6 text-white hover:bg-blue-700 dark:hover:bg-blue-600 shadow-lg transition-transform duration-300 hover:scale-105" asChild>
              <Link href="#contact">
                Work<br />with me
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
          <div className="space-y-6">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="flex items-baseline gap-4"
            >
              <span className="text-xl text-gray-400 dark:text-gray-500">01</span>
              <h1 className="text-4xl md:text-6xl font-bold">
                Hello, I'm <span className="text-blue-600 dark:text-blue-400">{data.personal.name}!</span>
              </h1>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
              className="flex items-baseline gap-4"
            >
              <span className="text-xl text-gray-400 dark:text-gray-500">02</span>
              <h2 className="text-3xl md:text-5xl font-medium">
                I <span className="text-blue-600 dark:text-blue-400" ref={typedRef}/>
              </h2>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
              className="flex items-baseline gap-4"
            >
              <span className="text-xl text-gray-400 dark:text-gray-500">03</span>
              <h2 className="text-3xl md:text-5xl font-medium">websites.</h2>
            </motion.div>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.6, ease: "easeOut" }}
              className="mt-8 max-w-2xl text-lg md:text-xl text-gray-600 dark:text-gray-300"
            >
              {data.personal.summary}
            </motion.p>
            <div className="mt-8 md:hidden">
              <Button className="bg-blue-600 dark:bg-blue-500 text-white hover:bg-blue-700 dark:hover:bg-blue-600 w-full shadow-lg transition-transform duration-300 hover:scale-105" asChild>
                <Link href="#contact">
                  Work with me
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>
        </section>

        {/* About Section */}
        <section id="about" className="bg-white dark:bg-gray-800 px-6 py-16 md:px-12 md:py-24">
          <div className="grid gap-12 md:grid-cols-2">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            >
              <h2 className="mb-6 text-3xl font-bold text-gray-900 dark:text-gray-100">{data.personal.name}</h2>
              <p className="mb-4 text-gray-600 dark:text-gray-400">{data.personal.location}</p>
              <div className="prose max-w-none">
                <p className="text-xl font-medium text-gray-900 dark:text-gray-100">
                  I design and develop websites that are elegant, intuitive, and accessible.
                </p>
                <p className="mt-4 text-gray-600 dark:text-gray-400">{data.personal.summary}</p>
              </div>
              {data.personal.socialLinks?.linkedin && (
                <Link
                  href={data.personal.socialLinks.linkedin}
                  className="mt-8 inline-flex items-center text-blue-600 dark:text-blue-400 hover:underline transition-colors duration-200"
                  target="_blank"
                >
                  Discover my journey on LinkedIn <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              )}
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            >
              <div className="mb-8">
                <h3 className="mb-4 text-lg font-medium text-gray-900 dark:text-gray-100">Contact Information</h3>
                <ul className="space-y-2 text-gray-600 dark:text-gray-400">
                  {data.personal.email && <li><strong>Email:</strong> {data.personal.email}</li>}
                  {data.personal.phone && <li><strong>Phone:</strong> {data.personal.phone}</li>}
                  {data.personal.location && <li><strong>Location:</strong> {data.personal.location}</li>}
                  {data.personal.website && (
                    <li>
                      <strong>Website:</strong>{" "}
                      <Link href={data.personal.website} className="text-blue-600 dark:text-blue-400 hover:underline" target="_blank">
                        {data.personal.website.replace(/^https?:\/\//, "")}
                      </Link>
                    </li>
                  )}
                </ul>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Experience Section */}
        <section id="experience" className="bg-gray-50 dark:bg-gray-900 px-6 py-16 md:px-12 md:py-24">
          <h2 className="mb-12 text-3xl font-bold text-gray-900 dark:text-gray-100">Work Experience</h2>
          <div className="space-y-12">
            {data.experience?.map((job, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.1, ease: "easeOut" }}
                className="relative border-l-2 border-blue-600 dark:border-blue-400 pl-8 pb-8"
              >
                <div className="absolute -left-[9px] top-0 h-4 w-4 rounded-full bg-blue-600 dark:bg-blue-400" />
                <div>
                  <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100">{job.position}</h3>
                  <p className="text-lg text-blue-600 dark:text-blue-400">{job.company}</p>
                  <p className="text-gray-600 dark:text-gray-400">{job.startDate} - {job.endDate || "Present"}</p>
                  <p className="text-gray-600 dark:text-gray-400">{job.location}</p>
                  <div className="mt-4 prose text-gray-700 dark:text-gray-300">
                    <p>{job.description}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Education Section */}
        <section id="education" className="bg-white dark:bg-gray-800 px-6 py-16 md:px-12 md:py-24">
          <h2 className="mb-12 text-3xl font-bold text-gray-900 dark:text-gray-100">Education</h2>
          <div className="space-y-12">
            {data.education?.map((edu, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.1, ease: "easeOut" }}
                className="relative border-l-2 border-blue-600 dark:border-blue-400 pl-8 pb-8"
              >
                <div className="absolute -left-[9px] top-0 h-4 w-4 rounded-full bg-blue-600 dark:bg-blue-400" />
                <div>
                  <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100">{edu.degree}</h3>
                  <p className="text-lg text-blue-600 dark:text-blue-400">{edu.institution}</p>
                  <p className="text-gray-600 dark:text-gray-400">{edu.startDate} - {edu.endDate || "Present"}</p>
                  {edu.location && <p className="text-gray-600 dark:text-gray-400">{edu.location}</p>}
                  {edu.description && (
                    <div className="mt-4 prose text-gray-700 dark:text-gray-300">
                      <p>{edu.description}</p>
                    </div>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Projects Section */}
        <section id="projects" className="bg-gray-50 dark:bg-gray-900 px-6 py-16 md:px-12 md:py-24">
          <h2 className="mb-12 flex items-center gap-2 text-3xl font-bold text-gray-900 dark:text-gray-100">
            My best projects <span className="text-2xl">✨</span>
          </h2>
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            {data.projects?.map((project, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                whileHover={{ scale: 1.03 }}
                transition={{ duration: 0.8, delay: index * 0.1, ease: "easeOut" }}
              >
                <Card className="group relative overflow-hidden rounded-xl h-full shadow-lg dark:shadow-gray-700">
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-purple-50 dark:from-blue-900 dark:to-purple-900 opacity-20" />
                  {project.image && (
                    <div className="relative aspect-video overflow-hidden">
                      <Image
                        src={project.image || "/placeholder.svg"}
                        alt={project.name || "Project preview"}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                        {project.link && (
                          <Button size="sm" variant="secondary" asChild className="hover:bg-blue-600 hover:text-white transition-colors">
                            <a href={project.link} target="_blank" rel="noopener noreferrer">
                              <ExternalLink className="h-4 w-4 mr-2" />
                              Visit Project
                            </a>
                          </Button>
                        )}
                      </div>
                    </div>
                  )}
                  <div className="relative z-10 p-6">
                    <h3 className="mb-2 text-xl font-bold text-gray-900 dark:text-gray-100">{project.name}</h3>
                    <p className="mb-4 text-gray-600 dark:text-gray-400">{project.description}</p>
                    {project.technologies && (
                      <div className="flex flex-wrap gap-2 mt-4">
                        {project.technologies.split(",").map((tech, i) => (
                          <Badge key={i} variant="secondary" className="bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300">
                            {tech.trim()}
                          </Badge>
                        ))}
                      </div>
                    )}
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Skills Section */}
        <section id="skills" className="bg-white dark:bg-gray-800 px-6 py-16 md:px-12 md:py-24">
          <h2 className="mb-12 text-3xl font-bold text-gray-900 dark:text-gray-100">Skills & Technologies</h2>
          <div className="grid gap-8 md:grid-cols-2">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            >
              <h3 className="mb-6 text-xl font-medium text-gray-900 dark:text-gray-100">Technical Skills</h3>
              <div className="flex flex-wrap gap-3">
                {data.skills?.map((skill, index) => (
                  <Badge key={index} variant="outline" className="px-4 py-2 text-sm bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 shadow-sm hover:bg-blue-100 dark:hover:bg-blue-900 transition-colors">
                    {skill}
                  </Badge>
                ))}
              </div>
            </motion.div>
            {data.certifications && data.certifications.length > 0 && (
              <motion.div
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
              >
                <h3 className="mb-6 text-xl font-medium text-gray-900 dark:text-gray-100">Certifications</h3>
                <ul className="space-y-3">
                  {data.certifications.map((cert, index) => (
                    <li key={index} className="flex items-start">
                      <div className="mr-2 mt-1 text-blue-600 dark:text-blue-400">•</div>
                      <div>
                        <div className="font-medium text-gray-900 dark:text-gray-100">{cert.name}</div>
                        {cert.issuer && <div className="text-sm text-gray-600 dark:text-gray-400">{cert.issuer}</div>}
                        {cert.date && <div className="text-sm text-gray-600 dark:text-gray-400">{cert.date}</div>}
                      </div>
                    </li>
                  ))}
                </ul>
              </motion.div>
            )}
          </div>
        </section>

        {/* Contact Section */}
        <section
          id="contact"
          className="bg-gradient-to-br from-blue-600 to-blue-800 dark:from-blue-800 dark:to-blue-900 px-6 py-16 text-white md:px-12 md:py-24"
        >
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="mx-auto max-w-3xl text-center"
          >
            <h2 className="mb-6 text-3xl font-bold">Let's Work Together</h2>
            <p className="mb-8 text-lg">
              I'm currently available for freelance work. If you have a project that you want to get started, think you need my help with something, or just want to say hello, then get in touch.
            </p>
            <Button className="bg-white dark:bg-gray-100 px-8 py-6 text-blue-600 dark:text-blue-800 hover:bg-gray-100 dark:hover:bg-gray-200 shadow-lg transition-transform duration-300 hover:scale-105" asChild>
              <Link href={`mailto:${data.personal.email || ""}`}>
                Get in Touch
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </motion.div>
        </section>

        {/* Footer */}
        <footer className="border-t border-gray-200 dark:border-gray-700 px-6 py-8 md:px-12 bg-white dark:bg-gray-800">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-4 md:mb-0">
              © {new Date().getFullYear()} {data.personal.name}
            </p>
            <div className="flex gap-4">
              <Link href="#" className="text-sm text-gray-600 dark:text-gray-400 hover:underline transition-colors">
                Privacy Policy
              </Link>
              <Link href="#" className="text-sm text-gray-600 dark:text-gray-400 hover:underline transition-colors">
                Legal Notice
              </Link>
            </div>
          </div>
        </footer>
      </main>
    </div>
  )
}