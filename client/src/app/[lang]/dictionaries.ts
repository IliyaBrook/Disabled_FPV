import "server-only";
import type { lang } from "@/types/sharable";

const dictionaries: Record<lang, () => Promise<{ welcome: string; description: string }>> = {
	en: () => import("./dictionaries/en.json").then((module) => module.default),
	he: () => import("./dictionaries/he.json").then((module) => module.default),
};

export const getDictionary = async (locale: lang): Promise<{ welcome: string; description: string }> => {
	return dictionaries[locale]();
};
