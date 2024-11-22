import Image from 'next/image'
import React from 'react'
import styles from './footer.module.scss'

const Footer = (): React.ReactElement => {
  return (
    <div className={styles.footer}>
      <div className={styles.sectionContainer}>
        <div className={styles.contactSection}>
          <a href="tel:+972526822900" className={styles.phone}>
            <Image
              src="/img/phone_icon.svg"
              alt="Phone"
              width={20}
              height={20}
              className={styles.phoneIcon}
              color="yellow"
              priority
            />
            <p className={styles.phoneNumber}>+972-52-682-2900</p>
          </a>
          <div className={styles.separator}></div>
          <a href="mailto:vitalyr84@gmail.com" className={styles.email}>
            <Image
              src="/img/envelope_icon.svg"
              alt="Email"
              width={20}
              height={20}
              className={styles.emailIcon}
              priority
            />
            <div className={styles.emailText}>vitalyr84@gmail.com</div>
          </a>
        </div>
        <div className={styles.socialSection}>
          <a
            target="_blank"
            rel="noopener noreferrer"
            href="https://www.facebook.com/vitalyr84"
            className={styles.facebookButton}
          >
            <Image
              src="/img/facebook_icon.svg"
              alt="facebook"
              width={20}
              height={20}
              className={styles.facebookIcon}
              priority
            />
          </a>
          <a
            target="_blank"
            rel="noopener noreferrer"
            href="https://www.instagram.com/example"
          >
            <Image
              src="/img/instagram_icon.svg"
              alt="instagram"
              width={20}
              height={20}
              priority
            />
          </a>
          <a
            target="_blank"
            rel="noopener noreferrer"
            href="https://www.youtube.com/@Disabled-FPV"
          >
            <Image
              src="/img/youtube_icon.svg"
              alt="youtube"
              width={20}
              height={20}
              priority
            />
          </a>
        </div>
      </div>
    </div>
  )
}

export default Footer
