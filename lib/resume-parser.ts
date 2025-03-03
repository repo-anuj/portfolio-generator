import type { ResumeData } from "./types"

export async function parseResume(file: File): Promise<ResumeData> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()

    reader.onload = async (e) => {
      try {
        const text = e.target?.result as string
        const lines = text.split("\n").map((line) => line.trim())

        const extractedData: ResumeData = {
          personal: extractPersonalInfo(lines),
          experience: extractExperience(lines),
          education: extractEducation(lines),
          projects: extractProjects(lines),
          skills: extractSkills(lines),
          certifications: extractCertifications(lines),
        }

        resolve(extractedData)
      } catch (error) {
        console.error("Error parsing resume:", error)
        reject(error)
      }
    }

    reader.onerror = (error) => {
      console.error("Error reading file:", error)
      reject(error)
    }

    reader.readAsText(file)
  })
}

function extractPersonalInfo(lines: string[]): ResumeData["personal"] {
  const personal: ResumeData["personal"] = {
    name: "",
    title: "",
    summary: "",
    email: "",
    phone: "",
    location: "",
    socialLinks: {},
  }

  // Find name (usually in the first few lines)
  for (const line of lines.slice(0, 5)) {
    if (line && !line.includes("@") && !line.includes("http") && !line.match(/^\+?\d/)) {
      personal.name = line
      break
    }
  }

  // Find email
  const emailRegex = /\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}\b/
  for (const line of lines) {
    const match = line.match(emailRegex)
    if (match) {
      personal.email = match[0]
      break
    }
  }

  // Find phone number
  const phoneRegex = /(?:\+\d{1,3}[-.\s]?)?\d{3}[-.\s]?\d{3}[-.\s]?\d{4}/
  for (const line of lines) {
    const match = line.match(phoneRegex)
    if (match) {
      personal.phone = match[0]
      break
    }
  }

  // Find LinkedIn URL
  const linkedinRegex = /linkedin\.com\/in\/[a-zA-Z0-9-]+/
  for (const line of lines) {
    const match = line.match(linkedinRegex)
    if (match) {
      personal.socialLinks = {
        ...personal.socialLinks,
        linkedin: `https://www.${match[0]}`,
      }
      break
    }
  }

  // Find summary
  const summaryStartIndex = lines.findIndex(
    (line) =>
      line.toLowerCase().includes("summary") ||
      line.toLowerCase().includes("profile") ||
      line.toLowerCase().includes("about"),
  )
  if (summaryStartIndex !== -1) {
    let summary = ""
    let i = summaryStartIndex + 1
    while (i < lines.length && lines[i] && !isNewSection(lines[i])) {
      summary += lines[i] + " "
      i++
    }
    personal.summary = summary.trim()
  }

  // Find location
  const locationRegex = /(.*),\s*(.*),\s*(.*)/
  for (const line of lines) {
    const match = line.match(locationRegex)
    if (match && !line.includes("@")) {
      personal.location = line.trim()
      break
    }
  }

  return personal
}

function extractExperience(lines: string[]): ResumeData["experience"] {
  const experience: ResumeData["experience"] = []
  let currentExp: any = {}
  let isInExperienceSection = false
  let descriptionLines: string[] = []

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i]

    if (line.toLowerCase().includes("experience") && !line.includes("years")) {
      isInExperienceSection = true
      continue
    }

    if (isInExperienceSection && line) {
      if (isNewSection(line)) {
        isInExperienceSection = false
        continue
      }

      // Check for date patterns
      const datePattern = /(\d{4})\s*[-–]\s*(\d{4}|present)/i
      const dateMatch = line.match(datePattern)

      if (dateMatch) {
        if (currentExp.title) {
          currentExp.description = descriptionLines.join(" ").trim()
          if (Object.keys(currentExp).length > 0) {
            experience.push(currentExp)
          }
        }

        currentExp = {
          startDate: dateMatch[1],
          endDate: dateMatch[2].toLowerCase() === "present" ? "Present" : dateMatch[2],
        }
        descriptionLines = []
        continue
      }

      // Check for role/company
      if (line && !line.startsWith("•") && !line.startsWith("-")) {
        const parts = line.split(/\bat\b|\bfor\b|\bin\b/)
        if (parts.length > 1) {
          currentExp.title = parts[0].trim()
          currentExp.company = parts[1].trim()
        } else if (!currentExp.title) {
          currentExp.title = line.trim()
        }
      }

      // Collect description points
      if (line.startsWith("•") || line.startsWith("-")) {
        descriptionLines.push(line.replace(/^[•-]\s*/, ""))
      }
    }
  }

  // Add the last experience if any
  if (currentExp.title) {
    currentExp.description = descriptionLines.join(" ").trim()
    experience.push(currentExp)
  }

  return experience
}

