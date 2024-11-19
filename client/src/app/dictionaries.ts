import 'server-only';
import type { TLangOptions } from '@/app/types/local.types';

const dictionaries = {
	'en': () => import('./dictionaries/en.json').then((module) => module.default),
	'he': () => import('./dictionaries/he.json').then((module) => module.default),
};

export const getDictionary = async (locale: TLangOptions) => {
	if (!dictionaries[locale]) {
		throw new Error(`Dictionary for locale "${locale}" not found`);
	}
	return await dictionaries[locale]();
};
