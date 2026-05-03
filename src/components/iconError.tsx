import { keyframes, styled } from "goober"

const drawCircle = keyframes`from {stroke-dashoffset: 100;}to {stroke-dashoffset: 0;}`
const draw = keyframes`100%{stroke-dashoffset: 0;}`
const Svg = styled("svg")`
	width: 30px;
	height: 30px;
	display: block;
`

const Circle = styled("circle")`
	fill: none;
	stroke: #f87171;
	stroke-width: 2;
	stroke-linecap: round;

	stroke-dasharray: 100;
	stroke-dashoffset: 100;

	animation: ${drawCircle} 0.5s ease forwards;
`

const Error = styled("path")`
	fill: none;
	stroke: #f87171;
	stroke-width: 2;

	stroke-dasharray: 20;
	stroke-dashoffset: 20;

	animation: ${draw} 0.3s ease forwards;
	animation-delay: 0.4s;
`

export default function IconError() {
	return (
		<Svg viewBox="0 0 24 24">
			<Circle cx="12" cy="12" r="9" />
			<Error d="M8.5 8.5l7 7M15.5 8.5l-7 7" />
		</Svg>
	)
}
