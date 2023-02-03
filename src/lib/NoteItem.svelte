<script lang="ts">
	import { note as noteStore } from '$lib/stores';
	import type { Note } from './note/note';

	export let note: Note;

	$: lines = note.content?.split('\n');
	$: tasksDone = lines.filter((line) => line.startsWith('- [x]')).length;
	$: taskAmount = tasksDone + lines.filter((line) => line.startsWith('- [ ]')).length;

	$: {
		// only update the todos of the note you are currently editing
		if (note.id === $noteStore.id) {
			lines = note.content?.split('\n');
		}
	}

	/** TODO: get first sentence / first line / first 50 characters rounded to the next wordt */
	function formatNote(str: string) {
		if (!str) return '';
		return str.trimStart().slice(0, 50);
	}

	function formateDate(dateString: number | string) {
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

	{#if taskAmount > 0}
		<!-- TODO: maybe convert the progress bar into a smaller radial progress indicator -->
		<!-- in front of the task amount, like a little svg o with a stroke offset -->

		{#if tasksDone == 0}
			<p class="font-semibold">{taskAmount} {taskAmount > 1 ? 'tasks' : 'task'}</p>
		{:else if tasksDone > 0}
			<p class="font-semibold">{tasksDone} of {taskAmount} tasks done</p>
		{/if}

		{#if tasksDone > 0}
			<div class="my-1 h-1 w-full rounded-full bg-gray-200">
				<div
					class="h-full rounded-full bg-purple-500"
					style={`width: ${Math.round((tasksDone / taskAmount) * 100)}%`}
				/>
			</div>
		{/if}
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
