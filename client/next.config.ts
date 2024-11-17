import type { NextConfig } from "next";
import path from 'path';
import dotenv from 'dotenv';

if (process.env.NODE_ENV !== 'production') {
	const envPath = path.resolve(__dirname, '../.env');
	dotenv.config({ path: envPath });
}

const nextConfig: NextConfig = {
	env: {
		...Object.keys(process.env)
			.filter(key => key.startsWith('NEXT_PUBLIC_'))
			.reduce((acc, key) => {
				acc[key] = process.env[key] ?? "";
				return acc;
			}, {} as Record<string, string>),
	},
	i18n: {
		locales: ["en", "he"],
		defaultLocale: "en"
	}
};

export default nextConfig;
