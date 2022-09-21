<script>
	export let note;

	function formatNote(str) {
		// get first sentence,
		// first line,
		// first 50 characters rounded to the next wordt
		return str.slice(0, 50);
	}
</script>

<div class="text-left">
	<h5 class="font-medium">{note.title}</h5>

	<p class="text-sm">
		{formatNote(note.text)}
	</p>

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
