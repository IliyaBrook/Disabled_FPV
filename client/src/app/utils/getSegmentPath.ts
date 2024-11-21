export const getSegmentNamePath = (segmentIndex: number): string => {
  const pathname = window.location.pathname
  return pathname.split('/')[segmentIndex]
}
