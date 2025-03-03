"use client"

import { Badge } from "@/components/ui/badge"

import type React from "react"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Loader2, X } from "lucide-react"
import type { ResumeData } from "@/lib/types"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { cn } from "@/lib/utils"
import { format } from "date-fns"
import { Calendar } from "@/components/ui/calendar"
import Image from "next/image"

// Common skills for the search feature
const commonSkills = [
  "JavaScript",
  "TypeScript",
  "React",
  "Next.js",
  "Node.js",
  "Python",
  "Java",
  "C++",
  "HTML",
  "CSS",
  "SQL",
  "Git",
  "Docker",
  "AWS",
  "Azure",
  "GraphQL",
  "REST API",
  "MongoDB",
  "PostgreSQL",
  "Redux",
  "Vue.js",
  "Angular",
  "Express.js",
  "Django",
  "Flask",
  "Spring Boot",
  "Kubernetes",
  "CI/CD",
  "Agile",
  "Scrum",
]

export default function FormPage() {
  const router = useRouter()
  const [resumeData, setResumeData] = useState<ResumeData | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [activeTab, setActiveTab] = useState("personal")
  const [skillSearch, setSkillSearch] = useState("")
  const [showSkillSearch, setShowSkillSearch] = useState(false)

  useEffect(() => {
    // Get resume data from localStorage
    const storedData = localStorage.getItem("resumeData")
    if (!storedData) {
      router.push("/upload")
      return
    }

    const parsedData = JSON.parse(storedData) as ResumeData
    setResumeData(parsedData)
  }, [router])

  const handleInputChange = (section: keyof ResumeData, field: string, value: string) => {
    if (!resumeData) return

    if (field.includes(".")) {
      const [parent, child] = field.split(".")
      setResumeData({
        ...resumeData,
        [section]: {
          ...resumeData[section],
          [parent]: {
            ...(resumeData[section] as any)[parent],
            [child]: value,
          },
        },
      })
    } else {
      setResumeData({
        ...resumeData,
        [section]: {
          ...resumeData[section],
          [field]: value,
        },
      })
    }
  }

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>, field: string) => {
    const file = event.target.files?.[0]
    if (!file || !resumeData) return

    const reader = new FileReader()
    reader.onloadend = () => {
      handleInputChange("personal", field, reader.result as string)
    }
    reader.readAsDataURL(file)
  }

  const handleExperienceChange = (index: number, field: string, value: string) => {
    if (!resumeData || !resumeData.experience) return

    const updatedExperience = [...resumeData.experience]
    updatedExperience[index] = {
      ...updatedExperience[index],
      [field]: value,
    }

    setResumeData({
      ...resumeData,
      experience: updatedExperience,
    })
  }

  const handleEducationChange = (index: number, field: string, value: string) => {
    if (!resumeData || !resumeData.education) return

    const updatedEducation = [...resumeData.education]
    updatedEducation[index] = {
      ...updatedEducation[index],
      [field]: value,
    }

    setResumeData({
      ...resumeData,
      education: updatedEducation,
    })
  }

  const handleProjectChange = (index: number, field: string, value: string) => {
    if (!resumeData || !resumeData.projects) return

    const updatedProjects = [...(resumeData.projects || [])]
    updatedProjects[index] = {
      ...updatedProjects[index],
      [field]: value,
    }

    setResumeData({
      ...resumeData,
      projects: updatedProjects,
    })
  }

  const handleProjectImageUpload = (event: React.ChangeEvent<HTMLInputElement>, index: number) => {
    const file = event.target.files?.[0]
    if (!file || !resumeData) return

    const reader = new FileReader()
    reader.onloadend = () => {
      handleProjectChange(index, "image", reader.result as string)
    }
    reader.readAsDataURL(file)
  }

  const handleSkillsChange = (value: string) => {
    if (!resumeData) return

    const skills = value.split(",").map((skill) => skill.trim())
    setResumeData({
      ...resumeData,
      skills,
    })
  }

  const handleSubmit = () => {
    if (!resumeData) return

    // Save the final data to localStorage
    localStorage.setItem("portfolioData", JSON.stringify(resumeData))

    // Navigate to the preview page
    router.push("/preview")
  }

  if (isLoading || !resumeData) {
    return (
      <div className="container py-12 flex flex-col items-center justify-center min-h-[60vh]">
        <Loader2 className="h-8 w-8 animate-spin mb-4" />
        <p className="text-muted-foreground">Loading your resume data...</p>
      </div>
    )
  }

  return (
    <div className="container max-w-3xl py-12">
      <Card>
        <CardHeader>
          <CardTitle>Complete Your Portfolio Information</CardTitle>
          <CardDescription>
            Review and edit the information extracted from your resume. Fill in any missing details to create your
            portfolio.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid grid-cols-5 mb-8">
              <TabsTrigger value="personal">Personal</TabsTrigger>
              <TabsTrigger value="experience">Experience</TabsTrigger>
              <TabsTrigger value="education">Education</TabsTrigger>
              <TabsTrigger value="projects">Projects</TabsTrigger>
              <TabsTrigger value="skills">Skills</TabsTrigger>
            </TabsList>

            <TabsContent value="personal" className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Full Name</Label>
                  <Input
                    id="name"
                    value={resumeData.personal.name || ""}
                    onChange={(e) => handleInputChange("personal", "name", e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="title">Primary Professional Title</Label>
                  <Input
                    id="title"
                    value={resumeData.personal.title || ""}
                    onChange={(e) => handleInputChange("personal", "title", e.target.value)}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="secondaryTitle">Secondary Professional Title</Label>
                <Input
                  id="secondaryTitle"
                  value={resumeData.personal.secondaryTitle || ""}
                  onChange={(e) => handleInputChange("personal", "secondaryTitle", e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="summary">Professional Summary</Label>
                <Textarea
                  id="summary"
                  rows={4}
                  value={resumeData.personal.summary || ""}
                  onChange={(e) => handleInputChange("personal", "summary", e.target.value)}
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    value={resumeData.personal.email || ""}
                    onChange={(e) => handleInputChange("personal", "email", e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone</Label>
                  <Input
                    id="phone"
                    value={resumeData.personal.phone || ""}
                    onChange={(e) => handleInputChange("personal", "phone", e.target.value)}
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="location">Location</Label>
                  <Input
                    id="location"
                    value={resumeData.personal.location || ""}
                    onChange={(e) => handleInputChange("personal", "location", e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="website">Website/Portfolio</Label>
                  <Input
                    id="website"
                    value={resumeData.personal.website || ""}
                    onChange={(e) => handleInputChange("personal", "website", e.target.value)}
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Profile Image</Label>
                  <div className="flex items-center gap-4">
                    {resumeData.personal.image && (
                      <Image
                        src={resumeData.personal.image || "/placeholder.svg"}
                        alt="Profile"
                        width={60}
                        height={60}
                        className="rounded-full object-cover"
                      />
                    )}
                    <Input type="file" accept="image/*" onChange={(e) => handleImageUpload(e, "image")} />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label>Logo</Label>
                  <div className="flex items-center gap-4">
                    {resumeData.personal.logo && (
                      <Image
                        src={resumeData.personal.logo || "/placeholder.svg"}
                        alt="Logo"
                        width={60}
                        height={60}
                        className="rounded object-contain"
                      />
                    )}
                    <Input type="file" accept="image/*" onChange={(e) => handleImageUpload(e, "logo")} />
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <Label>Social Media Links</Label>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="linkedin">LinkedIn</Label>
                    <Input
                      id="linkedin"
                      value={resumeData.personal.socialLinks?.linkedin || ""}
                      onChange={(e) => handleInputChange("personal", "socialLinks.linkedin", e.target.value)}
                      placeholder="https://linkedin.com/in/username"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="github">GitHub</Label>
                    <Input
                      id="github"
                      value={resumeData.personal.socialLinks?.github || ""}
                      onChange={(e) => handleInputChange("personal", "socialLinks.github", e.target.value)}
                      placeholder="https://github.com/username"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="twitter">Twitter</Label>
                    <Input
                      id="twitter"
                      value={resumeData.personal.socialLinks?.twitter || ""}
                      onChange={(e) => handleInputChange("personal", "socialLinks.twitter", e.target.value)}
                      placeholder="https://twitter.com/username"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="instagram">Instagram</Label>
                    <Input
                      id="instagram"
                      value={resumeData.personal.socialLinks?.instagram || ""}
                      onChange={(e) => handleInputChange("personal", "socialLinks.instagram", e.target.value)}
                      placeholder="https://instagram.com/username"
                    />
                  </div>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="experience" className="space-y-6">
              {resumeData.experience &&
                resumeData.experience.map((exp, index) => (
                  <Card key={index}>
                    <CardHeader>
                      <CardTitle className="text-base">Experience {index + 1}</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor={`job-title-${index}`}>Job Title</Label>
                          <Input
                            id={`job-title-${index}`}
                            value={exp.title || ""}
                            onChange={(e) => handleExperienceChange(index, "title", e.target.value)}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor={`company-${index}`}>Company</Label>
                          <Input
                            id={`company-${index}`}
                            value={exp.company || ""}
                            onChange={(e) => handleExperienceChange(index, "company", e.target.value)}
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor={`start-date-${index}`}>Start Date</Label>
                          <Popover>
                            <PopoverTrigger asChild>
                              <Button
                                variant={"outline"}
                                className={cn(
                                  "w-full justify-start text-left font-normal",
                                  !exp.startDate && "text-muted-foreground",
                                )}
                              >
                                {exp.startDate ? format(new Date(exp.startDate), "MMMM yyyy") : "Select date"}
                              </Button>
                            </PopoverTrigger>
                            <PopoverContent className="w-auto p-0" align="start">
                              <Calendar
                                mode="single"
                                onSelect={(date) =>
                                  handleExperienceChange(index, "startDate", date ? format(date, "yyyy-MM-dd") : "")
                                }
                                initialFocus
                              />
                            </PopoverContent>
                          </Popover>
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor={`end-date-${index}`}>End Date</Label>
                          <Popover>
                            <PopoverTrigger asChild>
                              <Button
                                variant={"outline"}
                                className={cn(
                                  "w-full justify-start text-left font-normal",
                                  !exp.endDate && "text-muted-foreground",
                                )}
                              >
                                {exp.endDate ? format(new Date(exp.endDate), "MMMM yyyy") : "Select date"}
                              </Button>
                            </PopoverTrigger>
                            <PopoverContent className="w-auto p-0" align="start">
                              <Calendar
                                mode="single"
                                onSelect={(date) =>
                                  handleExperienceChange(index, "endDate", date ? format(date, "yyyy-MM-dd") : "")
                                }
                                initialFocus
                              />
                            </PopoverContent>
                          </Popover>
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor={`link-${index}`}>Project/Company Link</Label>
                        <Input
                          id={`link-${index}`}
                          value={exp.link || ""}
                          onChange={(e) => handleExperienceChange(index, "link", e.target.value)}
                          placeholder="https://example.com"
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor={`description-${index}`}>Description</Label>
                        <Textarea
                          id={`description-${index}`}
                          rows={3}
                          value={exp.description || ""}
                          onChange={(e) => handleExperienceChange(index, "description", e.target.value)}
                        />
                      </div>
                    </CardContent>
                  </Card>
                ))}

              {(!resumeData.experience || resumeData.experience.length === 0) && (
                <div className="text-center py-4">
                  <p className="text-muted-foreground">No experience data found. Add your work experience.</p>
                  <Button
                    variant="outline"
                    className="mt-2"
                    onClick={() => {
                      setResumeData({
                        ...resumeData,
                        experience: [{ title: "", company: "", startDate: "", endDate: "", description: "", link: "" }],
                      })
                    }}
                  >
                    Add Experience
                  </Button>
                </div>
              )}

              {resumeData.experience && resumeData.experience.length > 0 && (
                <Button
                  variant="outline"
                  onClick={() => {
                    setResumeData({
                      ...resumeData,
                      experience: [
                        ...resumeData.experience,
                        { title: "", company: "", startDate: "", endDate: "", description: "", link: "" },
                      ],
                    })
                  }}
                >
                  Add Another Experience
                </Button>
              )}
            </TabsContent>

            <TabsContent value="education" className="space-y-6">
              {resumeData.education &&
                resumeData.education.map((edu, index) => (
                  <Card key={index}>
                    <CardHeader>
                      <CardTitle className="text-base">Education {index + 1}</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor={`degree-${index}`}>Degree</Label>
                          <Input
                            id={`degree-${index}`}
                            value={edu.degree || ""}
                            onChange={(e) => handleEducationChange(index, "degree", e.target.value)}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor={`institution-${index}`}>Institution</Label>
                          <Input
                            id={`institution-${index}`}
                            value={edu.institution || ""}
                            onChange={(e) => handleEducationChange(index, "institution", e.target.value)}
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor={`edu-start-date-${index}`}>Start Date</Label>
                          <Popover>
                            <PopoverTrigger asChild>
                              <Button
                                variant={"outline"}
                                className={cn(
                                  "w-full justify-start text-left font-normal",
                                  !edu.startDate && "text-muted-foreground",
                                )}
                              >
                                {edu.startDate ? format(new Date(edu.startDate), "MMMM yyyy") : "Select date"}
                              </Button>
                            </PopoverTrigger>
                            <PopoverContent className="w-auto p-0" align="start">
                              <Calendar
                                mode="single"
                                onSelect={(date) =>
                                  handleEducationChange(index, "startDate", date ? format(date, "yyyy-MM-dd") : "")
                                }
                                initialFocus
                              />
                            </PopoverContent>
                          </Popover>
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor={`edu-end-date-${index}`}>End Date</Label>
                          <Popover>
                            <PopoverTrigger asChild>
                              <Button
                                variant={"outline"}
                                className={cn(
                                  "w-full justify-start text-left font-normal",
                                  !edu.endDate && "text-muted-foreground",
                                )}
                              >
                                {edu.endDate ? format(new Date(edu.endDate), "MMMM yyyy") : "Select date"}
                              </Button>
                            </PopoverTrigger>
                            <PopoverContent className="w-auto p-0" align="start">
                              <Calendar
                                mode="single"
                                onSelect={(date) =>
                                  handleEducationChange(index, "endDate", date ? format(date, "yyyy-MM-dd") : "")
                                }
                                initialFocus
                              />
                            </PopoverContent>
                          </Popover>
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor={`edu-description-${index}`}>Description</Label>
                        <Textarea
                          id={`edu-description-${index}`}
                          rows={3}
                          value={edu.description || ""}
                          onChange={(e) => handleEducationChange(index, "description", e.target.value)}
                          placeholder="Describe your achievements, courses, or thesis..."
                        />
                      </div>
                    </CardContent>
                  </Card>
                ))}

              {(!resumeData.education || resumeData.education.length === 0) && (
                <div className="text-center py-4">
                  <p className="text-muted-foreground">No education data found. Add your education.</p>
                  <Button
                    variant="outline"
                    className="mt-2"
                    onClick={() => {
                      setResumeData({
                        ...resumeData,
                        education: [{ degree: "", institution: "", startDate: "", endDate: "", description: "" }],
                      })
                    }}
                  >
                    Add Education
                  </Button>
                </div>
              )}

              {resumeData.education && resumeData.education.length > 0 && (
                <Button
                  variant="outline"
                  onClick={() => {
                    setResumeData({
                      ...resumeData,
                      education: [
                        ...resumeData.education,
                        { degree: "", institution: "", startDate: "", endDate: "", description: "" },
                      ],
                    })
                  }}
                >
                  Add Another Education
                </Button>
              )}
            </TabsContent>

            <TabsContent value="projects" className="space-y-6">
              {resumeData.projects &&
                resumeData.projects.map((project, index) => (
                  <Card key={index}>
                    <CardHeader>
                      <CardTitle className="text-base">Project {index + 1}</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor={`project-name-${index}`}>Project Name</Label>
                          <Input
                            id={`project-name-${index}`}
                            value={project.name || ""}
                            onChange={(e) => handleProjectChange(index, "name", e.target.value)}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor={`project-tech-${index}`}>Technologies Used</Label>
                          <Input
                            id={`project-tech-${index}`}
                            value={project.technologies || ""}
                            onChange={(e) => handleProjectChange(index, "technologies", e.target.value)}
                            placeholder="React, Node.js, MongoDB, etc."
                          />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor={`project-link-${index}`}>Project Link</Label>
                        <Input
                          id={`project-link-${index}`}
                          value={project.link || ""}
                          onChange={(e) => handleProjectChange(index, "link", e.target.value)}
                          placeholder="https://example.com"
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor={`project-description-${index}`}>Description</Label>
                        <Textarea
                          id={`project-description-${index}`}
                          rows={3}
                          value={project.description || ""}
                          onChange={(e) => handleProjectChange(index, "description", e.target.value)}
                        />
                      </div>

                      <div className="space-y-2">
                        <Label>Project Image</Label>
                        <div className="flex items-center gap-4">
                          {project.image && (
                            <Image
                              src={project.image || "/placeholder.svg"}
                              alt="Project"
                              width={100}
                              height={60}
                              className="rounded object-cover"
                            />
                          )}
                          <Input type="file" accept="image/*" onChange={(e) => handleProjectImageUpload(e, index)} />
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}

              {(!resumeData.projects || resumeData.projects.length === 0) && (
                <div className="text-center py-4">
                  <p className="text-muted-foreground">No projects found. Add your projects.</p>
                  <Button
                    variant="outline"
                    className="mt-2"
                    onClick={() => {
                      setResumeData({
                        ...resumeData,
                        projects: [{ name: "", technologies: "", link: "", description: "", image: "" }],
                      })
                    }}
                  >
                    Add Project
                  </Button>
                </div>
              )}

              {resumeData.projects && resumeData.projects.length > 0 && (
                <Button
                  variant="outline"
                  onClick={() => {
                    setResumeData({
                      ...resumeData,
                      projects: [
                        ...resumeData.projects,
                        { name: "", technologies: "", link: "", description: "", image: "" },
                      ],
                    })
                  }}
                >
                  Add Another Project
                </Button>
              )}
            </TabsContent>

            <TabsContent value="skills" className="space-y-4">
              <div className="space-y-4">
                <Label>Skills</Label>
                <div className="relative">
                  <Input
                    value={resumeData.skills?.join(", ") || ""}
                    onChange={(e) => handleSkillsChange(e.target.value)}
                    placeholder="Type or search for skills..."
                    onFocus={() => setShowSkillSearch(true)}
                  />
                  {showSkillSearch && (
                    <div className="absolute w-full mt-1 p-2 bg-background border rounded-md shadow-lg z-10">
                      <div className="space-y-2">
                        <Input
                          value={skillSearch}
                          onChange={(e) => setSkillSearch(e.target.value)}
                          placeholder="Search skills..."
                        />
                        <div className="max-h-48 overflow-y-auto">
                          {commonSkills
                            .filter((skill) => skill.toLowerCase().includes(skillSearch.toLowerCase()))
                            .map((skill) => (
                              <div
                                key={skill}
                                className="px-2 py-1 hover:bg-accent cursor-pointer"
                                onClick={() => {
                                  const currentSkills = new Set(resumeData.skills || [])
                                  currentSkills.add(skill)
                                  setResumeData({
                                    ...resumeData,
                                    skills: Array.from(currentSkills),
                                  })
                                }}
                              >
                                {skill}
                              </div>
                            ))}
                        </div>
                      </div>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="absolute top-2 right-2"
                        onClick={() => setShowSkillSearch(false)}
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                  )}
                </div>
                <div className="flex flex-wrap gap-2">
                  {resumeData.skills?.map((skill, index) => (
                    <Badge key={index} variant="secondary" className="px-3 py-1 flex items-center gap-2">
                      {skill}
                      <X
                        className="h-3 w-3 cursor-pointer"
                        onClick={() => {
                          const updatedSkills = resumeData.skills?.filter((_, i) => i !== index)
                          setResumeData({
                            ...resumeData,
                            skills: updatedSkills,
                          })
                        }}
                      />
                    </Badge>
                  ))}
                </div>
              </div>
            </TabsContent>
          </Tabs>

          <div className="flex justify-between mt-8">
            <Button
              variant="outline"
              onClick={() => {
                const tabs = ["personal", "experience", "education", "projects", "skills"]
                const currentIndex = tabs.indexOf(activeTab)
                if (currentIndex > 0) {
                  setActiveTab(tabs[currentIndex - 1])
                }
              }}
              disabled={activeTab === "personal"}
            >
              Previous
            </Button>

            {activeTab !== "skills" ? (
              <Button
                onClick={() => {
                  const tabs = ["personal", "experience", "education", "projects", "skills"]
                  const currentIndex = tabs.indexOf(activeTab)
                  if (currentIndex < tabs.length - 1) {
                    setActiveTab(tabs[currentIndex + 1])
                  }
                }}
              >
                Next
              </Button>
            ) : (
              <Button onClick={handleSubmit}>Generate Portfolio</Button>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

