import { RootProvider } from "fumadocs-ui/provider/next"
import { i18nUI } from "@/lib/layout.shared"
import "../global.css"
import { Metadata } from "next"

export const metadata: Metadata = {
	title: "Island",
	verification: {
		google: "d3zzaEkEZJNB7GEGpwkYfGoZhHFrCEr2DBkHNb993sQ",
	},
}

export default async function RootLayout({
	params,
	children,
}: {
	params: Promise<{ lang: string }>
	children: React.ReactNode
}) {
	const lang = (await params).lang

	return (
		<html lang={lang} suppressHydrationWarning>
			<body>
				<RootProvider i18n={i18nUI.provider(lang)}>{children}</RootProvider>
			</body>
		</html>
	)
}
