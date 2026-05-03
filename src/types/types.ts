export type TypeIsland = "success" | "normal" | "error" | "loading"
export type Position = "top-left" | "top-right" | "top-center" | "bottom-left" | "bottom-right" | "bottom-center"
export type Theme = "light" | "dark"

export interface IslandType {
	type: TypeIsland
	id: string
	message: string
	visible: boolean
	dismissed: boolean
	duration?: number
	createAt: number
	viewIslandId?: string
	sound?: boolean
	soundUrl?: string
	theme?: Theme
}

export interface IslandsState {
	islands: IslandType[]
}

export interface IslandBarProps {
	visible: boolean
	message: string
	type: TypeIsland
	theme: Theme
}

export type ConfigIsland = Partial<
	Pick<IslandType, "id" | "duration" | "viewIslandId" | "sound" | "soundUrl" | "theme">
>

export type DefaultIslandConfig = ConfigIsland & {
	[key in TypeIsland]?: ConfigIsland
}

export interface ViewIslandsProps {
	viewIslandsId?: string
	islandConfig?: DefaultIslandConfig
	position?: Position
}

export interface State {
	[viewIslandId: string]: IslandsState
}
