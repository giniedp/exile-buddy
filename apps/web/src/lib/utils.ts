export function normalizeIdString(id: string) {
  return id.toLowerCase().replaceAll(' ', '')
}
export interface BreadcrumbType {
  text: string
  href: string
}

export function getBreadcrumbs(path: string): BreadcrumbType[] {
  return path
    .split('/')
    .reverse()
    .map((token, index): BreadcrumbType => {
      return {
        text: token,
        href: './' + '../'.repeat(index),
      }
    })
    .reverse()
    .filter((it) => !!it.text)
}
