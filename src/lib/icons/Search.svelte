<script>
	import IconBase from './IconBase.svelte';

	/** @type {(number|string)} */
	export let size = 24;
</script>

<IconBase {size}>
	<circle cx="11" cy="11" r="8" />
	<line x1="21" y1="21" x2="16.65" y2="16.65" />
</IconBase>
