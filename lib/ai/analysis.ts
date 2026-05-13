type AnalysisInput = {
  resumeText: string
  jobDescription: string
}

export type LocalAnalysis = {
  matchedSkills: string[]
  missingSkills: string[]
  atsScore: number
  matchPercent: number
  strengths: string[]
  weaknesses: string[]
  suggestions: string[]
  improvedSummary: string
}

export type AiRewriteResult = {
  improvedSummary: string
  bulletPoints: string[]
  recruiterSuggestions: string[]
  atsOptimizedRewrite: string
}

const SKILL_KEYWORDS = [
  "typescript",
  "javascript",
  "react",
  "next.js",
  "nextjs",
  "node.js",
  "node",
  "express",
  "tailwind",
  "tailwindcss",
  "prisma",
  "postgresql",
  "mysql",
  "mongodb",
  "graphql",
  "rest api",
  "api",
  "redux",
  "zustand",
  "zustand",
  "docker",
  "kubernetes",
  "aws",
  "gcp",
  "azure",
  "git",
  "figma",
  "html",
  "css",
  "scss",
  "sass",
  "jest",
  "vitest",
  "cypress",
  "playwright",
  "react hook form",
  "zod",
  "framer motion",
  "recharts",
  "shadcn",
  "clerk",
  "graphql",
  "object-oriented",
  "agile",
  "scrum",
]

function normalize(text: string) {
  return text.toLowerCase().replace(/\s+/g, " ")
}

function unique(values: string[]) {
  return [...new Set(values)]
}

export function extractSkills(text: string) {
  const normalized = normalize(text)
  return unique(
    SKILL_KEYWORDS.filter((skill) => normalized.includes(skill)).map((skill) =>
      skill === "nextjs" ? "next.js" : skill
    )
  )
}

export function calculateLocalAnalysis({
  resumeText,
  jobDescription,
}: AnalysisInput): LocalAnalysis {
  const resumeSkills = extractSkills(resumeText)
  const jobSkills = extractSkills(jobDescription)
  const matchedSkills = resumeSkills.filter((skill) => jobSkills.includes(skill))
  const missingSkills = jobSkills.filter((skill) => !resumeSkills.includes(skill))
  const matchPercent = jobSkills.length
    ? Math.round((matchedSkills.length / jobSkills.length) * 100)
    : 0

  const atsScore = Math.min(
    100,
    Math.max(
      0,
      Math.round(
        matchPercent * 0.7 +
          Math.min(20, Math.round(resumeText.length / 400)) +
          (resumeText.includes("experience") ? 5 : 0) +
          (resumeText.includes("achievement") ? 3 : 0)
      )
    )
  )

  const strengths = unique(
    [
      matchedSkills.length ? `Matches ${matchedSkills.length} job skills` : "Clear structure detected",
      resumeText.length > 1200 ? "Detailed resume content" : "Concise resume content",
      resumeText.toLowerCase().includes("impact")
        ? "Uses impact-oriented language"
        : "Can be strengthened with measurable outcomes",
    ].filter(Boolean) as string[]
  )

  const weaknesses = unique(
    [
      missingSkills.length ? `${missingSkills.length} missing job keywords` : "Few keyword gaps",
      resumeText.toLowerCase().includes("responsible for")
        ? "Could use stronger achievement language"
        : "Could use more action verbs",
    ].filter(Boolean) as string[]
  )

  const suggestions = unique(
    [
      missingSkills.length
        ? `Add keywords like: ${missingSkills.slice(0, 5).join(", ")}`
        : "Keep the keywords aligned with the role.",
      "Quantify accomplishments with numbers when possible.",
      "Mirror the job description wording in your summary and bullet points.",
    ]
  )

  return {
    matchedSkills,
    missingSkills,
    atsScore,
    matchPercent,
    strengths,
    weaknesses,
    suggestions,
    improvedSummary:
      "Your resume is structured well, but it can be tuned with more job-specific keywords, clearer impact statements, and stronger measurable outcomes.",
  }
}

function buildPrompt({
  resumeText,
  jobDescription,
  analysis,
}: {
  resumeText: string
  jobDescription: string
  analysis: LocalAnalysis
}) {
  return [
    "You are an expert ATS resume writer.",
    "Return ONLY valid JSON with these keys:",
    "{ improvedSummary: string, bulletPoints: string[], recruiterSuggestions: string[], atsOptimizedRewrite: string }",
    "Write in a recruiter-friendly tone.",
    "Focus on missing keywords and measurable impact.",
    `ATS score: ${analysis.atsScore}`,
    `Matched skills: ${analysis.matchedSkills.join(", ") || "none"}`,
    `Missing skills: ${analysis.missingSkills.join(", ") || "none"}`,
    "Resume text:",
    resumeText,
    "Job description:",
    jobDescription,
  ].join("\n\n")
}

function extractJsonCandidate(raw: string) {
  const start = raw.indexOf("{")
  const end = raw.lastIndexOf("}")
  if (start === -1 || end === -1 || end <= start) {
    return null
  }

  return raw.slice(start, end + 1)
}

export async function generateAiRewrite(args: {
  resumeText: string
  jobDescription: string
  analysis: LocalAnalysis
}) {
  const apiKey = process.env.GEMINI_API_KEY

  if (!apiKey) {
    return {
      improvedSummary: args.analysis.improvedSummary,
      bulletPoints: [
        "Refine your summary to include the target role and stack.",
        "Add measurable impact to 2-3 bullets.",
        "Keep the most relevant skills near the top.",
      ],
      recruiterSuggestions: args.analysis.suggestions,
      atsOptimizedRewrite: args.resumeText,
    } satisfies AiRewriteResult
  }

  const response = await fetch(
    "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-goog-api-key": apiKey,
      },
      body: JSON.stringify({
        system_instruction: {
          parts: [
            {
              text: "You rewrite resumes for ATS optimization. Return JSON only.",
            },
          ],
        },
        contents: [
          {
            parts: [
              {
                text: buildPrompt(args),
              },
            ],
          },
        ],
      }),
    }
  )

  if (!response.ok) {
    throw new Error(`Gemini request failed with status ${response.status}`)
  }

  const payload = (await response.json()) as {
    candidates?: Array<{
      content?: {
        parts?: Array<{ text?: string }>
      }
    }>
  }

  const rawText = payload.candidates?.[0]?.content?.parts?.[0]?.text ?? ""
  const jsonText = extractJsonCandidate(rawText) ?? rawText

  try {
    const parsed = JSON.parse(jsonText) as Partial<AiRewriteResult>
    return {
      improvedSummary:
        parsed.improvedSummary ?? args.analysis.improvedSummary,
      bulletPoints: parsed.bulletPoints ?? [],
      recruiterSuggestions: parsed.recruiterSuggestions ?? args.analysis.suggestions,
      atsOptimizedRewrite: parsed.atsOptimizedRewrite ?? args.resumeText,
    } satisfies AiRewriteResult
  } catch {
    return {
      improvedSummary: rawText || args.analysis.improvedSummary,
      bulletPoints: [],
      recruiterSuggestions: args.analysis.suggestions,
      atsOptimizedRewrite: args.resumeText,
    } satisfies AiRewriteResult
  }
}
