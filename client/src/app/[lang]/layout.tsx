import React from 'react'

export async function generateStaticParams() {
	return [{ lang: "en" }, { lang: "he" }];
}

export default function LangLayout({
	                                   children,
	                                   params: { lang },
                                   }: {
	children: React.ReactNode;
	params: { lang: string };
}) {
	console.log("TLang:", lang)
	
	return (
		<html lang={lang}>
		<body>
		{children}
		</body>
		</html>
	);
}
