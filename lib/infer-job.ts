const TITLE_LABEL = /^(?:job\s*title|title|position|role|opening)\s*[:\-]\s*(.+)$/i
const COMPANY_LABEL = /^(?:company|employer|organization|organisation)\s*[:\-]\s*(.+)$/i

function clip(value: string, max = 60) {
  const trimmed = value.replace(/\s+/g, " ").trim()
  if (trimmed.length <= max) return trimmed
  return `${trimmed.slice(0, max).trim()}…`
}

function looksLikeHeading(line: string) {
  if (line.length < 4 || line.length > 80) return false
  if (/[.!?]{2,}/.test(line)) return false
  if (/https?:\/\//i.test(line)) return false
  if (/^(we are|we're|about|job description|responsibilities|requirements|summary)/i.test(line)) {
    return false
  }
  return true
}

export function inferJobFromDescription(
  jobDescription: string,
  provided?: { title?: string | null; company?: string | null }
) {
  const lines = jobDescription
    .split(/\r?\n/)
    .map((line) => line.replace(/[#*_`>-]/g, "").trim())
    .filter(Boolean)

  let title = provided?.title?.trim() || ""
  let company = provided?.company?.trim() || ""

  for (const line of lines.slice(0, 40)) {
    const titleMatch = line.match(TITLE_LABEL)
    if (!title && titleMatch?.[1]) {
      title = titleMatch[1]
    }
    const companyMatch = line.match(COMPANY_LABEL)
    if (!company && companyMatch?.[1]) {
      company = companyMatch[1]
    }
  }

  if (!title) {
    const heading = lines.find(looksLikeHeading)
    title = heading || lines[0] || "Job analysis"
  }

  return {
    title: clip(title, 60),
    company: company ? clip(company, 60) : null,
  }
}
