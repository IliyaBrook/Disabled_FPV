'use client'

import { setLocalization } from '@/app/store/slices/localization.slice'
import type { ILangPageProps } from '@/app/types/pages.types'
import type React from 'react'
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'

const Initializer: React.FC<ILangPageProps> = ({ lang, dir, dict }) => {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(setLocalization({ lang, dir, dict }))
  }, [lang, dir, dict, dispatch])
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
      document.documentElement.style.setProperty(
        '--text-align',
        dir === 'rtl' ? 'right' : 'left'
      )
    }
  }, [])
  return null
}

export default Initializer
