<script>
	import IconBase from './IconBase.svelte';

	/** @type {(number|string)} */
	export let size = 24;
</script>

<IconBase {size}>
	<circle cx="12" cy="12" r="1" />
	<circle cx="19" cy="12" r="1" />
	<circle cx="5" cy="12" r="1" />
</IconBase>
