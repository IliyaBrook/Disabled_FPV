import 'server-only'
import type { TLangOptions } from '@/app/types/internationalization'


const dictionaries = {
	en: () => import('./dictionaries/en.json').then((module) => module.default),
	he: () => import('./dictionaries/he.json').then((module) => module.default),
}

export const getDictionary = async (locale: TLangOptions) => dictionaries[locale]()