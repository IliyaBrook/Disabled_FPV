import ButtonWithArrow from '@/app/components/ButtonWithArrow/ButtonWithArrow'
import type { TDir, TLangOptions } from '@/app/types/local.types'
import { getDictionary } from '@/app/utils/dictionaries'
import Image from 'next/image'
import React from 'react'
import styles from './homePage.module.scss'

export default async function HomePage({
  params,
}: {
  params: Promise<{ lang: TLangOptions }>
}): Promise<React.ReactElement> {
  const p = await params
  const dict = await getDictionary(p.lang)
  const dir: TDir = p.lang === 'he' ? 'rtl' : 'ltr'
  return (
    <div className={styles.homePage}>
      <Image
        src="/img/mainBg.png"
        alt="background image"
        fill
        priority
        className={styles.bgImage}
      />
      <div className={styles.content}>
        <div className={styles.textSection}>
          <div className={styles.textSectionContainer}>
            <div className={styles.welcomeText}>
              <span className={styles.violetText}>{dict['welcome']}</span>
              <span className={styles.blueText}>{dict['Disabled FPV']}</span>
              <span className={styles.violetText}>
                {dict['online courses']}
              </span>
            </div>
            <div className={styles.header}>
              <div className={styles.headerText}>
                {dict['Discover Your Future in']}
              </div>
              <div className={styles.headerText}>
                {dict['FPV Drone Technology']}
              </div>
            </div>
            <div className={styles.paragraph}>
              <div className={styles.paragraphText}>
                {
                  dict[
                    'Master FPV Drone Assembly and Control Skills with Expert'
                  ]
                }
              </div>
              <div className={styles.paragraphText}>
                {dict['Guidance — 100% Free!']}
              </div>
            </div>
            <ButtonWithArrow
              className={styles.buttonWithArrow}
              title={dict['Find courses']}
              destination={`/${p.lang}/courses`}
              dir={dir}
            />
          </div>
        </div>
        <div className={styles.withDroneContainer}>
          <Image
            src="/img/man_with_drone_main.jpg"
            alt="man controls drone picture"
            fill
            priority
            className={styles.withDroneImage}
          />
        </div>
      </div>
    </div>
  )
}
