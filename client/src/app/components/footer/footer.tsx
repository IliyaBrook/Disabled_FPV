import LinkIcon from '@/app/components/LinkIcon/LinkIcon'
import type { TDir } from '@/app/types/local.types'
import React from 'react'
import styles from './footer.module.scss'

const Footer = ({ dir }: { dir: TDir }): React.ReactElement => {
  return (
    <div className={styles.footer} id="footer">
      <div className={styles.sectionContainer}>
        <div className={styles.contactSection}>
          <LinkIcon
            src="/img/phone_icon.svg"
            alt="Phone"
            href="tel:+972526822900"
            className={styles.email}
            text="+972-52-682-2900"
            imageClassName={styles.phoneIcon}
            textClassName={styles.phoneNumber}
          />
          <div className={styles.separator}></div>
          <LinkIcon
            src="/img/envelope_icon.svg"
            alt="Email"
            href="mailto:vitalyr84@gmail.com"
            className={styles.email}
            text="vitalyr84@gmail.com"
            imageClassName={styles.emailIcon}
            textClassName={styles.emailText}
          />
        </div>
        <div className={styles.socialSection}>
          <LinkIcon
            src="/img/phone_icon_blue.svg"
            alt="Phone"
            className={styles.phoneMobile}
            href="tel:+972526822900"
          />
          <div className={styles.separator}></div>
          <LinkIcon
            href="mailto:vitalyr84@gmail.com"
            className={styles.emailMobile}
            src="/img/envelope_icon_blue.svg"
            alt="Email"
          />
          <LinkIcon
            src="/img/facebook_icon.svg"
            href="https://www.facebook.com/vitalyr84"
            alt="facebook"
          />
          <LinkIcon
            src="/img/instagram_icon.svg"
            href="https://www.instagram.com/example"
            alt="instagram"
          />
          <LinkIcon
            src="/img/youtube_icon.svg"
            href="https://www.youtube.com/@Disabled-FPV"
            alt="youtube"
          />
        </div>
      </div>
    </div>
  )
}

export default Footer
