interface ResumeData {
  personal: {
    name: string
    title: string
    secondaryTitle: string
    summary: string
    email: string
    phone: string
    location: string
    website: string
    image: string
    logo: string
    socialLinks: {
      linkedin: string
      github: string
      twitter: string
      instagram: string
    }
  }
  experience: {
    company: string
    position: string
    startDate: string
    endDate: string
    description: string
  }[]
  education: {
    institution: string
    degree: string
    startDate: string
    endDate: string
  }[]
  projects: {
    name: string
    description: string
    url: string
  }[]
  skills: string[]
}

function preprocessResumeData(data: ResumeData): ResumeData {
  return {
    personal: {
      name: data.personal.name || "",
      title: data.personal.title || "",
      secondaryTitle: data.personal.secondaryTitle || "",
      summary: data.personal.summary || "",
      email: data.personal.email || "",
      phone: data.personal.phone || "",
      location: data.personal.location || "",
      website: data.personal.website || "",
      image: data.personal.image || "",
      logo: data.personal.logo || "",
      socialLinks: {
        linkedin: data.personal.socialLinks?.linkedin || "",
        github: data.personal.socialLinks?.github || "",
        twitter: data.personal.socialLinks?.twitter || "",
        instagram: data.personal.socialLinks?.instagram || "",
      },
    },
    experience: data.experience || [],
    education: data.education || [],
    projects: data.projects || [],
    skills: data.skills || [],
  }
}

export async function analyzeResumeWithAI(resumeData: ResumeData): Promise<ResumeData> {
  try {
    // Preprocess the resume data to handle missing fields
    const preprocessedResumeData = preprocessResumeData(resumeData)

    // Get the API keys from environment variables
    const apiKey = "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"
    const apiBase = "https://openrouter.ai/api/v1"
    const model = "qwen/qwen2.5-vl-72b-instruct:free"


    console.log("Preprocessed Data Sent to AI:", preprocessedResumeData);
    // Create the prompt for the AI
    const prompt = `
      I have a resume in JSON format: ${JSON.stringify(preprocessedResumeData)}
      
      Please analyze this resume and enhance it by:
      1. Improving the professional summary to be more compelling. If no summary is provided, create one based on the available information.
      2. Enhancing job descriptions to highlight achievements and skills. If no job descriptions are provided, use the available data to infer potential roles.
      3. Standardizing date formats (e.g., MM/YYYY).
      4. Adding any missing information that would be valuable for a portfolio. Use reasonable assumptions where necessary.
      5. Organizing skills into categories (e.g., technical, soft, tools) if possible. If no skills are provided, suggest common skills based on the job title.
      
      Return the enhanced resume in the same JSON format.
    `

    // Make the API call to OpenRouter
    const response = await fetch(apiBase, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: model,
        messages: [
          {
            role: "user",
            content: prompt,
          },
        ],
        temperature: 0.7,
      }),
    })

    if (!response.ok) {
      console.error("API Status:", response.status, response.statusText);
      throw new Error(`API request failed with status ${response.status}`);
    }

    const data = await response.json()
    const mockResponse = {
      choices: [{
        message: { content: JSON.stringify(preprocessedResumeData) } // Return input as-is
      }]
    };
    const aiResponse = mockResponse.choices[0].message.content;

    if (!aiResponse) {
      throw new Error("No response from AI")
    }

    // Try to extract JSON from the AI's response
    try {
      const jsonMatch = aiResponse.match(/```json\n([\s\S]*?)\n```/) || aiResponse.match(/{[\s\S]*}/)
      if (jsonMatch) {
        const jsonStr = jsonMatch[1] || jsonMatch[0]
        const enhancedData = JSON.parse(jsonStr)
        return enhancedData
      } else {
        console.error("AI response does not contain valid JSON:", aiResponse)
      }
    } catch (error) {
      console.error("Error parsing AI response:", error)
    }

    // If parsing fails, return the preprocessed data
    return preprocessedResumeData
  } catch (error) {
    console.error("Error analyzing resume with AI:", error)
    // If there's an error, return the preprocessed data
    return preprocessResumeData(resumeData)
  }
}

