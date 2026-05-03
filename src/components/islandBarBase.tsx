import { keyframes, styled } from "goober"
import { Theme } from "../types/types"

const animateIslandBarBaseEnter = keyframes`
  0% {
    transform: scaleX(0.6) translateY(-8px);
    opacity: 0;
  }
  60% {
    transform: translateY(2px);
    opacity: 1;
  }
  100% {
    transform: scaleX(1) translateY(0);
    opacity: 1;
  }
`
const animateIslandBarBaseExit = keyframes`
  0% {
    transform: scaleX(1) translateY(0);
    opacity: 1;
  }
  40% {
    transform: scaleX(0.9) translateY(-2px);
    opacity: 0.8;
  }
  100% {
    transform: scaleX(0.5) translateY(-10px);
    opacity: 0;
  }
`
interface IslandBarBaseProps {
	theme: Theme
}

export const IslandBarBase = styled("div")<IslandBarBaseProps>`
	background-color: ${p => (p.theme === "light" ? "#ffffff" : "#080808")};
	border: 1px solid ${p => (p.theme === "light" ? "#e5e5e5" : "#181818")};
	border-radius: 999px;
	padding: 10px 14px;
	display: flex;
	align-items: center;
	justify-content: center;
	overflow: hidden;
	max-width: 300px;
	height: 40px;
	transform-origin: center;
	will-change: transform, opacity;

	box-shadow: ${p => (p.theme === "light" ? "0 4px 12px rgba(0, 0, 0, 0.08), 0 1px 2px rgba(0, 0, 0, 0.04)" : "none")};

	/* opcional: efecto glass muy sutil */
	backdrop-filter: ${p => (p.theme === "light" ? "blur(6px)" : "none")};

	&.enter {
		animation: ${animateIslandBarBaseEnter} 0.35s ease-in-out forwards;
	}

	&.exit {
		animation: ${animateIslandBarBaseExit} 0.3s ease-in forwards;
	}
`
