
const API_KEY = import.meta.env.VITE_API_KEY || '';
const API_VERSION = 'v1';
const BASE_URL_TEMPLATE = `https://generativelanguage.googleapis.com/${API_VERSION}/models/{model}:generateContent`;

// Default to the requested model, but can be overridden by validation
let currentModel = "gemini-2.5-flash";

if (!API_KEY) {
  console.error("CRITICAL: API_KEY is missing. AI features will not work.");
}

interface GeminiResponse {
  candidates?: {
    content?: {
      parts?: { text: string }[];
    };
  }[];
  error?: {
    code: number;
    message: string;
    status: string;
    details?: any[];
  };
}

interface ModelListResponse {
  models?: {
    name: string;
    displayName: string;
    description: string;
    supportedGenerationMethods: string[];
  }[];
  error?: any;
}

// Function to validate and potentially switch models based on availability
export async function validateGeminiConnection(): Promise<boolean> {
  if (!API_KEY) return false;

  const modelsUrl = `https://generativelanguage.googleapis.com/${API_VERSION}/models?key=${API_KEY}`;

  try {
    console.log("Validating Gemini Connection and checking available models...");
    const response = await fetch(modelsUrl);

    if (!response.ok) {
      console.error(`Failed to fetch models list: ${response.status} ${response.statusText}`);
      // Don't fail completely, try to proceed with default
      return false;
    }

    const data: ModelListResponse = await response.json();

    if (data.models) {
      const availableModels = data.models.map(m => m.name.replace('models/', ''));
      console.log("Available Models:", availableModels);

      // Check if our current (default) model exists
      if (availableModels.includes(currentModel)) {
        console.log(`Requested model ${currentModel} is available.`);
        return true;
      }

      // Fallback logic
      console.warn(`Requested model ${currentModel} not found. Searching for fallback...`);

      // Prefer 2.5 flash, then 2.0 flash, then any flash
      const fallbacks = ['gemini-2.5-flash', 'gemini-2.0-flash', 'gemini-1.5-flash'];
      const foundFallback = fallbacks.find(f => availableModels.includes(f)) || availableModels.find(m => m.includes('flash'));

      if (foundFallback) {
        console.warn(`Switching to fallback model: ${foundFallback}`);
        currentModel = foundFallback;
        return true;
      } else if (availableModels.length > 0) {
        // Last resort: take the first available model that supports generateContent
        const firstGen = availableModels[0];
        console.warn(`No flash model found. Switching to generic fallback: ${firstGen}`);
        currentModel = firstGen;
        return true;
      }
    }
    return true;
  } catch (e) {
    console.error("Gemini Connection Validation Failed:", e);
    return false;
  }
}

async function callGeminiAPI(prompt: string, retries = 2): Promise<string> {
  if (!API_KEY) throw new Error("API Key is missing.");

  // Construct URL dynamically with currentModel
  const url = BASE_URL_TEMPLATE.replace('{model}', currentModel) + `?key=${API_KEY}`;

  const payload = {
    contents: [{ parts: [{ text: prompt }] }]
  };

  for (let i = 0; i <= retries; i++) {
    try {
      console.log(`Calling Gemini API (Attempt ${i + 1}) with model: ${currentModel}`);
      const response = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));

        console.error("Gemini API Error Detail:", {
          model: currentModel,
          status: response.status,
          statusText: response.statusText,
          url: url.replace(API_KEY, 'HIDDEN_KEY'), // Log safe URL
          errorBody: errorData
        });

        // Handle specific error codes
        if (response.status === 404) {
          throw new Error(`Model '${currentModel}' not found (404). Verification failed.`);
        }
        if (response.status === 429) {
          console.warn("Rate limit exceeded. Retrying...");
          await new Promise(res => setTimeout(res, 2000 * (i + 1))); // Exponential backoff
          continue;
        }

        throw new Error(`API Error ${response.status}: ${errorData.error?.message || response.statusText}`);
      }

      const data: GeminiResponse = await response.json();
      const text = data.candidates?.[0]?.content?.parts?.[0]?.text;

      if (!text) throw new Error("Empty response from Gemini API.");

      return text;
    } catch (error: any) {
      console.error("Gemini API Request Failed:", error);
      if (i === retries) throw error;
    }
  }
  throw new Error("Failed to connect to Gemini API after multiple attempts.");
}


// --- Exported Functions ---

