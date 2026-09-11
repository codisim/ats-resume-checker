const FETCH_TIMEOUT_MS = 8000
const MAX_CHARS = 12000

function stripHtml(html: string) {
  return html
    .replace(/<script[\s\S]*?<\/script>/gi, " ")
    .replace(/<style[\s\S]*?<\/style>/gi, " ")
    .replace(/<[^>]+>/g, " ")
    .replace(/&nbsp;/gi, " ")
    .replace(/&amp;/gi, "&")
    .replace(/&quot;/gi, '"')
    .replace(/&#39;/gi, "'")
    .replace(/&lt;/gi, "<")
    .replace(/&gt;/gi, ">")
    .replace(/\s+/g, " ")
    .trim()
}

export async function fetchJobDescriptionFromUrl(rawUrl: string) {
  let parsed: URL
  try {
    parsed = new URL(rawUrl)
  } catch {
    throw new Error("Enter a valid http or https job URL.")
  }

  if (parsed.protocol !== "http:" && parsed.protocol !== "https:") {
    throw new Error("Only http and https URLs are supported.")
  }

  const isLinkedIn = parsed.hostname.replace(/^www\./, "").includes("linkedin.com")

  const controller = new AbortController()
  const timeout = setTimeout(() => controller.abort(), FETCH_TIMEOUT_MS)

  try {
    const response = await fetch(parsed.toString(), {
      signal: controller.signal,
      redirect: "follow",
      headers: {
        "User-Agent":
          "Mozilla/5.0 (compatible; ATSResumeChecker/1.0; +https://resume.codisim.com)",
        Accept: "text/html,application/xhtml+xml,text/plain;q=0.9",
      },
    })

    if (!response.ok) {
      throw new Error(
        isLinkedIn
          ? "LinkedIn blocked this page. Paste the job description text instead."
          : "Could not load that job URL. Paste the description text instead."
      )
    }

    const html = await response.text()
    const text = stripHtml(html).slice(0, MAX_CHARS)

    if (text.length < 80) {
      throw new Error(
        isLinkedIn
          ? "LinkedIn does not expose the full job post here. Paste the JD text instead."
          : "That page did not contain enough job description text. Paste it instead."
      )
    }

    return { text, isLinkedIn }
  } catch (error) {
    if (error instanceof Error && error.name === "AbortError") {
      throw new Error("That URL took too long to load. Paste the job description instead.")
    }
    throw error
  } finally {
    clearTimeout(timeout)
  }
}
