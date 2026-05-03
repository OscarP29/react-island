import { useCallback, useEffect, useRef } from "react"
import { dispatchIsland, useStore } from "./store"
import { DefaultIslandConfig, IslandType } from "../types/types"
import { island } from "./island"
import { REMOVE_TIME } from "../config/config"
import { playSound } from "./playSound"

//This is the function in charge of coordinating everything, the island changes, etc.

export function useIslands(configIsland?: DefaultIslandConfig, viewIslandId: string = "default") {
	const { islands } = useStore(configIsland, viewIslandId)
	//We make a ref because we want the information to remain the same after each render. the ref has a map that has tuples island id and setTimeout id
	const islandsTimeSets = useRef(new Map<IslandType["id"], ReturnType<typeof setTimeout>>()).current

	//function responsible for eliminating islands after a certain time
	const addToRemoveQueue = useCallback((islandId: string, removeTime: number = REMOVE_TIME) => {
		// if islandId is already in the islandsTimeSets list, it will not continue
		if (islandsTimeSets.has(islandId)) return
		//setTimeout is created for that island and added to islandsTimeSets
		const timeset = setTimeout(() => {
			islandsTimeSets.delete(islandId)
			dispatchIsland({ type: "remove", islandId }, viewIslandId)
		}, removeTime)

		islandsTimeSets.set(islandId, timeset)
	}, [])

	//useEffect that controls when the islands disappear and when to make the sounds
	useEffect(() => {
		//current time
		const now = Date.now()

		islands.forEach(i => {
			// Only newly created islands (less than 100ms)
			const isNew = now - i.createAt < 100

			if (isNew && i.sound && i.type !== "loading") {
				playSound(i.soundUrl)
			}
		})

		const timeSetOuts = islands.map(i => {
			if (i.duration === Infinity) return
			if (i.dismissed) return
			//the remaining time on the island is calculated
			const remainingDuration = (i.duration || 0) - (now - i.createAt)
			//if the remaining time has passed, it is deleted
			if (remainingDuration < 0) {
				if (i.visible) {
					island.dismiss(i.id)
				}
				return
			}
			//a setTimeOut is created with the remaining time

			return setTimeout(() => island.dismiss(i.id), remainingDuration)
		})
		// clear all previous timeouts
		return () => timeSetOuts.forEach(t => t && clearTimeout(t))
	}, [islands])

	//Add to the elimination list all the islands that are already dismissed
	useEffect(() => {
		islands.forEach(island => {
			if (island.dismissed) {
				addToRemoveQueue(island.id)
			}
		})
	}, [islands, addToRemoveQueue])

	return { islands, handler: {} }
}
