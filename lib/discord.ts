/**
 * Converts a 2-letter ISO country code (e.g. "FR", "US") into its flag emoji.
 * Falls back to null if the code is missing or malformed.
 */
function countryCodeToFlagEmoji(countryCode?: string | null): string | null {
    if (!countryCode || countryCode.length !== 2) {
        return null
    }

    const codePoints = countryCode
        .toUpperCase()
        .split("")
        .map((char) => 0x1f1e6 - 65 + char.charCodeAt(0))

    if (codePoints.some((cp) => cp < 0x1f1e6 || cp > 0x1f1ff)) {
        return null
    }

    return String.fromCodePoint(...codePoints)
}

function countryCodeToName(countryCode?: string | null): string | null {
    if (!countryCode || countryCode.length !== 2) {
        return null
    }

    try {
        const displayNames = new Intl.DisplayNames(["en"], { type: "region" })
        return displayNames.of(countryCode.toUpperCase()) ?? null
    } catch {
        return null
    }
}

function formatCurrentTime() {
    return new Intl.DateTimeFormat("en-US", {
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: false,
    }).format(new Date())
}

function clientLabel(source?: string | null) {
    if (source === "mobile") return "Mobile"
    if (source === "web") return "Web"
    return "Unknown"
}

async function postDiscord(payload: Record<string, unknown>) {
    const webhookUrl = process.env.DISCORD_WEBHOOK

    if (!webhookUrl) {
        console.warn("DISCORD_WEBHOOK is not configured; skipping notification.")
        return
    }

    try {
        const response = await fetch(webhookUrl, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                username: "ATS Resume Checker",
                ...payload,
            }),
        })

        if (!response.ok) {
            console.warn(
                `Discord webhook responded with ${response.status} ${response.statusText}`
            )
        }
    } catch (error) {
        console.warn("Failed to send Discord notification.", error)
    }
}

type NewUserSignupNotificationInput = {
    name?: string | null
    email?: string | null
    imageUrl?: string | null
    countryCode?: string | null
    source?: string | null
}

export async function notifyNewUserSignup({
    name,
    email,
    imageUrl,
    countryCode,
    source,
}: NewUserSignupNotificationInput) {
    const displayName = name?.trim() || "new user"
    const flag = countryCodeToFlagEmoji(countryCode) ?? "🌍"
    const countryName = countryCodeToName(countryCode) ?? "Unknown"
    const countryLabel = `${flag} ${countryName}`
    const signupTitle = `${displayName} signed up from ${countryLabel} at ${formatCurrentTime()}`

    await postDiscord({
        content: signupTitle,
        avatar_url: imageUrl || undefined,
        embeds: [
            {
                title: signupTitle,
                description: email || "New ATS Resume Checker user",
                color: 0x22c55e,
                thumbnail: imageUrl ? { url: imageUrl } : undefined,
                fields: [
                    {
                        name: "User",
                        value: email ? `${displayName}\n${email}` : displayName,
                        inline: true,
                    },
                    {
                        name: "Country",
                        value: countryLabel,
                        inline: true,
                    },
                    {
                        name: "Client",
                        value: clientLabel(source),
                        inline: true,
                    },
                ],
                timestamp: new Date().toISOString(),
            },
        ],
    })
}

type AnalysisNotificationInput = {
    name?: string | null
    email?: string | null
    jobTitle?: string | null
    atsScore?: number | null
    source?: string | null
}

export async function notifySuccessfulAnalysis({
    name,
    email,
    jobTitle,
    atsScore,
    source,
}: AnalysisNotificationInput) {
    const displayName = name?.trim() || email || "a user"
    const title = `${displayName} analyzed a resume (score ${atsScore ?? "?"})`
    await postDiscord({
        content: title,
        embeds: [
            {
                title,
                color: 0x14999c,
                fields: [
                    {
                        name: "User",
                        value: email || displayName,
                        inline: true,
                    },
                    {
                        name: "Job",
                        value: jobTitle || "Untitled job",
                        inline: true,
                    },
                    {
                        name: "Client",
                        value: clientLabel(source),
                        inline: true,
                    },
                ],
                timestamp: new Date().toISOString(),
            },
        ],
    })
}
