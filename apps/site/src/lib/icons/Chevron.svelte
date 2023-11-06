<script>
	/** @type {(number|string)} */
	export let size = 24;

	/** @type {number} */
	export let rotation = 0;
</script>

<svg
	xmlns="http://www.w3.org/2000/svg"
	width={size}
	height={size}
	style:transform="rotate({rotation}deg)"
	viewBox="0 0 24 24"
	fill="none"
	stroke="currentColor"
	stroke-width="2"
	stroke-linecap="round"
	stroke-linejoin="round"
>
	<polyline points="18 15 12 9 6 15" />
</svg>
