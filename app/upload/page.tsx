"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { FileUp, Loader2 } from "lucide-react"
import { useRouter } from "next/navigation"
import { parseResume } from "@/lib/resume-parser"

export default function UploadPage() {
  const router = useRouter()
  const [file, setFile] = useState<File | null>(null)
  const [isUploading, setIsUploading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0]
    if (!selectedFile) return

    // Check file type
    const validTypes = [
      "application/pdf",
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
      "text/plain",
    ]
    if (!validTypes.includes(selectedFile.type)) {
      setError("Please upload a PDF, DOCX, or TXT file")
      setFile(null)
      return
    }

    setFile(selectedFile)
    setError(null)
  }

  const handleUpload = async () => {
    if (!file) return

    setIsUploading(true)
    setError(null)

    try {
      // In a real app, you would upload the file to a server
      // For this demo, we'll simulate parsing the resume
      const resumeData = await parseResume(file)

      // Store the resume data in localStorage for the next step
      localStorage.setItem("resumeData", JSON.stringify(resumeData))

      // Navigate to the form page
      router.push("/form")
    } catch (err) {
      setError("Failed to process your resume. Please try again.")
      console.error(err)
    } finally {
      setIsUploading(false)
    }
  }

  return (
    <div className="container max-w-md py-12">
      <Card>
        <CardHeader>
          <CardTitle>Upload Your Resume</CardTitle>
          <CardDescription>
            Upload your resume to generate your portfolio. We support PDF, DOCX, and TXT formats.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div
              className="border-2 border-dashed rounded-lg p-6 flex flex-col items-center justify-center cursor-pointer hover:bg-muted/50 transition-colors"
              onClick={() => document.getElementById("resume-upload")?.click()}
            >
              <FileUp className="h-10 w-10 text-muted-foreground mb-2" />
              <p className="text-sm font-medium mb-1">{file ? file.name : "Click to upload or drag and drop"}</p>
              <p className="text-xs text-muted-foreground">PDF, DOCX, or TXT (max 5MB)</p>
              <input
                id="resume-upload"
                type="file"
                className="hidden"
                accept=".pdf,.docx,.txt,application/pdf,application/vnd.openxmlformats-officedocument.wordprocessingml.document,text/plain"
                onChange={handleFileChange}
              />
            </div>

            {error && <p className="text-sm text-destructive">{error}</p>}

            <Button className="w-full" disabled={!file || isUploading} onClick={handleUpload}>
              {isUploading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Processing...
                </>
              ) : (
                "Continue with Resume"
              )}
            </Button>

            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-background px-2 text-muted-foreground">Or</span>
              </div>
            </div>

            <Button
              variant="outline"
              className="w-full"
              onClick={() => {
                // Initialize empty resume data
                const emptyResumeData = {
                  personal: {
                    name: "",
                    title: "",
                    summary: "",
                    email: "",
                    socialLinks: {},
                  },
                  skills: [],
                }
                localStorage.setItem("resumeData", JSON.stringify(emptyResumeData))
                router.push("/form")
              }}
            >
              Continue without Resume
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

