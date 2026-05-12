export function hasRole(userRoles: string[], allowed: string[]) {
  return userRoles.some(role => allowed.includes(role));
}
