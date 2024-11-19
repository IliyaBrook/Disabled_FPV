import type { NextConfig } from "next";
import path from 'path';
import dotenv from 'dotenv';

if (process.env.NODE_ENV !== 'production') {
	const envPath = path.resolve(__dirname, '../.env');
	dotenv.config({ path: envPath });
}

/** @type {import('next').NextConfig} */
const nextConfig: NextConfig = {
	env: {
		...Object.keys(process.env)
			.filter(key => key.startsWith('NEXT_PUBLIC_'))
			.reduce((acc, key) => {
				acc[key] = process.env[key] ?? "";
				return acc;
			}, {} as Record<string, string>),
	},
	sassOptions: {
		silenceDeprecations: ['legacy-js-api'],
	}
};

export default nextConfig;
