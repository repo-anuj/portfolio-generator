"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Loader2 } from "lucide-react"
import type { ResumeData } from "@/lib/types"
import Portfolio from "@/components/portfolio"
import PortfolioThemeTwo from "@/components/portfolio-theme-two"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { downloadPortfolio } from "@/lib/download-utils"

export default function PreviewPage() {
  const router = useRouter()
  const [portfolioData, setPortfolioData] = useState<ResumeData | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [selectedTheme, setSelectedTheme] = useState("modern")

  useEffect(() => {
    // Get portfolio data from localStorage
    const storedData = localStorage.getItem("portfolioData")
    if (!storedData) {
      router.push("/upload")
      return
    }

    setPortfolioData(JSON.parse(storedData))
    setIsLoading(false)
  }, [router])

  if (isLoading || !portfolioData) {
    return (
      <div className="container py-12 flex flex-col items-center justify-center min-h-[60vh]">
        <Loader2 className="h-8 w-8 animate-spin mb-4" />
        <p className="text-muted-foreground">Loading your portfolio...</p>
      </div>
    )
  }

  return (
    <div className="min-h-screen">
      <div className="container py-4 flex justify-between items-center border-b">
        <h1 className="text-xl font-bold">Portfolio Preview</h1>
        <div className="flex items-center gap-4">
          <Select value={selectedTheme} onValueChange={setSelectedTheme}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select theme" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="modern">Modern Theme</SelectItem>
              <SelectItem value="dark">Dark Theme</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline" onClick={() => router.push("/form")}>
            Edit Information
          </Button>
          <Button onClick={() => downloadPortfolio(portfolioData, selectedTheme)}>Download Portfolio</Button>
        </div>
      </div>

      {selectedTheme === "modern" ? <Portfolio data={portfolioData} /> : <PortfolioThemeTwo data={portfolioData} />}
    </div>
  )
}

