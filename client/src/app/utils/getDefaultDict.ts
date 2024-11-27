import enLocal from '@/app/dictionaries/en.json'

import type { TDict } from '@/app/types/shareable.types'

export const getDefaultDict = Object.entries(enLocal).reduce<TDict>(
  (acc, [key]) => {
    return { ...acc, [key]: '' }
  },
  {} as TDict
)
