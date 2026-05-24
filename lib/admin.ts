export const ADMIN_EMAIL = "waliullah9099@gmail.com"

export function isAdminEmail(email?: string | null) {
  return Boolean(email && email.toLowerCase() === ADMIN_EMAIL.toLowerCase())
}
