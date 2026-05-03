"use client"
import { useTheme } from "fumadocs-ui/provider/base"
import Link from "next/link"
import { ViewIslands, island } from "react-island"
import { use } from "react"

type Props = {
	params: Promise<{ lang: string }>
}
export default function HomePage({ params }: Props) {
	const { theme } = useTheme()
	const { lang } = use(params)

	return (
		<div className="flex flex-col items-center justify-center flex-1 px-4 py-20 text-center">
			<ViewIslands islandConfig={{ theme: theme as "dark" | "light" }} />
			{/* Heading */}
			<h1 className="mb-4 text-6xl font-bold tracking-tight text-fd-foreground sm:text-7xl">Island</h1>

			{/* Description */}
			<p className="mb-8 max-w-md text-base leading-relaxed text-fd-muted-foreground">
				Dynamic Island–style toasts with smooth animations, sound feedback, and a simple API. Drop it in and it just
				works.
			</p>

			{/* CTA */}
			<div className="mb-16 flex flex-wrap items-center justify-center gap-3">
				<Link
					href={`/${lang}/docs`}
					className="inline-flex items-center gap-2 rounded-md bg-green-700 hover:bg-green-600 px-5 py-2.5 text-sm font-medium text-white transition-colors">
					Get Started
					<svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
						<path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
					</svg>
				</Link>
				<a
					href="https://github.com/OscarP29/react-island"
					className="inline-flex items-center gap-2 rounded-md border border-fd-border bg-fd-card hover:bg-fd-accent px-5 py-2.5 text-sm font-medium text-fd-foreground transition-colors">
					<svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor">
						<path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0 1 12 6.844a9.59 9.59 0 0 1 2.504.337c1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.942.359.31.678.921.678 1.856 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.02 10.02 0 0 0 22 12.017C22 6.484 17.522 2 12 2z" />
					</svg>
					GitHub
				</a>
			</div>

			{/* Try it section */}
			<div className="w-full max-w-lg rounded-xl border border-fd-border bg-fd-card p-6 text-left">
				<p className="mb-4 text-xs font-medium uppercase tracking-widest text-fd-muted-foreground">Try it out</p>

				<div className="flex flex-wrap gap-2">
					{[
						{ label: "Default", variant: "default", onclick: () => island("Hi! Mom") },
						{ label: "Success", variant: "success", onclick: () => island.success("All correct", {}) },
						{
							label: "Loading",
							variant: "loading",
							onclick: () => {
								const id = island.loading("Saving...")
								setTimeout(() => island.success("Save!", { id }), 4000)
							},
						},
						{ label: "Error", variant: "error", onclick: () => island.error("Error!") },
					].map(({ label, variant, onclick }) => (
						<button
							key={variant}
							data-variant={variant}
							onClick={onclick}
							className="rounded-md border border-fd-border bg-fd-background px-4 py-2 text-sm font-medium text-fd-foreground transition-colors hover:bg-fd-accent hover:text-fd-accent-foreground">
							{label}
						</button>
					))}
				</div>

				{/* Code snippet hint */}
				<div className="mt-5 rounded-md bg-fd-background border border-fd-border px-4 py-3 font-mono text-xs text-fd-muted-foreground">
					<span className="text-green-500">import</span> <span className="text-fd-foreground">{"{ toast }"}</span>{" "}
					<span className="text-green-500">from</span> <span className="text-amber-400">'island'</span>
				</div>
			</div>
		</div>
	)
}
