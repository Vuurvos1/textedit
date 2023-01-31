<script>
	/** @type {import('./note/note').Note} */
	export let note;

	let lines = note.content?.split('\n');

	/** @type {number} */
	let taskAmount = 0;
	/** @type {number} */
	let tasksDone = 0;

	$: {
		if (note.content) {
			tasksDone = lines.filter((item) => item.startsWith('- [x]')).length;
			taskAmount = tasksDone + lines.filter((item) => item.startsWith('- [ ]')).length;
		}
	}

	/** @param {string} str  */
	function formatNote(str) {
		// get first sentence / first line / first 50 characters rounded to the next wordt
		if (!str) return '';

		return str.trimStart().slice(0, 50);
	}

	/** @param {string} dateString  */
	function formateDate(dateString) {
		const date = new Date(dateString);

		// week day, day date, month (short), year, time hh:mm
		return date.toLocaleDateString(undefined, {
			weekday: 'short',
			month: 'short',
			year: 'numeric',
			day: 'numeric',
			hour: 'numeric',
			minute: 'numeric'
		});
	}
</script>

<div class="text-left">
	<h5 class="font-medium">{note.title}</h5>

	<p class="text-sm">
		{formatNote(note.content)}
	</p>

	<!-- TODO only plural these when there is more than 1 task -->
	{#if taskAmount > 0 && tasksDone == 0}
		<p>{taskAmount} tasks</p>
	{:else if taskAmount > 0 && taskAmount == tasksDone}
		<p>{taskAmount} tasks done</p>
	{:else if tasksDone > 0 && taskAmount > 0}
		<p>{tasksDone} of {taskAmount} tasks</p>
	{/if}

	<time class="text-xs" datetime={new Date(note.updated_at).toISOString()}>
		Modified {formateDate(note.updated_at)}
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
