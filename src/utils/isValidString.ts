export function isValidString(str: unknown): str is string {
  return typeof str === 'string' && str.length > 0
}
