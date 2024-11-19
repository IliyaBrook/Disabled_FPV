import 'server-only';
import type { TLangOptions } from '@/app/types/internationalization';

const dictionaries = {
	'en-US': () => import('./dictionaries/en.json').then((module) => module.default),
	'he-IL': () => import('./dictionaries/he.json').then((module) => module.default),
};

export const getDictionary = async (locale: TLangOptions) => {
	if (!dictionaries[locale]) {
		throw new Error(`Dictionary for locale "${locale}" not found`);
	}
	return await dictionaries[locale]();
};
