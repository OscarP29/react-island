// lib/layout.shared.tsx
import type { BaseLayoutProps } from "fumadocs-ui/layouts/shared"
import { defineI18nUI } from "fumadocs-ui/i18n"
import { i18n } from "@/lib/i18n"
import { appName, gitConfig } from "./shared"
export const i18nUI = defineI18nUI(i18n, {
	en: {
		displayName: "English",
	},
	es: {
		displayName: "Español",
		search: "Buscar",
	},
})

// Agrega el parámetro locale
export function baseOptions(locale?: string): BaseLayoutProps {
	return {
		nav: {
			title: <span>{appName}</span>,
		},
		links: [{ text: "Documentacion", url: `/docs` }],
		githubUrl: `https://github.com/${gitConfig.user}/${gitConfig.repo}`,
	}
}
