<script>
	import { supabase, user } from '$lib/supabase';
	import { note, notes } from '$lib/stores';
	import { User as UserIcon } from '$lib/icons';

	import PopoutMenu from '$lib/ui/PopoutMenu.svelte';
	import { Download, GitHub, Sliders } from '$lib/icons';

	import JSZip from 'jszip';
	import { stringify } from 'postcss';

	let loading = false;
	async function handleLogin() {
		try {
			loading = true;
			const { error } = await supabase.auth.signInWithOAuth({
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
		const { error } = await supabase.auth.signOut();
		if (error) {
			console.error(error);
		}

		// clear all stores
		$user = null;
		$note = {};
		$notes = [];
	}

	async function downloadAll() {
		// TODO add metadata on top
		const zip = new JSZip();

		for (let i = 0; i < $notes.length; i++) {
			const n = $notes[i];
			zip.file(`${n.title}.md`, n.text);
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

<footer class="md:flex items-center gap-2 h-8 px-2 bg-slate-500">
	<PopoutMenu placement="top">
		<UserIcon slot="icon" />
		{#if $user && ($user != undefined || $user != null)}
			<h3>Account</h3>
			<p>You are signed in as:</p>
			<p>{$user?.email}</p>
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

		<button class="flex flex-row gap-2 w-max" on:click={downloadAll}>
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
