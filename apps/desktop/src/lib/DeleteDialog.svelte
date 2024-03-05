<script>
	import Modal from '$lib/Modal.svelte';

	export let onConfirm = () => {};
	export let onCancel = () => {};
	export let open = true;
	export let path;
	export let title = 'Delete folder';
</script>

<Modal bind:open>
	<div class="p-4">
		<h4 class="mb-3 text-xl font-semibold">{title}</h4>

		<p class="mb-3">Are you sure you want to delete "{path}"?</p>

		<div class="flex flex-row justify-end gap-4">
			<button
				class="rounded border border-red-500 bg-red-500 px-3 py-0.5 text-white"
				on:click={async () => {
					await onConfirm();
					open = false;
				}}
			>
				Delete
			</button>

			<button
				class="rounded border border-gray-500 px-3 py-0.5 text-white"
				on:click={async () => {
					await onCancel();

					open = false;
				}}
			>
				Cancel
			</button>
		</div>
	</div>
</Modal>
