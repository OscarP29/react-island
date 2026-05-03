import { dispatchIsland, dispatchIslandAll, getViewIslandId } from "./store"
import type { ConfigIsland, IslandType, TypeIsland } from "../types/types"
import { createId } from "../utils/createId"

const createIsland = (message: string, type: TypeIsland, config?: ConfigIsland): IslandType => ({
	id: config?.id || createId(),
	message: message,
	type: type,
	visible: true,
	dismissed: false,
	createAt: Date.now(),
	...config,
})

const createHandler =
	(type: TypeIsland = "normal") =>
	(message: string, config?: ConfigIsland) => {
		const island = createIsland(message, type, config)
		dispatchIsland({ type: "upsert", island }, island.viewIslandId || getViewIslandId(island.id))
		return island.id
	}

const island = (message: string, config?: ConfigIsland) => createHandler("normal")(message, config)

island.success = createHandler("success")
island.loading = createHandler("loading")
island.error = createHandler("error")

island.dismiss = (islandId: string, viewIslandId?: string) => {
	if (viewIslandId) {
		dispatchIsland({ type: "dismiss", islandId }, viewIslandId)
	} else {
		dispatchIslandAll({ type: "dismiss", islandId })
	}
}

export { island }
