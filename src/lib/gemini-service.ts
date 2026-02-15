
import { GoogleGenAI, Type } from "@google/genai";

const getAI = () => {
  const apiKey = import.meta.env.VITE_API_KEY || process.env.VITE_API_KEY || process.env.API_KEY || '';
  if (!apiKey) {
    console.error("CRITICAL: API_KEY is missing. AI features will not work.");
    throw new Error("API Key is missing. Please check your configuration.");
  }
  return new GoogleGenAI({ apiKey });
};

export async function generateFullCareerReportAI(profile: any) {
  const ai = getAI();
  const prompt = `
    Generate a highly detailed, professional Career Intelligence Report for an Indian student:
    - Profile: Tier ${profile.collegeType}, ${profile.branch || 'N/A'} Branch, CGPA: ${profile.cgpa}
    - Budget: ₹${profile.budget || 0}
    - Goal: ${profile.goal || 'Career Growth'}
    - Knowledge: ${profile.knowledgeLevel || 'Intermediate'}

    The report must include:
    1. executiveSummary (Professional overview of career trajectory)
    2. roiAnalysis (JSON with: initialInvestment, breakEvenMonths, year1Salary, year5Salary, year10Salary, yearlySalaryProjection as array of 10 numbers)
    3. timeMetrics (JSON with: learningHoursRequired, jobReadyWeeks, burnoutRisk percentage)
    4. skillGapAnalysis (Array of objects with skillName and priority level)
    5. strategicRecommendations (Top 3 actionable steps)
    6. marketOutlook (Growth percentage for their chosen field)
  `;

  const response = await ai.models.generateContent({
    model: 'gemini-1.5-flash',
    contents: [{ parts: [{ text: prompt }] }],
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          executiveSummary: { type: Type.STRING },
          roiAnalysis: {
            type: Type.OBJECT,
            properties: {
              initialInvestment: { type: Type.NUMBER },
              breakEvenMonths: { type: Type.NUMBER },
              year1Salary: { type: Type.NUMBER },
              year5Salary: { type: Type.NUMBER },
              year10Salary: { type: Type.NUMBER },
              yearlySalaryProjection: {
                type: Type.ARRAY,
                items: { type: Type.NUMBER }
              }
            },
            required: ["initialInvestment", "breakEvenMonths", "year1Salary", "year5Salary", "year10Salary", "yearlySalaryProjection"]
          },
          timeMetrics: {
            type: Type.OBJECT,
            properties: {
              learningHoursRequired: { type: Type.NUMBER },
              jobReadyWeeks: { type: Type.NUMBER },
              burnoutRisk: { type: Type.NUMBER }
            },
            required: ["learningHoursRequired", "jobReadyWeeks", "burnoutRisk"]
          },
          skillGapAnalysis: {
            type: Type.ARRAY,
            items: {
              type: Type.OBJECT,
              properties: {
                skillName: { type: Type.STRING },
                priority: { type: Type.STRING, description: "Low/Medium/High" }
              }
            }
          },
          strategicRecommendations: { type: Type.ARRAY, items: { type: Type.STRING } },
          marketOutlook: { type: Type.NUMBER }
        },
        required: ["executiveSummary", "roiAnalysis", "timeMetrics", "skillGapAnalysis", "strategicRecommendations", "marketOutlook"]
      }
    }
  });

  return JSON.parse(response.text || '{}');
}

