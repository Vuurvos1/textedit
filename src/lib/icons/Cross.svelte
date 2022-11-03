<script>
	import IconBase from './IconBase.svelte';

	/** @type {(number|string)} */
	export let size = 24;
</script>

<IconBase {size}>
	<line x1="18" y1="6" x2="6" y2="18" />
	<line x1="6" y1="6" x2="18" y2="18" />
</IconBase>
