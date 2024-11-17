import "server-only";

const dictionaries: Record<"en" | "he", () => Promise<{ welcome: string; description: string }>> = {
	en: () => import("./dictionaries/en.json").then((module) => module.default),
	he: () => import("./dictionaries/he.json").then((module) => module.default),
};

export const getDictionary = async (locale: "en" | "he"): Promise<{ welcome: string; description: string }> => {
	return dictionaries[locale] ? dictionaries[locale]() : dictionaries["en"]();
};
