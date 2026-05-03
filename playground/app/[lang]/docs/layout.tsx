import { source } from "@/lib/source"
import { DocsLayout } from "fumadocs-ui/layouts/docs"
import { baseOptions } from "@/lib/layout.shared"

type Props = {
	children: React.ReactNode
	params: Promise<{ lang: string }>
}

export default async function Layout({ children, params }: Props) {
	const { lang } = await params

	return (
		<DocsLayout tree={source.getPageTree(lang)} {...baseOptions(lang)}>
			{children}
		</DocsLayout>
	)
}
