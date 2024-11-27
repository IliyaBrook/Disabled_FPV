'use client'

import { useAppDispatch } from '@/app/store/hooks'
import { setLocalization } from '@/app/store/slices'

import type { ILangProps } from '@/app/types/shareable.types'
import { apiUrl } from '@/app/utils/constants'
import type React from 'react'
import { useEffect } from 'react'

const Initializer: React.FC<ILangProps> = ({ lang, dir, dict }) => {
  const dispatch = useAppDispatch()

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
    const authUser = new Promise((resolve, reject) => {
      fetch(`${apiUrl}/public/authUser`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.error) {
            reject(data.error)
          } else {
            resolve(data)
          }
        })
        .catch((err) => {
          resolve(err)
        })
    })
    authUser
      .then((data) => {
        console.log('data', data)
      })
      .catch((err) => {
        console.error('err', err)
      })
  }, [])

  return null
}

export default Initializer
