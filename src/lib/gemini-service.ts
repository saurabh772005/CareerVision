
import { GoogleGenerativeAI } from "@google/generative-ai";

const getAI = () => {
  const apiKey = import.meta.env.VITE_API_KEY || '';
  if (!apiKey) {
    console.error("CRITICAL: API_KEY is missing. AI features will not work.");
    throw new Error("API Key is missing. Please check your configuration.");
  }
  const genAI = new GoogleGenerativeAI(apiKey);
  console.log("Initialized GoogleGenerativeAI with key:", apiKey.substring(0, 5) + "...");
  return genAI;
};

export async function generateFullCareerReportAI(profile: any) {
  const genAI = getAI();
  const modelName = "gemini-pro";
  console.log("Generating Career Report with model:", modelName);
  let model = genAI.getGenerativeModel({ model: modelName });

  const prompt = `
    You are an expert Career Counsellor and AI Analyst. 
    Analyze the following student profile and generate a detailed career report in Strict JSON format.
    
    Student Profile:
    ${JSON.stringify(profile, null, 2)}
    
    Output strictly in this JSON format:
    {
      "matchScore": number (0-100),
      "topRoles": ["Role 1", "Role 2", "Role 3"],
      "skillsGap": ["Skill 1", "Skill 2"],
      "marketTrends": "Brief analysis of current market demand for these roles",
      "salaryRange": "Expected salary range in INR",
      "roadmap": [
        { "phase": "Month 1-2", "focus": "Topic", "resources": ["Resource 1"] },
        { "phase": "Month 3-4", "focus": "Topic", "resources": ["Resource 2"] }
      ]
    }
    Do not include markdown formatting (like \`\`\`json). Just the raw JSON string.
  `;

  try {
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();

    // Clean up if markdown is present
    const cleanedText = text.replace(/```json/g, '').replace(/```/g, '').trim();
    return JSON.parse(cleanedText);
  } catch (error: any) {
    console.error("AI Report Error (Gemini Pro):", error);
    throw error;
  }
}

export async function chatWithCareerMentor(history: { role: 'user' | 'model'; parts: { text: string }[] }[], message: string) {
  const genAI = getAI();
  const modelName = "gemini-pro";
  console.log("Starting Chat with model:", modelName);

  const model = genAI.getGenerativeModel({
    model: modelName,
    systemInstruction: `You are an empathetic, expert Career Counsellor for Indian students. 
      Your goal is to provide personalized, actionable, and encouraging advice.
      - Context: The user is a student exploring career options, likely from a Tier-2/3 college.
      - Tone: Professional yet friendly, motivating, and realistic.
      - Knowledge: deeply familiar with the Indian tech market, salaries, placement scenarios, and learning resources (DSA, Web Dev, etc.).
      - Capabilities: You can help with study schedules, roadmap customization, resume tips, and mock interview questions.
      - Constraint: Keep answers concise (under 200 words) unless asked for a detailed explanation. Use bullet points for clarity.`
  });

  // Helper to map roles correctly if needed (Gemini SDK uses 'user' and 'model')
  // The history passed in is already in { role, parts } format, matching the SDK mostly.

  const chat = model.startChat({
    history: history.map(h => ({
      role: h.role,
      parts: h.parts
    })),
  });

  const result = await chat.sendMessage(message);
  const response = await result.response;
  return response.text();
}

export async function simulateCareerPath(currentRole: string, targetRole: string) {
  const genAI = getAI();
  const modelName = "gemini-pro";
  console.log("Simulating Career Path with model:", modelName);
  const model = genAI.getGenerativeModel({ model: modelName });

  const prompt = `
    Simulate a realistic career path transition from "${currentRole}" to "${targetRole}" in the Indian tech market.
    
    Output strictly in this JSON format:
    {
      "feasibilityScore": number (0-100),
      "timeToTransition": "e.g. 6-12 months",
      "salaryGrowth": "e.g. 40-60%",
      "simulationSteps": [
        { "year": "Year 1", "role": "Intermediate Role", "action": "Key skill or project to focus on" },
        { "year": "Year 2", "role": "${targetRole}", "action": "Final preparation step" }
      ],
      "challenges": ["Challenge 1", "Challenge 2"]
    }
    Do not include markdown formatting (like \`\`\`json). Just the raw JSON string.
  `;

  try {
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();
    const cleanedText = text.replace(/```json/g, '').replace(/```/g, '').trim();
    return JSON.parse(cleanedText);
  } catch (error) {
    console.error("Career Simulation Error:", error);
    throw error;
  }
}

export async function validateCourseAI(course: any, userProfile: any) {
  const genAI = getAI();
  const modelName = "gemini-pro";
  console.log("Validating Course with model:", modelName);
  const model = genAI.getGenerativeModel({ model: modelName });

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
    Do not include markdown formatting (like \`\`\`json). Just the raw JSON string.
  `;

  try {
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();
    const cleanedText = text.replace(/```json/g, '').replace(/```/g, '').trim();
    return JSON.parse(cleanedText);
  } catch (error) {
    console.error("Course Validation Error:", error);
    throw error;
  }
}

export async function getCareerRecommendationsAI(profile: any) {
  const genAI = getAI();
  const modelName = "gemini-pro";
  console.log("Generating Recommendations with model:", modelName);
  const model = genAI.getGenerativeModel({ model: modelName });

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
    const result = await model.generateContent(prompt);
    const text = result.response.text();
    return JSON.parse(text.replace(/```json/g, '').replace(/```/g, '').trim());
  } catch (error) {
    console.error("Recommendation Error:", error);
    throw error;
  }
}

export async function generateRoadmapAI(role: string, skills: string, hours: number, weeks: number) {
  const genAI = getAI();
  const modelName = "gemini-pro";
  console.log("Generating Roadmap with model:", modelName);
  const model = genAI.getGenerativeModel({ model: modelName });

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
    const result = await model.generateContent(prompt);
    const text = result.response.text();
    return JSON.parse(text.replace(/```json/g, '').replace(/```/g, '').trim());
  } catch (error) {
    console.error("Roadmap Error:", error);
    throw error;
  }
}
