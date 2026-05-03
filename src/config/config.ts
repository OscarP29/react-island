import { IslandsState, TypeIsland } from "../types/types"

export const LIMIT_ISLAND = 5
export const VIEW_ISLANDID_DEFAULT = "default"
export const REMOVE_TIME = 400

export const defaultIslandsState: IslandsState = {
	islands: [],
}

export const defaultDuration: { [key in TypeIsland]: number } = {
	success: 4000,
	normal: 4000,
	error: 4000,
	loading: Infinity,
}
