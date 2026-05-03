export function playSound(soundUrl?: string) {
	if (soundUrl !== undefined) {
		const audio = new Audio(soundUrl)
		audio.play().catch(err => console.warn("Error playing sound:", err))
	}
}
