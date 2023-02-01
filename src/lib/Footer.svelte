<script>
	import { Download, GitHub, Sliders, User as UserIcon } from '$lib/icons';
	import PopoutMenu from '$lib/ui/PopoutMenu.svelte';

	import { note, notes, user } from '$lib/stores';
	import { supabaseClient } from '$lib/db';
	import JSZip from 'jszip';

	let loading = false;
	async function handleLogin() {
		try {
			loading = true;
			const { error } = await supabaseClient.auth.signInWithOAuth({
				provider: 'github'
			});
			// console.log(error, user, session);
			if (error) throw error;
		} catch (err) {
			console.log(err);
		} finally {
			loading = false;
		}
	}

	async function logout() {
		const { error } = await supabaseClient.auth.signOut();
		if (error) {
			console.error(error);
		}

		// clear all values
		$user = {};
		$notes = [];
		$note = $notes[0]; // TODO: this should be a new note
	}

	async function downloadAll() {
		// TODO add metadata on top
		const zip = new JSZip();

		for (let i = 0; i < $notes.length; i++) {
			const n = $notes[i];
			zip.file(`${n.title}.md`, n.content);
		}

		const blob = await zip.generateAsync({ type: 'blob' });

		// download the file
		const url = URL.createObjectURL(blob);
		const link = document.createElement('a');
		link.download = `notes_export.zip`;
		link.href = url;
		link.click();
		URL.revokeObjectURL(url); // Remove Object URL after use
	}

	// TODO: add option to import 1 or more notes
	// Create file drag and drop for this
</script>

<footer class="h-8 items-center gap-2 bg-slate-500 px-2 md:flex">
	<PopoutMenu placement="top">
		<UserIcon slot="icon" />
		{#if $user && $user?.email}
			<h3>Account</h3>
			<p>You are signed in as:</p>
			<p>{$user.email}</p>
			<p>Using: {$user?.app_metadata?.provider}</p>

			<button class="hover:text-purple-600" on:click={logout}>Logout</button>
		{:else}
			<button class="flex flex-row items-center gap-2 px-2 py-1" on:click={handleLogin}>
				<GitHub />

				<span class="w-max">Login with Github</span>
			</button>
		{/if}
	</PopoutMenu>

	<PopoutMenu placement="top">
		<Sliders slot="icon" />

		<button class="flex w-max flex-row gap-2" on:click={downloadAll}>
			<Download />
			<span>Download all notes</span>
		</button>
	</PopoutMenu>
</footer>

<style lang="scss">
	footer {
		display: none;
	}

	@media (min-width: 768px) {
		footer {
			display: flex;
		}
	}
</style>
