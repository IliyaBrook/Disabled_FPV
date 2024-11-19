import LangSwitcher from '@/app/components/LangSwitcher/lang-switcher'
import { getDictionary } from '@/app/dictionaries'
import type { navBarProps } from '@/app/types/components/nav-bar.types'
import Link from 'next/link'
import styles from './nav-bar.module.scss'

export default async function NavBar(props: navBarProps) {
	
	const dict = await getDictionary(props.lang)
	
	return (
		<nav className={styles.navBar} aria-label='Main Navigation'>
			<div className={styles.navBarContent}>
				<div className={styles.logo}>
				
				</div>
				<ul>
					<li>
						<Link href='/' className={styles.navLink}>
							{dict["Home"]}
						</Link>
					</li>
					<li>
						<Link href='/about' className={styles.navLink}>
							{dict["About us"]}
						</Link>
					</li>
					<li>
						<Link href='/courses' className={styles.navLink}>
							{dict["Courses"]}
						</Link>
					</li>
					<li>
						<Link href='/shop' className={styles.navLink}>
							{dict["Shop"]}
						</Link>
					</li>
					<li>
						<Link href='/contact' className={styles.navLink}>
							{dict["Contact"]}
						</Link>
					</li>
				</ul>
				<div className={styles.langSwitcher}>
					<LangSwitcher />
				</div>
			</div>

		</nav>
	)
}