export function isPhone(phone: string): boolean {
  return /^(86){0,1}[1][3,4,5,6,7,8,9]\d{9}$/.test(phone)
}
export function isEmail(email: string): boolean {
  return /^[a-zA-Z0-9]+([-_.][a-zA-Z0-9]+)*@[a-zA-Z0-9]+([-_.][a-zA-Z0-9]+)*\.[a-z]{2,}$/.test(email)
}
export function isRealProduction(): boolean {
  return Boolean(import.meta.env.VITE_IS_REAL_PRODUCTION)
}
export function isPreviewableImageUrl(url: string): boolean {
  const formats = ['.jpeg', '.jpg', '.png', '.svg', '.jif', '.bmp', '.pic']
  return formats.find(format => url.endsWith(format)) ? true : false
}
export function isPDFUrl(url: string): boolean {
  return url.endsWith('.pdf')
}
export function isDOCUrl(url: string): boolean {
  const docs = ['.doc', '.docx']
  return docs.find(doc => url.endsWith(doc)) ? true : false
}
