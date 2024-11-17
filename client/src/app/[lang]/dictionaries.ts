import "server-only";
import type { TLang } from "@/types/sharable";

const dictionaries: Record<TLang, () => Promise<{ welcome: string; description: string }>> = {
	en: () => import("./dictionaries/en.json").then((module) => module.default),
	he: () => import("./dictionaries/he.json").then((module) => module.default),
};

export const getDictionary = async (locale: TLang): Promise<{ welcome: string; description: string }> => {
	return dictionaries[locale]();
};
