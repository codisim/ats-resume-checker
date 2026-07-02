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

    // Guard against non A-Z characters producing garbage emoji
    if (codePoints.some((cp) => cp < 0x1f1e6 || cp > 0x1f1ff)) {
        return null
    }

    return String.fromCodePoint(...codePoints)
}

/**
 * Best-effort country name lookup from a 2-letter code, using Intl
 * (no extra dependency / API call needed).
 */
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

type NewUserSignupNotificationInput = {
    name?: string | null
    email?: string | null
    imageUrl?: string | null
    countryCode?: string | null
}

/**
 * Sends a "new user signed up" notification to the admin Discord channel.
 * Fails silently (logs a warning) so a Discord outage never breaks signup.
 */
export async function notifyNewUserSignup({
    name,
    email,
    imageUrl,
    countryCode,
}: NewUserSignupNotificationInput) {
    const webhookUrl = process.env.DISCORD_WEBHOOK

    if (!webhookUrl) {
        console.warn("DISCORD_WEBHOOK is not configured; skipping signup notification.")
        return
    }

    const displayName = name?.trim() || "new user"
    const displayNameForNotification = "Resume Tailor: Captain Hook"

    const flag = countryCodeToFlagEmoji(countryCode) ?? "🌍"
    const countryName = countryCodeToName(countryCode) ?? "Unknown"
    const countryLabel = `${flag} ${countryName}`
    const signupTitle = `${displayName} signed up from ${countryLabel} at ${formatCurrentTime()}`

    const embed = {
        title: signupTitle,
        description: email ? email : "New Daylog user",
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
        ],
        timestamp: new Date().toISOString(),
    }

    try {
        const response = await fetch(webhookUrl, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                content: signupTitle,
                // username: displayName,
                avatar_url: imageUrl || undefined,
                embeds: [embed],
            }),
        })

        if (!response.ok) {
            console.warn(
                `Discord webhook responded with ${response.status} ${response.statusText}`
            )
        }
    } catch (error) {
        // Never let a Discord outage break the signup flow.
        console.warn("Failed to send Discord signup notification.", error)
    }
}
