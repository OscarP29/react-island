import { setup } from "goober"
import { useIslands } from "../core/useIslands"

import React from "react"
import IslandBar from "./islandBar"
import { Position, ViewIslandsProps } from "../types/types"

setup(React.createElement)

function getPositionStyle(position: Position): React.CSSProperties {
	const isTop = position.includes("top")
	const isCenter = position.includes("center")
	const isRight = position.includes("right")

	return {
		position: "fixed",
		zIndex: 9999,
		display: "flex",
		flexDirection: "column",
		gap: "10px",
		pointerEvents: "none",

		// vertical
		...(isTop ? { top: "16px" } : { bottom: "16px" }),

		// horizontal
		...(isCenter
			? { left: "50%", transform: "translateX(-50%)", alignItems: "center" }
			: isRight
				? { right: "16px", alignItems: "flex-end" }
				: { left: "16px", alignItems: "flex-start" }),
	}
}
//component responsible for displaying the islands
export function ViewIslands({ position = "top-center", viewIslandsId, islandConfig }: ViewIslandsProps) {
	const { islands, handler } = useIslands(islandConfig, viewIslandsId)
	const positionStyle = getPositionStyle(position)

	return (
		<div style={positionStyle}>
			{islands.map(i => (
				<IslandBar key={i.id} message={i.message} visible={i.visible} type={i.type} theme={i.theme ?? "dark"} />
			))}
		</div>
	)
}
