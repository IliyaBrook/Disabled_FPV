// app/[TLang]/page.tsx
import type { TLang } from '@/types/sharable'
import { getDictionary } from './dictionaries';
import styles from './page.module.css';

export default async function Home({ params: { lang } }: { params: { lang: TLang } }) {
  const dict = await getDictionary(lang);
  
  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <h1>{dict.welcome}</h1>
        <p>{dict.description}</p>
      </main>
      <footer className={styles.footer}>
        <p>{lang === 'en' ? 'English version' : 'גרסה בעברית'}</p>
      </footer>
    </div>
  );
}
