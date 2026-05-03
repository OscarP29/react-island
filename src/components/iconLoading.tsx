import { keyframes, styled } from "goober"

const spin = keyframes`from { transform: rotate(0deg); } to { transform: rotate(360deg); }`

const Svg = styled("svg")`
	width: 30px;
	height: 30px;
	display: block;
	transform-origin: center;
	animation: ${spin} 0.8s linear infinite;
`

const Track = styled("circle")`
	fill: none;
	stroke: #fff;
	stroke-width: 2;
	opacity: 0.2;
`

const Arc = styled("circle")`
	fill: none;
	stroke: #fff;
	stroke-width: 2;
	stroke-linecap: round;
	stroke-dasharray: 56;
	stroke-dashoffset: 42;
`

export default function IconLoading() {
	return (
		<Svg viewBox="0 0 24 24">
			<Track cx="12" cy="12" r="9" />
			<Arc cx="12" cy="12" r="9" />
		</Svg>
	)
}