export async function getCareerRecommendationsAI(profile: any) {
  const ai = getAI();
  const prompt = `
    Based on the following student profile, suggest 3-4 optimal career paths in the Indian tech/corporate ecosystem:
    - College Tier: ${profile.collegeType}
    - CGPA: ${profile.cgpa}
    - Interests: ${profile.interests}
    - Strengths: ${profile.strengths}
    - Current Knowledge Level: ${profile.knowledgeLevel} (Beginner/Intermediate/Advanced)
    
    For each path, provide:
    1. title (e.g., "Full-Stack Web Developer", "Data Analyst", "Product Manager")
    2. fitReason (Why it suits them)
    3. difficulty (Easy/Medium/Hard)
    4. marketDemand (High/Medium/Low)
    5. averageSalary (e.g., "₹6L - ₹12L")
  `;

  const response = await ai.models.generateContent({
    model: 'gemini-1.5-flash',
    contents: [{ parts: [{ text: prompt }] }],
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          recommendations: {
            type: Type.ARRAY,
            items: {
              type: Type.OBJECT,
              properties: {
                title: { type: Type.STRING },
                fitReason: { type: Type.STRING },
                difficulty: { type: Type.STRING },
                marketDemand: { type: Type.STRING },
                averageSalary: { type: Type.STRING }
              },
              required: ["title", "fitReason", "difficulty", "marketDemand", "averageSalary"]
            }
          },
          summary: { type: Type.STRING }
        },
        required: ["recommendations", "summary"]
      }
    }
  });

  return JSON.parse(response.text || '{}');
}

export async function simulateCareerPath(profile: any, comparisonPaths: any[] = []) {
  const ai = getAI();
  const prompt = `
    Analyze this Indian student's career potential for ROI:
    - College: ${profile.collegeType}
    - Branch: ${profile.branch}
    - CGPA: ${profile.cgpa}
    - Skills: ${profile.skills}
    - Goal: ${profile.goal}
    - Budget: ₹${profile.budget}
    
    Predict 3 distinct career paths. For each path, return:
    1. pathId (e.g., "Full-Stack-Dev", "MTech-IIT", "MS-Abroad")
    2. fitScore (0-100)
    3. reasoning (Why this fits)
    4. personalizedAdvice (One actionable tip)
    5. successProbability (0-100)
    6. risks (Array of strings)
    7. projectedInitialSalary (Annual in INR)
    8. year5Salary (Annual in INR)
  `;

  const response = await ai.models.generateContent({
    model: 'gemini-1.5-flash',
    contents: [{ parts: [{ text: prompt }] }],
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          rankedPaths: {
            type: Type.ARRAY,
            items: {
              type: Type.OBJECT,
              properties: {
                pathId: { type: Type.STRING },
                fitScore: { type: Type.NUMBER },
                reasoning: { type: Type.STRING },
                personalizedAdvice: { type: Type.STRING },
                successProbability: { type: Type.NUMBER },
                risks: { type: Type.ARRAY, items: { type: Type.STRING } },
                projectedInitialSalary: { type: Type.NUMBER },
                year5Salary: { type: Type.NUMBER }
              },
              required: ["pathId", "fitScore", "reasoning", "personalizedAdvice", "successProbability", "risks", "projectedInitialSalary", "year5Salary"]
            }
          },
          overallRecommendation: { type: Type.STRING }
        },
        required: ["rankedPaths", "overallRecommendation"]
      }
    }
  });

  return JSON.parse(response.text || '{}');
}

export async function validateCourseAI(course: any, profile: any) {
  const ai = getAI();
  const prompt = `
    Analyze this course/bootcamp for fit:
    Course Name/Link: ${course.name || course.url}
    Provider: ${course.provider || "Unknown"}
    Price: ₹${course.price || "Unknown"}
    
    Student Profile: Tier ${profile.collegeType}, CGPA ${profile.cgpa}, Skills: ${profile.skills}

    Evaluate ROI and Fit.
  `;

  const response = await ai.models.generateContent({
    model: 'gemini-1.5-flash',
    contents: [{ parts: [{ text: prompt }] }],
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          fitScore: { type: Type.NUMBER },
          aiRecommendation: { type: Type.STRING },
          roiEstimate: {
            type: Type.OBJECT,
            properties: {
              expectedSalaryIncrease: { type: Type.NUMBER },
              breakEvenMonths: { type: Type.NUMBER }
            },
            required: ["expectedSalaryIncrease", "breakEvenMonths"]
          },
          pros: { type: Type.ARRAY, items: { type: Type.STRING } },
          cons: { type: Type.ARRAY, items: { type: Type.STRING } }
        },
        required: ["fitScore", "aiRecommendation", "roiEstimate", "pros", "cons"]
      }
    }
  });

  return JSON.parse(response.text || '{}');
}

