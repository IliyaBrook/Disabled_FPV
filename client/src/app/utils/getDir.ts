import type { TDir } from '@/app/types'

export const getDir = (): TDir =>
  <TDir>document.documentElement.getAttribute('dir')