export async function generateFullCareerReportAI(profile: any) {
  const prompt = `
    You are an expert Career Counsellor and AI Analyst. 
    Analyze the following student profile and generate a detailed career report in Strict JSON format.
    
    Student Profile:
    ${JSON.stringify(profile, null, 2)}
    
    Output strictly in this JSON format:
    {
      "executiveSummary": "Strategic high-level summary of their career potential (2-3 sentences)",
      "marketOutlook": number (0-100 indicating growth potential),
      "skillGapAnalysis": [
        { "skillName": "Specific Technical Skill", "priority": "High" | "Medium" | "Low" }
      ],
      "roiAnalysis": {
        "breakEvenMonths": number,
        "year1Salary": number (conservative estimate),
        "year5Salary": number,
        "year10Salary": number,
        "yearlySalaryProjection": [number, number, ... 10 values representing salary for years 1-10]
      },
      "timeMetrics": {
        "learningHoursRequired": number,
        "jobReadyWeeks": number,
        "burnoutRisk": number (0-100)
      },
      "strategicRecommendations": ["Actionable step 1", "Actionable step 2", "Actionable step 3"]
    }
    Do not include markdown formatting (like \`\`\`json). Just the raw JSON string.
  `;

  try {
    const text = await callGeminiAPI(prompt);
    const cleanedText = text.replace(/```json/g, '').replace(/```/g, '').trim();
    return JSON.parse(cleanedText);
  } catch (error) {
    console.error("AI Report Error:", error);
    throw error;
  }
}

export async function chatWithCareerMentor(history: { role: 'user' | 'model'; parts: { text: string }[] }[], message: string) {
  const conversationHistory = history.map(h => `${h.role === 'user' ? 'Student' : 'Mentor'}: ${h.parts[0].text}`).join('\n');

  const prompt = `
    You are an empathetic, expert Career Counsellor for Indian students.
    
    Conversation History:
    ${conversationHistory}
    
    Student: ${message}
    Mentor (You):
  `;

  return await callGeminiAPI(prompt);
}

export async function simulateCareerPath(profile: any) {
  const prompt = `
    Simulate a realistic career path based on this profile: ${JSON.stringify(profile)}
    
    Output strictly in this JSON format:
    {
      "overallRecommendation": "Summary string",
      "rankedPaths": [
         {
            "pathId": "career-path-1",
            "fitScore": 85,
            "projectedInitialSalary": 500000,
            "year5Salary": 1200000,
            "personalizedAdvice": "Advice string"
         }
      ]
    }
    Do not include markdown formatting.
  `;

  try {
    const text = await callGeminiAPI(prompt);
    const cleanedText = text.replace(/```json/g, '').replace(/```/g, '').trim();
    return JSON.parse(cleanedText);
  } catch (error) {
    console.error("Simulation Error:", error);
    throw error;
  }
}

export async function validateCourseAI(course: any, userProfile: any) {
  const prompt = `
    Analyze if this course is a good fit for the student.
    Course: ${JSON.stringify(course)}
    Student Profile: ${JSON.stringify(userProfile)}

    Output strictly in this JSON format:
    {
      "fitScore": number (0-100),
      "aiRecommendation": "2-3 sentences on why it fits or not",
      "pros": ["Pro 1", "Pro 2"],
      "cons": ["Con 1", "Con 2"],
      "roiEstimate": {
        "expectedSalaryIncrease": number (percentage),
        "breakEvenMonths": number
      }
    }
    No markdown.
  `;

  try {
    const text = await callGeminiAPI(prompt);
    const cleanedText = text.replace(/```json/g, '').replace(/```/g, '').trim();
    return JSON.parse(cleanedText);
  } catch (error) {
    console.error("Course Validation Error:", error);
    throw error;
  }
}

export async function getCareerRecommendationsAI(profile: any) {
  const prompt = `
    Analyze this student profile and suggest top 3 career paths in the Indian tech market.
    Profile: ${JSON.stringify(profile)}

    Output strictly in this JSON format:
    {
      "summary": "Brief encouraging summary of their potential",
      "recommendations": [
        {
          "title": "Job Title",
          "fitReason": "Why this fits their profile",
          "marketDemand": "High/Medium/Low",
          "averageSalary": "e.g. 8-12 LPA"
        }
      ]
    }
    No markdown.
  `;

  try {
    const text = await callGeminiAPI(prompt);
    const cleanedText = text.replace(/```json/g, '').replace(/```/g, '').trim();
    return JSON.parse(cleanedText);
  } catch (error) {
    console.error("Recommendation Error:", error);
    throw error;
  }
}

export async function generateRoadmapAI(role: string, skills: string, hours: number, weeks: number) {
  const prompt = `
    Create a ${weeks}-week study roadmap for becoming a "${role}".
    Current Skills: ${skills}.
    Weekly Commitment: ${hours} hours.

    Output strictly in this JSON format:
    {
      "roadmap": {
        "targetRole": "${role}",
        "totalWeeks": ${weeks},
        "phases": [
          {
            "title": "Phase Name",
            "projectIdea": "Capstone Project Idea",
            "weeks": [
              {
                "week": "Week 1",
                "topics": ["Topic 1", "Topic 2"],
                "resource": "Recommended course/doc"
              }
            ]
          }
        ]
      }
    }
    No markdown.
  `;

  try {
    const text = await callGeminiAPI(prompt);
    const cleanedText = text.replace(/```json/g, '').replace(/```/g, '').trim();
    return JSON.parse(cleanedText);
  } catch (error) {
    console.error("Roadmap Error:", error);
    throw error;
  }
}