function extractEducation(lines: string[]): ResumeData["education"] {
  const education: ResumeData["education"] = []
  let isInEducationSection = false
  let currentEdu: any = {}

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i]

    if (line.toLowerCase().includes("education")) {
      isInEducationSection = true
      continue
    }

    if (isInEducationSection && line) {
      if (isNewSection(line)) {
        if (Object.keys(currentEdu).length > 0) {
          education.push(currentEdu)
          currentEdu = {}
        }
        isInEducationSection = false
        continue
      }

      // Match degree patterns
      const degreePattern = /(Bachelor|Master|PhD|BSc|MSc|BA|MA|BCA|MCA|B\.Tech|M\.Tech)/i
      const degreeMatch = line.match(degreePattern)

      if (degreeMatch) {
        if (Object.keys(currentEdu).length > 0) {
          education.push(currentEdu)
        }
        currentEdu = {
          degree: line.trim(),
        }
        continue
      }

      // Match institution and dates
      if (line && !currentEdu.institution) {
        const datePattern = /(\d{4})\s*[-–]\s*(\d{4}|present|Present)/
        const dateMatch = line.match(datePattern)

        if (dateMatch) {
          currentEdu.startDate = dateMatch[1]
          currentEdu.endDate = dateMatch[2].toLowerCase() === "present" ? "Present" : dateMatch[2]
        } else if (!line.match(/^\d/)) {
          currentEdu.institution = line.trim()
        }
      }
    }
  }

  // Add the last education entry if any
  if (Object.keys(currentEdu).length > 0) {
    education.push(currentEdu)
  }

  return education
}

function extractProjects(lines: string[]): ResumeData["projects"] {
  const projects: ResumeData["projects"] = []
  let isInProjectSection = false
  let currentProject: any = {}
  let descriptionLines: string[] = []

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i].trim()

    if (line.toLowerCase() === "projects") {
      isInProjectSection = true
      continue
    }

    if (isInProjectSection && line) {
      if (isNewSection(line)) {
        if (currentProject.name) {
          currentProject.description = descriptionLines.join(" ").trim()
          projects.push(currentProject)
        }
        isInProjectSection = false
        continue
      }

      // Check for project name and technologies
      const projectPattern = /(.*?)\s*\|\s*(.*)/
      const match = line.match(projectPattern)

      if (match) {
        if (currentProject.name) {
          currentProject.description = descriptionLines.join(" ").trim()
          projects.push(currentProject)
          descriptionLines = []
        }
        currentProject = {
          name: match[1].trim(),
          technologies: match[2].trim(),
        }
        continue
      }

      // Check for URLs
      const urlPattern = /https?:\/\/[^\s]+/
      const urlMatch = line.match(urlPattern)
      if (urlMatch) {
        currentProject.link = urlMatch[0]
        continue
      }

      // Collect description points
      if (line.startsWith("•") || line.startsWith("-") || line.startsWith("–")) {
        descriptionLines.push(line.replace(/^[•\-–]\s*/, ""))
      } else if (line && !line.match(/^\d{4}/) && !urlPattern.test(line)) {
        descriptionLines.push(line)
      }
    }
  }

  // Add the last project if any
  if (currentProject.name) {
    currentProject.description = descriptionLines.join(" ").trim()
    projects.push(currentProject)
  }

  return projects
}

function extractSkills(lines: string[]): ResumeData["skills"] {
  const skills: ResumeData["skills"] = []
  let isInSkillSection = false
  let currentCategory = ""

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i].trim()

    if (line.toLowerCase().includes("skills") && !line.toLowerCase().includes("soft")) {
      isInSkillSection = true
      continue
    }

    if (isInSkillSection && line) {
      if (isNewSection(line)) {
        isInSkillSection = false
        continue
      }

      // Check for category patterns
      if (line.endsWith(":")) {
        currentCategory = line.slice(0, -1).trim()
        continue
      }

      // Split skills by common delimiters
      if (line.startsWith("•") || line.startsWith("-")) {
        const skillLine = line.replace(/^[•-]\s*/, "")
        const category = currentCategory || "General"

        // Find existing category or create new one
        let categoryGroup = skills.find((s) => s.category === category)
        if (!categoryGroup) {
          categoryGroup = { category, items: [] }
          skills.push(categoryGroup)
        }

        // Split by commas and add individual skills
        const skillItems = skillLine
          .split(/,|;/)
          .map((s) => s.trim())
          .filter(Boolean)
        categoryGroup.items.push(...skillItems)
      }
    }
  }

  return skills
}

function extractCertifications(lines: string[]): ResumeData["certifications"] {
  const certifications: ResumeData["certifications"] = []
  let isInCertSection = false

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i].trim()

    if (line.toLowerCase().includes("certifications")) {
      isInCertSection = true
      continue
    }

    if (isInCertSection && line) {
      if (isNewSection(line)) {
        isInCertSection = false
        continue
      }

      if (line.startsWith("•") || line.startsWith("-")) {
        const certLine = line.replace(/^[•-]\s*/, "")
        const parts = certLine.split(":")

        if (parts.length > 1) {
          certifications.push({
            name: parts[0].trim(),
            description: parts[1].trim(),
          })
        } else {
          certifications.push({
            name: certLine.trim(),
          })
        }
      }
    }
  }

  return certifications
}

function isNewSection(line: string): boolean {
  const sectionKeywords = [
    "education",
    "experience",
    "skills",
    "projects",
    "certifications",
    "interests",
    "summary",
    "profile",
  ]
  return sectionKeywords.some((keyword) => line.toLowerCase() === keyword || line.toLowerCase().includes(keyword + ":"))
}

