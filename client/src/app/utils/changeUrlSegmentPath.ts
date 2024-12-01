export const changeUrlSegmentPath = (
  newSegment: string,
  segmentIndex = 0
): string => {
  if (typeof window === 'undefined') {
    throw new Error('This function must be called in a browser environment.')
  }

  const pathname = window.location.pathname
  const segments = pathname.split('/').filter(Boolean)

  segments[segmentIndex] = newSegment

  return `/${segments.join('/')}`
}
