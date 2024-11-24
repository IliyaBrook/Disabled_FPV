import ButtonWithArrow from '@/app/components/ButtonWithArrow/ButtonWithArrow'
import type { TDir } from '@/app/types/local.types'
import type { IServerPageParams } from '@/app/types/pages.types'
import { getDictionary } from '@/app/utils/dictionaries'
import Image from 'next/image'
import React from 'react'
import styles from './homePage.module.scss'

export default async function HomePage({
  params,
}: {
  params: IServerPageParams
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
                {dict['main_page_header_text']}
              </div>
            </div>
            <div className={styles.paragraph}>
              <div className={styles.paragraphText}>
                {dict['main_page_text']}
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
        <div className={styles.imageContainer}>
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
