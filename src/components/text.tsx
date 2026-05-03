import { keyframes, styled } from "goober"
import { Theme } from "../types/types"

export const animateTextEnter = keyframes`
0% {
    opacity: 0; 
    transform: translateX(-6px);
} 
100% {
    opacity: 1; 
    transform: translateX(0);
}`

interface TextProps {
	theme: Theme
}
export const Text = styled("span")<TextProps>`
	opacity: 0;
	white-space: wrap;
	text-align: start;
	max-width: 200px;
	margin-left: 0;
	color: ${p => (p.theme === "light" ? "#080808" : "#fdfdfd")};
	overflow: hidden;

	&.enter {
		margin-left: 6px;
		animation: ${animateTextEnter} 0.3s ease-in-out forwards 0.15s;
	}
`
