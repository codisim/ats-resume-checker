export const ADMIN_EMAIL = "waliullah9099@gmail.com"

type ClerkUserLike = {
  emailAddresses?: Array<{ id: string; emailAddress: string }>
  primaryEmailAddressId?: string | null
}

export function getClerkUserEmail(user?: ClerkUserLike | null) {
  if (!user) {
    return null
  }

  const primaryEmail = user.primaryEmailAddressId
    ? user.emailAddresses?.find(
        (address) => address.id === user.primaryEmailAddressId
      )?.emailAddress
    : null

  return primaryEmail ?? user.emailAddresses?.[0]?.emailAddress ?? null
}

export function isAdminEmail(email?: string | null) {
  return Boolean(email && email.toLowerCase() === ADMIN_EMAIL.toLowerCase())
}
