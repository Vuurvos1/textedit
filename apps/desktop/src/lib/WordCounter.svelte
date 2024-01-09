<script lang="ts">
	import { note } from '$lib/stores';
</script>

<div class="inline-flex gap-3 rounded-tl border-l border-t bg-white px-2 py-0.5 text-sm">
	<span>
		{$note.content === '' ? 0 : $note.content.trim().split(/\s+/).length} words
	</span>

	<span>
		{$note.content.length} characters
	</span>
</div>
