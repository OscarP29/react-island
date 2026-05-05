# react-island

Dynamic Island–style toasts with smooth animations, sound feedback, and a simple API. Drop it in and it just works.

## Installation

```bash
npm install react-island
```

## Basic Usage

```tsx
import { ViewIslands, island } from "island"

export default function App() {
	const showIsland = () => island.success("Hi! Mom")
	return (
		<div>
			<ViewIslands />
			<button onclick={showIsland}>Show Island</button>
		</div>
	)
}
```

<div align="center">
<a href="https://react-island.aplicaci.online/en">Website</a> 
<span> - </span>
<a href="https://github.com/OscarP29/react-island">Github</a> 
</div>
