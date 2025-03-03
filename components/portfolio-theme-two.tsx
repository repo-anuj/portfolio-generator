"use client"

import type { ResumeData } from "@/lib/types"
import { Calendar, ExternalLink, Github, Linkedin, Mail, MapPin, Phone, Twitter } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { motion } from "framer-motion"
import { useEffect, useState } from "react"
import Image from "next/image"
import { format } from "date-fns"
import { cn } from "@/lib/utils"

interface PortfolioThemeTwoProps {
  data: ResumeData
}

export default function PortfolioThemeTwo({ data }: PortfolioThemeTwoProps) {
  const [activeSection, setActiveSection] = useState<string>("about")

  useEffect(() => {
    const handleScroll = () => {
      const sections = document.querySelectorAll("section[id]")
      let currentSection = "about"
      sections.forEach((section) => {
        const sectionTop = section.getBoundingClientRect().top
        if (sectionTop <= 150) {
          currentSection = section.id
        }
      })
      setActiveSection(currentSection)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const fadeIn = {
    initial: { opacity: 0, y: 30 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.8, ease: "easeOut" },
  }

  const stagger = {
    animate: {
      transition: {
        staggerChildren: 0.15,
      },
    },
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-950 to-gray-900 text-gray-100">
      <header className="sticky top-0 left-0 w-full z-50 bg-gray-950/95 backdrop-blur-lg border-b border-gray-800/50 shadow-lg">
        <div className="container mx-auto px-6 py-4 flex items-center justify-between">
          <motion.div 
            initial={{ opacity: 0, x: -20 }} 
            animate={{ opacity: 1, x: 0 }} 
            className="text-2xl font-semibold tracking-tight"
          >
            {data.personal.name}
          </motion.div>
          <nav className="hidden md:flex items-center gap-10">
            {["about", "projects", "skills", "experience", "education", "contact"].map((section, index) => (
              <motion.a
                key={section}
                href={`#${section}`}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className={cn(
                  "text-sm font-medium tracking-wide uppercase transition-all duration-300",
                  activeSection === section 
                    ? "text-amber-400 border-b-2 border-amber-400" 
                    : "text-gray-400 hover:text-amber-300"
                )}
              >
                {section}
              </motion.a>
            ))}
          </nav>
        </div>
      </header>

      <main className="pt-0">
        {/* Intro Section */}
        <section id="about" className="min-h-screen flex items-center justify-center py-24 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-amber-500/10 via-transparent to-purple-500/10" />
          <div className="container mx-auto px-6">
            <motion.div variants={stagger} initial="initial" animate="animate" className="max-w-3xl mx-auto text-center">
              <motion.div variants={fadeIn}>
                <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-6 bg-clip-text text-transparent bg-gradient-to-r from-amber-400 to-purple-400">
                  {data.personal.name}
                </h1>
                <p className="text-xl md:text-2xl text-gray-300 font-light tracking-wide">{data.personal.title}</p>
                {data.personal.secondaryTitle && (
                  <p className="text-lg text-gray-400 mt-3 font-light italic">{data.personal.secondaryTitle}</p>
                )}
              </motion.div>

              {data.personal.image && (
                <motion.div variants={fadeIn} className="my-10 flex justify-center">
                  <div className="relative w-64 h-64 rounded-2xl overflow-hidden border-4 border-gray-800/50 shadow-2xl">
                    <Image src={data.personal.image} alt={data.personal.name} fill className="object-cover" />
                    <div className="absolute inset-0 bg-gradient-to-t from-gray-900/70 via-transparent to-transparent" />
                  </div>
                </motion.div>
              )}

              <motion.p variants={fadeIn} className="text-lg text-gray-300 max-w-2xl mx-auto leading-relaxed">
                {data.personal.summary}
              </motion.p>

              <motion.div variants={fadeIn} className="mt-8 flex justify-center gap-4">
                {[
                  { icon: Github, link: data.personal.socialLinks?.github },
                  { icon: Linkedin, link: data.personal.socialLinks?.linkedin },
                  { icon: Twitter, link: data.personal.socialLinks?.twitter },
                  { icon: Mail, link: data.personal.email && `mailto:${data.personal.email}` },
                ].map((social, i) => social.link && (
                  <a
                    key={i}
                    href={social.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-3 rounded-full bg-gray-800/50 hover:bg-amber-500/20 transition-all duration-300 border border-gray-700/50 hover:border-amber-500/50"
                  >
                    <social.icon className="w-5 h-5 text-gray-300 hover:text-amber-400" />
                  </a>
                ))}
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* Projects Section */}
        <section id="projects" className="py-24 bg-gray-950">
          <div className="container mx-auto px-6">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="max-w-3xl mx-auto text-center mb-16"
            >
              <h2 className="text-4xl font-bold tracking-tight text-amber-400">Projects</h2>
              <p className="text-gray-400 mt-4 max-w-xl mx-auto">A showcase of my creative and technical endeavors</p>
            </motion.div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {data.projects?.map((project, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="group relative rounded-xl bg-gray-900/50 border border-gray-800/50 hover:border-amber-500/30 shadow-lg overflow-hidden"
                >
                  <div className="relative aspect-video overflow-hidden">
                    <Image
                      src={project.image || "/placeholder.svg"}
                      alt={project.name || "Project"}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-gray-900/80 via-transparent to-transparent opacity-70 group-hover:opacity-90 transition-opacity duration-300 flex items-end justify-center p-6">
                      {project.link && (
                        <a
                          href={project.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="px-4 py-2 bg-amber-500/20 text-amber-300 border border-amber-500/40 rounded-full hover:bg-amber-500/30 transition-all duration-300"
                        >
                          Explore Project
                        </a>
                      )}
                    </div>
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-semibold text-gray-100 mb-2">{project.name}</h3>
                    <p className="text-gray-400 text-sm leading-relaxed mb-4">{project.description}</p>
                    <div className="flex flex-wrap gap-2">
                      {project.technologies?.split(",").map((tech, i) => (
                        <Badge 
                          key={i} 
                          className="bg-amber-500/10 text-amber-300 border border-amber-500/20 hover:bg-amber-500/20 transition-colors"
                        >
                          {tech.trim()}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Experience Section */}
        {data.experience && data.experience.length > 0 && (
          <section id="experience" className="py-24 bg-gradient-to-b from-gray-950 to-gray-900">
            <div className="container mx-auto px-6">
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="max-w-3xl mx-auto text-center mb-16"
              >
                <h2 className="text-4xl font-bold tracking-tight text-amber-400">Experience</h2>
                <p className="text-gray-400 mt-4">My professional journey</p>
              </motion.div>

              <div className="max-w-3xl mx-auto space-y-12 relative">
                <div className="absolute left-4 top-0 w-px h-full bg-amber-500/20" />
                {data.experience?.map((exp, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    className="relative pl-12"
                  >
                    <div className="absolute left-2 top-2 w-4 h-4 rounded-full bg-amber-500 border-2 border-gray-900" />
                    <div className="bg-gray-900/50 rounded-xl p-6 border border-gray-800/50 hover:border-amber-500/30 transition-colors">
                      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4">
                        <div>
                          <h3 className="text-xl font-semibold text-gray-100">{exp.title}</h3>
                          <p className="text-amber-400 font-medium">{exp.company}</p>
                        </div>
                        <div className="flex items-center text-gray-400 text-sm">
                          <Calendar className="w-4 h-4 mr-2" />
                          <span>
                            {exp.startDate && format(new Date(exp.startDate), "MMM yyyy")} -{" "}
                            {exp.endDate ? format(new Date(exp.endDate), "MMM yyyy") : "Present"}
                          </span>
                        </div>
                      </div>
                      <p className="text-gray-300 text-sm leading-relaxed">{exp.description}</p>
                      {exp.link && (
                        <a
                          href={exp.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center mt-4 text-amber-400 hover:text-amber-300 transition-colors"
                        >
                          <ExternalLink className="w-4 h-4 mr-2" />
                          View Details
                        </a>
                      )}
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Education Section */}
        <section id="education" className="py-24 bg-gray-950">
          <div className="container mx-auto px-6">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="max-w-3xl mx-auto text-center mb-16"
            >
              <h2 className="text-4xl font-bold tracking-tight text-amber-400">Education</h2>
              <p className="text-gray-400 mt-4">My academic background</p>
            </motion.div>

            <div className="grid md:grid-cols-2 gap-8 max-w-3xl mx-auto">
              {data.education?.map((edu, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-gray-900/50 rounded-xl p-6 border border-gray-800/50 hover:border-amber-500/30 transition-colors"
                >
                  <h3 className="text-xl font-semibold text-gray-100 mb-2">{edu.degree}</h3>
                  <p className="text-amber-400 font-medium mb-3">{edu.institution}</p>
                  <div className="flex items-center text-gray-400 text-sm mb-4">
                    <Calendar className="w-4 h-4 mr-2" />
                    <span>
                      {edu.startDate && format(new Date(edu.startDate), "MMM yyyy")} -{" "}
                      {edu.endDate ? format(new Date(edu.endDate), "MMM yyyy") : "Present"}
                    </span>
                  </div>
                  {edu.description && <p className="text-gray-300 text-sm">{edu.description}</p>}
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Skills Section */}
        <section id="skills" className="py-24 bg-gradient-to-b from-gray-950 to-gray-900">
          <div className="container mx-auto px-6">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="max-w-3xl mx-auto text-center mb-16"
            >
              <h2 className="text-4xl font-bold tracking-tight text-amber-400">Skills</h2>
              <p className="text-gray-400 mt-4">Technical proficiencies and expertise</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="max-w-3xl mx-auto flex flex-wrap justify-center gap-3"
            >
              {data.skills?.map((skill, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.05 }}
                  whileHover={{ scale: 1.1 }}
                >
                  <Badge className="px-4 py-2 bg-amber-500/10 text-amber-300 border border-amber-500/20 hover:bg-amber-500/20 transition-all duration-300 text-sm font-medium">
                    {skill}
                  </Badge>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* Contact Section */}
        <section id="contact" className="py-24 bg-gray-950">
          <div className="container mx-auto px-6">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="max-w-3xl mx-auto text-center mb-16"
            >
              <h2 className="text-4xl font-bold tracking-tight text-amber-400">Get in Touch</h2>
              <p className="text-gray-400 mt-4">Let's collaborate or connect</p>
            </motion.div>

            <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-12">
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="space-y-8"
              >
                <p className="text-gray-300 leading-relaxed">
                  I'm always excited to discuss new projects, creative ideas, or opportunities to be part of your vision.
                </p>
                <div className="space-y-6">
                  {[
                    { icon: Mail, label: "Email", value: data.personal.email, link: `mailto:${data.personal.email}` },
                    { icon: Phone, label: "Phone", value: data.personal.phone, link: `tel:${data.personal.phone}` },
                    { icon: MapPin, label: "Location", value: data.personal.location },
                  ].map((item, i) => item.value && (
                    <div key={i} className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-full bg-amber-500/10 flex items-center justify-center border border-amber-500/20">
                        <item.icon className="w-5 h-5 text-amber-400" />
                      </div>
                      <div>
                        <p className="text-sm text-gray-400">{item.label}</p>
                        {item.link ? (
                          <a href={item.link} className="text-gray-100 hover:text-amber-400 transition-colors">
                            {item.value}
                          </a>
                        ) : (
                          <p className="text-gray-100">{item.value}</p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="bg-gray-900/50 rounded-xl p-6 border border-gray-800/50"
              >
                <form className="space-y-6">
                  <div className="grid grid-cols-2 gap-4">
                    {["name", "email"].map((field) => (
                      <div key={field}>
                        <label htmlFor={field} className="block text-sm text-gray-400 mb-2 capitalize">
                          {field}
                        </label>
                        <input
                          type={field === "email" ? "email" : "text"}
                          id={field}
                          className="w-full px-4 py-3 bg-gray-800/50 border border-gray-700/50 rounded-lg focus:outline-none focus:border-amber-500/50 text-gray-100 placeholder-gray-500 transition-colors"
                          placeholder={`Your ${field}`}
                        />
                      </div>
                    ))}
                  </div>
                  <div>
                    <label htmlFor="message" className="block text-sm text-gray-400 mb-2">
                      Message
                    </label>
                    <textarea
                      id="message"
                      rows={5}
                      className="w-full px-4 py-3 bg-gray-800/50 border border-gray-700/50 rounded-lg focus:outline-none focus:border-amber-500/50 text-gray-100 placeholder-gray-500 resize-none transition-colors"
                      placeholder="Your message"
                    />
                  </div>
                  <Button className="w-full bg-amber-500 hover:bg-amber-600 text-gray-900 font-medium py-3 transition-all duration-300">
                    Send Message
                  </Button>
                </form>
              </motion.div>
            </div>
          </div>
        </section>
      </main>

      <footer className="py-8 bg-gray-950 border-t border-gray-800/50">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-gray-400 text-sm">
              © {new Date().getFullYear()} {data.personal.name}. Crafted with passion.
            </p>
            <div className="flex items-center gap-6">
              {[
                { icon: Github, link: data.personal.socialLinks?.github },
                { icon: Linkedin, link: data.personal.socialLinks?.linkedin },
                { icon: Twitter, link: data.personal.socialLinks?.twitter },
              ].map((social, i) => social.link && (
                <a
                  key={i}
                  href={social.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-amber-400 transition-colors duration-300"
                >
                  <social.icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}

