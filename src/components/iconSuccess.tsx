import { styled, keyframes } from "goober"

const drawCircle = keyframes`from {stroke-dashoffset: 100;}to {stroke-dashoffset: 0;}`

const drawCheck = keyframes`0% {stroke-dashoffset: 20;opacity: 0;}50% {opacity: 1;}100% {stroke-dashoffset: 0;opacity: 1;}`

const Svg = styled("svg")`
	width: 30px;
	height: 30px;
	display: block;
`

const Circle = styled("circle")`
	fill: none;
	stroke: #4ade80;
	stroke-width: 2;
	stroke-linecap: round;

	stroke-dasharray: 100;
	stroke-dashoffset: 100;

	animation: ${drawCircle} 0.5s ease forwards;
`

const Check = styled("path")`
	fill: none;
	stroke: #4ade80;
	stroke-width: 2;
	stroke-linecap: round;
	stroke-linejoin: round;

	stroke-dasharray: 20;
	stroke-dashoffset: 20;
	opacity: 0;

	animation: ${drawCheck} 0.3s ease forwards;
	animation-delay: 0.45s;
`

export default function IconSuccess() {
	return (
		<Svg viewBox="0 0 24 24">
			<Circle cx="12" cy="12" r="9" />
			<Check d="M7 12.5l3 3 7-7" />
		</Svg>
	)
}
