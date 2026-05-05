import { keyframes, styled } from "goober"
import { Theme } from "../types/types"

interface IconLoadingProps {
	theme: Theme
}

const spin = keyframes`from { transform: rotate(0deg); } to { transform: rotate(360deg); }`

const Svg = styled("svg")`
	width: 30px;
	height: 30px;
	display: block;
	transform-origin: center;
	animation: ${spin} 0.8s linear infinite;
`

const Track = styled("circle")<IconLoadingProps>`
	fill: none;
	stroke: ${p => (p.theme === "light" ? "#000" : "#fff")};
	stroke-width: 2;
	opacity: 0.2;
`

const Arc = styled("circle")<IconLoadingProps>`
	fill: none;
	stroke: ${p => (p.theme === "light" ? "#000" : "#fff")};
	stroke-width: 2;
	stroke-linecap: round;
	stroke-dasharray: 56;
	stroke-dashoffset: 42;
`

export default function IconLoading({ theme }: IconLoadingProps) {
	return (
		<Svg viewBox="0 0 24 24">
			<Track cx="12" cy="12" r="9" theme={theme} />
			<Arc cx="12" cy="12" r="9" theme={theme} />
		</Svg>
	)
}
