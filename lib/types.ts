export interface ResumeData {
  personal: {
    name?: string
    title?: string
    secondaryTitle?: string
    summary?: string
    email?: string
    phone?: string
    location?: string
    website?: string
    image?: string
    logo?: string
    socialLinks?: {
      linkedin?: string
      github?: string
      twitter?: string
      instagram?: string
    }
  }
  experience?: {
    title?: string
    company?: string
    startDate?: string
    endDate?: string
    description?: string
    link?: string
    location?: string
  }[]
  education?: {
    degree?: string
    institution?: string
    startDate?: string
    endDate?: string
    description?: string
    location?: string
  }[]
  projects?: {
    name?: string
    technologies?: string
    link?: string
    description?: string
    image?: string
    year?: string
  }[]
  skills?: {
    category?: string
    items: string[]
  }[]
  certifications?: {
    name: string
    issuer?: string
    date?: string
    description?: string
  }[]
}

