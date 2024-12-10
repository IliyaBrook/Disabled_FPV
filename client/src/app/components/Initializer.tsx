'use client'

import useWindowSize from '@/app/hooks/useWindowSize'
import { useAppDispatch } from '@/app/store/hooks'
import { setLocalization } from '@/app/store/slices'
import { useAuthUserQuery } from '@/app/store/thunks'
import type { ILangProps } from '@/app/types'
import { getDir } from '@/app/utils/getDir'
import React, { useEffect, useLayoutEffect } from 'react'

const Initializer: React.FC<ILangProps> = ({ lang, dict }) => {
  const dispatch = useAppDispatch()
  useAuthUserQuery()
  const { screenWidth, screenHeight } = useWindowSize()
  useEffect(() => {
    const dir = getDir()
    dispatch(setLocalization({ lang, dir, dict }))
  }, [lang, dict, dispatch])

  useLayoutEffect(() => {
    const dir = getDir()
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
  }, [screenWidth, screenHeight])
  return null
}

export default Initializer