export async function generateRoadmapAI(targetRole: string, currentSkills: string | string[], hoursPerWeek: number = 20, weeks: number = 8, budget: number = 0) {
  const ai = getAI();
  const skillsStr = Array.isArray(currentSkills) ? currentSkills.join(", ") : currentSkills;
  const prompt = `
    Create a detailed ${weeks} week roadmap to reach this goal: ${targetRole}.
    Current skills: ${skillsStr}.
    Availability: ${hoursPerWeek} hrs/week.
    Return phases with specific topics and 1 project idea per phase.
  `;

  const response = await ai.models.generateContent({
    model: 'gemini-1.5-flash',
    contents: [{ parts: [{ text: prompt }] }],
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          roadmap: {
            type: Type.OBJECT,
            properties: {
              targetRole: { type: Type.STRING },
              totalWeeks: { type: Type.NUMBER },
              phases: {
                type: Type.ARRAY,
                items: {
                  type: Type.OBJECT,
                  properties: {
                    title: { type: Type.STRING },
                    weeks: {
                      type: Type.ARRAY,
                      items: {
                        type: Type.OBJECT,
                        properties: {
                          week: { type: Type.NUMBER },
                          topics: { type: Type.ARRAY, items: { type: Type.STRING } },
                          resource: { type: Type.STRING }
                        },
                        required: ["week", "topics", "resource"]
                      }
                    },
                    projectIdea: { type: Type.STRING }
                  },
                  required: ["title", "weeks", "projectIdea"]
                }
              }
            },
            required: ["targetRole", "totalWeeks", "phases"]
          }
        },
        required: ["roadmap"]
      }
    }
  });

  return JSON.parse(response.text || '{}');
}

export async function generateSeedData(dataType: string, count: number) {
  const ai = getAI();
  const prompt = `Generate ${count} realistic placeholder data entries for the category: "${dataType}" in the context of an Indian career platform. Return a JSON array of objects with relevant fields.`;

  const response = await ai.models.generateContent({
    model: 'gemini-1.5-flash',
    contents: [{ parts: [{ text: prompt }] }],
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.ARRAY,
        items: {
          type: Type.OBJECT,
          properties: {
            title: { type: Type.STRING },
            name: { type: Type.STRING },
            description: { type: Type.STRING },
            role: { type: Type.STRING },
            company: { type: Type.STRING },
            price: { type: Type.NUMBER }
          }
        }
      }
    }
  });

  try {
    return JSON.parse(response.text || '[]');
  } catch (e) {
    return [];
  }
}


export async function chatWithCareerMentor(history: { role: 'user' | 'model'; parts: { text: string }[] }[], message: string) {
  const ai = getAI();

  const systemInstruction = `You are an empathetic, expert Career Counsellor for Indian students. 
    Your goal is to provide personalized, actionable, and encouraging advice.
    - Context: The user is a student exploring career options, likely from a Tier-2/3 college.
    - Tone: Professional yet friendly, motivating, and realistic.
    - Knowledge: deeply familiar with the Indian tech market, salaries, placement scenarios, and learning resources (DSA, Web Dev, etc.).
    - Capabilities: You can help with study schedules, roadmap customization, resume tips, and mock interview questions.
    - Constraint: Keep answers concise (under 200 words) unless asked for a detailed explanation. Use bullet points for clarity.`;

  // Construct the full conversation history for the stateless API
  const contents = [
    ...history,
    { role: 'user', parts: [{ text: message }] }
  ];

  const response = await ai.models.generateContent({
    model: 'gemini-1.5-flash',
    contents: contents as any,
    config: {
      systemInstruction: { parts: [{ text: systemInstruction }] },
      maxOutputTokens: 1000,
    }
  });

  return response.text || '';
}

