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

export function recordIdToSlug(id: string) {
  if (!id) {
    return id
  }
  return id.replace(/\//g, '-').toLowerCase()
}

export function recordIdFromSlug(slug: string) {
  if (!slug) {
    return slug
  }
  return slug.replace(/-/g, '\/')
}

export function getImageUrl(file: string) {
  if (!file) {
    return file
  }
  if (file.startsWith('http')) {
    return file
  }
  file = file.replace(/\.dds$/, '.webp')
  if (!file.startsWith('/')) {
    file =  '/' + file
  }
  return '/cdn' + file
}

export function eqIgnoreCase(a: string, b: string) {
  return a?.toLowerCase() === b?.toLowerCase()
}
