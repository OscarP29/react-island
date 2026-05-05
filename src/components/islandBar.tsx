import { keyframes, styled } from "goober"
import IconSuccess from "./iconSuccess"
import IconError from "./iconError"
import IconLoading from "./iconLoading"
import React from "react"
import { IslandBarProps, TypeIsland } from "../types/types"
import { IslandBarBase } from "./islandBarBase"
import { Text } from "./text"

export default function IslandBar({ visible, message, type, theme }: IslandBarProps) {
	const Icons: { [key in TypeIsland]: React.ElementType | undefined } = {
		error: IconError,
		success: IconSuccess,
		loading: IconLoading,
		normal: undefined,
	}

	const Icon = Icons[type]
	return (
		<IslandBarBase className={visible ? "enter" : "exit"} theme={theme}>
			{Icon && <Icon theme={theme} />}
			<Text className={visible ? "enter" : ""} theme={theme}>
				{message}
			</Text>
		</IslandBarBase>
	)
}
