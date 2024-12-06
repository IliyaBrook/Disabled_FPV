'use client'

import { useAppDispatch } from '@/app/store/hooks'
import { setLocalization } from '@/app/store/slices'
import { useAuthUserQuery } from '@/app/store/thunks'

import type { ILangProps } from '@/app/types'
import { getDir } from '@/app/utils/getDir'
import type React from 'react'
import { useEffect } from 'react'

const Initializer: React.FC<ILangProps> = ({ lang, dict }) => {
  const dispatch = useAppDispatch()
  useAuthUserQuery()

  useEffect(() => {
    const dir = getDir()
    dispatch(setLocalization({ lang, dir, dict }))
  }, [lang, dict, dispatch])
  useEffect(() => {
    const dir = getDir()
    const footerSelector = document.getElementById('footer')
    const navBarSelector = document.getElementById('navBar')

    const timeout = setTimeout(() => {
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
    }, 100)
    return () => clearTimeout(timeout)
  }, [])
  return null
}

export default Initializer
