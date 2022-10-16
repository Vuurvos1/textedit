<script>
	export let note;

	/** @type {string[]} */
	let lines = note.text?.split('\n');

	/** @type {number} */
	let taskAmount = 0;
	/** @type {number} */
	let tasksDone = 0;

	$: {
		if (note.text) {
			tasksDone = lines.filter((item) => item.startsWith('- [x]')).length;
			taskAmount = tasksDone + lines.filter((item) => item.startsWith('- [ ]')).length;
		}
	}

	/** @param {string} str  */
	function formatNote(str) {
		// get first sentence / first line / first 50 characters rounded to the next wordt
		if (!str) return '';

		return str.slice(0, 50);
	}
</script>

<div class="text-left">
	<h5 class="font-medium">{note.title}</h5>

	<p class="text-sm">
		{formatNote(note.text)}
	</p>

	<!-- TODO only plural these when there is more than 1 task -->
	{#if taskAmount > 0 && tasksDone == 0}
		<p>{taskAmount} tasks</p>
	{:else if taskAmount > 0 && taskAmount == tasksDone}
		<p>{taskAmount} tasks done</p>
	{:else if tasksDone > 0 && taskAmount > 0}
		<p>{tasksDone} of {taskAmount} tasks</p>
	{/if}

	<time class="text-xs" datetime={new Date(note.created_at)}>
		Created: {new Date(note.created_at).toDateString()}
	</time>
</div>

<style lang="scss">
	p {
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
		max-width: 200px;
	}
</style>
