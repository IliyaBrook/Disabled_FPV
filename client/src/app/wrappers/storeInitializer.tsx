'use client'

import { setLocalization } from '@/app/store/slices/localization.slice'
import type React from 'react'
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import type { TDict, TLangOptions, TDir } from '@/app/types/local.types'

interface StoreInitializerProps {
  lang: TLangOptions
  dir: TDir
  dictionary: TDict
}

const StoreInitializer: React.FC<StoreInitializerProps> = ({
  lang,
  dir,
  dictionary,
}) => {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(setLocalization({ lang, dir, dictionary }))
  }, [lang, dir, dictionary, dispatch])

  return null
}

export default StoreInitializer
