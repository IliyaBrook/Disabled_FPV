'use client'
import { usePathname } from 'next/navigation'

export const useChangeUrlSegmentPath = (): ((
  newSegment: string,
  segmentIndex?: number
) => string) => {
  const pathname = usePathname()
  const segments = pathname.split('/').filter(Boolean)
  return (newSegment: string, segmentIndex = 0) => {
    segments[segmentIndex] = newSegment
    return `/${segments.join('/')}`
  }
}
