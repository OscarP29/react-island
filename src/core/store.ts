import { useEffect, useRef, useState } from "react"
import type { ConfigIsland, DefaultIslandConfig, IslandType, IslandsState, State, TypeIsland } from "../types/types"
import { defaultDuration, defaultIslandsState, LIMIT_ISLAND, VIEW_ISLANDID_DEFAULT } from "../config/config"

let memoryState: State = {}

//stores the setState of each viewIsland, used to notify when something changes
let listeners: Array<[viewIslandId: string, setState: (state: IslandsState) => void]> = []

type ActionType =
	| {
			type: "add"
			island: IslandType
	  }
	| {
			type: "upsert"
			island: IslandType
	  }
	| {
			type: "dismiss"
			islandId: string
	  }
	| {
			type: "update_island"
			island: Partial<IslandType>
	  }
	| {
			type: "remove"
			islandId: string
	  }

//reducer responsible for returning a new IslandsState depending on the action
function reducer(state: IslandsState, action: ActionType): IslandsState {
	switch (action.type) {
		case "add":
			//returns a new array with the new island at the beginning and the rest of the islands, and limits the number of islands to what is established
			return { ...state, islands: [action.island, ...state.islands].slice(0, LIMIT_ISLAND) }

		case "upsert":
			const { island } = action
			return reducer(state, { type: state.islands.find(i => i.id === island.id) ? "update_island" : "add", island })

		case "update_island":
			return {
				...state,
				islands: state.islands.map(i => (i.id === action.island.id ? { ...i, ...action.island } : i)),
			}
		case "dismiss":
			return {
				...state,
				islands: state.islands.map(island =>
					island.id === action.islandId ? { ...island, dismissed: true, visible: false } : island,
				),
			}
		case "remove":
			return {
				...state,
				islands: state.islands.filter(i => i.id !== action.islandId),
			}
	}
}

export function getViewIslandId(islandId: string) {
	return Object.keys(memoryState).find(viewIslandId =>
		memoryState[viewIslandId].islands.some(island => island.id === islandId),
	)
}

function updateState(action: ActionType, viewIslandId: string) {
	const state = memoryState[viewIslandId] || defaultIslandsState
	const newState = reducer(state, action)
	memoryState[viewIslandId] = newState

	return newState
}
function notify(state: IslandsState, viewIslandId: string) {
	listeners.forEach(([id, setState]) => {
		if (id === viewIslandId) setState(state)
	})
}

//function responsible for coordinating changes and notifying
export function dispatchIsland(action: ActionType, viewIslandId: string = VIEW_ISLANDID_DEFAULT) {
	const newState = updateState(action, viewIslandId)
	notify(newState, viewIslandId)
}

export function dispatchIslandAll(action: ActionType) {
	return Object.keys(memoryState).forEach(viewIslandId => dispatchIsland(action, viewIslandId))
}

//Hook to manage and synchronize the global state of the islands.
export function useStore(configIsland: DefaultIslandConfig = {}, viewIslandId: string = VIEW_ISLANDID_DEFAULT) {
	const [state, setState] = useState<IslandsState>(memoryState[viewIslandId] || defaultIslandsState)
	const initialState = useRef(memoryState[viewIslandId])

	useEffect(() => {
		setState(memoryState[viewIslandId] || defaultIslandsState)
		//if the global state has already changed before mounting the component
		if (initialState.current !== memoryState[viewIslandId]) {
			setState(memoryState[viewIslandId])
		}
		//subscribe to changes
		listeners.push([viewIslandId, setState])

		//cleaning when disassembling
		return () => {
			const index = listeners.findIndex(
				([id, listenerSetState]) => id === viewIslandId && listenerSetState === setState,
			)
			if (index > -1) {
				listeners.splice(index, 1)
			}
		}
	}, [viewIslandId])
	const mergedIsland = state.islands.map(i => ({
		...configIsland,
		...configIsland[i.type],
		...i,
		duration: i.duration ?? configIsland[i.type]?.duration ?? configIsland?.duration ?? defaultDuration[i.type],
	}))
	return { ...state, islands: mergedIsland }
}
