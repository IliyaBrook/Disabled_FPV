'use client'

import { useAppDispatch } from '@/app/store/hooks'
import { setLocalization } from '@/app/store/slices'
import { useAuthUserQuery } from '@/app/store/thunks'

import type { ILangProps } from '@/app/types'
import type React from 'react'
import { useEffect } from 'react'

const Initializer: React.FC<ILangProps> = ({ lang, dir, dict }) => {
  const dispatch = useAppDispatch()
  const { isLoading, data, error } = useAuthUserQuery()

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
