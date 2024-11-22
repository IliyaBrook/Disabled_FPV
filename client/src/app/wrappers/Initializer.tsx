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

const Initializer: React.FC<StoreInitializerProps> = ({
  lang,
  dir,
  dictionary,
}) => {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(setLocalization({ lang, dir, dictionary }))
  }, [lang, dir, dictionary, dispatch])
  useEffect(() => {
    const footerSelector = document.getElementById('footer')
    const navBarSelector = document.getElementById('navBar')
    if (footerSelector && navBarSelector) {
      const navBarHeight = navBarSelector.offsetHeight
      const footerHeight = footerSelector.offsetHeight
      document.documentElement.style.setProperty(
        '--navbar-height',
        `${navBarHeight}px`
      )
      document.documentElement.style.setProperty(
        '--footer-height',
        `${footerHeight}px`
      )
    }
  }, [])
  return null
}

export default Initializer
