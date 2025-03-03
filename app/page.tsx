"use client";

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import Link from "next/link"
import { motion } from "framer-motion"
import { FileText, Palette, Rocket, ArrowRight } from "lucide-react"

export default function Home() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { 
        staggerChildren: 0.2 
      }
    }
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { 
        duration: 0.5,
        ease: "easeOut" 
      }
    }
  }

  return (
    <div className="flex flex-col min-h-screen bg-black text-gray-100">
      <header className="border-b border-gray-800 sticky top-0 bg-black/90 backdrop-blur-sm z-50">
        <div className="container flex h-16 items-center justify-between">
          <motion.div 
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            className="flex items-center gap-2 font-bold text-xl"
          >
            <svg className="w-6 h-6 text-indigo-400" viewBox="0 0 24 24">
              <path 
                fill="currentColor" 
                d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5v-5l-10 5-10-5v5z"
              >
                <animate
                  attributeName="opacity"
                  values="0.5;1;0.5"
                  dur="2s"
                  repeatCount="indefinite"
                />
              </path>
            </svg>
            <span>PortfolioGen</span>
          </motion.div>
          <nav className="flex items-center gap-6">
            <Link href="#features" className="text-sm font-medium hover:text-indigo-400 transition-colors">
              Features
            </Link>
            <Link href="#how-it-works" className="text-sm font-medium hover:text-indigo-400 transition-colors">
              How It Works
            </Link>
            <Button asChild className="group bg-indigo-600 hover:bg-indigo-700">
              <Link href="/upload">
                Get Started
                <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </Button>
          </nav>
        </div>
      </header>

      <main className="flex-1">
        <section className="py-20 md:py-28 overflow-hidden">
          <motion.div 
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="container flex flex-col items-center text-center"
          >
            <motion.h1 
              variants={itemVariants}
              className="text-4xl md:text-6xl font-bold tracking-tight max-w-3xl bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 to-purple-500"
            >
              Craft Your Professional Portfolio
            </motion.h1>
            <motion.p 
              variants={itemVariants}
              className="mt-6 text-xl text-gray-400 max-w-2xl"
            >
              Turn your resume into a stunning, modern portfolio website that highlights your skills, experience, and achievements with elegant design.
            </motion.p>
            <motion.div 
              variants={itemVariants}
              className="mt-10"
            >
              <Button asChild size="lg" className="group bg-indigo-600 hover:bg-indigo-700">
                <Link href="/upload">
                  Build Your Portfolio
                  <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </Link>
              </Button>
            </motion.div>
          </motion.div>
        </section>

        <section id="features" className="py-20 bg-gray-900">
          <div className="container">
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-3xl font-bold text-center mb-12 text-white"
            >
              Why PortfolioGen Stands Out
            </motion.h2>
            <motion.div 
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="grid grid-cols-1 md:grid-cols-3 gap-8"
            >
              <motion.div variants={itemVariants}>
                <Card className="bg-gray-800 border-gray-700 hover:shadow-xl hover:shadow-indigo-500/20 transition-all">
                  <CardHeader>
                    <FileText className="h-8 w-8 text-indigo-400 mb-2" />
                    <CardTitle className="text-white">Seamless Import</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-300">
                      Upload your resume effortlessly in multiple formats (PDF, DOCX, TXT) and watch it transform into a polished portfolio layout.
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
              <motion.div variants={itemVariants}>
                <Card className="bg-gray-800 border-gray-700 hover:shadow-xl hover:shadow-indigo-500/20 transition-all">
                  <CardHeader>
                    <Palette className="h-8 w-8 text-indigo-400 mb-2" />
                    <CardTitle className="text-white">Stunning Templates</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-300">
                      Select from a curated collection of beautifully designed templates that adapt to your personal style and profession.
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
              <motion.div variants={itemVariants}>
                <Card className="bg-gray-800 border-gray-700 hover:shadow-xl hover:shadow-indigo-500/20 transition-all">
                  <CardHeader>
                    <Rocket className="h-8 w-8 text-indigo-400 mb-2" />
                    <CardTitle className="text-white">Instant Launch</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-300">
                      Go live in minutes with our streamlined process – no coding required, just customize and publish.
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            </motion.div>
          </div>
        </section>

        <section id="how-it-works" className="py-20 bg-black">
          <div className="container">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-3xl font-bold text-center mb-12 text-white"
            >
              Your Portfolio in Three Easy Steps
            </motion.h2>
            <motion.div 
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="grid grid-cols-1 md:grid-cols-3 gap-12"
            >
              {[
                { 
                  num: 1, 
                  title: "Upload Your Resume", 
                  desc: "Simply upload your existing resume in any common format. Our system will intelligently organize your information into a professional structure.", 
                  icon: FileText 
                },
                { 
                  num: 2, 
                  title: "Customize Your Design", 
                  desc: "Choose a template and tweak colors, layouts, and fonts to match your personal brand. Preview your changes in real-time.", 
                  icon: Palette 
                },
                { 
                  num: 3, 
                  title: "Launch Your Site", 
                  desc: "Review your portfolio, make final adjustments, and publish it online with a unique URL to share with employers or clients.", 
                  icon: Rocket 
                }
              ].map((step) => (
                <motion.div 
                  key={step.num}
                  variants={itemVariants}
                  className="flex flex-col items-center text-center"
                >
                  <div className="w-16 h-16 rounded-full bg-indigo-900/50 text-indigo-400 flex items-center justify-center mb-4 relative">
                    <step.icon className="h-8 w-8" />
                    <span className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-indigo-600 text-white flex items-center justify-center text-sm">
                      {step.num}
                    </span>
                  </div>
                  <h3 className="text-xl font-bold mb-2 text-white">{step.title}</h3>
                  <p className="text-gray-400">{step.desc}</p>
                </motion.div>
              ))}
            </motion.div>
            <motion.div 
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="mt-12 flex justify-center"
            >
              <Button asChild size="lg" className="group bg-indigo-600 hover:bg-indigo-700">
                <Link href="/upload">
                  Start Building Now
                  <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </Link>
              </Button>
            </motion.div>
          </div>
        </section>

        <section id="benefits" className="py-20 bg-gray-900">
          <div className="container">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-3xl font-bold text-center mb-12 text-white"
            >
              Benefits of Your Portfolio
            </motion.h2>
            <motion.div 
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="grid grid-cols-1 md:grid-cols-2 gap-8"
            >
              <motion.div variants={itemVariants}>
                <Card className="bg-gray-800 border-gray-700">
                  <CardHeader>
                    <CardTitle className="text-white">Stand Out to Employers</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-300">
                      A professional portfolio website makes you more memorable than a standard resume, showcasing your work in an interactive format.
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
              <motion.div variants={itemVariants}>
                <Card className="bg-gray-800 border-gray-700">
                  <CardHeader>
                    <CardTitle className="text-white">Showcase Your Work</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-300">
                      Include projects, achievements, and testimonials in a visually appealing way that demonstrates your capabilities.
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            </motion.div>
          </div>
        </section>
      </main>

      <footer className="border-t border-gray-800 py-6 bg-gray-900">
        <div className="container flex flex-col md:flex-row items-center justify-between gap-4">
          <motion.div 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="flex items-center gap-2 font-bold"
          >
            <svg className="w-5 h-5 text-indigo-400" viewBox="0 0 24 24">
              <path fill="currentColor" d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5v-5l-10 5-10-5v5z" />
            </svg>
            <span>PortfolioGen</span>
          </motion.div>
          <p className="text-sm text-gray-400">
            © {new Date().getFullYear()} PortfolioGen. All rights reserved.
          </p>
          <div className="flex gap-4">
            <Link href="#" className="text-sm text-gray-400 hover:text-indigo-400 transition-colors">
              Privacy Policy
            </Link>
            <Link href="#" className="text-sm text-gray-400 hover:text-indigo-400 transition-colors">
              Terms of Service
            </Link>
          </div>
        </div>
      </footer>
    </div>
  )
}

