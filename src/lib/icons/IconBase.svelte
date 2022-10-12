<script>
	/** @type {(number|string)} */
	export let size = 24;

	// /** @type {(number|string)} */
	// export let strokeWidth = 2;

	// /** @type {(string)} */
	// export let stroke = "currentColor"
</script>

<svg
	xmlns="http://www.w3.org/2000/svg"
	width={size}
	height={size}
	viewBox="0 0 24 24"
	fill="none"
	stroke="currentColor"
	stroke-width="2"
	stroke-linecap="round"
	stroke-linejoin="round"
>
	<slot />
</svg>
