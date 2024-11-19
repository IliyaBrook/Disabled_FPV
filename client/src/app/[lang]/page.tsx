import { getDictionary } from '@/app/dictionaries'
import type { TLangOptions } from '@/app/types/internationalization'

export default async function Page({ params: { lang } }: { params: { lang: TLangOptions }}) {
	const dict = await getDictionary(lang) // en
	return <button>{dict.products.cart}</button>
}