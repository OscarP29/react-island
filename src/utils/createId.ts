export const createId = (() => {
	let count = 0
	return () => (++count).toString()
})()
